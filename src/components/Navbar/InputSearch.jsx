'use client'

import { CaretDown, List, MagnifyingGlass, Moon, Sun } from "@phosphor-icons/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { useSharedState } from "./StateContext"

// import useDarkMode from "./useDarkMode"

import { useTheme } from 'next-themes'
import Image from "next/image"

import Link from "next/link"

const InputSearch = ({ user }) => {
    const {toggleInput, setToggleInput} = useSharedState()
    const { toggleList, setToggleList } = useSharedState();
    const [searchValue, setSearchValue] = useState("")
    const [toggleSelectSearch, setToggleSelectSearch] = useState(false)
    const [selectSearchValue, setSelectSearchValue] = useState("anime")
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
            try {
                if (searchValue.length == 0 || searchValue.trim() == "") {
                    setToggleInput(!toggleInput)
                } else {
                    router.push(`/${selectSearchValue}/search/${searchValue}`)
                }
            } finally {
                setSearchValue("")
                setToggleInput(!toggleInput)
            }

        }
    }

    return (
        <div className="flex items-center gap-2">
            <div className={`relative  ${toggleInput ? "hidden md:block" : "hidden"} `}>
                <button onClick={() => setToggleSelectSearch(!toggleSelectSearch)} className="flex items-center gap-1 selectLabel pl-3  rounded-md">
                    <p className="capitalize">{selectSearchValue}</p>
                    <CaretDown />
                </button>
                {toggleSelectSearch && (
                    <div className="absolute  bg-white/90  dark:bg-[#1e1e1e]/90 text-left  p-1 w-28  rounded-md space-y-1">
                        <button onClick={() => {setToggleSelectSearch(false), setSelectSearchValue("anime")}} className={`px-2 text-left w-full ${selectSearchValue == "anime" && "bg-neutral-200  dark:bg-neutral-300/5"} rounded-sm hover:bg-neutral-200  hover:dark:bg-neutral-300/5`}>Anime</button>
                        <button onClick={() => {setToggleSelectSearch(false), setSelectSearchValue("manga")}} className={`px-2 text-left w-full ${selectSearchValue == "manga" && "bg-neutral-200  dark:bg-neutral-300/5"} rounded-sm hover:bg-neutral-200  hover:dark:bg-neutral-300/5`}>Manga</button>
                    </div>
                )}
            </div>
            <input placeholder={`cari ${selectSearchValue}...`} onKeyDown={handleSearch} value={searchValue} className={` shadow-sm border-2 w-48 md:w-auto dark:border-[#333333] rounded-md outline-none p-2 dark:bg-[#121212] ${toggleInput ? "hidden md:block" : "hidden"}`} onChange={e => setSearchValue(e.target.value)} />
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