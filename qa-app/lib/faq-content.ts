// AUTO-PORTED from legacy-html/faq.html — do not retype by hand.
// Answer HTML is restricted at extraction time to an inline-tag allowlist and
// originates in this repository, never from user input.

export type FaqItem = { q: string; a: string };

export type FaqGroup = { title: string; subtitle: string; items: FaqItem[] };

export const faqIntro = "This platform brings together maritime alumni across all batches in one place — as easy to connect as WhatsApp, but with better privacy and searchable conversations. Here's everything you need to know.";

export const faqHero = {
  "title": "Your Guide to Getting Started",
  "subtitle": "MaritribeOne Alumni Network · Platform FAQ"
};

export const faqGroups: FaqGroup[] = [
  {
    "title": "Getting Started",
    "subtitle": "Privacy & your first steps.",
    "items": [
      {
        "q": "Will my phone number be visible to everyone?",
        "a": "No — this is the biggest difference from WhatsApp. Your phone number stays completely private. Other alumni can connect with you through the platform's messaging system without ever seeing your number."
      },
      {
        "q": "Can people search for me by name?",
        "a": "You'll discover people through communities, posts, and shared interests — making connections more natural and theme-based rather than profile-hunting."
      }
    ]
  },
  {
    "title": "Communities",
    "subtitle": "Where conversations happen.",
    "items": [
      {
        "q": "What are communities?",
        "a": "Communities are discussion spaces organized around themes like Navigation Q&amp;A, Engine Room, Shore Jobs, or Reunion Planning. Think of them like focused WhatsApp groups, but with searchable history and cross-batch visibility."
      },
      {
        "q": "Public vs Private communities — what's the difference?",
        "a": "<strong>Public communities:</strong> anyone can join instantly.<br><br> <strong>Private communities:</strong> you can see they exist, but need moderator approval to join.<br><br> Both types appear in your feed once joined."
      },
      {
        "q": "How should I use the home feed?",
        "a": "Your home feed shows a mix of posts from communities you've joined plus discovery content from public communities you haven't joined yet. This helps you stay updated with your interests while discovering new conversations. Pull down to refresh anytime."
      },
      {
        "q": "Tips for making the most of communities?",
        "a": "<ul> <li><strong>Join across batches:</strong> Don't just stick to your batch year. Join technical, location-based, or interest communities to connect broadly.</li> <li><strong>Use flairs/tags when posting:</strong> In a Technical Q&amp;A community, tag posts with Navigation, Engine, Safety, etc. so people can find relevant discussions later.</li> <li><strong>Create communities when needed:</strong> If there's a topic worth discussing — job opportunities in your city, a specific vessel type, a sports interest — create a community for it.</li> <li><strong>Use Hearts meaningfully:</strong> Instead of filling threads with \"thanks\" comments, clap helpful posts. It keeps threads clean and shows appreciation.</li> </ul>"
      }
    ]
  },
  {
    "title": "Direct Messaging",
    "subtitle": "Connect with control.",
    "items": [
      {
        "q": "How does direct messaging work?",
        "a": "When you want to message someone new, you send a message request. They can accept or decline. Once accepted, you can chat freely. This prevents spam and gives everyone control over their inbox."
      },
      {
        "q": "Are there limits on sending messages?",
        "a": "Only for initial outreach — limited to 3 new DM requests per month to prevent misuse. Once a conversation is accepted, there are no message limits. Chat as much as you want."
      },
      {
        "q": "What if I don't want messages from certain people?",
        "a": "You can decline message requests and block users at any time. Blocked users can't send you messages or interact with your posts. You can also report users for harassment if needed."
      },
      {
        "q": "Why can't I just message anyone directly?",
        "a": "The request system protects your privacy and inbox. It prevents cold outreach spam while still allowing genuine connections. If someone seems interesting from their community posts, you can request to connect — they get to decide if they want to engage."
      }
    ]
  },
  {
    "title": "Posts & Content",
    "subtitle": "Share meaningfully.",
    "items": [
      {
        "q": "What can I post?",
        "a": "Text posts with up to 5 images, GIFs, links with rich previews, and polls. Posts go into specific communities, not your personal profile. Always add a relevant flair/tag to help with discoverability."
      },
      {
        "q": "Can I save posts to read later?",
        "a": "Yes! Use the anchor/save feature on any post. You'll find all your saved content in the dedicated Anchors section — perfect for job posts, technical advice, or recommendations you want to come back to."
      },
      {
        "q": "What if I see inappropriate content?",
        "a": "Use the Report/Flag feature on any post or comment. Community moderators and admins will review it. Report categories: spam, harassment, inappropriate content, and misinformation. All reports are taken seriously to maintain community quality."
      }
    ]
  },
  {
    "title": "Why This Platform?",
    "subtitle": "Beyond WhatsApp.",
    "items": [
      {
        "q": "Why do we need admin approval and moderation?",
        "a": "Quality over quantity. Verification keeps the community authentic (verified alumni only), moderation keeps conversations respectful and valuable, and both protect your privacy. WhatsApp groups often devolve into spam or inappropriate forwards — this platform maintains professional standards while staying friendly."
      }
    ]
  },
  {
    "title": "Updates & Future",
    "subtitle": "What's coming next.",
    "items": [
      {
        "q": "Will there be updates to the platform?",
        "a": "Yes! Watch for announcements from the admin about new features. Initial versions focus on core functionality — communities, messaging, and search. Based on your feedback and usage patterns, we'll add features like business directories, job boards, mentor matching, and more."
      }
    ]
  }
];

export const faqDeleteCard = {
  "title": "Want to delete your account?",
  "desc": "Your connections and history will be permanently lost. If you have a concern, we'd rather help.",
  "href": "mailto:connect@maritribe.one?subject=Account%20Deletion%20Request",
  "label": "Email us"
};
