---
slug: /konzepte/swippling
title: Swippling
description: Komplexere Anforderungen an die Komponenten können mittels Swippling ermöglicht werden.
tags:
  - Architektur
  - arc42
  - Konzept
---

## Motivation

Zahlreiche teils komplexe Anforderungen an Komponenten von Design Systemen oder Komponenten-Bibliotheken müssten nicht immer wieder aufs Neue betrachtet werden, wenn es kleinteilige gut wiederverwendbare Basis-Komponenten gäbe, die diese Anforderungen mit sich bringen.

## Definition

Unter Swippling definieren wir die Möglichkeit eine vorhandene Komponente entweder von Außen modifizieren zu können oder die innere Konstruktion zu ersetzen. Beides zahlt in eine hohe Wiederverwendbarkeit ein.

## Varianten

### Wrapping

Die einfachste Methode eine KoliBri-Komponente auf eigene Bedürfnisse anzupassen, ist das Wrapping. Hierbei wird eine eigene Komponente um die KoliBri-Komponente (Dekorator-Pattern) drumherum gebaut und außen individualisiert.

### Overwriting

Eine andere Variante des Swippling ist das Overwriting der inneren Komponenten-Konstruktion. Bei Web Components wird dies häufig mittels Slots gemacht. In KoliBri haben wir dafür die <kol-link _href="expert-slot" _label="Expert-Slots"></kol-link> eingeführt.
