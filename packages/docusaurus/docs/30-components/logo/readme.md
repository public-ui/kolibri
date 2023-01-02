# Logo

Mit Hilfe der **Logo**-Komponente können an beliebigen Positionen Logos ausgegeben werden. Die zur Verfügung stehenden Logos entstammen aus dem Umfeld
der Bundesinstitutionen. Die **Logo**-Komponente rendert an beliebiger Position auf der Webseite ein Logo, das über ein Attribut definiert wird. Das Logo wird dabei aus einer
Sammlung von SVG-Grafiken zusammengesetzt, die fertig konstruiert vorliegen. Die Ausgabe des Logos kann über das Attribut **style** definiert werden.

## Konstruktion

### Code

```tsx
<div>
	<kol-logo _abbr="BReg"></kol-logo>
</div>
```

### Beispiel

<kol-logo _abbr="BReg"></kol-logo>

## Verwendung

Das Attribut `_abbr` wird für die Definition des gewünschten Logos verwendet. Es sind folgende Parameter möglich:

**BReg** = **_Die Bundesregierung_**

**BMF** = **_Bundesministerium der Finanzen_**

**BMI** = **_Bundesministerium des Innern, für Bau und Heimat_**

**AA** = **_Auswärtiges Amt_**

**BMWi** = **_Bundesministerium für Wirtschaft und Energie_**

**BMJV** = **_Bundesministerium der Justiz und für Verbraucherschutz_**

**BMAS** = **_Bundesministerium für Arbeit und Soziales_**

**BMVg** = **_Bundesministerium der Verteidigung_**

**BMEL** = **_Bundesministerium für Ernährung und Landwirtschaft_**

**BMFSFJ** = **_Bundesministerium für Familie, Senioren, Frauen und Jugend_**

**BMG** = **_Bundesministerium für Gesundheit_**

**BMVI** = **_Bundesministerium für Verkehr und digitale Infrastruktur_**

**BMU** = **_Bundesministerium für Umwelt, Naturschutz und nukleare Sicherheit_**

**BMBF** = **_Bundesministerium für Bildung und Forschung_**

**BMZ** = **_Bundesministerium für wirtschaftliche Zusammenarbeit und Entwicklung_**

<!--### Best practices

### Anwendungsfälle-->

## Barrierefreiheit

<!--## Links und Referenzen

<!-- Auto Generated Below -->

## Properties

| Property            | Attribute | Description                                                                                                                                                                      | Type                                                           | Default     |
| ------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- | ----------- |
| `_abbr`             | `_abbr`   | <span class="text-red-500">**[DEPRECATED]**</span> Verwende stattdessen das Property \_org.<br/><br/>Gibt die Abkürzung eines Ministeriums, eines Amts oder einer Bundesanstalt an. | `Bundesamt \| Bundesanstalt \| Bundesministerium \| undefined` | `undefined` |
| `_org` _(required)_ | `_org`    | Gibt die Abkürzung eines Ministeriums, eines Amts oder einer Bundesanstalt an.                                                                                                   | `Bundesamt \| Bundesanstalt \| Bundesministerium`              | `undefined` |

---
