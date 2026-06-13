# Out-of-Scope-Optimierung: Button-Embedding-API vollständig vereinheitlichen

> Status: **Vorschlag / nicht umgesetzt** (bewusst außerhalb des aktuellen PR-Scopes).
> Kontext-PR: public-ui/kolibri#10377 (Branch `claude/eloquent-fermat-9wfves`).
> Voraussetzung: Die bereits gemergten/anstehenden Commits dieses Branches
> (`applyProps` + Umstellung der Hand-Sites + ARC42-Doku).

## Problem / verbleibende Kante

Nach der „Brücke glätten"-Umsetzung gibt es für das Einbetten eines Buttons **zwei** Wege:

1. **`ctrl.applyProps({ label, disabled, … , value })`** — für Sites, die die Button-Props
   **von Hand** aufbauen (clean benannt, typsicher). Das ist der gewünschte Standardweg.
2. **`initButtonControllerFromProps(ctrl, { ...bag, _override })`** — für die wenigen Sites, die ein
   **echtes öffentliches `_`-Bag** durchreichen (der Wert stammt aus einem externen KoliBri-Prop-Objekt,
   trägt also `_`-Präfixe von außen).

Diese Koexistenz ist die einzige verbliebene Lernkurven-Kante: Ein neuer Contributor muss wissen, **wann**
welcher Weg gilt. Außerdem bleibt `initButtonControllerFromProps` der letzte **un-typisierte** Eingang
(`Partial<Record<string, unknown>>` + interne `as`-Casts).

### Betroffene Bag-Sites (Stand Branch)

- `components/badge/shadow.tsx` — `{ ...props, _ariaControls, _hideLabel }` (`props: InternalButtonProps`)
- `components/toolbar/shadow.tsx` — `{ ...element, _tabIndex, _variant }`
- `functional-components/Button/Button.tsx` — `{ ...other, _label, _disabled, … , _on }`
- `components/table-stateless/component.tsx:~956` — `initButtonControllerFromProps(buttonCtrl, buttonProps)`

## Ziel

Genau **einen** typisierten Embedding-Eingang (`applyProps`) für **alle** Sites — auch die Bag-Sites —
ohne die Wiederverwendbarkeit oder die Validierung anzutasten.

## Vorgeschlagener Ansatz

### 1. Generischer, typsicherer `stripUnderscore`-Adapter

Ein kleiner, **rein mechanischer** Mapper, der die `_`-Präfixe eines öffentlichen Bags entfernt und dabei
die Typen 1:1 abbildet (Mapped Type), statt 20 handgeschriebener `as`-Casts:

```ts
// internal/functional-components/strip-underscore.ts (Vorschlag)
type StripUnderscore<T> = {
	[K in keyof T as K extends `_${infer R}` ? R : K]: T[K];
};

export function stripUnderscore<T extends Record<string, unknown>>(bag: T): StripUnderscore<T> {
	const out: Record<string, unknown> = {};
	for (const key in bag) out[key.startsWith('_') ? key.slice(1) : key] = bag[key];
	return out as StripUnderscore<T>;
}
```

- **Generisch & wiederverwendbar** — funktioniert für jedes `_`-Bag (auch Link-/andere Embedder später).
- **Keine Validierungs-Berührung**: liefert nur umbenannte Keys; der Wert-Pfad bleibt
  `applyProps → componentWillLoad → watch* → *Prop.apply` (das „absolute Muss" bleibt erhalten).

### 2. Bag-Sites auf `applyProps` umstellen

```ts
// vorher (badge)
initButtonControllerFromProps(this.smartButtonCtrl, { ...props, _ariaControls: this.id, _hideLabel: true });

// nachher
this.smartButtonCtrl.applyProps({ ...stripUnderscore(props), ariaControls: this.id, hideLabel: true });
```

- `value` wird vom Bag automatisch mit übernommen (Bags enthalten ggf. `_value` → `value`), passend zur
  `applyProps`-Signatur `ResolvedInputProps<ButtonApi> & { value?: StencilUnknown }`.
- Edge-Case `functional-components/Button/Button.tsx`: die `_on`-Präzedenz beibehalten
  (`on: onClick ? { ...stripUnderscore(other).on, onClick } : … }`) — vor der Umstellung genau prüfen.
- Edge-Case `table-stateless:956`: `buttonProps` ist eine Variable; Typ des Bags muss zu
  `StripUnderscore<…>` passen — ggf. den Quelltyp von `buttonProps` schärfen.

### 3. `initButtonControllerFromProps` entfernen

Nach Umstellung aller Bag-Sites ist die Funktion ungenutzt → löschen (inkl. Re-Exports). Damit gibt es
**einen** Embedding-Weg und **keinen** un-typisierten Eingang mehr.

## Warum out of scope

- Der aktuelle PR sollte **risikoarm** bleiben („Brücke glätten") und die Struktur (Cache/`stateLess`/
  feed-in-render) unangetastet lassen.
- `stripUnderscore` als neues geteiltes Utility + Entfernen einer öffentlichen Hilfsfunktion ist eine
  eigenständige, breiter wirkende Änderung (Mapped-Type-Korrektheit, Edge-Cases bei `_on`/Variablen-Bags),
  die einen eigenen, fokussierten Review verdient.
- Mittel-/langfristig wird sie teils obsolet: Sobald die Consumer selbst **Skeletons** werden, liefern ihre
  eigenen Controller bereits clean validierte Werte (`getRenderProp`) — dann entfällt das Bag-Spreading an
  vielen Stellen ohnehin (siehe „Komposition als Ziel-Pattern").

## Nutzen

- **Eine** typisierte Embedding-API (`applyProps`) für alle Sites → flachere Lernkurve, keine
  „wann welcher Weg?"-Entscheidung mehr.
- Letzter un-typisierter Eingang (`initButtonControllerFromProps`) verschwindet → durchgängige Typprüfung.
- `stripUnderscore` ist wiederverwendbar für künftige Bag-Boundaries (z. B. Link-Embedder).

## Verifikation (bei Umsetzung)

1. **tsc-Diff gegen Baseline**: `tsc --noemit` vorher/nachher — **0 neue** Fehler (außer bekanntem
   Codegen-Rauschen `HTMLKol*`/`components.d`). Der `StripUnderscore`-Mapped-Type muss jede Bag-Site
   ohne `as`-Casts auflösen.
2. **Snapshots unverändert** für badge, toolbar, table-stateless + alle Consumer von
   `functional-components/Button` (Alert, Collapsible, …): reines Wiring-Refactoring, gleiches Markup.
3. **ESLint-Diff**: keine neuen Probleme; `initButtonControllerFromProps`-Import-Reste entfernt.
4. **Konsistenz**: `grep -r "initButtonControllerFromProps" packages/components/src` → leer (Funktion und
   alle Aufrufe entfernt).
5. **`_on`-Präzedenz-Test** (Button-FC mit direktem `onClick` + Bag-`_on`): Klick ruft beide korrekt auf.

## Nicht Teil dieser Optimierung

- Cache-Absicherung von `getEmbeddedButtonController` (eigener Punkt).
- Embed-Rezept-JSDoc bei `renderButtonFC`/`applyProps` (eigener Punkt).
- Skeleton-Migration der Consumer + Controller-Komposition (größeres, separates Vorhaben).
