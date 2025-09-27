# ai-sdk-bot

---
This is a simple Discord.js bot example that uses [AI SDK](https://ai-sdk.dev/). By default, it is configured to use local models via [Ollama](https://ollama.com/).

## Setup

```bash
git clone https://github.com/Azxyc/ai-sdk-bot/
cd ai-sdk-bot
npm install
npm run dev
```

You must fill out .env with the following environment variables.
```
DISCORD_BOT_TOKEN=your-bot-token
DISCORD_CLIENT_ID=your-client-id
# If using ollama
OLLAMA_MODEL=ollama-model-name
```
---

This is intended to be used as a starting point and is not production code.
