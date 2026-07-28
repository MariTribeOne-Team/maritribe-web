// Apple Universal Links association file. Served with Content-Type application/json
// via a route handler so it works regardless of host (Cloudflare Pages _headers is
// not honored under OpenNext/Workers). Path: /.well-known/apple-app-site-association
export const dynamic = "force-static";

const AASA = {
  applinks: {
    details: [
      {
        appIDs: ["UU5LKC4475.one.maritribe.app"],
        components: [
          { "/": "/p/*", comment: "Post deep links" },
          { "/": "/c/*", comment: "Community invite deep links" },
          { "/": "/invite", comment: "App invite landing" },
          { "/": "/invite/*", comment: "App invite with token" },
        ],
      },
    ],
  },
};

export function GET() {
  return new Response(JSON.stringify(AASA), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
