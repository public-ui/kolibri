# kol-click-button

## Worum geht's?

`kol-click-button` stellt einen einfachen Button dar, der Klicks entgegennimmt und die Struktur von Unterkomponenten demonstriert.

## Wann verwenden

Verwende den Button als Beispiel für interaktive Kindkomponenten oder zum Testen eigener Controller-Logik.

## Voraussetzungen

- Bestandteil des Skeleton-Beispiels
- Verständnis der [generischen Typen](../../GENERICS.md)

## Anleitung

1. Binde `<kol-click-button>` ein.
2. Übergebe einen `_label`-Text.
3. Reagiere bei Bedarf auf native `click`-Events.

## Beispiele

```html
<kol-click-button _label="Drücken"></kol-click-button>
```

## FAQ/Fehlerbehebung

- Der Controller protokolliert Klicks über `console.log`.
- Eigene Aktionen lassen sich über eine angepasste Controller-Implementierung einfügen.
- Details zu Generics in [GENERICS.md](../../GENERICS.md).
