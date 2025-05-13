import { AppSidebar } from "@/components/common/navigation/navigation-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { apiFetch } from "@/lib/utils";
import { redirect } from "next/navigation";

export default async function RootLayout(props) {
    const params = await props.params;

    const { children } = props;

    const projectId = await params.projectId;
    const rows = await apiFetch("/projects");
    if (rows.length < 1 || !rows.find((row) => row.id === projectId))
        redirect("/projects");

    return (
        <SidebarProvider>
            <AppSidebar projectId={projectId} />
            <main className="bg-muted/40 flex-1 overflow-hidden">
                <div className="h-full overflow-auto">{children}</div>
            </main>
        </SidebarProvider>
    );
}
