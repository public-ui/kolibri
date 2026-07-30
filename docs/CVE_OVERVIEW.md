# CVE Overview

> For more security information, see [SECURITY.md](./SECURITY.md)

## 1. Production Dependencies

### Summary

| Severity |  v4 |  v3 |  v2 |  v1 |
| -------- | --: | --: | --: | --: |
| critical |   0 |   0 |   1 |   0 |
| high     |   1 |   8 |   6 |   8 |
| moderate |   0 |   6 |   0 |   4 |
| low      |   0 |   1 |   0 |   0 |
| info     |   0 |   0 |   0 |   0 |
| unknown  |   0 |   0 |   0 |   0 |

### Vulnerabilities

| Package              | Severity | CVE                 | Affected Versions | Description                                                                      |
| -------------------- | -------- | ------------------- | ----------------- | -------------------------------------------------------------------------------- |
| seroval              | critical | CVE-2026-59940      | v2                | seroval: `seroval.fromJSON()` Promise resolver type confusion invokes attacker-c |
| brace-expansion      | high     | CVE-2026-13149      | v1                | brace-expansion: DoS via exponential-time expansion of consecutive non-expanding |
| brace-expansion      | high     | CVE-2026-14257      | v4, v1            | brace-expansion: DoS via unbounded expansion length causing an out-of-memory pro |
| fast-uri             | high     | CVE-2026-16221      | v3                | fast-uri vulnerable to host confusion via literal backslash authority delimiter  |
| fast-uri             | high     | CVE-2026-13676      | v3                | fast-uri vulnerable to host confusion via failed IDN canonicalization            |
| find-my-way          | high     | CVE-2026-47219      | v3                | find-my-way: DDoS with HTTP2                                                     |
| immutable            | high     | CVE-2026-59879      | v3, v2, v1        | Immutable.js `List` 32-bit trie overflow → unrecoverable DoS                     |
| immutable            | high     | CVE-2026-59880      | v3, v2, v1        | Immutabl: Hash-collision algorithmic complexity denial of service in Immutable.M |
| linkify-it           | high     | CVE-2026-59887      | v3, v2            | linkify-it: Quadratic-complexity DoS via the `mailto:` validator scan-loop on at |
| lodash.pick          | high     | CVE-2020-8203       | v1                | Prototype Pollution in lodash                                                    |
| minimatch            | high     | CVE-2026-27903      | v1                | minimatch has ReDoS: matchOne() combinatorial backtracking via multiple non-adja |
| minimatch            | high     | CVE-2026-27904      | v1                | minimatch ReDoS: nested *() extglobs generate catastrophically backtracking regu |
| postcss              | high     | GHSA-r28c-9q8g-f849 | v3, v2            | PostCSS: Path Traversal in Previous Source Map Auto-Loading (sourceMappingURL) l |
| react-router         | high     | GHSA-qwww-vcr4-c8h2 | v3, v2            | React Router: RSC Mode CSRF Bypass Allows Action Execution Before 400 Response   |
| serialize-javascript | high     | GHSA-5c6j-r48x-rmvq | v1                | Serialize JavaScript is Vulnerable to RCE via RegExp.flags and Date.prototype.to |
| shell-quote          | high     | CVE-2026-13311      | v2                | shell-quote: Quadratic-complexity Denial of Service in `parse()` (CWE-407)       |
| @hono/node-server    | moderate | GHSA-frvp-7c67-39w9 | v3                | Node.js Adapter for Hono: Path traversal in `serve-static` on Windows via encode |
| brace-expansion      | moderate | CVE-2026-45149      | v1                | brace-expansion: Large numeric range defeats documented `max` DoS protection     |
| hono                 | moderate | CVE-2026-59897      | v3                | Hono: API Gateway v1 adapter can drop a distinct repeated request header value d |
| hono                 | moderate | CVE-2026-59896      | v3                | hono/jsx does not isolate context per request, leading to cross-request data dis |
| hono                 | moderate | CVE-2026-59895      | v3                | Hono: Server-Side XSS via JSX Escaping Bypass in cx() Utility                    |
| protobufjs           | moderate | CVE-2026-59876      | v3                | protobufjs: Text Format string map parsing can mutate returned map object protot |
| protobufjs           | moderate | CVE-2026-59877      | v3                | protobufjs: Denial of Service via infinite loop in .proto option parsing         |
| qs                   | moderate | CVE-2026-8723       | v1                | qs has a remotely triggerable DoS: qs.stringify crashes with TypeError on null/u |
| react-router-dom     | moderate | CVE-2026-53668      | v1                | React Router: Open redirect leading to XSS                                       |
| serialize-javascript | moderate | CVE-2026-34043      | v1                | Serialize JavaScript has CPU Exhaustion Denial of Service via crafted array-like |
| body-parser          | low      | CVE-2026-12590      | v3                | body-parser vulnerable to denial of service when invalid limit value silently di |

## 2. All Dependencies

### Summary

