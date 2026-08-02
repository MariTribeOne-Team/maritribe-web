import Link from "next/link";
import { PublicHeader } from "../components/public-header";
import { PublicFooter } from "../components/public-footer";

export default function ChildSafetyPage() {
  const tocItems = [
    { num: 1, label: "Our Commitment", href: "#s1" },
    { num: 2, label: "Platform Audience", href: "#s2" },
    { num: 3, label: "Prohibited Conduct", href: "#s3" },
    { num: 4, label: "Prevention Measures", href: "#s4" },
    { num: 5, label: "In-App Reporting", href: "#s5" },
    { num: 6, label: "Response & Enforcement", href: "#s6" },
    { num: 7, label: "Legal Reporting", href: "#s7" },
    { num: 8, label: "External Resources", href: "#s8" },
    { num: 9, label: "Point of Contact", href: "#s9" },
    { num: 10, label: "Updates", href: "#s10" },
  ];

  return (
    <>
      <PublicHeader active="child-safety" />

      <div className="hero">
        <div className="hero-inner">
          <h1 style={{ color: "#fff" }}>Child Safety Standards</h1>
          <p className="hero-sub" style={{ color: "rgba(255,255,255,0.6)" }}>
            Maritribe &nbsp;·&nbsp; Last Updated: April 2026
          </p>
        </div>
      </div>

      <div className="page-wrapper" style={{ maxWidth: "780px", margin: "0 auto", padding: "48px 24px 80px" }}>
        <div className="intro-card" style={{ background: "linear-gradient(135deg, var(--jam), var(--bottle-green))", borderRadius: 16, padding: "24px 28px", marginBottom: 40, color: "white" }}>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.9)", marginBottom: 12 }}>
            Maritribe is a professional networking platform for maritime professionals aged 18 years and older. We have zero tolerance for child sexual abuse and exploitation (CSAE), and for any child sexual abuse material (CSAM) on our Platform.
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.9)", margin: 0 }}>
            This document sets out Maritribe&apos;s published standards for preventing, detecting, and responding to CSAE, in compliance with the Google Play Child Safety Standards Policy, the Apple App Store guidelines, and applicable laws including the Protection of Children from Sexual Offences Act, 2012 (POCSO Act) and the Information Technology Act, 2000 of India.
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
              Our Commitment
            </h2>
          </div>
          <div className="section-body" style={{ fontSize: 13.5, lineHeight: 1.7, color: "#4B5563" }}>
            <p style={{ marginBottom: 8 }}>Maritribe is committed to providing a safe environment that is free from the sexual abuse and exploitation of children. Our commitments include:</p>
            <ul style={{ paddingLeft: 20 }}>
              <li>Zero tolerance for CSAM and any form of child sexual abuse or exploitation on the Platform.</li>
              <li>Proactive prevention through platform design, age restrictions, and moderation.</li>
              <li>Rapid response when such material or conduct is identified or reported.</li>
              <li>Compliance with all applicable child safety laws, including mandatory reporting obligations.</li>
              <li>Cooperation with law enforcement and recognised child safety organisations.</li>
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
              Platform Audience
            </h2>
          </div>
          <div className="section-body" style={{ fontSize: 13.5, lineHeight: 1.7, color: "#4B5563" }}>
            <p style={{ marginBottom: 12 }}>
              Maritribe is intended exclusively for adult maritime professionals — alumni, cadets, officers, and industry members — who are <strong>18 years of age or older</strong>. The Platform is not designed for, marketed to, or intended to be used by children.
            </p>
            <p>
              Access to Maritribe is gated by institutional verification: new accounts require affiliation with a verified maritime institution and approval by a designated administrator before gaining full access. Accounts found to be operated by minors are removed.
            </p>
          </div>
        </div>

        {/* Section 3 */}
        <div className="section" id="s3" style={{ marginBottom: 36 }}>
          <div className="section-header" style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14, paddingBottom: 10, borderBottom: "2px solid var(--ivory-dark)" }}>
            <div className="section-num" style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--jam)", color: "white", display: "flex", alignItems: "center", fontSize: 12, fontWeight: 700, flexShrink: 0, justifyContent: "center" }}>
              3
            </div>
            <h2 className="section-title" style={{ fontFamily: "var(--serif)", fontSize: 20, color: "var(--bottle-green)", margin: 0 }}>
              Prohibited Conduct
            </h2>
          </div>
          <div className="section-body" style={{ fontSize: 13.5, lineHeight: 1.7, color: "#4B5563" }}>
            <p style={{ marginBottom: 8 }}>The following are strictly prohibited on Maritribe and will result in immediate removal, permanent account termination, and — where required by law — reporting to the relevant authorities:</p>
            <ul style={{ paddingLeft: 20 }}>
              <li>Child sexual abuse material (CSAM) in any form, including real, animated, computer-generated, or AI-generated depictions.</li>
              <li>Sexualised content involving minors, whether explicit or implied.</li>
              <li>Grooming, solicitation, sextortion, or any attempt to sexually exploit a child.</li>
              <li>Sharing, requesting, or linking to CSAM, including via direct messages or third-party links.</li>
              <li>Non-consensual intimate imagery of any person, including minors.</li>
              <li>Glorification, normalisation, or trivialisation of child sexual abuse.</li>
              <li>Identifying, exposing, or disclosing the identity of a child victim of sexual abuse.</li>
            </ul>
          </div>
        </div>

        {/* Section 4 */}
        <div className="section" id="s4" style={{ marginBottom: 36 }}>
          <div className="section-header" style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14, paddingBottom: 10, borderBottom: "2px solid var(--ivory-dark)" }}>
            <div className="section-num" style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--jam)", color: "white", display: "flex", alignItems: "center", fontSize: 12, fontWeight: 700, flexShrink: 0, justifyContent: "center" }}>
              4
            </div>
            <h2 className="section-title" style={{ fontFamily: "var(--serif)", fontSize: 20, color: "var(--bottle-green)", margin: 0 }}>
              Prevention Measures
            </h2>
          </div>
          <div className="section-body" style={{ fontSize: 13.5, lineHeight: 1.7, color: "#4B5563" }}>
            <div className="sub-section" style={{ marginBottom: 20 }}>
              <div className="sub-label" style={{ fontWeight: 700, color: "var(--text-primary)", marginBottom: 6 }}>
                4.1 Age Gating &amp; Verification
              </div>
              <p>
                Users must attest to being at least 18 years old at sign-up. Institutional verification by an approved administrator is required before an account can post, comment, or send direct messages.
              </p>
            </div>

            <div className="sub-section" style={{ marginBottom: 20 }}>
              <div className="sub-label" style={{ fontWeight: 700, color: "var(--text-primary)", marginBottom: 6 }}>
                4.2 Moderation
              </div>
              <p style={{ marginBottom: 8 }}>Maritribe operates a two-tier moderation system:</p>
              <ul style={{ paddingLeft: 20, marginBottom: 8 }}>
                <li><strong>College/Institution Administrators</strong> — verify affiliations and oversee institutional communities.</li>
                <li><strong>Community Moderators</strong> — review reports, remove violating content, and escalate serious concerns.</li>
              </ul>
              <p>
                All moderation actions are recorded in an audit log. Content flagged as potentially CSAE is removed pending review and preserved for law enforcement as required.
              </p>
            </div>

            <div className="sub-section" style={{ marginBottom: 20 }}>
              <div className="sub-label" style={{ fontWeight: 700, color: "var(--text-primary)", marginBottom: 6 }}>
                4.3 Safeguards on Direct Messaging
              </div>
              <p>
                Direct messages are rate-limited to prevent mass outreach and spam. Users can block other members, decline message requests, and report messages without the other party being notified.
              </p>
            </div>

            <div className="sub-section">
              <div className="sub-label" style={{ fontWeight: 700, color: "var(--text-primary)", marginBottom: 6 }}>
                4.4 Staff Training
              </div>
              <p>
                Team members involved in trust &amp; safety review materials from the Internet Watch Foundation (IWF), the National Center for Missing &amp; Exploited Children (NCMEC), and INHOPE regarding the identification and handling of CSAE.
              </p>
            </div>
          </div>
        </div>

        {/* Section 5 */}
        <div className="section" id="s5" style={{ marginBottom: 36 }}>
          <div className="section-header" style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14, paddingBottom: 10, borderBottom: "2px solid var(--ivory-dark)" }}>
            <div className="section-num" style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--jam)", color: "white", display: "flex", alignItems: "center", fontSize: 12, fontWeight: 700, flexShrink: 0, justifyContent: "center" }}>
              5
            </div>
            <h2 className="section-title" style={{ fontFamily: "var(--serif)", fontSize: 20, color: "var(--bottle-green)", margin: 0 }}>
              In-App Reporting
            </h2>
          </div>
          <div className="section-body" style={{ fontSize: 13.5, lineHeight: 1.7, color: "#4B5563" }}>
            <p style={{ marginBottom: 12 }}>
              Every post, comment, profile, and direct message on Maritribe includes a <strong>Report</strong> option accessible from the overflow (⋯) menu. Users can select <em>&quot;Child safety concern / CSAE&quot;</em> as a report category.
            </p>
            <p style={{ marginBottom: 12 }}>
              Reports submitted through this channel are routed directly to Maritribe&apos;s trust &amp; safety queue and are prioritised for immediate review. Reporters can remain anonymous to the reported user.
            </p>
            <p>
              Reports can also be sent by email to the point of contact listed below. No registration is required to submit a report by email.
            </p>
          </div>
        </div>

        {/* Section 6 */}
        <div className="section" id="s6" style={{ marginBottom: 36 }}>
          <div className="section-header" style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14, paddingBottom: 10, borderBottom: "2px solid var(--ivory-dark)" }}>
            <div className="section-num" style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--jam)", color: "white", display: "flex", alignItems: "center", fontSize: 12, fontWeight: 700, flexShrink: 0, justifyContent: "center" }}>
              6
            </div>
            <h2 className="section-title" style={{ fontFamily: "var(--serif)", fontSize: 20, color: "var(--bottle-green)", margin: 0 }}>
              Response &amp; Enforcement
            </h2>
          </div>
          <div className="section-body" style={{ fontSize: 13.5, lineHeight: 1.7, color: "#4B5563" }}>
            <p style={{ marginBottom: 8 }}>When a CSAE report is received, Maritribe will:</p>
            <ul style={{ paddingLeft: 20 }}>
              <li>Acknowledge the report within 24 hours.</li>
              <li>Remove the reported content from public view immediately, pending review.</li>
              <li>Preserve the content, associated metadata, and account data for law enforcement as required by law.</li>
              <li>Permanently terminate accounts found to have uploaded, shared, or solicited CSAM.</li>
              <li>Report confirmed CSAM to the relevant regional and national authorities as set out in section 7.</li>
              <li>Cooperate with lawful requests from law enforcement.</li>
            </ul>
          </div>
        </div>

        {/* Section 7 */}
        <div className="section" id="s7" style={{ marginBottom: 36 }}>
          <div className="section-header" style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14, paddingBottom: 10, borderBottom: "2px solid var(--ivory-dark)" }}>
            <div className="section-num" style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--jam)", color: "white", display: "flex", alignItems: "center", fontSize: 12, fontWeight: 700, flexShrink: 0, justifyContent: "center" }}>
              7
            </div>
            <h2 className="section-title" style={{ fontFamily: "var(--serif)", fontSize: 20, color: "var(--bottle-green)", margin: 0 }}>
              Legal Reporting
            </h2>
          </div>
          <div className="section-body" style={{ fontSize: 13.5, lineHeight: 1.7, color: "#4B5563" }}>
            <p style={{ marginBottom: 8 }}>Maritribe complies with mandatory reporting obligations under applicable law. Confirmed CSAM and credible CSAE concerns are reported to:</p>
            <ul style={{ paddingLeft: 20, marginBottom: 12 }}>
              <li><strong>National Cyber Crime Reporting Portal (India)</strong> — <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: "var(--bottle-green)", fontWeight: 600, textDecoration: "none" }}>cybercrime.gov.in</a></li>
              <li><strong>Local law enforcement</strong> under the POCSO Act, 2012 and the IT Act, 2000 (India).</li>
              <li><strong>National Center for Missing &amp; Exploited Children (NCMEC)</strong> CyberTipline — <a href="https://report.cybertip.org" target="_blank" rel="noopener noreferrer" style={{ color: "var(--bottle-green)", fontWeight: 600, textDecoration: "none" }}>report.cybertip.org</a> — for content with a U.S. nexus.</li>
              <li>The relevant national hotline in the user&apos;s jurisdiction via the <strong>INHOPE</strong> network.</li>
            </ul>
            <p>
              Maritribe preserves user records and content in accordance with legal preservation requests and cooperates with lawful disclosure orders.
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
              External Resources
            </h2>
          </div>
          <div className="section-body" style={{ fontSize: 13.5, lineHeight: 1.7, color: "#4B5563" }}>
            <p style={{ marginBottom: 8 }}>If you or someone you know is in immediate danger, contact local emergency services. To report CSAM or seek help:</p>
            <ul style={{ paddingLeft: 20 }}>
              <li><strong>India — National Cyber Crime Reporting Portal:</strong> <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: "var(--bottle-green)", fontWeight: 600, textDecoration: "none" }}>cybercrime.gov.in</a></li>
              <li><strong>India — Childline:</strong> 1098</li>
              <li><strong>NCMEC CyberTipline (U.S.):</strong> <a href="https://report.cybertip.org" target="_blank" rel="noopener noreferrer" style={{ color: "var(--bottle-green)", fontWeight: 600, textDecoration: "none" }}>report.cybertip.org</a> · 1-800-843-5678</li>
              <li><strong>Internet Watch Foundation (UK/International):</strong> <a href="https://www.iwf.org.uk/report" target="_blank" rel="noopener noreferrer" style={{ color: "var(--bottle-green)", fontWeight: 600, textDecoration: "none" }}>iwf.org.uk/report</a></li>
              <li><strong>INHOPE (global hotline network):</strong> <a href="https://www.inhope.org" target="_blank" rel="noopener noreferrer" style={{ color: "var(--bottle-green)", fontWeight: 600, textDecoration: "none" }}>inhope.org</a></li>
            </ul>
          </div>
        </div>

        {/* Section 9 */}
        <div className="section" id="s9" style={{ marginBottom: 36 }}>
          <div className="section-header" style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14, paddingBottom: 10, borderBottom: "2px solid var(--ivory-dark)" }}>
            <div className="section-num" style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--jam)", color: "white", display: "flex", alignItems: "center", fontSize: 12, fontWeight: 700, flexShrink: 0, justifyContent: "center" }}>
              9
            </div>
            <h2 className="section-title" style={{ fontFamily: "var(--serif)", fontSize: 20, color: "var(--bottle-green)", margin: 0 }}>
              Point of Contact
            </h2>
          </div>
          <div className="section-body" style={{ fontSize: 13.5, lineHeight: 1.7, color: "#4B5563" }}>
            <p style={{ marginBottom: 14 }}>
              Maritribe has designated a point of contact for child safety matters. This person is authorised to discuss Maritribe&apos;s CSAM prevention practices and compliance with regulators, law enforcement, and app store operators.
            </p>
            <div className="grievance-card" style={{ background: "white", border: "1px solid var(--ivory-dark)", borderRadius: 14, padding: "20px 24px", display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 24 }}>
              <div>
                <div className="g-label" style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--bottle-green)", marginBottom: 4 }}>
                  Child Safety Contact
                </div>
                <div className="g-name" style={{ fontFamily: "var(--serif)", fontSize: 22, color: "var(--text-primary)", marginBottom: 4 }}>
                  Maritribe Trust &amp; Safety
                </div>
                <div className="g-email" style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>
                  Email: <a href="mailto:maritribe1305@gmail.com" style={{ color: "var(--bottle-green)", textDecoration: "none", fontWeight: 600 }}>maritribe1305@gmail.com</a>
                </div>
              </div>
              <div className="g-timing" style={{ display: "flex", flexDirection: "column", gap: 8, alignSelf: "center" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", background: "var(--cream)", border: "1px solid var(--ivory-dark)", borderRadius: 100, padding: "5px 12px", width: "fit-content" }}>
                  ⏱ Acknowledged within 24 hours
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", background: "var(--cream)", border: "1px solid var(--ivory-dark)", borderRadius: 100, padding: "5px 12px", width: "fit-content" }}>
                  ✓ Action within 72 hours
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 10 */}
        <div className="section" id="s10" style={{ marginBottom: 36 }}>
          <div className="section-header" style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14, paddingBottom: 10, borderBottom: "2px solid var(--ivory-dark)" }}>
            <div className="section-num" style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--jam)", color: "white", display: "flex", alignItems: "center", fontSize: 12, fontWeight: 700, flexShrink: 0, justifyContent: "center" }}>
              10
            </div>
            <h2 className="section-title" style={{ fontFamily: "var(--serif)", fontSize: 20, color: "var(--bottle-green)", margin: 0 }}>
              Updates
            </h2>
          </div>
          <div className="section-body" style={{ fontSize: 13.5, lineHeight: 1.7, color: "#4B5563" }}>
            <p>
              Maritribe reviews these standards at least annually and whenever our practices, the Platform, or applicable law change materially. The current version is always available at{" "}
              <Link href="/child-safety" style={{ color: "var(--bottle-green)", fontWeight: 600 }}>
                maritribe.one/child-safety
              </Link>
              .
            </p>
          </div>
        </div>
      </div>

      <PublicFooter />
    </>
  );
}
