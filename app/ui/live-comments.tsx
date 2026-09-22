'use client'
import useSWR from 'swr'

interface Comment {
    id: number
    name: string
    body: string
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function LiveComments({ postId }: { postId: string }) {
    const { data, error, isLoading } = useSWR<Comment[]>(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
        fetcher
    )

    if (isLoading) return <p>Loading comments…</p>
    if (error) return <p>Failed to load comments.</p>

    return (
        <ul>
            {data!.map((comment) => (
                <li key={comment.id}>
                    <strong>{comment.name}</strong>: {comment.body}
                </li>
            ))}
        </ul>
    )
}