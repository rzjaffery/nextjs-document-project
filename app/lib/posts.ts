export interface Post {
    slug: string;
    title:string;
    content:string;
}
const posts: Post[] = [
    {slug:"Hello World", title:"Hello World", content:"This is my first post"},
    {slug:"rzjaffery",title:"Rayyan Zafar Jaffery",content:"This is Rayyan Zafar Jaffery"}
]
export async function getPosts(): Promise<Post[]> {
    return posts;
}
export async function getPost(slug: string):Promise<Post | undefined>{
    return posts.find((post)=>post.slug === slug);
}
