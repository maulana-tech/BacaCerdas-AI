
import { SidebarProvider } from "../../../components/ui/sidebar";
import { Sidebar } from "@/app/dashboard/components/sidebar";


interface DefaultDashboardLayoutProps {
    children: React.ReactNode;
}

export default function DefaultDashboardLayout({ children }: DefaultDashboardLayoutProps) {
    return (
        <SidebarProvider>
            <Sidebar />
            {children}
        </SidebarProvider>
    )
}