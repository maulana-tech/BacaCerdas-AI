import { model } from "@/lib/ai";
import { streamText } from "ai";

export const POST = async (req: Request) => {
    const { prompt, storyType } = await req.json();
    
    // Menyesuaikan sistem prompt berdasarkan tipe cerita
    let systemPrompt = "You are a helpful assistant that generates creative stories based on user prompts. ";
    
    switch(storyType) {
        case "anak":
            systemPrompt += "The story is for young children (ages 3-8). The response should be written in HTML format and should be suitable for a children's storybook. Use simple language, colorful descriptions, and positive messages. The story should be engaging, imaginative, and appropriate for young readers.";
            break;
        case "remaja":
            systemPrompt += "The story is for teenagers (ages 13-18). The response should be written in HTML format with more complex themes and characters. Include relatable situations, emotional depth, and age-appropriate challenges. The story should be engaging and resonate with teenage readers.";
            break;
        case "petualangan":
            systemPrompt += "The story should be an adventure tale with exciting challenges, exploration, and discovery. The response should be written in HTML format with vivid descriptions of places and action sequences. Include elements of courage, problem-solving, and overcoming obstacles.";
            break;
        case "inspiratif":
            systemPrompt += "The story should be inspirational with themes of perseverance, growth, and overcoming challenges. The response should be written in HTML format with meaningful messages and positive outcomes. Include characters that demonstrate resilience and personal development.";
            break;
        default: // "umum"
            systemPrompt += "The story should be suitable for general audiences. The response should be written in HTML format with engaging narrative, well-developed characters, and interesting plot. The story should be creative, entertaining, and appropriate for readers of various ages.";
    }
    
    // Tambahkan instruksi format HTML
    systemPrompt += " Format the story with proper HTML tags including <h1> for title, <p> for paragraphs, and other appropriate HTML elements for structure. Make sure the story has a clear beginning, middle, and end.";

    const response = streamText({
        model,
        messages: [
            {
                role: "system",
                content: systemPrompt
            },
            {
                role: "user",
                content: prompt || "Once upon a time, in a land far, far away..."
            }
        ]
    });

    return response.toDataStreamResponse();
};