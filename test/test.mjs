import { createPaseoClient } from "../dist/index.js";
import dotenv from "dotenv";

// Load environment variables from .env file (if needed)
dotenv.config();

async function run() {
  try {
    const paseo = await createPaseoClient();
    console.log(`🚀 Created pod: ${paseo.podName}`);

    const reply = await paseo.sendPrompt("What is Paseo?");
    console.log(`🤖 (${paseo.podName})`, reply);

    const convo = await paseo.getConversation();
    console.log(`🧠 (${paseo.podName})`, convo);
  } catch (err) {
    console.error("❌ Test failed:", err);
  }
}

run();
