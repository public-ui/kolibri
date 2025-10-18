# GitHub Copilot Instructions for KoliBri Repository

**ALWAYS** follow these instructions first and only fallback to additional search and context gathering if the information here is incomplete or found to be in error.

## KoliBri Overview

KoliBri is an accessible web component library built with Stencil and TypeScript. It's a monorepo managed with **pnpm** and **Nx** containing reusable web components, themes, framework adapters, and development tools.

## Essential Setup Commands

Execute these commands in order to set up the development environment:

> [!IMPORTANT]
> Never add a `packageManager` entry to any `package.json` file in this repository. The workspace tooling manages package managers implicitly, so additional metadata causes conflicts.

### 1. Install Node.js 22

```bash
# Download and install Node.js 22 (REQUIRED - Node.js 20 will NOT work)
curl -fsSL https://nodejs.org/dist/v22.13.0/node-v22.13.0-linux-x64.tar.xz -o /tmp/node.tar.xz
cd /tmp && tar -xf node.tar.xz
export PATH="/tmp/node-v22.13.0-linux-x64/bin:$PATH"
node --version  # Should show v22.x.x
```

### 2. Enable pnpm

```bash
corepack enable pnpm
pnpm --version  # Should show 10.x.x
```

### 3. Install Dependencies

```bash
# Install all packages (takes 2-5 minutes)
pnpm i --ignore-scripts
# Note: Using --ignore-scripts avoids Playwright installation issues in CI environments
```

### 4. Build All Packages

```bash
# Build everything (takes ~2 minutes, NEVER CANCEL)
# Set timeout to 300+ seconds for this command
pnpm -r build
```

## Development Workflow

### Start Development Environment

```bash
# Navigate to React sample app for component development
cd packages/samples/react

# Copy assets manually (Playwright prepare may fail)
pnpm prepare:components
pnpm prepare:themes

# Start development server (opens http://localhost:9191)
pnpm start
```

### Code Quality Commands

```bash
# Format code (takes ~30 seconds)
pnpm format

# Lint all packages (takes ~60 seconds, NEVER CANCEL)
# Set timeout to 120+ seconds
pnpm lint

# Run unit tests (takes ~2 minutes, NEVER CANCEL)
# Set timeout to 300+ seconds
pnpm test
```

## Project Structure

- `packages/components/` – Stencil web components (main library)
- `packages/themes/` – Styling themes (default, ecl, etc.)
- `packages/samples/` – Sample applications (Angular, React)
- `packages/adapters/` – Framework integrations (Angular, React, Vue, etc.) - **AUTO-GENERATED**
- `packages/tools/` – CLI tools, visual tests, and development utilities
- `docs/` – Documentation
- `.github/workflows/` – CI/CD pipelines

### Package Details

#### Main Components (`packages/components/`)

The core Stencil web component library that generates all framework adapters.

- **Build command:** `pnpm --filter @public-ui/components build`
- **Dev mode:** `pnpm --filter @public-ui/components dev` (watch mode)
- **Contains:** Stencil components, output target configurations

#### Framework Adapters (`packages/adapters/`)

**IMPORTANT:** All adapters are auto-generated from Stencil. Do NOT manually edit adapter source files.

**Available Adapters:**

- `react/` – React 18+ integration
- `react-standalone/` – Standalone React build
- `react-v19/` – React 19 integration
- `angular/v17/`, `angular/v18/`, `angular/v19/`, `angular/v20/` – Angular version-specific adapters
- `vue/` – Vue.js integration
- `solid/` – SolidJS integration
- `svelte/` – Svelte integration
- `preact/` – Preact integration
- `vaadin/` – Vaadin Flow integration
- `hydrate/` – Server-side rendering support

**Adapter Workflow:**

1. Modify components in `packages/components/src/components/`
2. Build main components: `pnpm --filter @public-ui/components build`
3. Adapters are automatically generated via Stencil output targets
4. Build specific adapter: `pnpm --filter @public-ui/react build`

#### Themes (`packages/themes/`)

Styling packages built with Rollup and Sass.

- `default/` – Default KoliBri theme
- `ecl/` – European Commission Library theme

**Theme Development:**

- **Build:** `pnpm --filter @public-ui/theme-default build`
- **Watch mode:** `pnpm --filter @public-ui/theme-default dev`
- **Live preview:** `pnpm --filter @public-ui/theme-default start`

#### Tools (`packages/tools/`)

Development and migration utilities.

- `kolibri-cli/` – Migration and project management CLI
- `visual-tests/` – Visual regression testing framework
- `benchmark-tests/` – Performance testing tools

#### Sample Applications (`packages/samples/`)

Example applications for development and testing.

- `react/` – React sample app (primary development environment)
- `angular/` – Angular sample app

