'use client'

import { List, MagnifyingGlass, Moon, Sun } from "@phosphor-icons/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { useSharedState } from "./StateContext"

// import useDarkMode from "./useDarkMode"

import { useTheme } from 'next-themes'
import Image from "next/image"

import Link from "next/link"

const InputSearch = ({ user }) => {
    const [toggleInput, setToggleInput] = useState(false)
    const { toggleList, setToggleList } = useSharedState();
    const [searchValue, setSearchValue] = useState("")
    const router = useRouter()

    const defaultImg = "/default-profile.jpeg"

    // const { theme, toggleTheme } = useDarkMode();

    const [mounted, setMounted] = useState(false)
    const { setTheme, resolvedTheme } = useTheme()

    useEffect(() => setMounted(true), [])

    if (!mounted) {
        return (
            <div className="flex items-center gap-2 animate-pulse">
                <MagnifyingGlass size={28} weight="thin" className={`cursor-pointer dark:hover:bg-gray-700 rounded transition-all ${searchValue.length > 0 ? "animate-pulse" : "animate-none"} ${toggleInput ? "scale-110" : ""}`} />

                <List weight="thin" size={28} className="block sm:hidden cursor-pointer dark:hover:bg-gray-700 rounded transition-all" />
                {user ? (
                    <div className="bg-gray-200 w-8 h-8 rounded-full object-cover overflow-hidden ml-1 ">
                        <img
                            src={user?.image ? user?.image : defaultImg}
                            alt={defaultImg}
                            width={50}
                            height={50} />
                    </div>
                ) : null}
            </div>
        )
    }

    const handleSearch = (event) => {

        if (event.key === "Enter" || event.type === "click") {
            event.preventDefault();
            if (searchValue.length == 0 || searchValue.trim() == "") {
                setToggleInput(!toggleInput)
            } else {
                router.push(`/search/${searchValue}`)
            }
        }
    }

    return (
        <div className="flex items-center gap-2 ">
            <input placeholder="cari anime..." onKeyDown={handleSearch} className={`shadow-sm border-2 w-48 md:w-auto dark:border-[#333333] rounded-md outline-none p-2 dark:bg-[#121212] ${toggleInput ? "block" : "hidden"}`} onChange={e => setSearchValue(e.target.value)} />
            <MagnifyingGlass size={28} weight="thin" onClick={handleSearch} className={`cursor-pointer dark:hover:bg-gray-700 rounded transition-all ${searchValue.length > 0 ? "animate-pulse" : "animate-none"} ${toggleInput ? "scale-110" : ""}`} />
            {
                resolvedTheme === "light"
                    ?
                    <Sun size={28} weight="thin" onClick={() => setTheme('dark')} className="cursor-pointer dark:hover:bg-gray-700 rounded transition-all" />
                    :
                    <Moon onClick={() => setTheme('light')} size={28} weight="thin" className="cursor-pointer dark:hover:bg-gray-700 rounded transition-all" />
            }
            <List onClick={() => setToggleList(!toggleList)} weight="thin" size={28} className="block sm:hidden cursor-pointer dark:hover:bg-gray-700 rounded transition-all" />
            {user ? (
                <Link href={"/users/dashboard"} className="bg-gray-200 w-8 h-8 rounded-full object-cover overflow-hidden ml-1 ">
                    <img
                        src={user?.image ? user?.image : defaultImg}
                        alt={defaultImg}
                        width={50}
                        height={50} />
                </Link>
            ) : null}
        </div>
    )
}

export default InputSearch