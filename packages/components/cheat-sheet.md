# Cheat Sheet

## Unified properties

| Property | Type | Descriptions |
| --- | --- | --- |
| _tab-index | number | Gibt an, welchen Tab-Index der Button hat. (https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) |
| _tab-index | number | Gibt an, welchen Tab-Index dieses Input hat. |
| _disabled | boolean | Gibt an, ob der Button deaktiviert ist. |
| _disabled | boolean | Gibt an, ob der Link deaktiviert ist. |
| _disabled | boolean | Setzt das Feld in einen inaktiven Zustand, in dem es keine Interaktion erlaubt. |
| _icon | KoliBriHorizontalIcon & KoliBriVerticalIcon &#124; string, string, string &#124; { checked: string; indeterminate?: string &#124; undefined; unchecked?: string &#124; undefined; } & { checked?: string &#124; undefined; indeterminate: string; unchecked?: string &#124; undefined; } & { checked?: string &#124; undefined; indeterminate?: string &#124; undefined; unchecked: string; }, string &#124; { right?: IconOrIconClass &#124; undefined; left?: IconOrIconClass &#124; undefined; } | Ermöglicht das Anzeigen von Icons links und/oder rechts am Rand des Eingabefeldes. |
| _icon | KoliBriHorizontalIcon & KoliBriVerticalIcon &#124; string, string, string &#124; { checked: string; indeterminate?: string &#124; undefined; unchecked?: string &#124; undefined; } & { checked?: string &#124; undefined; indeterminate: string; unchecked?: string &#124; undefined; } & { checked?: string &#124; undefined; indeterminate?: string &#124; undefined; unchecked: string; }, string &#124; { right?: IconOrIconClass &#124; undefined; left?: IconOrIconClass &#124; undefined; } | Ermöglicht das Überschreiben der Icons für die Checkbox. |
| _icon | KoliBriHorizontalIcon & KoliBriVerticalIcon &#124; string, string, string &#124; { checked: string; indeterminate?: string &#124; undefined; unchecked?: string &#124; undefined; } & { checked?: string &#124; undefined; indeterminate: string; unchecked?: string &#124; undefined; } & { checked?: string &#124; undefined; indeterminate?: string &#124; undefined; unchecked: string; }, string &#124; { right?: IconOrIconClass &#124; undefined; left?: IconOrIconClass &#124; undefined; } | Iconklasse (z.B.: "codicon codicon-home") |
| _icon | KoliBriHorizontalIcon & KoliBriVerticalIcon &#124; string, string, string &#124; { checked: string; indeterminate?: string &#124; undefined; unchecked?: string &#124; undefined; } & { checked?: string &#124; undefined; indeterminate: string; unchecked?: string &#124; undefined; } & { checked?: string &#124; undefined; indeterminate?: string &#124; undefined; unchecked: string; }, string &#124; { right?: IconOrIconClass &#124; undefined; left?: IconOrIconClass &#124; undefined; } | Setzt die Iconklasse (z.B.: `_icon="codicon codicon-home`). |
| _id | string | Gibt die ID an, wenn z.B. Aria-Labelledby (Link) verwendet wird. |
| _id | string | Gibt die ID der Schaltfläche an. |
| _id | string | Gibt die ID der Schaltfläche an. (Selection, Testing) |
| _id | string | Gibt die technische ID des Eingabefeldes an. |
| _alert | boolean | Gibt an, ob der Screenreader die Meldung vorlesen soll. |
| _alert | boolean | Gibt an, ob die Fehlermeldung vorgelesen werden soll, wenn es eine gibt. |
| _access-key | string | Gibt an, mit welcher Tastenkombination man das Input auslösen oder fokussieren kann. |
| _access-key | string | Gibt an, mit welcher Tastenkombination man den Button auslösen oder fokussieren kann. |
| _value | Date &#124; `${number}-${number}-${number}T${number}:${number}:${number}` &#124; `${number}-${number}-${number}T${number}:${number}` &#124; `${number}-${number}-${number}` &#124; `${number}-${number}` &#124; `${number}-W${number}` &#124; `${number}:${number}:${number}` &#124; `${number}:${number}` &#124; null, W3CInputValue[] &#124; string, `${number}-${number}-${number}T${number}:${number}:${number}` &#124; `${number}-${number}-${number}T${number}:${number}` &#124; `${number}-${number}-${number}` &#124; `${number}-${number}` &#124; `${number}-W${number}` &#124; `${number}:${number}:${number}` &#124; `${number}:${number}` &#124; null &#124; number, number, number &#124; string, string | Gibt an, wie weit die Anzeige fortgeschritten ist. |
| _value | Date &#124; `${number}-${number}-${number}T${number}:${number}:${number}` &#124; `${number}-${number}-${number}T${number}:${number}` &#124; `${number}-${number}-${number}` &#124; `${number}-${number}` &#124; `${number}-W${number}` &#124; `${number}:${number}:${number}` &#124; `${number}:${number}` &#124; null, W3CInputValue[] &#124; string, `${number}-${number}-${number}T${number}:${number}:${number}` &#124; `${number}-${number}-${number}T${number}:${number}` &#124; `${number}-${number}-${number}` &#124; `${number}-${number}` &#124; `${number}-W${number}` &#124; `${number}:${number}:${number}` &#124; `${number}:${number}` &#124; null &#124; number, number, number &#124; string, string | Gibt den Schlüssel/Namen der Checkbox an. ({ [value]: [checked] }) |
| _value | Date &#124; `${number}-${number}-${number}T${number}:${number}:${number}` &#124; `${number}-${number}-${number}T${number}:${number}` &#124; `${number}-${number}-${number}` &#124; `${number}-${number}` &#124; `${number}-W${number}` &#124; `${number}:${number}:${number}` &#124; `${number}:${number}` &#124; null, W3CInputValue[] &#124; string, `${number}-${number}-${number}T${number}:${number}:${number}` &#124; `${number}-${number}-${number}T${number}:${number}` &#124; `${number}-${number}-${number}` &#124; `${number}-${number}` &#124; `${number}-W${number}` &#124; `${number}:${number}:${number}` &#124; `${number}:${number}` &#124; null &#124; number, number, number &#124; string, string | Gibt den Wert der Radio an. (Known Bug: https://github.com/ionic-team/stencil/issues/3902) |
| _value | Date &#124; `${number}-${number}-${number}T${number}:${number}:${number}` &#124; `${number}-${number}-${number}T${number}:${number}` &#124; `${number}-${number}-${number}` &#124; `${number}-${number}` &#124; `${number}-W${number}` &#124; `${number}:${number}:${number}` &#124; `${number}:${number}` &#124; null, W3CInputValue[] &#124; string, `${number}-${number}-${number}T${number}:${number}:${number}` &#124; `${number}-${number}-${number}T${number}:${number}` &#124; `${number}-${number}-${number}` &#124; `${number}-${number}` &#124; `${number}-W${number}` &#124; `${number}:${number}:${number}` &#124; `${number}:${number}` &#124; null &#124; number, number, number &#124; string, string | Gibt den Wert des Eingabefeldes an. |
| _hide-label | boolean | Blendet den Text aus und zeigt nur das gewählte Icon an, der Text wird in den Tooltip verschoben. |
| _hide-label | boolean | Versteckt das sichtbare Label des Elements. |
| _touched | boolean | Gibt an, ob dieses Eingabefeld von Nutzer:innen einmal besucht/berührt wurde. |
| _name | string | Gibt den technischen Namen des Eingabefeldes an. |
| _hint | string | Gibt den Hinweistext an. |
| _error | string | Gibt den Text für eine Fehlermeldung an. |
| _aria-label | string | Gibt an, was der Screenreader ausgeben soll |
| _aria-label | string | Gibt das Aria-Label am Icon an. |
| _aria-label | string | Gibt den Text an, der die Navigation von anderen Navigationen differenziert. |
| _aria-label | string | Gibt einen beschreibenden Text des Buttons an.  (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label) |
| _aria-label | string | Gibt einen beschreibenden Text des Links an.  (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label) |
| _aria-label | string | Gibt einen beschreibenden Text für den Screenreader an. Damit dieSprachsteuerung von interaktiven Elementen funktioniert, muss derAria-Label-Text mit dem Label-Text des Buttons beginnen.- https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label |
| _type | "bar" &#124; "cycle", "button" &#124; "checkbox" &#124; "default" &#124; "switch", "button" &#124; "reset" &#124; "submit", "date" &#124; "datetime-local" &#124; "month" &#124; "number" &#124; "time" &#124; "week", "date" &#124; "datetime-local" &#124; "month" &#124; "time" &#124; "week", "default" &#124; "error" &#124; "info" &#124; "success" &#124; "warning", "search" &#124; "tel" &#124; "text" &#124; "url" | Gibt an, ob der Prozess als Balken oder Kreis dargestellt wird. |
| _type | "bar" &#124; "cycle", "button" &#124; "checkbox" &#124; "default" &#124; "switch", "button" &#124; "reset" &#124; "submit", "date" &#124; "datetime-local" &#124; "month" &#124; "number" &#124; "time" &#124; "week", "date" &#124; "datetime-local" &#124; "month" &#124; "time" &#124; "week", "default" &#124; "error" &#124; "info" &#124; "success" &#124; "warning", "search" &#124; "tel" &#124; "text" &#124; "url" | Gibt an, ob es ein DateTime-, Date-, Month-, Week-, Time-, DateTime-Local-, Number-Eingabefeld ist. |
| _type | "bar" &#124; "cycle", "button" &#124; "checkbox" &#124; "default" &#124; "switch", "button" &#124; "reset" &#124; "submit", "date" &#124; "datetime-local" &#124; "month" &#124; "number" &#124; "time" &#124; "week", "date" &#124; "datetime-local" &#124; "month" &#124; "time" &#124; "week", "default" &#124; "error" &#124; "info" &#124; "success" &#124; "warning", "search" &#124; "tel" &#124; "text" &#124; "url" | Gibt an, ob es ein Text-, Suche-, URL- oder Telefon-Eingabefeld ist. |
| _type | "bar" &#124; "cycle", "button" &#124; "checkbox" &#124; "default" &#124; "switch", "button" &#124; "reset" &#124; "submit", "date" &#124; "datetime-local" &#124; "month" &#124; "number" &#124; "time" &#124; "week", "date" &#124; "datetime-local" &#124; "month" &#124; "time" &#124; "week", "default" &#124; "error" &#124; "info" &#124; "success" &#124; "warning", "search" &#124; "tel" &#124; "text" &#124; "url" | Gibt an, ob es sich um eine Erfolgs-, Info-, Warnung- oder Fehlermeldung handelt. |
| _type | "bar" &#124; "cycle", "button" &#124; "checkbox" &#124; "default" &#124; "switch", "button" &#124; "reset" &#124; "submit", "date" &#124; "datetime-local" &#124; "month" &#124; "number" &#124; "time" &#124; "week", "date" &#124; "datetime-local" &#124; "month" &#124; "time" &#124; "week", "default" &#124; "error" &#124; "info" &#124; "success" &#124; "warning", "search" &#124; "tel" &#124; "text" &#124; "url" | Gibt an, welche Typ der Button hat. |
| _type | "bar" &#124; "cycle", "button" &#124; "checkbox" &#124; "default" &#124; "switch", "button" &#124; "reset" &#124; "submit", "date" &#124; "datetime-local" &#124; "month" &#124; "number" &#124; "time" &#124; "week", "date" &#124; "datetime-local" &#124; "month" &#124; "time" &#124; "week", "default" &#124; "error" &#124; "info" &#124; "success" &#124; "warning", "search" &#124; "tel" &#124; "text" &#124; "url" | Gibt an, welchen Type das Input haben soll. |
| _type | "bar" &#124; "cycle", "button" &#124; "checkbox" &#124; "default" &#124; "switch", "button" &#124; "reset" &#124; "submit", "date" &#124; "datetime-local" &#124; "month" &#124; "number" &#124; "time" &#124; "week", "date" &#124; "datetime-local" &#124; "month" &#124; "time" &#124; "week", "default" &#124; "error" &#124; "info" &#124; "success" &#124; "warning", "search" &#124; "tel" &#124; "text" &#124; "url" | Gibt den Typ des Eingabefeldes an. |
| _type | "bar" &#124; "cycle", "button" &#124; "checkbox" &#124; "default" &#124; "switch", "button" &#124; "reset" &#124; "submit", "date" &#124; "datetime-local" &#124; "month" &#124; "number" &#124; "time" &#124; "week", "date" &#124; "datetime-local" &#124; "month" &#124; "time" &#124; "week", "default" &#124; "error" &#124; "info" &#124; "success" &#124; "warning", "search" &#124; "tel" &#124; "text" &#124; "url" | Setzt den Typ der Schaltfläche. |
| _variant | "block" &#124; "inline", "button" &#124; "checkbox" &#124; "default" &#124; "switch", "card" &#124; "msg", "custom" &#124; "danger" &#124; "ghost" &#124; "normal" &#124; "primary" &#124; "secondary", "default" &#124; "none", "primary" &#124; "secondary" | Gibt an, welche Ausprägung der Button hat. |
| _variant | "block" &#124; "inline", "button" &#124; "checkbox" &#124; "default" &#124; "switch", "card" &#124; "msg", "custom" &#124; "danger" &#124; "ghost" &#124; "normal" &#124; "primary" &#124; "secondary", "default" &#124; "none", "primary" &#124; "secondary" | Gibt an, welche Ausprägung der Link-Button hat. |
| _variant | "block" &#124; "inline", "button" &#124; "checkbox" &#124; "default" &#124; "switch", "card" &#124; "msg", "custom" &#124; "danger" &#124; "ghost" &#124; "normal" &#124; "primary" &#124; "secondary", "default" &#124; "none", "primary" &#124; "secondary" | Gibt an, welche Benachrichtigungsvariante dargestellt wird. |
| _variant | "block" &#124; "inline", "button" &#124; "checkbox" &#124; "default" &#124; "switch", "card" &#124; "msg", "custom" &#124; "danger" &#124; "ghost" &#124; "normal" &#124; "primary" &#124; "secondary", "default" &#124; "none", "primary" &#124; "secondary" | Gibt an, welche Button-Variante verwendet werden soll. |
| _variant | "block" &#124; "inline", "button" &#124; "checkbox" &#124; "default" &#124; "switch", "card" &#124; "msg", "custom" &#124; "danger" &#124; "ghost" &#124; "normal" &#124; "primary" &#124; "secondary", "default" &#124; "none", "primary" &#124; "secondary" | Gibt an, welche Ladeanimation oder ob keine Animation verwendet werden soll. |
| _variant | "block" &#124; "inline", "button" &#124; "checkbox" &#124; "default" &#124; "switch", "card" &#124; "msg", "custom" &#124; "danger" &#124; "ghost" &#124; "normal" &#124; "primary" &#124; "secondary", "default" &#124; "none", "primary" &#124; "secondary" | Gibt an, welchen Type das Input haben soll. |
| _variant | "block" &#124; "inline", "button" &#124; "checkbox" &#124; "default" &#124; "switch", "card" &#124; "msg", "custom" &#124; "danger" &#124; "ghost" &#124; "normal" &#124; "primary" &#124; "secondary", "default" &#124; "none", "primary" &#124; "secondary" | Setzt die Variante des Zitats. |
| _variant | "block" &#124; "inline", "button" &#124; "checkbox" &#124; "default" &#124; "switch", "card" &#124; "msg", "custom" &#124; "danger" &#124; "ghost" &#124; "normal" &#124; "primary" &#124; "secondary", "default" &#124; "none", "primary" &#124; "secondary" | Stellt verschiedene Varianten der Navigation zur Verfügung. |
| _required | boolean | Macht das Eingabeelement zu einem Pflichtfeld. |
| _label | string | Gibt den Text der Überschrift an. |
| _label | string | Setzt den Text in dem Tooltip beim Fokussieren oder Maus-drüberfahren angezeigt wird. |
| _label | string | Setzt den sichtbaren Text des Elements. |
| _label | string | Setzt die Bezeichnung der Fortschrittsanzeige. |
| _list | Option<W3CInputValue>[] &#124; string, Option<number>[] &#124; string, SelectOption<W3CInputValue>[] &#124; string, string &#124; string[] | Gibt den technischen Namen des Eingabefeldes an. |
| _list | Option<W3CInputValue>[] &#124; string, Option<number>[] &#124; string, SelectOption<W3CInputValue>[] &#124; string, string &#124; string[] | Gibt die Liste der Optionen für das Eingabefeld an. |
| _list | Option<W3CInputValue>[] &#124; string, Option<number>[] &#124; string, SelectOption<W3CInputValue>[] &#124; string, string &#124; string[] | Gibt die Liste der Vorschlagswörter an. |
| _list | Option<W3CInputValue>[] &#124; string, Option<number>[] &#124; string, SelectOption<W3CInputValue>[] &#124; string, string &#124; string[] | Gibt die Liste der Vorschlagszahlen an. |
| _tooltip-align | "bottom" &#124; "left" &#124; "right" &#124; "top" | Gibt an, ob der Tooltip entweder oben, rechts, unten oder links angezeigt werden soll. |
| _tooltip-align | "bottom" &#124; "left" &#124; "right" &#124; "top" | Gibt an, ob der Tooltip oben, rechts, unten oder links angezeigt werden soll. |
| _tooltip-align | "bottom" &#124; "left" &#124; "right" &#124; "top" | Gibt an, ob der Tooltip oben, rechts, unten oder links angezeigt werden. |
| _tooltip-align | "bottom" &#124; "left" &#124; "right" &#124; "top" | Setzt die gewünschte Ausrichtung des Tooltips (`_icon-only`). |
| _auto-complete | "off" &#124; "on" | Gibt an, ob das Eingabefeld autovervollständigt werden kann. |
| _read-only | boolean | Setzt das Eingabefeld in den schreibgeschützten Modus. |
| _level | 0 &#124; 1 &#124; 2 &#124; 3 &#124; 4 &#124; 5 &#124; 6 | Gibt an, welchen H-Level von 1 bis 6 die Überschrift hat. |
| _level | 0 &#124; 1 &#124; 2 &#124; 3 &#124; 4 &#124; 5 &#124; 6 | Gibt an, welchen H-Level von 1 bis 6 die Überschrift hat. Oder ob es keine Überschrift ist, sondern nur fett gedruckt. |
| _level | 0 &#124; 1 &#124; 2 &#124; 3 &#124; 4 &#124; 5 &#124; 6 | Setzt den H-Level, von 1 bis 6, der Überschrift. |
| _icon-only | boolean | Blendet den Text aus und zeigt nur das gewählte Icon an, der Text wird in den Tooltip verschoben. |
| _icon-only | boolean | Gibt an, ob nur das Icon angezeigt wird. |
| _role | "button" &#124; "link" &#124; "tab" | Gibt an, welche Role der Schalter hat. |
| _role | "button" &#124; "link" &#124; "tab" | Gibt an, welche Rolle das Element hat. |
| _role | "button" &#124; "link" &#124; "tab" | Gibt an, welche Rolle der Schalter hat. |
| _role | "button" &#124; "link" &#124; "tab" | Setzt die Role der Schaltfläche. |
| _aria-selected | boolean | Gibt an, ob Element ausgewählt ist (role=tab). (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-selected) |
| _aria-selected | boolean | Gibt an, ob der Link gerade ausgewählt ist. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-selected) |
| _aria-expanded | boolean | Gibt an, ob durch den Button etwas aufgeklappt wurde. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded) |
| _aria-expanded | boolean | Gibt an, ob durch den Link etwas aufgeklappt wurde. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded) |
| _aria-current | "date" &#124; "location" &#124; "page" &#124; "step" &#124; "time" &#124; boolean | Gibt an, welchen aktuellen Auswahlstatus der Button hat. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current) |
| _aria-current | "date" &#124; "location" &#124; "page" &#124; "step" &#124; "time" &#124; boolean | Gibt an, welchen aktuellen Auswahlstatus der Link hat. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current) |
| _aria-controls | string | Gibt an, welche Elemente kontrolliert werden. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls) |
| _placeholder | string | Gibt den Platzhalter des Eingabefeldes an, wenn es leer ist. |
| _heading | string | Gibt den Titel der Meldung an. |
| _heading | string | Gibt die Überschrift der Card an. |
| _heading | string | Gibt die Überschrift des Accordions an. |
| _size | number | Setzt die Breite des Eingabefeldes in Buchstabenbreiten. |
| _size | number | Wechselt das Eingabeelement in den Auswahlfeld modus und setzt die Höhe des Feldes. |
| _max-length | number | Gibt an, wie viele Zeichen man maximal eingeben kann. |
| _max-length | number | Setzt die maximale Zeichenanzahl. |
| _max | Date &#124; `${number}-${number}-${number}T${number}:${number}:${number}` &#124; `${number}-${number}-${number}T${number}:${number}` &#124; `${number}-${number}-${number}` &#124; `${number}-${number}` &#124; `${number}-W${number}` &#124; `${number}:${number}:${number}` &#124; `${number}:${number}`, `${number}-${number}-${number}T${number}:${number}:${number}` &#124; `${number}-${number}-${number}T${number}:${number}` &#124; `${number}-${number}-${number}` &#124; `${number}-${number}` &#124; `${number}-W${number}` &#124; `${number}:${number}:${number}` &#124; `${number}:${number}` &#124; number, number | Gibt an, bei welchem Wert die Fortschrittsanzeige abgeschlossen ist. |
| _max | Date &#124; `${number}-${number}-${number}T${number}:${number}:${number}` &#124; `${number}-${number}-${number}T${number}:${number}` &#124; `${number}-${number}-${number}` &#124; `${number}-${number}` &#124; `${number}-W${number}` &#124; `${number}:${number}:${number}` &#124; `${number}:${number}`, `${number}-${number}-${number}T${number}:${number}:${number}` &#124; `${number}-${number}-${number}T${number}:${number}` &#124; `${number}-${number}-${number}` &#124; `${number}-${number}` &#124; `${number}-W${number}` &#124; `${number}:${number}:${number}` &#124; `${number}:${number}` &#124; number, number | Gibt den Maximalwert des Eingabefeldes an. |
| _max | Date &#124; `${number}-${number}-${number}T${number}:${number}:${number}` &#124; `${number}-${number}-${number}T${number}:${number}` &#124; `${number}-${number}-${number}` &#124; `${number}-${number}` &#124; `${number}-W${number}` &#124; `${number}:${number}:${number}` &#124; `${number}:${number}`, `${number}-${number}-${number}T${number}:${number}:${number}` &#124; `${number}-${number}-${number}T${number}:${number}` &#124; `${number}-${number}-${number}` &#124; `${number}-${number}` &#124; `${number}-W${number}` &#124; `${number}:${number}:${number}` &#124; `${number}:${number}` &#124; number, number | Gibt den größtmöglichen Datumswert an. |
| _max | Date &#124; `${number}-${number}-${number}T${number}:${number}:${number}` &#124; `${number}-${number}-${number}T${number}:${number}` &#124; `${number}-${number}-${number}` &#124; `${number}-${number}` &#124; `${number}-W${number}` &#124; `${number}:${number}:${number}` &#124; `${number}:${number}`, `${number}-${number}-${number}T${number}:${number}:${number}` &#124; `${number}-${number}-${number}T${number}:${number}` &#124; `${number}-${number}-${number}` &#124; `${number}-${number}` &#124; `${number}-W${number}` &#124; `${number}:${number}:${number}` &#124; `${number}:${number}` &#124; number, number | Gibt den größtmöglichen Zahlenwert an. |
| _custom-class | string | Gibt an, welche Custom-Class übergeben werden soll, wenn _variant="custom" gesetzt ist. |
| _step | number | Gibt die Schrittweite der Wertveränderung an |
| _step | number | Gibt die Schrittweite der Wertveränderung an. |
| _min | Date &#124; `${number}-${number}-${number}T${number}:${number}:${number}` &#124; `${number}-${number}-${number}T${number}:${number}` &#124; `${number}-${number}-${number}` &#124; `${number}-${number}` &#124; `${number}-W${number}` &#124; `${number}:${number}:${number}` &#124; `${number}:${number}`, `${number}-${number}-${number}T${number}:${number}:${number}` &#124; `${number}-${number}-${number}T${number}:${number}` &#124; `${number}-${number}-${number}` &#124; `${number}-${number}` &#124; `${number}-W${number}` &#124; `${number}:${number}:${number}` &#124; `${number}:${number}` &#124; number, number | Gibt den Minimalwert des Eingabefeldes an. |
| _min | Date &#124; `${number}-${number}-${number}T${number}:${number}:${number}` &#124; `${number}-${number}-${number}T${number}:${number}` &#124; `${number}-${number}-${number}` &#124; `${number}-${number}` &#124; `${number}-W${number}` &#124; `${number}:${number}:${number}` &#124; `${number}:${number}`, `${number}-${number}-${number}T${number}:${number}:${number}` &#124; `${number}-${number}-${number}T${number}:${number}` &#124; `${number}-${number}-${number}` &#124; `${number}-${number}` &#124; `${number}-W${number}` &#124; `${number}:${number}:${number}` &#124; `${number}:${number}` &#124; number, number | Gibt den kleinstmöglichen Datumswert an. |
| _min | Date &#124; `${number}-${number}-${number}T${number}:${number}:${number}` &#124; `${number}-${number}-${number}T${number}:${number}` &#124; `${number}-${number}-${number}` &#124; `${number}-${number}` &#124; `${number}-W${number}` &#124; `${number}:${number}:${number}` &#124; `${number}:${number}`, `${number}-${number}-${number}T${number}:${number}:${number}` &#124; `${number}-${number}-${number}T${number}:${number}` &#124; `${number}-${number}-${number}` &#124; `${number}-${number}` &#124; `${number}-W${number}` &#124; `${number}:${number}:${number}` &#124; `${number}:${number}` &#124; number, number | Gibt den kleinstmöglichen Zahlenwert an. |
| _show | boolean | Gibt an, ob der Toast eingeblendet wird. |
| _show | boolean | Gibt an, ob die Ladeanzeige eingeblendet wird oder nicht. |
| _show | boolean | Öffnet/schließt das Popover. |
| _pattern | string | Gibt ein Prüfmuster für das Eingabefeld an. |
| _pattern | string | Gibt ein Prüfpattern für das Eingabefeld an. |
| _multiple | boolean | Gibt an, ob mehrere Werte eingegeben werden können. |
| _links | ButtonOrLinkOrTextWithChildrenProps[] &#124; string, LinkProps[] &#124; string | Gibt die geordnete Liste der Seitenhierarchie an. |
| _links | ButtonOrLinkOrTextWithChildrenProps[] &#124; string, LinkProps[] &#124; string | Setzt die Liste der darzustellenden Links. |
| _href | string | Gibt die Ziel-Url des Links an. |
| _href | string | Link auf die Quelle des Zitates. |
| _has-closer | boolean | Aktiviert das Schließen-Icon. |
| _has-closer | boolean | Gibt an, ob der Alert ein Schließen-Icon hat. |
| _target-description | string | Gibt die Beschreibung an, wenn der Link in einem anderen Programm geöffnet wird. |
| _target | string | Gibt an wo der Link geöffnet werden soll. |
| _download | boolean &#124; string | Teilt dem Browser mit, dass sich hinter dem Link eine Datei befindet. Setzt optional den Dateinamen. |
| _orientation | "horizontal" &#124; "vertical" | Gibt die Ausrichtung der LinkList an. |
| _orientation | "horizontal" &#124; "vertical" | Gibt die Ausrichtung der Navigation an. |
| _open | boolean | Gibt an, ob das Accordion geöffnet ist. |
| _open | boolean | Gibt an, ob die Detailbeschreibung geöffnet oder geschlossen ist. |
| _icon-align | "bottom" &#124; "left" &#124; "right" &#124; "top" | Gibt an, ob das Icon entweder links oder rechts dargestellt werden soll. |
| _icon-align | "bottom" &#124; "left" &#124; "right" &#124; "top" | Gibt an, ob das Icon links oder rechts dargestellt werden soll. |
| _caption | string | Gibt den  Titel oder eine Legende mit Erklärungen zur Tabelle an. |
| _caption | string | Setzt die Überschrift. |
| _width | string | Setzt die Breite des Modals. (max-width: 100%). |
| _use-case | "image" &#124; "nav" &#124; "text" | Gibt den Verwendungsfall des Links an. |
| _stealth | boolean | Gibt an, ob der Link nur beim Fokus sichtbar ist. |
| _selector | string | Gibt die ID eines DOM-Elements, zu dem gesprungen werden soll, aus. |
| _unit | string | Setzt die Einheit der Fortschrittswerte. (wird nicht angezeigt) |
| _total | number | Setzt die Gesamtanzahl der Seiten. |
| _sibling-count | number | Gibt an, wie viele Seiten neben der aktuell Ausgewählten angezeigt werden. |
| _page-size-options | number[] &#124; string | Setzt die Optionen für das Seitenlängenselect. |
| _page-size | number | Gibt an, wie viele Einträge pro Seite angezeigt werden. |
| _page | number | Gibt an, welche Seite aktuell ausgewählt ist. |
| _has-buttons | boolean &#124; string &#124; { first: boolean; last: boolean; next: boolean; previous: boolean; } | Setzt die Sichtbarkeit der Anfang/zurück/weiter/Ende-Schaltflächen. |
| _boundary-count | number | Gibt an, wie viele Seiten neben den am Rand liegenden Pfeil-Schaltern angezeigt werden sollen. |
| _title | string | Dieses Property gibt die Beschreibung oder Erläuterung der Abkürzung an. |
| _tabs-align | "bottom" &#124; "left" &#124; "right" &#124; "top" | Setzt die Position der Registrierkarten. |
| _tabs | TabButtonProps[] &#124; string | Setzt die Daten für die Registrierkarten. |
| _selected | number | Gibt an, welches Tab selektiert sein soll. |
| _symbol | string | Dieses Property gibt den String an der angezeigt werden soll. |
| _summary | string | Gibt die Zusammenfassung der Detailbeschreibung an. |
| _srcset | string | Setzt eine Liste von Quell-URLs mit Breiten der Bilder. |
| _src | string | Setzt die Quell-URL des Bildes. |
| _sizes | string | Setzt Größen für unterschiedliche Auflösungen, unterstützend für _srcset. |
| _loading | "eager" &#124; "lazy" | Setzt den Lademodus. |
| _alt | string | Setzt den alternativen Text. |
| _smart-button | string &#124; { _label: string; } & { _ariaControls?: string &#124; undefined; _ariaLabel?: string &#124; undefined; _icon?: Stringified<KoliBriIconProp> &#124; undefined; _iconAlign?: Alignment &#124; undefined; _iconOnly?: boolean &#124; undefined; _role?: AlternativButtonLinkRole &#124; undefined; _tabIndex?: number &#124; undefined; _tooltipAlign?: Alignment &#124; undefined; _ariaCurrent?: AriaCurrent &#124; undefined; _ariaExpanded?: boolean &#124; undefined; _ariaSelected?: boolean &#124; undefined; _disabled?: boolean &#124; undefined; _accessKey?: string &#124; undefined; _id?: string &#124; undefined; _on?: KoliBriButtonCallbacks<unknown> &#124; undefined; _type?: KoliBriButtonType &#124; undefined; _value?: unknown; _variant?: KoliBriButtonVariant &#124; undefined; _customClass?: string &#124; undefined; } | Ermöglicht einen Schalter ins das Eingabefeld mit einer beliebigen Aktion zu einzufügen (nur Icon-Only). |
| _color | string &#124; { backgroundColor: string; color: string; } &#124; { backgroundColor: string; foregroundColor: Stringified<CharacteristicColors>; } | Setzt die Hintergrundfarbe. |
| _show-duration | number | Gibt an, wie viele Millisekunden der Toast eingeblendet werden soll. |
| _show-dropdown | boolean | Gibt an, welche Rolle der Schalter hat. |
| _secondary-headline | string | Gibt den Text der zusätzlichen Überschrift an. |
| _rows | number | Gibt die Anzahl der anzuzeigenden Zeilen des Eingabefeldes an. |
| _resize | "both" &#124; "horizontal" &#124; "none" &#124; "vertical" | Gibt an, ob die Größe des Eingabefeldes von Nutzer:innen geändert werden kann. (https://developer.mozilla.org/de/docs/Web/CSS/resize) |
| _has-counter | boolean | Aktiviert den Zeichenanzahlzähler am unteren Rand des Eingabefeldes. |
| _adjust-height | boolean | Passt die Höhe des Eingabefeldes automatisch an den Füllstand an. |
| _required-text | boolean &#124; string | Gibt an, ob der Pflichtfeld-Hinweis eingeblendet werden soll. Ein String überschreibt den Standardtext. |
| _quote | string | Setzt den Text, also das Zitat selbst. |
| _part | string | Gibt den Identifier für den CSS-Part an, um das Icon von Außen ändern zu können. (https://meowni.ca/posts/part-theme-explainer/) |
| _pagination | boolean &#124; string &#124; { _page: number; } & { _on?: KoliBriPaginationButtonCallbacks &#124; undefined; _page?: number &#124; undefined; _total?: number &#124; undefined; _customClass?: string &#124; undefined; _variant?: KoliBriButtonVariant &#124; undefined; _boundaryCount?: number &#124; undefined; _hasButtons?: boolean &#124; Stringified<PaginationHasButton> &#124; undefined; _pageSize?: number &#124; undefined; _pageSizeOptions?: Stringified<number[]> &#124; undefined; _siblingCount?: number &#124; undefined; _tooltipAlign?: Alignment &#124; undefined; } | Gibt an, ob die Daten geteilt in Seiten angezeigt wird. |
| _min-width | string | Gibt an, die minimale Breite der Tabelle an. |
| _headers | string &#124; { horizontal?: KoliBriTableHeaderCell[][]; vertical?: KoliBriTableHeaderCell[][] &#124; undefined; } | Gibt die horizontalen und vertikalen Header für die Tabelle an. |
| _data | KoliBriDataType[] &#124; string | Gibt die Daten an, die für die Erstellung der Tabelle verwendet werden. |
| _indeterminate | boolean | Gibt an, ob die Checkbox weder ausgewählt noch nicht ausgewählt ist. |
| _checked | boolean | Gibt an, ob die Checkbox ausgewählt ist oder nicht. (kann gelesen und gesetzt werden) |
| _height | string | Gibt an, ob eine individuelle Höhe übergeben werden soll. |
| _headline | string | Gibt die Überschrift der Card an. |
| _has-footer | boolean | Macht den Footerbereich der Card sichtbar. |
| _has-compact-button | boolean | Gibt an, ob die Navigation eine zusätzliche Schaltfläche zum Aus- und Einklappen der Navigation anzeigen soll. |
| _compact | boolean | Gibt an, ob die Navigation kompakt angezeigt wird. |
| _collapsible | boolean | Gibt an, ob Knoten in der Navigation zusammengeklappt werden können. Ist standardmäßig aktiv. |
| _aria-current-value | "date" &#124; "location" &#124; "page" &#124; "step" &#124; "time" &#124; boolean | Gibt den Wert von aria-current an, der bei dem aktuellen Kontext innerhalb der Navigation verwendet werden soll. |
| _alignment | "bottom" &#124; "left" &#124; "right" &#124; "top" | Setzt die Ausrichtung des Popovers in Relation zum Triggerelement. |
| _align | "bottom" &#124; "left" &#124; "right" &#124; "top" | Setzt die Ausrichtung des Tooltips in Relation zum Elternelement. |
| _accept | string | Gibt an, welche Dateiformate erlaubt sind. |