## Key Development Locations

### Frequently Modified Files

- `packages/components/src/components/` – Web component implementations
- `packages/themes/default/src/` – Default theme styles
- `packages/samples/react/src/` – Sample applications and development testing

### Configuration Files

- `package.json` (root) – Monorepo scripts and dependencies
- `packages/*/package.json` – Individual package configurations
- `pnpm-workspace.yaml` – Workspace configuration
- `nx.json` – Nx monorepo configuration

## Validation and Testing

### ALWAYS Run These Before Committing

```bash
# 1. Build to ensure no compilation errors (2 minutes, timeout: 300s)
pnpm -r build

# 2. Format code (30 seconds, timeout: 60s)
pnpm format

# 3. Lint for code quality (60 seconds, timeout: 120s)
pnpm lint

# 4. Run unit tests (2 minutes, timeout: 300s)
pnpm test
```

### Manual Validation Scenarios

After making changes to components or themes:

1. **Component Development Testing:**

   ```bash
   cd packages/samples/react
   pnpm start
   # Navigate to http://localhost:9191
   # Test your component changes in the samples
   ```

2. **Theme Changes Testing:**
   ```bash
   # Build themes first
   pnpm --filter @public-ui/themes build
   # Start React sample and verify styling changes
   cd packages/samples/react && pnpm start
   ```

### CLI Tool Testing

```bash
cd packages/tools/kolibri-cli
pnpm build
# Test CLI commands (requires Node.js execution)
node dist/index.js --help
node dist/index.js info
```

## Build Times and Timeouts

**CRITICAL:** Use these timeout values to prevent premature cancellation:

- **Initial setup:** `pnpm i --ignore-scripts` – 2-5 minutes (timeout: 600s)
- **Full build:** `pnpm -r build` – 2 minutes (timeout: 300s)
- **Individual package tests:** `pnpm --filter <package> test:unit` – 20 seconds (timeout: 60s)
- **All tests:** `pnpm test` – 2-3 minutes (timeout: 300s)
- **Linting:** `pnpm lint` – 1 minute (timeout: 120s)
- **Formatting:** `pnpm format` – 10-30 seconds (timeout: 60s)
- **Dev server startup:** `pnpm start` – 15 seconds (timeout: 60s)
- **Component dev watcher:** `pnpm dev` in packages/components – 15 seconds initial (timeout: 60s)

**NEVER CANCEL** any build or test command before the specified timeout.

## Common Issues and Solutions

### Node.js Version Issues

```bash
# Error: "Unsupported environment (bad pnpm and/or Node.js version)"
# Solution: Ensure Node.js 22 is installed and in PATH
node --version  # Must show v22.x.x
```

### Playwright Installation Failures

```bash
# Error: Playwright download failures
# Solution: Use --ignore-scripts during installation
pnpm i --ignore-scripts
# Then manually copy assets for development:
cd packages/samples/react
pnpm prepare:components && pnpm prepare:themes
```

### Build Dependencies

```bash
# Error: Package build failures
# Solution: Build packages in dependency order
pnpm --filter @public-ui/components build  # First - generates adapters
pnpm --filter @public-ui/themes build      # Themes can build independently
pnpm --filter @public-ui/theme-default build
pnpm --filter @public-ui/sample-react build
```

**Package Build Order:**

1. **Components first** – Must build before adapters (generates adapter code)
2. **Themes** – Independent, can build in parallel
3. **Adapters** – Depend on components being built first
4. **Samples** – Depend on components and themes
5. **Tools** – Generally independent

### Branch Switching

When switching branches:

```bash
# Always reinstall and rebuild after branch changes
pnpm i --ignore-scripts
pnpm -r build
```

## Framework-Specific Development

### Component Development (Stencil)

```bash
cd packages/components
# Start watch mode for component development
pnpm dev
```

**Component Development Workflow:**

1. Create/modify components in `packages/components/src/components/`
2. Use watch mode during development: `pnpm dev`
3. Build components: `pnpm build`
4. Framework adapters are automatically generated

### Framework Adapter Development

**CRITICAL:** Framework adapters are auto-generated from Stencil. Do NOT manually edit adapter files.

**Adapter Generation Process:**

1. Stencil output targets in `packages/components/stencil.config.ts` generate adapters
2. Each framework has specific output target configuration
3. Build process: Components → Stencil Output Targets → Framework Adapters

**Working with Adapters:**

```bash
# Build main components first (generates adapters)
pnpm --filter @public-ui/components build

# Build specific adapter
pnpm --filter @public-ui/react build
pnpm --filter @public-ui/angular-v18 build
pnpm --filter @public-ui/svelte build
pnpm --filter @public-ui/vue build

# Build all adapters
pnpm --filter "@public-ui/*" build
```

