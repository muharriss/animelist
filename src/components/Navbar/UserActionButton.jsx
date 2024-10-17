import { authUserSession } from "@/libs/auth-libs"
import Link from "next/link"

const UserActionButton = async () => {
    const user = await authUserSession()
    // console.log(user)

    const actionLabel = user ? "Sign out" : "Sign in"
    const actionURL = user ? "/api/auth/signout" : "/api/auth/signin"

    return (
        <div className="hidden gap-3 sm:flex">
            {
                user ? <Link href="/users/dashboard" className="hover:text-[#1e88e5] transition-all">Dashboard</Link> : null
            }
            {
                user
                    ?
                    <Link href="/users/dashboard/collection" className="hover:text-[#1e88e5] transition-all">Collection</Link>
                    :
                    <Link href="/anime/collection" className="hover:text-[#1e88e5] transition-all">Collection</Link>
            }
            {
                user?.role == "admin" && <Link href={"/admin"} className="hover:text-[#1e88e5] transition-all">Admin</Link>  
            }
            <Link href={actionURL} className="hover:text-[#1e88e5] transition-all">{actionLabel}</Link>
        </div>
    )
}

export default UserActionButton 