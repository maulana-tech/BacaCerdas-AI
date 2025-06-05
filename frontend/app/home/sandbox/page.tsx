import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SandboxEditor from "./components/sandbox-editor";
import SandboxLivePreview from "./components/sandbox-live-preview";
import { SandboxProvider } from "./lib/sandbox-context";
import AiGeneration from "./components/ai-generation";

export default async function SandboxPage() {
    return (
        <SandboxProvider>
            <div className="w-full h-screen bg-background pt-12">
                <div className="max-w-[88vw] mx-auto space-y-16">
                    <div className="flex flex-col items-center w-full">
                        <h1 className="text-2xl font-bold mb-4 text-foreground">Sandbox</h1>
                        <p className="text-muted-foreground">This is a sandbox page for testing and development.</p>
                    </div>

                    <Tabs defaultValue="editor" className="w-full">
                        <TabsList>
                            <TabsTrigger value="editor" className="w-full">
                                Editor
                            </TabsTrigger>
                            <TabsTrigger value="ai" className="w-full">
                                AI Generation
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="editor" className="w-full">
                            <div className="flex w-full gap-x-12">
                                <SandboxEditor />
                                <SandboxLivePreview />
                            </div>
                        </TabsContent>
                        <TabsContent value="ai" className="w-full">
                            <AiGeneration />
                        </TabsContent>
                    </Tabs>

                </div>
            </div>
        </SandboxProvider>
    );
}