| Severity |  v4 |  v3 |  v2 |  v1 |
| -------- | --: | --: | --: | --: |
| critical |   3 |   9 |   8 |   5 |
| high     |  23 |  77 |  96 |  45 |
| moderate |  40 |  61 |  92 |  22 |
| low      |   6 |  12 |  18 |   3 |
| info     |   0 |   0 |   0 |   0 |
| unknown  |   0 |   0 |   0 |   0 |

### Vulnerabilities

| Package               | Severity | CVE                 | Affected Versions | Description                                                                      |
| --------------------- | -------- | ------------------- | ----------------- | -------------------------------------------------------------------------------- |
| basic-ftp             | critical | CVE-2026-27699      | v3, v2            | Basic FTP has Path Traversal Vulnerability in its downloadToDir() method         |
| fast-xml-parser       | critical | CVE-2026-25896      | v3, v2            | fast-xml-parser has an entity encoding bypass via regex injection in DOCTYPE ent |
| handlebars            | critical | CVE-2026-33937      | v3, v2, v1        | Handlebars.js has JavaScript Injection via AST Type Confusion                    |
| locutus               | critical | CVE-2026-25521      | v3, v2, v1        | locutus is vulnerable to Prototype Pollution                                     |
| locutus               | critical | CVE-2026-32304      | v3, v2, v1        | Locutus vulnerable to RCE via unsanitized input in create_function()             |
| seroval               | critical | CVE-2026-59940      | v4, v3, v2, v1    | seroval: `seroval.fromJSON()` Promise resolver type confusion invokes attacker-c |
| shell-quote           | critical | CVE-2026-9277       | v3                | shell-quote quote() does not escape newlines in object .op values                |
| tar                   | critical | CVE-2026-59873      | v4, v3, v2, v1    | node-tar: Decompression/parse DoS via unlimited input                            |
| websocket-driver      | critical | CVE-2026-54466      | v4, v3, v2        | websocket-driver: Message corruption via abuse of protocol length headers        |
| @angular/common       | high     | CVE-2025-66035      | v1                | Angular is Vulnerable to XSRF Token Leakage via Protocol-Relative URLs in Angula |
| @angular/common       | high     | CVE-2026-54268      | v4, v3, v2, v1    | @angular/common: Denial of Service (DoS) via OOM in Date Formatting (formatDate) |
| @angular/common       | high     | CVE-2026-54266      | v4, v3, v2, v1    | @angular/common: Weak 32-Bit Cache Key Hashing in `HttpTransferCache` Leading to |
| @angular/common       | high     | CVE-2026-50171      | v1                | @angular/common: Denial of Service (DoS) via OOM in Number Formatting (digitsInf |
| @angular/common       | high     | CVE-2026-50170      | v1                | @angular/common: Information Leak via Default Caching of Credentialed Requests i |
| @angular/compiler     | high     | CVE-2026-32635      | v1                | Angular vulnerable to XSS in i18n attribute bindings                             |
| @angular/compiler     | high     | CVE-2026-22610      | v1                | Angular has XSS Vulnerability via Unsanitized SVG Script Attributes              |
| @angular/compiler     | high     | CVE-2025-66412      | v1                | Angular Stored XSS Vulnerability via SVG Animation, SVG URL and MathML Attribute |
| @angular/core         | high     | CVE-2026-27970      | v1                | Angular i18n vulnerable to Cross-Site Scripting                                  |
| @angular/core         | high     | CVE-2026-32635      | v1                | Angular vulnerable to XSS in i18n attribute bindings                             |
| @angular/core         | high     | CVE-2026-22610      | v1                | Angular has XSS Vulnerability via Unsanitized SVG Script Attributes              |
| @angular/core         | high     | CVE-2026-54267      | v4, v3, v2, v1    | Angular Client Hydration DOM Clobbering & Response-Cache Poisoning               |
| @hono/node-server     | high     | CVE-2026-29087      | v2                | @hono/node-server has authorization bypass for protected static paths via encode |
| adm-zip               | high     | CVE-2026-39244      | v4                | adm-zip: Crafted ZIP file triggers 4GB memory allocation                         |
| axios                 | high     | CVE-2026-42043      | v3, v2            | Axios: Incomplete Fix for CVE-2025-62718 — NO_PROXY Protection Bypassed via RFC  |
| axios                 | high     | CVE-2026-42033      | v3, v2            | Axios: Prototype Pollution Gadgets - Response Tampering, Data Exfiltration, and  |
| axios                 | high     | CVE-2026-42035      | v3, v2            | Axios: Header Injection via Prototype Pollution                                  |
| axios                 | high     | CVE-2026-25639      | v3, v2            | Axios is Vulnerable to Denial of Service via **proto** Key in mergeConfig        |
| axios                 | high     | CVE-2026-42264      | v3, v2            | Axios has prototype pollution read-side gadgets in HTTP adapter that allow crede |
| axios                 | high     | CVE-2026-44496      | v3, v2            | Axios: Regular Expression Denial of Service (ReDoS) via Cookie Name Injection    |
| axios                 | high     | CVE-2026-44488      | v3, v2            | Allocation of Resources Without Limits or Throttling in Axios                    |
| axios                 | high     | CVE-2026-44487      | v3, v2            | Axios: Proxy-Authorization Credential Leak to Origin Server Across HTTP-to-HTTPS |
| axios                 | high     | CVE-2026-44486      | v3, v2            | Axios: Proxy-Authorization header leaks to redirect target when proxy is re-eval |
| axios                 | high     | CVE-2026-44495      | v3, v2            | axios Vulnerable to Credential Theft and Response Hijacking via Prototype Pollut |
| axios                 | high     | CVE-2026-44494      | v3, v2            | axios Vulnerable to Full Man-in-the-Middle via Prototype Pollution Gadget in `co |
| axios                 | high     | GHSA-gcfj-64vw-6mp9 | v4                | Axios Node HTTP adapter can use an inherited proxy after interceptor config clon |
| basic-ftp             | high     | GHSA-6v7q-wjvx-w8wg | v3, v2            | basic-ftp: Incomplete CRLF Injection Protection Allows Arbitrary FTP Command Exe |
| basic-ftp             | high     | CVE-2026-41324      | v3, v2            | basic-ftp vulnerable to denial of service via unbounded memory consumption in Cl |
| basic-ftp             | high     | CVE-2026-44240      | v3, v2            | basic-ftp allows a malicious FTP server to cause client-side denial of service v |
| brace-expansion       | high     | CVE-2026-13149      | v3, v2, v1        | brace-expansion: DoS via exponential-time expansion of consecutive non-expanding |
| brace-expansion       | high     | CVE-2026-14257      | v4, v3, v2, v1    | brace-expansion: DoS via unbounded expansion length causing an out-of-memory pro |
| braces                | high     | CVE-2024-4068       | v3, v2, v1        | Uncontrolled resource consumption in braces                                      |
| engine.io             | high     | CVE-2026-59725      | v3, v2            | Socket.IO: Engine.IO Polling Transport Connection Exhaustion                     |
| express-rate-limit    | high     | CVE-2026-30827      | v2                | express-rate-limit: IPv4-mapped IPv6 addresses bypass per-client rate limiting o |
| fast-uri              | high     | CVE-2026-6321       | v2                | fast-uri vulnerable to path traversal via percent-encoded dot segments           |
| fast-uri              | high     | CVE-2026-6322       | v2                | fast-uri vulnerable to host confusion via percent-encoded authority delimiters   |
| fast-uri              | high     | CVE-2026-16221      | v3, v2            | fast-uri vulnerable to host confusion via literal backslash authority delimiter  |
| fast-uri              | high     | CVE-2026-13676      | v3, v2            | fast-uri vulnerable to host confusion via failed IDN canonicalization            |
| fast-xml-parser       | high     | CVE-2026-25128      | v3, v2            | fast-xml-parser has RangeError DoS Numeric Entities Bug                          |
| fast-xml-parser       | high     | CVE-2026-26278      | v3, v2            | fast-xml-parser affected by DoS through entity expansion in DOCTYPE (no expansio |
| fast-xml-parser       | high     | CVE-2026-33036      | v3, v2            | fast-xml-parser affected by numeric entity expansion bypassing all entity expans |
| find-my-way           | high     | CVE-2026-47219      | v3                | find-my-way: DDoS with HTTP2                                                     |
| flatted               | high     | CVE-2026-32141      | v3, v2            | flatted vulnerable to unbounded recursion DoS in parse() revive phase            |
| flatted               | high     | CVE-2026-33228      | v3, v2            | Prototype Pollution via parse() in NodeJS flatted                                |
| form-data             | high     | CVE-2026-12143      | v3, v2, v1        | form-data: CRLF injection in form-data via unescaped multipart field names and f |
| handlebars            | high     | CVE-2026-33938      | v3, v2, v1        | Handlebars.js has JavaScript Injection via AST Type Confusion by tampering @part |
| handlebars            | high     | CVE-2026-33940      | v3, v2, v1        | Handlebars.js has JavaScript Injection via AST Type Confusion when passing an ob |
| handlebars            | high     | CVE-2026-33939      | v3, v2, v1        | Handlebars.js has Denial of Service via Malformed Decorator Syntax in Template C |
| handlebars            | high     | CVE-2026-33941      | v3, v2, v1        | Handlebars.js has JavaScript Injection in CLI Precompiler via Unescaped Names an |
| hono                  | high     | CVE-2026-29045      | v2                | Hono vulnerable to arbitrary file access via serveStatic vulnerability           |
| hono                  | high     | CVE-2026-54290      | v2                | hono: CORS Middleware reflects any Origin with credentials when `origin` default |
| http-proxy-middleware | high     | CVE-2026-55603      | v3, v2            | http-proxy-middleware: multipart/form-data field injection via unescaped CRLF in |
| immutable             | high     | CVE-2026-59879      | v3, v2, v1        | Immutable.js `List` 32-bit trie overflow → unrecoverable DoS                     |
| immutable             | high     | CVE-2026-59880      | v3, v2, v1        | Immutabl: Hash-collision algorithmic complexity denial of service in Immutable.M |
| immutable             | high     | CVE-2026-29063      | v2                | Immutable is vulnerable to Prototype Pollution                                   |
| js-yaml               | high     | CVE-2026-59869      | v4, v3, v2        | js-yaml: YAML merge-key chains can force quadratic CPU consumption               |
| linkify-it            | high     | CVE-2026-59887      | v3, v2            | linkify-it: Quadratic-complexity DoS via the `mailto:` validator scan-loop on at |
| locutus               | high     | CVE-2026-29091      | v3, v2, v1        | locutus call_user_func_array vulnerable to Remote Code Execution (RCE) due to Co |
| lodash                | high     | CVE-2026-4800       | v3                | lodash vulnerable to Code Injection via `_.template` imports key names           |
| lodash.pick           | high     | CVE-2020-8203       | v2, v1            | Prototype Pollution in lodash                                                    |
| minimatch             | high     | CVE-2026-27903      | v3, v2, v1        | minimatch has ReDoS: matchOne() combinatorial backtracking via multiple non-adja |
| minimatch             | high     | CVE-2026-27904      | v3, v2, v1        | minimatch ReDoS: nested *() extglobs generate catastrophically backtracking regu |
| minimatch             | high     | CVE-2026-26996      | v3, v2            | minimatch has a ReDoS via repeated wildcards with non-matching literal in patter |
| node-forge            | high     | CVE-2026-33896      | v2                | Forge has a basicConstraints bypass in its certificate chain verification (RFC 5 |
| node-forge            | high     | CVE-2026-33895      | v2                | Forge has signature forgery in Ed25519 due to missing S > L check                |
| node-forge            | high     | CVE-2026-33891      | v2                | Forge has Denial of Service via Infinite Loop in BigInteger.modInverse() with Ze |
| node-forge            | high     | CVE-2026-33894      | v2                | Forge has signature forgery in RSA-PKCS due to ASN.1 extra field                 |
| path-to-regexp        | high     | CVE-2026-4867       | v3, v2            | path-to-regexp vulnerable to Regular Expression Denial of Service via multiple r |
| path-to-regexp        | high     | CVE-2026-4926       | v2                | path-to-regexp vulnerable to Denial of Service via sequential optional groups    |
| piscina               | high     | CVE-2026-55388      | v4, v3, v2        | piscina: Prototype Pollution Gadget → RCE via inherited options.filename         |
| postcss               | high     | CVE-2026-45623      | v4, v3, v2        | PostCSS: Arbitrary file read and information disclosure via attacker-controlled  |
| postcss               | high     | GHSA-r28c-9q8g-f849 | v4, v3, v2        | PostCSS: Path Traversal in Previous Source Map Auto-Loading (sourceMappingURL) l |
| react-router          | high     | GHSA-qwww-vcr4-c8h2 | v3, v2            | React Router: RSC Mode CSRF Bypass Allows Action Execution Before 400 Response   |
| rollup                | high     | CVE-2026-27606      | v1                | Rollup 4 has Arbitrary File Write via Path Traversal                             |
| semver                | high     | CVE-2022-25883      | v2                | semver vulnerable to Regular Expression Denial of Service                        |
| serialize-javascript  | high     | GHSA-5c6j-r48x-rmvq | v4, v3, v2, v1    | Serialize JavaScript is Vulnerable to RCE via RegExp.flags and Date.prototype.to |
| shell-quote           | high     | CVE-2026-13311      | v3, v2            | shell-quote: Quadratic-complexity Denial of Service in `parse()` (CWE-407)       |
| sigstore              | high     | CVE-2026-48815      | v4, v3, v2, v1    | sigstore's `certificateOIDs` verification constraints are silently dropped and n |
| socket.io-parser      | high     | CVE-2026-33151      | v3, v2            | socket.io allows an unbounded number of binary attachments                       |
| svgo                  | high     | CVE-2026-29074      | v3, v2, v1        | SVGO DoS through entity expansion in DOCTYPE (Billion Laughs)                    |
| svgo                  | high     | GHSA-2p49-hgcm-8545 | v4, v3, v2, v1    | SVGO removeScripts plugin leaves some executable scripts intact                  |
| tar                   | high     | CVE-2026-24842      | v1                | node-tar Vulnerable to Arbitrary File Creation/Overwrite via Hardlink Path Trave |
| tar                   | high     | CVE-2026-23745      | v1                | node-tar is Vulnerable to Arbitrary File Overwrite and Symlink Poisoning via Ins |
| tar                   | high     | CVE-2026-26960      | v1                | Arbitrary File Read/Write via Hardlink Target Escape Through Symlink Chain in no |
| tar                   | high     | CVE-2026-29786      | v1                | tar has Hardlink Path Traversal via Drive-Relative Linkpath                      |
| tar                   | high     | CVE-2026-31802      | v1                | node-tar Symlink Path Traversal via Drive-Relative Linkpath                      |
| tar                   | high     | CVE-2026-23950      | v1                | Race Condition in node-tar Path Reservations via Unicode Ligature Collisions on  |
| tar                   | high     | CVE-2026-59874      | v4, v3, v2, v1    | node-tar: Negative tar entry size causes infinite loop in archive replace        |
| tmp                   | high     | CVE-2026-44705      | v4, v3, v2        | tmp has Path Traversal via unsanitized prefix/postfix that enables directory esc |
| undici                | high     | CVE-2026-1528       | v3, v2            | Undici: Malicious WebSocket 64-bit length overflows parser and crashes the clien |
| undici                | high     | CVE-2026-1526       | v3, v2            | Undici has Unbounded Memory Consumption in WebSocket permessage-deflate Decompre |
| undici                | high     | CVE-2026-2229       | v3, v2            | Undici has Unhandled Exception in WebSocket Client Due to Invalid server_max_win |
| undici                | high     | CVE-2026-9697       | v4, v3, v2        | undici vulnerable to TLS certificate validation bypass via dropped requestTls in |
| undici                | high     | CVE-2026-12151      | v4, v3, v2        | undici WebSocket client vulnerable to denial of service via fragment count bypas |
| undici                | high     | CVE-2026-6734       | v4, v3, v2        | undici vulnerable to cross-origin request routing via SOCKS5 proxy pool reuse    |
| vite                  | high     | CVE-2026-39364      | v1                | Vite: `server.fs.deny` bypassed with queries                                     |
| vite                  | high     | CVE-2026-39363      | v1                | Vite Vulnerable to Arbitrary File Read via Vite Dev Server WebSocket             |
| vite                  | high     | CVE-2026-53571      | v3, v2, v1        | vite: `server.fs.deny` bypass on Windows alternate paths                         |
| ws                    | high     | CVE-2026-48779      | v3, v2, v1        | ws: Memory exhaustion DoS from tiny fragments and data chunks                    |
| @angular/compiler     | moderate | CVE-2026-54265      | v4, v3, v2, v1    | @angular/compiler: Two-Way Property Binding Sanitization Bypass (XSS)            |
| @angular/compiler     | moderate | CVE-2026-50557      | v4, v1            | Angular: Template and Attribute Namespace Sanitization Bypass (XSS)              |
| @angular/core         | moderate | CVE-2026-50557      | v4, v1            | Angular: Template and Attribute Namespace Sanitization Bypass (XSS)              |
| @angular/core         | moderate | CVE-2026-52725      | v4, v1            | @angular/core: Angular Template and Dynamic Component Namespace Bypass leading t |
| @hono/node-server     | moderate | CVE-2026-39406      | v2                | @hono/node-server: Middleware bypass via repeated slashes in serveStatic         |
| @hono/node-server     | moderate | GHSA-frvp-7c67-39w9 | v3, v2            | Node.js Adapter for Hono: Path traversal in `serve-static` on Windows via encode |
| @opentelemetry/core   | moderate | CVE-2026-54285      | v1                | OpenTelemetry Core: Unbounded memory allocation in W3C Baggage propagation       |
| @sigstore/core        | moderate | CVE-2026-48758      | v4, v3, v2, v1    | @sigstore/core has DSSE payloadType type-binding failure                         |
| ajv                   | moderate | CVE-2025-69873      | v3, v2            | ajv has ReDoS when using `$data` option                                          |
| axios                 | moderate | CVE-2025-62718      | v3, v2            | Axios has a NO_PROXY Hostname Normalization Bypass that Leads to SSRF            |
| axios                 | moderate | CVE-2026-42041      | v3, v2            | Axios: Authentication Bypass via Prototype Pollution Gadget in `validateStatus`  |
| axios                 | moderate | CVE-2026-42044      | v3, v2            | Axios: Invisible JSON Response Tampering via Prototype Pollution Gadget in `pars |
| axios                 | moderate | CVE-2026-42037      | v3, v2            | Axios: CRLF Injection in multipart/form-data body via unsanitized blob.type in f |
| axios                 | moderate | CVE-2026-42038      | v3, v2            | Axios: no_proxy bypass via IP alias allows SSRF                                  |
| axios                 | moderate | CVE-2026-42034      | v3, v2            | Axios' HTTP adapter-streamed uploads bypass maxBodyLength when maxRedirects: 0   |
| axios                 | moderate | CVE-2026-42036      | v3, v2            | Axios: HTTP adapter streamed responses bypass maxContentLength                   |
| axios                 | moderate | CVE-2026-42042      | v3, v2            | Axios: XSRF Token Cross-Origin Leakage via Prototype Pollution Gadget in `withXS |
| axios                 | moderate | CVE-2026-40175      | v3, v2            | Axios has Unrestricted Cloud Metadata Exfiltration via Header Injection Chain    |
| axios                 | moderate | CVE-2026-42039      | v3, v2            | Axios: unbounded recursion in toFormData causes DoS via deeply nested request da |
| axios                 | moderate | CVE-2026-44490      | v3, v2            | axios has DoS & Header Injection via Prototype Pollution Read-Side Gadgets in ax |
| axios                 | moderate | GHSA-42h9-826w-cgv3 | v4, v3, v2        | Axios: Excessive recursion in formDataToJSON can cause denial of service         |
| axios                 | moderate | GHSA-pmv8-rq9r-6j72 | v4, v3, v2        | Axios: Deep formToJSON Key Recursion Can Cause Denial of Service                 |
| axios                 | moderate | GHSA-jqh4-m9w3-8hp9 | v4, v3, v2        | Axios: Fetch adapter `ReadableStream` uploads bypass `maxBodyLength`             |
| axios                 | moderate | GHSA-mmx7-hfxf-jppx | v4, v3, v2        | Axios: Prototype pollution gadgets can alter axios request construction          |
| axios                 | moderate | GHSA-7q8q-rj6j-mhjq | v4, v3, v2        | Axios: Nested axios option objects can consume polluted prototype values         |
| axios                 | moderate | GHSA-xj6q-8x83-jv6g | v4                | Axios: Prototype pollution auth subfields can inject Basic auth                  |
| axios                 | moderate | GHSA-f4gw-2p7v-4548 | v4                | Axios: NO_PROXY bypass for 0.0.0.0 local addresses in axios                      |
| axios                 | moderate | GHSA-hcpx-6fm6-wx23 | v4                | Axios form serializer maxDepth bypass via {} metatoken                           |
| axios                 | moderate | GHSA-mwf2-3pr3-8698 | v4                | Axios: HTTP/2 streamed uploads bypass `maxBodyLength`                            |
| brace-expansion       | moderate | CVE-2026-45149      | v3, v2, v1        | brace-expansion: Large numeric range defeats documented `max` DoS protection     |
| brace-expansion       | moderate | CVE-2026-33750      | v3, v2            | brace-expansion: Zero-step sequence causes process hang and memory exhaustion    |
| ejs                   | moderate | CVE-2024-33883      | v2                | ejs lacks certain pollution protection                                           |
| esbuild               | moderate | GHSA-67mh-4wv8-2f99 | v2                | esbuild enables any website to send any requests to the development server and r |
| fast-xml-parser       | moderate | CVE-2026-33349      | v3, v2            | Entity Expansion Limits Bypassed When Set to Zero Due to JavaScript Falsy Evalua |
| fast-xml-parser       | moderate | CVE-2026-41650      | v3, v2            | fast-xml-parser XMLBuilder: XML Comment and CDATA Injection via Unescaped Delimi |
| file-type             | moderate | CVE-2026-31808      | v4                | file-type affected by infinite loop in ASF parser on malformed input with zero-s |
| handlebars            | moderate | CVE-2026-33916      | v3, v2, v1        | Handlebars.js has Prototype Pollution Leading to XSS through Partial Template In |
| handlebars            | moderate | GHSA-7rx3-28cr-v5wh | v3, v2, v1        | Handlebars.js has a Prototype Method Access Control Gap via Missing __lookupSett |
| hono                  | moderate | CVE-2026-29086      | v2                | Hono Vulnerable to Cookie Attribute Injection via Unsanitized domain and path in |
| hono                  | moderate | CVE-2026-29085      | v2                | Hono Vulnerable to SSE Control Field Injection via CR/LF in writeSSE()           |
| hono                  | moderate | GHSA-v8w9-8mx6-g223 | v2                | Hono vulnerable to Prototype Pollution possible through **proto** key allowed in |
| hono                  | moderate | GHSA-26pp-8wgv-hjvm | v2                | Hono missing validation of cookie name on write path in setCookie()              |
| hono                  | moderate | CVE-2026-39410      | v2                | Hono: Non-breaking space prefix bypass in cookie name handling in getCookie()    |
| hono                  | moderate | CVE-2026-39408      | v2                | Hono: Path traversal in toSSG() allows writing files outside the output director |
| hono                  | moderate | CVE-2026-39407      | v2                | Hono: Middleware bypass via repeated slashes in serveStatic                      |
| hono                  | moderate | CVE-2026-39409      | v2                | Hono has incorrect IP matching in ipRestriction() for IPv4-mapped IPv6 addresses |
| hono                  | moderate | CVE-2026-44458      | v2                | Hono has CSS Declaration Injection via Style Object Values in JSX SSR            |
| hono                  | moderate | CVE-2026-44457      | v2                | Hono's Cache Middleware ignores Vary: Authorization / Vary: Cookie leading to cr |
| hono                  | moderate | CVE-2026-44456      | v2                | Hono: bodyLimit() can be bypassed for chunked / unknown-length requests          |
| hono                  | moderate | CVE-2026-44455      | v2                | hono/jsx has Unvalidated JSX Tag Names that May Allow HTML Injection             |
| hono                  | moderate | CVE-2026-47674      | v2                | Hono: IP Restriction bypasses static deny rules for non-canonical IPv6           |
| hono                  | moderate | CVE-2026-47675      | v2                | Hono: Cookie helper does not sanitize sameSite and priority, allowing Set-Cookie |
| hono                  | moderate | CVE-2026-47673      | v2                | Hono: JWT middleware accepts any Authorization scheme, not only Bearer           |
| hono                  | moderate | CVE-2026-47676      | v2                | Hono: app.mount() strips mount prefix using undecoded path, causing incorrect ro |
| hono                  | moderate | CVE-2026-56761      | v2                | hono Improperly Handles JSX Attribute Names Allows HTML Injection in hono/jsx SS |
| hono                  | moderate | CVE-2026-54288      | v2                | hono: Body Limit Middleware can be bypassed on AWS Lambda by understating `Conte |
| hono                  | moderate | CVE-2026-54289      | v2                | hono: Lambda@Edge adapter keeps only the last value of a repeated request header |
| hono                  | moderate | CVE-2026-54286      | v2                | hono: Path traversal in `serve-static` on Windows via encoded backslash (`%5C`)  |
| hono                  | moderate | CVE-2026-54287      | v2                | hono: AWS Lambda adapter merges multiple `Set-Cookie` headers into one value, dr |
| hono                  | moderate | CVE-2026-59897      | v3, v2            | Hono: API Gateway v1 adapter can drop a distinct repeated request header value d |
| hono                  | moderate | CVE-2026-59895      | v3, v2            | Hono: Server-Side XSS via JSX Escaping Bypass in cx() Utility                    |
| hono                  | moderate | CVE-2026-59896      | v3                | hono/jsx does not isolate context per request, leading to cross-request data dis |
| http-proxy-middleware | moderate | CVE-2026-55602      | v4, v3, v2        | http-proxy-middleware `router` host+path substring matching allows Host-header-d |
| ip-address            | moderate | CVE-2026-42338      | v4, v2            | ip-address has XSS in Address6 HTML-emitting methods                             |
| js-yaml               | moderate | CVE-2025-64718      | v2                | js-yaml has prototype pollution in merge (<<)                                    |
| js-yaml               | moderate | CVE-2026-53550      | v4, v3, v2        | JS-YAML: Quadratic-complexity DoS in merge key handling via repeated aliases     |
| launch-editor         | moderate | CVE-2026-53632      | v4, v3, v2        | launch-editor: NTLMv2 hash disclosure via UNC path handling on Windows           |
| locutus               | moderate | CVE-2026-33993      | v3, v2, v1        | Locutus has Prototype Pollution via **proto** Key Injection in unserialize()     |
| lodash                | moderate | CVE-2026-2950       | v3                | lodash vulnerable to Prototype Pollution via array path bypass in `_.unset` and  |
| micromatch            | moderate | CVE-2024-4067       | v3, v2, v1        | Regular Expression Denial of Service (ReDoS) in micromatch                       |
| nanoid                | moderate | CVE-2024-55565      | v2                | Predictable results in nanoid generation when given non-integer values           |
| path-to-regexp        | moderate | CVE-2026-4923       | v2                | path-to-regexp vulnerable to Regular Expression Denial of Service via multiple w |
| postcss               | moderate | CVE-2026-41305      | v4, v3, v2        | PostCSS has XSS via Unescaped </style> in its CSS Stringify Output               |
| protobufjs            | moderate | CVE-2026-59876      | v3                | protobufjs: Text Format string map parsing can mutate returned map object protot |
| protobufjs            | moderate | CVE-2026-59877      | v3                | protobufjs: Denial of Service via infinite loop in .proto option parsing         |
| qs                    | moderate | CVE-2026-8723       | v4, v3, v2, v1    | qs has a remotely triggerable DoS: qs.stringify crashes with TypeError on null/u |
| qs                    | moderate | CVE-2025-15284      | v2                | qs's arrayLimit bypass in its bracket notation allows DoS via memory exhaustion  |
| react-router-dom      | moderate | CVE-2026-53668      | v1                | React Router: Open redirect leading to XSS                                       |
| serialize-javascript  | moderate | CVE-2026-34043      | v4, v3, v2, v1    | Serialize JavaScript has CPU Exhaustion Denial of Service via crafted array-like |
| serialize-javascript  | moderate | CVE-2024-11831      | v2                | Cross-site Scripting (XSS) in serialize-javascript                               |
| smol-toml             | moderate | GHSA-v3rj-xjv7-4jmq | v3, v2, v1        | smol-toml: Denial of Service via TOML documents containing thousands of consecut |
| tar                   | moderate | CVE-2026-53655      | v4, v3, v2, v1    | node-tar applies PAX size override to intermediary GNU long-name/long-link heade |
| tar                   | moderate | CVE-2026-59871      | v4, v3, v2, v1    | node-tar: Process crash via PAX numeric path type confusion                      |
| tar                   | moderate | CVE-2026-59875      | v4, v3, v2, v1    | node-tar: Uncaught Exception DoS via NUL byte in PAX path/linkpath records       |
| tar                   | moderate | GHSA-r292-9mhp-454m | v4, v3, v2, v1    | node-tar: Uncontrolled recursion in mapHas/filesFilter allows uncatchable stack- |
| undici                | moderate | CVE-2026-1525       | v3, v2            | Undici has an HTTP Request/Response Smuggling issue                              |
| undici                | moderate | CVE-2026-1527       | v3, v2            | Undici has CRLF Injection in undici via `upgrade` option                         |
| undici                | moderate | CVE-2026-9679       | v4, v3, v2        | undici vulnerable to HTTP header injection via Set-Cookie percent-decoding       |
| undici                | moderate | CVE-2026-9678       | v4, v3, v2        | undici vulnerable to cross-user information disclosure via shared cache whitespa |
| uuid                  | moderate | CVE-2026-41907      | v4, v3, v2        | uuid: Missing buffer bounds check in v3/v5/v6 when buf is provided               |
| vite                  | moderate | CVE-2026-39365      | v1                | Vite Vulnerable to Path Traversal in Optimized Deps `.map` Handling              |
| vite                  | moderate | CVE-2026-53632      | v3, v2, v1        | launch-editor: NTLMv2 hash disclosure via UNC path handling on Windows           |
| webpack               | moderate | CVE-2024-43788      | v2                | Webpack's AutoPublicPathRuntimeModule has a DOM Clobbering Gadget that leads to  |
| webpack-dev-server    | moderate | CVE-2025-30360      | v2                | webpack-dev-server users' source code may be stolen when they access a malicious |
| webpack-dev-server    | moderate | CVE-2025-30359      | v2                | webpack-dev-server users' source code may be stolen when they access a malicious |
| webpack-dev-server    | moderate | CVE-2026-6402       | v2                | webpack-dev-server vulnerable to cross-origin source code exposure on non-HTTPS  |
| webpack-dev-server    | moderate | CVE-2026-9595       | v2                | webpack-dev-server vulnerable to HMR WebSocket interception via permissive user  |
| webpack-dev-server    | moderate | CVE-2026-14620      | v4, v3, v2        | webpack-dev-server vulnerable to cross-site request forgery via internal develop |
| webpack-dev-server    | moderate | CVE-2026-14631      | v4, v3, v2        | webpack-dev-server vulnerable to denial of service via a malformed Host or Origi |
| websocket-driver      | moderate | CVE-2026-54490      | v4, v3, v2        | websocket-driver: Resource limit bypass via message compression                  |
| ws                    | moderate | CVE-2026-45736      | v3, v2            | ws: Uninitialized memory disclosure                                              |
| yaml                  | moderate | CVE-2026-33532      | v3, v2, v1        | yaml is vulnerable to Stack Overflow via deeply nested YAML collections          |
| @babel/core           | low      | CVE-2026-49356      | v3, v2, v1        | @babel/core: Arbitrary File Read via sourceMappingURL Comment                    |
| @tootallnate/once     | low      | CVE-2026-3449       | v3, v2, v1        | @tootallnate/once vulnerable to Incorrect Control Flow Scoping                   |
| axios                 | low      | CVE-2026-42040      | v3, v2            | Axios: Null Byte Injection via Reverse-Encoding in AxiosURLSearchParams          |
| body-parser           | low      | CVE-2026-12590      | v4, v3, v2        | body-parser vulnerable to denial of service when invalid limit value silently di |
| diff                  | low      | CVE-2026-24001      | v4, v3, v2        | jsdiff has a Denial of Service vulnerability in parsePatch and applyPatch        |
| fast-xml-parser       | low      | CVE-2026-27942      | v3, v2            | fast-xml-parser has stack overflow in XMLBuilder with preserveOrder              |
| handlebars            | low      | GHSA-442j-39wm-28r2 | v3, v2, v1        | Handlebars.js has a Property Access Validation Bypass in container.lookup        |
| hono                  | low      | GHSA-gq3j-xvxp-8hrf | v2                | Hono added timing comparison hardening in basicAuth and bearerAuth               |
| hono                  | low      | CVE-2026-44459      | v2                | Hono has improper validation of NumericDate claims (exp, nbf, iat) in JWT verify |
| qs                    | low      | CVE-2026-2391       | v2                | qs's arrayLimit bypass in comma parsing allows denial of service                 |
| undici                | low      | CVE-2026-6733       | v4, v3, v2        | undici vulnerable to HTTP response queue poisoning via keep-alive socket reuse   |
| undici                | low      | CVE-2026-11525      | v4, v3, v2        | undici vulnerable to Set-Cookie SameSite attribute downgrade via permissive subs |
| webpack               | low      | CVE-2025-68458      | v2                | webpack buildHttp: allowedUris allow-list bypass via URL userinfo (@) leading to |
| webpack               | low      | CVE-2025-68157      | v2                | webpack buildHttp HttpUriPlugin allowedUris bypass via HTTP redirects → SSRF + c |
