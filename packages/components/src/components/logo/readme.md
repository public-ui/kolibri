# Logo

> **[DEPRECATED]**: Das Logo wird eine interne Komponente.

Mit Hilfe der **Logo**-Komponente können an beliebigen Positionen die Logos verschiedener Bundesinstitutionen ausgegeben werden. Das Logo wird dabei aus einer Sammlung von SVG-Grafiken zusammengesetzt, die fertig konstruiert vorliegen.

## Konstruktion

### Code

```html
<kol-logo _org="BReg"></kol-logo>
```

### Beispiel

<kol-logo _org="BReg"></kol-logo>

## Verwendung

Das Attribut **`_org`** wird für die Definition des gewünschten Logos verwendet. Es sind folgende Parameter möglich:

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

<!-- Auto Generated Below -->

> **[DEPRECATED]**

## Properties

| Property            | Attribute | Description                                                                    | Type                                              | Default     |
| ------------------- | --------- | ------------------------------------------------------------------------------ | ------------------------------------------------- | ----------- |
| `_org` _(required)_ | `_org`    | Gibt die Abkürzung eines Ministeriums, eines Amts oder einer Bundesanstalt an. | `Bundesamt \| Bundesanstalt \| Bundesministerium` | `undefined` |

---
