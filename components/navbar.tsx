import { ModeToggle } from "@/components/theme-toggle";
import { GithubIcon } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { SheetLeftbar } from "./leftbar";
import Image from "next/image";

export function Navbar() {
    return (
        <nav className="w-full border-b h-16 sticky top-0 z-50 bg-background">
            <div className="sm:container mx-auto w-[95vw] h-full flex items-center sm:justify-between md:gap-2">
                <div className="flex items-center sm:gap-5 gap-2.5">
                    <SheetLeftbar />
                    <div className="flex items-center gap-6">
                        <div className="lg:flex hidden">
                            <Logo />
                        </div>
                    </div>
                </div>

                <div className="flex items-center sm:justify-normal justify-between sm:gap-3 ml-1 sm:w-fit w-[90%]">
                    <div className="flex items-center justify-between sm:gap-2">
                        <div className="flex ml-4 sm:ml-0">
                            <Link
                                href="https://github.com/c0nf1den71al/Lodestar-Forge"
                                className={buttonVariants({
                                    variant: "ghost",
                                    size: "icon",
                                })}
                            >
                                <GithubIcon className="h-[1.1rem] w-[1.1rem]" />
                            </Link>
                            <ModeToggle />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export function Logo() {
    return (
        <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo-small.png" alt="Logo" width={24} height={24} />
            <h2 className="text-md font-semibold pt-1">Lodestar Forge</h2>
        </Link>
    );
}
