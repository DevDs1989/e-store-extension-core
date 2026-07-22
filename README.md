# e-store-extension-core

Welcome to **e-store-extension-core**, the foundational template for building country-specific browser extensions for e-commerce platforms. 

## Aim of the Project
The primary goal of this project is to provide a standardized, reusable, and scalable core architecture for developing customized shopping extensions. Since e-commerce behaviors, available stores, and features often vary greatly across different countries, this core repository abstracts away the common extension logic (such as manifesting, cross-browser compatibility, and UI setup) while allowing developers to easily build region-specific features on top of it.

## Project Overview
This repository uses modern web tooling to streamline browser extension development:
- **Framework:** Powered by [WXT](https://wxt.dev) for seamless cross-browser support (Chrome, Firefox, Edge, Safari).
- **UI Components:** Integrates **Preact** and **Lucide Icons** for building lightweight and fast user interfaces like popups and content scripts.
- **Developer Experience:** Uses **Vite** for fast HMR (Hot Module Replacement) during development, alongside **TypeScript**, **ESLint**, and **Prettier** to ensure code quality.
- **Package Management:** Managed via `pnpm`.

By using this core repository as a starting point, teams can avoid boilerplate setup and immediately focus on building powerful shopping features.

## File Structure
```text
e-store-extension-core/
├── assets/           # Static assets like images or fonts
├── entrypoints/      # WXT entrypoints (background scripts, content scripts, popups)
├── public/           # Publicly accessible files copied as-is
├── src/              # Shared source code, UI components, and utilities
├── package.json      # Project metadata and scripts
└── wxt.config.ts     # WXT configuration
```

## Local Setup
```bash
git clone https://github.com/offCanada/e-store-extension-core.git
cd e-store-extension-core
pnpm install
```

## Runnable Scripts
```bash
pnpm dev             # Start development server
pnpm dev:firefox     # Start development server for Firefox
pnpm build           # Build extension for production
pnpm build:firefox   # Build extension for Firefox
pnpm zip             # Create a zip file for Chrome Web Store
pnpm zip:firefox     # Create a zip file for Firefox Add-ons
pnpm lint            # Run ESLint to check for code issues
pnpm format          # Format the code using Prettier
```

## Adding Support for New Countries & Stores
Want to adapt this extension for your own country's e-commerce sites? Check out our [New Store Guide](ADDING_NEW_STORES.md) for a step-by-step tutorial on implementing a new store adapter.

## Contributing
Please see the [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to contribute to this project.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
