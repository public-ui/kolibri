# 9. Architecture Decisions

This section documents the significant architectural decisions made during the development of Public UI - KoliBri. Each Architecture Decision Record (ADR) captures the context, decision, and consequences of important choices, providing transparency and rationale for future maintainers and contributors.

## 9.1 Decision Records

### ADR-001: Use Web Components as Foundation

**Status:** Accepted

**Context:**
KoliBri needs to be framework-agnostic and work with any JavaScript framework (React, Angular, Vue) or vanilla JavaScript. We need a technology that is standardized and will be supported long-term.

**Decision:**
Use Web Components (Custom Elements, Shadow DOM) as the foundation for all components.

**Consequences:**

- ✅ Framework-agnostic by design
- ✅ Based on W3C standards (long-term stability)
- ✅ Native browser support (no framework overhead)
- ✅ True encapsulation via Shadow DOM
- ❌ Requires polyfills for older browsers
- ❌ Shadow DOM can complicate certain styling scenarios
- ❌ Limited to Custom Elements API capabilities

**Alternatives Considered:**

- React components: Too coupled to React ecosystem
- Framework-specific libraries: Violates framework-agnostic goal
- Pure HTML/CSS: No component logic or reusability

### ADR-002: Use Stencil.js as Compiler

**Status:** Accepted

**Context:**
Writing Web Components directly is verbose and error-prone. We need a tool that improves developer experience while still generating standard Web Components.

**Decision:**
Use Stencil.js as the Web Component compiler.

**Consequences:**

- ✅ Excellent developer experience (TypeScript, JSX, decorators)
- ✅ Generates framework adapters automatically
- ✅ Optimized output (lazy loading, code splitting)
- ✅ Strong TypeScript support
- ❌ Dependency on Stencil project
- ❌ Learning curve for contributors
- ❌ Build step required

**Alternatives Considered:**

- Lit: Good DX, but no automatic framework adapter generation
- Native Web Components: Too verbose, poor DX
- Polymer: Deprecated and not actively maintained
- Custom solution: Too much maintenance overhead

### ADR-003: Separate Themes from Components

**Status:** Accepted

**Context:**
Different organizations need different visual designs (corporate design, design systems). Coupling styling with components makes customization difficult.

**Decision:**
Separate themes into independent packages that can be registered at runtime.

**Consequences:**

- ✅ Organizations can create custom themes without forking
- ✅ Runtime theme switching possible
- ✅ Multiple themes can be maintained independently
- ✅ Theme updates don't require component rebuilds
- ❌ More complex architecture
- ❌ Theme and component versions must be synchronized
- ❌ Additional packages to maintain

**Alternatives Considered:**

- CSS variables only: Insufficient for complex theming
- Inline styles: Couples styling with logic
- Multiple component versions: Maintenance nightmare
- Fork per organization: Fragmentation, no collaboration

### ADR-004: Use Shadow DOM for Encapsulation

**Status:** Accepted

**Context:**
Components need style isolation to prevent CSS conflicts. Global CSS in large applications often leads to unintended side effects.

**Decision:**
Use Shadow DOM for all components to achieve true style encapsulation.

**Consequences:**

- ✅ Perfect style isolation
- ✅ No CSS naming conflicts
- ✅ Components can't be accidentally broken by global styles
- ✅ Predictable rendering behavior
- ❌ Can't style component internals from outside (by design)
- ❌ Some CSS selectors don't work across shadow boundary
- ❌ Slightly more complex debugging

**Alternatives Considered:**

- No Shadow DOM: Style conflicts and unpredictable behavior
- Scoped styles (like Vue): Not true encapsulation
- CSS Modules: Requires build tooling, not standards-based
- BEM naming: Conventions can be broken, not enforced

### ADR-005: Use Adopted Style Sheets

**Status:** Accepted

**Context:**
Themes need to be applied efficiently to many component instances. Traditional style injection would be inefficient and create many duplicate style elements.

**Decision:**
Use Adopted Style Sheets API for theme application.

**Consequences:**

- ✅ Efficient style sharing across components
- ✅ Runtime theme switching without re-rendering
- ✅ Memory efficient (styles shared, not duplicated)
- ✅ Fast theme changes
- ❌ Requires modern browser (or polyfill)
- ❌ More complex theming implementation

**Alternatives Considered:**

- Style tags in each component: Inefficient, memory intensive
- Global styles with CSS custom properties: Breaks encapsulation
- Inline styles: Not maintainable, no CSS features
- Single style tag: Difficult to manage, no encapsulation

### ADR-006: Use TypeScript

**Status:** Accepted

**Context:**
JavaScript's dynamic nature leads to runtime errors that could be caught at compile time. Component APIs need strong typing for good developer experience.

**Decision:**
Write all code in TypeScript with strict mode enabled.

