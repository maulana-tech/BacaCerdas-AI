"use server";

import ApiClient from "@/lib/api";

import { APIResponse, Story, StoryTag } from "@/lib/types";
import { User } from "next-auth";

export type UserApiResponse = APIResponse<"users", Omit<User, "location" | "image" | "token">>;
export type StoryTagApiResponse = APIResponse<"tags", StoryTag>;

export type StoryApiResponse = APIResponse<"stories", Story, {
    User: UserApiResponse;
    Tag: StoryTagApiResponse;
}>;

export async function getAPIStories() {
    const apiClient = new ApiClient();

    try {
        const response = await apiClient.instance.get<{ data: StoryApiResponse[] }>("/stories");
        return response.data;
    } catch (error) {
        console.error("Error fetching stories:", error);
        throw new Error("Failed to fetch stories");
    }
}

export async function getAPITags() {
    const apiClient = new ApiClient();

    try {
        const response = await apiClient.instance.get<{ data: StoryTagApiResponse[] }>("/tags");
        return response.data;
    } catch (error) {
        console.error("Error fetching tags:", error);
        throw new Error("Failed to fetch tags");
    }
}