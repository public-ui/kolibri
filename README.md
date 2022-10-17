# Willkommen bei **KoliBri**

**KoliBri** steht für **Ko**mponenten-Bib**li**othek für die **B**ar**ri**erefreiheit

> Weiter [zur **Dokumentation**](https://public-ui.github.io)…

## Vision

Wir stellen gemeinsam wiederverwendbare Webkomponenten zur Verfügung, die die Barrierefreiheit und Usability für webbasierte Benutzeroberflächen der Bundesverwaltung sicherstellen.

## Mission

**KoliBri** baut direkt auf den [Webstandards](https://www.w3.org/standards/webdesign/) des [W3C](https://www.w3.org/standards/webdesign/) auf (Framework-agnostisch), ist dabei eine generische Referenzimplementierung des [WCAG-Standards](https://www.w3.org/WAI/standards-guidelines/wcag/) und der [BITV](https://www.bitvtest.de/bitv_test.html) für die Barrierefreiheit und als eine Multi-Theming-fähige Präsentationsschicht umgesetzt. Es gibt keinerlei fachlichen Bezug und keine Datenübertragungsfunktionalitäten. Damit ist **KoliBri** für die Realisierung statischer Webseiten als auch dynamischer Webanwendungen unterschiedlicher Corporate Designs und Styleguides gleichermaßen wiederverwendbar und somit für Open Source sehr interessant.

## Lizenz

![Logo European Union Public Licence (EUPL)](https://joinup.ec.europa.eu/sites/default/files/styles/logo/public/collection/logo/2019-12/EUPL-logo-04%20%281%29.png?itok=4H40Q1GB)

**KoliBri** wird unter der [**EUROPEAN UNION PUBLIC LICENCE v. 1.2**](https://joinup.ec.europa.eu/sites/default/files/custom-page/attachment/eupl_v1.2_de.pdf) Open Source freigegeben. Folgende Aspekte sind insbesondere dadurch berücksichtigt:

- **Zugänglichmachung:** Die Artefakte und der Quellcode können von jedem frei und kostenlos wiederverwendet werden. Hierdurch leistet der ITZBund einen Beitrag im Sinne von ["Public Money - Public Code"](https://publiccode.eu/).
- **Gewährleistungs- und Haftungsausschluss:** Mit der Wiederverwendung gehen keinerlei Gewährleistung und Haftungsansprüche einher.
- **„Copyleft“-Klausel:** Copyleft besagt, dass jede Kopie von KoliBri (Fork) wieder unter der selben oder einer kompatiblen Open Source-Lizenz veröffentlicht werden muss.

## Anwendung erstellen

Im folgenden Video sehen Sie, wie Sie ganz einfach eine Webanwendung auf **KoliBri**-Basis erstellen können.

![Zeigt wie man mit create-kolibri eine neue App anlegen kann.](https://raw.githubusercontent.com/public-ui/.github/main/profile/create-kolibri.gif)

Aktuell können Sie eine `statische Webseite` oder Webanwendungen für die Frameworks `Angular`, `Astro`, `Preact`, `React`, `Solid` und `Next.js` generieren.

## Abgrenzung

![Darstellung, wie die Komponenten mittels verschiedener Styleguides zu kundenspezifischen Komponenten werden.](abgrenzung.jpg)

**KoliBri** stellt die Barrierefreiheit auf Ebene der webbasierten Komponenten sicher und bietet die ideale Grundlage zur Realisierung barrierefreier Benutzeroberflächen.

**KoliBri** ist kein CSS-Framework und auch kein Design System. **KoliBri** dient jedoch als konkrete Implementierung semantisch korrekter Komponenten für Styleguides und Design Systeme.

**KoliBri** kombiniert (technisch) die barrierefrei abgestimmten und standardisierten Komponenten mit beliebigen Designs zu jeweils robusten und kundenspezifischen Komponenten für dynamische Webanwendungen und statische Webseiten.

## Versionierung

**KoliBri** folgt den Prinzipien des semantischen Versionierens.

Aufbau einer Version:

<ul>
	<li>
		besteht in der Regel aus 3 Teilen (z.B. 1.0.2)
		<ul>
			<li>
				Major, hier die <i>1</i>
			</li>
			<li>
				Minor, hier die <i>0</i>
			</li>
			<li>
				Patch, hier die <i>2</i>
			</li>
		</ul>
	</li>
	<li>
		für die Härtungsphase einer Version, kann man zusätzlich Labels verwenden (z.B. 1.0.3-rc.2)
		<ul>
			<li>
				Label, hier die <i>rc.2</i>
			</li>
		</ul>
	</li>
</ul>

Folgende Hauptprinzipien kommen dabei zur Anwendung:

<ul>
	<li>
		<b>Patch</b>: Beinhaltet Änderungen die den aktuellen Funktionsumfang verbessern und in seiner Verwendung nicht ändern.
	</li>
	<li>
		<b>Minor</b>: Beinhaltet Änderungen die den Funktionsumfang erweitern und den bestehenden Funktionsumfang in seiner Verwendung nicht ändern.
	</li>
	<li>
		<b>Major</b>: Beinhaltet Änderungen die eine architektonische Neuausrichtung ermöglichen und den bestehenden Funktionsumfang in seiner Verwendung ändern
		dürfen.
	</li>
</ul>

Ausführliche Version der SemVer finden Sie hier: [https://semver.org](https://semver.org)

## Qualitätsziele

In der folgenden Tabelle werden die priorisierten Qualitäten von **KoliBri** aufgelistet:

| Qualität              | Priorität | Erläuterung                                                                                                                           |
| --------------------- | :-------: | ------------------------------------------------------------------------------------------------------------------------------------- |
| Kompatibilität        |    AAA    | W3C®-Standards, Framework-agnostisch und Open Source                                                                                  |
| Gebrauchstauglichkeit |    AAA    | BIK BITV- und Usability-Test                                                                                                          |
| Wartbarkeit           |    AAA    | DevOps, Technologie-Stack, Modularisierung und Automatisierung                                                                        |
| Portierbarkeit        |    AA     | Anpassbarkeit an verschiedene Styleguides des Bundes oder anderer                                                                     |
| Zuverlässigkeit       |    AA     | BIK BITV-, Axe-, Unit-, Snapshot-, E2E-Tests und Developer Experience (EX)                                                            |
| Performance           |     A     | KoliBri geht hier einen Kompromiss ein, da es die Entwicklung aktiv bei der Umsetzung barrierefreier Benutzeroberflächen unterstützt. |
| Sicherheit            |     A     | Web Components dienen der Präsentationsschicht und beinhalten selbst keine sensitiven Informationen.                                  |

## Geräte-, Betriebssystem-, Browser- und Screenreader-Anforderungen

**KoliBri** ist für die Umsetzung beliebiger webbasierter Benutzeroberflächen vorgesehen und soll auf allen modernen Geräten (PC, Tablet, Mobil), Betriebssystemen (Windows, Linux, MaxOS, Android, iOS) und standardkonformen Browsern eingesetzt werden können.

Der Microsoft Internet Explorer wird explizit nicht unterstützt, um das Projekt und die Entwicklung nicht durch Altlasten zu schwächen. **KoliBri** investiert stattdessen konziquent in die Zukunft.

| Gerät            | Betriebsystem               | Browser                                                      | Screenreader                            |
| ---------------- | --------------------------- | ------------------------------------------------------------ | --------------------------------------- |
| PC               | Windows<br/>Linux<br/>MacOS | Chrome<br/>Firefox<br/>Edge<br/>Opera<br/>Safari (nur MacOS) | NVDA<br/>Jaws<br/>VoiceOver (nur MacOS) |
| Tablet<br/>Mobil | Android<br/>iOS             | Chrome<br/>Firefox<br/>Edge<br/>Opera<br/>Safari (nur iOS)   | TalkBack (nur Android)                  |

## Let's go ...

- [Getting Started](./docs/GET_STARTED.md)
- [Contributing](./CONTRIBUTING.md)
- [Code of Conduct](./CODE_OF_CONDUCT.md)
- [Sicherheit](./docs/SECURITY.md)
