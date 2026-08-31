# Neue Komponente erstellen

> Schritt-für-Schritt-Anleitung basierend auf dem [Skeleton Blueprint](../../packages/components/src/components/_skeleton/ARC42.md).

## Grundprinzipien

- Auflistungen werden immer alphabetisch sortiert
- Die [ARC42.md](../../packages/components/src/components/_skeleton/ARC42.md) ist die führende Architektur-Spezifikation — lies sie vollständig, bevor du eine neue Komponente erstellst
- **2-Schichten-Architektur**: Die Web Component ist der Orchestrator — es gibt keine separate Controller/Aspect-Schicht. Nur wirklich wiederverwendbare Logik wird als Behavior (`BaseBehavior`, z.B. `TooltipBehavior`) ausgegliedert
- Alle Web Components verwenden `shadow: true` — Komponenten ohne Shadow DOM werden als Functional Components implementiert
- Props leben in `src/internal/props/` mit eigenem `PropDefinition` pro Prop
- Kein toter Code, keine Barrel-Files, keine `types.ts`

## Checkliste

| Schritt | Kurzbeschreibung                                                                                              |
| :-----: | ------------------------------------------------------------------------------------------------------------- |
|    0    | Projekt starten                                                                                               |
|    1    | Tag-Name in Stencil-Konfiguration registrieren                                                                |
|    2    | Props erstellen oder vorhandene wiederverwenden (`src/internal/props/`)                                       |
|    3    | API-Definition erstellen (`api.tsx`) mit `PropsConfigShape` und `ApiFromConfig`                               |
|    4    | Functional Component erstellen (`component.tsx`) — stateless Renderer mit `BemRootNodeFC`                     |
|    5    | Web Component erstellen (`component.tsx`) — erweitert `BaseWebComponent<Api>`, orchestriert alle Logik selbst |
|    6    | Tests co-lokalisiert neben `component.tsx` erstellen                                                          |
|    7    | Beispiel in React-Sample-App anlegen                                                                          |
|    8    | Validierung: `pnpm format && pnpm lint && pnpm --filter @public-ui/components test:unit`                      |

## Schritt 0 — Projekt starten

Projekt starten, wie in [Contribution](../../CONTRIBUTING.md) beschrieben.

## Schritt 1 — Tag-Name registrieren

Den Tag-Namen der neuen Komponente in `packages/components/stencil.config.ts` registrieren.

## Schritt 2 — Props erstellen (Props-First!)

**Bevor die Komponente implementiert wird, müssen alle Props definiert sein.**

Pro Prop eine Datei unter `src/internal/props/`:

```typescript
// src/internal/props/name.ts
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

export type NameProp = SimpleProp<'name', string>;
export const nameProp = createPropDefinition<NameProp>('name', '', normalizeString);
```

- `SimpleProp<K, T>` wenn externer und interner Typ identisch sind
- `Prop<K, TExternal, TInternal>` wenn sich die Typen unterscheiden (z.B. `ColorProp`)
- Export in `src/internal/props/index.ts` hinzufügen
- Bestehende Props aus `index.ts` wiederverwenden, wenn möglich

