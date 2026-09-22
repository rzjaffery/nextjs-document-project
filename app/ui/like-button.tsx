'use client'

import {useState} from "react";

type LikeButtonProps = {
    initialLikes: number;
}

export default function LikeButton({initialLikes}: LikeButtonProps) {
    const [likes, setLikes] = useState(initialLikes)
    return(
        <button onClick={() => setLikes(likes + 1)}>
            👍 {likes}
        </button>
    )
}