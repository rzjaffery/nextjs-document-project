export interface Post {
    slug: string;
    title: string;
    content: string;
    category: string;
    publishedAt: string;
}

export const posts: Post[] = [
    {
        slug: "Hello-World",
        title: "Hello World",
        content: "Welcome to my brand new Next.js blog! This is the very first post, generated to test layout, font optimization, and hydration speeds.",
        category: "Meta",
        publishedAt: "2026-09-20"
    },
    {
        slug: "rzjaffery",
        title: "Rayyan Zafar Jaffery",
        content: "Hi, I am Rayyan Zafar Jaffery. This dedicated profile placeholder serves as a live rendering check for modern web fonts and component states.",
        category: "Profile",
        publishedAt: "2026-09-22"
    },
    {
        slug: "mastering-nextjs-font-optimization",
        title: "Mastering Font Optimization in modern React Frameworks",
        content: "Next.js self-hosts Google Fonts out of the box. This completely eliminates Layout Shift (CLS) issues and speeds up First Contentful Paint significantly.",
        category: "Next.js",
        publishedAt: "2026-09-18"
    },
    {
        slug: "why-typescript-is-essential",
        title: "Why Typescript is Essential for Modern Web Scale",
        content: "Catching runtime bugs during compilation saves hours of active debugging. Interface blueprints keep mock arrays type-safe across components.",
        category: "TypeScript",
        publishedAt: "2026-09-15"
    },
    {
        slug: "demystifying-server-actions",
        title: "Demystifying Server Actions and Form Handling",
        content: "Mutate backend database structures instantly without managing traditional API endpoints using native full-stack infrastructure.",
        category: "React",
        publishedAt: "2026-09-11"
    },
    {
        slug: "understanding-core-web-vitals",
        title: "Understanding Core Web Vitals and User Experience",
        content: "Optimizing LCP, INP, and CLS ensures your web layout behaves fluidly, giving users an immediate, interactive rendering layer.",
        category: "Performance",
        publishedAt: "2026-09-08"
    },
    {
        slug: "the-evolution-of-css",
        title: "The Evolution of Utility CSS and Style Frameworks",
        content: "Utility-first patterns empower quick styling variations without standard bloat. Coupling them with dynamic class font wrappers boosts readability.",
        category: "Tailwind CSS",
        publishedAt: "2026-09-04"
    },
    {
        slug: "building-accessible-uis",
        title: "Building Accessible Web Components for Everyone",
        content: "Ensuring proper screen-reader aria properties and typography sizing contrasts keeps code accessible to a diverse user pool.",
        category: "A11y",
        publishedAt: "2026-09-01"
    },
    {
        slug: "edge-vs-serverless-runtimes",
        title: "Edge vs Serverless Middleware Runtimes Explored",
        content: "Deploying code fragments to geographical edge zones cuts network handshakes, serving static dynamic data globally in single-digit milliseconds.",
        category: "DevOps",
        publishedAt: "2026-08-28"
    },
    {
        slug: "ai-in-modern-workflows",
        title: "AI Integrations into Everyday Software Development",
        content: "Leveraging model contextual syntax generation shortens boilerplate scaffolding tasks, providing rich boilerplate content on demand.",
        category: "AI",
        publishedAt: "2026-08-25"
    }
];

export async function getPosts(): Promise<Post[]> {
    return posts;
}
export async function getPost(slug: string):Promise<Post | undefined>{
    return posts.find((post)=>post.slug === slug);
}
