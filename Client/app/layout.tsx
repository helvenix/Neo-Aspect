import type { Metadata } from "next";
import Link from "next/link"
 
import { Button } from "@/components/ui/button"
import { Slash } from "lucide-react"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"

import "./globals.css";



export const metadata: Metadata = {
  title: "Neo-Aspect by Helven",
  description: "Tryout type of web app by Helven for Ristek Recruitment Task",
};

export default function RootLayout({
    children,
    }: Readonly<{
    children: React.ReactNode;
    }>) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="icon/icon.ico" />
            </head>
            <body className={`antialiased font-sans`}>
                <header className="flex w-full h-[72px] items-center absolute text-[18px] text-[#242424] bg-[#f4f4f4] ">
                    <h1 className="flex justify-center absolute left-[48px]">
                        Neo-Aspect
                    </h1>
                    <div className="flex absolute right-[48px] gap-3">
                        <Button asChild variant={"logreg"} size={"sm"}>
                            <Link href="/register">Register</Link>
                        </Button>
                        <Button asChild variant={"logreg"} size={"sm"}>
                            <Link href="/login">Login</Link>
                        </Button>
                    </div>
                </header>
                <main>
                    <Breadcrumb className="absolute top-[88px] left-[48px] ">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                            <BreadcrumbLink href="/">
                                <Button className="cursor-pointer" variant={'link'}>
                                    Home
                                </Button>
                            </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>
                            <Slash />
                            </BreadcrumbSeparator>
                        </BreadcrumbList>
                        
                    </Breadcrumb>
                    {children}
                </main>
                <footer className="flex w-full h-[48px] text-[12px] items-center justify-center border-[2px solid #f4f4f4] text-[#f4f4f4] absolute bottom-0 border-t-1 border-t-[#f4f4f4]">
                    &copy; {new Date().getFullYear()} / Helven
                </footer>
            </body>
        </html>
    );
}
