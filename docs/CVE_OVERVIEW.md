# CVE Overview

Date: 2026-02-05

> For more security information, see [SECURITY.md](./SECURITY.md)

## 1. Production Dependencies

| Severity | v4 | v3 | v2 | v1 |
| --- | ---: | ---: | ---: | ---: |
| critical | 0 | 0 | 0 | 0 |
| high | 0 | 0 | 0 | 1 |
| moderate | 0 | 0 | 0 | 0 |
| low | 0 | 0 | 0 | 0 |
| info | 0 | 0 | 0 | 0 |
| unknown | 0 | 0 | 0 | 0 |

## 2. All Dependencies

| Severity | v4 | v3 | v2 | v1 |
| --- | ---: | ---: | ---: | ---: |
| critical | 1 | 1 | 1 | 1 |
| high | 7 | 7 | 12 | 10 |
| moderate | 1 | 1 | 13 | 1 |
| low | 1 | 1 | 2 | 0 |
| info | 0 | 0 | 0 | 0 |
| unknown | 0 | 0 | 0 | 0 |

## 3. All Security Vulnerabilities (Unique)

| Package | Severity | CVE | Affected Versions | Description |
| --- | --- | --- | --- | --- |
| locutus | critical | CVE-2026-25521 | v4, v3, v2, v1 | locutus is vulnerable to Prototype Pollution |
| @angular/common | high | CVE-2025-66035 | v1 | Angular is Vulnerable to XSRF Token Leakage via Protocol-Relative URLs in Angula |
| @angular/compiler | high | CVE-2025-66412 | v1 | Angular Stored XSS Vulnerability via SVG Animation, SVG URL and MathML Attribute |
| @angular/compiler | high | CVE-2026-22610 | v1 | Angular has XSS Vulnerability via Unsanitized SVG Script Attributes |
| @angular/core | high | CVE-2026-22610 | v1 | Angular has XSS Vulnerability via Unsanitized SVG Script Attributes |
| @isaacs/brace-expansion | high | CVE-2026-25547 | v2, v1 | @isaacs/brace-expansion has Uncontrolled Resource Consumption |
| @modelcontextprotocol/sdk | high | CVE-2026-25536 | v4, v3, v2 | @modelcontextprotocol/sdk has cross-client data leak via shared server/transport |
| braces | high | CVE-2024-4068 | v4, v3, v2, v1 | Uncontrolled resource consumption in braces |
| fast-xml-parser | high | CVE-2026-25128 | v4, v3, v2 | fast-xml-parser has RangeError DoS Numeric Entities Bug |
| hono | high | CVE-2026-22818 | v2 | Hono JWK Auth Middleware has JWT algorithm confusion when JWK lacks "alg" (untru |
| hono | high | CVE-2026-22817 | v2 | Hono JWT Middleware's JWT Algorithm Confusion via Unsafe Default (HS256) Allows  |
| lodash.pick | high | CVE-2020-8203 | v2, v1 | Prototype Pollution in lodash |
| qs | high | CVE-2025-15284 | v4, v3, v2 | qs's arrayLimit bypass in its bracket notation allows DoS via memory exhaustion |
| semver | high | CVE-2022-25883 | v2 | semver vulnerable to Regular Expression Denial of Service |
| tar | high | CVE-2026-23745 | v4, v3, v2, v1 | node-tar is Vulnerable to Arbitrary File Overwrite and Symlink Poisoning via Ins |
| tar | high | CVE-2026-23950 | v4, v3, v2, v1 | Race Condition in node-tar Path Reservations via Unicode Ligature Collisions on  |
| tar | high | CVE-2026-24842 | v4, v3, v2, v1 | node-tar Vulnerable to Arbitrary File Creation/Overwrite via Hardlink Path Trave |
| ejs | moderate | CVE-2024-33883 | v2 | ejs lacks certain pollution protection |
| esbuild | moderate | GHSA-67mh-4wv8-2f99 | v2 | esbuild enables any website to send any requests to the development server and r |
| hono | moderate | CVE-2026-24771 | v2 | Hono vulnerable to XSS through ErrorBoundary component  |
| hono | moderate | CVE-2026-24472 | v2 | Hono cache middleware ignores "Cache-Control: private" leading to Web Cache Dece |
| hono | moderate | CVE-2026-24398 | v2 | Hono IPv4 address validation bypass in IP Restriction Middleware allows IP spoof |
| hono | moderate | CVE-2026-24473 | v2 | Hono has an Arbitrary Key Read in Serve static Middleware (Cloudflare Workers Ad |
| js-yaml | moderate | CVE-2025-64718 | v2 | js-yaml has prototype pollution in merge (<<) |
| micromatch | moderate | CVE-2024-4067 | v4, v3, v2, v1 | Regular Expression Denial of Service (ReDoS) in micromatch |
| nanoid | moderate | CVE-2024-55565 | v2 | Predictable results in nanoid generation when given non-integer values |
| serialize-javascript | moderate | CVE-2024-11831 | v2 | Cross-site Scripting (XSS) in serialize-javascript |
| webpack | moderate | CVE-2024-43788 | v2 | Webpack's AutoPublicPathRuntimeModule has a DOM Clobbering Gadget that leads to  |
| webpack-dev-server | moderate | CVE-2025-30360 | v2 | webpack-dev-server users' source code may be stolen when they access a malicious |
| webpack-dev-server | moderate | CVE-2025-30359 | v2 | webpack-dev-server users' source code may be stolen when they access a malicious |
| diff | low | CVE-2026-24001 | v4, v3, v2 | jsdiff has a Denial of Service vulnerability in parsePatch and applyPatch |

