// Android App Links / Digital Asset Links. Served as application/json.
// Path: /.well-known/assetlinks.json
export const dynamic = "force-static";

const ASSET_LINKS = [
  {
    relation: ["delegate_permission/common.handle_all_urls"],
    target: {
      namespace: "android_app",
      package_name: "one.maritribe.app",
      sha256_cert_fingerprints: [
        "20:96:98:D7:C2:96:B4:7E:93:B6:09:84:34:F2:DA:D0:90:C9:E9:AB:DF:AC:D9:AF:04:FD:03:7B:2E:9A:AC:2D",
        "C0:F7:53:AF:A4:E0:3E:B2:D8:A6:71:A9:AB:FE:2D:4A:7C:6A:1A:7E:60:6E:71:2B:8A:23:8C:1E:34:2A:01:DA",
        "64:67:63:F1:FC:AB:BD:81:F6:FD:7D:AE:AF:64:BE:FB:7D:0A:9C:DD:CD:EE:4A:F3:11:B7:44:5F:52:55:0B:34",
      ],
    },
  },
];

export function GET() {
  return new Response(JSON.stringify(ASSET_LINKS), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
