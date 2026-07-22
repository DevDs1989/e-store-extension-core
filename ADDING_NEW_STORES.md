# Adding Support for New Stores

To add a new store, you don't need to touch the core extension code. Instead, you create a custom **Store Adapter** that translates the specific store's HTML into data the extension understands.

## 1. Create a Store Adapter Class
In the `src/runtime/adapter/stores/` folder, create a new file (e.g., `MyStoreAdapter.ts`) and extend the `StoreAdapter` base class. 

You must implement methods to answer three main questions for the extension:
- **Where are the products?** Define CSS selectors to locate individual products on a page (both on single product pages and search result lists).
- **What is the barcode?** Write a small function that extracts the product's barcode (EAN) from the HTML element you found.
- **Where does the UI go?** Specify exactly where in the store's HTML the extension should inject its visual badges or price banners so it doesn't break the layout.

## 2. Register Your Store
Once your adapter is built, open `src/runtime/adapter/index.ts`. Import your new class and add it to the `stores` array. You'll need to provide:
- The `hostname` of the store (e.g., `www.mystore.com`).
- A `match` pattern so the extension knows when to activate (e.g., `*://*.mystore.com/*`).
- The `adapter` class you just created.

## 3. Network Permissions
If your store requires querying any new, country-specific APIs to fetch product data, you must add those API domains to the `host_permissions` array located in `wxt.config.ts`.
