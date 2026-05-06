# Public UI – ECL Theme

[![npm](https://img.shields.io/npm/v/@public-ui/theme-ecl)](https://www.npmjs.com/package/@public-ui/theme-ecl)
[![license](https://img.shields.io/npm/l/@public-ui/theme-ecl)](https://github.com/public-ui/kolibri/blob/main/LICENSE)
[![downloads](https://img.shields.io/npm/dt/@public-ui/theme-ecl)](https://www.npmjs.com/package/@public-ui/theme-ecl)
[![issues](https://img.shields.io/github/issues/public-ui/kolibri)](https://github.com/public-ui/kolibri/issues)
[![pull requests](https://img.shields.io/github/issues-pr/public-ui/kolibri)](https://github.com/public-ui/kolibri/pulls)
[![size](https://img.shields.io/bundlephobia/min/@public-ui/theme-ecl)](https://bundlephobia.com/result?p=@public-ui/theme-ecl)
![contributors](https://img.shields.io/github/contributors/public-ui/kolibri)

The ECL Theme provides a design based on the style guides of the European Commission (EC) and European Union (EU) for the [Public UI Web Component Library](https://public-ui.github.io).

## Installation & Integration

```bash
npm install @public-ui/components @public-ui/theme-ecl
```

**React Example:**

```tsx
import { register } from '@public-ui/components';
import { defineCustomElements } from '@public-ui/components/loader';
import { ECL_EC, ECL_EU } from '@public-ui/theme-ecl';

register(ECL_EC, defineCustomElements).then(() => {
	ReactDOM.createRoot(document.getElementById('root')).render(
		<React.StrictMode>
			<App />
		</React.StrictMode>,
	);
});
// Alternativ: register(ECL_EU, defineCustomElements)
```

For more details: [Getting started](https://public-ui.github.io/docs/get-started/first-steps)

## Contributing to the Theme

Want to improve or customize the ECL Theme? Here’s how:

1. **Install pnpm**
   - [pnpm](https://pnpm.io/) is required for development. Install pnpm globally if you don’t have it yet:

     ```bash
     npm install -g pnpm
     ```

2. **Fork the repository**
   - Click [Fork](https://github.com/public-ui/kolibri) on GitHub to create your own fork.

3. **Local setup**
   - Clone your fork:

     ```bash
     git clone https://github.com/<YOUR_GITHUB_USER>/kolibri.git
     cd kolibri/lib/packages/themes/ecl
     ```

   - Install dependencies in the monorepo root:

     ```bash
     pnpm i
     pnpm build
     ```

4. **Start development**
   - Switch to the theme directory and start the watch mode:

     ```bash
     cd kolibri/lib/packages/themes/ecl
     pnpm start
     ```

   - Edit the files in `src/` as needed.

5. **Commit & Pull Request**
   - Commit your changes and push them to your fork:

     ```bash
     git add .
     git commit -m "feat(theme-ecl): <your change>"
     git push origin <your-branch>
     ```

   - Create a Pull Request at <https://github.com/public-ui/kolibri/compare>

**Notes:**

- Please follow the [Contributing Guidelines](../../../CONTRIBUTING.md).
- Always run `pnpm format` and `pnpm lint` before committing.
- For larger changes, feel free to open an [issue](https://github.com/public-ui/kolibri/issues/new) first.

## More Information

- [Documentation](https://public-ui.github.io)
- [Issues](https://github.com/public-ui/kolibri/issues)
- [Pull Requests](https://github.com/public-ui/kolibri/pulls)
