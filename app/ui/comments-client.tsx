'use client'
import { use } from 'react'

interface Comment {
    id: number
    name: string
    body: string
}

export default function CommentsClient({
                                           commentsPromise,
                                       }: {
    commentsPromise: Promise<Comment[]>
}) {
    const comments = use(commentsPromise)
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