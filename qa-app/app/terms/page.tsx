import type { Metadata } from "next";
import { PublicHeader } from "../components/public-header";
import { PublicFooter } from "../components/public-footer";
import { LegalDocument } from "../components/legal-document";
import { termsOfService } from "@/lib/legal-content";

export const metadata: Metadata = {
  title: "Terms of Service — maritribeOne",
  description:
    "The terms that govern use of the MaritribeOne Alumni Network platform, website, and mobile application.",
};

export default function TermsPage() {
  return (
    <>
      <PublicHeader active="none" />
      <LegalDocument doc={termsOfService} heroModifier="support-hero-anchor" />
      <PublicFooter />
    </>
  );
}
