import Link from "next/link"
import InputSearch from "./InputSearch"
import UserActionButton from "./UserActionButton"
import ListBar from "./ListBar"

import StateProvider from "./StateContext"
import { authUserSession } from "@/libs/auth-libs"

const Navbar = async () => {

    const user = await authUserSession()

    return (
        <StateProvider>
            <header className="fixed w-full backdrop-blur-sm z-10">
                <ListBar user={user} />
                <div className='flex items-center flex-row justify-between  border-b border-[#8582823a] p-3 py-4 gap-2 rounded-t-md xl:px-20'>
                    <div className="flex justify-center items-center gap-9">
                        <Link href={"/"} className="font-bold text-2xl w-0 sm:w-auto">AnimeList</Link>
                        <UserActionButton />
                    </div>
                    <InputSearch user={user} />
                </div>
            </header>
        </StateProvider>
    )
}

export default Navbar