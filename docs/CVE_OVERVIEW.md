# CVE Overview

> For more security information, see [SECURITY.md](./SECURITY.md)

## 1. Production Dependencies

### Summary

| Severity |  v4 |  v3 |  v2 |  v1 |
| -------- | --: | --: | --: | --: |
| critical |   0 |   0 |   0 |   0 |
| high     |   0 |   0 |   0 |   4 |
| moderate |   0 |   0 |   0 |   0 |
| low      |   0 |   0 |   0 |   0 |
| info     |   0 |   0 |   0 |   0 |
| unknown  |   0 |   0 |   0 |   0 |

### Vulnerabilities

| Package              | Severity | CVE                 | Affected Versions | Description                                                                       |
| -------------------- | -------- | ------------------- | ----------------- | --------------------------------------------------------------------------------- |
| lodash.pick          | high     | CVE-2020-8203       | v1                | Prototype Pollution in lodash                                                     |
| minimatch            | high     | CVE-2026-27903      | v1                | minimatch has ReDoS: matchOne() combinatorial backtracking via multiple non-adja  |
| minimatch            | high     | CVE-2026-27904      | v1                | minimatch ReDoS: nested \*() extglobs generate catastrophically backtracking regu |
| serialize-javascript | high     | GHSA-5c6j-r48x-rmvq | v1                | Serialize JavaScript is Vulnerable to RCE via RegExp.flags and Date.prototype.to  |

## 2. All Dependencies

### Summary

| Severity |  v4 |  v3 |  v2 |  v1 |
| -------- | --: | --: | --: | --: |
| critical |   4 |   4 |   4 |   2 |
| high     |  25 |  24 |  35 |  23 |
| moderate |   7 |   7 |  19 |   1 |
| low      |   3 |   3 |   8 |   0 |
| info     |   0 |   0 |   0 |   0 |
| unknown  |   0 |   0 |   0 |   0 |

### Vulnerabilities

