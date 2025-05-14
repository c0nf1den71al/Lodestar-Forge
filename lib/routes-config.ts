// for page navigation & to sort on leftbar

export type EachRoute = {
    title: string;
    href: string;
    noLink?: true; // noLink will create a route segment (section) but cannot be navigated
    items?: EachRoute[];
    tag?: string;
};

export const ROUTES: EachRoute[] = [
    {
        title: "Getting Started",
        href: "/getting-started",
        noLink: true,
        items: [
            { title: "Introduction", href: "/introduction" },
            {
                title: "Installation",
                href: "/installation",
            },
            { title: "Connecting", href: "/connecting" },
        ],
    },
    {
        title: "Integrations",
        href: "/integrations",
        items: [
            { title: "AWS", href: "/aws" },
            { title: "Digital Ocean", href: "/digitalocean" },
            { title: "Tailscale", href: "/tailscale" },
        ],
    },
    {
        title: "Files and Templates",
        href: "/files-and-templates",
        items: [
            {
                title: "Infrastructure Templates",
                href: "/infrastructure-templates",
            },
            {
                title: "Configuration Templates",
                href: "/configuration-templates",
            },
            { title: "Files", href: "/files" },
        ],
    },
    {
        title: "Projects",
        href: "/projects",
        items: [{ title: "Managing Projects", href: "/managing-projects" }],
    },
    {
        title: "Deployments",
        href: "/deployments",
        items: [
            { title: "Deployment Lifecycle", href: "/deployment-lifecycle" },
            { title: "Managing Deployments", href: "/managing-deployments" },
        ],
    },
    {
        title: "Infrastructure",
        href: "/infrastructure",
        items: [
            {
                title: "Managing Infrastructure",
                href: "/managing-infrastructure",
            },
            {
                title: "Infrastructure Lifecycle",
                href: "/infrastructure-lifecycle",
            },
            {
                title: "Configuring Infrastructure",
                href: "/configuring-infrastructure",
            },
            {
                title: "Resources",
                href: "/resources",
            },
        ],
    },
    {
        title: "Domains",
        href: "/domains",
        items: [
            {
                title: "Managing Domains",
                href: "/managing-domains",
            },
            {
                title: "DNS Records",
                href: "/dns-records",
            },
        ],
    },
    {
        title: "Settings",
        href: "/settings",
        items: [
            { title: "Users", href: "/users" },
            { title: "Infrastructure", href: "/infrastructure" },
            { title: "SSH Keys", href: "/ssh-keys" },
        ],
    },
    {
        title: "Additional Resources",
        href: "/additional-resources",
    },
];

type Page = { title: string; href: string };

function getRecurrsiveAllLinks(node: EachRoute) {
    const ans: Page[] = [];
    if (!node.noLink) {
        ans.push({ title: node.title, href: node.href });
    }
    node.items?.forEach((subNode) => {
        const temp = { ...subNode, href: `${node.href}${subNode.href}` };
        ans.push(...getRecurrsiveAllLinks(temp));
    });
    return ans;
}

export const page_routes = ROUTES.map((it) => getRecurrsiveAllLinks(it)).flat();
