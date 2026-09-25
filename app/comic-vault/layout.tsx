import React from "react";
import {Navbar} from "@/app/comic-vault/components/navbar";

export default function ComicLayout({children}:{children:React.ReactNode}) {
    return (
        <html>
            <body className="bg-[#1a1a1a] min-h-screen flex flex-col">
            <Navbar/>
                {children}
            {/*<Footer />*/}
            </body>
        </html>
    )
}