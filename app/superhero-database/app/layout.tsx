import type { Metadata } from "next";
import NavbarSuperhero from "@/app/superhero-database/ui/navbar";
// import "./globals.css";

export const metadata: Metadata = {
    title: "Superhero Database",
    description: "Explore superhero stats, alignments, and universe details.",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className="antialiased bg-[#1a1a1a] text-white min-h-screen" suppressHydrationWarning>
        {<NavbarSuperhero/>}
        {children}
        </body>
        </html>
    );
}