| Package              | Severity | CVE                 | Affected Versions | Description                                                                       |
| -------------------- | -------- | ------------------- | ----------------- | --------------------------------------------------------------------------------- |
| basic-ftp            | critical | CVE-2026-27699      | v4, v3, v2        | Basic FTP has Path Traversal Vulnerability in its downloadToDir() method          |
| fast-xml-parser      | critical | CVE-2026-25896      | v4, v3, v2        | fast-xml-parser has an entity encoding bypass via regex injection in DOCTYPE ent  |
| locutus              | critical | CVE-2026-25521      | v4, v3, v2, v1    | locutus is vulnerable to Prototype Pollution                                      |
| locutus              | critical | CVE-2026-32304      | v4, v3, v2, v1    | Locutus vulnerable to RCE via unsanitized input in create_function()              |
| @angular/common      | high     | CVE-2025-66035      | v1                | Angular is Vulnerable to XSRF Token Leakage via Protocol-Relative URLs in Angula  |
| @angular/compiler    | high     | CVE-2025-66412      | v1                | Angular Stored XSS Vulnerability via SVG Animation, SVG URL and MathML Attribute  |
| @angular/compiler    | high     | CVE-2026-22610      | v1                | Angular has XSS Vulnerability via Unsanitized SVG Script Attributes               |
| @angular/compiler    | high     | CVE-2026-32635      | v1                | Angular vulnerable to XSS in i18n attribute bindings                              |
| @angular/core        | high     | CVE-2026-22610      | v1                | Angular has XSS Vulnerability via Unsanitized SVG Script Attributes               |
| @angular/core        | high     | CVE-2026-27970      | v1                | Angular i18n vulnerable to Cross-Site Scripting                                   |
| @angular/core        | high     | CVE-2026-32635      | v1                | Angular vulnerable to XSS in i18n attribute bindings                              |
| @hono/node-server    | high     | CVE-2026-29087      | v2                | @hono/node-server has authorization bypass for protected static paths via encode  |
| axios                | high     | CVE-2026-25639      | v3, v2            | Axios is Vulnerable to Denial of Service via **proto** Key in mergeConfig         |
| braces               | high     | CVE-2024-4068       | v4, v3, v2, v1    | Uncontrolled resource consumption in braces                                       |
| express-rate-limit   | high     | CVE-2026-30827      | v2                | express-rate-limit: IPv4-mapped IPv6 addresses bypass per-client rate limiting o  |
| fast-xml-parser      | high     | CVE-2026-25128      | v4, v3, v2        | fast-xml-parser has RangeError DoS Numeric Entities Bug                           |
| fast-xml-parser      | high     | CVE-2026-26278      | v4, v3, v2        | fast-xml-parser affected by DoS through entity expansion in DOCTYPE (no expansio  |
| flatted              | high     | CVE-2026-32141      | v4, v3, v2        | flatted vulnerable to unbounded recursion DoS in parse() revive phase             |
| hono                 | high     | CVE-2026-29045      | v2                | Hono vulnerable to arbitrary file access via serveStatic vulnerability            |
| immutable            | high     | CVE-2026-29063      | v2                | Immutable is vulnerable to Prototype Pollution                                    |
| locutus              | high     | CVE-2026-29091      | v4, v3, v2, v1    | locutus call_user_func_array vulnerable to Remote Code Execution (RCE) due to Co  |
| lodash.pick          | high     | CVE-2020-8203       | v2, v1            | Prototype Pollution in lodash                                                     |
| minimatch            | high     | CVE-2026-27903      | v4, v3, v2, v1    | minimatch has ReDoS: matchOne() combinatorial backtracking via multiple non-adja  |
| minimatch            | high     | CVE-2026-27904      | v4, v3, v2, v1    | minimatch ReDoS: nested \*() extglobs generate catastrophically backtracking regu |
| minimatch            | high     | CVE-2026-26996      | v4, v3, v2        | minimatch has a ReDoS via repeated wildcards with non-matching literal in patter  |
| rollup               | high     | CVE-2026-27606      | v1                | Rollup 4 has Arbitrary File Write via Path Traversal                              |
| semver               | high     | CVE-2022-25883      | v2                | semver vulnerable to Regular Expression Denial of Service                         |
| serialize-javascript | high     | GHSA-5c6j-r48x-rmvq | v4, v3, v2, v1    | Serialize JavaScript is Vulnerable to RCE via RegExp.flags and Date.prototype.to  |
| svgo                 | high     | CVE-2026-29074      | v4, v3, v2, v1    | SVGO DoS through entity expansion in DOCTYPE (Billion Laughs)                     |
| tar                  | high     | CVE-2026-24842      | v1                | node-tar Vulnerable to Arbitrary File Creation/Overwrite via Hardlink Path Trave  |
| tar                  | high     | CVE-2026-23745      | v1                | node-tar is Vulnerable to Arbitrary File Overwrite and Symlink Poisoning via Ins  |
| tar                  | high     | CVE-2026-26960      | v4, v1            | Arbitrary File Read/Write via Hardlink Target Escape Through Symlink Chain in no  |
| tar                  | high     | CVE-2026-29786      | v4, v3, v2, v1    | tar has Hardlink Path Traversal via Drive-Relative Linkpath                       |
| tar                  | high     | CVE-2026-31802      | v4, v3, v2, v1    | node-tar Symlink Path Traversal via Drive-Relative Linkpath                       |
| tar                  | high     | CVE-2026-23950      | v1                | Race Condition in node-tar Path Reservations via Unicode Ligature Collisions on   |
| undici               | high     | CVE-2026-1528       | v4, v3, v2        | Undici: Malicious WebSocket 64-bit length overflows parser and crashes the clien  |
| undici               | high     | CVE-2026-1526       | v4, v3, v2        | Undici has Unbounded Memory Consumption in WebSocket permessage-deflate Decompre  |
| undici               | high     | CVE-2026-2229       | v4, v3, v2        | Undici has Unhandled Exception in WebSocket Client Due to Invalid server_max_win  |
| ajv                  | moderate | CVE-2025-69873      | v3, v2            | ajv has ReDoS when using `$data` option                                           |
| ejs                  | moderate | CVE-2024-33883      | v2                | ejs lacks certain pollution protection                                            |
| esbuild              | moderate | GHSA-67mh-4wv8-2f99 | v2                | esbuild enables any website to send any requests to the development server and r  |
| file-type            | moderate | CVE-2026-31808      | v4                | file-type affected by infinite loop in ASF parser on malformed input with zero-s  |
| hono                 | moderate | CVE-2026-29086      | v2                | Hono Vulnerable to Cookie Attribute Injection via Unsanitized domain and path in  |
| hono                 | moderate | CVE-2026-29085      | v2                | Hono Vulnerable to SSE Control Field Injection via CR/LF in writeSSE()            |
| hono                 | moderate | GHSA-v8w9-8mx6-g223 | v2                | Hono vulnerable to Prototype Pollution possible through **proto** key allowed in  |
| js-yaml              | moderate | CVE-2025-64718      | v2                | js-yaml has prototype pollution in merge (<<)                                     |
| micromatch           | moderate | CVE-2024-4067       | v4, v3, v2, v1    | Regular Expression Denial of Service (ReDoS) in micromatch                        |
| nanoid               | moderate | CVE-2024-55565      | v2                | Predictable results in nanoid generation when given non-integer values            |
| qs                   | moderate | CVE-2025-15284      | v2                | qs's arrayLimit bypass in its bracket notation allows DoS via memory exhaustion   |
| serialize-javascript | moderate | CVE-2024-11831      | v2                | Cross-site Scripting (XSS) in serialize-javascript                                |
| undici               | moderate | CVE-2026-1525       | v4, v3, v2        | Undici has an HTTP Request/Response Smuggling issue                               |
| undici               | moderate | CVE-2026-1527       | v4, v3, v2        | Undici has CRLF Injection in undici via `upgrade` option                          |
| undici               | moderate | CVE-2026-2581       | v4, v3, v2        | Undici has Unbounded Memory Consumption in its DeduplicationHandler via Response  |
| webpack              | moderate | CVE-2024-43788      | v2                | Webpack's AutoPublicPathRuntimeModule has a DOM Clobbering Gadget that leads to   |
| webpack-dev-server   | moderate | CVE-2025-30360      | v2                | webpack-dev-server users' source code may be stolen when they access a malicious  |
| webpack-dev-server   | moderate | CVE-2025-30359      | v2                | webpack-dev-server users' source code may be stolen when they access a malicious  |
| @tootallnate/once    | low      | CVE-2026-3449       | v4, v3, v2        | @tootallnate/once vulnerable to Incorrect Control Flow Scoping                    |
| diff                 | low      | CVE-2026-24001      | v4, v3, v2        | jsdiff has a Denial of Service vulnerability in parsePatch and applyPatch         |
| fast-xml-parser      | low      | CVE-2026-27942      | v4, v3, v2        | fast-xml-parser has stack overflow in XMLBuilder with preserveOrder               |
| hono                 | low      | GHSA-gq3j-xvxp-8hrf | v2                | Hono added timing comparison hardening in basicAuth and bearerAuth                |
| qs                   | low      | CVE-2026-2391       | v2                | qs's arrayLimit bypass in comma parsing allows denial of service                  |
| webpack              | low      | CVE-2025-68458      | v2                | webpack buildHttp: allowedUris allow-list bypass via URL userinfo (@) leading to  |
| webpack              | low      | CVE-2025-68157      | v2                | webpack buildHttp HttpUriPlugin allowedUris bypass via HTTP redirects → SSRF + c  |
