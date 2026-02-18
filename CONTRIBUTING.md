# Contributing

We would love for you to contribute to **KoliBri**and help make it even better than it is today! As a contributor, we ask that you follow the following guidelines:

- [Contributing](#contributing)
  - [Code of Conduct](#code-of-conduct)
  - [Questions and problems](#questions-and-problems)
  - [Report an error](#report-an-error)
  - [Further development](#further-development)
    - [Git flow](#git-flow)
    - [Pull Request Guidelines](#pull-request-guidelines)
    - [Developing](#developing)
    - [Develop new component](#develop-new-component)
    - [Switching between branches](#switching-between-branches)
    - [Back porting to older Major-Versions](#back-porting-to-older-major-versions)
    - [Snapshot Testing for Visual Changes](#snapshot-testing-for-visual-changes)
      - [How to Update Snapshots](#how-to-update-snapshots)

## Code of Conduct

Help us keep **KoliBri** open and inclusive. Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md).

## Questions and problems

Please do not create issue tickets for general support questions. We want to use the ticket system for tracking bug reports and feature requests.

Instead, we recommend first checking [Stack Overflow](https://stackoverflow.com/questions/tagged/kolibri) to see whether someone else has already solved the question or problem. You can also create new questions with the tag “hummingbird”.
To save your time and ours, we will close all general questions in the ticket system and redirect those asking to Stack Overflow.

If you would like to contact us, please send us an email to [kolibri@itzbund.de](mailto:kolibri@itzbund.de).

## Report an error

If you find an error in the source code, you can report it to our ticket system.

It would be even better if you suggested a solution to us as a pull request.

## Further development

You can request new features by submitting an issue to our ticket system. If you would like to implement a new function, please note the following steps for further action:

- It is helpful to read the KoliBri [architecture concept](https://public-ui.github.io/docs/concepts/architecture) before implementing.
- For major innovations, please create a ticket with the description of the new function.
- For small innovations, you can offer and justify the implementation directly as a pull request.

### Git flow

We work according to the Git flow: https://medium.com/android-news/gitflow-with-github-c675aa4f606a

### Pull Request Guidelines

When creating a pull request, please follow these guidelines:

- **PR Title:** The pull request title must follow the [Conventional Commits](https://www.conventionalcommits.org/) specification. This is enforced by automated validation in our CI pipeline.
- **PR Title Format:** `<type>: <description>` or `<type>(<scope>): <description>`
- **Allowed Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`
- **Description:** The description should start with a lowercase letter and clearly explain the change.

**Examples of valid PR titles:**

- `feat: add new button component`
- `fix: resolve navigation issue on mobile devices`
- `docs: update installation instructions`
- `refactor(components): simplify input validation logic`

**Examples of invalid PR titles:**

- `Add new feature` (missing type prefix)
- `feat: Add feature` (description should start with lowercase)
- `feature: add new button` (invalid type, should be `feat`)

### Developing

1. For contributing, you need a [GitHub account](https://github.com/login)
2. Fork [our repository](https://github.com/public-ui/kolibri) on GitHub
3. Open your preferred command line interface
4. Clone the forked repository via HTTPS to your local machine. The VS Code GitHub extension can handle authentication.
5. Navigate the project root directory
6. Create a new branch for your changes
7. Install Node.js version 22
8. [Install PNPM](https://pnpm.io/installation) on you local machine
9. Install all packages with `pnpm i`
10. Build all packages within the mono repository `pnpm -r build`
11. Navigate to the desired package in our monorepo
12. When you want to start the project navigate to `packages/components/` and run `pnpm dev`
13. To watch for changes navigate to `packages/samples/react/` and execute `pnpm start`. `http://localhost:8080/` will open automatically

Run ESLint across the repository with `pnpm lint` (or `pnpm lint:eslint` to invoke ESLint directly); the configuration lives in `packages/*/eslint.config.cjs`. Formatting is handled by Prettier via `pnpm format`, so run format first to keep ESLint focused on code-quality rules rather than style drift.

### VS Code Setup

We recommend using [Visual Studio Code](https://code.visualstudio.com/):

- Install the Prettier and ESLint extensions.
- Enable "Format on Save" in your settings.

### Tests

All tests run via GitHub Actions when you open a pull request. Monitor them under the **Actions** tab.

### Develop new component

Refer to [new component](docs/tutorials/NEW_COMPONENT.md) tutorial.

### Switching between branches

When changing the current working branch, it is important to reinstall all dependencies, as these may have changed. It is very important that all packages are built when working on dependents. This is because the packages always use the built state of the referenced packages in the mono repo.
To avoid unexpected problems, it is therefore always advisable to build all packages once. This can be done with these steps:

- Reinstall all dependencies: `pnpm i`
- Build all packages: `pnpm -r build`
- You can then switch to the package to be processed and start it with `pnpm start`.

If it is also necessary to edit dependent packages such as `@public-ui/components`, these must be rebuilt for each change. Such packages offer the `dev` script for this purpose. This automatically rebuilds the package after each change.

### Back porting to older Major-Versions

By default, development is carried out in the `development` branch for the following version. However, if it becomes necessary to provide an issue for an older major release, such as version 1.x.x, the code change must also be merged into the corresponding release branch. In this case, it would be the `release/1` branch. It is important that the branch that was created from the `develop` is not merged into the release branch, as otherwise the next patch version will receive all the changes from the current development status.
The simplest procedure is therefore to create a new branch from the release branch (e.g. `release/1`) and transfer the individual commits of the feature branch from the `develop` to the new branch using cherry-picking. This branch can then be merged into the release branch as normal with a new pull request.

### Snapshot Testing for Visual Changes

The Continuous Integration (CI) pipeline incorporates automated visual regression testing using the React sample app across all available themes.

When introducing visual modifications to components, themes, or the React sample app, initial test failures are expected. To address this, the
`update-snapshots.yml` action on GitHub should be executed, followed by a **careful review** of the changes.

#### How to Update Snapshots

The following methods can be used to update the snapshots.

1. **GitHub website:** Update the snapshots directly on the GitHub website by following these steps.

- Navigate to the `Actions` tab in the `kolibri` repository.
- Execute the `03 - Update Snapshots` action.
- Select the desired branch in which you want to update the snapshots.
- The workflow checks out the branch, updates all snapshot files, and commits the changes to that branch.

2. **Terminal Command:** Use the [GitHub CLI (gh)](https://cli.github.com/) to run the `update-snapshots.yml` action from the local terminal. This method is recommended for updating snapshots on the current branch without navigating to the GitHub website. For terminal convenience, the [GitHub CLI (gh)](https://cli.github.com/) needs to be installed.

- Run the following command within the project directory to update the snapshots in your checked-out branch:
  ```bash
  gh workflow run update-snapshots.yml -r `git rev-parse --abbrev-ref HEAD`
  ```
- If your want to delete all snapshots before regenerating them add `-f purge_snapshots=true` to the command:
  ```bash
  gh workflow run update-snapshots.yml -r `git rev-parse --abbrev-ref HEAD` -f purge_snapshots=true
  ```
- You can also run the action on a different branch by specifying the another target branch with the `-r <branch_name>` flag. For example, to update snapshots on the `main` branch:
  ```bash
  gh workflow run update-snapshots.yml -r main
  ```

These steps ensure that visual snapshots are updated systematically, maintaining the integrity of the testing process.
