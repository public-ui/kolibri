# Public UI - Default-Theme

This is the default theme for the [Public UI web component library](https://public-ui.github.io). You can customize this theme by using `css variables` or by creating a new theme.

## Integration in React

```tsx
import { register } from '@public-ui/components';
import { defineCustomElements } from '@public-ui/components/dist/loader';
import { DEFAULT } from '@public-ui/theme-default';

register(DEFAULT, defineCustomElements).then(() => {
	ReactDOM.createRoot(document.getElementById('root')!).render(
		<React.StrictMode>
			<App />
		</React.StrictMode>,
	);
});
```

## Full documentation

👉 [https://public-ui.github.io](https://public-ui.github.io)
