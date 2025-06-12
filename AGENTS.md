# Development Guidelines for Paseo SDK

This project is a small TypeScript library for interacting with Paseo pods via HTTP. The repository contains only a single source file but is compiled for distribution using **tsup**.

## Repository Layout

- `src/` – TypeScript source code. Changes to the SDK belong here.
- `dist/` – Generated build artifacts (ESM, CJS, and type declarations). This folder is git‑ignored and should never be committed.
- `test/` – Contains `test.mjs` which exercises the built SDK against a remote Paseo endpoint.
- `package.json` – Build script (`npm run build`) uses tsup.

## Building and Testing

1. Install dependencies once with `npm install` if you have not already.
2. Run `npm run build` to compile TypeScript sources. This populates the `dist/` folder.
3. Execute `node test/test.mjs` to run the basic integration test. The test contacts `https://paseo-mvp.imginate.workers.dev`, so it may fail if the network or service is unavailable. Provide a best effort to run the test.

Both build and test steps should be run before committing changes.

## Coding Conventions

- Use TypeScript with `strict` settings, mirroring the existing style of `src/index.ts` (2‑space indentation, concise arrow functions, etc.).
- Extend functionality by editing files in `src/` or adding new modules there. Update exports as needed so that consumers import from `paseo-sdk` directly.
- Keep error handling consistent with the existing code (check HTTP status and throw if a request fails).
- Do not commit anything listed in `.gitignore`, especially the `dist/` directory.

## Documentation

If your changes introduce new public APIs or alter usage, update `README.md` accordingly so users understand how to use the library.

---

These guidelines apply to the entire repository.
