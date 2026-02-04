# CVE Overview

Date: 2026-02-04

> For more security information, see [SECURITY.md](./SECURITY.md)

## 1. Production Dependencies

<<<<<<< Updated upstream
| Severity | v4 | v3 | v2 | v1 |
| --- | ---: | ---: | ---: | ---: |
| critical | 0 | 0 | 0 | 1 |
| high | 0 | 0 | 0 | 25 |
| moderate | 0 | 0 | 0 | 18 |
| low | 0 | 0 | 0 | 10 |
| info | 0 | 0 | 0 | 0 |
| unknown | 0 | 0 | 0 | 0 |
=======
| Severity |  v4 |  v3 |  v2 |  v1 |
| -------- | --: | --: | --: | --: |
| critical |   0 |   0 |   0 |   1 |
| high     |   0 |   0 |   0 |  25 |
| moderate |   0 |   0 |   0 |  19 |
| low      |   0 |   0 |   0 |  10 |
| info     |   0 |   0 |   0 |   0 |
| unknown  |   0 |   0 |   0 |   0 |
>>>>>>> Stashed changes

## 2. All Dependencies

<<<<<<< Updated upstream
| Severity | v4 | v3 | v2 | v1 |
| --- | ---: | ---: | ---: | ---: |
| critical | 2 | 1 | 2 | 3 |
| high | 6 | 6 | 10 | 38 |
| moderate | 1 | 1 | 13 | 31 |
| low | 1 | 1 | 2 | 13 |
| info | 0 | 0 | 0 | 0 |
| unknown | 0 | 0 | 0 | 0 |

## 3. All Security Vulnerabilities (Unique)