**Consequences:**

- ✅ Type safety catches errors early
- ✅ Excellent IDE support (autocomplete, refactoring)
- ✅ Self-documenting code via types
- ✅ Better maintainability
- ❌ Compilation step required
- ❌ Learning curve for contributors
- ❌ More verbose code

**Alternatives Considered:**

- JavaScript with JSDoc: Limited type checking
- Flow: Less ecosystem support than TypeScript
- Plain JavaScript: Too error-prone for large codebase
- Reason/ReScript: Too niche, limited adoption

### ADR-007: Use pnpm Workspace Monorepo

**Status:** Accepted

**Context:**
KoliBri consists of many packages (components, themes, adapters, tools) that need to be developed together but released independently.

**Decision:**
Use pnpm workspace as the monorepo solution with Nx for build orchestration.

**Consequences:**

- ✅ Efficient dependency management
- ✅ Shared dependencies (disk space savings)
- ✅ Strict dependency resolution (no phantom dependencies)
- ✅ Fast installs
- ✅ Nx provides intelligent caching and task orchestration
- ❌ More complex setup than single package
- ❌ pnpm less common than npm/yarn
- ❌ Steeper learning curve for new contributors

**Alternatives Considered:**

- npm workspaces: Less efficient than pnpm
- Yarn workspaces: Phantom dependencies issue
- Lerna: Overhead without pnpm's benefits
- Separate repositories: Coordination nightmare

### ADR-008: Five-Layer Styling Architecture

**Status:** Accepted

**Context:**
Styling needs to be separated between accessibility requirements, layout structure, and visual design. Teams need to customize appearance without breaking accessibility or layout.

**Decision:**
Implement a five-layer styling architecture:

1. A11y Preset Layer (accessibility baseline)
2. Basis Global Layer (global layout)
3. Basis Component Layer (component layout)
4. Theme Global Layer (global theme)
5. Theme Component Layer (component theme)

**Consequences:**

- ✅ Clear separation of concerns
- ✅ Accessibility can't be accidentally broken
- ✅ Themes can customize appearance without breaking layout
- ✅ Predictable style precedence
- ❌ More complex to understand initially
- ❌ More files to maintain
- ❌ Strict conventions required

**Alternatives Considered:**

- Flat CSS structure: Too easy to break things
- Two-layer (component + theme): Insufficient separation
- Theme-only styling: Accessibility not guaranteed
- Inline styles with theme tokens: Not maintainable

### ADR-009: Minimize CSS Custom Properties

**Status:** Accepted

**Context:**
CSS custom properties (variables) cross the shadow DOM boundary and remain in the global cascade. Overuse can lead to naming conflicts and unpredictable behavior.

**Decision:**
Use CSS custom properties sparingly, only for values that must be customizable from outside. Use SASS variables for internal calculations.

**Consequences:**

- ✅ Prevents variable name conflicts
- ✅ More robust components
- ✅ Clearer API surface
- ✅ Less confusion about what can be customized
- ❌ Less flexibility for advanced users
- ❌ More SASS compilation required

**Alternatives Considered:**

- Heavy use of CSS custom properties: Too many conflicts
- No CSS custom properties: Not customizable enough
- Everything as custom properties: Global namespace pollution
- Component-specific prefixes only: Still risks conflicts

### ADR-010: LTS/STS Release Model

**Status:** Accepted

**Context:**
Enterprises need stable, long-supported versions. Innovation requires rapid iteration. These needs conflict.

**Decision:**
Implement a dual release model:

- **LTS (Long-Term Support)**: 3 years support, conservative changes
- **STS (Short-Term Support)**: 15 months support, rapid innovation

**Consequences:**

- ✅ Enterprises get stability (LTS)
- ✅ Innovation continues (STS)
- ✅ Clear expectations for support duration
- ✅ Predictable upgrade cycles
- ❌ More versions to maintain
- ❌ More complex release management
- ❌ Documentation for multiple versions

**Alternatives Considered:**

- Single release line: Can't balance stability and innovation
- Only LTS: Slows innovation
- Only STS: No enterprise adoption
- Multiple concurrent majors: Too much maintenance

### ADR-011: Semantic Versioning Strict Compliance

**Status:** Accepted

**Context:**
Users need to trust that updates won't break their applications unexpectedly. Clear versioning helps with dependency management.

**Decision:**
Strictly follow Semantic Versioning 2.0:

- Major: Breaking changes
- Minor: New features, backwards compatible
- Patch: Bug fixes, backwards compatible

**Consequences:**

- ✅ Predictable upgrade safety
- ✅ Clear communication of changes
- ✅ Better dependency management
- ✅ Trust from community
- ❌ Major versions can come frequently
- ❌ Deprecation process takes time
- ❌ Cannot fix design mistakes easily

