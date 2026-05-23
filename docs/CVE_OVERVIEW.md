# CVE Overview

> For more security information, see [SECURITY.md](./SECURITY.md)

## 1. Production Dependencies

### Summary

| Severity |  v4 |  v3 |  v2 |  v1 |
| -------- | --: | --: | --: | --: |
| critical |   0 |   0 |   0 |   0 |
| high     |   0 |   0 |   0 |   4 |
| moderate |   0 |   0 |   0 |   3 |
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
| brace-expansion      | moderate | CVE-2026-45149      | v1                | brace-expansion: Large numeric range defeats documented `max` DoS protection      |
| qs                   | moderate | CVE-2026-8723       | v1                | qs has a remotely triggerable DoS: qs.stringify crashes with TypeError on null/u  |
| serialize-javascript | moderate | CVE-2026-34043      | v1                | Serialize JavaScript has CPU Exhaustion Denial of Service via crafted array-like  |

## 2. All Dependencies

### Summary

| Severity |  v4 |  v3 |  v2 |  v1 |
| -------- | --: | --: | --: | --: |
| critical |   0 |   5 |   5 |   3 |
| high     |   1 |  35 |  53 |  30 |
| moderate |   6 |  31 |  54 |  10 |
| low      |   2 |   5 |  10 |   2 |
| info     |   0 |   0 |   0 |   0 |
| unknown  |   0 |   0 |   0 |   0 |

### Vulnerabilities