**Framework-Specific Notes:**

- **React:** Multiple versions supported (React 18, 19, standalone)
- **Angular:** Version-specific packages (v17, v18, v19, v20)
- **Vue:** Single Vue.js integration
- **Solid:** SolidJS framework integration
- **Svelte:** Svelte integration powered by generated proxies
- **Vaadin:** Java/Flow framework integration

### Theme Development

```bash
cd packages/themes/default
# Watch mode for theme changes (with Rollup watcher)
pnpm dev

# Or use start command for development with live preview
pnpm start
```

**Theme Development Workflow:**

```bash
# Create new theme (copy from default)
cd packages/themes
cp -r default new-theme
cd new-theme

# Update package.json with new theme name
# Modify src/ files with new theme styles
# Build theme
pnpm build

# Test theme with visual tests
pnpm test
```

**Theme Structure:**

- `src/` – Theme source files (Sass/CSS)
- `assets/` – Static assets (copied from components)
- `dist/` – Built theme output
- `rollup.config.js` – Build configuration

### Tools and CLI Development

**KoliBri CLI (`packages/tools/kolibri-cli/`):**

```bash
cd packages/tools/kolibri-cli
pnpm build

# Run CLI commands
node dist/index.js --help
node dist/index.js info
node dist/index.js migrate --help
```

**Visual Testing (`packages/tools/visual-tests/`):**

```bash
# Run visual tests for a theme
cd packages/themes/default
pnpm test

# Update visual snapshots
pnpm test-update
```

### React Sample Development

```bash
cd packages/samples/react
# Start development server with hot reload
pnpm start
# Navigate to http://localhost:9191
```

**Sample Development Workflow:**

1. Start React sample app for component testing
2. Make component changes in `packages/components/`
3. Components auto-rebuild and reload in sample app
4. Use sample app to validate component behavior

## Monorepo Commands

### Build Single Package

```bash
# Core packages
pnpm --filter @public-ui/components build
pnpm --filter @public-ui/theme-default build
pnpm --filter @public-ui/theme-ecl build

# Framework adapters (must build components first)
pnpm --filter @public-ui/react build
pnpm --filter @public-ui/angular-v18 build
pnpm --filter @public-ui/vue build
pnpm --filter @public-ui/solid build
pnpm --filter @public-ui/svelte build

# Sample applications
pnpm --filter @public-ui/sample-react build
pnpm --filter @public-ui/sample-angular build

# Tools
pnpm --filter @public-ui/kolibri-cli build
pnpm --filter @public-ui/visual-tests build
```

### Package Categories and Filtering

**Filter by Category:**

```bash
# All framework adapters
pnpm --filter "@public-ui/react*" build
pnpm --filter "@public-ui/angular*" build

# All themes
pnpm --filter "@public-ui/theme-*" build

# All samples
pnpm --filter "@public-ui/sample-*" build

# All tools
pnpm --filter "@public-ui/kolibri-cli" build
pnpm --filter "@public-ui/visual-tests" build
```

### Run Commands Across Packages

```bash
pnpm -r lint          # Lint all packages
pnpm -r test          # Test all packages
pnpm -r build         # Build all packages
pnpm -r format        # Format all packages
```

### Package-Specific Operations

```bash
# Test specific package types
pnpm --filter @public-ui/components test:unit
pnpm --filter @public-ui/theme-default test
pnpm --filter @public-ui/kolibri-cli test

# Development mode for specific packages
pnpm --filter @public-ui/components dev       # Component watch mode
pnpm --filter @public-ui/theme-default dev    # Theme watch mode
pnpm --filter @public-ui/sample-react start   # Sample app dev server
```

## CI/CD Integration

The repository uses GitHub Actions with these key workflows:

- `ci.yml` – Main CI pipeline (build, lint, test)
- `update-snapshots.yml` – Visual regression test updates

### Update Visual Snapshots

```bash
# Via GitHub CLI (if available)
gh workflow run update-snapshots.yml -r `git rev-parse --abbrev-ref HEAD`
```

## Migration and Versioning

The project follows semantic versioning with LTS and STS releases:

- Use `packages/tools/kolibri-cli` for component migrations
- Version updates require updating all package.json files
- Always use exact version numbers (no ranges)

### KoliBri CLI Tool

**Installation and Setup:**

```bash
cd packages/tools/kolibri-cli
pnpm build
```

**Available Commands:**

```bash
# Get CLI help
node dist/index.js --help

# Show project information
node dist/index.js info

# Run migration tools
node dist/index.js migrate --help
node dist/index.js migrate --ignore-uncommitted-changes

# Test migration on sample project
pnpm start  # Runs migration on test data
```

**CLI Features:**

