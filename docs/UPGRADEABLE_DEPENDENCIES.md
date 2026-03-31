# Upgradeable Dependencies — Major Versions Available

**Analysis Date:** 2026-03-31  
**Scope:** Root package.json + all packages in `packages/*/`  
**Method:** npm-check-updates with `--target greatest`

---

## 🔴 Critical (Breaking Changes – Manual Work Required)

### 1. **@stencil/core** | 4.38.3 → 4.43.3 (patch) / 5.0.0-next.0 (major)

- **Status:** v5 is in pre-release (next channel), v4.43.3 is latest stable
- **Breaking Changes:**
  - v5.0.0-next.0 is not production-ready (next channel)
  - Multiple output-target packages block v5 upgrade:
    - @public-ui/stencil-angular-output-target
    - @public-ui/stencil-react-output-target
    - @public-ui/stencil-solid-output-target
    - @public-ui/stencil-vue-output-target
  - @stencil/playwright requires >=4.13.0, conflicts with 5.x
- **Risk:** VERY HIGH – Core platform dependency
- **Recommendation:** Stay on v4.43.3 until v5 is stable and output-targets are compatible
- **Effort:** Would require coordinating 4+ downstream packages

### 2. **eslint** | 9.39.4 → 10.1.0

- **Breaking Changes:**
  - Legacy `.eslintrc.json` configuration is no longer supported; must migrate to flat config (`eslint.config.js`)
  - Node.js < v20.19.0 no longer supported
  - Config file lookup now starts from linted file's directory (beneficial for monorepos)
  - Formatter output depends on Node.js native `styleText()` API
  - NO_COLOR and NODE_DISABLE_COLORS environment variables now affect color output
  - FlatESLint and LegacyESLint deprecated APIs removed
  - JSX reference tracking improved (may affect scope-dependent rules)
