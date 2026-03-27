# 2. Architecture Constraints

This section documents the technical, organizational, and legal boundaries within which Public UI - KoliBri must operate. These constraints shape architectural decisions and guide implementation choices throughout the project.

## 2.1 Technical Constraints

| Constraint                | Description                                                                | Motivation                                                               |
| ------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| **Web Standards Only**    | Components must use only standard web technologies (HTML, CSS, JavaScript) | Ensures long-term compatibility and avoids vendor lock-in                |
| **Shadow DOM**            | Components use Shadow DOM for encapsulation                                | Prevents style conflicts and enables true component isolation            |
| **Stencil.js Framework**  | Web components are built with Stencil                                      | Provides excellent developer experience and generates framework adapters |
| **TypeScript**            | All code written in TypeScript                                             | Type safety improves code quality and developer experience               |
| **pnpm Monorepo**         | Project structure as pnpm/Nx monorepo                                      | Efficient dependency management and build orchestration                  |
| **Node.js 22+**           | Minimum Node.js version 22                                                 | Leverages modern JavaScript features and tooling                         |
| **CSS Custom Properties** | Minimal use of CSS custom properties for theming                           | Avoids global cascade pollution while enabling customization             |
| **Adopted Style Sheets**  | Styling via adopted style sheets                                           | Enables efficient theme switching and style composition                  |

## 2.2 Organizational Constraints

| Constraint                | Description                                                             | Impact                                                         |
| ------------------------- | ----------------------------------------------------------------------- | -------------------------------------------------------------- |
| **Open Source License**   | EUPL-1.2 (European Union Public License)                                | All contributions must be compatible with this license         |
| **Public Sector Context** | Originated from ITZBund (German federal IT service provider)            | Must meet public sector requirements (BITV, procurement rules) |
| **Community Driven**      | Open for external contributions                                         | Development prioritizes community needs and contributions      |
| **Semantic Versioning**   | Strict SemVer compliance                                                | Breaking changes only in major versions                        |
| **LTS/STS Release Model** | Long-term support (3 years) and short-term support (15 months) versions | Enterprises need stability while innovation continues          |

## 2.3 Conventions

| Convention                | Description                                                 | Enforcement                           |
| ------------------------- | ----------------------------------------------------------- | ------------------------------------- |
| **Code Style**            | Prettier formatting, 160 character line width, tabs         | Automated via pre-commit hooks and CI |
| **Linting**               | ESLint and Stylelint with strict rules                      | No inline rule disabling allowed      |
| **Commit Messages**       | Conventional Commits specification                          | PR title validation in CI             |
| **Documentation**         | All public APIs must be documented                          | Required for PR approval              |
| **Testing**               | Unit tests for logic, E2E tests for components              | Required for PR approval              |
| **Alphabetical Ordering** | Lists, imports, and enumerations kept alphabetically sorted | Reduces merge conflicts               |
| **Component Naming**      | All components prefixed with "Kol" (e.g., KolButton)        | Avoids naming conflicts               |

## 2.4 Quality Constraints

| Constraint                   | Description                                            | Verification                               |
| ---------------------------- | ------------------------------------------------------ | ------------------------------------------ |
| **WCAG 2.2 AAA Compliance**  | All components must meet WCAG 2.2 Level AAA standards  | Automated axe-core testing + manual review |
| **BITV Compliance**          | Components must meet German accessibility requirements | Manual testing and certification           |
| **Browser Support**          | Modern browsers with ES2017+ support                   | Automated cross-browser testing            |
| **Bundle Size**              | Keep individual components small and tree-shakeable    | Bundle size monitoring in CI               |
| **Contrast Ratios**          | Minimum 4.5:1 for normal text, 3:1 for large text      | wcag-contrast library validation           |
| **Interactive Element Size** | Minimum 44x44px touch target size                      | Built into component styling               |

## 2.5 Legal Constraints

| Constraint                      | Description                                         |
| ------------------------------- | --------------------------------------------------- |
| **License Compatibility**       | All dependencies must be compatible with EUPL-1.2   |
| **No Proprietary Dependencies** | Avoid dependencies with proprietary licenses        |
| **Export Compliance**           | As open source, complies with EU export regulations |
| **Data Protection**             | No personal data collection in components           |
| **Third-party Licenses**        | All third-party licenses documented and reviewed    |

## 2.6 Development Environment Constraints

| Constraint                | Description                                                  |
| ------------------------- | ------------------------------------------------------------ |
| **Platform Independence** | Build and development must work on Windows, macOS, and Linux |
| **CI/CD Platform**        | GitHub Actions for all automation                            |
| **Package Registry**      | npm as primary distribution channel                          |
| **Security Scanning**     | CodeQL and dependency scanning required                      |
| **Provenance**            | SLSA Build Level 3 for published packages                    |
