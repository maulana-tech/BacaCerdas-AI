import DefaultDashboardLayout from "./layout/default-layout";

export default function Layout({ children }: DefaultPageProps) {
    return (
        <DefaultDashboardLayout>
            {children}
        </DefaultDashboardLayout>
    )
}