
# Gemini Workspace Context: paseo-sdk

This document provides context for the Gemini agent to effectively assist with development in the `paseo-sdk` repository.

## Project Overview

This is a TypeScript SDK for interacting with the Paseo service. It provides a client to send prompts, manage conversations, and store key-value data within a "pod". The project is configured to output both ES Module (ESM) and CommonJS (CJS) formats.

## Key Files

-   `package.json`: Defines project metadata, dependencies (`node-fetch`), and build scripts.
-   `src/index.ts`: The main source file containing the `PaseoClient` interface and the `createPaseoClient` factory function. This is the core logic of the SDK.
-   `test/test.mjs`: An example usage and testing script that demonstrates how to use the SDK. It consumes the built JavaScript from the `dist/` directory.
-   `tsconfig.json`: TypeScript compiler configuration.
-   `dist/`: The output directory for the compiled JavaScript and type definition files. This directory is generated by the build process.

## Core Logic (`src/index.ts`)

-   **`createPaseoClient(baseUrl: string): PaseoClient`**: A factory function that initializes and returns a client for the Paseo API.
-   **`PaseoClient`**: An interface defining the methods available on the client:
    -   `usePod(id: string)`: Selects a "pod" to operate on. This must be called before other methods.
    -   `sendPrompt(prompt: string)`: Sends a prompt to the LLM endpoint for the selected pod.
    -   `getConversation()`: Retrieves the conversation history for the selected pod.
    -   `set(key: string, value: string)`: Stores a key-value pair in the selected pod.
    -   `get(key: string)`: Retrieves a value by its key from the selected pod.

## Development Workflow

1.  **Installation**: Run `npm install` to install dependencies.
2.  **Modification**: Make changes to the TypeScript source code in the `src/` directory.
3.  **Build**: Compile the TypeScript to JavaScript by running `npm run build`. This command uses `tsup` to clean the `dist/` directory and generate new `esm` and `cjs` bundles, along with TypeScript declaration files (`.d.ts`).
4.  **Testing**: Run the test script with `node test/test.mjs` to verify the changes against the development Paseo service.

When assisting with this codebase, remember to follow this workflow. Changes to `src/index.ts` require a build step before the tests will reflect them.
