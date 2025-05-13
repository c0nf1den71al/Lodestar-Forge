import AllProjects from "@/components/projects/all-projects";
import { apiFetch } from "@/lib/utils";

export default async function Projects() {
    const rows = await apiFetch("/projects");
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
            <AllProjects projects={rows} />
        </div>
    );
}
