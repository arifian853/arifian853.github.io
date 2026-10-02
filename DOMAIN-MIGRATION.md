# Domain migration and SEO

Both `arifian.dev` and `arifian.web.id` may serve the same site during the transition. Use one canonical origin across both domains to consolidate indexing signals. Canonical tags are a hint; Google ultimately chooses the indexed URL.

## Current deployment

Set these build environment variables on the frontend hosting provider:

```dotenv
SITE_URL=https://arifian.dev
NEXT_PUBLIC_API_URL=https://elara.arifian.dev
```

These are also the code defaults. No domain redirects have been enabled. Titles, canonical URLs, Open Graph URLs, structured data, robots.txt and the sitemap use `SITE_URL`. Internal links remain relative and work on both domains.

## Switch to arifian.web.id

1. Verify both domains in Google Search Console, preferably as Domain properties through DNS. Ensure all existing routes and assets work over HTTPS on the new domain.
2. Change `SITE_URL` to `https://arifian.web.id` for the deployment serving both domains, then rebuild and deploy. If the domains use separate deployments, use the same canonical setting on both.
3. Confirm `/`, `/about`, `/projects`, `/projects/16`, `/ai`, `/message` and `/design` return 200. Check canonical and `og:url` point to the matching `.web.id` path. `/robots.txt` must reference the new `/sitemap.xml`, which should contain all 22 public pages.
4. Submit the new sitemap in Search Console. Once ready to redirect traffic from `.dev`, add permanent redirects preserving each path; do not redirect every project to the homepage.
5. After the redirects work, use Search Console's Change of Address from `.dev` to `.web.id`. Monitor indexing, redirects and 404s.

For the existing Netlify deployment, the domain-specific rules below can be added to `netlify.toml` **at the switch**, while the old domain is still attached to that site:

```toml
[[redirects]]
  from = "https://arifian.dev/*"
  to = "https://arifian.web.id/:splat"
  status = 301
  force = true

[[redirects]]
  from = "https://www.arifian.dev/*"
  to = "https://arifian.web.id/:splat"
  status = 301
  force = true
```

Only use the `www` rule if that hostname is configured. Check HTTP-to-HTTPS handling and query string preservation too. Example: `/projects/16?ref=portfolio` should reach the same path and query on the new domain without a loop.

Google recommends keeping migration redirects for at least one year. That requires retaining ownership of `.dev` and maintaining its DNS, HTTPS and redirect service. If `.dev` expires, these redirects stop working and links pointing to it cannot reliably pass visitors or indexing signals to `.web.id`. Moving before expiry gives search engines time to discover the replacement, but cannot guarantee the same result as keeping redirects active.

## Move the Elara backend independently

When the VPS serves `https://elara.arifian.web.id` successfully over HTTPS:

1. Allow both frontend origins in backend CORS during the transition.
2. Set `NEXT_PUBLIC_API_URL=https://elara.arifian.web.id`, then rebuild and deploy the frontend. This variable is embedded into the browser bundle at build time.
3. Verify chat/streaming and anonymous message list/submission. Avoid submitting test messages to production during automated checks.
4. Keep the old API available during the transition if possible. The frontend canonical setting and API setting can change on different dates.

Sources: [Google site migration guidance](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes), [Search Console Change of Address](https://support.google.com/webmasters/answer/9370220), [Netlify redirect options](https://docs.netlify.com/manage/routing/redirects/redirect-options/).

## Local validation (3 October 2026)

The supplied report audited a development server with browser extensions. Its Performance 64 / SEO 83 scores are not a like-for-like production baseline. Separate Lighthouse mobile runs against `next start` on port 3001, with a clean headless browser and identical settings, measured:

| Metric | Production before | Production after |
| --- | --- | --- |
| Performance | 91 | 94 |
| SEO | 92 | 100 |
| Largest Contentful Paint | 3.5 s | 2.8 s |
| Speed Index | 1.4 s | 1.1 s |
| Total Blocking Time | 91 ms | 169 ms |
| Cumulative Layout Shift | 0 | 0 |

These are individual local audit measurements, not guarantees for deployed performance. All 22 public pages were checked for HTTP 200, unique titles, descriptions, canonical URLs, social previews and a single main landmark. Mobile rendering, dark theme persistence, client navigation and project images passed browser checks. Current and future domain/API environment configurations passed checks. Build (including TypeScript) and lint passed.
