# 🛤️ Paseo SDK

**Paseo SDK** is a lightweight TypeScript client for interacting with [Paseo](https://github.com/RoskiDeluge/paseo-core), an experimental runtime for deploying intelligent, stateful pods that serve as digital counterparts to real-world entities. It enables developers to create and communicate with ephemeral yet durable compute environments—called **pods**—backed by Cloudflare Workers and Durable Objects.

> Each pod acts as an isolated micro-environment for compute + state, designed to represent and persist the actions of entities—be they people, teams, systems, services, or agents. The Paseo SDK gives you a simple API to create, use, and interact with these pods.

---

## 🤔 Why Paseo?

Amid the rapid growth of agent-based systems and AI applications, many foundational needs remain unchanged: the need to represent, isolate, coordinate, and persist the actions and states of entities—be they people, teams, systems, or services. Paseo addresses this need by providing ephemeral yet durable execution environments called **pods**, powered by Cloudflare Workers and Durable Objects.

Paseo's goal is not to build agents, but to serve as the infrastructural substrate that allows any digital entity to act meaningfully and persistently across time and space.

---

## ✨ Features

- 🌐 **Isolated micro-environments** for compute + state representation
- 🧠 **Built-in pod memory**, scoped to each entity
- 💬 **Flexible interaction interface** (prompt/response, key-value storage)
- 🗃️ **General-purpose design**: works with agents, orgs, services, or humans-in-the-loop
- 🪶 **Zero-config, dependency-light design**
- ⚡ **Supports ephemeral and long-lived interactions**

---

## 📦 Installation

> **Note:** This package is not yet published to npm. To use the SDK, clone the repository and build it locally:

```bash
git clone https://github.com/RoskiDeluge/paseo-sdk.git
cd paseo-sdk
npm install
npm run build
```

---

## 🚀 Quickstart

```ts
import { createPaseoClient } from "paseo-sdk";

const paseo = await createPaseoClient();

const reply = await paseo.sendPrompt("What's the current state of this entity?");
console.log("🤖", reply);

const history = await paseo.getConversation();
console.log("🧠", history);
```

---

## 🧰 API Reference

### `createPaseoClient(baseUrl?: string)`

Creates a new pod on the Paseo service and returns a client for interacting with it.

### `client.podName`

The ID of the pod created during initialization.

### `.usePod(id: string)`

Selects the current pod (e.g. `user-42`, `team-alpha`, `service-monitor`).

### `.sendPrompt(prompt: string): Promise<string>`

Sends a prompt to the pod. Returns the response (can be LLM-generated or custom logic).

### `.getConversation(): Promise<{ prompt, response }[]>`

Retrieves full conversation history for the current pod.

### `.set(key: string, value: string): Promise<void>`

Stores a value in the pod's key-value memory.

### `.get(key: string): Promise<string | null>`

Retrieves a value by key from the pod's memory.

---

## 🧠 Philosophy

Paseo is grounded in the belief that digital systems should not require premature commitment to AI-native workflows. Instead, the priority is to represent entities—human or non-human—in ways that preserve continuity, autonomy, and potential for growth. Inspired by Marvin Minsky's "Society of Mind," Paseo pods can form networks of co-operating intelligences, but begin simply as containers for structured memory and interaction.

Pods can live temporarily or persist indefinitely, accumulate experience, reflect decisions, or wait silently until needed. They can be used by agents—or serve as agents themselves. But most importantly, they can mirror the structure and complexity of the world, without being constrained by it.

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
