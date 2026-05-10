# Pomodoro-Timer

Ein kleines Widget zur Arbeitsunterstützung — fokussiert arbeiten nach dem Pomodoro-Prinzip.

## Was es ist

Eine reine Timer-App nach dem klassischen Pomodoro-Zyklus: 25 Minuten Arbeit, 5 Minuten Pause, und nach vier Arbeitssessions eine längere Pause von 15 Minuten. Desktop-Benachrichtigung am Phasenwechsel, dann geht es weiter.

Keine Statistik, keine Cloud, keine Konfiguration via UI. Es zählt nur die Zeit.

## Verwendung

Vier Buttons: **Start**, **Pause**, **Reset**, **Skip** (überspringt die aktuelle Phase). Ein Counter zeigt, in welcher der vier Sessions vor der langen Pause du steckst.

Beim ersten Start fragt die App nach Erlaubnis für Desktop-Benachrichtigungen — dann meldet sie jeden Phasenwechsel.

## Zeiten anpassen

Die Phasen-Längen (25 / 5 / 15 Minuten) und die Sessions-Anzahl bis zur langen Pause (4) sind als Konstanten am Anfang von `src/main.js` definiert. Wer andere Zeiten will, ändert die dort und baut neu.

## Installation

Aus den [GitHub-Releases](https://github.com/VibeCodeSolutions/Pomodoro-Timer/releases) das passende Build für deine Plattform laden. Version `1.0` ist das aktuelle Release.

## Build aus dem Quellcode

Tauri v2 + Vanilla JS, Standard-Setup:

```bash
pnpm install
pnpm tauri build
```

Braucht Rust-Toolchain und Plattform-Build-Tools — Details in der [Tauri-Doku](https://v2.tauri.app/start/prerequisites/).

## Technisch

Tauri v2 (Rust-Backend) + Vanilla JS (Frontend). Braucht kein Netzwerk, keinen Dateisystem-Zugriff, keine Shell. Einzige Permission: Desktop-Benachrichtigungen.

## Lizenz

MIT.