Details: [ARC42 §4 — Schema Helper Layer](../../packages/components/src/components/_skeleton/ARC42.md#schema-helper-layer)

## Schritt 3 — API-Definition

Datei: `src/internal/functional-components/<component>/api.tsx`

```typescript
import { nameProp } from '../../props';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

export const myComponentPropsConfig = {
	required: [nameProp],
	// optional: [showProp],
} as const satisfies PropsConfigShape;

export type MyComponentApi = ApiFromConfig<
	typeof myComponentPropsConfig,
	{
		// Nur definieren, was die Komponente tatsächlich nutzt:
		// Callbacks: { click: () => void };
		// Emitters: { change: string };
		// Methods: { focus: () => void };
		// States: { count: number };
		// Refs: { button: HTMLButtonElement };
		// Listeners: { keydown: KeyboardEvent };
	}
>;
```

Details: [ARC42 §4 — API Definition with PropsConfigShape](../../packages/components/src/components/_skeleton/ARC42.md#api-definition-with-propsconfigshape-and-apifromconfig)

## Schritt 4 — Functional Component

Datei: `src/internal/functional-components/<component>/component.tsx`

```tsx
import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';
import { BemRootNodeFC } from '../bem-root-node/component';
import type { FunctionalComponentProps } from '../generic-types';
import type { MyComponentApi } from './api';

export const MyComponentFC: FC<FunctionalComponentProps<MyComponentApi>> = ({ name }) => {
	return (
		<BemRootNodeFC block="kol-my-component">
			<span class="kol-my-component__name">{name}</span>
		</BemRootNodeFC>
	);
};
```

- Stateless, keine Seiteneffekte
- Genau ein Root-Node via `BemRootNodeFC`: Der `block` und die optionalen `modifiers` werden gegen `KoliBriComponentsBemSchema` in `src/schema/bem-registry.ts` typgeprüft — der Block muss dort **zweifach registriert** sein: im exportierten Typ `KoliBriComponentsBemSchema` (Kompilierung) und im Runtime-`BEM`-Const (konsumiert vom kolibri-cli SCSS-Generator). Nur-Typ-Registrierung kompiliert, bricht aber lautlos die Theme-SCSS-Generierung
- `BemRootNodeFC` rendert immer ein `<div>` als Root. Für FCs mit anderem semantischem Root (z.B. `<button>`, siehe `ClickButtonFC`) stattdessen `bem.forBlock('kol-xxx')(modifiers)` direkt nutzen
- Details: [ARC42 §4 — Functional Component Layer](../../packages/components/src/components/_skeleton/ARC42.md#functional-component-layer)

## Schritt 5 — Web Component

Datei: `src/components/<component>/component.tsx`

Die Web Component ist der **Orchestrator**: Sie erweitert `BaseWebComponent<Api>` direkt und absorbiert die gesamte Logik (Prop-Normalisierung, State, Lifecycle) — es gibt keine separate Controller/Aspect-Klasse.

```tsx
import type { JSX } from '@stencil/core';
import { Component, h, Host, Prop, Watch } from '@stencil/core';
import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import type { MyComponentApi } from '../../internal/functional-components/my-component/api';
import { myComponentPropsConfig } from '../../internal/functional-components/my-component/api';
import { MyComponentFC } from '../../internal/functional-components/my-component/component';
import { nameProp } from '../../internal/props';

@Component({
	tag: 'kol-my-component',
	shadow: true,
})
export class KolMyComponent extends BaseWebComponent<MyComponentApi> implements WebComponentInterface<MyComponentApi> {
	@Prop()
	public _name!: string;

	@Watch('_name')
	public watchName(value?: string): void {
		nameProp.apply(value, (v) => this.setRenderProp('name', v));
	}

	public componentWillLoad(): void {
		this.initRenderProps(myComponentPropsConfig);
		this.watchName(this._name);
	}

	public render(): JSX.Element {
		return (
			<Host>
				<MyComponentFC name={this.getRenderProp('name')} />
			</Host>
		);
	}
}
```

- `componentWillLoad()` ruft zuerst `this.initRenderProps(propsConfig)` auf und wendet danach alle Props an (Prop-Dreieck: Deklaration, `@Watch()`, Init)
- Watcher rufen die Prop-Factory direkt auf: `nameProp.apply(value, (v) => this.setRenderProp('name', v))`
- `@State`-Felder werden über `this.setState(key, value)` / `this.getState(key)` verwaltet und im `render()` direkt übergeben
- Immer `shadow: true` und `<Host>` ohne Klassen-Attribut
- `@Watch` nur auf unterstrichene Props
- Wiederverwendbare Logik für mehrere Komponenten wird als Behavior ausgegliedert (`BaseBehavior`, z.B. `TooltipBehavior`): `private readonly tooltipBehavior = new TooltipBehavior(this.stateAccess)` — Details: [ARC42 §4 — Behavior Layer](../../packages/components/src/components/_skeleton/ARC42.md#behavior-layer)
- Details: [ARC42 §4 — Web Component Layer](../../packages/components/src/components/_skeleton/ARC42.md#web-component-layer)

Wenn ein Behavior garantiert kein `@State` benötigt, verwende den Sentinel:

```typescript
private readonly myBehavior = new MyBehavior(BaseWebComponent.stateLess);
```

## Schritt 6 — Tests

Tests liegen **direkt neben** `component.tsx` — kein `test/`-Unterordner.

**Snapshot-Test** (`snapshot.spec.tsx`):

```tsx
import { executeSnapshotTests } from '../../utils/testing';
import { KolMyComponent } from './component';

const TAG = 'kol-my-component';

type Props = {
	_name: string;
};

executeSnapshotTests<Props>(TAG, [KolMyComponent], [{ _name: 'Test' }, { _name: '' }]);
```

**Interaction-Test** (`interaction.e2e.ts`):

```typescript
import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('kol-my-component', () => {
	test.beforeEach(async ({ page }) => {
		await page.setContent('<kol-my-component _name="Test"></kol-my-component>');
	});

	test('should render the name', async ({ page }) => {
		await expect(page.locator('kol-my-component')).toBeVisible();
	});
});
```

Details: [ARC42 §9 — Design Decision 11](../../packages/components/src/components/_skeleton/ARC42.md#9-design-decisions)

## Schritt 7 — Beispiel in React-Sample-App

Datei: `packages/samples/react/src/scenarios/<component>.tsx`

Anschließend die Route in `packages/samples/react/src/scenarios/routes.ts` registrieren.

Zum Testen:

```bash
cd packages/samples/react
pnpm start
# Navigiere zu http://localhost:9191
```

## Schritt 8 — Validierung

```bash
pnpm format        # ~10 Sekunden
pnpm lint          # ~1 Minute, NICHT abbrechen
pnpm --filter @public-ui/components test:unit # ~2-3 Minuten, NICHT abbrechen
```

Alle drei Befehle müssen fehlerfrei durchlaufen.

## Referenz

Die vollständige Referenzimplementierung findet sich im Skeleton Blueprint:

- **Architektur**: [`_skeleton/ARC42.md`](../../packages/components/src/components/_skeleton/ARC42.md)
- **Agent-Instruktionen**: [`_skeleton/AGENTS.md`](../../packages/components/src/components/_skeleton/AGENTS.md)
- **Refactoring-Leitfaden**: [`_skeleton/REFACTORING_PROMPT.md`](../../packages/components/src/components/_skeleton/REFACTORING_PROMPT.md)
