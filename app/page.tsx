import Image from "next/image";
import blogIndexPage from "@/app/blog/page";
import {getSecretData} from "@/app/lib/data";

export default async function Home() {

    const data = await getSecretData()
    // return <pre>{JSON.stringify(data, null, 2)}</pre>
    return (
          <main>
            <div className='text-center'>Blog Page</div>
          </main>


      );
}
