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
