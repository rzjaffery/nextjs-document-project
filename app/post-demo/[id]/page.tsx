import { Suspense } from 'react'
import CommentsClient from "@/app/ui/comments-client";

interface Post {
    id: number
    title: string
    body: string
    userId: number
}
interface User {
    id: number
    name: string
    email: string
}
interface Comment {
    id: number
    name: string
    body: string
}

async function getPost(id: string): Promise<Post> {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    return res.json()
}

async function getUser(userId: number): Promise<User> {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    return res.json()
}

async function getComments(postId: string): Promise<Comment[]> {
    const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
    )
    return res.json()
}

type Props = {
    params: Promise<{ id: string }>
}

export default async function PostDemoPage({ params }: Props) {
    const { id } = await params

    // Comments only need `id`, which we already have — kick this off now,
    // in parallel with the post/author chain below. Not awaited yet.
    const commentsPromise = getComments(id)

    // Author genuinely depends on the post (we need post.userId), so this
    // part has to be sequential — no way around it.
    const post = await getPost(id)
    const author = await getUser(post.userId)

    return (
        <div>
            <h1>{post.title}</h1>
            <p>by {author.name} ({author.email})</p>
            <p>{post.body}</p>

            <h2>Comments</h2>
            <Suspense fallback={<p>Loading comments…</p>}>
                <CommentsClient commentsPromise={commentsPromise} />
            </Suspense>
        </div>
    )
}

async function CommentsList({
                                commentsPromise,
                            }: {
    commentsPromise: Promise<Comment[]>
}) {
    const comments = await commentsPromise
    return (
        <ul>
            {comments.map((comment) => (
                <li key={comment.id}>
                    <strong>{comment.name}</strong>: {comment.body}
                </li>
            ))}
        </ul>
    )
}