import { model } from "@/lib/ai";
import { streamText } from "ai";
import { StoryTagApiResponse } from "@/lib/types";
import ApiClient from "@/lib/api";

export const POST = async (req: Request) => {
    try {
        const { prompt, storyType = 'umum' } = await req.json();

        // Get available tags from the story-tags endpoint
        const apiClient = new ApiClient();
        const tagsResponse = await apiClient.instance.get<{ data: StoryTagApiResponse[] }>('/story-tags');
        
        // Add error handling for API response
        if (!tagsResponse.data?.data) {
            console.error('Invalid tags response:', tagsResponse);
            throw new Error('Failed to fetch story tags');
        }

        // Find matching tag with null checking
        const tag = tagsResponse.data.data.find(tag => 
            tag?.attributes?.tag?.toLowerCase() === storyType?.toLowerCase()
        );

        // Set default story type if no match found
        const selectedType = tag?.attributes?.tag || 'umum';

        // Base system prompt
        let systemPrompt = "You are a helpful assistant that generates creative stories based on user prompts. ";
        
        // Customize prompt based on story tag
        switch(selectedType.toLowerCase()) {
            case "anak":
                systemPrompt += "The story is for young children (ages 3-8). Use simple language, colorful descriptions, and positive messages.";
                break;
            case "remaja":
                systemPrompt += "The story is for teenagers (ages 13-18). Include relatable situations, emotional depth, and age-appropriate challenges that resonate with teenage readers.";
                break;
            case "petualangan":
                systemPrompt += "Create an adventure tale with exciting challenges, exploration, and discovery. Include vivid descriptions of places and action sequences with elements of courage and problem-solving.";
                break;
            case "teknologi":
                systemPrompt += "Write a story incorporating technology themes, innovation, and digital elements while maintaining engagement and accessibility.";
                break;
            case "pendidikan":
                systemPrompt += "Create an educational story that combines learning with entertainment. Include factual information while maintaining narrative engagement.";
                break;
            case "fiksi":
                systemPrompt += "Develop a creative fiction story with imaginative elements, well-developed characters, and engaging plot twists.";
                break;
            case "non-fiksi":
                systemPrompt += "Write a fact-based story that educates while entertaining, incorporating real-world elements and accurate information.";
                break;
            default:
                systemPrompt += "The story should be suitable for general audiences with engaging narrative.";
        }
        
        // Add HTML formatting instructions
        systemPrompt += " Format the story with proper HTML structure using <h1> for title and <p> for paragraphs. Do not include ```html tags. Ensure clear story structure with beginning, middle, and end.";

        const response = streamText({
            model,
            messages: [
                {
                    role: "system",
                    content: systemPrompt
                },
                {
                    role: "user",
                    content: prompt || "Create an engaging story..."
                }
            ],
            temperature: 0.7,
            maxTokens: 1000
        });

        return response.toDataStreamResponse();

    } catch (error) {
        console.error('Error generating story:', error);
        return new Response(
            JSON.stringify({ 
                error: error instanceof Error ? error.message : 'Failed to generate story'
            }), 
            { 
                status: 500,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    }
};

// Helper function to get prompt based on tag
function getPromptForTag(tag: string): string {
    const prompts: Record<string, string> = {
        anak: "Create a children's story with simple language and positive messages.",
        remaja: "Write a story for teenagers with relatable themes and characters.",
        petualangan: "Create an adventure story with exciting challenges and discovery.",
        umum: "Write a general story suitable for all audiences.",
        // Add more tag-specific prompts as needed
    };
    
    return prompts[tag.toLowerCase()] || prompts.umum;
}