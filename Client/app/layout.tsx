import type { Metadata } from "next";
import React from "react";
import Link from "next/link";
import { Toaster } from "@/components/ui/sonner"


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
                    <Link href="/" className="flex justify-center absolute left-[48px] font-semibold hover:text-[#5039bb] text-background">
                        Neo-Aspect
                    </Link>
                </header>
                <main className={`w-full absolute top-[72px] bottom-[48px]`}>
                    {children}
                </main>
                <Toaster 
                    position="top-right"
                />
                <footer className="flex w-full h-[48px] text-[12px] items-center justify-center border-[2px solid #f4f4f4] text-[#f4f4f4] absolute bottom-0 border-t-1 border-t-[#f4f4f4]">
                    &copy; {new Date().getFullYear()} | Helven
                </footer>
            </body>
        </html>
    );
}
