"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    ArrowLeft,
    Bolt,
    Blocks,
    KeyRound,
    Network,
    Users,
    Files,
    PaintRoller,
    Server,
} from "lucide-react";
import { usePathname } from "next/navigation";

export const SettingsSidebar = () => {
    const pathname = usePathname();

    const links = [
        {
            title: "General",
            noPadding: true,
        },
        {
            title: "Appearance",
            url: `/settings/appearance`,
            icon: PaintRoller,
        },
        {
            title: "Deployment",
            url: `/settings/deployment`,
            icon: Server,
        },
        {
            title: "Users",
            url: `/settings/users`,
            icon: Users,
        },
        {
            title: "Integrations",
            url: `/settings/integrations`,
            icon: Blocks,
        },
        {
            title: "SSH Keys",
            url: `/settings/keys`,
            icon: KeyRound,
        },
        { title: "Templates" },
        {
            title: "Infrastructure Templates",
            url: `/settings/infrastructure-templates`,
            icon: Network,
        },
        {
            title: "Configuration Templates",
            url: `/settings/configuration-templates`,
            icon: Bolt,
        },
        {
            title: "File Manager",
            url: `/settings/files`,
            icon: Files,
        },
    ];

    return (
        <Sidebar collapsible="none">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {links.map((link) =>
                                link.url ? (
                                    <SidebarMenuItem key={link.title}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={pathname === link.url}
                                        >
                                            <Link href={link.url}>
                                                <link.icon />
                                                <span>{link.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ) : (
                                    <SidebarGroupLabel
                                        key={link.title}
                                        className={link.noPadding ? "" : "mt-4"}
                                    >
                                        {link.title}
                                    </SidebarGroupLabel>
                                ),
                            )}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <Link href="https://lodestar-forge.com" target="_blank">
                    <p className="text-muted-foreground w-full text-xs pb-2 select-none">
                        Lodestar Forge v0.3.0-dev
                    </p>
                </Link>
                <Link href="/projects">
                    <Button size="sm" variant="outline" className="w-full">
                        <ArrowLeft className="h-3" /> Back
                    </Button>
                </Link>
            </SidebarFooter>
        </Sidebar>
    );
};