- **Peer Dependencies:** Requires @eslint/js ^10.0.0 and eslint-plugin-jsx-a11y compatibility
- **Config Changes:** Must convert `.eslintrc.json` to `eslint.config.js` (tool available: `eslint --init`)
- **Risk:** HIGH – Affects all linting configuration
- **Effort:** MEDIUM – Config migration required but automation tools available
- **Roadmap:** [Migrate to v10.x](https://eslint.org/docs/latest/use/migrate-to-10.0.0)

### 3. **jest** | 26.6.3 → 30.3.0

- **Breaking Changes:**
  - Node.js 14, 16, 19, 21 no longer supported (require >=18.x, >=20.x)
  - Minimum TypeScript now 5.4+
  - jest-environment-jsdom upgraded from jsdom 21 → jsdom 26 (spec compliance changes)
  - Mocking `window.location` behavior may change
  - Deprecated alias methods removed (e.g., `toBeTruthy()` aliases)
  - Non-enumerable object properties excluded from matchers by default
  - `jest.mock()` now case-sensitive (affects Windows edge cases)
  - `jest.genMockFromModule()` removed (use `jest.createMockFromModule()`)
  - `--testPathPattern` renamed to `--testPathPatterns`
  - Performance: Real-world speedups from optimizations
- **Risk:** HIGH – Core testing framework with wide breaking surface
- **Effort:** MEDIUM → HIGH – Will require test review and fixes
- **Migration:** [Jest 30 Migration Guide](https://jestjs.io/docs/upgrading-to-jest30)

### 4. **TypeScript** | 5.9.3 → 6.0.2

- **Breaking Changes:**
  - `moduleResolution: classic` removed (only nodenext, bundler supported)
  - AMD, UMD, SystemJS modules removed (ESM only)
  - `esModuleInterop` and `allowSyntheticDefaultImports` cannot be set to false
  - `target: es5` deprecated; minimum ES2015
  - All code treated as strict mode (automatic "use strict" emission)
- **Config Migration:** Migration CLI available: `npx @andrewbranch/ts5to6`
- **Impact:** May be low if tsconfig.json is explicit and uses modern settings
- **Peer:** @stencil-community/eslint-plugin requires ^4.9.4 || ^5.0.0 (blocks 6.0+)
- **Risk:** MEDIUM – Language compiler fundamental shift
- **Effort:** LOW → MEDIUM – Config migration mostly automatic
- **Roadmap:** [TypeScript 5.x to 6.0 Migration Guide](https://gist.github.com/privatenumber/3d2e80da28f84ee30b77d53e1693378f)

### 5. **@angular/core** | 19.2.20 → 22.0.0-next.5 (Angular v19, v20, v21 adapters)

- **Packages Affected:**
  - `/packages/adapters/angular/v19/`: 19.2.20 → 22.0.0-next.5
  - `/packages/adapters/angular/v20/`: 20.3.18 → 22.0.0-next.5
  - `/packages/adapters/angular/v21/`: 21.2.6 → 22.0.0-next.5
- **Breaking Changes (v20+):**
  - Node.js >=22.22.0 required (v24.13.1+) – v20 no longer supported
  - TypeScript >=5.8 required
  - Zoneless applications now stable (Zone.js side effects deprecated)
  - Ivy strict mode enabled by default
  - ViewEngine completely removed
  - NgModules support deprecated in favor of standalone components
- **Complexity:** Enterprise applications can take weeks to migrate
- **Related:** Also affects @angular/compiler, @angular/compiler-cli, zone.js, @angular/common
- **Risk:** VERY HIGH – Multi-framework adapter dependencies
- **Effort:** HIGH – Complete architectural review needed
- **Roadmap:** [Angular Update Guide](https://angular.dev/update-guide)

---

## 🟡 High (Test-Intensive Upgrades)

### 1. **jest** (component package) | 26.6.3 → 30.3.0

- **Location:** `/packages/components/`
- **Risk:** Same as critical jest (see above), but scoped to component tests
- **Effort:** MEDIUM
- **Testing:** All component unit tests must run and pass

### 2. **@types/jest** | 26.0.24 → 30.0.0

- **Breaking:** TypeScript types for jest@30 (follows jest breaking changes)
- **Dependency:** Must upgrade together with jest
- **Risk:** MEDIUM
- **Effort:** LOW – Automatic with jest upgrade

### 3. **knip** | 5.88.1 → 6.1.0 (components, stylelint-rules)

- **Breaking Changes:**
  - Node.js <v20.19.0 no longer supported
  - Issue type `classMembers` removed
  - `--include-libs` and `--isolate-workspaces` flags removed (now default)
  - `--experimental-tags` renamed to `--tags`
  - `issues.files` structure changes in reporters
  - `issues._files` removed
  - Root files removed
- **Packages:** tools/stylelint-rules, components
- **Risk:** MEDIUM – Unused-code detection configuration changes
- **Effort:** LOW → MEDIUM – Config review needed
- **Roadmap:** [knip v6 Releases](https://github.com/webpro-nl/knip/releases)

### 4. **@types/color-convert** | 2.0.4 → 3.0.1 + **color-rgba** | 2.4.0 → 3.0.0

- **Location:** `/packages/components/`
- **Breaking Changes:** Major version bump on color-rgba (internal API changes likely)
- **Risk:** MEDIUM – Type definitions and color processing
- **Effort:** LOW – Likely compatible
- **Notes:** These are typically non-breaking for consumers

### 5. **@typescript-eslint/eslint-plugin** & **@typescript-eslint/parser** | 8.57.2 → 8.58.0 (patch)

- **Note:** ncu shows 8.58.1-alpha.0 as "greatest" but 8.58.0 is stable latest
- **Peer:** @stencil-community/eslint-plugin requires ^7.0.0 || ^8.0.0
- **Risk:** LOW
- **Effort:** LOW – Patch upgrade

### 6. **cssnano** | 7.1.3 → 7.1.4

- **Risk:** LOW – Patch-level CSS minifier
- **Effort:** LOW

### 7. **postcss-sorting** | 9.1.0 → 10.0.0

- **Location:** `/packages/components/`
- **Breaking Changes:** Likely minor API changes (changelog not specific in v9→v10)
- **Risk:** MEDIUM – CSS property ordering configuration
- **Effort:** LOW → MEDIUM
- **Roadmap:** [postcss-sorting CHANGELOG](https://github.com/hudochenkov/postcss-sorting/blob/master/CHANGELOG.md)

### 8. **mocha** | 11.7.5 → 12.0.0-beta-9

- **Status:** Beta release only
- **Breaking:** Likely breaking changes in beta
- **Risk:** MEDIUM
- **Effort:** MEDIUM – Wait for stable v12.0.0 release
- **Recommendation:** Defer until stable release

### 9. **cpy-cli** | 6.0.0 → 7.0.0 (themes package)

- **Breaking:** Major file copy utility version
- **Risk:** MEDIUM – Copy script behavior changes likely
- **Effort:** LOW → MEDIUM
- **Testing:** Verify theme build output

---

## 🟢 Low (Safe Upgrades)

### 1. **@eslint/js** | 9.39.4 → 10.0.1 (themes, stylelint-rules, components)

- **Peer Dependency:** Requires eslint ^10.0.0 (blocks eslint upgrade dependency)
- **Risk:** LOW – Language rule sets
- **Effort:** LOW
- **Upgrade Path:** Do together with eslint v10.0.0

### 2. **minimatch** | 10.2.4 → 10.2.5 (React, Vue, Svelte, Angular v19/v20/v21)

- **Type:** Patch-level glob matching utility
- **Risk:** VERY LOW
- **Effort:** TRIVIAL

### 3. **rollup** | 4.60.0 → 4.60.1 (themes)

- **Type:** Patch-level bundler
- **Risk:** VERY LOW
- **Effort:** TRIVIAL

### 4. **npm-run-all2** | 8.0.4 → 8.1.0-beta.0 (root)

- **Note:** Beta version only
- **Risk:** LOW (beta)
- **Recommendation:** Wait for stable 8.1.0

### 5. **stylelint-order** | 7.0.1 → 8.1.1 (root)

- **Type:** CSS plugin
- **Risk:** LOW – Property ordering
- **Effort:** LOW

### 6. **svelte** | ^5.55.0 → ^5.55.1 (svelte adapter)

- **Type:** Patch-level framework
- **Risk:** VERY LOW
- **Effort:** TRIVIAL

### 7. **@babel/types** | 7.29.0 → 8.0.0-rc.3 (Vue, Svelte adapters)

- **Status:** Release candidate
- **Risk:** MEDIUM (RC stage)
- **Effort:** LOW
- **Recommendation:** Wait for stable 8.0.0 release

### 8. **zone.js** | 0.15.1 → 0.16.1 (Angular adapters v19-v21)

- **Type:** Angular zone management
- **Dependency:** Follows Angular major versions
- **Risk:** LOW (if upgrading Angular)
- **Effort:** LOW

---

## Summary

### Upgrade Statistics

| Category                          | Count   | Total Packages Affected      |
| --------------------------------- | ------- | ---------------------------- |
| 🔴 Critical                       | 5       | 9 packages (with variations) |
| 🟡 High                           | 9       | 7 unique packages            |
| 🟢 Low                            | 8       | 15 unique packages           |
| **Total Unique Upgradeable Deps** | **~22** | **Across entire monorepo**   |

### Critical Blockers & Interdependencies

```
1. @stencil/core@5 BLOCKED by:
   - @public-ui/stencil-angular-output-target (requires >=4)
   - @public-ui/stencil-react-output-target (requires >=4)
   - @public-ui/stencil-solid-output-target (requires >=2.17.2)
   - @public-ui/stencil-vue-output-target (requires >=4)
   - @stencil/playwright (requires >=4.13.0)
   ACTION: Keep on v4.43.3 until output-targets are v5-compatible

2. eslint@10.0.0 blocks:
   - @stencil-community/eslint-plugin (requires ^8.0.0 || ^9.0.0)
   - eslint-plugin-jsx-a11y (requires ^8.0.0 || ^9.0.0)
   ACTION: Coordinate multi-package eslint migration

3. prettier@3.8.1 blocked by:
   - prettier-plugin-organize-imports (requires >=2.0)
   ACTION: prettier@4.0.0-alpha.13 incompatible; stay on v3

4. TypeScript@6.0.2 blocked by:
   - @stencil-community/eslint-plugin (requires ^4.9.4 || ^5.0.0)
   ACTION: Stay on TypeScript 5.x for now

5. Angular@22 (next.5) not stable:
   - v20: Angular-specific adapters only
   - Migration complex: weeks for enterprise apps
   ACTION: Keep Angular adapters on current major versions
```

### Recommended Upgrade Priority

#### Phase 1 (Immediate – Low Risk)

- ✅ minimatch (10.2.4 → 10.2.5) — patch only
- ✅ rollup (4.60.0 → 4.60.1) — patch only
- ✅ stylelint-order (7.0.1 → 8.1.1) — CSS plugin
- ✅ cssnano (7.1.3 → 7.1.4) — patch only

#### Phase 2 (Short-term – High Effort)

- ⚠️ jest@30 + @types/jest@30 — test suite migration (2-5 days)
  - Scoped start: `/packages/components/` component tests
  - Follow with root/adapters test suites
- ⚠️ eslint@10 + @eslint/js@10 — config migration (1-3 days)
  - Convert `.eslintrc.json` → `eslint.config.js`
  - Test all lint rules
  - Update CI/CD pipelines

#### Phase 3 (Medium-term – Coordinate)

- ⚠️ TypeScript@6 — only after reviewing @stencil-community/eslint-plugin compatibility
- ⚠️ knip@6 — unused-code detection, config review (0.5-1 day)

#### Phase 4 (Blocked – Wait for Stable)

- ❌ prettier@4.0.0-alpha → keep v3 until stable (blocked by prettier-plugin-organize-imports)
- ❌ @stencil/core@5 → wait for output-target compatibility
- ❌ Angular@22 → stay on v19/v20/v21 adapter versions (production-critical)
- ❌ mocha@12, @babel/types@8 → wait for stable releases (beta only)

### Estimated Overall Effort

| Phase                      | Effort        | Timeline      | Risk        |
| -------------------------- | ------------- | ------------- | ----------- |
| Phase 1                    | LOW           | 0.5-1 hour    | VERY LOW    |
| Phase 2                    | HIGH          | 3-5 days      | MEDIUM-HIGH |
| Phase 3                    | MEDIUM        | 1-2 days      | MEDIUM      |
| Phase 4                    | BLOCKED       | N/A           | BLOCKED     |
| **Total (if all applied)** | **VERY HIGH** | **2-3 weeks** | **HIGH**    |

---

## Research Sources

- [Migrate to ESLint v10.x](https://eslint.org/docs/latest/use/migrate-to-10.0.0)
- [Jest 30 Migration Guide](https://jestjs.io/docs/upgrading-to-jest30)
- [TypeScript 5.x to 6.0 Migration Guide](https://gist.github.com/privatenumber/3d2e80da28f84ee30b77d53e1693378f)
- [Angular Update Guide](https://angular.dev/update-guide)
- [Knip v6 Releases](https://github.com/webpro-nl/knip/releases)
- [Stencil Releases](https://github.com/ionic-team/stencil/releases)
- [postcss-sorting CHANGELOG](https://github.com/hudochenkov/postcss-sorting/blob/master/CHANGELOG.md)
