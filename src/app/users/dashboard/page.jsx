import { authUserSession } from "@/libs/auth-libs"
import Image from "next/image"
import Link from "next/link"

const Page = async () => {
    const user = await authUserSession()

    return (
        <div className="flex flex-col justify-center items-center gap-y-6 h-[80vh]">
            <p className="text-2xl font-bold">Welcome! {user?.name}</p>
            <Image className="rounded-full max-w-60" src={user?.image} alt="image" width={1000} height={1000} />
            <div className="flex gap-3 text-white">
                <Link href={"/users/dashboard/collection"} className="bg-[#1e88e5] p-1 rounded-md dark:hover:bg-[#1c4d75] transition-all">My Collection</Link>
                <Link href={""} className="bg-[#1e88e5] p-1 rounded-md cursor-not-allowed">My Comment</Link>
            </div>
        </div>
    )
}

export default Page
