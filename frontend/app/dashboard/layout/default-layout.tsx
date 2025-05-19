import { Menu, Search } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "../../../components/ui/sidebar";
import { DefaultSidebar } from "../components/default-sidebar";

interface DefaultDashboardLayoutProps {
    children: React.ReactNode;
}

export default function DefaultDashboardLayout({ children }: DefaultDashboardLayoutProps) {
    return (
        <SidebarProvider>
            <DefaultSidebar />

            <div className="mt-12 w-full">
                <header className="mx-7 flex justify-between">
                    <SidebarTrigger Icon={<Menu />} />

                    <Search className="size-5" />
                </header>

                {children}
            </div>
        </SidebarProvider>
    )
}