import Link from "next/link";

export default function Home() {
    return (
        <main className="min-h-screen bg-[#1a1a1a] text-white p-6 sm:p-10">
            <div className="max-w-4xl mx-auto space-y-16">

                <div className="flex justify-center pt-2">
                <Link href="/blog-project">
                    <button className="cursor-pointer bg-[#3d3c3d] hover:bg-[#4a4949] px-15 py-3 rounded-xl border border-[#4a4949] shadow-[0px_4px_32px_0_rgba(74,150,225,.70)] text-white font-medium group">
                        <div className="relative overflow-hidden">
                            <p>
                                Blog Button
                            </p>
                        </div>
                    </button>
                </Link>
                <Link href="/comic-vault">
                    <button className="cursor-pointer bg-[#3d3c3d] hover:bg-[#4a4949] px-15 py-3 rounded-xl border border-[#4a4949] shadow-[0px_4px_32px_0_rgba(74,150,225,.70)] text-white font-medium group">
                        <div className="relative overflow-hidden">
                            <p>
                                Comic Vault
                            </p>
                        </div>
                    </button>
                </Link>
            </div>

            </div>
        </main>
    );
}