'use client'
import Link from "next/link";
import Navbar from "@/app/ui/navbar";
import Footer from "@/app/ui/footer";

export default function BlogLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#1a1a1a] text-white flex flex-col">
            {/*<Navbar/>*/}
            <div className="flex-1">
                {children}
            </div>
            {/*<Footer/>*/}
        </div>
    );
}