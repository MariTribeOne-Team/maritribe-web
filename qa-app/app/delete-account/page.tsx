import type { Metadata } from "next";
import Link from "next/link";
import { PublicHeader } from "../components/public-header";
import { PublicFooter } from "../components/public-footer";

export const metadata: Metadata = {
  title: "Delete Your Account — Maritribe",
  description: "How to request deletion of your Maritribe account and associated data.",
  robots: { index: false, follow: false },
};

const sectionCard: React.CSSProperties = { marginBottom: 36 };
const sectionHeader: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  marginBottom: 14,
  paddingBottom: 10,
  borderBottom: "2px solid var(--ivory-dark)",
};
const sectionNum: React.CSSProperties = {
  width: 24,
  height: 24,
  borderRadius: "50%",
  background: "var(--jam)",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 12,
  fontWeight: 700,
  flexShrink: 0,
};
const sectionTitle: React.CSSProperties = {
  fontFamily: "var(--serif)",
  fontSize: 20,
  color: "var(--bottle-green)",
  margin: 0,
};
const sectionBody: React.CSSProperties = { fontSize: 13.5, lineHeight: 1.7, color: "#4B5563" };

const contactCard: React.CSSProperties = {
  background: "var(--cream)",
  border: "1px solid var(--ivory-dark)",
  borderLeft: "3px solid var(--bottle-green)",
  borderRadius: 12,
  padding: "20px 22px",
  marginTop: 12,
};
const cLabel: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--bottle-green)",
  marginBottom: 6,
};
const linkStyle: React.CSSProperties = { color: "var(--bottle-green)", textDecoration: "none", fontWeight: 600 };

