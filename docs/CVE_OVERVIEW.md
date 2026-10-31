# CVE Overview

> For more security information, see [SECURITY.md](./SECURITY.md)

## 1. Production Dependencies

### Summary

| Severity |  v5 |  v4 |  v3 |  v2 |  v1 |
| -------- | --: | --: | --: | --: | --: |
| critical |   5 |   6 |   1 |   2 |   4 |
| high     |  21 |  21 |  41 |  14 |  49 |
| moderate |  17 |  20 |  40 |   8 |  30 |
| low      |   5 |   5 |   8 |   3 |   8 |
| info     |   0 |   0 |   0 |   0 |   0 |
| unknown  |   0 |   0 |   0 |   0 |   0 |

### Vulnerabilities

| Package                   | Severity | CVE                 | Affected Versions  | Description                                                                      |
| ------------------------- | -------- | ------------------- | ------------------ | -------------------------------------------------------------------------------- |
| @simple-git/argv-parser   | critical | CVE-2026-102829     | v5, v4             | simple-git: `VISUAL` editor environment variable is omitted from unsafe editor d |
| dompurify                 | critical | GHSA-cg2g-xh64-v4q7 | v1                 | DOMPurify SAFE_FOR_TEMPLATES bypass: split template expressions survive in attac |
| handlebars                | critical | CVE-2026-106446     | v5, v4             | Handlebars: JavaScript Injection via AST Type Confusion in compile (bypass of CV |
| handlebars                | critical | CVE-2026-106445     | v5, v4             | Handlebars: JavaScript Injection via Own Property Check Bypass                   |
| proxy-addr                | critical | CVE-2026-90711      | v4, v3, v1         | proxy-addr vulnerable to IP spoofing via IPv4-mapped IPv6 trust subnet           |
| seroval                   | critical | CVE-2026-104846     | v2, v1             | Seroval: `fromJSON()` Promise thenable assimilation invokes plugin-produced call |
| shell-quote               | critical | CVE-2026-102422     | v5, v4, v2, v1     | shell-quote: `quote()` command injection via a line terminator in a token after  |
| simple-git                | critical | CVE-2026-102828     | v5, v4             | simple-git unsafe-operation guard does not block trailer command configuration   |
| @angular/common           | high     | CVE-2026-68945      | v3                 | Angular: Cache-Key Ambiguity in HttpTransferCache Leading to Cross-Request Respo |
| @angular/compiler         | high     | CVE-2026-69151      | v3                 | Angular i18n: Cross-Site Scripting (XSS) via event-handler attributes            |
| @angular/core             | high     | CVE-2026-69151      | v3                 | Angular i18n: Cross-Site Scripting (XSS) via event-handler attributes            |
| @angular/router           | high     | CVE-2026-101896     | v3, v2             | Angular Server-Side Rendering (SSR): Denial of Service via Numeric URL Matrix Pa |
| @angular/router           | high     | CVE-2026-111752     | v3, v2             | @angular/router: Denial of Service via Unmatched Empty-Path Outlet Route Matchin |
| @angular/router           | high     | CVE-2026-111751     | v3, v2             | @angular/router: Denial of Service via RouterLink Query Parameter Retention in S |
| @grpc/grpc-js             | high     | CVE-2026-101916     | v3                 | @grpc/grpc-js: In certain configurations, getAuthContext can return unauthorized |
| @modelcontextprotocol/sdk | high     | CVE-2026-104850     | v3                 | MCP TypeScript SDK: OAuth client could send credentials to an authorization serv |
| @modelcontextprotocol/sdk | high     | CVE-2026-111767     | v3                 | MCP TypeScript SDK: Experimental tasks were not tied to the session that created |
| @modelcontextprotocol/sdk | high     | CVE-2026-111768     | v3                 | MCP TypeScript SDK: One HTTP request within the default size limit could exhaust |
| @modelcontextprotocol/sdk | high     | GHSA-f897-62hf-6gxq | v3                 | MCP TypeScript SDK: HTTP server transports and handlers did not limit request bo |
| axios                     | high     | CVE-2026-101903     | v1                 | Axios: ReDoS in fromDataURI data: URL parser freezes the Node event loop (DoS)   |
| axios                     | high     | CVE-2026-101906     | v1                 | Axios: ReDoS (O(N²)) in shouldBypassProxy host normalization, reachable via untr |
| axios                     | high     | CVE-2026-101909     | v1                 | Axios: Prototype Pollution Gadget in axios toFormData Options                    |
| axios                     | high     | CVE-2026-101898     | v1                 | Axios: HTTP/2 adapter bypasses configured DNS lookup and proxy controls          |
| axios                     | high     | CVE-2026-101901     | v1                 | Axios: Denial of Service via Unhandled 'error' Event in HTTP/2 ClientHttp2Sessio |
| axios                     | high     | CVE-2026-101905     | v1                 | Axios: Node HTTP adapter prototype-pollution gadget allows request socket hijack |
| axios                     | high     | CVE-2026-101907     | v1                 | Axios: maxRedirects: 0 is not enforced by the fetch adapter, allowing redirect-b |
| basic-ftp                 | high     | CVE-2026-102990     | v1                 | basic-ftp: Quadratic-time CPU denial of service in Client.list() Unix directory- |
| body-parser               | high     | CVE-2026-111181     | v5, v4, v3, v1     | body-parser vulnerable to Denial of Service via trailing bytes after a compresse |
| brace-expansion           | high     | CVE-2026-13149      | v1                 | brace-expansion: DoS via exponential-time expansion of consecutive non-expanding |
| brace-expansion           | high     | CVE-2026-14257      | v1                 | brace-expansion: DoS via unbounded expansion length causing an out-of-memory pro |
| brace-expansion           | high     | CVE-2026-69152      | v1                 | brace-expansion: DoS via unbounded intermediate arrays, bypassing the CVE-2026-1 |
| brace-expansion           | high     | CVE-2026-102278     | v5, v4, v1         | brace-expansion: DoS via uncontrolled recursion on nested brace groups causing s |
| brace-expansion           | high     | CVE-2026-102276     | v5, v4, v1         | brace-expansion: DoS via uncontrolled recursion in parseCommaParts causing stack |
| browserslist              | high     | CVE-2026-73089      | v1                 | Browserslist: Unbounded memory growth (no cache eviction) via distinct query res |
| browserslist              | high     | CVE-2026-73088      | v1                 | Browserslist: Uncaught crash / prototype write via untrusted browserslist-stats. |
| compression               | high     | CVE-2026-87776      | v1                 | compression vulnerable to Denial of Service via memory leak on premature respons |
| dompurify                 | high     | GHSA-mrv2-3pqr-j5jr | v1                 | DOMPurify IN_PLACE: hook that removes a parent or sibling leaves the detached su |
| extract-zip               | high     | CVE-2026-56876      | v1                 | extract-zip unvalidated symlink path traversal                                   |
| extract-zip               | high     | CVE-2026-19693      | v1                 | extract-zip allows arbitrary file writes through symlink archive entries         |
| fast-uri                  | high     | CVE-2026-18446      | v3, v1             | fast-uri vulnerable to host confusion via backslash authority introducer         |
| fast-uri                  | high     | CVE-2026-75931      | v5, v4, v1         | fast-uri vulnerable to host confusion via skipped IDN canonicalization on scheme |
| fast-uri                  | high     | CVE-2026-75975      | v5, v4, v3, v1     | fast-uri vulnerable to server-side request forgery via malformed IPv6 normalizat |
| fast-uri                  | high     | CVE-2026-75899      | v5, v4, v3, v1     | fast-uri vulnerable to server-side request forgery via repeated hostname percent |
| fast-uri                  | high     | CVE-2026-76172      | v5, v4, v3, v1     | fast-uri vulnerable to host confusion via percent-encoded scheme normalization   |
| fast-uri                  | high     | CVE-2026-84292      | v5, v4, v3, v1     | fast-uri vulnerable to authority injection via an unvalidated port in serialize  |
| fast-uri                  | high     | CVE-2026-16221      | v3                 | fast-uri vulnerable to host confusion via literal backslash authority delimiter  |
| fast-uri                  | high     | CVE-2026-13676      | v3                 | fast-uri vulnerable to host confusion via failed IDN canonicalization            |
| fastify                   | high     | CVE-2026-84504      | v3                 | fastify vulnerable to request body replacement via an async validation result co |
| fastify                   | high     | CVE-2026-76169      | v3                 | fastify vulnerable to authentication bypass via malformed URLs reaching encapsul |
| fastify                   | high     | CVE-2026-84469      | v3                 | fastify vulnerable to request validation bypass via skipped boolean false schema |
| fastify                   | high     | CVE-2026-84428      | v3                 | fastify vulnerable to header validation bypass via incomplete schema case normal |
| figlet                    | high     | CVE-2026-96780      | v3                 | figlet is vulnerable to denial of service via unbounded loop when whitespaceBrea |
| find-my-way               | high     | CVE-2026-47219      | v3                 | find-my-way: DDoS with HTTP2                                                     |
| follow-redirects          | high     | CVE-2026-111756     | v5, v4, v3, v2, v1 | follow-redirects array-form headers bypass cross-origin credential stripping     |
| follow-redirects          | high     | CVE-2026-111755     | v5, v4, v3, v2, v1 | follow-redirects sensitiveHeaders regex escaping can expose credential headers   |
| follow-redirects          | high     | CVE-2026-116689     | v5, v4, v3, v2, v1 | follow-redirects: Cross-realm sensitiveHeaders arrays are discarded and custom c |
| immutable                 | high     | CVE-2026-59880      | v3, v1             | Immutable: Hash-collision algorithmic complexity denial of service in Immutable. |
| immutable                 | high     | CVE-2026-59879      | v3, v1             | Immutable.js `List` 32-bit trie overflow → unrecoverable DoS                     |
| ip-address                | high     | CVE-2026-69192      | v3                 | ip-address: Address4 decodes leading-zero octets as decimal while resolvers deco |
| js-yaml                   | high     | GHSA-5p4m-2wfm-xmqj | v1                 | JS-YAML: Quadratic CPU consumption in !!omap resolution (3.x and 4.x) — CVE-2026 |
| js-yaml                   | high     | CVE-2026-84375      | v5, v4, v1         | js-yaml: maxTotalMergeKeys does not limit CPU use for empty merge sources        |
| launch-editor             | high     | CVE-2026-112942     | v1                 | launch-editor: `fs.existsSync()` existence check can be bypassed on Windows      |
| linkify-it                | high     | CVE-2026-59887      | v3                 | linkify-it: Quadratic-complexity DoS via the `mailto:` validator scan-loop on at |
| lodash.pick               | high     | CVE-2020-8203       | v1                 | Prototype Pollution in lodash                                                    |
| markdown-it               | high     | CVE-2026-111759     | v3, v2, v1         | markdown-it: Quadratic complexity in smartquotes with unmatched closing quotes   |
| markdown-it               | high     | CVE-2026-111758     | v3, v2, v1         | markdown-it: Quadratic-time rendering of a single multi-line link reference defi |
| minimatch                 | high     | CVE-2026-27903      | v1                 | minimatch has ReDoS: matchOne() combinatorial backtracking via multiple non-adja |
| minimatch                 | high     | CVE-2026-27904      | v1                 | minimatch ReDoS: nested *() extglobs generate catastrophically backtracking regu |
| nanoid                    | high     | CVE-2026-67213      | v3, v1             | nanoid: custom generators can loop indefinitely when size is zero                |
| nanoid                    | high     | CVE-2026-67214      | v3                 | nanoid: non-secure generators can loop indefinitely with negative size           |
| postcss                   | high     | CVE-2026-73646      | v3                 | PostCSS: Path Traversal in Previous Source Map Auto-Loading (sourceMappingURL) l |
| react-router              | high     | GHSA-qwww-vcr4-c8h2 | v3                 | React Router: RSC Mode CSRF Bypass Allows Action Execution Before 400 Response   |
| serialize-javascript      | high     | GHSA-5c6j-r48x-rmvq | v1                 | Serialize JavaScript is Vulnerable to RCE via RegExp.flags and Date.prototype.to |
| seroval                   | high     | CVE-2026-104845     | v2, v1             | Seroval: Memory exhaustion via unchecked TypedArray length in JSON deserializati |
| seroval                   | high     | CVE-2026-116581     | v2, v1             | Seroval: fromJSON deserializer trusts node-supplied array length and sequence do |
| seroval                   | high     | CVE-2026-116584     | v2, v1             | Seroval `fromJSON`/`fromCrossJSON` denial of service via unvalidated array node  |
| seroval                   | high     | CVE-2026-116580     | v2, v1             | Seroval: Deserialization invokes attacker-chosen callables: AsyncIteratorFactory |
| simple-git                | high     | CVE-2026-102826     | v5, v4             | simple-git allows command execution through unblocked Git configuration includes |
| simple-git                | high     | CVE-2026-102827     | v5, v4             | simple-git: unsafe-operations plugin bypass via git long-option abbreviation (-- |
| source-map-js             | high     | CVE-2026-93749      | v3, v2, v1         | source-map-js allows event-loop denial of service through indexed source-map sec |
| vite                      | high     | CVE-2026-112942     | v3, v2             | launch-editor: `fs.existsSync()` existence check can be bypassed on Windows      |
| webpack-dev-middleware    | high     | CVE-2026-76844      | v1                 | webpack-dev-middleware vulnerable to Path Traversal via non-slash-terminated pub |
| zod                       | high     | CVE-2023-54404      | v3                 | Zod can exhaust memory while validating oversized constrained collections        |
| @angular/common           | moderate | CVE-2026-88059      | v3                 | Angular: Information Leak via `HttpTransferCache` Bypass When Using `withRequest |
| @angular/compiler         | moderate | CVE-2026-88057      | v3                 | Angular: Sanitization bypass via directive host bindings on concrete host elemen |
| @angular/core             | moderate | CVE-2026-88057      | v3                 | Angular: Sanitization bypass via directive host bindings on concrete host elemen |
| @hono/node-server         | moderate | GHSA-frvp-7c67-39w9 | v3                 | Node.js Adapter for Hono: Path traversal in `serve-static` on Windows via encode |
| @hono/node-server         | moderate | CVE-2026-118663     | v5, v4, v3         | @hono/node-server: `serveStatic` decodes the request path a second time, leading |
| @modelcontextprotocol/sdk | moderate | CVE-2026-111769     | v3                 | MCP TypeScript client SDK: HTTP client transports and OAuth requests followed cr |
| @modelcontextprotocol/sdk | moderate | CVE-2026-111771     | v3                 | MCP TypeScript SDK: Server bearer authentication accepted tokens issued for anot |
| axios                     | moderate | CVE-2026-101908     | v1                 | Axios: Prototype pollution gadget in fetch adapter can alter outbound requests   |
| axios                     | moderate | CVE-2026-101902     | v1                 | Axios: Prototype-Pollution Gadget in the Default Instance Allows Inherited Objec |
| axios                     | moderate | CVE-2026-101904     | v1                 | Axios: Header Injection via Inherited headers After Minimal Interceptor          |
| axios                     | moderate | CVE-2026-101900     | v1                 | Axios: Fetch Adapter Header Injection via Inherited FormData getHeaders          |
| axios                     | moderate | CVE-2026-101899     | v1                 | Axios: CIDR-form NO_PROXY entries are ignored, causing proxy exclusion bypass fo |
| baseline-browser-mapping  | moderate | CVE-2026-45819      | v1                 | baseline-browser-mapping process termination on invalid input causes denial of s |
| brace-expansion           | moderate | CVE-2026-45149      | v1                 | brace-expansion: Large numeric range defeats documented `max` DoS protection     |
| brace-expansion           | moderate | CVE-2026-102277     | v5, v4, v1         | brace-expansion: Quadratic-time expansion of the `{a},b}` rewrite causes CPU den |
| dompurify                 | moderate | GHSA-55q2-fjhq-7xh7 | v1                 | DOMPurify: IN_PLACE hook removal leaves a detached subtree executable, causing X |
| fast-uri                  | moderate | CVE-2026-86472      | v5, v4, v3, v1     | fast-uri vulnerable to inconsistent host case normalization via percent-encoded  |
| fast-uri                  | moderate | CVE-2026-110306     | v5, v4, v3, v1     | fast-uri vulnerable to URI scheme spoofing via percent-encoded scheme decoding   |
| fast-uri                  | moderate | CVE-2026-110180     | v5, v4, v1         | fast-uri vulnerable to host confusion via unchecked WHATWG host canonicalization |
| fastify                   | moderate | CVE-2026-18504      | v3                 | fastify vulnerable to schema validation bypass via root primitive coercion misma |
| fastify                   | moderate | CVE-2026-16732      | v3                 | fastify vulnerable to X-Forwarded-* spoofing under trustProxy hop-count          |
| fastify                   | moderate | CVE-2026-92081      | v3                 | fastify vulnerable to Denial of Service via unhandled exception on HTTP/2 traile |
| glob                      | moderate | CVE-2026-118773     | v5, v4, v1         | Glob: AbortSignal cancellation bypass allows post-timeout filesystem traversal   |
| handlebars                | moderate | CVE-2026-106444     | v5, v4             | Handlebars: JavaScript Injection via Unsafe Inline Embedding of Precompiled Temp |
| hono                      | moderate | CVE-2026-59897      | v3                 | Hono: API Gateway v1 adapter can drop a distinct repeated request header value d |
| hono                      | moderate | CVE-2026-59896      | v3                 | hono/jsx does not isolate context per request, leading to cross-request data dis |
| hono                      | moderate | CVE-2026-59895      | v3                 | Hono: Server-Side XSS via JSX Escaping Bypass in cx() Utility                    |
| hono                      | moderate | CVE-2026-69207      | v3                 | Hono: ReDoS in CORS middleware via Access-Control-Request-Headers                |
| hono                      | moderate | CVE-2026-71850      | v3                 | Hono: `memo()` retains SSR output across requests, leading to cross-user data di |
| hono                      | moderate | CVE-2026-71848      | v3                 | Hono: Algorithmic Complexity DoS in Language Middleware                          |
| hono                      | moderate | CVE-2026-84365      | v3                 | Hono: Incomplete fix for CVE-2026-39408: `toSSG()` still writes files outside th |
| hono                      | moderate | CVE-2026-84364      | v3                 | Hono: Unbounded dot-notation nesting in `parseBody()` can cause memory exhaustio |
| hono                      | moderate | CVE-2026-84363      | v3                 | Hono: Query parser reads parameters after the URL fragment, causing cache-key an |
| hono                      | moderate | CVE-2026-93981      | v3                 | hono/jsx renders plain strings unescaped in boundary components, leading to XSS  |
| hono                      | moderate | CVE-2026-111757     | v3                 | Hono: `serveStatic` decodes the request path a second time, leading to bypass of |
| ip-address                | moderate | CVE-2026-101913     | v5, v4, v3, v1     | ip-address: Address6.isLinkLocal() recognizes fe80::/64 rather than fe80::/10, a |
| ip-address                | moderate | CVE-2026-101910     | v5, v4, v3, v1     | ip-address: no classifier recognizes the NAT64 local-use range 64:ff9b:1::/48, a |
| ip-address                | moderate | CVE-2026-101912     | v5, v4, v3, v1     | ip-address: isInSubnet() and isHostInSubnet() compare addresses of different fam |
| ip-address                | moderate | CVE-2026-101911     | v5, v4, v3, v1     | ip-address: Address6 builds a parse diagnostic proportional to the input with no |
| ip-address                | moderate | CVE-2026-111997     | v5, v4, v3, v1     | ip-address: Address6 matches a zone identifier in quadratic time ahead of its le |
| ip-address                | moderate | CVE-2026-69198      | v3                 | ip-address: a CIDR suffix on the parsed address suppresses special-use classific |
| ip-address                | moderate | CVE-2026-54272      | v3                 | ip-address: misclassification of IPv4-mapped/NAT64 IPv6 addresses can bypass SSR |
| launch-editor             | moderate | CVE-2026-112943     | v1                 | launch-editor: escapeCmdArgs() omits % escaping on Windows                       |
| launch-editor             | moderate | CVE-2026-112944     | v1                 | launch-editor: Editor CLI flag misinterpretation causing arbitrary command execu |
| markdown-it               | moderate | GHSA-253c-mchw-3w2r | v3, v2, v1         | markdown-it linkify: true has two quadratic paths, so a few hundred KB of markdo |
| minimatch                 | moderate | CVE-2026-118764     | v5, v4, v1         | minimatch has potential denial of service via globparts amplification            |
| postcss                   | moderate | CVE-2026-69153      | v3                 | PostCSS: incomplete fix of GHSA-6g55-p6wh-862q — attacker-controlled sourceMappi |
| postcss-selector-parser   | moderate | CVE-2026-104844     | v1                 | PostCSS: Quadratic complexity in flat selector parsing allows CPU exhaustion     |
| protobufjs                | moderate | CVE-2026-59876      | v3                 | protobufjs: Text Format string map parsing can mutate returned map object protot |
| protobufjs                | moderate | CVE-2026-59877      | v3                 | protobufjs: Denial of Service via infinite loop in .proto option parsing         |
| qs                        | moderate | CVE-2026-8723       | v1                 | qs has a remotely triggerable DoS: qs.stringify crashes with TypeError on null/u |
| qs                        | moderate | CVE-2026-82562      | v4, v3, v2, v1     | qs array-limit bypass via bracket-key comma parsing                              |
| qs                        | moderate | CVE-2026-82417      | v4, v3, v2, v1     | qs: Denial of Service via Attacker Controlled isBuffer                           |
| qs                        | moderate | CVE-2026-110816     | v4, v3, v2, v1     | qs : qs.stringify with arrayFormat 'comma' throws an uncaught TypeError on array |
| react-router-dom          | moderate | CVE-2026-53668      | v1                 | React Router: Open redirect leading to XSS                                       |
| serialize-javascript      | moderate | CVE-2026-34043      | v1                 | Serialize JavaScript has CPU Exhaustion Denial of Service via crafted array-like |
| seroval                   | moderate | CVE-2026-116582     | v2, v1             | Seroval: Script injection through RegExp sources in serialized output            |
| vite                      | moderate | CVE-2026-112943     | v3, v2             | launch-editor: escapeCmdArgs() omits % escaping on Windows                       |
| vite                      | moderate | CVE-2026-112944     | v3, v2             | launch-editor: Editor CLI flag misinterpretation causing arbitrary command execu |
| vite                      | moderate | CVE-2026-112946     | v3, v2             | Vite: Files outside `server.fs.allow` could be served when project paths match s |
| @grpc/grpc-js             | low      | CVE-2026-101915     | v3                 | @grpc/grpc-js: The server transmits some error messages thrown by method handler |
| body-parser               | low      | CVE-2026-12590      | v3                 | body-parser vulnerable to denial of service when invalid limit value silently di |
| deepmerge                 | low      | CVE-2026-93753      | v5, v4, v3, v2, v1 | deepmerge mergeObject() allows prototype poisoning of returned objects           |
| dompurify                 | low      | GHSA-6688-9rhm-gjv2 | v1                 | DOMPurify: IN_PLACE returns a force-removed rawtext root whose text carries atta |
| dompurify                 | low      | GHSA-c6gr-qvv4-5v3f | v1                 | DOMPurify: SMIL attributeName=href guard is skipped when PARSER_MEDIA_TYPE is ap |
| fast-uri                  | low      | CVE-2026-110095     | v5, v4, v3, v1     | fast-uri vulnerable to improper path equivalence in relative reference normaliza |
| fast-uri                  | low      | CVE-2026-110725     | v5, v4, v3, v1     | fast-uri vulnerable to scheme injection via an unescaped first-segment colon in  |
| hono                      | low      | CVE-2026-71849      | v3                 | Hono: Proxy Helper does not remove response headers listed in the `Connection` h |
| markdown-it               | low      | CVE-2026-111766     | v3, v2, v1         | markdown-it: Quadratic-time denial of service in inline HTML parsing with html e |
| postcss-selector-parser   | low      | CVE-2026-9358       | v1                 | postcss-selector-parser allows denial of service through uncontrolled AST recurs |
| serialize-javascript      | low      | CVE-2026-115897     | v1                 | Serialize JavaScript: Cross-site scripting (XSS) via unescaped </script at the e |
| vite                      | low      | CVE-2026-112945     | v3, v2             | Vite: Cross origin script execution through Vite custom middleware               |

## 2. All Dependencies

### Summary

| Severity |  v5 |  v4 |  v3 |  v2 |  v1 |
| -------- | --: | --: | --: | --: | --: |
| critical |   6 |   7 |  14 |  10 |  11 |
| high     |  81 |  81 | 168 | 149 | 100 |
| moderate |  71 |  71 | 143 | 131 |  70 |
| low      |   9 |   9 |  26 |  29 |  13 |
| info     |   0 |   0 |   0 |   0 |   0 |
| unknown  |   0 |   0 |   0 |   0 |   0 |

### Vulnerabilities

| Package                                 | Severity | CVE                 | Affected Versions  | Description                                                                      |
| --------------------------------------- | -------- | ------------------- | ------------------ | -------------------------------------------------------------------------------- |
| @simple-git/argv-parser                 | critical | CVE-2026-102829     | v5, v4             | simple-git: `VISUAL` editor environment variable is omitted from unsafe editor d |
| basic-ftp                               | critical | CVE-2026-27699      | v3                 | Basic FTP has Path Traversal Vulnerability in its downloadToDir() method         |
| dompurify                               | critical | GHSA-cg2g-xh64-v4q7 | v1                 | DOMPurify SAFE_FOR_TEMPLATES bypass: split template expressions survive in attac |
| fast-xml-parser                         | critical | CVE-2026-25896      | v3, v2             | fast-xml-parser has an entity encoding bypass via regex injection in DOCTYPE ent |
| handlebars                              | critical | CVE-2026-33937      | v3, v1             | Handlebars.js has JavaScript Injection via AST Type Confusion                    |
| handlebars                              | critical | CVE-2026-106446     | v5, v4, v3, v2, v1 | Handlebars: JavaScript Injection via AST Type Confusion in compile (bypass of CV |
| handlebars                              | critical | CVE-2026-106445     | v5, v4, v3, v2, v1 | Handlebars: JavaScript Injection via Own Property Check Bypass                   |
| locutus                                 | critical | CVE-2026-32304      | v3, v2, v1         | Locutus vulnerable to RCE via unsanitized input in create_function()             |
| locutus                                 | critical | CVE-2026-25521      | v3, v1             | locutus is vulnerable to Prototype Pollution                                     |
| piscina                                 | critical | CVE-2026-102992     | v5, v4, v3, v2     | piscina: Prototype-pollution gadget in ThreadPool.options allows RCE via execArg |
| proxy-addr                              | critical | CVE-2026-90711      | v4, v3, v2, v1     | proxy-addr vulnerable to IP spoofing via IPv4-mapped IPv6 trust subnet           |
| seroval                                 | critical | CVE-2026-59940      | v3, v2, v1         | seroval: `seroval.fromJSON()` Promise resolver type confusion invokes attacker-c |
| seroval                                 | critical | CVE-2026-104846     | v3, v2, v1         | Seroval: `fromJSON()` Promise thenable assimilation invokes plugin-produced call |
| shell-quote                             | critical | CVE-2026-102422     | v5, v4, v2, v1     | shell-quote: `quote()` command injection via a line terminator in a token after  |
| shell-quote                             | critical | CVE-2026-9277       | v3                 | shell-quote quote() does not escape newlines in object .op values                |
| simple-git                              | critical | CVE-2026-102828     | v5, v4             | simple-git unsafe-operation guard does not block trailer command configuration   |
| tar                                     | critical | CVE-2026-59873      | v3, v1             | node-tar: Decompression/parse DoS via unlimited input                            |
| websocket-driver                        | critical | CVE-2026-54466      | v3, v2             | websocket-driver: Message corruption via abuse of protocol length headers        |
| @angular/common                         | high     | CVE-2025-66035      | v1                 | Angular is Vulnerable to XSRF Token Leakage via Protocol-Relative URLs in Angula |
| @angular/common                         | high     | CVE-2026-54268      | v3, v1             | @angular/common: Denial of Service (DoS) via OOM in Date Formatting (formatDate) |
| @angular/common                         | high     | CVE-2026-54266      | v3, v1             | @angular/common: Weak 32-Bit Cache Key Hashing in `HttpTransferCache` Leading to |
| @angular/common                         | high     | CVE-2026-50171      | v1                 | @angular/common: Denial of Service (DoS) via OOM in Number Formatting (digitsInf |
| @angular/common                         | high     | CVE-2026-50170      | v1                 | @angular/common: Information Leak via Default Caching of Credentialed Requests i |
| @angular/common                         | high     | CVE-2026-68945      | v3, v1             | Angular: Cache-Key Ambiguity in HttpTransferCache Leading to Cross-Request Respo |
| @angular/compiler                       | high     | CVE-2026-32635      | v1                 | Angular vulnerable to XSS in i18n attribute bindings                             |
| @angular/compiler                       | high     | CVE-2026-22610      | v1                 | Angular has XSS Vulnerability via Unsanitized SVG Script Attributes              |
| @angular/compiler                       | high     | CVE-2025-66412      | v1                 | Angular Stored XSS Vulnerability via SVG Animation, SVG URL and MathML Attribute |
| @angular/compiler                       | high     | CVE-2026-69151      | v5, v4, v3, v1     | Angular i18n: Cross-Site Scripting (XSS) via event-handler attributes            |
| @angular/core                           | high     | CVE-2026-27970      | v1                 | Angular i18n vulnerable to Cross-Site Scripting                                  |
| @angular/core                           | high     | CVE-2026-32635      | v1                 | Angular vulnerable to XSS in i18n attribute bindings                             |
| @angular/core                           | high     | CVE-2026-22610      | v1                 | Angular has XSS Vulnerability via Unsanitized SVG Script Attributes              |
| @angular/core                           | high     | CVE-2026-54267      | v5, v4, v3, v1     | Angular Client Hydration DOM Clobbering & Response-Cache Poisoning               |
| @angular/core                           | high     | CVE-2026-69151      | v5, v4, v3, v2, v1 | Angular i18n: Cross-Site Scripting (XSS) via event-handler attributes            |
| @angular/router                         | high     | CVE-2026-101896     | v3, v2             | Angular Server-Side Rendering (SSR): Denial of Service via Numeric URL Matrix Pa |
| @angular/router                         | high     | CVE-2026-111752     | v3, v2             | @angular/router: Denial of Service via Unmatched Empty-Path Outlet Route Matchin |
| @angular/router                         | high     | CVE-2026-111751     | v3, v2             | @angular/router: Denial of Service via RouterLink Query Parameter Retention in S |
| @grpc/grpc-js                           | high     | CVE-2026-101916     | v3                 | @grpc/grpc-js: In certain configurations, getAuthContext can return unauthorized |
| @hono/node-server                       | high     | CVE-2026-29087      | v2                 | @hono/node-server has authorization bypass for protected static paths via encode |
| @modelcontextprotocol/sdk               | high     | CVE-2026-104850     | v3, v2             | MCP TypeScript SDK: OAuth client could send credentials to an authorization serv |
| @modelcontextprotocol/sdk               | high     | CVE-2026-111767     | v5, v4, v3, v2     | MCP TypeScript SDK: Experimental tasks were not tied to the session that created |
| @modelcontextprotocol/sdk               | high     | CVE-2026-111768     | v5, v4, v3, v2     | MCP TypeScript SDK: One HTTP request within the default size limit could exhaust |
| @modelcontextprotocol/sdk               | high     | GHSA-f897-62hf-6gxq | v3, v2             | MCP TypeScript SDK: HTTP server transports and handlers did not limit request bo |
| @vue/server-renderer                    | high     | GHSA-g2v6-rqmx-r4w6 | v3, v2, v1         | @vue/server-renderer: XSS via missing CR in attribute-name blacklist             |
| @xmldom/xmldom                          | high     | CVE-2026-83612      | v5, v4             | xmldom: HTML raw-text closing-tag case mismatch causes output amplification      |
| @xmldom/xmldom                          | high     | CVE-2026-83606      | v5, v4             | xmldom PI grammar regex ReDoS: quadratic backtracking on unterminated processing |
| @xmldom/xmldom                          | high     | CVE-2026-83607      | v5, v4             | xmldom: Element name injection via createElement() bypasses requireWellFormed    |
| @xmldom/xmldom                          | high     | CVE-2026-83605      | v5, v4             | xmldom: Attribute name injection via setAttribute() bypasses requireWellFormed   |
| @xmldom/xmldom                          | high     | CVE-2026-83616      | v5, v4             | xmldom: Processing Instruction Target Injection Bypasses requireWellFormed       |
| @xmldom/xmldom                          | high     | CVE-2026-83608      | v5, v4             | xmldom: DocType `name` Injection Bypasses requireWellFormed                      |
| @xmldom/xmldom                          | high     | CVE-2026-83609      | v5, v4             | xmldom: Creation-time XML Name/QName validation is bypassable via an embedded li |
| @xmldom/xmldom                          | high     | CVE-2026-83618      | v5, v4             | xmldom: requireWellFormed DocType publicId/systemId validation is bypassable via |
| @xmldom/xmldom                          | high     | CVE-2026-83613      | v5, v4             | xmldom: Quadratic-time attribute deduplication                                   |
| @xmldom/xmldom                          | high     | CVE-2026-83615      | v5, v4             | xmldom: Quadratic-memory consumption                                             |
| @xmldom/xmldom                          | high     | CVE-2026-83614      | v5, v4             | xmldom: Quadratic-time parsing via the malformed-input recovery path — `parseEle |
| adm-zip                                 | high     | CVE-2026-77301      | v5, v4, v2         | adm-zip: Uncontrolled memory allocation via the declared uncompressed size (DoS) |
| adm-zip                                 | high     | GHSA-rcw4-f5rp-g42v | v5, v4, v2         | adm-zip: Decompression-bomb protection (fix for CVE-2026-39244) can be bypassed  |
| adm-zip                                 | high     | CVE-2026-102282     | v5, v4, v2         | adm-zip extraction preserves SUID/SGID bits from untrusted ZIPs -> local privile |
| adm-zip                                 | high     | GHSA-8238-w5pm-2374 | v5, v4, v2         | adm-zip: Unhandled error event in async DEFLATE decompression crashes Node.js pr |
| axios                                   | high     | CVE-2026-101903     | v5, v4, v2, v1     | Axios: ReDoS in fromDataURI data: URL parser freezes the Node event loop (DoS)   |
| axios                                   | high     | CVE-2026-101906     | v5, v4, v2, v1     | Axios: ReDoS (O(N²)) in shouldBypassProxy host normalization, reachable via untr |
| axios                                   | high     | CVE-2026-101909     | v5, v4, v2, v1     | Axios: Prototype Pollution Gadget in axios toFormData Options                    |
| axios                                   | high     | CVE-2026-101898     | v5, v4, v2, v1     | Axios: HTTP/2 adapter bypasses configured DNS lookup and proxy controls          |
| axios                                   | high     | CVE-2026-101901     | v5, v4, v2, v1     | Axios: Denial of Service via Unhandled 'error' Event in HTTP/2 ClientHttp2Sessio |
| axios                                   | high     | CVE-2026-101905     | v5, v4, v2, v1     | Axios: Node HTTP adapter prototype-pollution gadget allows request socket hijack |
| axios                                   | high     | CVE-2026-101907     | v5, v4, v2, v1     | Axios: maxRedirects: 0 is not enforced by the fetch adapter, allowing redirect-b |
| axios                                   | high     | CVE-2026-42043      | v3                 | Axios: Incomplete Fix for CVE-2025-62718 — NO_PROXY Protection Bypassed via RFC  |
| axios                                   | high     | CVE-2026-42033      | v3                 | Axios: Prototype Pollution Gadgets - Response Tampering, Data Exfiltration, and  |
| axios                                   | high     | CVE-2026-42035      | v3                 | Axios: Header Injection via Prototype Pollution                                  |
| axios                                   | high     | CVE-2026-25639      | v3                 | Axios is Vulnerable to Denial of Service via **proto** Key in mergeConfig        |
| axios                                   | high     | CVE-2026-42264      | v3                 | Axios has prototype pollution read-side gadgets in HTTP adapter that allow crede |
| axios                                   | high     | CVE-2026-44496      | v3                 | Axios: Regular Expression Denial of Service (ReDoS) via Cookie Name Injection    |
| axios                                   | high     | CVE-2026-44488      | v3                 | Allocation of Resources Without Limits or Throttling in Axios                    |
| axios                                   | high     | CVE-2026-44487      | v3                 | Axios: Proxy-Authorization Credential Leak to Origin Server Across HTTP-to-HTTPS |
| axios                                   | high     | CVE-2026-44486      | v3                 | Axios: Proxy-Authorization header leaks to redirect target when proxy is re-eval |
| axios                                   | high     | CVE-2026-44495      | v3                 | axios Vulnerable to Credential Theft and Response Hijacking via Prototype Pollut |
| axios                                   | high     | CVE-2026-44494      | v3                 | axios Vulnerable to Full Man-in-the-Middle via Prototype Pollution Gadget in `co |
| basic-ftp                               | high     | CVE-2026-102990     | v5, v4, v3, v2, v1 | basic-ftp: Quadratic-time CPU denial of service in Client.list() Unix directory- |
| basic-ftp                               | high     | GHSA-6v7q-wjvx-w8wg | v3                 | basic-ftp: Incomplete CRLF Injection Protection Allows Arbitrary FTP Command Exe |
| basic-ftp                               | high     | CVE-2026-41324      | v3                 | basic-ftp vulnerable to denial of service via unbounded memory consumption in Cl |
| basic-ftp                               | high     | CVE-2026-44240      | v3                 | basic-ftp allows a malicious FTP server to cause client-side denial of service v |
| body-parser                             | high     | CVE-2026-111181     | v5, v4, v3, v2, v1 | body-parser vulnerable to Denial of Service via trailing bytes after a compresse |
| brace-expansion                         | high     | CVE-2026-13149      | v3, v2, v1         | brace-expansion: DoS via exponential-time expansion of consecutive non-expanding |
| brace-expansion                         | high     | CVE-2026-14257      | v3, v2, v1         | brace-expansion: DoS via unbounded expansion length causing an out-of-memory pro |
| brace-expansion                         | high     | CVE-2026-69152      | v3, v2, v1         | brace-expansion: DoS via unbounded intermediate arrays, bypassing the CVE-2026-1 |
| brace-expansion                         | high     | CVE-2026-102278     | v5, v4, v3, v2, v1 | brace-expansion: DoS via uncontrolled recursion on nested brace groups causing s |
| brace-expansion                         | high     | CVE-2026-102276     | v5, v4, v3, v2, v1 | brace-expansion: DoS via uncontrolled recursion in parseCommaParts causing stack |
| braces                                  | high     | CVE-2024-4068       | v3, v2, v1         | Uncontrolled resource consumption in braces                                      |
| browserslist                            | high     | CVE-2026-73089      | v3, v2, v1         | Browserslist: Unbounded memory growth (no cache eviction) via distinct query res |
| browserslist                            | high     | CVE-2026-73088      | v3, v2, v1         | Browserslist: Uncaught crash / prototype write via untrusted browserslist-stats. |
| compression                             | high     | CVE-2026-87776      | v5, v4, v3, v2, v1 | compression vulnerable to Denial of Service via memory leak on premature respons |
| decode-uri-component                    | high     | CVE-2026-118664     | v3, v2, v1         | decode-uri-component vulnerable to denial of service via quadratic replacement o |
| deepmerge-ts                            | high     | CVE-2026-40345      | v3, v2             | DeepmergeTS has stack exhaustion when merging recursive object graphs            |
| dompurify                               | high     | GHSA-mrv2-3pqr-j5jr | v1                 | DOMPurify IN_PLACE: hook that removes a parent or sibling leaves the detached su |
| engine.io                               | high     | CVE-2026-59725      | v3, v2             | Socket.IO: Engine.IO Polling Transport Connection Exhaustion                     |
| engine.io                               | high     | CVE-2026-59724      | v3, v2             | Socket.IO: Engine.IO WebTransport SID DoS                                        |
| engine.io                               | high     | CVE-2026-102599     | v5, v4, v3, v2     | Socket.IO: Engine.IO Protocol Revision Mismatch DoS                              |
| express-rate-limit                      | high     | CVE-2026-30827      | v2                 | express-rate-limit: IPv4-mapped IPv6 addresses bypass per-client rate limiting o |
| extract-zip                             | high     | CVE-2026-56876      | v5, v4, v3, v2, v1 | extract-zip unvalidated symlink path traversal                                   |
| extract-zip                             | high     | CVE-2026-19693      | v5, v4, v3, v2, v1 | extract-zip allows arbitrary file writes through symlink archive entries         |
| fast-uri                                | high     | CVE-2026-18446      | v3, v2, v1         | fast-uri vulnerable to host confusion via backslash authority introducer         |
| fast-uri                                | high     | CVE-2026-75931      | v5, v4, v1         | fast-uri vulnerable to host confusion via skipped IDN canonicalization on scheme |
| fast-uri                                | high     | CVE-2026-75975      | v5, v4, v3, v2, v1 | fast-uri vulnerable to server-side request forgery via malformed IPv6 normalizat |
| fast-uri                                | high     | CVE-2026-75899      | v5, v4, v3, v1     | fast-uri vulnerable to server-side request forgery via repeated hostname percent |
| fast-uri                                | high     | CVE-2026-76172      | v5, v4, v3, v2, v1 | fast-uri vulnerable to host confusion via percent-encoded scheme normalization   |
| fast-uri                                | high     | CVE-2026-84292      | v5, v4, v3, v2, v1 | fast-uri vulnerable to authority injection via an unvalidated port in serialize  |
| fast-uri                                | high     | CVE-2026-16221      | v3, v2             | fast-uri vulnerable to host confusion via literal backslash authority delimiter  |
| fast-uri                                | high     | CVE-2026-6321       | v2                 | fast-uri vulnerable to path traversal via percent-encoded dot segments           |
| fast-uri                                | high     | CVE-2026-6322       | v2                 | fast-uri vulnerable to host confusion via percent-encoded authority delimiters   |
| fast-uri                                | high     | CVE-2026-13676      | v3, v2             | fast-uri vulnerable to host confusion via failed IDN canonicalization            |
| fast-xml-parser                         | high     | CVE-2026-25128      | v3, v2             | fast-xml-parser has RangeError DoS Numeric Entities Bug                          |
| fast-xml-parser                         | high     | CVE-2026-26278      | v3, v2             | fast-xml-parser affected by DoS through entity expansion in DOCTYPE (no expansio |
| fast-xml-parser                         | high     | CVE-2026-33036      | v3, v2             | fast-xml-parser affected by numeric entity expansion bypassing all entity expans |
| fastify                                 | high     | CVE-2026-84504      | v3                 | fastify vulnerable to request body replacement via an async validation result co |
| fastify                                 | high     | CVE-2026-76169      | v3                 | fastify vulnerable to authentication bypass via malformed URLs reaching encapsul |
| fastify                                 | high     | CVE-2026-84469      | v3                 | fastify vulnerable to request validation bypass via skipped boolean false schema |
| fastify                                 | high     | CVE-2026-84428      | v3                 | fastify vulnerable to header validation bypass via incomplete schema case normal |
| figlet                                  | high     | CVE-2026-96780      | v3                 | figlet is vulnerable to denial of service via unbounded loop when whitespaceBrea |
| find-my-way                             | high     | CVE-2026-47219      | v3                 | find-my-way: DDoS with HTTP2                                                     |
| flatted                                 | high     | CVE-2026-32141      | v3, v2             | flatted vulnerable to unbounded recursion DoS in parse() revive phase            |
| flatted                                 | high     | CVE-2026-33228      | v3, v2             | Prototype Pollution via parse() in NodeJS flatted                                |
| follow-redirects                        | high     | CVE-2026-111756     | v5, v4, v3, v2, v1 | follow-redirects array-form headers bypass cross-origin credential stripping     |
| follow-redirects                        | high     | CVE-2026-111755     | v5, v4, v3, v2, v1 | follow-redirects sensitiveHeaders regex escaping can expose credential headers   |
| follow-redirects                        | high     | CVE-2026-116689     | v5, v4, v3, v2, v1 | follow-redirects: Cross-realm sensitiveHeaders arrays are discarded and custom c |
| form-data                               | high     | CVE-2026-12143      | v3, v2, v1         | form-data: CRLF injection in form-data via unescaped multipart field names and f |
| handlebars                              | high     | CVE-2026-33938      | v3, v1             | Handlebars.js has JavaScript Injection via AST Type Confusion by tampering @part |
| handlebars                              | high     | CVE-2026-33940      | v3, v1             | Handlebars.js has JavaScript Injection via AST Type Confusion when passing an ob |
| handlebars                              | high     | CVE-2026-33939      | v3, v1             | Handlebars.js has Denial of Service via Malformed Decorator Syntax in Template C |
| handlebars                              | high     | CVE-2026-33941      | v3, v1             | Handlebars.js has JavaScript Injection in CLI Precompiler via Unescaped Names an |
| happy-dom                               | high     | CVE-2026-115895     | v5, v4             | Happy DOM: Incomplete fix for CVE-2026-33943: unsanitized import alias leads to  |
| happy-dom                               | high     | CVE-2026-118660     | v5, v4             | Happy DOM: SSRF via iframe and link stylesheet when parsing untrusted HTML       |
| hono                                    | high     | CVE-2026-29045      | v2                 | Hono vulnerable to arbitrary file access via serveStatic vulnerability           |
| hono                                    | high     | CVE-2026-54290      | v2                 | hono: CORS Middleware reflects any Origin with credentials when `origin` default |
| http-proxy-middleware                   | high     | CVE-2026-55603      | v3                 | http-proxy-middleware: multipart/form-data field injection via unescaped CRLF in |
| immutable                               | high     | CVE-2026-59880      | v3, v2, v1         | Immutable: Hash-collision algorithmic complexity denial of service in Immutable. |
| immutable                               | high     | CVE-2026-59879      | v3, v2, v1         | Immutable.js `List` 32-bit trie overflow → unrecoverable DoS                     |
| immutable                               | high     | CVE-2026-29063      | v2                 | Immutable is vulnerable to Prototype Pollution                                   |
| ip-address                              | high     | CVE-2026-69192      | v3, v2             | ip-address: Address4 decodes leading-zero octets as decimal while resolvers deco |
| js-yaml                                 | high     | GHSA-5p4m-2wfm-xmqj | v3, v2, v1         | JS-YAML: Quadratic CPU consumption in !!omap resolution (3.x and 4.x) — CVE-2026 |
| js-yaml                                 | high     | CVE-2026-84375      | v5, v4, v3, v2, v1 | js-yaml: maxTotalMergeKeys does not limit CPU use for empty merge sources        |
| js-yaml                                 | high     | CVE-2026-59869      | v3, v2             | js-yaml: YAML merge-key chains can force quadratic CPU consumption               |
| launch-editor                           | high     | CVE-2026-112942     | v5, v4, v3, v2, v1 | launch-editor: `fs.existsSync()` existence check can be bypassed on Windows      |
| linkify-it                              | high     | CVE-2026-59887      | v3                 | linkify-it: Quadratic-complexity DoS via the `mailto:` validator scan-loop on at |
| locutus                                 | high     | CVE-2026-29091      | v3, v2, v1         | locutus call_user_func_array vulnerable to Remote Code Execution (RCE) due to Co |
| lodash                                  | high     | CVE-2026-4800       | v3                 | lodash vulnerable to Code Injection via `_.template` imports key names           |
| lodash.pick                             | high     | CVE-2020-8203       | v2, v1             | Prototype Pollution in lodash                                                    |
| markdown-it                             | high     | CVE-2026-111759     | v3, v2, v1         | markdown-it: Quadratic complexity in smartquotes with unmatched closing quotes   |
| markdown-it                             | high     | CVE-2026-111758     | v3, v2, v1         | markdown-it: Quadratic-time rendering of a single multi-line link reference defi |
| minimatch                               | high     | CVE-2026-27903      | v3, v2, v1         | minimatch has ReDoS: matchOne() combinatorial backtracking via multiple non-adja |
| minimatch                               | high     | CVE-2026-27904      | v3, v2, v1         | minimatch ReDoS: nested *() extglobs generate catastrophically backtracking regu |
| minimatch                               | high     | CVE-2026-26996      | v3, v2             | minimatch has a ReDoS via repeated wildcards with non-matching literal in patter |
| nanoid                                  | high     | CVE-2026-67213      | v3, v1             | nanoid: custom generators can loop indefinitely when size is zero                |
| nanoid                                  | high     | CVE-2026-67214      | v3                 | nanoid: non-secure generators can loop indefinitely with negative size           |
| nanoid                                  | high     | CVE-2026-73086      | v3                 | nanoid: Integer Overflow or Wraparound                                           |
| node-forge                              | high     | CVE-2026-33896      | v2                 | Forge has a basicConstraints bypass in its certificate chain verification (RFC 5 |
| node-forge                              | high     | CVE-2026-33895      | v2                 | Forge has signature forgery in Ed25519 due to missing S > L check                |
| node-forge                              | high     | CVE-2026-33891      | v2                 | Forge has Denial of Service via Infinite Loop in BigInteger.modInverse() with Ze |
| node-forge                              | high     | CVE-2026-33894      | v2                 | Forge has signature forgery in RSA-PKCS due to ASN.1 extra field                 |
| node-forge                              | high     | CVE-2026-85393      | v2                 | node-forge RSA PKCS#1 v1.5 signature verification accepts extra nested DigestAlg |
| node-forge                              | high     | CVE-2026-118779     | v2                 | Forge: Regular expression denial of service in PEM decoding (pem.decode)         |
| node-forge                              | high     | CVE-2026-118782     | v2                 | Forge: PKCS#12 MAC forgery and constant-key PBE via zero iteration count         |
| node-forge                              | high     | CVE-2026-119188     | v2                 | Forge: Denial of service in TLS record processing via a record interleaved with  |
| node-forge                              | high     | CVE-2026-119187     | v2                 | Forge: Denial of service in TLS record processing via call stack exhaustion      |
| node-forge                              | high     | CVE-2026-119190     | v2                 | Forge: X.509 basicConstraints bypass in verifyCertificateChain() via deprecated  |
| nx                                      | high     | CVE-2026-71476      | v3, v1             | Nx: Zip-Slip in the self-hosted remote cache                                     |
| nx                                      | high     | GHSA-w2vw-w76x-qr89 | v3, v1             | Nx: OS command injection via git revisions and remote refs                       |
| nx                                      | high     | CVE-2026-104854     | v3, v2, v1         | Nx daemon and plugin worker sockets are accessible to other local users          |
| pacote                                  | high     | CVE-2026-9496       | v3, v2, v1         | pacote is vulnerable to Denial of Service (DoS) via the addGitSha function       |
| path-to-regexp                          | high     | CVE-2026-4867       | v3, v2             | path-to-regexp vulnerable to Regular Expression Denial of Service via multiple r |
| path-to-regexp                          | high     | CVE-2026-4926       | v2                 | path-to-regexp vulnerable to Denial of Service via sequential optional groups    |
| piscina                                 | high     | CVE-2026-55388      | v3                 | piscina: Prototype Pollution Gadget → RCE via inherited options.filename         |
| postcss                                 | high     | CVE-2026-45623      | v5, v4, v3, v2     | PostCSS: Arbitrary file read and information disclosure via attacker-controlled  |
| postcss                                 | high     | CVE-2026-73646      | v5, v4, v3, v2     | PostCSS: Path Traversal in Previous Source Map Auto-Loading (sourceMappingURL) l |
| react-router                            | high     | GHSA-qwww-vcr4-c8h2 | v3                 | React Router: RSC Mode CSRF Bypass Allows Action Execution Before 400 Response   |
| rollup                                  | high     | CVE-2026-27606      | v1                 | Rollup 4 has Arbitrary File Write via Path Traversal                             |
| semver                                  | high     | CVE-2022-25883      | v2                 | semver vulnerable to Regular Expression Denial of Service                        |
| serialize-javascript                    | high     | GHSA-5c6j-r48x-rmvq | v5, v4, v3, v2, v1 | Serialize JavaScript is Vulnerable to RCE via RegExp.flags and Date.prototype.to |
| seroval                                 | high     | CVE-2026-104845     | v3, v2, v1         | Seroval: Memory exhaustion via unchecked TypedArray length in JSON deserializati |
| seroval                                 | high     | CVE-2026-116581     | v3, v2, v1         | Seroval: fromJSON deserializer trusts node-supplied array length and sequence do |
| seroval                                 | high     | CVE-2026-116584     | v3, v2, v1         | Seroval `fromJSON`/`fromCrossJSON` denial of service via unvalidated array node  |
| seroval                                 | high     | CVE-2026-116580     | v3, v2, v1         | Seroval: Deserialization invokes attacker-chosen callables: AsyncIteratorFactory |
| shell-quote                             | high     | CVE-2026-13311      | v3                 | shell-quote: Quadratic-complexity Denial of Service in `parse()` (CWE-407)       |
| sigstore                                | high     | CVE-2026-48815      | v3, v2, v1         | sigstore's `certificateOIDs` verification constraints are silently dropped and n |
| simple-git                              | high     | CVE-2026-102826     | v5, v4             | simple-git allows command execution through unblocked Git configuration includes |
| simple-git                              | high     | CVE-2026-102827     | v5, v4             | simple-git: unsafe-operations plugin bypass via git long-option abbreviation (-- |
| smol-toml                               | high     | CVE-2026-85730      | v3, v2, v1         | smol-toml: Denial of Service via malformed TOML documents                        |
| socket.io-parser                        | high     | CVE-2026-33151      | v3, v2             | socket.io allows an unbounded number of binary attachments                       |
| socket.io-parser                        | high     | CVE-2026-69185      | v3, v2             | Socket.IO: Zero-attachment Memory Exhaustion                                     |
| source-map-js                           | high     | CVE-2026-93749      | v3, v2, v1         | source-map-js allows event-loop denial of service through indexed source-map sec |
| svgo                                    | high     | CVE-2026-29074      | v3, v2, v1         | SVGO DoS through entity expansion in DOCTYPE (Billion Laughs)                    |
| svgo                                    | high     | CVE-2026-73650      | v3, v2, v1         | SVGO removeScripts plugin leaves some executable scripts intact                  |
| svgo                                    | high     | CVE-2026-84370      | v5, v4, v3, v2, v1 | SVGO: removeScripts allows executable links through namespace and control-charac |
| tar                                     | high     | CVE-2026-24842      | v1                 | node-tar Vulnerable to Arbitrary File Creation/Overwrite via Hardlink Path Trave |
| tar                                     | high     | CVE-2026-23745      | v1                 | node-tar is Vulnerable to Arbitrary File Overwrite and Symlink Poisoning via Ins |
| tar                                     | high     | CVE-2026-26960      | v1                 | Arbitrary File Read/Write via Hardlink Target Escape Through Symlink Chain in no |
| tar                                     | high     | CVE-2026-29786      | v1                 | tar has Hardlink Path Traversal via Drive-Relative Linkpath                      |
| tar                                     | high     | CVE-2026-31802      | v1                 | node-tar Symlink Path Traversal via Drive-Relative Linkpath                      |
| tar                                     | high     | CVE-2026-23950      | v1                 | Race Condition in node-tar Path Reservations via Unicode Ligature Collisions on  |
| tar                                     | high     | CVE-2026-59874      | v3, v1             | node-tar: Negative tar entry size causes infinite loop in archive replace        |
| tar                                     | high     | CVE-2026-73566      | v3, v2, v1         | node-tar: Uncontrolled recursion in mapHas/filesFilter allows uncatchable stack- |
| tmp                                     | high     | CVE-2026-44705      | v3, v2             | tmp has Path Traversal via unsanitized prefix/postfix that enables directory esc |
| undici                                  | high     | CVE-2026-19534      | v5, v4, v3, v2     | undici vulnerable to Denial of Service via unrequested WebSocket subprotocol     |
| undici                                  | high     | CVE-2026-84961      | v3, v2             | undici vulnerable to TLS certificate validation bypass via dropped connect optio |
| undici                                  | high     | CVE-2026-109869     | v5, v4, v3, v2     | undici vulnerable to Denial of Service via unhandled error on excessive content- |
| undici                                  | high     | CVE-2026-109829     | v5, v4, v3, v2     | undici vulnerable to cache poisoning and cross-user disclosure via cross-origin  |
| undici                                  | high     | CVE-2026-109383     | v5, v4, v3, v2     | undici vulnerable to TLS certificate validation bypass via dropped tls options i |
| undici                                  | high     | CVE-2026-87018      | v5, v4, v3, v2     | undici vulnerable to Denial of Service via TLS 1.2 certificate-changing renegoti |
| undici                                  | high     | CVE-2026-1528       | v3                 | Undici: Malicious WebSocket 64-bit length overflows parser and crashes the clien |
| undici                                  | high     | CVE-2026-1526       | v3                 | Undici has Unbounded Memory Consumption in WebSocket permessage-deflate Decompre |
| undici                                  | high     | CVE-2026-2229       | v3                 | Undici has Unhandled Exception in WebSocket Client Due to Invalid server_max_win |
| undici                                  | high     | CVE-2026-9697       | v3                 | undici vulnerable to TLS certificate validation bypass via dropped requestTls in |
| undici                                  | high     | CVE-2026-12151      | v3                 | undici WebSocket client vulnerable to denial of service via fragment count bypas |
| undici                                  | high     | CVE-2026-6734       | v3                 | undici vulnerable to cross-origin request routing via SOCKS5 proxy pool reuse    |
| undici                                  | high     | CVE-2026-13697      | v3                 | undici vulnerable to cross-user information disclosure and parse-time crash via  |
| vite                                    | high     | CVE-2026-39364      | v1                 | Vite: `server.fs.deny` bypassed with queries                                     |
| vite                                    | high     | CVE-2026-39363      | v1                 | Vite Vulnerable to Arbitrary File Read via Vite Dev Server WebSocket             |
| vite                                    | high     | CVE-2026-112942     | v5, v4, v3, v2, v1 | launch-editor: `fs.existsSync()` existence check can be bypassed on Windows      |
| webpack-dev-middleware                  | high     | CVE-2026-76844      | v2, v1             | webpack-dev-middleware vulnerable to Path Traversal via non-slash-terminated pub |
| ws                                      | high     | CVE-2026-48779      | v3, v2, v1         | ws: Memory exhaustion DoS from tiny fragments and data chunks                    |
| zod                                     | high     | CVE-2023-54404      | v3, v2, v1         | Zod can exhaust memory while validating oversized constrained collections        |
| @angular/common                         | moderate | CVE-2026-88059      | v3, v2, v1         | Angular: Information Leak via `HttpTransferCache` Bypass When Using `withRequest |
| @angular/common                         | moderate | CVE-2026-111753     | v3, v2, v1         | @angular/common: XSRF Token Leakage via URL Parsing Discrepancy in Angular HTTP  |
| @angular/compiler                       | moderate | CVE-2026-54265      | v5, v4, v3, v1     | @angular/compiler: Two-Way Property Binding Sanitization Bypass (XSS)            |
| @angular/compiler                       | moderate | CVE-2026-50557      | v5, v4, v1         | Angular: Template and Attribute Namespace Sanitization Bypass (XSS)              |
| @angular/compiler                       | moderate | CVE-2026-88057      | v5, v4, v3, v2, v1 | Angular: Sanitization bypass via directive host bindings on concrete host elemen |
| @angular/core                           | moderate | CVE-2026-50557      | v5, v4, v1         | Angular: Template and Attribute Namespace Sanitization Bypass (XSS)              |
| @angular/core                           | moderate | CVE-2026-52725      | v5, v4, v1         | @angular/core: Angular Template and Dynamic Component Namespace Bypass leading t |
| @angular/core                           | moderate | CVE-2026-88057      | v5, v4, v3, v2, v1 | Angular: Sanitization bypass via directive host bindings on concrete host elemen |
| @hono/node-server                       | moderate | CVE-2026-39406      | v2                 | @hono/node-server: Middleware bypass via repeated slashes in serveStatic         |
| @hono/node-server                       | moderate | GHSA-frvp-7c67-39w9 | v3, v2             | Node.js Adapter for Hono: Path traversal in `serve-static` on Windows via encode |
| @hono/node-server                       | moderate | CVE-2026-118663     | v5, v4, v3         | @hono/node-server: `serveStatic` decodes the request path a second time, leading |
| @humanfs/node                           | moderate | GHSA-p498-v437-472g | v3                 | humanfs: Recursive copy follows symlinked files and copies data from outside the |
| @modelcontextprotocol/sdk               | moderate | CVE-2026-111769     | v5, v4, v3, v2     | MCP TypeScript client SDK: HTTP client transports and OAuth requests followed cr |
| @modelcontextprotocol/sdk               | moderate | CVE-2026-111771     | v5, v4, v3, v2     | MCP TypeScript SDK: Server bearer authentication accepted tokens issued for anot |
| @opentelemetry/core                     | moderate | CVE-2026-54285      | v1                 | OpenTelemetry Core: Unbounded memory allocation in W3C Baggage propagation       |
| @opentelemetry/instrumentation-knex     | moderate | CVE-2026-104872     | v1                 | Multiple @opentelemetry/instrumentation-* packages expose database username via  |
| @opentelemetry/instrumentation-mongoose | moderate | CVE-2026-104872     | v1                 | Multiple @opentelemetry/instrumentation-* packages expose database username via  |
| @opentelemetry/instrumentation-mysql    | moderate | CVE-2026-104872     | v1                 | Multiple @opentelemetry/instrumentation-* packages expose database username via  |
| @opentelemetry/instrumentation-mysql2   | moderate | CVE-2026-104872     | v1                 | Multiple @opentelemetry/instrumentation-* packages expose database username via  |
| @opentelemetry/instrumentation-pg       | moderate | CVE-2026-104872     | v1                 | Multiple @opentelemetry/instrumentation-* packages expose database username via  |
| @opentelemetry/instrumentation-tedious  | moderate | CVE-2026-104872     | v1                 | Multiple @opentelemetry/instrumentation-* packages expose database username via  |
| @sigstore/core                          | moderate | CVE-2026-48758      | v3, v2, v1         | @sigstore/core has DSSE payloadType type-binding failure                         |
| @xmldom/xmldom                          | moderate | CVE-2026-83610      | v5, v4             | xmldom: XML fragment injection via invalid EntityReference.nodeName during requi |
| @xmldom/xmldom                          | moderate | CVE-2026-83611      | v5, v4             | xmldom: Parser silently accepts a not-well-formed end tag whose name is followed |
| adm-zip                                 | moderate | CVE-2026-76845      | v5, v4, v2         | adm-zip extraction follows destination symlinks, allowing arbitrary file overwri |
| adm-zip                                 | moderate | GHSA-p634-w6r4-rjp2 | v5, v4, v2         | adm-zip: Duplicate ZIP entry names: getEntry() and extractAllTo() resolve to dif |
| adm-zip                                 | moderate | GHSA-c6fg-446q-cg94 | v5, v4, v2         | adm-zip: getDataAsync() bypasses the maxOutputLength size guard enforced by the  |
| ajv                                     | moderate | CVE-2025-69873      | v3, v2             | ajv has ReDoS when using `$data` option                                          |
| axios                                   | moderate | CVE-2026-101908     | v5, v4, v3, v2, v1 | Axios: Prototype pollution gadget in fetch adapter can alter outbound requests   |
| axios                                   | moderate | CVE-2026-101902     | v5, v4, v3, v2, v1 | Axios: Prototype-Pollution Gadget in the Default Instance Allows Inherited Objec |
| axios                                   | moderate | CVE-2026-101904     | v5, v4, v3, v2, v1 | Axios: Header Injection via Inherited headers After Minimal Interceptor          |
| axios                                   | moderate | CVE-2026-101900     | v5, v4, v3, v2, v1 | Axios: Fetch Adapter Header Injection via Inherited FormData getHeaders          |
| axios                                   | moderate | CVE-2026-101899     | v5, v4, v2, v1     | Axios: CIDR-form NO_PROXY entries are ignored, causing proxy exclusion bypass fo |
| axios                                   | moderate | CVE-2025-62718      | v3                 | Axios has a NO_PROXY Hostname Normalization Bypass that Leads to SSRF            |
| axios                                   | moderate | CVE-2026-42041      | v3                 | Axios: Authentication Bypass via Prototype Pollution Gadget in `validateStatus`  |
| axios                                   | moderate | CVE-2026-42044      | v3                 | Axios: Invisible JSON Response Tampering via Prototype Pollution Gadget in `pars |
| axios                                   | moderate | CVE-2026-42037      | v3                 | Axios: CRLF Injection in multipart/form-data body via unsanitized blob.type in f |
| axios                                   | moderate | CVE-2026-42038      | v3                 | Axios: no_proxy bypass via IP alias allows SSRF                                  |
| axios                                   | moderate | CVE-2026-42034      | v3                 | Axios' HTTP adapter-streamed uploads bypass maxBodyLength when maxRedirects: 0   |
| axios                                   | moderate | CVE-2026-42036      | v3                 | Axios: HTTP adapter streamed responses bypass maxContentLength                   |
| axios                                   | moderate | CVE-2026-42042      | v3                 | Axios: XSRF Token Cross-Origin Leakage via Prototype Pollution Gadget in `withXS |
| axios                                   | moderate | CVE-2026-40175      | v3                 | Axios has Unrestricted Cloud Metadata Exfiltration via Header Injection Chain    |
| axios                                   | moderate | CVE-2026-42039      | v3                 | Axios: unbounded recursion in toFormData causes DoS via deeply nested request da |
| axios                                   | moderate | CVE-2026-44490      | v3                 | axios has DoS & Header Injection via Prototype Pollution Read-Side Gadgets in ax |
| axios                                   | moderate | CVE-2026-67316      | v3                 | Axios: Prototype pollution gadgets can alter axios request construction          |
| axios                                   | moderate | CVE-2026-67312      | v3                 | Axios: Deep formToJSON Key Recursion Can Cause Denial of Service                 |
| axios                                   | moderate | CVE-2026-67319      | v3                 | Axios: Nested axios option objects can consume polluted prototype values         |
| axios                                   | moderate | CVE-2026-67317      | v3                 | Axios: Fetch adapter `ReadableStream` uploads bypass `maxBodyLength`             |
| axios                                   | moderate | CVE-2026-67313      | v3                 | Axios: Excessive recursion in formDataToJSON can cause denial of service         |
| baseline-browser-mapping                | moderate | CVE-2026-45819      | v3, v1             | baseline-browser-mapping process termination on invalid input causes denial of s |
| brace-expansion                         | moderate | CVE-2026-45149      | v3, v2, v1         | brace-expansion: Large numeric range defeats documented `max` DoS protection     |
| brace-expansion                         | moderate | CVE-2026-102277     | v5, v4, v3, v2, v1 | brace-expansion: Quadratic-time expansion of the `{a},b}` rewrite causes CPU den |
| brace-expansion                         | moderate | CVE-2026-33750      | v3, v2             | brace-expansion: Zero-step sequence causes process hang and memory exhaustion    |
| colord                                  | moderate | CVE-2026-85062      | v3, v2, v1         | Colord: Slow rejection of oversized malformed color strings                      |
| decode-uri-component                    | moderate | CVE-2026-45822      | v3, v2, v1         | decode-uri-component: Denial of service via exponential decoding of malformed pe |
| dompurify                               | moderate | GHSA-55q2-fjhq-7xh7 | v1                 | DOMPurify: IN_PLACE hook removal leaves a detached subtree executable, causing X |
| ejs                                     | moderate | CVE-2024-33883      | v2                 | ejs lacks certain pollution protection                                           |
| esbuild                                 | moderate | GHSA-67mh-4wv8-2f99 | v2                 | esbuild enables any website to send any requests to the development server and r |
| fast-uri                                | moderate | CVE-2026-86472      | v5, v4, v3, v2, v1 | fast-uri vulnerable to inconsistent host case normalization via percent-encoded  |
| fast-uri                                | moderate | CVE-2026-110306     | v5, v4, v3, v2, v1 | fast-uri vulnerable to URI scheme spoofing via percent-encoded scheme decoding   |
| fast-uri                                | moderate | CVE-2026-110180     | v5, v4, v1         | fast-uri vulnerable to host confusion via unchecked WHATWG host canonicalization |
| fast-xml-parser                         | moderate | CVE-2026-33349      | v3, v2             | Entity Expansion Limits Bypassed When Set to Zero Due to JavaScript Falsy Evalua |
| fast-xml-parser                         | moderate | CVE-2026-41650      | v3, v2             | fast-xml-parser XMLBuilder: XML Comment and CDATA Injection via Unescaped Delimi |
| fastify                                 | moderate | CVE-2026-18504      | v3                 | fastify vulnerable to schema validation bypass via root primitive coercion misma |
| fastify                                 | moderate | CVE-2026-16732      | v3                 | fastify vulnerable to X-Forwarded-* spoofing under trustProxy hop-count          |
| fastify                                 | moderate | CVE-2026-92081      | v3                 | fastify vulnerable to Denial of Service via unhandled exception on HTTP/2 traile |
| file-type                               | moderate | CVE-2026-31808      | v5, v4             | file-type affected by infinite loop in ASF parser on malformed input with zero-s |
| glob                                    | moderate | CVE-2026-118773     | v5, v4, v3, v2, v1 | Glob: AbortSignal cancellation bypass allows post-timeout filesystem traversal   |
| handlebars                              | moderate | CVE-2026-33916      | v3, v1             | Handlebars.js has Prototype Pollution Leading to XSS through Partial Template In |
| handlebars                              | moderate | GHSA-7rx3-28cr-v5wh | v3, v1             | Handlebars.js has a Prototype Method Access Control Gap via Missing __lookupSett |
| handlebars                              | moderate | CVE-2026-106444     | v5, v4, v3, v2, v1 | Handlebars: JavaScript Injection via Unsafe Inline Embedding of Precompiled Temp |
| hono                                    | moderate | CVE-2026-29086      | v2                 | Hono Vulnerable to Cookie Attribute Injection via Unsanitized domain and path in |
| hono                                    | moderate | CVE-2026-29085      | v2                 | Hono Vulnerable to SSE Control Field Injection via CR/LF in writeSSE()           |
| hono                                    | moderate | CVE-2026-39410      | v2                 | Hono: Non-breaking space prefix bypass in cookie name handling in getCookie()    |
| hono                                    | moderate | CVE-2026-39408      | v2                 | Hono: Path traversal in toSSG() allows writing files outside the output director |
| hono                                    | moderate | CVE-2026-39407      | v2                 | Hono: Middleware bypass via repeated slashes in serveStatic                      |
| hono                                    | moderate | CVE-2026-39409      | v2                 | Hono has incorrect IP matching in ipRestriction() for IPv4-mapped IPv6 addresses |
| hono                                    | moderate | CVE-2026-44458      | v2                 | Hono has CSS Declaration Injection via Style Object Values in JSX SSR            |
| hono                                    | moderate | CVE-2026-44457      | v2                 | Hono's Cache Middleware ignores Vary: Authorization / Vary: Cookie leading to cr |
| hono                                    | moderate | CVE-2026-44456      | v2                 | Hono: bodyLimit() can be bypassed for chunked / unknown-length requests          |
| hono                                    | moderate | CVE-2026-44455      | v2                 | hono/jsx has Unvalidated JSX Tag Names that May Allow HTML Injection             |
| hono                                    | moderate | CVE-2026-47674      | v2                 | Hono: IP Restriction bypasses static deny rules for non-canonical IPv6           |
| hono                                    | moderate | CVE-2026-47675      | v2                 | Hono: Cookie helper does not sanitize sameSite and priority, allowing Set-Cookie |
| hono                                    | moderate | CVE-2026-47673      | v2                 | Hono: JWT middleware accepts any Authorization scheme, not only Bearer           |
| hono                                    | moderate | CVE-2026-47676      | v2                 | Hono: app.mount() strips mount prefix using undecoded path, causing incorrect ro |
| hono                                    | moderate | CVE-2026-56761      | v2                 | hono Improperly Handles JSX Attribute Names Allows HTML Injection in hono/jsx SS |
| hono                                    | moderate | CVE-2026-54288      | v2                 | hono: Body Limit Middleware can be bypassed on AWS Lambda by understating `Conte |
| hono                                    | moderate | CVE-2026-54289      | v2                 | hono: Lambda@Edge adapter keeps only the last value of a repeated request header |
| hono                                    | moderate | CVE-2026-54286      | v2                 | hono: Path traversal in `serve-static` on Windows via encoded backslash (`%5C`)  |
| hono                                    | moderate | CVE-2026-54287      | v2                 | hono: AWS Lambda adapter merges multiple `Set-Cookie` headers into one value, dr |
| hono                                    | moderate | CVE-2026-59897      | v3, v2             | Hono: API Gateway v1 adapter can drop a distinct repeated request header value d |
| hono                                    | moderate | CVE-2026-59895      | v3, v2             | Hono: Server-Side XSS via JSX Escaping Bypass in cx() Utility                    |
| hono                                    | moderate | CVE-2026-69207      | v3, v2             | Hono: ReDoS in CORS middleware via Access-Control-Request-Headers                |
| hono                                    | moderate | CVE-2026-71850      | v3, v2             | Hono: `memo()` retains SSR output across requests, leading to cross-user data di |
| hono                                    | moderate | CVE-2026-84365      | v3, v2             | Hono: Incomplete fix for CVE-2026-39408: `toSSG()` still writes files outside th |
| hono                                    | moderate | CVE-2026-84364      | v3, v2             | Hono: Unbounded dot-notation nesting in `parseBody()` can cause memory exhaustio |
| hono                                    | moderate | CVE-2026-84363      | v3, v2             | Hono: Query parser reads parameters after the URL fragment, causing cache-key an |
| hono                                    | moderate | CVE-2026-56762      | v2                 | Hono missing validation of cookie name on write path in setCookie()              |
| hono                                    | moderate | CVE-2026-93981      | v3, v2             | hono/jsx renders plain strings unescaped in boundary components, leading to XSS  |
| hono                                    | moderate | CVE-2026-56763      | v2                 | Hono vulnerable to Prototype Pollution possible through **proto** key allowed in |
| hono                                    | moderate | CVE-2026-59896      | v3                 | hono/jsx does not isolate context per request, leading to cross-request data dis |
| hono                                    | moderate | CVE-2026-71848      | v3                 | Hono: Algorithmic Complexity DoS in Language Middleware                          |
| hono                                    | moderate | CVE-2026-111757     | v3                 | Hono: `serveStatic` decodes the request path a second time, leading to bypass of |
| http-proxy-middleware                   | moderate | CVE-2026-55602      | v3, v2             | http-proxy-middleware `router` host+path substring matching allows Host-header-d |
| ip-address                              | moderate | CVE-2026-101913     | v5, v4, v3, v2, v1 | ip-address: Address6.isLinkLocal() recognizes fe80::/64 rather than fe80::/10, a |
| ip-address                              | moderate | CVE-2026-101910     | v5, v4, v3, v1     | ip-address: no classifier recognizes the NAT64 local-use range 64:ff9b:1::/48, a |
| ip-address                              | moderate | CVE-2026-101912     | v5, v4, v3, v2, v1 | ip-address: isInSubnet() and isHostInSubnet() compare addresses of different fam |
| ip-address                              | moderate | CVE-2026-101911     | v5, v4, v3, v2, v1 | ip-address: Address6 builds a parse diagnostic proportional to the input with no |
| ip-address                              | moderate | CVE-2026-111997     | v5, v4, v3, v2, v1 | ip-address: Address6 matches a zone identifier in quadratic time ahead of its le |
| ip-address                              | moderate | CVE-2026-42338      | v2                 | ip-address has XSS in Address6 HTML-emitting methods                             |
| ip-address                              | moderate | CVE-2026-69198      | v3                 | ip-address: a CIDR suffix on the parsed address suppresses special-use classific |
| ip-address                              | moderate | CVE-2026-54272      | v3                 | ip-address: misclassification of IPv4-mapped/NAT64 IPv6 addresses can bypass SSR |
| js-yaml                                 | moderate | CVE-2025-64718      | v2                 | js-yaml has prototype pollution in merge (<<)                                    |
| js-yaml                                 | moderate | CVE-2026-53550      | v3, v2             | JS-YAML: Quadratic-complexity DoS in merge key handling via repeated aliases     |
| launch-editor                           | moderate | CVE-2026-112943     | v5, v4, v3, v2, v1 | launch-editor: escapeCmdArgs() omits % escaping on Windows                       |
| launch-editor                           | moderate | CVE-2026-112944     | v5, v4, v3, v2, v1 | launch-editor: Editor CLI flag misinterpretation causing arbitrary command execu |
| launch-editor                           | moderate | CVE-2026-53632      | v3, v2             | launch-editor: NTLMv2 hash disclosure via UNC path handling on Windows           |
| locutus                                 | moderate | CVE-2026-33993      | v3, v2, v1         | Locutus has Prototype Pollution via **proto** Key Injection in unserialize()     |
| locutus                                 | moderate | CVE-2026-33994      | v2                 | Locutus Prototype Pollution due to incomplete fix for CVE-2026-25521             |
| lodash                                  | moderate | CVE-2026-2950       | v3                 | lodash vulnerable to Prototype Pollution via array path bypass in `_.unset` and  |
| markdown-it                             | moderate | GHSA-253c-mchw-3w2r | v3, v2, v1         | markdown-it linkify: true has two quadratic paths, so a few hundred KB of markdo |
| micromatch                              | moderate | CVE-2024-4067       | v3, v2, v1         | Regular Expression Denial of Service (ReDoS) in micromatch                       |
| minimatch                               | moderate | CVE-2026-118764     | v5, v4, v3, v2, v1 | minimatch has potential denial of service via globparts amplification            |
| node-forge                              | moderate | CVE-2026-118777     | v2                 | Forge: Prototype Pollution in forge.http cookie handling via a malicious Set-Coo |
| node-forge                              | moderate | CVE-2026-118778     | v2                 | Forge: TLS client crash when the server sends no certificate                     |
| node-forge                              | moderate | CVE-2026-119186     | v2                 | Forge: AES-GCM authentication bypass via unvalidated tagLength option            |
| nx                                      | moderate | CVE-2026-54753      | v3, v1             | `nx graph` dev server permissive CORS policy                                     |
| nx                                      | moderate | CVE-2026-104853     | v3, v2, v1         | Nx: Path traversal in nx migrate package-migrations extraction                   |
| path-to-regexp                          | moderate | CVE-2026-4923       | v2                 | path-to-regexp vulnerable to Regular Expression Denial of Service via multiple w |
| postcss                                 | moderate | CVE-2026-41305      | v5, v4, v3, v2     | PostCSS has XSS via Unescaped </style> in its CSS Stringify Output               |
| postcss                                 | moderate | CVE-2026-69153      | v5, v4, v3, v2     | PostCSS: incomplete fix of GHSA-6g55-p6wh-862q — attacker-controlled sourceMappi |
| postcss-selector-parser                 | moderate | CVE-2026-104844     | v5, v4, v3, v2, v1 | PostCSS: Quadratic complexity in flat selector parsing allows CPU exhaustion     |
| protobufjs                              | moderate | CVE-2026-59876      | v3                 | protobufjs: Text Format string map parsing can mutate returned map object protot |
| protobufjs                              | moderate | CVE-2026-59877      | v3                 | protobufjs: Denial of Service via infinite loop in .proto option parsing         |
| qs                                      | moderate | CVE-2026-8723       | v3, v2, v1         | qs has a remotely triggerable DoS: qs.stringify crashes with TypeError on null/u |
| qs                                      | moderate | CVE-2026-82562      | v5, v4, v3, v2, v1 | qs array-limit bypass via bracket-key comma parsing                              |
| qs                                      | moderate | CVE-2026-82417      | v5, v4, v3, v2, v1 | qs: Denial of Service via Attacker Controlled isBuffer                           |
| qs                                      | moderate | CVE-2026-110816     | v5, v4, v3, v2, v1 | qs : qs.stringify with arrayFormat 'comma' throws an uncaught TypeError on array |
| qs                                      | moderate | CVE-2025-15284      | v2                 | qs's arrayLimit bypass in its bracket notation allows DoS via memory exhaustion  |
| react-router-dom                        | moderate | CVE-2026-53668      | v1                 | React Router: Open redirect leading to XSS                                       |
| serialize-javascript                    | moderate | CVE-2026-34043      | v5, v4, v3, v2, v1 | Serialize JavaScript has CPU Exhaustion Denial of Service via crafted array-like |
| serialize-javascript                    | moderate | CVE-2024-11831      | v2                 | Cross-site Scripting (XSS) in serialize-javascript                               |
| seroval                                 | moderate | CVE-2026-116582     | v5, v4, v2, v1     | Seroval: Script injection through RegExp sources in serialized output            |
| seroval                                 | moderate | CVE-2026-116583     | v5, v4             | Seroval: Code injection through a typed array's own constructor property         |
| smol-toml                               | moderate | GHSA-v3rj-xjv7-4jmq | v3, v1             | smol-toml: Denial of Service via TOML documents containing thousands of consecut |
| smol-toml                               | moderate | GHSA-r4xh-jqrq-34v2 | v3, v2, v1         | smol-toml: Quadratic-time parse() from parseKey rescanning to end of document on |
| svgo                                    | moderate | CVE-2026-84369      | v5, v4, v3, v2, v1 | SVGO: removeScripts incompletely sanitizes executable HTML in SVG foreignObject  |
| tar                                     | moderate | CVE-2026-53655      | v3, v1             | node-tar applies PAX size override to intermediary GNU long-name/long-link heade |
| tar                                     | moderate | CVE-2026-59871      | v3, v1             | node-tar: Process crash via PAX numeric path type confusion                      |
| tar                                     | moderate | CVE-2026-59875      | v3, v1             | node-tar: Uncaught Exception DoS via NUL byte in PAX path/linkpath records       |
| undici                                  | moderate | CVE-2026-85024      | v5, v4, v2         | undici vulnerable to Denial of Service via unhandled error in WebSocket permessa |
| undici                                  | moderate | CVE-2026-18149      | v3, v2             | undici vulnerable to Denial of Service via orphaned RetryHandler response body   |
| undici                                  | moderate | CVE-2026-84890      | v3, v2             | undici vulnerable to Denial of Service via unbounded decompression of compressed |
| undici                                  | moderate | CVE-2026-84933      | v3, v2             | undici vulnerable to cross-user cookie disclosure via Set-Cookie caching in shar |
| undici                                  | moderate | CVE-2026-85014      | v3, v2             | undici vulnerable to Denial of Service via WebSocketStream unclean close         |
| undici                                  | moderate | CVE-2026-109924     | v5, v4, v3, v2     | undici vulnerable to Denial of Service via unbounded memory in the EventSource p |
| undici                                  | moderate | CVE-2026-109841     | v5, v4, v3, v2     | undici vulnerable to Subresource Integrity bypass via non-lowercase algorithm to |
| undici                                  | moderate | CVE-2026-109932     | v5, v4, v3, v2     | undici WebSocket client vulnerable to Denial of Service via unbounded automatic  |
| undici                                  | moderate | CVE-2026-87029      | v5, v4, v3, v2     | undici vulnerable to Denial of Service via unhandled exception in the decompress |
| undici                                  | moderate | CVE-2026-1525       | v3                 | Undici has an HTTP Request/Response Smuggling issue                              |
| undici                                  | moderate | CVE-2026-1527       | v3                 | Undici has CRLF Injection in undici via `upgrade` option                         |
| undici                                  | moderate | CVE-2026-9679       | v3                 | undici vulnerable to HTTP header injection via Set-Cookie percent-decoding       |
| undici                                  | moderate | CVE-2026-9678       | v3                 | undici vulnerable to cross-user information disclosure via shared cache whitespa |
| undici                                  | moderate | CVE-2026-16728      | v3                 | undici vulnerable to downstream response desynchronization via retry interceptor |
| undici                                  | moderate | CVE-2026-15157      | v3                 | undici vulnerable to CRLF Injection via blob-like body 'type' property           |
| undici                                  | moderate | CVE-2026-14643      | v3                 | undici vulnerable to cross-user information disclosure via whitespace around equ |
| undici                                  | moderate | CVE-2026-16729      | v3                 | undici vulnerable to cookie attribute injection via unsanitized domain and unpar |
| uuid                                    | moderate | CVE-2026-41907      | v5, v4, v3, v2     | uuid: Missing buffer bounds check in v3/v5/v6 when buf is provided               |
| vite                                    | moderate | CVE-2026-39365      | v1                 | Vite Vulnerable to Path Traversal in Optimized Deps `.map` Handling              |
| vite                                    | moderate | CVE-2026-53632      | v3, v1             | launch-editor: NTLMv2 hash disclosure via UNC path handling on Windows           |
| vite                                    | moderate | CVE-2026-112943     | v5, v4, v3, v2, v1 | launch-editor: escapeCmdArgs() omits % escaping on Windows                       |
| vite                                    | moderate | CVE-2026-112944     | v5, v4, v3, v2, v1 | launch-editor: Editor CLI flag misinterpretation causing arbitrary command execu |
| vite                                    | moderate | CVE-2026-112946     | v5, v4, v3, v2, v1 | Vite: Files outside `server.fs.allow` could be served when project paths match s |
| vite                                    | moderate | CVE-2026-53571      | v3, v1             | vite: `server.fs.deny` bypass on Windows alternate paths                         |
| vite                                    | moderate | CVE-2026-112947     | v2                 | Vite: First 4 bytes of files outside of `server.fs` setting is exposed by `?vite |
| webpack                                 | moderate | CVE-2024-43788      | v2                 | Webpack's AutoPublicPathRuntimeModule has a DOM Clobbering Gadget that leads to  |
| webpack-dev-server                      | moderate | CVE-2025-30360      | v2                 | webpack-dev-server users' source code may be stolen when they access a malicious |
| webpack-dev-server                      | moderate | CVE-2025-30359      | v2                 | webpack-dev-server users' source code may be stolen when they access a malicious |
| webpack-dev-server                      | moderate | CVE-2026-6402       | v2                 | webpack-dev-server vulnerable to cross-origin source code exposure on non-HTTPS  |
| webpack-dev-server                      | moderate | CVE-2026-9595       | v2                 | webpack-dev-server vulnerable to HMR WebSocket interception via permissive user  |
| webpack-dev-server                      | moderate | CVE-2026-14620      | v3, v2             | webpack-dev-server vulnerable to cross-site request forgery via internal develop |
| webpack-dev-server                      | moderate | CVE-2026-14631      | v3, v2             | webpack-dev-server vulnerable to denial of service via a malformed Host or Origi |
| websocket-driver                        | moderate | CVE-2026-54490      | v3, v2             | websocket-driver: Resource limit bypass via message compression                  |
| ws                                      | moderate | CVE-2026-45736      | v3, v2             | ws: Uninitialized memory disclosure                                              |
| yaml                                    | moderate | CVE-2026-33532      | v3, v2, v1         | yaml is vulnerable to Stack Overflow via deeply nested YAML collections          |
| @babel/core                             | low      | CVE-2026-49356      | v3, v2, v1         | @babel/core: Arbitrary File Read via sourceMappingURL Comment                    |
| @grpc/grpc-js                           | low      | CVE-2026-101915     | v3                 | @grpc/grpc-js: The server transmits some error messages thrown by method handler |
| @tootallnate/once                       | low      | CVE-2026-3449       | v3, v2, v1         | @tootallnate/once vulnerable to Incorrect Control Flow Scoping                   |
| axios                                   | low      | CVE-2026-42040      | v3                 | Axios: Null Byte Injection via Reverse-Encoding in AxiosURLSearchParams          |
| body-parser                             | low      | CVE-2026-12590      | v3, v2             | body-parser vulnerable to denial of service when invalid limit value silently di |
| deepmerge                               | low      | CVE-2026-93753      | v5, v4, v3, v2, v1 | deepmerge mergeObject() allows prototype poisoning of returned objects           |
| diff                                    | low      | CVE-2026-24001      | v5, v4, v3, v2     | jsdiff has a Denial of Service vulnerability in parsePatch and applyPatch        |
| dompurify                               | low      | GHSA-6688-9rhm-gjv2 | v1                 | DOMPurify: IN_PLACE returns a force-removed rawtext root whose text carries atta |
| dompurify                               | low      | GHSA-c6gr-qvv4-5v3f | v1                 | DOMPurify: SMIL attributeName=href guard is skipped when PARSER_MEDIA_TYPE is ap |
| fast-uri                                | low      | CVE-2026-110095     | v5, v4, v3, v2, v1 | fast-uri vulnerable to improper path equivalence in relative reference normaliza |
| fast-uri                                | low      | CVE-2026-110725     | v5, v4, v3, v2, v1 | fast-uri vulnerable to scheme injection via an unescaped first-segment colon in  |
| fast-xml-parser                         | low      | CVE-2026-27942      | v3, v2             | fast-xml-parser has stack overflow in XMLBuilder with preserveOrder              |
| handlebars                              | low      | GHSA-442j-39wm-28r2 | v3, v1             | Handlebars.js has a Property Access Validation Bypass in container.lookup        |
| hono                                    | low      | GHSA-gq3j-xvxp-8hrf | v2                 | Hono added timing comparison hardening in basicAuth and bearerAuth               |
| hono                                    | low      | CVE-2026-44459      | v2                 | Hono has improper validation of NumericDate claims (exp, nbf, iat) in JWT verify |
| hono                                    | low      | CVE-2026-71849      | v3, v2             | Hono: Proxy Helper does not remove response headers listed in the `Connection` h |
| markdown-it                             | low      | CVE-2026-111766     | v3, v2, v1         | markdown-it: Quadratic-time denial of service in inline HTML parsing with html e |
| node-forge                              | low      | CVE-2026-118775     | v2                 | Forge: ASN.1 OID first arc truncation in asn1.oidToDer                           |
| node-forge                              | low      | CVE-2026-118781     | v2                 | Forge: Denial of Service via infinite loop in BigInteger.modInverse() with negat |
| node-forge                              | low      | CVE-2026-118780     | v2                 | Forge: verifyCertificateChain() removes trusted CA certificates with the same su |
| postcss-selector-parser                 | low      | CVE-2026-9358       | v3, v2, v1         | postcss-selector-parser allows denial of service through uncontrolled AST recurs |
| qs                                      | low      | CVE-2026-2391       | v2                 | qs's arrayLimit bypass in comma parsing allows denial of service                 |
| serialize-javascript                    | low      | CVE-2026-115897     | v5, v4, v3, v2, v1 | Serialize JavaScript: Cross-site scripting (XSS) via unescaped </script at the e |
| undici                                  | low      | CVE-2026-18540      | v5, v4, v3, v2     | undici vulnerable to downstream response splitting via retry interceptor         |
| undici                                  | low      | CVE-2026-84947      | v3, v2             | undici vulnerable to response truncation via oversized chunked responses in the  |
| undici                                  | low      | CVE-2026-85008      | v3, v2             | undici vulnerable to caching and replay of unsafe HTTP method responses          |
| undici                                  | low      | CVE-2026-11525      | v3                 | undici vulnerable to Set-Cookie SameSite attribute downgrade via permissive subs |
| undici                                  | low      | CVE-2026-6733       | v3                 | undici vulnerable to HTTP response queue poisoning via keep-alive socket reuse   |
| vite                                    | low      | CVE-2026-112945     | v5, v4, v3, v2, v1 | Vite: Cross origin script execution through Vite custom middleware               |
| webpack                                 | low      | CVE-2025-68458      | v2                 | webpack buildHttp: allowedUris allow-list bypass via URL userinfo (@) leading to |
| webpack                                 | low      | CVE-2025-68157      | v2                 | webpack buildHttp HttpUriPlugin allowedUris bypass via HTTP redirects → SSRF + c |
