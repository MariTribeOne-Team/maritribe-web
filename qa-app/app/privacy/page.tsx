import type { Metadata } from "next";
import { PublicHeader } from "../components/public-header";
import { PublicFooter } from "../components/public-footer";
import { LegalDocument } from "../components/legal-document";
import { privacyPolicy } from "@/lib/legal-content";

export const metadata: Metadata = {
  title: "Privacy Policy — maritribeOne",
  description:
    "How the MaritribeOne Alumni Network collects, uses, stores, and shares personal information.",
};

export default function PrivacyPage() {
  return (
    <>
      <PublicHeader active="none" />
      <LegalDocument doc={privacyPolicy} heroModifier="support-hero-lock" />
      <PublicFooter />
    </>
  );
}