function Pill({ kind, children }: { kind: "delete" | "keep"; children: React.ReactNode }) {
  const isDelete = kind === "delete";
  return (
    <span
      style={{
        display: "inline-block",
        background: isDelete ? "rgba(185,28,28,0.08)" : "rgba(15,74,60,0.08)",
        color: isDelete ? "#B91C1C" : "var(--bottle-green)",
        fontSize: 11,
        fontWeight: 700,
        padding: "2px 8px",
        borderRadius: 100,
        textTransform: "uppercase",
        letterSpacing: "0.04em",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

const retentionRows: { data: string; kind: "delete" | "keep"; label: string; retention: string }[] = [
  { data: "Profile information (name, photo, bio, rank, company, batch, roll number, date of birth, gender)", kind: "delete", label: "Deleted", retention: "Within 90 days" },
  { data: "Email address and phone number", kind: "delete", label: "Deleted", retention: "Within 90 days" },
  { data: "Direct messages you sent or received", kind: "delete", label: "Deleted", retention: "Within 90 days" },
  { data: "Uploaded media (profile photos, post/message attachments)", kind: "delete", label: "Deleted", retention: "Within 90 days" },
  { data: "Device contacts previously matched for the contact-discovery feature", kind: "delete", label: "Deleted", retention: "Immediately on deletion" },
  { data: "Push notification tokens (FCM)", kind: "delete", label: "Deleted", retention: "Immediately on deletion" },
  { data: "Posts and comments you authored in communities", kind: "keep", label: "Anonymized", retention: "Retained, attributed to “Deleted User”" },
  { data: "Moderation records (reports, warnings, bans) where retention is required to protect the community", kind: "keep", label: "Retained", retention: "Up to 3 years" },
  { data: "Transaction, audit, and legal records required under applicable law", kind: "keep", label: "Retained", retention: "As required by law" },
  { data: "Aggregated, anonymized analytics (e.g. Microsoft Clarity, Firebase Crashlytics)", kind: "keep", label: "Retained", retention: "Cannot be linked back to you" },
];

export default function DeleteAccountPage() {
  return (
    <>
      <PublicHeader active="account" />

      <div className="hero">
        <div className="hero-inner">
          <h1 style={{ color: "#fff" }}>Delete Your Account</h1>
          <p className="hero-sub" style={{ color: "rgba(255,255,255,0.6)" }}>
            MaritribeOne Alumni Network &nbsp;·&nbsp; Last Updated: April 2026
          </p>
        </div>
      </div>

      <div className="page-wrapper">
        <div
          className="intro-card"
          style={{
            background: "white",
            border: "1px solid var(--ivory-dark)",
            borderLeft: "3px solid var(--jam)",
            borderRadius: 12,
            padding: "18px 22px",
            marginBottom: 32,
            fontSize: 14,
            lineHeight: 1.7,
            color: "#374151",
          }}
        >
          This page explains how to request deletion of your{" "}
          <strong style={{ color: "var(--bottle-green)" }}>Maritribe</strong> (developed and operated by
          MaritribeOne Alumni Network) account and associated personal data. You can delete your account directly
          from within the mobile app, or by sending us a request via email. Deletion is permanent and cannot be
          undone.
        </div>

        {/* Section 1 */}
        <div className="section" id="s1" style={sectionCard}>
          <div className="section-header" style={sectionHeader}>
            <div className="section-num" style={sectionNum}>1</div>
            <h2 className="section-title" style={sectionTitle}>Delete from Inside the App</h2>
          </div>
          <div className="section-body" style={sectionBody}>
            <p style={{ marginBottom: 8 }}>The fastest way to delete your account is from the Maritribe mobile application:</p>
            <ol style={{ paddingLeft: 20 }}>
              <li>Open the Maritribe app and sign in to your account.</li>
              <li>Tap your profile picture in the top-right to open your profile.</li>
              <li>Go to <strong>Settings</strong> &rarr; <strong>Account</strong>.</li>
              <li>Tap <strong>Delete Account</strong>.</li>
              <li>Read the confirmation screen, then tap <strong>Delete Permanently</strong> to confirm.</li>
            </ol>
            <p>Once confirmed, your account is marked for deletion immediately and you will be signed out on all devices.</p>
          </div>
        </div>

        {/* Section 2 */}
        <div className="section" id="s2" style={sectionCard}>
          <div className="section-header" style={sectionHeader}>
            <div className="section-num" style={sectionNum}>2</div>
            <h2 className="section-title" style={sectionTitle}>Request Deletion by Email</h2>
          </div>
          <div className="section-body" style={sectionBody}>
            <p style={{ marginBottom: 12 }}>
              If you cannot access the app, you may request deletion by emailing us from the email address registered
              with your Maritribe account:
            </p>
            <div style={contactCard}>
              <div style={cLabel}>Email</div>
              <a style={linkStyle} href="mailto:connect@maritribe.one?subject=Account%20Deletion%20Request">connect@maritribe.one</a>
              <p style={{ marginTop: 10, fontSize: 13, color: "var(--text-secondary)" }}>
                Subject line: <strong>Account Deletion Request</strong>
              </p>
              <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                Please include your registered name, batch year, and roll number so we can verify your identity.
              </p>
            </div>
            <p style={{ marginTop: 14 }}>
              We acknowledge such requests within 24 hours and complete deletion within 15 days of verification, as per
              our grievance policy.
            </p>
          </div>
        </div>

        {/* Section 3 */}
        <div className="section" id="s3" style={sectionCard}>
          <div className="section-header" style={sectionHeader}>
            <div className="section-num" style={sectionNum}>3</div>
            <h2 className="section-title" style={sectionTitle}>What Data Is Deleted vs. Retained</h2>
          </div>
          <div className="section-body" style={sectionBody}>
            <p style={{ marginBottom: 12 }}>The table below summarizes how each category of data is handled when you delete your account:</p>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, margin: "8px 0 4px" }}>
                <thead>
                  <tr>
                    {["Data", "On Deletion", "Retention"].map((h) => (
                      <th
                        key={h}
                        style={{
                          textAlign: "left",
                          padding: "10px 12px",
                          borderBottom: "1px solid var(--ivory-dark)",
                          verticalAlign: "top",
                          fontWeight: 700,
                          color: "var(--bottle-green)",
                          background: "var(--cream)",
                          fontSize: 12,
                          textTransform: "uppercase",
                          letterSpacing: "0.04em",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {retentionRows.map((row, i) => (
                    <tr key={i}>
                      <td style={{ padding: "10px 12px", borderBottom: i === retentionRows.length - 1 ? "none" : "1px solid var(--ivory-dark)", verticalAlign: "top" }}>{row.data}</td>
                      <td style={{ padding: "10px 12px", borderBottom: i === retentionRows.length - 1 ? "none" : "1px solid var(--ivory-dark)", verticalAlign: "top" }}>
                        <Pill kind={row.kind}>{row.label}</Pill>
                      </td>
                      <td style={{ padding: "10px 12px", borderBottom: i === retentionRows.length - 1 ? "none" : "1px solid var(--ivory-dark)", verticalAlign: "top" }}>{row.retention}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ marginTop: 14 }}>
              Content you shared that has been quoted, screenshotted, or re-shared by other users may remain visible on
              the Platform outside our control.
            </p>
          </div>
        </div>

        {/* Section 4 */}
        <div className="section" id="s4" style={sectionCard}>
          <div className="section-header" style={sectionHeader}>
            <div className="section-num" style={sectionNum}>4</div>
            <h2 className="section-title" style={sectionTitle}>Alternatives to Full Deletion</h2>
          </div>
          <div className="section-body" style={sectionBody}>
            <p style={{ marginBottom: 8 }}>If you do not want to delete your account permanently, you may prefer one of these options instead:</p>
            <ul style={{ paddingLeft: 20 }}>
              <li><strong>Sign out:</strong> from Settings &rarr; Account &rarr; Sign Out. Your data remains, but you stop using the service.</li>
              <li><strong>Disable notifications:</strong> from your device settings or in-app notification preferences.</li>
              <li><strong>Revoke contacts permission:</strong> through your device&apos;s operating system settings, to stop contact matching.</li>
              <li><strong>Edit or remove specific content:</strong> delete individual posts, comments, or messages from the app.</li>
              <li><strong>Correction of data:</strong> contact our Grievance Officer to correct inaccurate profile information.</li>
            </ul>
          </div>
        </div>

        {/* Section 5 */}
        <div className="section" id="s5" style={sectionCard}>
          <div className="section-header" style={sectionHeader}>
            <div className="section-num" style={sectionNum}>5</div>
            <h2 className="section-title" style={sectionTitle}>Questions or Concerns</h2>
          </div>
          <div className="section-body" style={sectionBody}>
            <p style={{ marginBottom: 12 }}>
              If you experience any issue deleting your account, or have questions about how your data is handled,
              please contact our Grievance Officer:
            </p>
            <div style={contactCard}>
              <div style={cLabel}>Grievance Officer — MaritribeOne</div>
              MariTribeOne, Mumbai<br />
              Email: <a style={linkStyle} href="mailto:connect@maritribe.one">connect@maritribe.one</a>
              <p style={{ marginTop: 10, fontSize: 13, color: "var(--text-secondary)" }}>
                Acknowledgement within 24 hours · Resolution within 15 days · Mon – Fri, 10 AM – 5 PM IST
              </p>
            </div>
            <p style={{ marginTop: 14 }}>
              For full details on how we handle your personal data, please review our{" "}
              <Link href="/privacy" style={{ color: "var(--bottle-green)", fontWeight: 600 }}>Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </div>

      <PublicFooter />
    </>
  );
}
