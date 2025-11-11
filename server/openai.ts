import OpenAI from "openai";

// This is using Replit's AI Integrations service, which provides OpenAI-compatible API access without requiring your own OpenAI API key.
const openai = new OpenAI({
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY
});

export async function generateSongMeaning(
  songName: string,
  artistName: string,
  lyrics: string
): Promise<{ overview: string; themes: string[]; context?: string }> {
  const prompt = `Analyze the song "${songName}" by ${artistName}. Based on the lyrics provided, generate:
1. A brief overview (2-3 sentences) explaining the overall meaning and message of the song
2. A list of 4-6 key themes present in the song
3. Optional context about the song's background or cultural significance if relevant

Lyrics:
${lyrics}

Return your response in JSON format with fields: overview (string), themes (array of strings), context (optional string).`;

  const response = await openai.chat.completions.create({
    model: "gpt-5", // the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
    max_completion_tokens: 1024,
  });

  const content = response.choices[0]?.message?.content || "{}";
  return JSON.parse(content);
}

export async function generateLyricMeaning(
  lyricLine: string,
  songName: string,
  artistName: string,
  fullContext: string
): Promise<string> {
  const prompt = `For the song "${songName}" by ${artistName}, explain the meaning of this specific lyric line:

"${lyricLine}"

Context (full lyrics):
${fullContext}

Provide a concise 1-2 sentence explanation of what this line means in the context of the song. Focus on symbolism, metaphors, and emotional significance.`;

  const response = await openai.chat.completions.create({
    model: "gpt-5", // the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
    messages: [{ role: "user", content: prompt }],
    max_completion_tokens: 256,
  });

  return response.choices[0]?.message?.content || "";
}
