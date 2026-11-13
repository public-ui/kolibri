# CVE Overview

> For more security information, see [SECURITY.md](./SECURITY.md)

## 1. Production Dependencies

### Summary

| Severity |  v5 |  v4 |  v2 |
| -------- | --: | --: | --: |
| critical |   0 |   0 |   1 |
| high     |   5 |   5 |   4 |
| moderate |   8 |   8 |   1 |
| low      |   4 |   4 |   1 |
| info     |   0 |   0 |   0 |
| unknown  |   0 |   0 |   0 |

### Vulnerabilities

| Package   | Severity | CVE             | Affected Versions | Description                                                                      |
| --------- | -------- | --------------- | ----------------- | -------------------------------------------------------------------------------- |
| seroval   | critical | CVE-2026-104846 | v2                | Seroval: `fromJSON()` Promise thenable assimilation invokes plugin-produced call |
| fast-uri  | high     | CVE-2026-75931  | v5, v4            | fast-uri vulnerable to host confusion via skipped IDN canonicalization on scheme |
| fast-uri  | high     | CVE-2026-75975  | v5, v4            | fast-uri vulnerable to server-side request forgery via malformed IPv6 normalizat |
| fast-uri  | high     | CVE-2026-75899  | v5, v4            | fast-uri vulnerable to server-side request forgery via repeated hostname percent |
| fast-uri  | high     | CVE-2026-76172  | v5, v4            | fast-uri vulnerable to host confusion via percent-encoded scheme normalization   |
| fast-uri  | high     | CVE-2026-84292  | v5, v4            | fast-uri vulnerable to authority injection via an unvalidated port in serialize  |
| seroval   | high     | CVE-2026-104845 | v2                | Seroval: Memory exhaustion via unchecked TypedArray length in JSON deserializati |
| seroval   | high     | CVE-2026-116581 | v2                | Seroval: fromJSON deserializer trusts node-supplied array length and sequence do |
| seroval   | high     | CVE-2026-116584 | v2                | Seroval `fromJSON`/`fromCrossJSON` denial of service via unvalidated array node  |
| seroval   | high     | CVE-2026-116580 | v2                | Seroval: Deserialization invokes attacker-chosen callables: AsyncIteratorFactory |
| fast-uri  | moderate | CVE-2026-86472  | v5, v4            | fast-uri vulnerable to inconsistent host case normalization via percent-encoded  |
| fast-uri  | moderate | CVE-2026-110306 | v5, v4            | fast-uri vulnerable to URI scheme spoofing via percent-encoded scheme decoding   |
| fast-uri  | moderate | CVE-2026-110180 | v5, v4            | fast-uri vulnerable to host confusion via unchecked WHATWG host canonicalization |
| hono      | moderate | CVE-2026-126357 | v5, v4            | Hono: `mount()` and `app.mount()` can forward a path that bypasses middleware sc |
| hono      | moderate | CVE-2026-126358 | v5, v4            | Hono: RegExpRouter skips wildcard middleware for some route sets and for paths w |
| hono      | moderate | CVE-2026-126355 | v5, v4            | Hono: `csrf()` does not check requests sent by hyperlink auditing (`text/ping`)  |
| hono      | moderate | CVE-2026-126356 | v5, v4            | Hono: `validator('form')` skips validation for `multipart/form-data` requests wi |
| minimatch | moderate | CVE-2026-118764 | v5, v4            | minimatch has potential denial of service via globparts amplification            |
| seroval   | moderate | CVE-2026-116582 | v2                | Seroval: Script injection through RegExp sources in serialized output            |
| deepmerge | low      | CVE-2026-93753  | v5, v4, v2        | deepmerge mergeObject() allows prototype poisoning of returned objects           |
| fast-uri  | low      | CVE-2026-110095 | v5, v4            | fast-uri vulnerable to improper path equivalence in relative reference normaliza |
| fast-uri  | low      | CVE-2026-110725 | v5, v4            | fast-uri vulnerable to scheme injection via an unescaped first-segment colon in  |
| hono      | low      | CVE-2026-126359 | v5, v4            | Hono: `css` helper does not escape a closing tag split between the template and  |

