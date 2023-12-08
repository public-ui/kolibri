# Contributing

We would love for you to contribute to **KoliBri**and help make it even better than it is today! As a contributor, we ask that you follow the following guidelines:

- [Contributing](#contributing)
  - [Code of Conduct](#code-of-conduct)
  - [Questions and Problems](#questions-and-problems)
  - [Report bug](#report-bug)
  - [Further development](#further-development)

## Code of Conduct

Help us keep **KoliBri** open and inclusive. Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md).

## Questions and problems

Please do not create issue tickets for general support questions. We want to use the ticket system for tracking bug reports and feature requests.

Instead, we recommend first checking [Stack Overflow](https://stackoverflow.com/questions/tagged/kolibri) to see whether someone else has already solved the question or problem. You can also create new questions with the tag “hummingbird”.
To save your time and ours, we will close all general questions in the ticket system and redirect those asking to Stack Overflow.

If you would like to contact us, please send us an email to [kolibri@itzbund.de](kolibri@itzbund.de).

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

### Developing

1. For contributing, you need a [GitHub account](https://github.com/login)
2. Fork [our repository](https://github.com/public-ui/kolibri) on GitHub
3. Open your preferred command line interface
4. Clone the forked repository to your local machine
5. Navigate the project root directory
6. Create a new branch for your changes
7. [Install PNPM](https://pnpm.io/installation) on you local machine
8. Install all packages with `pnpm i`
9. Navigate to the desired package in our monorepo
10. Start the project with “pnpm start”

### Switching between branches

When changing the current working branch, it is important to reinstall all dependencies, as these may have changed. It is very important that all packages are built when working on dependents. This is because the packages always use the built state of the referenced packages in the mono repo.
To avoid unexpected problems, it is therefore always advisable to build all packages once. This can be done with these steps:

- Reinstall all dependencies: `pnpm i`
- Build all packages: `pnpm -r build`
- You can then switch to the package to be processed and start it with `pnpm start`.

If it is also necessary to edit dependent packages such as `@public-ui/components`, these must be rebuilt for each change. Such packages offer the `dev` script for this purpose. This automatically rebuilds the package after each change.

### Back porting to older Major-Versions

By default, development is carried out in the `development` branch for the following version. However, if it becomes necessary to provide an issue for an older major release, such as version 1.7.x, the code change must also be merged into the corresponding release branch. In this case, it would be the `release/1.7` branch. It is important that the branch that was created from the `develop` is not merged into the release branch, as otherwise the next patch version will receive all the changes from the current development status. 
The simplest procedure is therefore to create a new branch from the release branch (e.g. `release/1.7`) and transfer the individual commits of the feature branch from the `develop` to the new branch using cherry-picking. This branch can then be merged into the release branch as normal with a new pull request.
