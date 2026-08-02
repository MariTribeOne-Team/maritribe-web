import Link from "next/link";
import { PublicHeader } from "./components/public-header";
import { PublicFooter } from "./components/public-footer";
import { WaveDivider } from "./components/wave-divider";

function ArticleParagraph({ children }: { children: React.ReactNode }) {
  return <p className="home-paragraph reveal">{children}</p>;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="home-section-label reveal">{children}</p>;
}

function CompassWatermark() {
  return (
    <svg
      className="home-hero-compass"
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g stroke="#fff" strokeWidth="1.5">
        <circle cx="200" cy="200" r="190" />
        <circle cx="200" cy="200" r="160" />
        <circle cx="200" cy="200" r="60" />
        <polygon points="200,10 210,180 200,160 190,180" fill="#fff" opacity="0.5" />
        <polygon points="200,390 210,220 200,240 190,220" fill="#fff" opacity="0.3" />
        <polygon points="10,200 180,190 160,200 180,210" fill="#fff" opacity="0.3" />
        <polygon points="390,200 220,190 240,200 220,210" fill="#fff" opacity="0.3" />
        <polygon points="66,66 185,175 170,170 175,185" fill="#fff" opacity="0.2" />
        <polygon points="334,66 225,175 230,170 215,185" fill="#fff" opacity="0.2" />
        <polygon points="66,334 175,225 170,230 185,215" fill="#fff" opacity="0.2" />
        <polygon points="334,334 225,225 215,230 230,215" fill="#fff" opacity="0.2" />
      </g>
    </svg>
  );
}

export default function HomePage() {
  return (
    <>
      <PublicHeader active="home" />

      <section className="home-hero">
        <CompassWatermark />
        <div className="wrap home-hero-inner">
          <p className="overline">Why maritribeOne exists</p>
          <h1 className="home-hero-title">
            <span className="home-hero-line">The ship is one language.</span>
            <span className="home-hero-line">
              The industry <span className="home-hero-accent">isn&apos;t</span>.
            </span>
          </h1>
        </div>
        <div className="home-scroll-hint" aria-hidden="true">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </section>

      <WaveDivider from="var(--green-900)" to="var(--cream)" />

      <main className="home-main">
        <article className="home-article">
          <p className="home-intro reveal">
            A Croatian chief engineer can board a Japanese-built VLCC in Houston, walk straight
            into the engine room, and immediately troubleshoot a Wartsila engine designed in
            Switzerland. They&apos;ve never seen this specific hull before, yet they know its pulse.
          </p>

          <ArticleParagraph>
            This is the unspoken magic of maritime: an extreme, global &quot;Oneness.&quot; We are an
            industry bonded by standardized steel, shared equipment, and a liquid talent pool that
            allows a Greek owner, an Indian navigator, and a Filipino crew to speak the exact same
            mechanical dialect in the middle of the ocean.
          </ArticleParagraph>

          <ArticleParagraph>
            But a strange thing happens the moment we look past the physical ship.
          </ArticleParagraph>

          <ArticleParagraph>
            While we have perfected the &quot;Oneness&quot; of hardware, our understanding of the broader
            industry remains deeply siloed. The engine room rarely gets to see how a complex
            laytime dispute unfolds; the bridge doesn&apos;t always know the behind-the-scenes chaos of
            securing a spot fixture; and the folks on shore can easily lose touch with the brutal
            operational realities of a twelve-hour port turnaround. We spend our careers mastering
            our specific corner of the blue economy, often treating the other facets of shipping as
            a black box.
          </ArticleParagraph>

          <SectionLabel>A View From Both Sides</SectionLabel>

          <ArticleParagraph>
            I know this friction intimately because it defines my own journey. When I eventually
            stepped away from active sailing to dive into the world of building software and digital
            tools for our industry, the learning curve shoreside was a massive wake-up call. I
            realized how much of the commercial, legal, and operational machine I had been blind to
            while out at sea and how unnecessary that blind spot really is.
          </ArticleParagraph>

          <ArticleParagraph>
            maritribeOne is a podcast born out of that exact realization, driven by a healthy dose
            of sheer curiosity.
          </ArticleParagraph>

          <ArticleParagraph>
            We are here to peer into every hidden pocket, dark corner, and fascinating niche of
            global shipping. We want to marvel at the sheer scale of global trade and break down
            how all these disparate pieces from maritime law and shipbroking to marine insurance
            and port logistics somehow fit together to keep the world moving.
          </ArticleParagraph>

          <SectionLabel>Bridging The Invisible Wall</SectionLabel>

          <ArticleParagraph>
            This space is especially for those who are currently sailing. Too often, seafarers view
            the shore-side business as a completely different planet, assuming they&apos;ll just figure
            it out whenever they decide to hand over their discharge books. But that creates a
            jarring, frustrating gap where seasoned maritime professionals suddenly feel like
            amateurs again.
          </ArticleParagraph>

          <aside className="home-quote reveal">
            <p>
              We believe that when you leave the sea tomorrow, you shouldn&apos;t have to leave
              shipping. You shouldn&apos;t have to waste time playing catch-up.
            </p>
          </aside>

          <ArticleParagraph>
            You should be able to step off the operational deck and straight into the commercial
            engine room with a 360-degree understanding of how the machine runs. Whether you are on
            watch in the Pacific, managing a fleet from a high-rise, or simply obsessed with how
            90% of global trade actually functions, welcome to the tribe. Let&apos;s figure out how the
            rest of the ship runs.
          </ArticleParagraph>
        </article>

        <WaveDivider from="var(--cream)" to="var(--green-900)" flip />

        <section className="home-cta-band">
          <div className="wrap home-cta-inner reveal">
            <p className="home-cta-label">Welcome To The Tribe</p>
            <h2>Conversations from every corner of the industry.</h2>
            <div className="home-cta-row">
              <Link href="/episodes" className="home-cta home-cta-primary">
                Explore episodes
              </Link>
              <Link href="/contact" className="home-cta home-cta-secondary">
                Contact
              </Link>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </>
  );
}
