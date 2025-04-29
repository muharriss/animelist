'use client'

import Link from "next/link";
import { useSharedState } from "./StateContext"

const ListBar = ({ user }) => {
    const { toggleList, setToggleList } = useSharedState();


    const handleClose = () => {
        setToggleList(!toggleList)
    }

    const actionLabel = user ? "Sign out" : "Sign in"
    const actionURL = user ? "/api/auth/signout" : "/api/auth/signin"

    return (
        <div className={`fixed max-w-5xl w-screen h-screen bg-transparent flex z-30  ${toggleList ? "block" : "hidden"} `}>

            <div className="p-6 w-1/2 h-screen bg-white dark:bg-[#121212] ">
                <button onClick={handleClose} className="float-right text-xl dark:hover:bg-gray-700 rounded transition-all px-1">X</button>
                <div className="flex flex-col">
                    <Link href={"/manga"} onClick={handleClose} className="hover:text-[#1e88e5] transition-all pb-4 pt-6 ">Manga page</Link>
                    {
                        user
                            ?
                            <Link href="/users/dashboard/collection" onClick={handleClose} className="pb-4 hover:text-[#1e88e5] transition-all">Collection</Link>
                            :
                            <Link href="/anime/collection" onClick={handleClose} className="pb-4 hover:text-[#1e88e5] transition-all">Collection</Link>

                    }
                    {
                        user ? <Link onClick={handleClose} href="/users/dashboard" className=" pb-4 hover:text-[#1e88e5] transition-all">Dashboard</Link> : null
                    }
                    <Link href={actionURL} onClick={handleClose} className="hover:text-[#1e88e5] transition-all">{actionLabel}</Link>
                </div>
            </div>
            <div onClick={handleClose} className="w-1/2 h-screen" />

        </div>
    )
}

export default ListBar
