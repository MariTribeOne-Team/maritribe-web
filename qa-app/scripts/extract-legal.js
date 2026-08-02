/**
 * One-shot extractor: legacy-html/{privacy,terms}.html -> qa-app/lib/legal-content.ts
 * Parses the section markup structurally so the legal text is carried over
 * verbatim rather than retyped.
 */
const fs = require("fs");

const ALLOWED_INLINE = new Set(["strong", "em", "b", "i", "a", "br", "code", "span"]);

/** Fail loudly if extracted inline HTML contains anything outside the allowlist. */
function assertSafe(html, where) {
  for (const m of html.matchAll(/<\s*\/?\s*([a-zA-Z0-9]+)([^>]*)>/g)) {
    const tag = m[1].toLowerCase();
    if (!ALLOWED_INLINE.has(tag)) {
      throw new Error(`Unexpected tag <${tag}> in ${where}: ${m[0]}`);
    }
    if (/\son[a-z]+\s*=/i.test(m[2]) || /javascript:/i.test(m[2])) {
      throw new Error(`Unsafe attribute in ${where}: ${m[0]}`);
    }
  }
  return html;
}

function clean(html) {
  return html
    .replace(/\s*\n\s*/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

/** Return [innerHTML, indexAfterCloseTag] for a balanced <div> starting at openIdx. */
function readDiv(html, openIdx) {
  const openEnd = html.indexOf(">", openIdx) + 1;
  let depth = 1;
  let i = openEnd;
  const re = /<(\/?)div\b/g;
  re.lastIndex = openEnd;
  let m;
  while ((m = re.exec(html))) {
    depth += m[1] ? -1 : 1;
    if (depth === 0) {
      i = m.index;
      break;
    }
  }
  const close = html.indexOf(">", re.lastIndex) + 1;
  return [html.slice(openEnd, i), close];
}

function attrClass(tagHtml) {
  const m = tagHtml.match(/class="([^"]*)"/);
  return m ? m[1] : "";
}

/** Parse the children of a .section-body (or .sub-section) into blocks. */
function parseBlocks(html, where) {
  const blocks = [];
  let i = 0;
  while (i < html.length) {
    const next = html.indexOf("<", i);
    if (next === -1) break;
    const tagMatch = html.slice(next).match(/^<([a-zA-Z0-9]+)([^>]*)>/);
    if (!tagMatch) {
      i = next + 1;
      continue;
    }
    const tag = tagMatch[1].toLowerCase();
    const rawTag = tagMatch[0];

    if (tag === "p") {
      const end = html.indexOf("</p>", next);
      const inner = clean(html.slice(next + rawTag.length, end));
      const cls = attrClass(rawTag);
      blocks.push(
        cls.includes("caps-text")
          ? { kind: "caps", html: assertSafe(inner, where) }
          : { kind: "p", html: assertSafe(inner, where) },
      );
      i = end + 4;
      continue;
    }

    if (tag === "ul" || tag === "ol") {
      const end = html.indexOf(`</${tag}>`, next);
      const listHtml = html.slice(next + rawTag.length, end);
      const items = [];
      for (const li of listHtml.matchAll(/<li>([\s\S]*?)<\/li>/g)) {
        items.push(assertSafe(clean(li[1]), where));
      }
      blocks.push({ kind: "list", ordered: tag === "ol", items });
      i = end + tag.length + 3;
      continue;
    }

    if (tag === "div") {
      const cls = attrClass(rawTag);
      const [inner, after] = readDiv(html, next);

      if (cls.includes("sub-section")) {
        const labelMatch = inner.match(/<div class="sub-label">([\s\S]*?)<\/div>/);
        const label = labelMatch ? clean(labelMatch[1]) : "";
        const rest = labelMatch ? inner.replace(labelMatch[0], "") : inner;
        blocks.push({
          kind: "sub",
          label: assertSafe(label, where),
          blocks: parseBlocks(rest, `${where} > ${label}`),
        });
      } else if (cls.includes("grievance-card")) {
        const pick = (c) => {
          const start = inner.indexOf(`<div class="${c}">`);
          if (start === -1) return "";
          const [content] = readDiv(inner, start);
          return content;
        };
        const timings = [];
        for (const s of pick("g-timing").matchAll(/<span>([\s\S]*?)<\/span>/g)) {
          timings.push(clean(s[1]));
        }
        blocks.push({
          kind: "grievance",
          label: clean(pick("g-label")),
          name: clean(pick("g-name")),
          // Contains an address line, a <br>, and a mailto link — keep as HTML.
          contactHtml: assertSafe(clean(pick("g-email")), `${where} grievance`),
          timings,
        });
      } else if (cls.includes("sub-label")) {
        // handled by the sub-section branch
      } else {
        blocks.push(...parseBlocks(inner, where));
      }
      i = after;
      continue;
    }

    i = next + rawTag.length;
  }
  return blocks;
}

function parseDoc(file) {
  let html = fs
    .readFileSync(file, "utf8")
    .replace(/<style[\s\S]*?<\/style>/g, "")
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/<!--[\s\S]*?-->/g, "");

  const title = clean(html.match(/<h1>([\s\S]*?)<\/h1>/)[1]);
  const subtitle = clean(html.match(/<p class="hero-sub">([\s\S]*?)<\/p>/)[1])
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ");

  const sections = [];
  const re = /<div class="section" id="(s\d+)"[^>]*>/g;
  let m;
  while ((m = re.exec(html))) {
    const [inner] = readDiv(html, m.index);
    const num = clean(inner.match(/<div class="section-num">([\s\S]*?)<\/div>/)[1]);
    const secTitle = clean(inner.match(/<h2 class="section-title">([\s\S]*?)<\/h2>/)[1]);
    const bodyIdx = inner.indexOf('<div class="section-body">');
    const [body] = readDiv(inner, bodyIdx);
    sections.push({ num, title: secTitle, blocks: parseBlocks(body, `${file} ${num}`) });
  }
  return { title, subtitle, sections };
}

const privacy = parseDoc("legacy-html/privacy.html");
const terms = parseDoc("legacy-html/terms.html");

const header = `// AUTO-PORTED from legacy-html/{privacy,terms}.html — do not retype by hand.
// Inline HTML in these strings is limited to a checked allowlist (strong, em, a,
// br, code, span) and comes from this repository, never from user input, so the
// renderer may inject it directly.

export type LegalBlock =
  | { kind: "p"; html: string }
  | { kind: "caps"; html: string }
  | { kind: "list"; ordered: boolean; items: string[] }
  | { kind: "sub"; label: string; blocks: LegalBlock[] }
  | { kind: "grievance"; label: string; name: string; contactHtml: string; timings: string[] };

export type LegalSection = { num: string; title: string; blocks: LegalBlock[] };

export type LegalDocument = { title: string; subtitle: string; sections: LegalSection[] };

`;

fs.writeFileSync(
  "qa-app/lib/legal-content.ts",
  header +
    `export const privacyPolicy: LegalDocument = ${JSON.stringify(privacy, null, 2)};\n\n` +
    `export const termsOfService: LegalDocument = ${JSON.stringify(terms, null, 2)};\n`,
);

for (const [name, doc] of [
  ["privacy", privacy],
  ["terms", terms],
]) {
  const count = (b) =>
    b.reduce((n, x) => n + (x.kind === "sub" ? count(x.blocks) : x.kind === "list" ? x.items.length : 1), 0);
  console.log(
    `${name}: ${doc.sections.length} sections, ${doc.sections.reduce((n, s) => n + count(s.blocks), 0)} blocks`,
  );
}
