# How to simulate user input on KoliBri components in Vitest

This guide shows how to test application components that use KoliBri with Vitest and
[Testing Library](https://testing-library.com/), without a browser and without mocking KoliBri.
The tests render the real web components, operate them like a user and assert on the result.

All patterns are executable examples in
[`packages/samples/presentation/src/test`](../packages/samples/presentation/src/test) and run in CI.

## When to use which test

| Goal                                                                       | Test type                                    |
| -------------------------------------------------------------------------- | -------------------------------------------- |
| Your component reacts correctly to typing, clicking, selecting, submitting | Vitest component test (this guide)           |
| Layout, visual appearance, real focus order, screen reader output          | E2E test in a browser (e.g. Playwright)      |
| Your wrapper only forwards props to a KoliBri tag                          | Optional: custom element stub (see examples) |

happy-dom computes no layout and no real tab order. Everything that depends on rendering stays an
E2E concern; everything that depends on events and state works in Vitest.

## Setup

### Dependencies

```bash
pnpm add -D vitest happy-dom @testing-library/react @testing-library/user-event @testing-library/jest-dom shadow-dom-testing-library
```

Use **happy-dom**, not jsdom. Stencil requires `adoptedStyleSheets` on `Document` and `ShadowRoot`,
which jsdom does not implement.

### `vitest.config.ts`

```ts
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [react()],
	test: {
		environment: 'happy-dom',
		setupFiles: ['./vitest.setup.ts'],
	},
});
```

### `vitest.setup.ts`

```ts
import '@testing-library/jest-dom/vitest';
import { register } from '@public-ui/components';
import { defineCustomElements } from '@public-ui/components/loader';
import { DEFAULT } from '@public-ui/theme-default';
import { cleanup, configure } from '@testing-library/react';
import { afterEach } from 'vitest';
import { applyHappyDomWorkarounds } from './happy-dom-workarounds';

applyHappyDomWorkarounds();

await register(DEFAULT, defineCustomElements);

configure({ asyncUtilTimeout: 5000 });
afterEach(cleanup);
```

- **`register(theme, defineCustomElements)`** is the same call as in the application. Use the theme
  your application uses.
- **`asyncUtilTimeout`**: Stencil loads each component lazily on its first use. The first `findBy*`
  query in a test file includes that load and can exceed the default timeout of 1000 ms.
- **`afterEach(cleanup)`**: Testing Library unmounts automatically only with `globals: true`.
  Without cleanup, the components of earlier tests stay in the document and queries find several
  matches.

### `happy-dom-workarounds.ts`

Copy [`happy-dom-workarounds.ts`](../packages/samples/presentation/src/test/happy-dom-workarounds.ts)
into your project. It corrects two deviations of happy-dom from the CSS specification that otherwise
keep every KoliBri host element at `visibility: hidden`:

1. `style.setProperty(name, null)` does not remove the property ([capricorn86/happy-dom#2100](https://github.com/capricorn86/happy-dom/issues/2100)).
2. `visibility: inherit` from a stylesheet is ignored, so Stencil's `.hydrated { visibility: inherit }` has no effect ([capricorn86/happy-dom#2400](https://github.com/capricorn86/happy-dom/issues/2400)).

Remove a correction when its issue is fixed. Without these corrections, `findByShadowRole` finds the inner elements only with `hidden: true` and
cannot match them by accessible name.

## Rules for tests

### 1. Interact with the native element inside the shadow root

Every KoliBri component renders its native `<input>`, `<button>`, `<select>` or `<textarea>` into a
shadow root. Events on the custom element itself (`<kol-button>`) do not reach the `_on` callbacks.
Query the native element with
[shadow-dom-testing-library](https://github.com/konnorrogers/shadow-dom-testing-library), which
offers every Testing Library query with a `Shadow` infix:

```tsx
import { screen } from 'shadow-dom-testing-library';

const input = await screen.findByShadowRole('textbox', { name: 'Name' });
const button = await screen.findByShadowRole('button', { name: 'Save' });
const checkbox = await screen.findByShadowLabelText('Agree');
```

Prefer `findByShadowRole` with `name`: it asserts the accessible name as a side effect.

### 2. Always wait for the component with `findBy*`

Custom elements upgrade asynchronously. Use `findByShadow*` (or `vi.waitFor`) for the first query of a
component, never `getByShadow*`. Awaiting the inner element also guarantees that a test does not end
while a component chunk is still loading.

### 3. Simulate input with `userEvent`

```tsx
import userEvent from '@testing-library/user-event';

const user = userEvent.setup();
await user.type(input, 'Ada'); // one input event per character
await user.click(button);
await user.selectOptions(select, 'Hamburg');
await user.keyboard('{Enter}');
```

`fireEvent` also works and sets a value with a single event (`input.value = 'Ada'; fireEvent.input(input)`).
`userEvent` is closer to real usage and is the recommended default.

Known limitations of `userEvent` with shadow roots:

| Call                | Behavior                                                          | Alternative                                                                              |
| ------------------- | ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `user.clear(input)` | Throws "could not be focused": it checks `document.activeElement` | `user.type(input, 'new', { initialSelectionStart: 0, initialSelectionEnd: old.length })` |
| `user.tab()`        | Does not enter shadow roots                                       | Call `focus()` on the KoliBri element or `user.click()` the inner element                |

`user.tab()` still moves focus **out** of a field, which triggers its `onChange`.

### 4. Assert on results, not on implementation

- Callbacks from `_on` receive `(event, value)`. Assert on `value`:

  ```tsx
  const onChange = vi.fn();
  render(<KolSelect _label="City" _options={cities} _on={{ onChange }} />);
  await user.selectOptions(await screen.findByShadowLabelText('City'), 'Hamburg');
  expect(onChange.mock.lastCall?.[1]).toBe('hamburg');
  ```

- The component methods `getValue()`, `focus()`, `showModal()` and `close()` are called on the custom
  element (`document.querySelector('kol-input-text')`).
- A native `<select>` inside `kol-select` holds internal option indices. Assert on the callback value or
  on `getValue()`, not on `select.value`.
- Output of your own component lives in the light DOM; use the regular `screen` queries for it.

### 5. Example: application form

The examples use the React adapter `@public-ui/react-v19`. With another framework, render the
component with its Testing Library variant; the queries and `userEvent` calls stay the same.

```tsx
const GreetingForm = ({ onSave }: { onSave: (name: string) => void }) => {
	const [name, setName] = useState('');
	return (
		<KolForm _on={{ onSubmit: () => onSave(name) }}>
			<KolInputText _label="Name" _value={name} _on={{ onInput: (_event, value) => setName(value as string) }} />
			<KolButton _label="Save" _type="submit" />
		</KolForm>
	);
};

test('saves the typed name', async () => {
	const user = userEvent.setup();
	const onSave = vi.fn();
	render(<GreetingForm onSave={onSave} />);

	await user.type(await screen.findByShadowRole('textbox', { name: 'Name' }), 'Ada');
	await user.click(await screen.findByShadowRole('button', { name: 'Save' }));

	expect(onSave).toHaveBeenCalledWith('Ada');
});
```

Pressing Enter in the input (`user.type(input, 'Ada{Enter}')`) submits the form as well.

## Examples

| File                                                                                                     | Shows                                                        |
| -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| [`app-form.spec.tsx`](../packages/samples/presentation/src/test/app-form.spec.tsx)                       | Application component with form, input and submit            |
| [`button-click.spec.tsx`](../packages/samples/presentation/src/test/button-click.spec.tsx)               | Click, disabled state, changed `_on`, tag without adapter    |
| [`input-text.spec.tsx`](../packages/samples/presentation/src/test/input-text.spec.tsx)                   | Typing, `onInput`/`onChange`, replacing a value, `fireEvent` |
| [`choice-inputs.spec.tsx`](../packages/samples/presentation/src/test/choice-inputs.spec.tsx)             | Checkbox, select, single-select, textarea                    |
| [`keyboard-focus.spec.tsx`](../packages/samples/presentation/src/test/keyboard-focus.spec.tsx)           | Enter/Space, `focus()`                                       |
| [`dialog-modal.spec.tsx`](../packages/samples/presentation/src/test/dialog-modal.spec.tsx)               | Component methods and `onClose`                              |
| [`custom-element-stub.spec.tsx`](../packages/samples/presentation/src/test/custom-element-stub.spec.tsx) | Stub for pure wrapper tests                                  |
