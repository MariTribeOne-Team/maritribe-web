import { PublicHeader } from "../components/public-header";
import { PublicFooter } from "../components/public-footer";

const blockButtons = ["Heading", "Paragraph", "Bullet list", "Takeaway card", "YouTube", "Image"];

export default function CreatePostPage() {
  return (
    <>
      <PublicHeader active="create-post" mode="editor" />

      <main className="page-shell marketing-shell">
        <div className="editor-wrap">
          <div className="editor-grid">
            <section className="editor-panel">
              <h1>Create an episode post</h1>
              <p className="editor-sub">
                Fill the details, then add content blocks. This route replaces the old static
                editor screen and is ready for real editor wiring later.
              </p>

              <div className="field">
                <label>Episode title</label>
                <input placeholder="The future of green corridors in South Asian shipping" />
              </div>

              <div className="field">
                <label>One-line summary</label>
                <textarea rows={2} placeholder="A short, punchy summary of the conversation." />
              </div>

              <div className="field-row">
                <div className="field">
                  <label>Category</label>
                  <select defaultValue="Technology">
                    <option>Regulation</option>
                    <option>Training</option>
                    <option>Technology</option>
                    <option>Welfare</option>
                    <option>Policy</option>
                    <option>Green Shipping</option>
                    <option>Interview</option>
                  </select>
                </div>
                <div className="field">
                  <label>Duration</label>
                  <input placeholder="28 min" />
                </div>
                <div className="field">
                  <label>Date</label>
                  <input type="date" />
                </div>
              </div>

              <div className="field-row editor-two-up">
                <div className="field">
                  <label>Guest / author</label>
                  <input placeholder="Capt. Meera Iyer" />
                </div>
                <div className="field">
                  <label>Cover image URL</label>
                  <input placeholder="Optional image link" />
                </div>
              </div>

              <div className="field">
                <label>Lead YouTube video URL</label>
                <input placeholder="Paste a YouTube link" />
              </div>

              <div className="lead-wrap">
                <div className="lead-grid">
                  <div className="lead-col">
                    <div className="lead-video">
                      <span>Lead video preview</span>
                    </div>
                    <div className="lead-mark">
                      <button type="button" className="home-cta home-cta-primary">
                        Mark current moment
                      </button>
                      <span className="lead-dur">Length 28:12</span>
                    </div>
                  </div>

                  <aside className="lead-chapters">
                    <div className="lc-head">
                      Chapters <span className="lc-hint">play and mark, or add manually</span>
                    </div>
                    <div className="ch-rows">
                      <div className="ch-row">
                        <input placeholder="0" />
                        <input placeholder="00" />
                        <input placeholder="Chapter title" />
                      </div>
                      <div className="ch-row">
                        <input placeholder="8" />
                        <input placeholder="42" />
                        <input placeholder="Second chapter title" />
                      </div>
                    </div>
                    <button type="button" className="ch-add">
                      Add chapter
                    </button>
                  </aside>
                </div>
              </div>

              <h2 className="editor-section-head">Content blocks</h2>
              <div className="editor-blocks">
                <div className="editor-block">
                  <span className="editor-block-kind">Paragraph</span>
                  <textarea rows={4} placeholder="Write the opening paragraph here." />
                </div>
                <div className="editor-block">
                  <span className="editor-block-kind">Takeaway</span>
                  <input placeholder="Short takeaway label" />
                  <textarea rows={4} placeholder="The key takeaway from the episode." />
                </div>
              </div>
            </section>

            <aside className="add-block">
              <h3>Add a block</h3>
              <div className="add-grid">
                {blockButtons.map((item) => (
                  <button key={item} type="button">
                    {item}
                  </button>
                ))}
              </div>
              <button type="button" className="home-cta home-cta-primary editor-publish">
                Publish episode
              </button>
              <p className="editor-help">
                Real publish flow can now attach here without returning to the standalone HTML tool.
              </p>
            </aside>
          </div>
        </div>
      </main>

      <PublicFooter />
    </>
  );
}
