export default function Footer(){
    return (
        <footer className="max-w-2xl mx-auto w-full p-4 pb-12 mt-8">
            <div className="relative drop-shadow-xl overflow-hidden rounded-xl bg-[#3d3c3d] p-0.5">
                <div className="absolute w-56 h-48 bg-white blur-[50px] -left-1/2 -top-1/2 pointer-events-none" />
                <div className="relative z-[1] bg-[#323132] opacity-95 rounded-[10px] p-6 text-center space-y-3">
                    <h3 className="text-base font-bold text-white">Enjoyed reading?</h3>
                    <p className="text-xs text-gray-400">
                        Subscribe to get notified whenever a new article or tutorial is published.
                    </p>
                    <form
                        onSubmit={(e) => e.preventDefault()}
                        className="flex items-center justify-center gap-2 max-w-sm mx-auto pt-1"
                    >
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-3 py-1.5 rounded-lg bg-[#1a1a1a] border border-[#4a4949] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                        />
                        <button
                            type="submit"
                            className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors shrink-0"
                        >
                            Join
                        </button>
                    </form>
                </div>
            </div>
        </footer>
    )
}