**Alternatives Considered:**

- Rolling releases: Unpredictable, risky
- Calendar versioning: Doesn't communicate breaking changes
- Loose SemVer: Erodes trust
- Pre-1.0 forever: Signals instability

### ADR-012: Auto-generate Framework Adapters

**Status:** Accepted

**Context:**
Supporting multiple frameworks (React, Angular, Vue, etc.) requires framework-specific wrappers. Manually maintaining these would be time-consuming and error-prone.

**Decision:**
Use Stencil output targets to automatically generate framework adapters from component definitions.

**Consequences:**

- ✅ No manual adapter maintenance
- ✅ Consistent APIs across frameworks
- ✅ Automatic updates when components change
- ✅ Less code to maintain
- ❌ Dependent on Stencil output target quality
- ❌ Limited control over generated code
- ❌ Framework-specific quirks harder to address

**Alternatives Considered:**

- Manual adapters: Too much maintenance
- Single framework: Violates framework-agnostic goal
- No adapters (use web components directly): Poor DX in some frameworks
- Separate adapter projects: Coordination overhead

### ADR-013: SLSA Build Level 3 for Supply Chain Security

**Status:** Accepted

**Context:**
Supply chain attacks are increasing. Users need assurance that published packages haven't been tampered with and were built from verified source code.

**Decision:**
Implement SLSA Build Level 3 with npm provenance for all published packages.

**Consequences:**

- ✅ Verifiable build provenance
- ✅ Supply chain security
- ✅ Increased trust from users
- ✅ Meets government/enterprise security requirements
- ❌ More complex CI/CD setup
- ❌ Requires GitHub OIDC configuration
- ❌ npm provenance support required

**Alternatives Considered:**

- No provenance: Less secure, doesn't meet some requirements
- SLSA Level 1/2: Insufficient security guarantees
- Self-signed signatures: Not verifiable by ecosystem
- Package signing only: Doesn't prove source

### ADR-014: Use Playwright for E2E Testing

**Status:** Accepted

**Context:**
Components need end-to-end testing across multiple browsers. Testing framework should support modern web technologies including Web Components and Shadow DOM.

**Decision:**
Use Playwright as the E2E testing framework.

**Consequences:**

- ✅ Excellent Shadow DOM support
- ✅ Multi-browser testing (Chromium, Firefox, WebKit)
- ✅ Fast and reliable
- ✅ Good developer experience
- ✅ Built-in accessibility testing (axe-core integration)
- ❌ Learning curve for contributors
- ❌ Test maintenance overhead

**Alternatives Considered:**

- Cypress: Weaker Shadow DOM support at the time
- Puppeteer: Chrome-only, less features
- Selenium: Older, slower, more complex
- TestCafe: Less ecosystem support

## 9.2 Open Decisions

These decisions are under consideration and will be addressed in future planning cycles as the project evolves and new requirements emerge.

### OD-001: Server-Side Rendering Strategy

**Status:** Open

**Context:**
SSR support for Web Components is complex. Current hydrate adapter is limited. Full SSR solution needed for some use cases.

**Options:**

1. Improve existing hydrate adapter
2. Declarative Shadow DOM approach
3. Partner with SSR framework projects
4. Document limitations and workarounds

**Decision Timeline:** To be reviewed in upcoming quarterly planning sessions

### OD-002: Component Library Composition

**Status:** Open

**Context:**
Applications might not need all 50+ components. Stencil already provides automatic lazy loading and code splitting on a per-component basis, loading only the components that are actually used in the application. This architectural decision is about whether additional package-level splitting would provide meaningful benefits beyond what Stencil's lazy loading already achieves.

**Options:**

1. Keep single components package with Stencil's lazy loading (current approach)
2. Split into category packages (@public-ui/forms, @public-ui/navigation) for additional granularity
3. Provide both options to support different use cases
4. Wait for enhanced tree-shaking and bundler capabilities

**Decision Timeline:** To be reviewed after evaluating real-world bundle size feedback

### OD-003: Design Token Standard

**Status:** Open

**Context:**
The default theme deliberately avoids CSS custom properties (design tokens) for theming because they cross the Shadow DOM boundary and can be manipulated from outside, reducing component robustness. Each organization can decide whether to use design tokens in their custom themes. For internal calculations and maintainability, SASS variables are used instead as they provide similar benefits without the external manipulability concerns.

**Options:**

1. Adopt Design Tokens W3C Community Group format for custom themes (while keeping base theme token-free)
2. Create custom token format optimized for Shadow DOM isolation
3. Support multiple token formats to accommodate different organizational preferences
4. Continue with current approach: SASS variables for base theme, optional tokens for custom themes

**Decision Timeline:** To be reviewed as W3C Design Token Community Group standards mature
