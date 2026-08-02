/** One-shot extractor: legacy-html/faq.html -> qa-app/lib/faq-content.ts */
const fs = require("fs");

const ALLOWED = new Set(["strong", "em", "b", "i", "a", "br", "code", "ul", "ol", "li", "span", "p"]);

function assertSafe(html, where) {
  for (const m of html.matchAll(/<\s*\/?\s*([a-zA-Z0-9]+)([^>]*)>/g)) {
    const tag = m[1].toLowerCase();
    if (!ALLOWED.has(tag)) throw new Error(`Unexpected tag <${tag}> in ${where}`);
    if (/\son[a-z]+\s*=/i.test(m[2]) || /javascript:/i.test(m[2])) {
      throw new Error(`Unsafe attribute in ${where}: ${m[0]}`);
    }
  }
  return html;
}

const clean = (s) => s.replace(/\s*\n\s*/g, " ").replace(/\s{2,}/g, " ").trim();

/** For plain-text fields only — HTML fields must keep their entities. */
const text = (s) =>
  clean(s)
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s{2,}/g, " ")
    .trim();

let html = fs
  .readFileSync("legacy-html/faq.html", "utf8")
  .replace(/<style[\s\S]*?<\/style>/g, "")
  .replace(/<script[\s\S]*?<\/script>/g, "")
  .replace(/<!--[\s\S]*?-->/g, "");

const intro = text(html.match(/<div class="intro-card">\s*<p>([\s\S]*?)<\/p>/)[1]);
const heroTitle = text(html.match(/<h1>([\s\S]*?)<\/h1>/)[1]);
const heroSub = text(html.match(/<p class="hero-sub">([\s\S]*?)<\/p>/)[1])
  .replace(/&nbsp;/g, " ")
  .replace(/\s+/g, " ");

const groups = [];
const groupRe = /<div class="section-group">([\s\S]*?)(?=<div class="section-group">|<div class="delete-card"|<footer)/g;
let g;
while ((g = groupRe.exec(html))) {
  const block = g[1];
  const title = text(block.match(/<div class="section-group-title">([\s\S]*?)<\/div>/)[1]);
  const subMatch = block.match(/<div class="section-group-subtitle">([\s\S]*?)<\/div>/);
  const subtitle = subMatch ? text(subMatch[1]) : "";
  const items = [];
  for (const it of block.matchAll(
    /<span class="faq-question-text">([\s\S]*?)<\/span>[\s\S]*?<div class="faq-answer">([\s\S]*?)<\/div>\s*<\/div>/g,
  )) {
    items.push({
      q: text(it[1]),
      a: assertSafe(clean(it[2]), `faq "${text(it[1])}"`),
    });
  }
  groups.push({ title, subtitle, items });
}

// The "delete your account" callout at the foot of the legacy page.
const dcIdx = html.indexOf('<div class="delete-card">');
let deleteCard = null;
if (dcIdx !== -1) {
  const chunk = html.slice(dcIdx, dcIdx + 1400);
  const pick = (c) => {
    const m = chunk.match(new RegExp(`<div class="${c}">([\\s\\S]*?)</div>`));
    return m ? text(m[1].replace(/<[^>]+>/g, "")) : "";
  };
  const href = chunk.match(/<a class="delete-card-link" href="([^"]+)"/);
  const label = chunk.match(/<a class="delete-card-link"[^>]*>([\s\S]*?)<\/a>/);
  deleteCard = {
    title: pick("delete-card-title"),
    desc: pick("delete-card-desc"),
    href: href ? href[1] : "",
    label: label ? text(label[1]) : "",
  };
}

const out = `// AUTO-PORTED from legacy-html/faq.html — do not retype by hand.
// Answer HTML is restricted at extraction time to an inline-tag allowlist and
// originates in this repository, never from user input.

export type FaqItem = { q: string; a: string };

export type FaqGroup = { title: string; subtitle: string; items: FaqItem[] };

export const faqIntro = ${JSON.stringify(intro)};

export const faqHero = ${JSON.stringify({ title: heroTitle, subtitle: heroSub }, null, 2)};

export const faqGroups: FaqGroup[] = ${JSON.stringify(groups, null, 2)};

export const faqDeleteCard = ${JSON.stringify(deleteCard, null, 2)};
`;

fs.writeFileSync("qa-app/lib/faq-content.ts", out);
console.log(
  `groups: ${groups.length}, questions: ${groups.reduce((n, x) => n + x.items.length, 0)}`,
);
groups.forEach((x) => console.log(`  ${x.title} (${x.items.length})`));
console.log("deleteCard:", deleteCard);
