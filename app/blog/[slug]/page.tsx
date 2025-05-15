import { Typography } from "@/components/typography";
import { buttonVariants } from "@/components/ui/button";
import {
    getAllBlogStaticPaths,
    getCompiledBlogForSlug,
    getBlogFrontmatter,
} from "@/lib/markdown";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import Image from "next/image";

type PageProps = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata(props: PageProps) {
    const params = await props.params;
    const { slug } = params;
    const res = await getBlogFrontmatter(slug);
    if (!res) return {};
    const { title, description } = res;
    return {
        title,
        description,
    };
}

export async function generateStaticParams() {
    const val = await getAllBlogStaticPaths();
    if (!val) return [];
    return val.map((it) => ({ slug: it }));
}

export default async function BlogPage(props: PageProps) {
    const params = await props.params;

    const { slug } = params;

    const res = await getCompiledBlogForSlug(slug);
    if (!res) notFound();
    return (
        <div className="lg:w-[60%] sm:[95%] md:[75%] mx-auto">
            <Link
                className={buttonVariants({
                    variant: "link",
                    className: "!mx-0 !px-0 mb-7 !-ml-1 ",
                })}
                href="/blog"
            >
                <ArrowLeftIcon className="w-4 h-4 mr-1.5" /> Back to blog
            </Link>
            <div className="flex flex-col gap-3 pb-7 w-full mb-2">
                <p className="text-muted-foreground text-sm">
                    {formatDate(res.frontmatter.date)}
                </p>
                <h1 className="sm:text-3xl text-2xl font-extrabold">
                    {res.frontmatter.title}
                </h1>
            </div>
            <div className="!w-full">
                <div className="w-full mb-7">
                    <Image
                        src={res.frontmatter.cover}
                        alt="cover"
                        width={700}
                        height={400}
                        className="w-full h-[400px] rounded-md border object-cover"
                    />
                </div>
                <Typography>{res.content}</Typography>
            </div>
        </div>
    );
}
