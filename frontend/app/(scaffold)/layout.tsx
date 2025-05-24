import { Navbar } from "@/components/navbar";

export default function ScaffoldLayout({ children }: DefaultPageProps) {
    return (
        <>
            <Navbar />
            <main>
                {children}
            </main>
        </>
    );
}