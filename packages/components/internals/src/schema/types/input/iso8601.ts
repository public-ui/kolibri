// type definition: https://stackoverflow.com/questions/51445767/how-to-define-a-regex-matched-string-type-in-typescript
// can not use more fine declared type because they force this ts error: Expression produces a union type that is too complex to represent. ts(2590)

// type D1 = '1';
// type D2 = D1 | '2';
// type D3 = D2 | '3';
// type D4 = D3 | '4';
// type D5 = D4 | '5';
// type D6 = D5 | '6';
// type D7 = D6 | '7';
// type D8 = D7 | '8';
// type D9 = D8 | '9';

// type D01 = D1 | '0';
// type D02 = D2 | '0';
// type D03 = D3 | '0';
// type D09 = D9 | '0';

type Hour = `${number}`;
type Minute = `${number}`;
type Second = `${number}`;

// type Hour = `0${D9}` | `1${D09}` | `2${D03}`;
// type Minute = `0${D9}` | `${D5}${D09}`;
// type Second = Minute;

type Year = `${number}`;
type Month = `${number}`;
type Day = `${number}`;
type CalendarWeek = `${number}`;

// type Month = `0${D9}` | `1${D02}`;
// type Day = `0${D9}` | `${D2}${D09}` | `3${D01}`;
// type CalendarWeek = `0${D9}` | `${D4}${D09}` | `5${D03}`;

// spec: https://www.w3.org/TR/2012/WD-html-markup-20121025/datatypes.html#form.data.date-def
type IsoDate = `${Year}-${Month}-${Day}`;

// spec: https://www.w3.org/TR/2012/WD-html-markup-20121025/datatypes.html#form.data.time-def
// input time is hh:mm or hh:mm:ss (https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/time)
type IsoTime = `${Hour}:${Minute}` | `${Hour}:${Minute}:${Second}`;

// spec: https://www.w3.org/TR/2012/WD-html-markup-20121025/datatypes.html#form.data.datetime-local-def
type IsoLocalDateTime = `${IsoDate}T${IsoTime}`;

// spec: https://www.w3.org/TR/2012/WD-html-markup-20121025/datatypes.html#form.data.month-def
type IsoMonth = `${Year}-${Month}`;

// spec: https://www.w3.org/TR/2012/WD-html-markup-20121025/datatypes.html#form.data.week
type IsoWeek = `${Year}-W${CalendarWeek}`;

export type Iso8601 = IsoDate | IsoTime | IsoLocalDateTime | IsoMonth | IsoWeek;
