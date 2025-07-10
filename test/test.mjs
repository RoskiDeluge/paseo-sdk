import { createPaseoClient } from "../dist/index.js";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const paseo = createPaseoClient(
  `https://${process.env.PASEO_POD_CONTAINER}.paseo.workers.dev`
);

async function run() {
  try {
    paseo.usePod("dev-test");

    const reply = await paseo.sendPrompt("What is Paseo?");
    console.log("🤖 LLM Response:", reply);

    const convo = await paseo.getConversation();
    console.log("🧠 Conversation:", convo);
  } catch (err) {
    console.error("❌ Test failed:", err);
  }
}

run();
