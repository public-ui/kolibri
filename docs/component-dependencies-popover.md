# Komponentenabhängigkeiten: Split-Button

## Abhängigkeitsdiagramm

```mermaid
graph TB
    subgraph SB["kol-split-button"]
        BTN1["kol-button-wc (Primär-Button)"]
        subgraph PB_WC["kol-popover-button-wc"]
            BTN2["kol-button-wc (Trigger-Button)"]
            PFC["PopoverFC"]
            PCTRL["PopoverController"]
        end
    end
```

## Beschreibung

| Komponente              | Rolle                                    | Abhängigkeiten                                    |
| ----------------------- | ---------------------------------------- | ------------------------------------------------- |
| `kol-split-button`      | Primärer Einstiegspunkt                  | `kol-button-wc`, `kol-popover-button-wc`          |
| `kol-popover-button-wc` | Dropdown-Logik                           | `kol-button-wc`, `PopoverFC`, `PopoverController` |
| `kol-button-wc`         | Button (Primär & Trigger)                | –                                                 |
| `PopoverFC`             | Internes Functional Component            | –                                                 |
| `PopoverController`     | Steuerung (öffnen/schließen/Ausrichtung) | –                                                 |
