# Snapshot-Tests optimieren

## Wichtig für Performance

Nur zwei Faktoren bestimmen die Geschwindigkeit:

1. **CI=0** – Aktiviert parallele Workers, deaktiviert Retries
2. **Workers > 1** – Parallele Testausführung

Alles andere (Browser-Selection, Docker-Overhead, Test-Anzahl) hat im Vergleich dazu keinen nennenswerten Einfluss.

---

## Die zwei Performance-Treiber

### 1. CI=0 setzen

Das Skript setzt `CI=\${KOLIBRI_SNAPSHOT_CI:-0}`.

**CI=0:**

```javascript
workers: undefined; // = CPU-Kerne (typisch 8-16)
retries: 0;
```

**CI=1:**

```javascript
workers: 1;
retries: 2;
```

### 2. Workers erhöhen

```bash
node scripts/snapshots-docker.mjs default --check -- --workers=4 --grep "Button"
```

Mehr Worker = mehr RAM. Empfehlung: 4-8 Workers.

---

## Benchmarks

| Konfiguration   | Dauer Button-Tests         |
| --------------- | -------------------------- |
| 1 Worker, CI=1  | 55.7s                      |
| 4 Workers, CI=0 | **17.8s** (3.1x schneller) |

Mit `CI=0` und `--workers=4` bist du über 3x schneller.

---

## Befehle

### Schnelle Tests während Entwicklung

```bash
node scripts/snapshots-docker.mjs default --check -- --workers=4 --grep "Button"
```

### CI-konsistente Validierung (vor Release)

```bash
KOLIBRI_SNAPSHOT_CI=1 node scripts/snapshots-docker.mjs default --check
```

Dies setzt `CI=1` zurück für exakt CI-Verhalten (workers=1, retries=2).

---
