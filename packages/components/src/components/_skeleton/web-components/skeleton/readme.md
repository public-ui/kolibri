# kol-skeleton

## Worum geht's?

Der Beispiel-\<kol-skeleton\>-Baustein zeigt, wie eine KoliBri-Webkomponente aufgebaut ist und als Blaupause für eigene Implementierungen dient.

## Wann verwenden

Nutze die Komponente, wenn du das Zusammenspiel aus Web Component, Controller und Funktionskomponenten verstehen möchtest. Für produktive Oberflächen ist sie nicht vorgesehen.

## Voraussetzungen

- Stencil-Projekt mit eingebundenem KoliBri-Paket
- Grundlagen zu den [generischen Typen](../../GENERICS.md)

## Anleitung

1. Setze das Tag `<kol-skeleton>` in dein Markup.
2. Übergib `_name` (Pflicht) und optional `_show`.
3. Reagiere auf das `loaded`-Event, um den Ladefortschritt zu verfolgen.

## Beispiele

```html
<kol-skeleton _name="KoliBri" _show="true" onLoaded="console.log(event.detail)"></kol-skeleton>
```

## FAQ/Fehlerbehebung

- Ohne `_show` bleibt die Ausgabe verborgen.
- Eventuell fehlende Typinformationen lassen sich über den `SkeletonController` beheben.
- Weitere Typdetails stehen in [GENERICS.md](../../GENERICS.md).
