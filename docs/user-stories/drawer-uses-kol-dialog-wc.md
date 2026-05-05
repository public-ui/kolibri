# User Story: KolDrawer verwendet KolDialogWc intern

## Story

**Als** Entwickler  
**möchte ich**, dass `kol-drawer` intern `kol-dialog-wc` verwendet,  
**damit** Dialog-Logik (aria-modal, ESC-Handling, isModal-State) nur an einer Stelle gepflegt wird und der Drawer automatisch von zukünftigen Dialog-Verbesserungen profitiert.

---

## Hintergrund

Aktuell dupliziert `KolDrawer` mehrere Verhaltensweisen, die bereits in `KolDialogWc` implementiert sind:

| Verhalten | KolDialogWc | KolDrawer |
|---|---|---|
| `aria-modal` Attribut | ✅ | ✅ (Duplikat) |
| `onCancel` (ESC-Unterdrückung) | ✅ | ✅ (Duplikat) |
| `@State() isModal` | ✅ | ✅ (Duplikat) |
| `KolEvent.close` dispatch | ✅ | ✅ (Duplikat) |
| `_label` / `_level` Validierung | ✅ | ✅ (Duplikat) |
| Natives `<dialog>`-Element | ✅ | ✅ (Duplikat) |

`KolDialogWc` wird bereits von `KolDialog` und `KolModal` genutzt. Der Drawer ist die einzige dialog-ähnliche Komponente, die sein eigenes `<dialog>`-Element direkt verwaltet.

---

## Akzeptanzkriterien

- [ ] `KolDrawer` rendert kein eigenes `<dialog>`-Element mehr, sondern delegiert an `kol-dialog-wc`
- [ ] `kol-dialog-wc` erhält ein `_on.onBeforeClose?: () => Promise<void>` Hook, damit der Drawer seinen Animations-Close-Flow (`slideOut` → erst dann `dialog.close()`) weiterhin steuern kann
- [ ] Die `_open`-Prop des Drawers funktioniert wie bisher (deklarativ, reaktiv)
- [ ] `_align`-Positionierung bleibt im Drawer (CSS `position: fixed`, richtungsabhängige Klassen)
- [ ] Alle bestehenden Tests (Snapshot, e2e, visuell) laufen weiterhin durch
- [ ] Kein Breaking Change am öffentlichen API von `kol-drawer`

---

## Technische Details

### Was sich ändern würde

**Jetzt:**
```
KolDrawer
  └── <dialog> (nativ, direkt)
        └── KolCardWcTag (immer gerendert, mit Animations-Klassen)
```

**Nach Refactor:**
```
KolDrawer
  └── kol-dialog-wc (_on.onBeforeClose Hook)
        └── <dialog> (nativ, in KolDialogWc)
              └── KolCardWcTag (Drawer-Slot)
```

### Notwendige Änderungen an KolDialogWc

`kol-dialog-wc` benötigt ein neues optionales Callback-Interface:

```ts
type KoliBriDialogEventCallbacks = {
  onClose?: EventCallback<Event>;
  onBeforeClose?: () => Promise<void>; // NEU: Drawer hängt hier seine Animation ein
};
```

`KolDialogWc.close()` würde dann:
1. `_on.onBeforeClose?.()` aufrufen und awaiten (Drawer-Animation läuft)
2. Erst danach `this.refDialog?.close()` aufrufen

### Einzigartiger Drawer-Animations-Close-Flow (bleibt erhalten)

```
close() aufgerufen
  → _open: false → CSS-Klasse kol-drawer__wrapper--is-closing
  → Theme triggert slideOut-Animation
  → animationend-Event: Name enthält "slideOut"
  → onBeforeClose Hook resolved
  → dialog.close() wird aufgerufen
  → KolEvent.close dispatched
```

Fallback: Wenn keine Animation aktiv (`animationName === 'none'`), resolved `onBeforeClose` sofort.

---

## Risiken & Offene Fragen

| Risiko | Bewertung |
|---|---|
| `onBeforeClose` ist Breaking Change am internen `KoliBriDialogEventCallbacks` | Mittel – nur internes API |
| Drawer braucht Ref auf `dialogWrapperElement` für `getComputedStyle` – durch Kapselung erschwert | Mittel – lösbar via Callback |
| Mehrere Shadow-DOM-Ebenen könnten CSS-Specificity-Probleme verursachen | Niedrig |
| Aufwand der Migration | Mittel (~1–2 Tage) |

---

## Empfehlung

**Nicht jetzt umsetzen.** Der Mehrwert der Deduplizierung (hauptsächlich `aria-modal`, `onCancel`) ist gering im Vergleich zum Umbauaufwand.

**Sinnvoll** wenn der Dialog substantiell erweitert wird – z.B. eingebautes Focus-Trapping, Transition-API oder ARIA-Verbesserungen – dann profitiert der Drawer automatisch ohne eigene Änderungen.
