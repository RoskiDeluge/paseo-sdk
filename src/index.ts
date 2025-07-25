import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export interface PaseoClient {
  podName?: string;
  usePod(id: string): void;
  sendPrompt(prompt: string): Promise<string>;
  getConversation(): Promise<any[]>;
  set(key: string, value: string): Promise<void>;
  get(key: string): Promise<string | null>;
}

export async function createPaseoClient(): Promise<PaseoClient> {
  // Ensure the baseUrl is set from .env
  const baseUrl = process.env.PASEO_ENDPOINT;
  if (!baseUrl) {
    throw new Error("PASEO_ENDPOINT is not set in the .env file.");
  }

  // Make a request to create a new pod
  const createRes = await fetch(`${baseUrl}/pods`, { method: "POST" });
  if (!createRes.ok) {
    throw new Error(`Failed to create pod: ${createRes.status}`);
  }
  
  // Retrieve the pod name from the response
  const { podName } = await createRes.json();

  if (!podName) {
    throw new Error("No pod name returned from the pod creation request.");
  }

  let podId: string | null = podName;

  // Ensure the pod is selected before interacting with it
  const ensurePod = () => {
    if (!podId) throw new Error("No pod selected. Call usePod(podId) first.");
    return `${baseUrl}/pods/${podId}`;
  };

  // Return the client with the necessary methods
  return {
    podName,
    usePod(id: string) {
      podId = id;
    },

    async sendPrompt(prompt: string): Promise<string> {
      const url = `${ensurePod()}/llm`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });
      if (!res.ok) throw new Error(`Prompt failed: ${res.status}`);
      const data = await res.json();
      return data.response;
    },

    async getConversation(): Promise<any[]> {
      const url = `${ensurePod()}/conversation`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Failed to get conversation: ${res.status}`);
      const data = await res.json();
      return data.conversation;
    },

    async set(key: string, value: string): Promise<void> {
      const url = `${ensurePod()}/set?key=${encodeURIComponent(key)}&value=${encodeURIComponent(value)}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Failed to set key: ${res.status}`);
    },

    async get(key: string): Promise<string | null> {
      const url = `${ensurePod()}/get?key=${encodeURIComponent(key)}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Failed to get key: ${res.status}`);
      const data = await res.json();
      return data.value ?? null;
    }
  };
}
