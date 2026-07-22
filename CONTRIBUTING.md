# Contributing to e-store-extension-core

First off, thank you for considering contributing to `e-store-extension-core`! It's people like you that make it such a great project.

## Development Workflow

1. **Fork & Clone:** Fork the project and clone it to your local machine.
2. **Branch:** Create a branch for your feature or bug fix (e.g., `git checkout -b feature/your-feature-name`).
3. **Commit:** Commit your changes following our commit naming scheme (see below).
4. **Push:** Push your branch to your fork.
5. **Pull Request:** Open a pull request against the `main` branch. Note that all pull requests are **squash merged**, so a clean commit history within your branch isn't strictly necessary, but your PR title should be descriptive and follow the naming scheme below.

## Commit Naming Scheme
We follow a structured format for commit messages to keep our history readable. Please prefix your commits and PR titles with one of the following types:

- `feat:` A new feature
- `fix:` A bug fix
- `docs:` Documentation only changes
- `style:` Changes that do not affect the meaning of the code (white-space, formatting, etc.)
- `refactor:` A code change that neither fixes a bug nor adds a feature
- `test:` Adding missing tests or correcting existing tests
- `chore:` Changes to the build process or auxiliary tools and libraries

Example: `feat: add support for local storage caching`

## Code Standards
- Ensure all code is formatted properly (we use Prettier/ESLint).
- Run `pnpm run lint` before committing your changes.
- Write tests for new features where applicable.

## Reporting Bugs
When reporting bugs, please include:
- Your operating system and browser version.
- Steps to reproduce the bug.
- Expected behavior vs. actual behavior.

Thank you for contributing!
