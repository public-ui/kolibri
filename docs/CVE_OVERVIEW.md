# CVE Overview

> For more security information, see [SECURITY.md](./SECURITY.md)

## 1. Production Dependencies

### Summary

| Severity |  v4 |  v3 |  v2 |  v1 |
| -------- | --: | --: | --: | --: |
| critical |   0 |   0 |   0 |   0 |
| high     |   0 |   0 |   0 |   1 |
| moderate |   0 |   0 |   0 |   0 |
| low      |   0 |   0 |   0 |   0 |
| info     |   0 |   0 |   0 |   0 |
| unknown  |   0 |   0 |   0 |   0 |

### Vulnerabilities

| Package     | Severity | CVE           | Affected Versions | Description                   |
| ----------- | -------- | ------------- | ----------------- | ----------------------------- |
| lodash.pick | high     | CVE-2020-8203 | v1                | Prototype Pollution in lodash |

## 2. All Dependencies

### Summary

| Severity |  v4 |  v3 |  v2 |  v1 |
| -------- | --: | --: | --: | --: |
| critical |   2 |   2 |   2 |   1 |
| high     |   5 |   6 |   8 |  10 |
| moderate |   2 |   2 |  10 |   1 |
| low      |   1 |   2 |   6 |   0 |
| info     |   0 |   0 |   0 |   0 |
| unknown  |   0 |   0 |   0 |   0 |

### Vulnerabilities

| Package              | Severity | CVE                 | Affected Versions | Description                                                                      |
| -------------------- | -------- | ------------------- | ----------------- | -------------------------------------------------------------------------------- |
| fast-xml-parser      | critical | CVE-2026-25896      | v4, v3, v2        | fast-xml-parser has an entity encoding bypass via regex injection in DOCTYPE ent |
| locutus              | critical | CVE-2026-25521      | v4, v3, v2, v1    | locutus is vulnerable to Prototype Pollution                                     |
| @angular/common      | high     | CVE-2025-66035      | v1                | Angular is Vulnerable to XSRF Token Leakage via Protocol-Relative URLs in Angula |
| @angular/compiler    | high     | CVE-2025-66412      | v1                | Angular Stored XSS Vulnerability via SVG Animation, SVG URL and MathML Attribute |
| @angular/compiler    | high     | CVE-2026-22610      | v1                | Angular has XSS Vulnerability via Unsanitized SVG Script Attributes              |
| @angular/core        | high     | CVE-2026-22610      | v1                | Angular has XSS Vulnerability via Unsanitized SVG Script Attributes              |
| axios                | high     | CVE-2026-25639      | v4, v3, v2        | Axios is Vulnerable to Denial of Service via **proto** Key in mergeConfig        |
| braces               | high     | CVE-2024-4068       | v4, v3, v2, v1    | Uncontrolled resource consumption in braces                                      |
| fast-xml-parser      | high     | CVE-2026-25128      | v4, v3, v2        | fast-xml-parser has RangeError DoS Numeric Entities Bug                          |
| fast-xml-parser      | high     | CVE-2026-26278      | v4, v3, v2        | fast-xml-parser affected by DoS through entity expansion in DOCTYPE (no expansio |
| lodash.pick          | high     | CVE-2020-8203       | v2, v1            | Prototype Pollution in lodash                                                    |
| qs                   | high     | CVE-2025-15284      | v3, v2            | qs's arrayLimit bypass in its bracket notation allows DoS via memory exhaustion  |
| semver               | high     | CVE-2022-25883      | v2                | semver vulnerable to Regular Expression Denial of Service                        |
| tar                  | high     | CVE-2026-23950      | v1                | Race Condition in node-tar Path Reservations via Unicode Ligature Collisions on  |
| tar                  | high     | CVE-2026-24842      | v1                | node-tar Vulnerable to Arbitrary File Creation/Overwrite via Hardlink Path Trave |
| tar                  | high     | CVE-2026-23745      | v1                | node-tar is Vulnerable to Arbitrary File Overwrite and Symlink Poisoning via Ins |
| tar                  | high     | CVE-2026-26960      | v4, v3, v2, v1    | Arbitrary File Read/Write via Hardlink Target Escape Through Symlink Chain in no |
| ajv                  | moderate | CVE-2025-69873      | v4, v3, v2        | ajv has ReDoS when using `$data` option                                          |
| ejs                  | moderate | CVE-2024-33883      | v2                | ejs lacks certain pollution protection                                           |
| esbuild              | moderate | GHSA-67mh-4wv8-2f99 | v2                | esbuild enables any website to send any requests to the development server and r |
| js-yaml              | moderate | CVE-2025-64718      | v2                | js-yaml has prototype pollution in merge (<<)                                    |
| micromatch           | moderate | CVE-2024-4067       | v4, v3, v2, v1    | Regular Expression Denial of Service (ReDoS) in micromatch                       |
| nanoid               | moderate | CVE-2024-55565      | v2                | Predictable results in nanoid generation when given non-integer values           |
| serialize-javascript | moderate | CVE-2024-11831      | v2                | Cross-site Scripting (XSS) in serialize-javascript                               |
| webpack              | moderate | CVE-2024-43788      | v2                | Webpack's AutoPublicPathRuntimeModule has a DOM Clobbering Gadget that leads to  |
| webpack-dev-server   | moderate | CVE-2025-30360      | v2                | webpack-dev-server users' source code may be stolen when they access a malicious |
| webpack-dev-server   | moderate | CVE-2025-30359      | v2                | webpack-dev-server users' source code may be stolen when they access a malicious |
| diff                 | low      | CVE-2026-24001      | v4, v3, v2        | jsdiff has a Denial of Service vulnerability in parsePatch and applyPatch        |
| hono                 | low      | GHSA-gq3j-xvxp-8hrf | v2                | Hono added timing comparison hardening in basicAuth and bearerAuth               |
| qs                   | low      | CVE-2026-2391       | v3, v2            | qs's arrayLimit bypass in comma parsing allows denial of service                 |
| webpack              | low      | CVE-2025-68458      | v2                | webpack buildHttp: allowedUris allow-list bypass via URL userinfo (@) leading to |
| webpack              | low      | CVE-2025-68157      | v2                | webpack buildHttp HttpUriPlugin allowedUris bypass via HTTP redirects → SSRF + c |
