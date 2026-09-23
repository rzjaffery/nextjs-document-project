// import {getPosts} from "@/app/lib/posts";
// import Link from "next/link";
// import LoadingIndicator from "@/app/ui/loading-indicator";
//
// export default async function blogIndexPage(){
//     const posts = await getPosts();
//
//     return(
//         <ul className='text-center'>
//             {posts.map((p)=>(
//                 <li key={p.slug}>
//                     <Link href={`/blog/${p.slug}`}>
//                         <LoadingIndicator/>
//                         {p.title}
//                     </Link>
//                 </li>
//             ))}
//         </ul>
//     )
// }
