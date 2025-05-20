
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
            <div className="mt-8 w-full">
                <header className="mx-8 flex justify-between">
                    <SidebarTrigger Icon={<Menu className="size-6"/>} />
                    <Search className="size-6" />
                </header>

                {children}
            </div>
        </SidebarProvider>
    )
}