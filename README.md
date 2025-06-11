# 🛤️ Paseo SDK

**Paseo SDK** is a lightweight TypeScript client for interacting with [Paseo](https://github.com/RoskiDeluge/paseo-mvp), a distributed runtime for agentic applications. It enables developers and agents to create and communicate with ephemeral compute environments—called **pods**—backed by Cloudflare Durable Objects.

> Each pod acts as an isolated, persistent memory + compute unit. The Paseo SDK gives you a simple API to create, use, and interact with these pods.

---

## ✨ Features

- 🌐 **Remote agent execution** using HTTP-based pods
- 🧠 **Built-in pod memory**, scoped to each agent
- 💬 **Prompt/response conversation interface**
- 🗃️ **Simple key-value storage**
- 🪶 **Zero-config, dependency-light design**

---

## 📦 Installation

```bash
npm install paseo-sdk
```

---

## 🚀 Quickstart

```ts
import { createPaseoClient } from "paseo-sdk";

const paseo = createPaseoClient("https://your-paseo-endpoint.workers.dev");

await paseo.usePod("dev-agent");

const reply = await paseo.sendPrompt("What's the point of Paseo?");
console.log("🤖", reply);

const history = await paseo.getConversation();
console.log("🧠", history);
```

---

## 🧰 API Reference

### `createPaseoClient(baseUrl: string)`

Returns an SDK instance for communicating with a Paseo pod.

### `.usePod(id: string)`

Selects the current pod (e.g. `agent-42`).

### `.sendPrompt(prompt: string): Promise<string>`

Sends a prompt to the pod. Returns the LLM response (simulated or real).

### `.getConversation(): Promise<{ prompt, response }[]>`

Retrieves full conversation history for the current pod.

### `.set(key: string, value: string): Promise<void>`

Stores a value in the pod's key-value memory.

### `.get(key: string): Promise<string | null>`

Retrieves a value by key from the pod's memory.

---

## 🧪 Local Testing

You can test the SDK without installing it:

```bash
node test/test.mjs
```

Make sure you’ve built the SDK first:

```bash
npm run build
```