| Package | Severity | CVE | Affected Versions | Description |
| --- | --- | --- | --- | --- |
| @isaacs/brace-expansion | critical | GHSA-7h2j-956f-4vf2 | v4, v2 | @isaacs/brace-expansion has Uncontrolled Resource Consumption |
| form-data | critical | CVE-2025-7783 | v1 | form-data uses unsafe random function in form-data for choosing boundary |
| locutus | critical | CVE-2026-25521 | v4, v3, v2, v1 | locutus is vulnerable to Prototype Pollution |
| @angular/common | high | CVE-2025-66035 | v1 | Angular is Vulnerable to XSRF Token Leakage via Protocol-Relative URLs in Angula |
| @angular/compiler | high | CVE-2025-66412 | v1 | Angular Stored XSS Vulnerability via SVG Animation, SVG URL and MathML Attribute |
| @angular/compiler | high | CVE-2026-22610 | v1 | Angular has XSS Vulnerability via Unsanitized SVG Script Attributes |
| @angular/core | high | CVE-2026-22610 | v1 | Angular has XSS Vulnerability via Unsanitized SVG Script Attributes |
| @remix-run/router | high | CVE-2026-22029 | v1 | React Router vulnerable to XSS via Open Redirects |
| axios | high | CVE-2025-27152 | v1 | axios Requests Vulnerable To Possible SSRF and Credential Leakage via Absolute U |
| axios | high | CVE-2025-58754 | v1 | Axios is vulnerable to DoS attack through lack of data size check |
| body-parser | high | CVE-2024-45590 | v1 | body-parser vulnerable to denial of service when url encoding is enabled |
| braces | high | CVE-2024-4068 | v4, v3, v2, v1 | Uncontrolled resource consumption in braces |
| cross-spawn | high | CVE-2024-21538 | v1 | Regular Expression Denial of Service (ReDoS) in cross-spawn |
| fast-xml-parser | high | CVE-2026-25128 | v4, v3, v2 | fast-xml-parser has RangeError DoS Numeric Entities Bug |
| glob | high | CVE-2025-64756 | v1 | glob CLI: Command injection via -c/--cmd executes matches with shell:true |
| hono | high | CVE-2026-22818 | v2 | Hono JWK Auth Middleware has JWT algorithm confusion when JWK lacks "alg" (untru |
| hono | high | CVE-2026-22817 | v2 | Hono JWT Middleware's JWT Algorithm Confusion via Unsafe Default (HS256) Allows  |
| http-proxy-middleware | high | CVE-2024-21536 | v1 | Denial of service in http-proxy-middleware |
| lodash.pick | high | CVE-2020-8203 | v2, v1 | Prototype Pollution in lodash |
| node-forge | high | CVE-2025-66031 | v1 | node-forge has ASN.1 Unbounded Recursion |
| node-forge | high | CVE-2025-12816 | v1 | node-forge has an Interpretation Conflict vulnerability via its ASN.1 Validator  |
| path-to-regexp | high | CVE-2024-45296 | v1 | path-to-regexp outputs backtracking regular expressions |
| path-to-regexp | high | CVE-2024-52798 | v1 | path-to-regexp contains a ReDoS |
| playwright | high | CVE-2025-59288 | v1 | Playwright downloads and installs browsers without verifying the authenticity of |
| qs | high | CVE-2025-15284 | v4, v3, v2, v1 | qs's arrayLimit bypass in its bracket notation allows DoS via memory exhaustion |
| rollup | high | CVE-2024-47068 | v1 | DOM Clobbering Gadget found in rollup bundled scripts that leads to XSS |
| semver | high | CVE-2022-25883 | v2, v1 | semver vulnerable to Regular Expression Denial of Service |
| seroval | high | CVE-2026-23957 | v1 | Seroval affected by Denial of Service via Array serialization |
| seroval | high | CVE-2026-23956 | v1 | seroval affected by Denial of Service via RegExp serialization |
| seroval | high | CVE-2026-23737 | v1 | seroval Affected by Remote Code Execution via JSON Deserialization |
| seroval | high | CVE-2026-23736 | v1 | seroval Affected by Prototype Pollution via JSON Deserialization |
| seroval | high | CVE-2026-24006 | v1 | Seroval affected by Denial of Service via Deeply Nested Objects |
| solid-js | high | CVE-2025-27109 | v1 | Solid Lacks Escaping of HTML in JSX Fragments allows for Cross-Site Scripting (X |
| tar | high | CVE-2026-23745 | v4, v3, v2, v1 | node-tar is Vulnerable to Arbitrary File Overwrite and Symlink Poisoning via Ins |
| tar | high | CVE-2026-23950 | v4, v3, v2, v1 | Race Condition in node-tar Path Reservations via Unicode Ligature Collisions on  |
| tar | high | CVE-2026-24842 | v4, v3, v2, v1 | node-tar Vulnerable to Arbitrary File Creation/Overwrite via Hardlink Path Trave |
| tar-fs | high | CVE-2025-59343 | v1 | tar-fs has a symlink validation bypass if destination directory is predictable w |
| tar-fs | high | CVE-2025-48387 | v1 | tar-fs can extract outside the specified dir with a specific tarball |
| tar-fs | high | CVE-2024-12905 | v1 | tar-fs Vulnerable to Link Following and Path Traversal via Extracting a Crafted  |
| @babel/helpers | moderate | CVE-2025-27789 | v1 | Babel has inefficient RegExp complexity in generated code with .replace when tra |
| @babel/runtime | moderate | CVE-2025-27789 | v1 | Babel has inefficient RegExp complexity in generated code with .replace when tra |
| @octokit/plugin-paginate-rest | moderate | CVE-2025-25288 | v1 | @octokit/plugin-paginate-rest has a Regular Expression in iterator Leads to ReDo |
| @octokit/request | moderate | CVE-2025-25290 | v1 | @octokit/request has a Regular Expression in fetchWrapper that Leads to ReDoS Vu |
| @octokit/request-error | moderate | CVE-2025-25289 | v1 | @octokit/request-error has a Regular Expression in index that Leads to ReDoS Vul |
| ejs | moderate | CVE-2024-33883 | v2, v1 | ejs lacks certain pollution protection |
| esbuild | moderate | GHSA-67mh-4wv8-2f99 | v2, v1 | esbuild enables any website to send any requests to the development server and r |
| hono | moderate | CVE-2026-24771 | v2 | Hono vulnerable to XSS through ErrorBoundary component  |
| hono | moderate | CVE-2026-24473 | v2 | Hono has an Arbitrary Key Read in Serve static Middleware (Cloudflare Workers Ad |
| hono | moderate | CVE-2026-24472 | v2 | Hono cache middleware ignores "Cache-Control: private" leading to Web Cache Dece |
| hono | moderate | CVE-2026-24398 | v2 | Hono IPv4 address validation bypass in IP Restriction Middleware allows IP spoof |
| http-proxy-middleware | moderate | CVE-2025-32997 | v1 | http-proxy-middleware allows fixRequestBody to proceed even if bodyParser has fa |
| http-proxy-middleware | moderate | CVE-2025-32996 | v1 | http-proxy-middleware can call writeBody twice because "else if" is not used |
| js-yaml | moderate | CVE-2025-64718 | v2, v1 | js-yaml has prototype pollution in merge (<<) |
| lodash | moderate | CVE-2025-13465 | v1 | Lodash has Prototype Pollution Vulnerability in `_.unset` and `_.omit` functions |
| lodash-es | moderate | CVE-2025-13465 | v1 | Lodash has Prototype Pollution Vulnerability in `_.unset` and `_.omit` functions |
| micromatch | moderate | CVE-2024-4067 | v4, v3, v2, v1 | Regular Expression Denial of Service (ReDoS) in micromatch |
| nanoid | moderate | CVE-2024-55565 | v2, v1 | Predictable results in nanoid generation when given non-integer values |
| node-forge | moderate | CVE-2025-66030 | v1 | node-forge is vulnerable to ASN.1 OID Integer Truncation |
| react-router | moderate | CVE-2025-68470 | v1 | React Router has unexpected external redirect via untrusted paths |
| serialize-javascript | moderate | CVE-2024-11831 | v2, v1 | Cross-site Scripting (XSS) in serialize-javascript |
| smol-toml | moderate | GHSA-pqhp-25j4-6hq9 | v1 | smol-toml has a Denial of Service via malicious TOML document using deeply neste |
| vite | moderate | CVE-2024-45812 | v1 | Vite DOM Clobbering gadget found in vite bundled scripts that leads to XSS |
| vite | moderate | CVE-2024-45811 | v1 | Vite's `server.fs.deny` is bypassed when using `?import&raw` |
| vite | moderate | CVE-2025-24010 | v1 | Websites were able to send any requests to the development server and read the r |
| vite | moderate | CVE-2025-30208 | v1 | Vite bypasses server.fs.deny when using ?raw?? |
| vite | moderate | CVE-2025-32395 | v1 | Vite has an `server.fs.deny` bypass with an invalid `request-target` |
| vite | moderate | CVE-2025-46565 | v1 | Vite's server.fs.deny bypassed with /. for files under project root |
| vite | moderate | CVE-2025-31486 | v1 | Vite allows server.fs.deny to be bypassed with .svg or relative paths |
| vite | moderate | CVE-2025-62522 | v1 | vite allows server.fs.deny bypass via backslash on Windows |
| vite | moderate | CVE-2025-31125 | v1 | Vite has a `server.fs.deny` bypassed for `inline` and `raw` with `?import` query |
| webpack | moderate | CVE-2024-43788 | v2, v1 | Webpack's AutoPublicPathRuntimeModule has a DOM Clobbering Gadget that leads to  |
| webpack-dev-server | moderate | CVE-2025-30360 | v2, v1 | webpack-dev-server users' source code may be stolen when they access a malicious |
| webpack-dev-server | moderate | CVE-2025-30359 | v2, v1 | webpack-dev-server users' source code may be stolen when they access a malicious |
| brace-expansion | low | CVE-2025-5889 | v1 | brace-expansion Regular Expression Denial of Service vulnerability |
| cookie | low | CVE-2024-47764 | v1 | cookie accepts cookie name, path, and domain with out of bounds characters |
| diff | low | CVE-2026-24001 | v4, v3, v2, v1 | jsdiff has a Denial of Service vulnerability in parsePatch and applyPatch |
| express | low | CVE-2024-43796 | v1 | express vulnerable to XSS via response.redirect() |
| min-document | low | CVE-2025-57352 | v1 | min-document vulnerable to prototype pollution |
| on-headers | low | CVE-2025-7339 | v1 | on-headers is vulnerable to http response header manipulation |
| send | low | CVE-2024-43799 | v1 | send vulnerable to template injection that can lead to XSS |
| serve-static | low | CVE-2024-43800 | v1 | serve-static vulnerable to template injection that can lead to XSS |
| tmp | low | CVE-2025-54798 | v1 | tmp allows arbitrary temporary file / directory write via symbolic link `dir` pa |
| vite | low | CVE-2025-58751 | v1 | Vite middleware may serve files starting with the same name with the public dire |
| vite | low | CVE-2025-58752 | v1 | Vite's `server.fs` settings were not applied to HTML files |

=======
| Severity |  v4 |  v3 |  v2 |  v1 |
| -------- | --: | --: | --: | --: |
| critical |   0 |   0 |   0 |   2 |
| high     |   6 |   6 |  10 |  38 |
| moderate |   2 |   2 |  14 |  32 |
| low      |   1 |   1 |   2 |  13 |
| info     |   0 |   0 |   0 |   0 |
| unknown  |   0 |   0 |   0 |   0 |

## 3. All Security Vulnerabilities (Unique)

| Package                       | Severity | CVE                 | Affected Versions | Description                                                                      |
| ----------------------------- | -------- | ------------------- | ----------------- | -------------------------------------------------------------------------------- |
| form-data                     | critical | CVE-2025-7783       | v1                | form-data uses unsafe random function in form-data for choosing boundary         |
| @angular/common               | high     | CVE-2025-66035      | v1                | Angular is Vulnerable to XSRF Token Leakage via Protocol-Relative URLs in Angula |
| @angular/compiler             | high     | CVE-2025-66412      | v1                | Angular Stored XSS Vulnerability via SVG Animation, SVG URL and MathML Attribute |
| @angular/compiler             | high     | CVE-2026-22610      | v1                | Angular has XSS Vulnerability via Unsanitized SVG Script Attributes              |
| @angular/core                 | high     | CVE-2026-22610      | v1                | Angular has XSS Vulnerability via Unsanitized SVG Script Attributes              |
| @remix-run/router             | high     | CVE-2026-22029      | v1                | React Router vulnerable to XSS via Open Redirects                                |
| axios                         | high     | CVE-2025-27152      | v1                | axios Requests Vulnerable To Possible SSRF and Credential Leakage via Absolute U |
| axios                         | high     | CVE-2025-58754      | v1                | Axios is vulnerable to DoS attack through lack of data size check                |
| body-parser                   | high     | CVE-2024-45590      | v1                | body-parser vulnerable to denial of service when url encoding is enabled         |
| braces                        | high     | CVE-2024-4068       | v4, v3, v2, v1    | Uncontrolled resource consumption in braces                                      |
| cross-spawn                   | high     | CVE-2024-21538      | v1                | Regular Expression Denial of Service (ReDoS) in cross-spawn                      |
| fast-xml-parser               | high     | CVE-2026-25128      | v4, v3, v2        | fast-xml-parser has RangeError DoS Numeric Entities Bug                          |
| glob                          | high     | CVE-2025-64756      | v1                | glob CLI: Command injection via -c/--cmd executes matches with shell:true        |
| hono                          | high     | CVE-2026-22818      | v2                | Hono JWK Auth Middleware has JWT algorithm confusion when JWK lacks "alg" (untru |
| hono                          | high     | CVE-2026-22817      | v2                | Hono JWT Middleware's JWT Algorithm Confusion via Unsafe Default (HS256) Allows  |
| http-proxy-middleware         | high     | CVE-2024-21536      | v1                | Denial of service in http-proxy-middleware                                       |
| lodash.pick                   | high     | CVE-2020-8203       | v2, v1            | Prototype Pollution in lodash                                                    |
| node-forge                    | high     | CVE-2025-66031      | v1                | node-forge has ASN.1 Unbounded Recursion                                         |
| node-forge                    | high     | CVE-2025-12816      | v1                | node-forge has an Interpretation Conflict vulnerability via its ASN.1 Validator  |
| path-to-regexp                | high     | CVE-2024-45296      | v1                | path-to-regexp outputs backtracking regular expressions                          |
| path-to-regexp                | high     | CVE-2024-52798      | v1                | path-to-regexp contains a ReDoS                                                  |
| playwright                    | high     | CVE-2025-59288      | v1                | Playwright downloads and installs browsers without verifying the authenticity of |
| qs                            | high     | CVE-2025-15284      | v4, v3, v2, v1    | qs's arrayLimit bypass in its bracket notation allows DoS via memory exhaustion  |
| rollup                        | high     | CVE-2024-47068      | v1                | DOM Clobbering Gadget found in rollup bundled scripts that leads to XSS          |
| semver                        | high     | CVE-2022-25883      | v2, v1            | semver vulnerable to Regular Expression Denial of Service                        |
| seroval                       | high     | CVE-2026-23957      | v1                | Seroval affected by Denial of Service via Array serialization                    |
| seroval                       | high     | CVE-2026-23956      | v1                | seroval affected by Denial of Service via RegExp serialization                   |
| seroval                       | high     | CVE-2026-23737      | v1                | seroval Affected by Remote Code Execution via JSON Deserialization               |
| seroval                       | high     | CVE-2026-23736      | v1                | seroval Affected by Prototype Pollution via JSON Deserialization                 |
| seroval                       | high     | CVE-2026-24006      | v1                | Seroval affected by Denial of Service via Deeply Nested Objects                  |
| solid-js                      | high     | CVE-2025-27109      | v1                | Solid Lacks Escaping of HTML in JSX Fragments allows for Cross-Site Scripting (X |
| tar                           | high     | CVE-2026-23745      | v4, v3, v2, v1    | node-tar is Vulnerable to Arbitrary File Overwrite and Symlink Poisoning via Ins |
| tar                           | high     | CVE-2026-23950      | v4, v3, v2, v1    | Race Condition in node-tar Path Reservations via Unicode Ligature Collisions on  |
| tar                           | high     | CVE-2026-24842      | v4, v3, v2, v1    | node-tar Vulnerable to Arbitrary File Creation/Overwrite via Hardlink Path Trave |
| tar-fs                        | high     | CVE-2025-59343      | v1                | tar-fs has a symlink validation bypass if destination directory is predictable w |
| tar-fs                        | high     | CVE-2025-48387      | v1                | tar-fs can extract outside the specified dir with a specific tarball             |
| tar-fs                        | high     | CVE-2024-12905      | v1                | tar-fs Vulnerable to Link Following and Path Traversal via Extracting a Crafted  |
| @babel/helpers                | moderate | CVE-2025-27789      | v1                | Babel has inefficient RegExp complexity in generated code with .replace when tra |
| @babel/runtime                | moderate | CVE-2025-27789      | v1                | Babel has inefficient RegExp complexity in generated code with .replace when tra |
| @octokit/plugin-paginate-rest | moderate | CVE-2025-25288      | v1                | @octokit/plugin-paginate-rest has a Regular Expression in iterator Leads to ReDo |
| @octokit/request              | moderate | CVE-2025-25290      | v1                | @octokit/request has a Regular Expression in fetchWrapper that Leads to ReDoS Vu |
| @octokit/request-error        | moderate | CVE-2025-25289      | v1                | @octokit/request-error has a Regular Expression in index that Leads to ReDoS Vul |
| ejs                           | moderate | CVE-2024-33883      | v2, v1            | ejs lacks certain pollution protection                                           |
| esbuild                       | moderate | GHSA-67mh-4wv8-2f99 | v2, v1            | esbuild enables any website to send any requests to the development server and r |
| eslint                        | moderate | CVE-2025-50537      | v4, v3, v2, v1    | eslint has a Stack Overflow when serializing objects with circular references    |
| hono                          | moderate | CVE-2026-24771      | v2                | Hono vulnerable to XSS through ErrorBoundary component                           |
| hono                          | moderate | CVE-2026-24473      | v2                | Hono has an Arbitrary Key Read in Serve static Middleware (Cloudflare Workers Ad |
| hono                          | moderate | CVE-2026-24472      | v2                | Hono cache middleware ignores "Cache-Control: private" leading to Web Cache Dece |
| hono                          | moderate | CVE-2026-24398      | v2                | Hono IPv4 address validation bypass in IP Restriction Middleware allows IP spoof |
| http-proxy-middleware         | moderate | CVE-2025-32997      | v1                | http-proxy-middleware allows fixRequestBody to proceed even if bodyParser has fa |
| http-proxy-middleware         | moderate | CVE-2025-32996      | v1                | http-proxy-middleware can call writeBody twice because "else if" is not used     |
| js-yaml                       | moderate | CVE-2025-64718      | v2, v1            | js-yaml has prototype pollution in merge (<<)                                    |
| lodash                        | moderate | CVE-2025-13465      | v1                | Lodash has Prototype Pollution Vulnerability in `_.unset` and `_.omit` functions |
| lodash-es                     | moderate | CVE-2025-13465      | v1                | Lodash has Prototype Pollution Vulnerability in `_.unset` and `_.omit` functions |
| micromatch                    | moderate | CVE-2024-4067       | v4, v3, v2, v1    | Regular Expression Denial of Service (ReDoS) in micromatch                       |
| nanoid                        | moderate | CVE-2024-55565      | v2, v1            | Predictable results in nanoid generation when given non-integer values           |
| node-forge                    | moderate | CVE-2025-66030      | v1                | node-forge is vulnerable to ASN.1 OID Integer Truncation                         |
| react-router                  | moderate | CVE-2025-68470      | v1                | React Router has unexpected external redirect via untrusted paths                |
| serialize-javascript          | moderate | CVE-2024-11831      | v2, v1            | Cross-site Scripting (XSS) in serialize-javascript                               |
| smol-toml                     | moderate | GHSA-pqhp-25j4-6hq9 | v1                | smol-toml has a Denial of Service via malicious TOML document using deeply neste |
| vite                          | moderate | CVE-2024-45812      | v1                | Vite DOM Clobbering gadget found in vite bundled scripts that leads to XSS       |
| vite                          | moderate | CVE-2024-45811      | v1                | Vite's `server.fs.deny` is bypassed when using `?import&raw`                     |
| vite                          | moderate | CVE-2025-24010      | v1                | Websites were able to send any requests to the development server and read the r |
| vite                          | moderate | CVE-2025-30208      | v1                | Vite bypasses server.fs.deny when using ?raw??                                   |
| vite                          | moderate | CVE-2025-32395      | v1                | Vite has an `server.fs.deny` bypass with an invalid `request-target`             |
| vite                          | moderate | CVE-2025-46565      | v1                | Vite's server.fs.deny bypassed with /. for files under project root              |
| vite                          | moderate | CVE-2025-31486      | v1                | Vite allows server.fs.deny to be bypassed with .svg or relative paths            |
| vite                          | moderate | CVE-2025-62522      | v1                | vite allows server.fs.deny bypass via backslash on Windows                       |
| vite                          | moderate | CVE-2025-31125      | v1                | Vite has a `server.fs.deny` bypassed for `inline` and `raw` with `?import` query |
| webpack                       | moderate | CVE-2024-43788      | v2, v1            | Webpack's AutoPublicPathRuntimeModule has a DOM Clobbering Gadget that leads to  |
| webpack-dev-server            | moderate | CVE-2025-30360      | v2, v1            | webpack-dev-server users' source code may be stolen when they access a malicious |
| webpack-dev-server            | moderate | CVE-2025-30359      | v2, v1            | webpack-dev-server users' source code may be stolen when they access a malicious |
| brace-expansion               | low      | CVE-2025-5889       | v1                | brace-expansion Regular Expression Denial of Service vulnerability               |
| cookie                        | low      | CVE-2024-47764      | v1                | cookie accepts cookie name, path, and domain with out of bounds characters       |
| diff                          | low      | CVE-2026-24001      | v4, v3, v2, v1    | jsdiff has a Denial of Service vulnerability in parsePatch and applyPatch        |
| express                       | low      | CVE-2024-43796      | v1                | express vulnerable to XSS via response.redirect()                                |
| min-document                  | low      | CVE-2025-57352      | v1                | min-document vulnerable to prototype pollution                                   |
| on-headers                    | low      | CVE-2025-7339       | v1                | on-headers is vulnerable to http response header manipulation                    |
| send                          | low      | CVE-2024-43799      | v1                | send vulnerable to template injection that can lead to XSS                       |
| serve-static                  | low      | CVE-2024-43800      | v1                | serve-static vulnerable to template injection that can lead to XSS               |
| tmp                           | low      | CVE-2025-54798      | v1                | tmp allows arbitrary temporary file / directory write via symbolic link `dir` pa |
| vite                          | low      | CVE-2025-58751      | v1                | Vite middleware may serve files starting with the same name with the public dire |
| vite                          | low      | CVE-2025-58752      | v1                | Vite's `server.fs` settings were not applied to HTML files                       |
>>>>>>> Stashed changes
