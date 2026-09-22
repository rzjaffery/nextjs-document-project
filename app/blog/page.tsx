import {getPosts} from "@/app/lib/posts";
import Link from "next/link";

export default async function blogIndexPage(){
    const posts = await getPosts();

    return(
        <ul>
            {posts.map((p)=>(
                <li key={p.slug}>
                    <Link href={`/blog/${p.slug}`}>{p.title}</Link>
                </li>
            ))}
        </ul>
    )
}
