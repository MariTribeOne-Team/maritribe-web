import Link from "next/link";
import { PublicHeader } from "./components/public-header";
import { PublicFooter } from "./components/public-footer";
import { WaveDivider } from "./components/wave-divider";
import { BlackBox, SidesSwitch, SyncDial, WallStage } from "./components/home-visuals";

function CompassWatermark() {
  return (
    <svg
      className="home-hero-compass"
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g stroke="#fff" strokeWidth="1.25">
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

/**
 * The homepage is told as four scenes: each pairs a piece of the essay with a
 * figure you can touch. Copy stays server-rendered; only the figures are client
 * components (see `components/home-visuals.tsx`).
 */
export default function HomePage() {
  return (
    <>
      <PublicHeader active="home" />

      <div className="home-v2">
        <section className="home-hero">
          <CompassWatermark />

          <div className="wrap home-hero-inner">
            <div>
              <p className="overline">Why maritribeOne exists</p>
              <h1 className="home-hero-title">
                <span className="home-hero-line">The ship is one language.</span>
                <span className="home-hero-line">
                  The industry <span className="home-hero-accent">isn&apos;t</span>.
                </span>
              </h1>
            </div>

            <aside className="hero-human-detail">
              <p>They have never seen this specific hull before, yet they know its pulse.</p>
              <div className="word-rail" aria-hidden="true">
                <span>
                  Standardized steel
                  <br />
                  Shared equipment
                  <br />
                  One mechanical dialect
                  <br />
                  Standardized steel
                </span>
              </div>
            </aside>
          </div>

          <div className="home-scroll-hint" aria-hidden="true">
            <span>Read the story</span>
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </section>

        <WaveDivider from="var(--green-900)" to="var(--cream)" />

        <main className="story">
          <div className="wrap story-content">
            <section className="story-scene">
              <div className="scene-copy">
                <p className="scene-kicker reveal">The shared language</p>
                <h2 className="reveal">An unfamiliar ship can still feel familiar.</h2>

                <p className="lead reveal">
                  A Croatian chief engineer can board a Japanese-built VLCC in Houston, walk
                  straight into the engine room, and immediately troubleshoot a Wartsila engine
                  designed in Switzerland. They&apos;ve never seen this specific hull before, yet
                  they know its pulse.
                </p>

                <p className="reveal">
                  This is the unspoken magic of maritime: an extreme, global &quot;Oneness.&quot; We
                  are an industry bonded by standardized steel, shared equipment, and a liquid
                  talent pool that allows a Greek owner, an Indian navigator, and a Filipino crew to
                  speak the exact same mechanical dialect in the middle of the ocean.
                </p>

                <span className="scene-note reveal">Tap the dial to synchronize the parts</span>
              </div>

              <div className="scene-visual reveal">
                <SyncDial />
              </div>
            </section>

            <section className="story-scene visual-first">
              <div className="scene-copy">
                <p className="scene-kicker reveal">The wider industry</p>
                <h2 className="reveal">
                  But a strange thing happens when we look past the physical ship.
                </h2>

                <p className="reveal">
                  While we have perfected the &quot;Oneness&quot; of hardware, our understanding of
                  the broader industry remains deeply siloed. The engine room rarely gets to see how
                  a complex laytime dispute unfolds; the bridge doesn&apos;t always know the
                  behind-the-scenes chaos of securing a spot fixture; and the folks on shore can
                  easily lose touch with the brutal operational realities of a twelve-hour port
                  turnaround.
                </p>

                <p className="reveal">
                  We spend our careers mastering our specific corner of the blue economy, often
                  treating the other facets of shipping as a black box.
                </p>

                <span className="scene-note reveal">Open it, then tap each corner</span>
              </div>

              <div className="scene-visual reveal">
                <BlackBox />
              </div>
            </section>

            <section className="story-scene">
              <div className="scene-copy">
                <p className="scene-kicker reveal">A view from both sides</p>
                <h2 className="reveal">The blind spot became personal.</h2>

                <p className="reveal">
                  I know this friction intimately because it defines my own journey. When I
                  eventually stepped away from active sailing to dive into the world of building
                  software and digital tools for our industry, the learning curve shoreside was a
                  massive wake-up call. I realized how much of the commercial, legal, and
                  operational machine I had been blind to while out at sea and how unnecessary that
                  blind spot really is.
                </p>

                <p className="reveal">
                  maritribeOne is a podcast born out of that exact realization, driven by a healthy
                  dose of sheer curiosity.
                </p>

                <p className="reveal">
                  We are here to peer into every hidden pocket, dark corner, and fascinating niche
                  of global shipping. We want to marvel at the sheer scale of global trade and break
                  down how all these disparate pieces from maritime law and shipbroking to marine
                  insurance and port logistics somehow fit together to keep the world moving.
                </p>

                <span className="scene-note reveal">Tap between sea and shore</span>
              </div>

              <div className="scene-visual reveal">
                <SidesSwitch />
              </div>
            </section>

            <section className="story-scene visual-first">
              <div className="scene-copy">
                <p className="scene-kicker reveal">Bridging the invisible wall</p>
                <h2 className="reveal">Leaving the sea should not mean starting again.</h2>

                <p className="reveal">
                  This space is especially for those who are currently sailing. Too often, seafarers
                  view the shore-side business as a completely different planet, assuming
                  they&apos;ll just figure it out whenever they decide to hand over their discharge
                  books. But that creates a jarring, frustrating gap where seasoned maritime
                  professionals suddenly feel like amateurs again.
                </p>

                <p className="reveal">
                  You should be able to step off the operational deck and straight into the
                  commercial engine room with a 360-degree understanding of how the machine runs.
                  Whether you are on watch in the Pacific, managing a fleet from a high-rise, or
                  simply obsessed with how 90% of global trade actually functions, welcome to the
                  tribe. Let&apos;s figure out how the rest of the ship runs.
                </p>

                <span className="scene-note reveal">Tap to cross the invisible wall</span>
              </div>

              <div className="scene-visual reveal">
                <WallStage />
              </div>
            </section>
          </div>
        </main>

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
      </div>

      <PublicFooter />
    </>
  );
}
