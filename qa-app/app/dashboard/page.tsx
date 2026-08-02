import { PublicHeader } from "../components/public-header";
import { PublicFooter } from "../components/public-footer";

const kpis = [
  { label: "Visits today", num: "148", sub: "unique sessions", accent: true },
  { label: "Page views today", num: "632", sub: "all page loads" },
  { label: "Total visits", num: "4.2k", sub: "all time" },
  { label: "Total page views", num: "18.7k", sub: "all time" },
];

const bars = [
  { day: "Mon", value: 52, height: "42%" },
  { day: "Tue", value: 61, height: "56%" },
  { day: "Wed", value: 74, height: "68%" },
  { day: "Thu", value: 65, height: "60%" },
  { day: "Fri", value: 92, height: "84%" },
  { day: "Sat", value: 78, height: "71%" },
  { day: "Sun", value: 109, height: "100%" },
];

const topPages = [
  ["/episodes/twenty-years-regulatory-side-indian-shipping", "342"],
  ["/episodes/from-the-bridge-to-the-algorithm", "215"],
  ["/episodes/forty-years-of-not-looking-away", "166"],
  ["/episodes", "149"],
];

const audience = [
  ["Editor posts published", "12"],
  ["Registered accounts", "218"],
  ["Bookmarks saved", "391"],
  ["Highlights saved", "126"],
];

export default function DashboardPage() {
  return (
    <>
      <PublicHeader active="dashboard" mode="editor" />

      <section className="hero-band">
        <div className="wrap">
          <p className="overline">Editor dashboard</p>
          <h1 className="page-hero-title">Analytics overview</h1>
        </div>
      </section>

      <main className="page-shell marketing-shell">
        <div className="dash-wrap">
          <div className="kpis">
            {kpis.map((item) => (
              <div className={item.accent ? "kpi kpi-accent" : "kpi"} key={item.label}>
                <div className="label">{item.label}</div>
                <div className="num">{item.num}</div>
                <div className="sub">{item.sub}</div>
              </div>
            ))}
          </div>

          <section className="panel">
            <h2>Visits — last 7 days</h2>
            <div className="bars">
              {bars.map((item) => (
                <div className="bar-col" key={item.day}>
                  <div className="bar" style={{ height: item.height }}>
                    <span className="v">{item.value}</span>
                  </div>
                  <span className="d">{item.day}</span>
                </div>
              ))}
            </div>
          </section>

          <div className="two">
            <section className="panel">
              <h2>Most viewed pages</h2>
              {topPages.map(([label, value]) => (
                <div className="list-row" key={label}>
                  <span>{label}</span>
                  <span className="v">{value}</span>
                </div>
              ))}
            </section>

            <section className="panel">
              <h2>Content and audience</h2>
              {audience.map(([label, value]) => (
                <div className="list-row" key={label}>
                  <span>{label}</span>
                  <span className="v">{value}</span>
                </div>
              ))}
            </section>
          </div>
        </div>
      </main>

      <PublicFooter />
    </>
  );
}
