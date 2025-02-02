import OpenAI from "openai";
import Constants from "expo-constants";

const openai = new OpenAI({
  apiKey: Constants.expoConfig?.extra?.openAIApiKey,
  dangerouslyAllowBrowser: true
});

export async function generateAIResponse(message: string) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "你是一個友善的AI助手，用中文回答問題。請保持回答簡潔。",
        },
        {
          role: "user",
          content: message,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    return response.choices[0]?.message?.content || "抱歉，我無法理解您的問題。";
  } catch (error) {
    console.error("生成AI回應失敗:", error);
    throw error;
  }
} 