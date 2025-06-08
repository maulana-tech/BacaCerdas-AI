import { generateText, tool } from "ai";
import { z } from "zod";

import { model } from "@/lib/ai";

export const POST = async (request: Request) => {

    const { prompt } = await request.json();

    const { text } = await generateText({
        model,
        tools: {
            quizz: tool({
                description: "Generate a quiz based on the provided prompt and return it in a structured format.",
                parameters: z.object({
                    title: z.string().describe("The title of the quiz"),
                    content: z.array(z.object({
                        question: z.string().describe("The quiz question"),
                        options: z.array(
                            z.object({
                                id: z.number().describe("The unique identifier for the option"),
                                text: z.string().describe("The text of the quiz option"),
                                is_correct: z.boolean().describe("Indicates if this option is the correct answer")
                            })
                        ).describe("The options for the quiz question"),
                        explanation: z.string().optional().describe("An optional explanation for the correct answer")
                    })).describe("The list of quiz questions and their options"),
                })
            })
        },
        system: "You are an AI assistant that generates quizzes based on the provided prompt. " +
            "The quiz should be in a multiple-choice format with one correct answer and three distractors. " +
            "Ensure the questions are clear and concise. " +
            "You'll receive a prompt that describes the topic or content for the quiz.",
        prompt
    });

    console.log("Generated Quiz:", text);

    return Response.json({
        message: "Quiz generated successfully",
    });
}