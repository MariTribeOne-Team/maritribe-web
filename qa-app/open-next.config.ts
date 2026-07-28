import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// OpenNext adapter config for deploying this Next.js app to Cloudflare Workers.
// Defaults are fine for an app with no KV/D1/R2 bindings yet. Add caching
// overrides here (e.g. R2 incremental cache) when needed.
export default defineCloudflareConfig();
