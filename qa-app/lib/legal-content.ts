// AUTO-PORTED from legacy-html/{privacy,terms}.html — do not retype by hand.
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

export const privacyPolicy: LegalDocument = {
  "title": "Privacy Policy",
  "subtitle": "MaritribeOne Alumni Network · Last Updated: April 2026",
  "sections": [
    {
      "num": "1",
      "title": "Introduction",
      "blocks": [
        {
          "kind": "p",
          "html": "We at MaritribeOne Alumni Network (\"Platform\", \"we\", \"us\", \"our\") recognize that your privacy is very important and take it seriously. This Privacy Policy describes how we collect, use, disclose, and transfer personal information of users through our website and mobile application."
        },
        {
          "kind": "p",
          "html": "This Privacy Policy is compliant with the Information Technology Act, 2000, the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011, and the Digital Personal Data Protection Act, 2023 (DPDP Act)."
        },
        {
          "kind": "p",
          "html": "By using this Platform, you agree to the terms of this Privacy Policy. If you do not agree, please do not use this Platform."
        }
      ]
    },
    {
      "num": "2",
      "title": "Information We Collect",
      "blocks": [
        {
          "kind": "sub",
          "label": "2.1 Personal Information Provided by You",
          "blocks": [
            {
              "kind": "p",
              "html": "When you register on our Platform, we collect the following personal information:"
            },
            {
              "kind": "list",
              "ordered": false,
              "items": [
                "Name, Roll Number, and Batch Year",
                "Email address and mobile/WhatsApp phone number",
                "Profile information including current status (Sailing / Shore / Between Jobs)",
                "Company/Ship name, Rank, and Location (optional)",
                "Profile photograph (optional) and biography (optional)",
                "Specialization (Deck / Engine / Navigation / Commercial / Naval Architect / Business)"
              ]
            }
          ]
        },
        {
          "kind": "sub",
          "label": "2.2 Information Collected Through Use of Service",
          "blocks": [
            {
              "kind": "p",
              "html": "We automatically collect certain information when you use our Platform:"
            },
            {
              "kind": "list",
              "ordered": false,
              "items": [
                "<strong>Log Data:</strong> IP address, browser type, device information, access times, pages viewed",
                "<strong>Usage Data:</strong> Communities joined, posts created, interactions with other members",
                "<strong>Device Data:</strong> Operating system, device identifiers, mobile network information"
              ]
            }
          ]
        },
        {
          "kind": "sub",
          "label": "2.3 Content You Share",
          "blocks": [
            {
              "kind": "p",
              "html": "Any content you post on the Platform including posts, comments, messages, and media files becomes part of your information. Posts made in public communities are visible to all members. Direct messages are stored to facilitate delivery but are not monitored by us."
            }
          ]
        },
        {
          "kind": "sub",
          "label": "2.4 Third-Party Sign-In",
          "blocks": [
            {
              "kind": "p",
              "html": "If you choose to sign in using Google OAuth, we collect your name, email address, and profile picture as made available through your Google account."
            }
          ]
        },
        {
          "kind": "sub",
          "label": "2.5 Device Contacts",
          "blocks": [
            {
              "kind": "p",
              "html": "With your explicit, runtime-granted permission, the Platform reads names and phone numbers from your device address book for the sole purpose of identifying which of your contacts are already Maritribe members and helping you invite contacts who are not yet members. Contact data is processed only to enable this feature, is never sold, rented, or shared with third parties for advertising, and is not used to build profiles about non-members."
            },
            {
              "kind": "p",
              "html": "With your permission, the Platform may also save a Maritribe member's contact details to your device's address book — but only when you explicitly request it (for example, by tapping a \"Save to Contacts\" action on a member's profile). No contact information is written to your device without that explicit action."
            },
            {
              "kind": "p",
              "html": "You may revoke contacts permission at any time through your device's operating system settings. Revoking permission disables the contact-matching and save-to-contacts features but does not otherwise affect your account."
            }
          ]
        },
        {
          "kind": "sub",
          "label": "2.6 Photos, Media, and Camera",
          "blocks": [
            {
              "kind": "p",
              "html": "When you choose to upload a profile photograph, community banner, or media attached to a post or message, the Platform accesses only the specific images you select from your device's gallery or capture via your camera. We do not scan, index, or access your broader media library. Selected images may be cropped on-device before upload."
            }
          ]
        },
        {
          "kind": "sub",
          "label": "2.7 Push Notifications",
          "blocks": [
            {
              "kind": "p",
              "html": "To deliver push notifications, the mobile application registers your device with Firebase Cloud Messaging (operated by Google LLC) and receives a device-specific notification token. This token is linked to your account and used only to deliver notifications relevant to your activity on the Platform (such as replies, mentions, direct messages, and institutional announcements). You may disable notifications at any time from your device settings; doing so will not otherwise affect your account."
            }
          ]
        },
        {
          "kind": "sub",
          "label": "2.8 Diagnostics and Product Analytics",
          "blocks": [
            {
              "kind": "p",
              "html": "To keep the Platform stable and understand how it is used, we use the following services:"
            },
            {
              "kind": "list",
              "ordered": false,
              "items": [
                "<strong>Firebase Crashlytics (Google LLC):</strong> Collects crash reports, stack traces, device model, operating system version, and non-personal diagnostic data when the application encounters an error, so we can identify and fix bugs.",
                "<strong>Microsoft Clarity (Microsoft Corporation):</strong> Collects anonymized in-app interaction data including screens visited, taps, scrolls, and session replays to help us improve usability. Personally identifiable input fields are masked by default; Clarity does not capture passwords, one-time passcodes, or payment details."
              ]
            },
            {
              "kind": "p",
              "html": "These services do not receive your device contact list, the contents of your direct messages, or media you have not chosen to share. Data collected through these services is governed by the respective providers' privacy policies."
            }
          ]
        },
        {
          "kind": "sub",
          "label": "2.9 Device Permissions Summary",
          "blocks": [
            {
              "kind": "p",
              "html": "For full transparency, the Maritribe mobile application requests the following Android and iOS permissions. Sensitive permissions are runtime-prompted and optional; features depending on a denied permission are disabled, but the rest of the application continues to function:"
            },
            {
              "kind": "list",
              "ordered": false,
              "items": [
                "<strong>Internet:</strong> Required to communicate with Platform servers.",
                "<strong>Notifications (<code>POST_NOTIFICATIONS</code>):</strong> To deliver push notifications you have opted into.",
                "<strong>Photos / Media (<code>READ_MEDIA_IMAGES</code>):</strong> To let you pick images to upload as profile photos, banners, or post/message attachments.",
                "<strong>Contacts read (<code>READ_CONTACTS</code>):</strong> To match your device contacts against existing Maritribe members, as described in Section 2.5.",
                "<strong>Contacts write (<code>WRITE_CONTACTS</code>):</strong> To save a Maritribe member's contact details to your device address book only when you explicitly request it, as described in Section 2.5."
              ]
            }
          ]
        }
      ]
    },
    {
      "num": "3",
      "title": "How We Use Your Information",
      "blocks": [
        {
          "kind": "p",
          "html": "We use your personal information for the following purposes:"
        },
        {
          "kind": "list",
          "ordered": false,
          "items": [
            "To set up and maintain your account on the Platform",
            "To verify your alumni status through administrator approval",
            "To facilitate communication between alumni members",
            "To send you notifications about activity relevant to you (mentions, replies, direct messages)",
            "To send institutional announcements and broadcasts from the institute, where relevant",
            "To improve the Platform through analytics and user feedback",
            "To enforce our Terms of Service and Community Guidelines",
            "To comply with legal obligations and respond to lawful requests"
          ]
        }
      ]
    },
    {
      "num": "4",
      "title": "Information Sharing and Disclosure",
      "blocks": [
        {
          "kind": "sub",
          "label": "4.1 Content Visible to Others",
          "blocks": [
            {
              "kind": "p",
              "html": "Public content you post in communities is accessible to all Platform members. Your profile information (name, batch, current status) is visible to other verified members. We do <strong>not</strong> share your phone number or email address with other members without your explicit consent."
            }
          ]
        },
        {
          "kind": "sub",
          "label": "4.2 Sharing with Institution",
          "blocks": [
            {
              "kind": "p",
              "html": "Institute administrators (where signed up) have access to member profiles for verification purposes and may view aggregate analytics. They may also access flagged content for moderation purposes."
            }
          ]
        },
        {
          "kind": "sub",
          "label": "4.3 Legal Requirements",
          "blocks": [
            {
              "kind": "p",
              "html": "We may disclose your information to comply with applicable laws, court orders, or legal process; to investigate, prevent, or take action regarding illegal activities, suspected fraud, or violations of our Terms; or to protect the rights, property, or safety of our users or the public."
            }
          ]
        },
        {
          "kind": "sub",
          "label": "4.4 No Sale of Personal Information",
          "blocks": [
            {
              "kind": "p",
              "html": "We do not sell, rent, or trade your personal information to third parties for commercial purposes."
            }
          ]
        },
        {
          "kind": "sub",
          "label": "4.5 Third-Party Service Providers (Data Processors)",
          "blocks": [
            {
              "kind": "p",
              "html": "We rely on a limited set of trusted service providers to operate the Platform. These providers process data only on our instructions and are bound by contractual confidentiality and data-protection obligations. They are not permitted to use your personal information for their own independent purposes such as advertising or profile building."
            },
            {
              "kind": "list",
              "ordered": false,
              "items": [
                "<strong>Google LLC</strong> — Google Sign-In (authentication), Firebase Cloud Messaging (push notification delivery), and Firebase Crashlytics (crash and stability diagnostics).",
                "<strong>Microsoft Corporation</strong> — Microsoft Clarity (anonymized product analytics and session insights).",
                "<strong>Cloud infrastructure providers</strong> with servers located in India, used for application hosting, database storage, and media storage in support of data-localization requirements."
              ]
            },
            {
              "kind": "p",
              "html": "A current list of sub-processors can be requested from our Grievance Officer at the contact details below."
            }
          ]
        }
      ]
    },
    {
      "num": "5",
      "title": "Data Security",
      "blocks": [
        {
          "kind": "p",
          "html": "We implement industry-standard security measures to protect your personal information including encryption of data in transit and at rest, secure authentication mechanisms, and access controls limiting data access to authorized personnel. However, no method of transmission over the Internet is completely secure, and we cannot guarantee absolute security."
        },
        {
          "kind": "p",
          "html": "We use trusted cloud hosting providers with servers located in India, ensuring compliance with data localization requirements under applicable law."
        }
      ]
    },
    {
      "num": "6",
      "title": "Data Retention",
      "blocks": [
        {
          "kind": "p",
          "html": "We retain your personal information for as long as your account is active or as needed to provide you services. If you delete your account, we will delete or anonymize your personal information within 90 days, except where retention is required for legal obligations or legitimate business purposes. Some content may remain if it has been shared or quoted by other users."
        }
      ]
    },
    {
      "num": "7",
      "title": "Your Rights",
      "blocks": [
        {
          "kind": "p",
          "html": "Under the Digital Personal Data Protection Act, 2023 and applicable laws, you have the following rights:"
        },
        {
          "kind": "list",
          "ordered": false,
          "items": [
            "<strong>Right to Access:</strong> Obtain confirmation of whether your personal data is being processed and access to such data",
            "<strong>Right to Correction:</strong> Request correction of inaccurate or incomplete personal data",
            "<strong>Right to Erasure:</strong> Request deletion of your personal data subject to legal requirements",
            "<strong>Right to Withdraw Consent:</strong> Withdraw consent for processing at any time",
            "<strong>Right to Grievance Redressal:</strong> Lodge complaints regarding data processing"
          ]
        },
        {
          "kind": "p",
          "html": "To exercise these rights, contact our Grievance Officer at the address provided below. We will respond to your request within 30 days."
        }
      ]
    },
    {
      "num": "8",
      "title": "Cookies and Tracking Technologies",
      "blocks": [
        {
          "kind": "p",
          "html": "We use cookies and similar technologies to enhance your experience, remember your preferences, and analyze Platform usage. You can control cookie settings through your browser, but disabling cookies may limit certain Platform functionality."
        }
      ]
    },
    {
      "num": "9",
      "title": "Children's Privacy",
      "blocks": [
        {
          "kind": "p",
          "html": "The Platform is intended for maritime professionals who are 18 years or older. We do not knowingly collect personal information from children under 18. If we become aware that we have collected such information, we will take steps to delete it."
        }
      ]
    },
    {
      "num": "10",
      "title": "Changes to This Policy",
      "blocks": [
        {
          "kind": "p",
          "html": "We may update this Privacy Policy from time to time. We will notify you of significant changes through in-app notifications or email. Your continued use of the Platform after changes constitute acceptance of the updated policy."
        }
      ]
    },
    {
      "num": "11",
      "title": "Grievance Officer",
      "blocks": [
        {
          "kind": "p",
          "html": "In accordance with the Information Technology Act, 2000 and IT Rules 2021, we have appointed a Grievance Officer to address your concerns regarding data privacy and Platform usage:"
        },
        {
          "kind": "grievance",
          "label": "Grievance Officer",
          "name": "MariTribeOne",
          "contactHtml": "MariTribeOne, Mumbai<br> Email: <a href=\"mailto:connect@maritribe.one\">connect@maritribe.one</a>",
          "timings": [
            "⏱ Acknowledgement within 24 hours",
            "✓ Resolution within 15 days",
            "🕐 Mon – Fri, 10 AM – 5 PM IST"
          ]
        }
      ]
    },
    {
      "num": "12",
      "title": "Contact Us",
      "blocks": [
        {
          "kind": "p",
          "html": "For general inquiries about this Privacy Policy, please contact us at <a href=\"mailto:connect@maritribe.one\" style=\"color: var(--bottle-green); font-weight: 600;\">connect@maritribe.one</a>"
        }
      ]
    }
  ]
};

