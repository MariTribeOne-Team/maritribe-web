import Link from "next/link";
import { PublicHeader } from "../components/public-header";
import { PublicFooter } from "../components/public-footer";

export default function GuidelinesPage() {
  const tocItems = [
    { num: 1, label: "Core Principles", href: "#s1" },
    { num: 2, label: "Prohibited Content", href: "#s2" },
    { num: 3, label: "Community Conduct", href: "#s3" },
    { num: 4, label: "Intellectual Property", href: "#s4" },
    { num: 5, label: "Privacy Protection", href: "#s5" },
    { num: 6, label: "Reporting & Moderation", href: "#s6" },
    { num: 7, label: "Enforcement Actions", href: "#s7" },
    { num: 8, label: "Appeals Process", href: "#s8" },
    { num: 9, label: "Legal Consequences", href: "#s9" },
    { num: 10, label: "Updates to Guidelines", href: "#s10" },
    { num: 11, label: "Contact", href: "#s11" },
  ];

  return (
    <>
      <PublicHeader active="guidelines" mode="marketing" />

      <div className="hero">
        <div className="hero-inner">
          <h1 style={{ color: "#fff" }}>Community Guidelines</h1>
          <p className="hero-sub" style={{ color: "rgba(255,255,255,0.6)" }}>
            MaritribeOne Alumni Network &nbsp;·&nbsp; Last Updated: February 2025
          </p>
        </div>
      </div>

      <div className="page-wrapper" style={{ maxWidth: "780px", margin: "0 auto", padding: "48px 24px 80px" }}>
        <div className="intro-card" style={{ background: "linear-gradient(135deg, var(--jam), var(--bottle-green))", borderRadius: 16, padding: "24px 28px", marginBottom: 40, color: "white" }}>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.9)", marginBottom: 12 }}>
            The MaritribeOne Alumni Network connects alumni, professionals, and businesses of the maritime ecosystem. Our community is built on professional respect, knowledge sharing, and mutual support. These guidelines ensure a safe, productive environment for all members.
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.9)", margin: 0 }}>
            These guidelines apply to all content posted on the Platform, including posts, comments, direct messages, and profile information.
          </p>
        </div>

        {/* Table of Contents */}
        <div className="toc" style={{ background: "white", border: "1px solid var(--ivory-dark)", borderRadius: 14, padding: "20px 24px", marginBottom: 40 }}>
          <div className="toc-title" style={{ fontFamily: "var(--serif)", fontSize: 18, color: "var(--bottle-green)", marginBottom: 12, fontWeight: 600 }}>
            Contents
          </div>
          <div className="toc-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "10px 20px" }}>
            {tocItems.map((item) => (
              <a
                href={item.href}
                key={item.href}
                className="toc-item"
                style={{ fontSize: 13.5, color: "var(--text-primary)", textDecoration: "none", display: "flex", gap: 8, fontWeight: 500 }}
              >
                <span className="toc-num" style={{ color: "var(--jam)", fontWeight: 700 }}>
                  {item.num}
                </span>
                {item.label}
              </a>
            ))}
          </div>
        </div>

        {/* Section 1 */}
        <div className="section" id="s1" style={{ marginBottom: 36 }}>
          <div className="section-header" style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14, paddingBottom: 10, borderBottom: "2px solid var(--ivory-dark)" }}>
            <div className="section-num" style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--jam)", color: "white", display: "flex", alignItems: "center", fontSize: 12, fontWeight: 700, flexShrink: 0, justifyContent: "center" }}>
              1
            </div>
            <h2 className="section-title" style={{ fontFamily: "var(--serif)", fontSize: 20, color: "var(--bottle-green)", margin: 0 }}>
              Core Principles
            </h2>
          </div>
          <div className="section-body" style={{ fontSize: 13.5, lineHeight: 1.7, color: "#4B5563" }}>
            <p style={{ marginBottom: 8 }}>Our community is guided by these principles:</p>
            <ul style={{ paddingLeft: 20 }}>
              <li><strong>Professional Respect:</strong> Treat fellow members with the respect you would show colleagues in a professional setting.</li>
              <li><strong>Assume Good Intentions:</strong> Give others the benefit of the doubt and seek to understand different perspectives.</li>
              <li><strong>Contribute Meaningfully:</strong> Share knowledge and experiences that benefit the maritime professional community.</li>
              <li><strong>Protect Privacy:</strong> Respect the privacy of fellow members and do not share personal information without consent.</li>
              <li><strong>Support Each Other:</strong> Help juniors, share opportunities, and contribute to collective success.</li>
            </ul>
          </div>
        </div>

        {/* Section 2 */}
        <div className="section" id="s2" style={{ marginBottom: 36 }}>
          <div className="section-header" style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14, paddingBottom: 10, borderBottom: "2px solid var(--ivory-dark)" }}>
            <div className="section-num" style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--jam)", color: "white", display: "flex", alignItems: "center", fontSize: 12, fontWeight: 700, flexShrink: 0, justifyContent: "center" }}>
              2
            </div>
            <h2 className="section-title" style={{ fontFamily: "var(--serif)", fontSize: 20, color: "var(--bottle-green)", margin: 0 }}>
              Prohibited Content
            </h2>
          </div>
          <div className="section-body" style={{ fontSize: 13.5, lineHeight: 1.7, color: "#4B5563" }}>
            <p style={{ marginBottom: 12 }}>We actively remove content that violates these guidelines and applicable Indian laws. The following content is strictly prohibited:</p>

            <div className="sub-section" style={{ marginBottom: 20 }}>
              <div className="sub-label" style={{ fontWeight: 700, color: "var(--text-primary)", marginBottom: 6 }}>
                2.1 Illegal Content
              </div>
              <p style={{ marginBottom: 8 }}>Content that violates Indian laws including:</p>
              <ul style={{ paddingLeft: 20 }}>
                <li>Content threatening the unity, integrity, defence, security, or sovereignty of India</li>
                <li>Content insulting other nations or promoting violence</li>
                <li>Content related to terrorism, organized crime, or illegal activities</li>
                <li>Content that incites the commission of any offence</li>
              </ul>
            </div>

            <div className="sub-section" style={{ marginBottom: 20 }}>
              <div className="sub-label" style={{ fontWeight: 700, color: "var(--text-primary)", marginBottom: 6 }}>
                2.2 Harassment and Bullying
              </div>
              <p style={{ marginBottom: 8 }}>We have zero tolerance for harassment. This includes:</p>
              <ul style={{ paddingLeft: 20 }}>
                <li>Abusive language, personal attacks, or threats</li>
                <li>Discrimination based on gender, caste, religion, ethnicity, or disability</li>
                <li>Sexual harassment or unwanted advances</li>
                <li>Repeated unwanted contact after being asked to stop</li>
                <li>Morphed images or malicious content targeting individuals</li>
                <li>Doxxing or sharing personal information without consent</li>
              </ul>
            </div>

            <div className="sub-section" style={{ marginBottom: 20 }}>
              <div className="sub-label" style={{ fontWeight: 700, color: "var(--text-primary)", marginBottom: 6 }}>
                2.3 Hate Speech
              </div>
              <p style={{ marginBottom: 8 }}>Content promoting hatred or discrimination is prohibited:</p>
              <ul style={{ paddingLeft: 20 }}>
                <li>Content targeting individuals or groups based on protected characteristics</li>
                <li>Content spreading religious hatred or communal discord</li>
                <li>Content insulting religious deities, symbols, or beliefs</li>
                <li>Propaganda promoting intolerance</li>
              </ul>
            </div>

            <div className="sub-section" style={{ marginBottom: 20 }}>
              <div className="sub-label" style={{ fontWeight: 700, color: "var(--text-primary)", marginBottom: 6 }}>
                2.4 Adult and Inappropriate Content
              </div>
              <p style={{ marginBottom: 8 }}>This is a professional platform. The following are prohibited:</p>
              <ul style={{ paddingLeft: 20 }}>
                <li>Sexually explicit, pornographic, or nude content</li>
                <li>Content depicting violence or gore</li>
                <li>Content promoting self-harm or suicide</li>
                <li>Content promoting dangerous activities or substance abuse</li>
              </ul>
            </div>

            <div className="sub-section" style={{ marginBottom: 20 }}>
              <div className="sub-label" style={{ fontWeight: 700, color: "var(--text-primary)", marginBottom: 6 }}>
                2.5 Misinformation
              </div>
              <p style={{ marginBottom: 8 }}>We aim to combat the spread of false information:</p>
              <ul style={{ paddingLeft: 20 }}>
                <li>Knowingly spreading false or misleading information</li>
                <li>Manipulated media including deepfakes</li>
                <li>Hoaxes or fake news designed to deceive</li>
                <li>Defamatory content designed to damage reputation</li>
              </ul>
            </div>

            <div className="sub-section">
              <div className="sub-label" style={{ fontWeight: 700, color: "var(--text-primary)", marginBottom: 6 }}>
                2.6 Spam and Commercial Content
              </div>
              <p style={{ marginBottom: 8 }}>To maintain quality discussions:</p>
              <ul style={{ paddingLeft: 20 }}>
                <li>No unsolicited commercial promotion or advertising</li>
                <li>No repetitive posting of the same content</li>
                <li>No pyramid schemes, MLM promotions, or scams</li>
                <li>No artificial engagement manipulation</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 3 */}
        <div className="section" id="s3" style={{ marginBottom: 36 }}>
          <div className="section-header" style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14, paddingBottom: 10, borderBottom: "2px solid var(--ivory-dark)" }}>
            <div className="section-num" style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--jam)", color: "white", display: "flex", alignItems: "center", fontSize: 12, fontWeight: 700, flexShrink: 0, justifyContent: "center" }}>
              3
            </div>
            <h2 className="section-title" style={{ fontFamily: "var(--serif)", fontSize: 20, color: "var(--bottle-green)", margin: 0 }}>
              Community Conduct
            </h2>
          </div>
          <div className="section-body" style={{ fontSize: 13.5, lineHeight: 1.7, color: "#4B5563" }}>
            <div className="sub-section" style={{ marginBottom: 20 }}>
              <div className="sub-label" style={{ fontWeight: 700, color: "var(--text-primary)", marginBottom: 6 }}>
                3.1 Professional Discussions
              </div>
              <p style={{ marginBottom: 8 }}>When participating in discussions:</p>
              <ul style={{ paddingLeft: 20 }}>
                <li>Stay on topic and contribute meaningfully</li>
                <li>Disagree respectfully — focus on ideas, not personal attacks</li>
                <li>Share accurate information; cite sources when possible</li>
                <li>Be helpful to juniors and those seeking advice</li>
              </ul>
            </div>

            <div className="sub-section" style={{ marginBottom: 20 }}>
              <div className="sub-label" style={{ fontWeight: 700, color: "var(--text-primary)", marginBottom: 6 }}>
                3.2 Direct Messaging Etiquette
              </div>
              <p style={{ marginBottom: 8 }}>When contacting fellow members:</p>
              <ul style={{ paddingLeft: 20 }}>
                <li>Introduce yourself clearly when reaching out</li>
                <li>Respect if someone declines your message request</li>
                <li>Do not use DMs for commercial solicitation</li>
                <li>Respond to professional inquiries in a timely manner when possible</li>
              </ul>
            </div>

            <div className="sub-section">
              <div className="sub-label" style={{ fontWeight: 700, color: "var(--text-primary)", marginBottom: 6 }}>
                3.3 Profile Guidelines
              </div>
              <p style={{ marginBottom: 8 }}>Your profile should:</p>
              <ul style={{ paddingLeft: 20 }}>
                <li>Use your real name</li>
                <li>Use an appropriate, professional profile photo</li>
                <li>Provide accurate information about your batch and current status</li>
                <li>Not impersonate other individuals or create fake profiles</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 4 */}
        <div className="section" id="s4" style={{ marginBottom: 36 }}>
          <div className="section-header" style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14, paddingBottom: 10, borderBottom: "2px solid var(--ivory-dark)" }}>
            <div className="section-num" style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--jam)", color: "white", display: "flex", alignItems: "center", fontSize: 12, fontWeight: 700, flexShrink: 0, justifyContent: "center" }}>
              4
            </div>
            <h2 className="section-title" style={{ fontFamily: "var(--serif)", fontSize: 20, color: "var(--bottle-green)", margin: 0 }}>
              Intellectual Property
            </h2>
          </div>
          <div className="section-body" style={{ fontSize: 13.5, lineHeight: 1.7, color: "#4B5563" }}>
            <p>
              Respect intellectual property rights. Do not post copyrighted content without permission. When sharing third-party content, provide proper attribution. Do not remove watermarks or credits from shared content.
            </p>
          </div>
        </div>

        {/* Section 5 */}
        <div className="section" id="s5" style={{ marginBottom: 36 }}>
          <div className="section-header" style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14, paddingBottom: 10, borderBottom: "2px solid var(--ivory-dark)" }}>
            <div className="section-num" style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--jam)", color: "white", display: "flex", alignItems: "center", fontSize: 12, fontWeight: 700, flexShrink: 0, justifyContent: "center" }}>
              5
            </div>
            <h2 className="section-title" style={{ fontFamily: "var(--serif)", fontSize: 20, color: "var(--bottle-green)", margin: 0 }}>
              Privacy Protection
            </h2>
          </div>
          <div className="section-body" style={{ fontSize: 13.5, lineHeight: 1.7, color: "#4B5563" }}>
            <p style={{ marginBottom: 8 }}>Protecting member privacy is essential:</p>
            <ul style={{ paddingLeft: 20 }}>
              <li>Do not share another member&apos;s personal information (phone number, address, etc.) publicly</li>
              <li>Do not share private conversations without consent</li>
              <li>Respect privacy settings of communities (public vs. private)</li>
              <li>Do not screenshot and share private community content externally</li>
            </ul>
          </div>
        </div>

        {/* Section 6 */}
        <div className="section" id="s6" style={{ marginBottom: 36 }}>
          <div className="section-header" style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14, paddingBottom: 10, borderBottom: "2px solid var(--ivory-dark)" }}>
            <div className="section-num" style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--jam)", color: "white", display: "flex", alignItems: "center", fontSize: 12, fontWeight: 700, flexShrink: 0, justifyContent: "center" }}>
              6
            </div>
            <h2 className="section-title" style={{ fontFamily: "var(--serif)", fontSize: 20, color: "var(--bottle-green)", margin: 0 }}>
              Reporting and Moderation
            </h2>
          </div>
          <div className="section-body" style={{ fontSize: 13.5, lineHeight: 1.7, color: "#4B5563" }}>
            <div className="sub-section" style={{ marginBottom: 20 }}>
              <div className="sub-label" style={{ fontWeight: 700, color: "var(--text-primary)", marginBottom: 6 }}>
                6.1 How to Report
              </div>
              <p>
                If you encounter content that violates these guidelines, please report it using the report button available on posts, comments, and profiles. You can also contact community moderators or the Platform&apos;s Grievance Officer.
              </p>
            </div>

            <div className="sub-section" style={{ marginBottom: 20 }}>
              <div className="sub-label" style={{ fontWeight: 700, color: "var(--text-primary)", marginBottom: 6 }}>
                6.2 Two-Tier Moderation
              </div>
              <p>
                Our Platform uses a two-tier moderation system: <strong>Community Moderators</strong> (peer-appointed alumni) handle community-level issues, while <strong>Platform Administrators</strong> handle platform-wide policies and escalations.
              </p>
            </div>

            <div className="sub-section">
              <div className="sub-label" style={{ fontWeight: 700, color: "var(--text-primary)", marginBottom: 6 }}>
                6.3 Report Categories
              </div>
              <p style={{ marginBottom: 8 }}>When reporting, select the appropriate category:</p>
              <ul style={{ paddingLeft: 20 }}>
                <li>Harassment or Bullying</li>
                <li>Hate Speech</li>
                <li>Inappropriate Content</li>
                <li>Spam or Misinformation</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 7 */}
        <div className="section" id="s7" style={{ marginBottom: 36 }}>
          <div className="section-header" style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14, paddingBottom: 10, borderBottom: "2px solid var(--ivory-dark)" }}>
            <div className="section-num" style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--jam)", color: "white", display: "flex", alignItems: "center", fontSize: 12, fontWeight: 700, flexShrink: 0, justifyContent: "center" }}>
              7
            </div>
            <h2 className="section-title" style={{ fontFamily: "var(--serif)", fontSize: 20, color: "var(--bottle-green)", margin: 0 }}>
              Enforcement Actions
            </h2>
          </div>
          <div className="section-body" style={{ fontSize: 13.5, lineHeight: 1.7, color: "#4B5563" }}>
            <p style={{ marginBottom: 12 }}>Violations of these guidelines may result in:</p>
            <div className="enforcement-list" style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
              {[
                { level: "Level 1", desc: "Content removal" },
                { level: "Level 2", desc: "Warning notification" },
                { level: "Level 3", desc: "Temporary suspension (7–30 days)" },
                { level: "Level 4", desc: "Community ban (removal from specific communities)" },
                { level: "Level 5", desc: "Permanent account termination (for severe or repeated violations)" },
              ].map((item) => (
                <div key={item.level} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ display: "inline-block", background: "var(--jam)", color: "white", fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 4, textTransform: "uppercase", width: 70, textAlign: "center" }}>
                    {item.level}
                  </span>
                  <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>{item.desc}</span>
                </div>
              ))}
            </div>
            <p>
              Severity of action depends on the violation type, impact, and whether it is a repeat offence. Creating alternate accounts to circumvent enforcement will result in extended restrictions.
            </p>
          </div>
        </div>

        {/* Section 8 */}
        <div className="section" id="s8" style={{ marginBottom: 36 }}>
          <div className="section-header" style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14, paddingBottom: 10, borderBottom: "2px solid var(--ivory-dark)" }}>
            <div className="section-num" style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--jam)", color: "white", display: "flex", alignItems: "center", fontSize: 12, fontWeight: 700, flexShrink: 0, justifyContent: "center" }}>
              8
            </div>
            <h2 className="section-title" style={{ fontFamily: "var(--serif)", fontSize: 20, color: "var(--bottle-green)", margin: 0 }}>
              Appeals Process
            </h2>
          </div>
          <div className="section-body" style={{ fontSize: 13.5, lineHeight: 1.7, color: "#4B5563" }}>
            <p>
              If you believe an enforcement action was made in error, you may appeal by writing to our Grievance Officer at{" "}
              <a href="mailto:connect@maritribe.one" style={{ color: "var(--bottle-green)", fontWeight: 600 }}>
                connect@maritribe.one
              </a>
              . Include the specific content or action, reasons for appeal, and any supporting information. We will review and respond within 15 days.
            </p>
          </div>
        </div>

        {/* Section 9 */}
        <div className="section" id="s9" style={{ marginBottom: 36 }}>
          <div className="section-header" style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14, paddingBottom: 10, borderBottom: "2px solid var(--ivory-dark)" }}>
            <div className="section-num" style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--jam)", color: "white", display: "flex", alignItems: "center", fontSize: 12, fontWeight: 700, flexShrink: 0, justifyContent: "center" }}>
              9
            </div>
            <h2 className="section-title" style={{ fontFamily: "var(--serif)", fontSize: 20, color: "var(--bottle-green)", margin: 0 }}>
              Legal Consequences
            </h2>
          </div>
          <div className="section-body" style={{ fontSize: 13.5, lineHeight: 1.7, color: "#4B5563" }}>
            <p>
              Beyond Platform enforcement, violations may result in legal liability under applicable laws including the Information Technology Act, 2000, Bharatiya Nyaya Sanhita, 2023, and other relevant statutes. We cooperate with law enforcement authorities as required.
            </p>
          </div>
        </div>

        {/* Section 10 */}
        <div className="section" id="s10" style={{ marginBottom: 36 }}>
          <div className="section-header" style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14, paddingBottom: 10, borderBottom: "2px solid var(--ivory-dark)" }}>
            <div className="section-num" style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--jam)", color: "white", display: "flex", alignItems: "center", fontSize: 12, fontWeight: 700, flexShrink: 0, justifyContent: "center" }}>
              10
            </div>
            <h2 className="section-title" style={{ fontFamily: "var(--serif)", fontSize: 20, color: "var(--bottle-green)", margin: 0 }}>
              Updates to Guidelines
            </h2>
          </div>
          <div className="section-body" style={{ fontSize: 13.5, lineHeight: 1.7, color: "#4B5563" }}>
            <p>
              We may update these guidelines from time to time. Significant changes will be communicated through Platform announcements. The latest version is always available on the Platform.
            </p>
          </div>
        </div>

        {/* Section 11 */}
        <div className="section" id="s11" style={{ marginBottom: 36 }}>
          <div className="section-header" style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14, paddingBottom: 10, borderBottom: "2px solid var(--ivory-dark)" }}>
            <div className="section-num" style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--jam)", color: "white", display: "flex", alignItems: "center", fontSize: 12, fontWeight: 700, flexShrink: 0, justifyContent: "center" }}>
              11
            </div>
            <h2 className="section-title" style={{ fontFamily: "var(--serif)", fontSize: 20, color: "var(--bottle-green)", margin: 0 }}>
              Contact
            </h2>
          </div>
          <div className="section-body" style={{ fontSize: 13.5, lineHeight: 1.7, color: "#4B5563" }}>
            <p style={{ marginBottom: 14 }}>For questions about these guidelines or to report concerns:</p>
            <div className="grievance-card" style={{ background: "white", border: "1px solid var(--ivory-dark)", borderRadius: 14, padding: "20px 24px", display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 24 }}>
              <div>
                <div className="g-label" style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--bottle-green)", marginBottom: 4 }}>
                  Grievance Officer
                </div>
                <div className="g-name" style={{ fontFamily: "var(--serif)", fontSize: 22, color: "var(--text-primary)", marginBottom: 4 }}>
                  MariTribeOne
                </div>
                <div className="g-email" style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>
                  Email: <a href="mailto:connect@maritribe.one" style={{ color: "var(--bottle-green)", textDecoration: "none", fontWeight: 600 }}>connect@maritribe.one</a>
                </div>
              </div>
              <div className="g-timing" style={{ display: "flex", flexDirection: "column", gap: 8, alignSelf: "center" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", background: "var(--cream)", border: "1px solid var(--ivory-dark)", borderRadius: 100, padding: "5px 12px", width: "fit-content" }}>
                  ⏱ Acknowledgement within 48 hours
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", background: "var(--cream)", border: "1px solid var(--ivory-dark)", borderRadius: 100, padding: "5px 12px", width: "fit-content" }}>
                  ✓ Resolution within 15 days
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Citation note */}
        <div className="citation-note" style={{ background: "rgba(11,34,51,0.03)", border: "1px solid var(--ivory-dark)", borderRadius: 12, padding: "16px 20px", marginTop: 40 }}>
          <div className="citation-note-title" style={{ fontWeight: 700, color: "var(--bottle-green)", fontSize: 13, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Sources &amp; Acknowledgements
          </div>
          <ul style={{ paddingLeft: 20, fontSize: 12.5, color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
            <li><strong>ShareChat Content and Community Guidelines</strong> — Comprehensive content policies, IT Act compliance, moderation framework</li>
            <li><strong>Apna.co Community Guidelines</strong> — Professional networking conduct, privacy protection</li>
            <li><strong>AlmaConnect Community Guidelines</strong> — Alumni-specific principles, respectful engagement</li>
            <li><strong>Internshala Community Guidelines</strong> — Professional conduct, response expectations</li>
            <li><strong>Naukri.com Policies</strong> — Professional platform standards</li>
          </ul>
        </div>
      </div>

      <PublicFooter />
    </>
  );
}
