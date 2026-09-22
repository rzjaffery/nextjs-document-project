import {getPost, getPosts} from '@/app/lib/posts'
import LikeButton from "@/app/ui/like-button";

export async function generateStaticParams() {
    const posts = await getPosts()
    return posts.map((post) => ({ slug: post.slug }))
}

type Props = {
    params: Promise<{ slug: string }>
}

export default async function BlogPostPage({ params}: Props) {
    const { slug } = await params
    const post = await getPost(slug)

    if (!post) {
        return <h1>Post not found</h1>
    }
    return (
        <div>
            <h1 >{post.title}</h1>
            <p>{post.content}</p>
            <h3>{post.category}</h3>
            <h4>{post.publishedAt}</h4>
            <LikeButton initialLikes={post.likes}/>
        </div>
    )
}