export const termsOfService: LegalDocument = {
  "title": "Terms of Service",
  "subtitle": "MaritribeOne Alumni Network · Last Updated: February 2025",
  "sections": [
    {
      "num": "1",
      "title": "Introduction and Acceptance",
      "blocks": [
        {
          "kind": "p",
          "html": "These Terms of Service (\"Terms\") govern your access to and use of the MaritribeOne Network platform (\"Platform\", \"Service\")."
        },
        {
          "kind": "p",
          "html": "These Terms are to be read together with our Privacy Policy and Community Guidelines. By creating an account or using the Platform, you accept and agree to be bound by these Terms. If you do not agree, please do not use this Platform."
        },
        {
          "kind": "p",
          "html": "Our Platform and these Terms are compliant with the Indian Penal Code, 1860 (now Bharatiya Nyaya Sanhita, 2023), Information Technology Act, 2000, and the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021."
        }
      ]
    },
    {
      "num": "2",
      "title": "Eligibility",
      "blocks": [
        {
          "kind": "p",
          "html": "To use the Platform, you must:"
        },
        {
          "kind": "list",
          "ordered": true,
          "items": [
            "Be at least 18 years of age",
            "Be capable of forming a binding legal agreement",
            "Not be prohibited from using the Platform under applicable laws"
          ]
        },
        {
          "kind": "p",
          "html": "Access to the Platform requires approval by MaritribeOne administrators who verify your association with the Maritime community."
        }
      ]
    },
    {
      "num": "3",
      "title": "Account Registration and Security",
      "blocks": [
        {
          "kind": "sub",
          "label": "3.1 Registration Requirements",
          "blocks": [
            {
              "kind": "p",
              "html": "To register, you must provide accurate information including your name, roll number, batch year, and contact details. You agree to maintain and promptly update this information. Providing false information constitutes a breach of these Terms."
            }
          ]
        },
        {
          "kind": "sub",
          "label": "3.2 Account Security",
          "blocks": [
            {
              "kind": "p",
              "html": "You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorized access to your account. You are responsible for all activities that occur under your account."
            }
          ]
        },
        {
          "kind": "sub",
          "label": "3.3 No Impersonation",
          "blocks": [
            {
              "kind": "p",
              "html": "You will not falsely represent yourself as another person or create fake profiles. You will not allow multiple accounts to be linked to your credentials or create accounts on behalf of others without authorization."
            }
          ]
        }
      ]
    },
    {
      "num": "4",
      "title": "Platform Services",
      "blocks": [
        {
          "kind": "p",
          "html": "The Platform provides alumni with the following services:"
        },
        {
          "kind": "list",
          "ordered": false,
          "items": [
            "Theme-based communities for professional discussions and networking",
            "Direct messaging between verified members (with rate limits)",
            "Institutional announcements and broadcasts where institute administrators are signed up",
            "Content sharing through posts, comments, and media",
            "Cross-batch connections and professional networking"
          ]
        },
        {
          "kind": "p",
          "html": "We may change, suspend, or discontinue any aspect of the Platform at any time without prior notice."
        }
      ]
    },
    {
      "num": "5",
      "title": "User Content and Conduct",
      "blocks": [
        {
          "kind": "sub",
          "label": "5.1 Content Ownership",
          "blocks": [
            {
              "kind": "p",
              "html": "You retain ownership of the content you post on the Platform. By posting content, you grant us a non-exclusive, royalty-free, transferable, sub-licensable, worldwide license to host, use, distribute, display, and create derivative works of your content for the purpose of operating and improving the Platform."
            }
          ]
        },
        {
          "kind": "sub",
          "label": "5.2 Content Responsibility",
          "blocks": [
            {
              "kind": "p",
              "html": "You are solely responsible for the content you post. We do not endorse any user content and are not responsible for any consequences resulting from such content."
            }
          ]
        },
        {
          "kind": "sub",
          "label": "5.3 Prohibited Content",
          "blocks": [
            {
              "kind": "p",
              "html": "You agree not to post content that:"
            },
            {
              "kind": "list",
              "ordered": false,
              "items": [
                "Is illegal, obscene, pornographic, or sexually explicit",
                "Is defamatory, harassing, threatening, or discriminatory",
                "Promotes violence, hatred, or terrorism",
                "Infringes intellectual property rights of others",
                "Contains misleading information",
                "Violates the privacy of others",
                "Threatens the unity, integrity, security, or sovereignty of India",
                "Is spam, fraudulent, or commercial solicitation without authorization"
              ]
            }
          ]
        }
      ]
    },
    {
      "num": "6",
      "title": "Intellectual Property",
      "blocks": [
        {
          "kind": "p",
          "html": "All Platform content, software, trademarks, and logos are owned by or licensed to us. You may not use, copy, modify, or distribute any Platform content without our prior written consent. Posting content that infringes third-party intellectual property rights is prohibited and may result in account termination."
        }
      ]
    },
    {
      "num": "7",
      "title": "Direct Messaging",
      "blocks": [
        {
          "kind": "p",
          "html": "The Platform includes direct messaging functionality with rate limits to prevent spam. Alumni may send up to <strong>4 DM requests</strong> (subject to change) per month to new contacts. Once a connection is established, messaging is unlimited. Recipients may accept or decline message requests. Harassment through messaging will result in account suspension."
        }
      ]
    },
    {
      "num": "8",
      "title": "Intermediary Status",
      "blocks": [
        {
          "kind": "p",
          "html": "We operate as an intermediary under the Information Technology Act, 2000 and the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021. Our role is limited to providing a platform for users to connect and share content. We do not control what users post and are not responsible for user-generated content or actions."
        }
      ]
    },
    {
      "num": "9",
      "title": "Content Removal and Account Termination",
      "blocks": [
        {
          "kind": "sub",
          "label": "9.1 Content Removal",
          "blocks": [
            {
              "kind": "p",
              "html": "We reserve the right to remove any content that violates these Terms or our Community Guidelines. We may also remove content pursuant to valid legal requests or court orders."
            }
          ]
        },
        {
          "kind": "sub",
          "label": "9.2 Account Termination",
          "blocks": [
            {
              "kind": "p",
              "html": "We may suspend or terminate your account for violations of these Terms, Community Guidelines, or applicable laws. We may also terminate accounts upon request from the Institution or for extended inactivity. You may request account deletion at any time through the Platform settings."
            }
          ]
        },
        {
          "kind": "sub",
          "label": "9.3 Right to Appeal",
          "blocks": [
            {
              "kind": "p",
              "html": "If your content is removed or your account is suspended, you will be notified with reasons for the action. You may appeal by contacting our Grievance Officer. We will review appeals and respond within 15 days."
            }
          ]
        }
      ]
    },
    {
      "num": "10",
      "title": "Disclaimers",
      "blocks": [
        {
          "kind": "caps",
          "html": "THE PLATFORM IS PROVIDED \"AS IS\" AND \"AS AVAILABLE\" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE PLATFORM WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE. WE ARE NOT RESPONSIBLE FOR THE CONDUCT OF ANY USER ON OR OFF THE PLATFORM."
        }
      ]
    },
    {
      "num": "11",
      "title": "Limitation of Liability",
      "blocks": [
        {
          "kind": "caps",
          "html": "TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE PLATFORM. OUR TOTAL LIABILITY SHALL NOT EXCEED INR 1,000."
        }
      ]
    },
    {
      "num": "12",
      "title": "Indemnification",
      "blocks": [
        {
          "kind": "p",
          "html": "You agree to indemnify and hold us harmless from any claims, damages, losses, or expenses arising from your use of the Platform, your content, your violation of these Terms, or your violation of the rights of any third party."
        }
      ]
    },
    {
      "num": "13",
      "title": "Governing Law and Disputes",
      "blocks": [
        {
          "kind": "p",
          "html": "These Terms shall be governed by the laws of India. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra."
        }
      ]
    },
    {
      "num": "14",
      "title": "Changes to Terms",
      "blocks": [
        {
          "kind": "p",
          "html": "We reserve the right to modify these Terms at any time. We will notify you of material changes through the Platform or email. Your continued use of the Platform after changes constitute acceptance of the modified Terms."
        }
      ]
    },
    {
      "num": "15",
      "title": "Grievance Redressal",
      "blocks": [
        {
          "kind": "p",
          "html": "In compliance with the IT Rules 2021, we have appointed a Grievance Officer:"
        },
        {
          "kind": "grievance",
          "label": "Grievance Officer",
          "name": "MariTribeOne",
          "contactHtml": "Email: <a href=\"mailto:support@maritribe.one\">support@maritribe.one</a>",
          "timings": [
            "⏱ Acknowledgement within 24 hours",
            "✓ Resolution within 15 days"
          ]
        }
      ]
    },
    {
      "num": "16",
      "title": "Contact Information",
      "blocks": [
        {
          "kind": "p",
          "html": "For questions about these Terms, please contact us at <a href=\"mailto:support@maritribe.one\" style=\"color: var(--bottle-green); font-weight: 600;\">support@maritribe.one</a>"
        }
      ]
    }
  ]
};
