
import { generateText } from "ai";
import type { SystemModelMessage, UserModelMessage, AssistantModelMessage, ToolModelMessage } from "ai";
import { Message } from "discord.js"
import { ollama } from 'ollama-ai-provider-v2';


type ModelMessage =
  | SystemModelMessage
  | UserModelMessage
  | AssistantModelMessage
  | ToolModelMessage;



async function getCtx(
    channel: Message["channel"],
    selfId: string
) {
    const msgs = await channel.messages.fetch({ limit: 5 });
    return msgs.reverse().map(m =>
        m.author.id === selfId
            ? ({ role: "assistant", content: `"{m.content}` } as AssistantModelMessage)
            : ({ role: "user", content: `${m.author.username}: "${m.content}"` } as UserModelMessage)
    );
};


async function ctx(message: Message): Promise<ModelMessage[]> {
  return await getCtx(message.channel!, process.env.DISCORD_CLIENT_ID!) as ModelMessage[];
}

export async function chat(
  message: Message,
  ctxPromise: Promise<ModelMessage[]> = ctx(message),
  guildId: string = message.guildId!,
): Promise<string> {

  try {
    const ctx = await ctxPromise;


    const res = await generateText({
      model: ollama(process.env.OLLAMA_MODEL!),
      system: "You are a helpful assistant.",
      messages: ctx,
    });

    return res.text;

  } catch (error) {
        throw error;
  }

}





