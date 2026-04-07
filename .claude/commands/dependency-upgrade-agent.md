# Dependency Upgrade Agent

**Version:** 1.0  
**Created:** 2026-03-31  
**Purpose:** Automate dependency upgrades with risk assessment and phased rollout

---

## Overview

This agent orchestrates dependency upgrades across the pnpm monorepo. It:

1. **Audits** all package.json files for upgradeable dependencies
2. **Categorizes** by risk (Critical/High/Low)
3. **Executes** phases in sequence (Low → High → Blocked)
4. **Reports** breaking changes and migration effort
5. **Tracks** progress in `UPGRADEABLE_DEPENDENCIES.md`

---

## Execution Flow

### Phase 1: Quick Win (Low-Risk Patches)

```bash
# ✅ No configuration changes, no tests required

# Step 1: Update root package.json
ncu --filter "minimatch|stylelint-order|cssnano" -u

# Step 2: Update all package.json files in monorepo (each package independently)
pnpm -r exec ncu --filter "minimatch|stylelint-order|cssnano" -u

# Step 3: Sync lock file (resolves all versions consistently)
pnpm install

# Step 4: Validate consistency (no version conflicts)
pnpm install --frozen-lockfile
```

**Time:** ~1 hour  
**Risk:** VERY LOW  
**Validation:** pnpm-lock.yaml updated and consistent (all versions reconciled across monorepo)

---

### Phase 2: Major Upgrades (High Effort)

#### 2a. Jest 26→30 + TypeScript types

```bash
ncu --filter "jest|@types/jest" -u
pnpm -r exec ncu --filter "jest|@types/jest" -u
pnpm install

# ⚠️ THEN: Run full test suite
pnpm -r test:unit
pnpm -r test:e2e
pnpm test:update:e2e
```

**Breaking Changes:**

- jest environment jsdom 21→26 (spec changes)
- Deprecated alias methods removed
- `jest.genMockFromModule()` → `jest.createMockFromModule()`
- `--testPathPattern` → `--testPathPatterns`

**Migration Effort:** 2-5 days  
**Focus:** `/packages/components/` first, then adapters

---

#### 2b. ESLint 9→10 (Config Migration)

```bash
ncu --filter "eslint|@eslint/js" -u
pnpm install

# ⚠️ THEN: Migrate config from .eslintrc.json to eslint.config.js
eslint --init # (use to generate boilerplate)
# Manual migration of rules from old format to new

pnpm lint
pnpm lint:eslint
```

**Breaking Changes:**

- Legacy `.eslintrc.json` removed
- Must use flat config (`eslint.config.js`)
- Config file lookup behavior changed (benefits monorepos)

**Migration Effort:** 1-3 days  
**Notes:** Automation tools available via `eslint --init`

---

### Phase 3: Dependent Upgrades (after Phase 2)

```bash
# Only after jest + eslint are done:
ncu --filter "knip|typescript" -u
pnpm -r exec ncu --filter "knip|typescript" -u
pnpm install
```

**TypeScript 5→6:**

- Config migration: `npx @andrewbranch/ts5to6`
- May be automatic depending on current tsconfig.json

**knip 5→6:**

- Unused-code detection config changes
- `--experimental-tags` → `--tags`

---

### Phase 4: Blocked Dependencies (Wait)

These remain at current versions until:

| Package       | Current     | Blocked By                             | Action                                   |
| ------------- | ----------- | -------------------------------------- | ---------------------------------------- |
| @stencil/core | 4.43.3      | Output-targets not v5-compatible       | Wait for output-target updates           |
| prettier      | 3.8.1       | prettier-plugin-organize-imports       | Wait for prettier v4 stable              |
| @angular/core | v19/v20/v21 | Production critical, complex migration | Track in separate angular-upgrade branch |

---

## Reporting Template

After each phase, update `/UPGRADEABLE_DEPENDENCIES.md`:

```markdown
## Upgrade History

### [Date]: Phase 1 Completed ✅

- minimatch 10.2.4 → 10.2.5 ✅
- rollup 4.60.0 → 4.60.1 ✅
- stylelint-order 7.0.1 → 8.1.1 ✅
- cssnano 7.1.3 → 7.1.4 ✅
- Status: pnpm-lock.yaml synced, tests passing

### [Date]: Phase 2a (Jest) — In Progress 🔄

- Current: Running test suite migration
- Blockers: [if any]
- ETA: [days]
```

---

## Error Handling

### If `ncu` fails:

```bash
# Clear and retry
rm -rf node_modules pnpm-lock.yaml
pnpm install
ncu --filter "PACKAGE_NAME" -u
```

### If peer dependencies conflict:

1. Check `ncu` output for exact peer version
2. Manually edit package.json to satisfy both
3. Run `pnpm install` to validate

### If tests fail post-upgrade:

1. Run only affected package tests first
2. Review migration guides (links in UPGRADEABLE_DEPENDENCIES.md)
3. Apply fixes incrementally per component/adapter
4. Commit after each fix

---

## Success Criteria

- ✅ All phases complete or justifiably blocked
- ✅ pnpm-lock.yaml clean (no duplicate entries)
- ✅ Test suite passes (after Phase 2)
- ✅ Lint passes (after Phase 2b)
- ✅ Breaking changes documented in CHANGELOG / Migration Guide

---

## Running This Agent

### Interactive (Recommended)

```bash
# Review UPGRADEABLE_DEPENDENCIES.md for current state
# Execute one phase at a time, validate, then move to next
```

### Automated (Via Claude Agent)

```
/team run dependency upgrades Phase 1
/team run dependency upgrades Phase 2a (Jest)
/team run dependency upgrades Phase 2b (ESLint)
```

---

## References

- [NPM Check Updates](https://www.npmjs.com/package/npm-check-updates)
- [Jest 30 Migration](https://jestjs.io/docs/upgrading-to-jest30)
- [ESLint v10 Migration](https://eslint.org/docs/latest/use/migrate-to-10.0.0)
- [TypeScript 6.0 Changes](https://devblogs.microsoft.com/typescript/announcing-typescript-5-0/)
- [pnpm CLI](https://pnpm.io/cli/install)
