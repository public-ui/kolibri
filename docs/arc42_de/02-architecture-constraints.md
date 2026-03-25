# 2. Randbedingungen

Dieser Abschnitt dokumentiert die technischen, organisatorischen und rechtlichen Grenzen, innerhalb derer Public UI - KoliBri operieren muss. Diese Randbedingungen prägen architektonische Entscheidungen und leiten Implementierungsentscheidungen während des gesamten Projekts.

## 2.1 Technische Randbedingungen

| Randbedingung             | Beschreibung                                                                      | Motivation                                                               |
| ------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| **Nur Webstandards**      | Komponenten dürfen nur Standard-Webtechnologien verwenden (HTML, CSS, JavaScript) | Gewährleistet langfristige Kompatibilität und vermeidet Vendor-Lock-in   |
| **Shadow DOM**            | Komponenten verwenden Shadow DOM zur Kapselung                                    | Verhindert Stilkonflikte und ermöglicht echte Komponentenisolierung      |
| **Stencil.js Framework**  | Web-Komponenten werden mit Stencil erstellt                                       | Bietet hervorragende Entwicklererfahrung und generiert Framework-Adapter |
| **TypeScript**            | Gesamter Code in TypeScript geschrieben                                           | Typsicherheit verbessert Codequalität und Entwicklererfahrung            |
| **pnpm Monorepo**         | Projektstruktur als pnpm/Nx Monorepo                                              | Effizientes Abhängigkeitsmanagement und Build-Orchestrierung             |
| **Node.js 22+**           | Mindestens Node.js Version 22                                                     | Nutzt moderne JavaScript-Features und Tooling                            |
| **CSS Custom Properties** | Minimale Verwendung von CSS Custom Properties für Theming                         | Vermeidet globale Cascade-Verschmutzung bei gleichzeitiger Anpassbarkeit |
| **Adopted Style Sheets**  | Styling über Adopted Style Sheets                                                 | Ermöglicht effizienten Theme-Wechsel und Style-Komposition               |

## 2.2 Organisatorische Randbedingungen

| Randbedingung                        | Beschreibung                                                                    | Auswirkung                                                                      |
| ------------------------------------ | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| **Open-Source-Lizenz**               | EUPL-1.2 (European Union Public License)                                        | Alle Beiträge müssen mit dieser Lizenz kompatibel sein                          |
| **Kontext des öffentlichen Sektors** | Entstanden aus ITZBund (deutscher Bundes-IT-Dienstleister)                      | Muss Anforderungen des öffentlichen Sektors erfüllen (BITV, Beschaffungsregeln) |
| **Community-getrieben**              | Offen für externe Beiträge                                                      | Entwicklung priorisiert Community-Bedürfnisse und -Beiträge                     |
| **Semantische Versionierung**        | Strikte SemVer-Konformität                                                      | Breaking Changes nur in Hauptversionen                                          |
| **LTS/STS Release-Modell**           | Langzeitunterstützung (3 Jahre) und Kurzzeitunterstützung (15 Monate) Versionen | Unternehmen benötigen Stabilität, während Innovation fortgesetzt wird           |

## 2.3 Konventionen

| Konvention                   | Beschreibung                                            | Durchsetzung                               |
| ---------------------------- | ------------------------------------------------------- | ------------------------------------------ |
| **Code-Stil**                | Prettier-Formatierung, 160 Zeichen Zeilenlänge, Tabs    | Automatisiert über Pre-Commit-Hooks und CI |
| **Linting**                  | ESLint und Stylelint mit strengen Regeln                | Keine Inline-Regeldeaktivierung erlaubt    |
| **Commit-Nachrichten**       | Conventional Commits Spezifikation                      | PR-Titel-Validierung in CI                 |
| **Dokumentation**            | Alle öffentlichen APIs müssen dokumentiert sein         | Erforderlich für PR-Genehmigung            |
| **Testing**                  | Unit-Tests für Logik, E2E-Tests für Komponenten         | Erforderlich für PR-Genehmigung            |
| **Alphabetische Sortierung** | Listen, Imports und Enumerationen alphabetisch sortiert | Reduziert Merge-Konflikte                  |
| **Komponentenbenennung**     | Alle Komponenten mit "Kol"-Präfix (z.B. KolButton)      | Vermeidet Namenskonflikte                  |

## 2.4 Qualitätsrandbedingungen

| Randbedingung                | Beschreibung                                                        | Verifizierung                                        |
| ---------------------------- | ------------------------------------------------------------------- | ---------------------------------------------------- |
| **WCAG 2.2 AAA Konformität** | Alle Komponenten müssen WCAG 2.2 Level AAA Standards erfüllen       | Automatisierte axe-core-Tests + manuelle Überprüfung |
| **BITV-Konformität**         | Komponenten müssen deutsche Barrierefreiheitsanforderungen erfüllen | Manuelle Tests und Zertifizierung                    |
| **Browser-Unterstützung**    | Moderne Browser mit ES2017+ Unterstützung                           | Automatisierte Cross-Browser-Tests                   |
| **Bundle-Größe**             | Einzelne Komponenten klein und tree-shakeable halten                | Bundle-Größen-Monitoring in CI                       |
| **Kontrastverhältnisse**     | Minimum 4,5:1 für normalen Text, 3:1 für großen Text                | wcag-contrast-Bibliotheksvalidierung                 |
| **Interaktive Elementgröße** | Mindestens 44x44px Touch-Target-Größe                               | Eingebaut in Komponenten-Styling                     |

## 2.5 Rechtliche Randbedingungen

| Randbedingung                         | Beschreibung                                            |
| ------------------------------------- | ------------------------------------------------------- |
| **Lizenzkompatibilität**              | Alle Abhängigkeiten müssen mit EUPL-1.2 kompatibel sein |
| **Keine proprietären Abhängigkeiten** | Vermeidung von Abhängigkeiten mit proprietären Lizenzen |
| **Exportkonformität**                 | Als Open Source, entspricht EU-Exportvorschriften       |
| **Datenschutz**                       | Keine Erfassung personenbezogener Daten in Komponenten  |
| **Drittanbieter-Lizenzen**            | Alle Drittanbieter-Lizenzen dokumentiert und überprüft  |

## 2.6 Entwicklungsumgebungs-Randbedingungen

| Randbedingung               | Beschreibung                                                            |
| --------------------------- | ----------------------------------------------------------------------- |
| **Plattformunabhängigkeit** | Build und Entwicklung müssen auf Windows, macOS und Linux funktionieren |
| **CI/CD-Plattform**         | GitHub Actions für alle Automatisierungen                               |
| **Paket-Registry**          | npm als primärer Verteilungskanal                                       |
| **Sicherheits-Scanning**    | CodeQL und Abhängigkeits-Scanning erforderlich                          |
| **Provenance**              | SLSA Build Level 3 für veröffentlichte Pakete                           |
