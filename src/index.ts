export interface PaseoClient {
  usePod(id: string): void;
  sendPrompt(prompt: string): Promise<string>;
  getConversation(): Promise<any[]>;
  set(key: string, value: string): Promise<void>;
  get(key: string): Promise<string | null>;
}

export function createPaseoClient(baseUrl: string): PaseoClient {
  let podId: string | null = null;

  const ensurePod = () => {
    if (!podId) throw new Error("No pod selected. Call usePod(podId) first.");
    return `${baseUrl}/pods/${podId}`;
  };

  return {
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
