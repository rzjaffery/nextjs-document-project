import { getPost } from '@/app/lib/posts'

type Props = {
    params: Promise<{ slug: string }>
    searchParams: Promise<{filter?: string}>
}

export default async function BlogPostPage({ params}: Props) {
    const { slug } = await params
    const post = await getPost(slug)

    if (!post) {
        return <h1>Post not found</h1>
    }
    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>

        </div>
    )
}