| Package                                  | Severity | CVE                 | Affected Versions | Description                                                                        |
| ---------------------------------------- | -------- | ------------------- | ----------------- | ---------------------------------------------------------------------------------- |
| basic-ftp                                | critical | CVE-2026-27699      | v3, v2            | Basic FTP has Path Traversal Vulnerability in its downloadToDir() method           |
| fast-xml-parser                          | critical | CVE-2026-25896      | v3, v2            | fast-xml-parser has an entity encoding bypass via regex injection in DOCTYPE ent   |
| handlebars                               | critical | CVE-2026-33937      | v3, v2, v1        | Handlebars.js has JavaScript Injection via AST Type Confusion                      |
| locutus                                  | critical | CVE-2026-25521      | v3, v2, v1        | locutus is vulnerable to Prototype Pollution                                       |
| locutus                                  | critical | CVE-2026-32304      | v3, v2, v1        | Locutus vulnerable to RCE via unsanitized input in create_function()               |
| @angular/common                          | high     | CVE-2025-66035      | v1                | Angular is Vulnerable to XSRF Token Leakage via Protocol-Relative URLs in Angula   |
| @angular/compiler                        | high     | CVE-2025-66412      | v1                | Angular Stored XSS Vulnerability via SVG Animation, SVG URL and MathML Attribute   |
| @angular/compiler                        | high     | CVE-2026-22610      | v1                | Angular has XSS Vulnerability via Unsanitized SVG Script Attributes                |
| @angular/compiler                        | high     | CVE-2026-32635      | v1                | Angular vulnerable to XSS in i18n attribute bindings                               |
| @angular/core                            | high     | CVE-2026-22610      | v1                | Angular has XSS Vulnerability via Unsanitized SVG Script Attributes                |
| @angular/core                            | high     | CVE-2026-27970      | v1                | Angular i18n vulnerable to Cross-Site Scripting                                    |
| @angular/core                            | high     | CVE-2026-32635      | v1                | Angular vulnerable to XSS in i18n attribute bindings                               |
| @babel/plugin-transform-modules-systemjs | high     | CVE-2026-44728      | v2, v1            | @babel/plugin-transform-modules-systemjs generates arbitrary code when compiling   |
| @hono/node-server                        | high     | CVE-2026-29087      | v2                | @hono/node-server has authorization bypass for protected static paths via encode   |
| axios                                    | high     | CVE-2026-42043      | v3, v2            | Axios: Incomplete Fix for CVE-2025-62718 — NO_PROXY Protection Bypassed via RFC    |
| axios                                    | high     | CVE-2026-42033      | v3, v2            | Axios: Prototype Pollution Gadgets - Response Tampering, Data Exfiltration, and    |
| axios                                    | high     | CVE-2026-42035      | v3, v2            | Axios: Header Injection via Prototype Pollution                                    |
| axios                                    | high     | CVE-2026-25639      | v3, v2            | Axios is Vulnerable to Denial of Service via **proto** Key in mergeConfig          |
| axios                                    | high     | CVE-2026-42264      | v3, v2            | Axios has prototype pollution read-side gadgets in HTTP adapter that allow crede   |
| basic-ftp                                | high     | GHSA-6v7q-wjvx-w8wg | v3, v2            | basic-ftp: Incomplete CRLF Injection Protection Allows Arbitrary FTP Command Exe   |
| basic-ftp                                | high     | CVE-2026-41324      | v3, v2            | basic-ftp vulnerable to denial of service via unbounded memory consumption in Cl   |
| basic-ftp                                | high     | CVE-2026-44240      | v3, v2            | basic-ftp allows a malicious FTP server to cause client-side denial of service v   |
| braces                                   | high     | CVE-2024-4068       | v3, v2, v1        | Uncontrolled resource consumption in braces                                        |
| express-rate-limit                       | high     | CVE-2026-30827      | v2                | express-rate-limit: IPv4-mapped IPv6 addresses bypass per-client rate limiting o   |
| fast-uri                                 | high     | CVE-2026-6321       | v2                | fast-uri vulnerable to path traversal via percent-encoded dot segments             |
| fast-uri                                 | high     | CVE-2026-6322       | v2                | fast-uri vulnerable to host confusion via percent-encoded authority delimiters     |
| fast-xml-parser                          | high     | CVE-2026-25128      | v3, v2            | fast-xml-parser has RangeError DoS Numeric Entities Bug                            |
| fast-xml-parser                          | high     | CVE-2026-26278      | v3, v2            | fast-xml-parser affected by DoS through entity expansion in DOCTYPE (no expansio   |
| fast-xml-parser                          | high     | CVE-2026-33036      | v3, v2            | fast-xml-parser affected by numeric entity expansion bypassing all entity expans   |
| flatted                                  | high     | CVE-2026-32141      | v3, v2            | flatted vulnerable to unbounded recursion DoS in parse() revive phase              |
| flatted                                  | high     | CVE-2026-33228      | v3, v2            | Prototype Pollution via parse() in NodeJS flatted                                  |
| handlebars                               | high     | CVE-2026-33938      | v3, v2, v1        | Handlebars.js has JavaScript Injection via AST Type Confusion by tampering @part   |
| handlebars                               | high     | CVE-2026-33940      | v3, v2, v1        | Handlebars.js has JavaScript Injection via AST Type Confusion when passing an ob   |
| handlebars                               | high     | CVE-2026-33939      | v3, v2, v1        | Handlebars.js has Denial of Service via Malformed Decorator Syntax in Template C   |
| handlebars                               | high     | CVE-2026-33941      | v3, v2, v1        | Handlebars.js has JavaScript Injection in CLI Precompiler via Unescaped Names an   |
| hono                                     | high     | CVE-2026-29045      | v2                | Hono vulnerable to arbitrary file access via serveStatic vulnerability             |
| immutable                                | high     | CVE-2026-29063      | v2                | Immutable is vulnerable to Prototype Pollution                                     |
| locutus                                  | high     | CVE-2026-29091      | v3, v2, v1        | locutus call_user_func_array vulnerable to Remote Code Execution (RCE) due to Co   |
| lodash                                   | high     | CVE-2026-4800       | v3                | lodash vulnerable to Code Injection via `_.template` imports key names             |
| lodash.pick                              | high     | CVE-2020-8203       | v2, v1            | Prototype Pollution in lodash                                                      |
| minimatch                                | high     | CVE-2026-27903      | v3, v2, v1        | minimatch has ReDoS: matchOne() combinatorial backtracking via multiple non-adja   |
| minimatch                                | high     | CVE-2026-27904      | v3, v2, v1        | minimatch ReDoS: nested \*() extglobs generate catastrophically backtracking regu  |
| minimatch                                | high     | CVE-2026-26996      | v3, v2            | minimatch has a ReDoS via repeated wildcards with non-matching literal in patter   |
| node-forge                               | high     | CVE-2026-33896      | v2                | Forge has a basicConstraints bypass in its certificate chain verification (RFC 5   |
| node-forge                               | high     | CVE-2026-33895      | v2                | Forge has signature forgery in Ed25519 due to missing S > L check                  |
| node-forge                               | high     | CVE-2026-33891      | v2                | Forge has Denial of Service via Infinite Loop in BigInteger.modInverse() with Ze   |
| node-forge                               | high     | CVE-2026-33894      | v2                | Forge has signature forgery in RSA-PKCS due to ASN.1 extra field                   |
| path-to-regexp                           | high     | CVE-2026-4867       | v3, v2            | path-to-regexp vulnerable to Regular Expression Denial of Service via multiple r   |
| path-to-regexp                           | high     | CVE-2026-4926       | v2                | path-to-regexp vulnerable to Denial of Service via sequential optional groups      |
| rollup                                   | high     | CVE-2026-27606      | v1                | Rollup 4 has Arbitrary File Write via Path Traversal                               |
| semver                                   | high     | CVE-2022-25883      | v2                | semver vulnerable to Regular Expression Denial of Service                          |
| serialize-javascript                     | high     | GHSA-5c6j-r48x-rmvq | v4, v3, v2, v1    | Serialize JavaScript is Vulnerable to RCE via RegExp.flags and Date.prototype.to   |
| socket.io-parser                         | high     | CVE-2026-33151      | v3, v2            | socket.io allows an unbounded number of binary attachments                         |
| svgo                                     | high     | CVE-2026-29074      | v3, v2, v1        | SVGO DoS through entity expansion in DOCTYPE (Billion Laughs)                      |
| tar                                      | high     | CVE-2026-24842      | v1                | node-tar Vulnerable to Arbitrary File Creation/Overwrite via Hardlink Path Trave   |
| tar                                      | high     | CVE-2026-23745      | v1                | node-tar is Vulnerable to Arbitrary File Overwrite and Symlink Poisoning via Ins   |
| tar                                      | high     | CVE-2026-26960      | v1                | Arbitrary File Read/Write via Hardlink Target Escape Through Symlink Chain in no   |
| tar                                      | high     | CVE-2026-29786      | v1                | tar has Hardlink Path Traversal via Drive-Relative Linkpath                        |
| tar                                      | high     | CVE-2026-31802      | v1                | node-tar Symlink Path Traversal via Drive-Relative Linkpath                        |
| tar                                      | high     | CVE-2026-23950      | v1                | Race Condition in node-tar Path Reservations via Unicode Ligature Collisions on    |
| undici                                   | high     | CVE-2026-1528       | v3, v2            | Undici: Malicious WebSocket 64-bit length overflows parser and crashes the clien   |
| undici                                   | high     | CVE-2026-1526       | v3, v2            | Undici has Unbounded Memory Consumption in WebSocket permessage-deflate Decompre   |
| undici                                   | high     | CVE-2026-2229       | v3, v2            | Undici has Unhandled Exception in WebSocket Client Due to Invalid server_max_win   |
| vite                                     | high     | CVE-2026-39364      | v1                | Vite: `server.fs.deny` bypassed with queries                                       |
| vite                                     | high     | CVE-2026-39363      | v1                | Vite Vulnerable to Arbitrary File Read via Vite Dev Server WebSocket               |
| @hono/node-server                        | moderate | CVE-2026-39406      | v2                | @hono/node-server: Middleware bypass via repeated slashes in serveStatic           |
| ajv                                      | moderate | CVE-2025-69873      | v3, v2            | ajv has ReDoS when using `$data` option                                            |
| axios                                    | moderate | CVE-2025-62718      | v3, v2            | Axios has a NO_PROXY Hostname Normalization Bypass that Leads to SSRF              |
| axios                                    | moderate | CVE-2026-42041      | v3, v2            | Axios: Authentication Bypass via Prototype Pollution Gadget in `validateStatus`    |
| axios                                    | moderate | CVE-2026-42044      | v3, v2            | Axios: Invisible JSON Response Tampering via Prototype Pollution Gadget in `pars   |
| axios                                    | moderate | CVE-2026-42037      | v3, v2            | Axios: CRLF Injection in multipart/form-data body via unsanitized blob.type in f   |
| axios                                    | moderate | CVE-2026-42038      | v3, v2            | Axios: no_proxy bypass via IP alias allows SSRF                                    |
| axios                                    | moderate | CVE-2026-42039      | v3, v2            | Axios: unbounded recursion in toFormData causes DoS via deeply nested request da   |
| axios                                    | moderate | CVE-2026-42034      | v3, v2            | Axios' HTTP adapter-streamed uploads bypass maxBodyLength when maxRedirects: 0     |
| axios                                    | moderate | CVE-2026-42036      | v3, v2            | Axios: HTTP adapter streamed responses bypass maxContentLength                     |
| axios                                    | moderate | CVE-2026-42042      | v3, v2            | Axios: XSRF Token Cross-Origin Leakage via Prototype Pollution Gadget in `withXS   |
| axios                                    | moderate | CVE-2026-40175      | v3, v2            | Axios has Unrestricted Cloud Metadata Exfiltration via Header Injection Chain      |
| brace-expansion                          | moderate | CVE-2026-45149      | v3, v2, v1        | brace-expansion: Large numeric range defeats documented `max` DoS protection       |
| brace-expansion                          | moderate | CVE-2026-33750      | v3, v2            | brace-expansion: Zero-step sequence causes process hang and memory exhaustion      |
| ejs                                      | moderate | CVE-2024-33883      | v2                | ejs lacks certain pollution protection                                             |
| esbuild                                  | moderate | GHSA-67mh-4wv8-2f99 | v2                | esbuild enables any website to send any requests to the development server and r   |
| fast-xml-parser                          | moderate | CVE-2026-33349      | v3, v2            | Entity Expansion Limits Bypassed When Set to Zero Due to JavaScript Falsy Evalua   |
| fast-xml-parser                          | moderate | CVE-2026-41650      | v3, v2            | fast-xml-parser XMLBuilder: XML Comment and CDATA Injection via Unescaped Delimi   |
| file-type                                | moderate | CVE-2026-31808      | v4                | file-type affected by infinite loop in ASF parser on malformed input with zero-s   |
| handlebars                               | moderate | CVE-2026-33916      | v3, v2, v1        | Handlebars.js has Prototype Pollution Leading to XSS through Partial Template In   |
| handlebars                               | moderate | GHSA-7rx3-28cr-v5wh | v3, v2, v1        | Handlebars.js has a Prototype Method Access Control Gap via Missing \_\_lookupSett |
| hono                                     | moderate | CVE-2026-29086      | v2                | Hono Vulnerable to Cookie Attribute Injection via Unsanitized domain and path in   |
| hono                                     | moderate | CVE-2026-29085      | v2                | Hono Vulnerable to SSE Control Field Injection via CR/LF in writeSSE()             |
| hono                                     | moderate | GHSA-v8w9-8mx6-g223 | v2                | Hono vulnerable to Prototype Pollution possible through **proto** key allowed in   |
| hono                                     | moderate | GHSA-26pp-8wgv-hjvm | v2                | Hono missing validation of cookie name on write path in setCookie()                |
| hono                                     | moderate | CVE-2026-39410      | v2                | Hono: Non-breaking space prefix bypass in cookie name handling in getCookie()      |
| hono                                     | moderate | CVE-2026-39408      | v2                | Hono: Path traversal in toSSG() allows writing files outside the output director   |
| hono                                     | moderate | CVE-2026-39407      | v2                | Hono: Middleware bypass via repeated slashes in serveStatic                        |
| hono                                     | moderate | GHSA-458j-xx4x-4375 | v2                | hono Improperly Handles JSX Attribute Names Allows HTML Injection in hono/jsx SS   |
| hono                                     | moderate | CVE-2026-39409      | v2                | Hono has incorrect IP matching in ipRestriction() for IPv4-mapped IPv6 addresses   |
| hono                                     | moderate | CVE-2026-44458      | v2                | Hono has CSS Declaration Injection via Style Object Values in JSX SSR              |
| hono                                     | moderate | CVE-2026-44457      | v2                | Hono's Cache Middleware ignores Vary: Authorization / Vary: Cookie leading to cr   |
| hono                                     | moderate | CVE-2026-44456      | v2                | Hono: bodyLimit() can be bypassed for chunked / unknown-length requests            |
| hono                                     | moderate | CVE-2026-44455      | v2                | hono/jsx has Unvalidated JSX Tag Names that May Allow HTML Injection               |
| ip-address                               | moderate | CVE-2026-42338      | v4, v2            | ip-address has XSS in Address6 HTML-emitting methods                               |
| js-yaml                                  | moderate | CVE-2025-64718      | v2                | js-yaml has prototype pollution in merge (<<)                                      |
| locutus                                  | moderate | CVE-2026-33993      | v3, v2, v1        | Locutus has Prototype Pollution via **proto** Key Injection in unserialize()       |
| lodash                                   | moderate | CVE-2026-2950       | v3                | lodash vulnerable to Prototype Pollution via array path bypass in `_.unset` and    |
| micromatch                               | moderate | CVE-2024-4067       | v3, v2, v1        | Regular Expression Denial of Service (ReDoS) in micromatch                         |
| nanoid                                   | moderate | CVE-2024-55565      | v2                | Predictable results in nanoid generation when given non-integer values             |
| path-to-regexp                           | moderate | CVE-2026-4923       | v2                | path-to-regexp vulnerable to Regular Expression Denial of Service via multiple w   |
| postcss                                  | moderate | CVE-2026-41305      | v4, v3, v2        | PostCSS has XSS via Unescaped </style> in its CSS Stringify Output                 |
| qs                                       | moderate | CVE-2026-8723       | v1                | qs has a remotely triggerable DoS: qs.stringify crashes with TypeError on null/u   |
| serialize-javascript                     | moderate | CVE-2026-34043      | v4, v3, v2, v1    | Serialize JavaScript has CPU Exhaustion Denial of Service via crafted array-like   |
| serialize-javascript                     | moderate | CVE-2024-11831      | v2                | Cross-site Scripting (XSS) in serialize-javascript                                 |
| smol-toml                                | moderate | GHSA-v3rj-xjv7-4jmq | v3, v2, v1        | smol-toml: Denial of Service via TOML documents containing thousands of consecut   |
| undici                                   | moderate | CVE-2026-1525       | v3, v2            | Undici has an HTTP Request/Response Smuggling issue                                |
| undici                                   | moderate | CVE-2026-1527       | v3, v2            | Undici has CRLF Injection in undici via `upgrade` option                           |
| uuid                                     | moderate | CVE-2026-41907      | v4, v3, v2        | uuid: Missing buffer bounds check in v3/v5/v6 when buf is provided                 |
| vite                                     | moderate | CVE-2026-39365      | v1                | Vite Vulnerable to Path Traversal in Optimized Deps `.map` Handling                |
| webpack                                  | moderate | CVE-2024-43788      | v2                | Webpack's AutoPublicPathRuntimeModule has a DOM Clobbering Gadget that leads to    |
| webpack-dev-server                       | moderate | CVE-2025-30360      | v2                | webpack-dev-server users' source code may be stolen when they access a malicious   |
| webpack-dev-server                       | moderate | CVE-2025-30359      | v2                | webpack-dev-server users' source code may be stolen when they access a malicious   |
| webpack-dev-server                       | moderate | CVE-2026-6402       | v4, v3, v2        | webpack-dev-server vulnerable to cross-origin source code exposure on non-HTTPS    |
| ws                                       | moderate | CVE-2026-45736      | v3, v2            | ws: Uninitialized memory disclosure                                                |
| yaml                                     | moderate | CVE-2026-33532      | v3, v2, v1        | yaml is vulnerable to Stack Overflow via deeply nested YAML collections            |
| @tootallnate/once                        | low      | CVE-2026-3449       | v3, v2, v1        | @tootallnate/once vulnerable to Incorrect Control Flow Scoping                     |
| axios                                    | low      | CVE-2026-42040      | v3, v2            | Axios: Null Byte Injection via Reverse-Encoding in AxiosURLSearchParams            |
| diff                                     | low      | CVE-2026-24001      | v4, v3, v2        | jsdiff has a Denial of Service vulnerability in parsePatch and applyPatch          |
| fast-xml-parser                          | low      | CVE-2026-27942      | v3, v2            | fast-xml-parser has stack overflow in XMLBuilder with preserveOrder                |
| handlebars                               | low      | GHSA-442j-39wm-28r2 | v3, v2, v1        | Handlebars.js has a Property Access Validation Bypass in container.lookup          |
| hono                                     | low      | GHSA-gq3j-xvxp-8hrf | v2                | Hono added timing comparison hardening in basicAuth and bearerAuth                 |
| hono                                     | low      | CVE-2026-44459      | v2                | Hono has improper validation of NumericDate claims (exp, nbf, iat) in JWT verify   |
| tmp                                      | low      | CVE-2025-54798      | v4                | tmp allows arbitrary temporary file / directory write via symbolic link `dir` pa   |
| webpack                                  | low      | CVE-2025-68458      | v2                | webpack buildHttp: allowedUris allow-list bypass via URL userinfo (@) leading to   |
| webpack                                  | low      | CVE-2025-68157      | v2                | webpack buildHttp HttpUriPlugin allowedUris bypass via HTTP redirects → SSRF + c   |
