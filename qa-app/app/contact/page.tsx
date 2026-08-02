import Link from "next/link";
import type { Metadata } from "next";
import { PublicHeader } from "../components/public-header";
import { PublicFooter } from "../components/public-footer";
import { WaveDivider } from "../components/wave-divider";
import { CopyAddress } from "./copy-address";
import { listenLinks } from "@/lib/public-content";

const CONTACT_EMAIL = "connect@maritribe.one";

export const metadata: Metadata = {
  title: "Contact — maritribeOne",
  description: `Write to ${CONTACT_EMAIL}. One inbox for guest pitches, partnerships, corrections, and everything else.`,
};

/**
 * Each route prefills a subject line, so mail arrives already sorted. The card
 * states the subject it will use — no hidden behaviour.
 */
const routes = [
  {
    heading: "Come on the podcast",
    body: "You have spent years somewhere most of the industry never sees. Tell us where, and the one thing you would want a ship's crew to hear.",
    subject: "Podcast guest",
  },
  {
    heading: "Work together",
    body: "Sponsorship, an episode series, a research collaboration, or an event. Say what you have in mind and roughly when.",
    subject: "Partnership",
  },
  {
    heading: "Something else",
    body: "A correction, a question, a note about the app, or an introduction we should make. All of it reaches the same desk.",
    subject: "Hello",
  },
];

function mailto(subject: string) {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;
}

export default function ContactPage() {
  return (
    <>
      <PublicHeader active="contact" />

      <section className="contact-hero">
        <div className="wrap contact-hero-inner">
          <p className="overline">Contact</p>
          <h1 className="contact-hero-title">
            <span className="contact-hero-line">Open channel.</span>
            <span className="contact-hero-line">
              A <span className="contact-hero-accent">person</span> reads it.
            </span>
          </h1>
          <p className="contact-hero-copy">
            Everything arrives at one address — guest pitches, partnerships, corrections, and the
            things we got wrong. No forms, no ticket numbers, no routing menu.
          </p>
        </div>
      </section>

      <WaveDivider from="var(--green-900)" to="var(--paper)" />

      <main className="contact-main">
        <div className="wrap">
          <section className="hail-plate reveal" aria-labelledby="hail-heading">
            <div className="hail-plate-inner">
              <p className="marketing-kicker hail-kicker" id="hail-heading">
                Write to
              </p>

              <CopyAddress address={CONTACT_EMAIL} />

              <div className="hail-actions">
                <a className="hail-open" href={mailto("Hello")}>
                  Open in email
                </a>
                <p className="hail-note">Most mail gets a reply within two working days.</p>
              </div>
            </div>
          </section>

          <section className="contact-routes">
            <div className="contact-routes-head reveal">
              <h2>What are you writing about?</h2>
              <p>
                Pick the closest one and your mail app opens with the subject already set. If none
                of them fit, the address above works just as well.
              </p>
            </div>

            <div className="route-grid" data-stagger>
              {routes.map((route) => (
                <a className="route-card reveal" key={route.subject} href={mailto(route.subject)}>
                  <h3>{route.heading}</h3>
                  <p>{route.body}</p>
                  <span className="route-subject">
                    Subject: <strong>{route.subject}</strong>
                  </span>
                  <span className="route-go" aria-hidden="true">
                    Write in
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path
                        d="M5 12h13m-5.5-6 6 6-6 6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </a>
              ))}
            </div>
          </section>

          <section className="contact-listen reveal">
            <div>
              <p className="marketing-kicker">Rather listen first?</p>
              <h2>The show is where most conversations start.</h2>
            </div>
            <div className="contact-listen-links">
              <a href={listenLinks.spotify} target="_blank" rel="noreferrer">
                Spotify
              </a>
              <a href={listenLinks.youtube} target="_blank" rel="noreferrer">
                YouTube
              </a>
              <Link href="/episodes">All episodes</Link>
            </div>
          </section>
        </div>
      </main>

      <WaveDivider from="var(--paper)" to="var(--green-900)" flip />

      <section className="home-cta-band">
        <div className="wrap home-cta-inner reveal">
          <p className="home-cta-label">Welcome To The Tribe</p>
          <h2>Conversations from every corner of the industry.</h2>
          <div className="home-cta-row">
            <Link href="/episodes" className="home-cta home-cta-primary">
              Explore episodes
            </Link>
            <a href={mailto("Hello")} className="home-cta home-cta-secondary">
              Email us
            </a>
          </div>
        </div>
      </section>

      <PublicFooter />
    </>
  );
}