- **Component migration** – Automated component updates between versions
- **Project analysis** – Dependency and usage analysis
- **Code transformation** – Automated code refactoring
- **Test integration** – Migration testing and validation

### Visual Testing Workflow

**Theme Visual Testing:**

```bash
cd packages/themes/default
pnpm test                    # Run visual regression tests
pnpm test-update            # Update visual snapshots
```

**Visual Test Tools (`packages/tools/visual-tests/`):**

```bash
cd packages/tools/visual-tests
pnpm build

# Custom visual test runs
THEME_MODULE=dist THEME_EXPORT=DEFAULT kolibri-visual-test
THEME_MODULE=dist THEME_EXPORT=DEFAULT kolibri-visual-test --update-snapshots=changed
```

**Visual Testing Process:**

1. Build theme: `pnpm build`
2. Run tests: `pnpm test`
3. Review snapshot differences
4. Update snapshots if changes are expected: `pnpm test-update`

## Performance Notes

- **Build parallelization:** Most pnpm commands support `--parallel` flag
- **Incremental builds:** Individual packages can be built separately
- **Development mode:** Use `pnpm dev` in specific packages for watch mode
- **Asset copying:** Required for themes and icons before development

### Development Best Practices

**Adapter Development Rules:**

- ❌ **NEVER** manually edit files in `packages/adapters/*/src/` or `packages/adapters/*/dist/`
- ✅ **ALWAYS** modify source components in `packages/components/src/components/`
- ✅ **ALWAYS** build components first: `pnpm --filter @public-ui/components build`
- ✅ Test adapters by building them: `pnpm --filter @public-ui/react build`

**Theme Development Rules:**

- ✅ Themes are independent and can be developed separately
- ✅ Use `pnpm dev` for watch mode during theme development
- ✅ Test themes with visual tests: `pnpm test`
- ✅ Copy assets from components: `pnpm prepare` (in theme directory)
- ⚠️ Expose only prefixed CSS custom properties that must be themed externally
  and rely on SASS variables for internal calculations to avoid collisions with
  host-page styles.

**Component Development Rules:**

- ✅ Use `pnpm dev` in components package for watch mode
- ✅ Test changes in React sample app: `cd packages/samples/react && pnpm start`
- ✅ Build components after changes to regenerate adapters
- ✅ Run full test suite before committing: `pnpm test`

### Common Development Scenarios

**1. Adding a New Component:**

```bash
# 1. Create component in packages/components/src/components/
# 2. Add to component tags list in stencil.config.ts
# 3. Build components to generate adapters
cd packages/components && pnpm build

# 4. Test in React sample
cd packages/samples/react && pnpm start

# 5. Build all adapters
pnpm --filter "@public-ui/*" build
```

**2. Updating Component Styling:**

```bash
# 1. Modify theme files in packages/themes/default/src/
cd packages/themes/default
pnpm dev  # Watch mode for immediate feedback

# 2. Test changes in sample app
cd packages/samples/react && pnpm start

# 3. Run visual tests
cd packages/themes/default && pnpm test
```

**3. Framework-Specific Testing:**

```bash
# React testing
cd packages/samples/react && pnpm start

# Angular testing
cd packages/samples/angular && pnpm start

# Direct adapter testing
pnpm --filter @public-ui/react build
pnpm --filter @public-ui/angular-v18 build
```

**4. Migration Testing:**

```bash
cd packages/tools/kolibri-cli
pnpm build
pnpm start  # Tests migration on sample data
```

## Quick Reference Commands

### Essential Pre-Commit Workflow

```bash
# Complete validation workflow (run before committing)
pnpm -r build      # ~2 minutes - NEVER CANCEL (timeout: 300s)
pnpm format        # ~10 seconds (timeout: 60s)
pnpm lint          # ~1 minute (timeout: 120s)
pnpm test          # ~2-3 minutes - NEVER CANCEL (timeout: 300s)
```

### Individual Package Operations

```bash
# Build specific packages
pnpm --filter @public-ui/components build
pnpm --filter @public-ui/theme-default build

# Framework adapters (components must be built first)
pnpm --filter @public-ui/react build
pnpm --filter @public-ui/angular-v18 build

# Test specific package
pnpm --filter @public-ui/components test:unit
pnpm --filter @public-ui/theme-default test
pnpm --filter @public-ui/kolibri-cli test

# Lint specific package
pnpm --filter @public-ui/components lint
pnpm --filter @public-ui/theme-default lint
```

### Development Mode Commands

```bash
# Component development with hot reload
cd packages/components && pnpm dev

# Theme development with watcher
cd packages/themes/default && pnpm dev

# Sample app for testing components
cd packages/samples/react && pnpm start
```

Always prioritize these validated workflows over attempting alternative approaches.

For more information about the project follow the [AGENTS.md](../AGENTS.md) files.
