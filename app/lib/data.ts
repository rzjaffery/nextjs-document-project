import 'server-only'

const apiKey = process.env.API_KEY

if (!apiKey){
    throw new Error('Missing API key - Add it to env API_KEY Variable')
}
export async function getSecretData(){
    const res = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
        // headers: { authorization: apiKey },
    })
    return res.json()
}
