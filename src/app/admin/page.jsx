import { authUserSession } from "@/libs/auth-libs"
import { redirect } from "next/navigation"
// import { useRouter } from "next/navigation"
const Page = async () => {

    const user =  await authUserSession()
    
    if(user?.role != "admin") {
        redirect("/")
    }

    return (
        <div className="flex flex-col justify-center items-center h-[85vh]">
            Admin Page
        </div>
    )
}


export default Page