## 2. All Dependencies

### Summary

| Severity |  v5 |  v4 |  v2 |
| -------- | --: | --: | --: |
| critical |   0 |   0 |   5 |
| high     |  28 |  28 |  44 |
| moderate |  37 |  37 |  44 |
| low      |   7 |   7 |  12 |
| info     |   0 |   0 |   0 |
| unknown  |   0 |   0 |   0 |

### Vulnerabilities

| Package                   | Severity | CVE                 | Affected Versions | Description                                                                      |
| ------------------------- | -------- | ------------------- | ----------------- | -------------------------------------------------------------------------------- |
| handlebars                | critical | CVE-2026-106446     | v2                | Handlebars: JavaScript Injection via AST Type Confusion in compile (bypass of CV |
| handlebars                | critical | CVE-2026-106445     | v2                | Handlebars: JavaScript Injection via Own Property Check Bypass                   |
| locutus                   | critical | CVE-2026-32304      | v2                | Locutus vulnerable to RCE via unsanitized input in create_function()             |
| piscina                   | critical | CVE-2026-102992     | v2                | piscina: Prototype-pollution gadget in ThreadPool.options allows RCE via execArg |
| seroval                   | critical | CVE-2026-104846     | v2                | Seroval: `fromJSON()` Promise thenable assimilation invokes plugin-produced call |
| @angular/compiler         | high     | CVE-2026-69151      | v5, v4            | Angular i18n: Cross-Site Scripting (XSS) via event-handler attributes            |
| @angular/core             | high     | CVE-2026-69151      | v5, v4, v2        | Angular i18n: Cross-Site Scripting (XSS) via event-handler attributes            |
| @angular/core             | high     | CVE-2026-54267      | v5, v4            | Angular Client Hydration DOM Clobbering & Response-Cache Poisoning               |
| @modelcontextprotocol/sdk | high     | CVE-2026-104850     | v2                | MCP TypeScript SDK: OAuth client could send credentials to an authorization serv |
| @modelcontextprotocol/sdk | high     | CVE-2026-111767     | v5, v4, v2        | MCP TypeScript SDK: Experimental tasks were not tied to the session that created |
| @modelcontextprotocol/sdk | high     | CVE-2026-111768     | v5, v4, v2        | MCP TypeScript SDK: One HTTP request within the default size limit could exhaust |
| @modelcontextprotocol/sdk | high     | GHSA-f897-62hf-6gxq | v2                | MCP TypeScript SDK: HTTP server transports and handlers did not limit request bo |
| @vue/server-renderer      | high     | GHSA-g2v6-rqmx-r4w6 | v2                | @vue/server-renderer: XSS via missing CR in attribute-name blacklist             |
| basic-ftp                 | high     | CVE-2026-102990     | v5, v4, v2        | basic-ftp: Quadratic-time CPU denial of service in Client.list() Unix directory- |
| braces                    | high     | CVE-2024-4068       | v2                | Uncontrolled resource consumption in braces                                      |
| compression               | high     | CVE-2026-87776      | v5, v4            | compression vulnerable to Denial of Service via memory leak on premature respons |
| decode-uri-component      | high     | CVE-2026-118664     | v2                | decode-uri-component vulnerable to denial of service via quadratic replacement o |
| deepmerge-ts              | high     | CVE-2026-40345      | v2                | DeepmergeTS has stack exhaustion when merging recursive object graphs            |
| extract-zip               | high     | CVE-2026-56876      | v5, v4, v2        | extract-zip unvalidated symlink path traversal                                   |
| extract-zip               | high     | CVE-2026-19693      | v5, v4, v2        | extract-zip allows arbitrary file writes through symlink archive entries         |
| fast-uri                  | high     | CVE-2026-75931      | v5, v4            | fast-uri vulnerable to host confusion via skipped IDN canonicalization on scheme |
| fast-uri                  | high     | CVE-2026-75975      | v5, v4            | fast-uri vulnerable to server-side request forgery via malformed IPv6 normalizat |
| fast-uri                  | high     | CVE-2026-75899      | v5, v4            | fast-uri vulnerable to server-side request forgery via repeated hostname percent |
| fast-uri                  | high     | CVE-2026-76172      | v5, v4            | fast-uri vulnerable to host confusion via percent-encoded scheme normalization   |
| fast-uri                  | high     | CVE-2026-84292      | v5, v4            | fast-uri vulnerable to authority injection via an unvalidated port in serialize  |
| happy-dom                 | high     | CVE-2026-115895     | v5, v4            | Happy DOM: Incomplete fix for CVE-2026-33943: unsanitized import alias leads to  |
| happy-dom                 | high     | CVE-2026-118660     | v5, v4            | Happy DOM: SSRF via iframe and link stylesheet when parsing untrusted HTML       |
| js-yaml                   | high     | CVE-2026-59869      | v2                | js-yaml: YAML merge-key chains can force quadratic CPU consumption               |
| js-yaml                   | high     | GHSA-5p4m-2wfm-xmqj | v2                | JS-YAML: Quadratic CPU consumption in !!omap resolution (3.x and 4.x) — CVE-2026 |
| js-yaml                   | high     | CVE-2026-84375      | v5, v4, v2        | js-yaml: maxTotalMergeKeys does not limit CPU use for empty merge sources        |
| locutus                   | high     | CVE-2026-29091      | v2                | locutus call_user_func_array vulnerable to Remote Code Execution (RCE) due to Co |
| lodash.pick               | high     | CVE-2020-8203       | v2                | Prototype Pollution in lodash                                                    |
| minimatch                 | high     | CVE-2026-26996      | v2                | minimatch has a ReDoS via repeated wildcards with non-matching literal in patter |
| minimatch                 | high     | CVE-2026-27903      | v2                | minimatch has ReDoS: matchOne() combinatorial backtracking via multiple non-adja |
| minimatch                 | high     | CVE-2026-27904      | v2                | minimatch ReDoS: nested *() extglobs generate catastrophically backtracking regu |
| pacote                    | high     | CVE-2026-9496       | v2                | pacote is vulnerable to Denial of Service (DoS) via the addGitSha function       |
| postcss                   | high     | CVE-2026-45623      | v5, v4, v2        | PostCSS: Arbitrary file read and information disclosure via attacker-controlled  |
| postcss                   | high     | CVE-2026-73646      | v5, v4, v2        | PostCSS: Path Traversal in Previous Source Map Auto-Loading (sourceMappingURL) l |
| semver                    | high     | CVE-2022-25883      | v2                | semver vulnerable to Regular Expression Denial of Service                        |
| serialize-javascript      | high     | GHSA-5c6j-r48x-rmvq | v5, v4, v2        | Serialize JavaScript is Vulnerable to RCE via RegExp.flags and Date.prototype.to |
| seroval                   | high     | CVE-2026-104845     | v2                | Seroval: Memory exhaustion via unchecked TypedArray length in JSON deserializati |
| seroval                   | high     | CVE-2026-116581     | v2                | Seroval: fromJSON deserializer trusts node-supplied array length and sequence do |
| seroval                   | high     | CVE-2026-116584     | v2                | Seroval `fromJSON`/`fromCrossJSON` denial of service via unvalidated array node  |
| seroval                   | high     | CVE-2026-116580     | v2                | Seroval: Deserialization invokes attacker-chosen callables: AsyncIteratorFactory |
| undici                    | high     | CVE-2026-19534      | v2                | undici vulnerable to Denial of Service via unrequested WebSocket subprotocol     |
| undici                    | high     | CVE-2026-84961      | v2                | undici vulnerable to TLS certificate validation bypass via dropped connect optio |
| undici                    | high     | CVE-2026-109869     | v5, v4, v2        | undici vulnerable to Denial of Service via unhandled error on excessive content- |
| undici                    | high     | CVE-2026-109829     | v5, v4, v2        | undici vulnerable to cache poisoning and cross-user disclosure via cross-origin  |
| undici                    | high     | CVE-2026-109383     | v5, v4, v2        | undici vulnerable to TLS certificate validation bypass via dropped tls options i |
| undici                    | high     | CVE-2026-87018      | v5, v4, v2        | undici vulnerable to Denial of Service via TLS 1.2 certificate-changing renegoti |
| vite                      | high     | CVE-2026-112942     | v5, v4, v2        | launch-editor: `fs.existsSync()` existence check can be bypassed on Windows      |
| webpack-dev-middleware    | high     | CVE-2026-76844      | v2                | webpack-dev-middleware vulnerable to Path Traversal via non-slash-terminated pub |
| zod                       | high     | CVE-2023-54404      | v2                | Zod can exhaust memory while validating oversized constrained collections        |
| @angular/common           | moderate | CVE-2026-88059      | v2                | Angular: Information Leak via `HttpTransferCache` Bypass When Using `withRequest |
| @angular/common           | moderate | CVE-2026-111753     | v2                | @angular/common: XSRF Token Leakage via URL Parsing Discrepancy in Angular HTTP  |
| @angular/compiler         | moderate | CVE-2026-88057      | v5, v4, v2        | Angular: Sanitization bypass via directive host bindings on concrete host elemen |
| @angular/compiler         | moderate | CVE-2026-54265      | v5, v4            | @angular/compiler: Two-Way Property Binding Sanitization Bypass (XSS)            |
| @angular/compiler         | moderate | CVE-2026-50557      | v5, v4            | Angular: Template and Attribute Namespace Sanitization Bypass (XSS)              |
| @angular/core             | moderate | CVE-2026-88057      | v5, v4, v2        | Angular: Sanitization bypass via directive host bindings on concrete host elemen |
| @angular/core             | moderate | CVE-2026-50557      | v5, v4            | Angular: Template and Attribute Namespace Sanitization Bypass (XSS)              |
| @angular/core             | moderate | CVE-2026-52725      | v5, v4            | @angular/core: Angular Template and Dynamic Component Namespace Bypass leading t |
| @modelcontextprotocol/sdk | moderate | CVE-2026-111771     | v5, v4, v2        | MCP TypeScript SDK: Server bearer authentication accepted tokens issued for anot |
| @modelcontextprotocol/sdk | moderate | CVE-2026-111769     | v5, v4, v2        | MCP TypeScript client SDK: HTTP client transports and OAuth requests followed cr |
| basic-ftp                 | moderate | CVE-2026-126345     | v5, v4, v2        | basic-ftp: Uncaught TypeError in MLSD directory-listing parser via **proto** fac |
| basic-ftp                 | moderate | CVE-2026-126346     | v5, v4, v2        | basic-ftp: Uncaught exception crashes the Node.js process when a password (or re |
| decode-uri-component      | moderate | CVE-2026-45822      | v2                | decode-uri-component: Denial of service via exponential decoding of malformed pe |
| ejs                       | moderate | CVE-2024-33883      | v2                | ejs lacks certain pollution protection                                           |
| esbuild                   | moderate | GHSA-67mh-4wv8-2f99 | v2                | esbuild enables any website to send any requests to the development server and r |
| fast-uri                  | moderate | CVE-2026-86472      | v5, v4            | fast-uri vulnerable to inconsistent host case normalization via percent-encoded  |
| fast-uri                  | moderate | CVE-2026-110306     | v5, v4            | fast-uri vulnerable to URI scheme spoofing via percent-encoded scheme decoding   |
| fast-uri                  | moderate | CVE-2026-110180     | v5, v4            | fast-uri vulnerable to host confusion via unchecked WHATWG host canonicalization |
| file-type                 | moderate | CVE-2026-31808      | v5, v4            | file-type affected by infinite loop in ASF parser on malformed input with zero-s |
| glob                      | moderate | CVE-2026-118773     | v5, v4, v2        | Glob: AbortSignal cancellation bypass allows post-timeout filesystem traversal   |
| handlebars                | moderate | CVE-2026-106444     | v2                | Handlebars: JavaScript Injection via Unsafe Inline Embedding of Precompiled Temp |
| hono                      | moderate | CVE-2026-126357     | v5, v4            | Hono: `mount()` and `app.mount()` can forward a path that bypasses middleware sc |
| hono                      | moderate | CVE-2026-126358     | v5, v4            | Hono: RegExpRouter skips wildcard middleware for some route sets and for paths w |
| hono                      | moderate | CVE-2026-126355     | v5, v4            | Hono: `csrf()` does not check requests sent by hyperlink auditing (`text/ping`)  |
| hono                      | moderate | CVE-2026-126356     | v5, v4            | Hono: `validator('form')` skips validation for `multipart/form-data` requests wi |
| js-yaml                   | moderate | CVE-2025-64718      | v2                | js-yaml has prototype pollution in merge (<<)                                    |
| js-yaml                   | moderate | CVE-2026-53550      | v2                | JS-YAML: Quadratic-complexity DoS in merge key handling via repeated aliases     |
| locutus                   | moderate | CVE-2026-33994      | v2                | Locutus Prototype Pollution due to incomplete fix for CVE-2026-25521             |
| locutus                   | moderate | CVE-2026-33993      | v2                | Locutus has Prototype Pollution via **proto** Key Injection in unserialize()     |
| micromatch                | moderate | CVE-2024-4067       | v2                | Regular Expression Denial of Service (ReDoS) in micromatch                       |
| minimatch                 | moderate | CVE-2026-118764     | v5, v4, v2        | minimatch has potential denial of service via globparts amplification            |
| postcss                   | moderate | CVE-2026-41305      | v5, v4, v2        | PostCSS has XSS via Unescaped </style> in its CSS Stringify Output               |
| postcss                   | moderate | CVE-2026-69153      | v5, v4, v2        | PostCSS: incomplete fix of GHSA-6g55-p6wh-862q — attacker-controlled sourceMappi |
| serialize-javascript      | moderate | CVE-2026-34043      | v5, v4, v2        | Serialize JavaScript has CPU Exhaustion Denial of Service via crafted array-like |
| serialize-javascript      | moderate | CVE-2024-11831      | v2                | Cross-site Scripting (XSS) in serialize-javascript                               |
| seroval                   | moderate | CVE-2026-116582     | v2                | Seroval: Script injection through RegExp sources in serialized output            |
| undici                    | moderate | CVE-2026-85024      | v2                | undici vulnerable to Denial of Service via unhandled error in WebSocket permessa |
| undici                    | moderate | CVE-2026-18149      | v2                | undici vulnerable to Denial of Service via orphaned RetryHandler response body   |
| undici                    | moderate | CVE-2026-84890      | v2                | undici vulnerable to Denial of Service via unbounded decompression of compressed |
| undici                    | moderate | CVE-2026-84933      | v2                | undici vulnerable to cross-user cookie disclosure via Set-Cookie caching in shar |
| undici                    | moderate | CVE-2026-85014      | v2                | undici vulnerable to Denial of Service via WebSocketStream unclean close         |
| undici                    | moderate | CVE-2026-109924     | v5, v4, v2        | undici vulnerable to Denial of Service via unbounded memory in the EventSource p |
| undici                    | moderate | CVE-2026-109841     | v5, v4, v2        | undici vulnerable to Subresource Integrity bypass via non-lowercase algorithm to |
| undici                    | moderate | CVE-2026-109932     | v5, v4, v2        | undici WebSocket client vulnerable to Denial of Service via unbounded automatic  |
| undici                    | moderate | CVE-2026-87029      | v5, v4, v2        | undici vulnerable to Denial of Service via unhandled exception in the decompress |
| uuid                      | moderate | CVE-2026-41907      | v5, v4, v2        | uuid: Missing buffer bounds check in v3/v5/v6 when buf is provided               |
| vite                      | moderate | CVE-2026-112943     | v5, v4, v2        | launch-editor: escapeCmdArgs() omits % escaping on Windows                       |
| vite                      | moderate | CVE-2026-112944     | v5, v4, v2        | launch-editor: Editor CLI flag misinterpretation causing arbitrary command execu |
| vite                      | moderate | CVE-2026-112946     | v5, v4, v2        | Vite: Files outside `server.fs.allow` could be served when project paths match s |
| webpack                   | moderate | CVE-2024-43788      | v2                | Webpack's AutoPublicPathRuntimeModule has a DOM Clobbering Gadget that leads to  |
| webpack-dev-server        | moderate | CVE-2025-30360      | v2                | webpack-dev-server users' source code may be stolen when they access a malicious |
| webpack-dev-server        | moderate | CVE-2025-30359      | v2                | webpack-dev-server users' source code may be stolen when they access a malicious |
| webpack-dev-server        | moderate | CVE-2026-6402       | v2                | webpack-dev-server vulnerable to cross-origin source code exposure on non-HTTPS  |
| webpack-dev-server        | moderate | CVE-2026-9595       | v2                | webpack-dev-server vulnerable to HMR WebSocket interception via permissive user  |
| webpack-dev-server        | moderate | CVE-2026-14620      | v2                | webpack-dev-server vulnerable to cross-site request forgery via internal develop |
| webpack-dev-server        | moderate | CVE-2026-14631      | v2                | webpack-dev-server vulnerable to denial of service via a malformed Host or Origi |
| @babel/core               | low      | CVE-2026-49356      | v2                | @babel/core: Arbitrary File Read via sourceMappingURL Comment                    |
| @tootallnate/once         | low      | CVE-2026-3449       | v2                | @tootallnate/once vulnerable to Incorrect Control Flow Scoping                   |
| deepmerge                 | low      | CVE-2026-93753      | v5, v4, v2        | deepmerge mergeObject() allows prototype poisoning of returned objects           |
| diff                      | low      | CVE-2026-24001      | v5, v4, v2        | jsdiff has a Denial of Service vulnerability in parsePatch and applyPatch        |
| fast-uri                  | low      | CVE-2026-110095     | v5, v4            | fast-uri vulnerable to improper path equivalence in relative reference normaliza |
| fast-uri                  | low      | CVE-2026-110725     | v5, v4            | fast-uri vulnerable to scheme injection via an unescaped first-segment colon in  |
| hono                      | low      | CVE-2026-126359     | v5, v4            | Hono: `css` helper does not escape a closing tag split between the template and  |
| serialize-javascript      | low      | CVE-2026-115897     | v5, v4, v2        | Serialize JavaScript: Cross-site scripting (XSS) via unescaped </script at the e |
| undici                    | low      | CVE-2026-18540      | v2                | undici vulnerable to downstream response splitting via retry interceptor         |
| undici                    | low      | CVE-2026-84947      | v2                | undici vulnerable to response truncation via oversized chunked responses in the  |
| undici                    | low      | CVE-2026-85008      | v2                | undici vulnerable to caching and replay of unsafe HTTP method responses          |
| vite                      | low      | CVE-2026-112945     | v5, v4, v2        | Vite: Cross origin script execution through Vite custom middleware               |
| webpack                   | low      | CVE-2025-68458      | v2                | webpack buildHttp: allowedUris allow-list bypass via URL userinfo (@) leading to |
| webpack                   | low      | CVE-2025-68157      | v2                | webpack buildHttp HttpUriPlugin allowedUris bypass via HTTP redirects → SSRF + c |
