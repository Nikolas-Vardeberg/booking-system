import { getSession } from "@/lib/lib"
import { redirect } from "next/navigation";


const page = async() => {
    let session = await getSession();

    if(!session) {
        redirect("/admin/signin")
    }

    return(
        <section>
            <div>
                <pre>{JSON.stringify(session, null, 2)}</pre>
            </div>
        </section>
    )
}

export default page;