import { buttonVariants } from "@/components/ui/button";
import { getSession } from "@/lib/lib"
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";


const page = async() => {
    let session = await getSession();

    if(!session) {
        redirect("/admin/signin")
    }

    return(
        <section className="flex flex-col h-screen items-center justify-between">
        <div className="flex flex-col justify-center items-center h-full">
          <div className="flex flex-row font-medium space-x-10">
            <Link
              className={buttonVariants({
                variant: "outline",
                size: "default",
                className: "max-md:hidden"
              })}
              href="/admin/dashboard/services"
            >
              Servicer
            </Link>
            <Link
              className={buttonVariants({
                variant: "outline",
                size: "default",
                className: "max-md:hidden"
              })}
              href="/admin/dashboard/opening-hours"
            >
              Åpningstider
            </Link>
            <Link
              className={buttonVariants({
                variant: "outline",
                size: "default",
                className: "max-md:hidden"
              })}
              href="/admin/dashboard/orders"
            >
              Bestillinger
            </Link>
          </div>
        </div>
      
        <div className="self-center">
          <pre>{JSON.stringify(session, null, 2)}</pre>
        </div>
      </section>
      
    )
}

export default page;