import { model } from "@/lib/ai";
import { streamText } from "ai";

export const POST = async (req: Request) => {
    const { prompt } = await req.json();

    const response = streamText({
        model,
        messages: [
            {
                role: "system",
                content: "You are a helpful assistant that generates creative stories based on user prompts. the story is for children. The response should be written in HTML format and should be suitable for a children's storybook. The story should be engaging, imaginative, and appropriate for young readers."
            },
            {
                role: "user",
                content: prompt || "Once upon a time, in a land far, far away..."
            }
        ]
    });

    return response.toDataStreamResponse()
}