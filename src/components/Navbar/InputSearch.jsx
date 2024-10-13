'use client'

import { List, MagnifyingGlass, Moon, Sun } from "@phosphor-icons/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { useSharedState } from "./StateContext"

import useDarkMode from "./useDarkMode"

const InputSearch = () => {
    const [toggleInput, setToggleInput] = useState(false)
    const { toggleList, setToggleList } = useSharedState();
    const [searchValue, setSearchValue] = useState("")
    const router = useRouter()

    const { theme, toggleTheme } = useDarkMode();

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
        <div className="flex items-center gap-2  ">
            <input placeholder="cari anime..." onKeyDown={handleSearch} className={`shadow-sm border-2 dark:border-[#333333] rounded-md outline-none p-2 dark:bg-[#121212] ${toggleInput ? "block" : "hidden"}`} onChange={e => setSearchValue(e.target.value)} />
            <MagnifyingGlass  size={28} weight="thin" onClick={handleSearch} className={`cursor-pointer dark:hover:bg-gray-700 rounded transition-all ${searchValue.length > 0 ? "animate-pulse" : "animate-none"} ${toggleInput ? "scale-110" : ""}`} />
            {
                theme == "light"
                    ?
                    <Sun size={28} weight="thin" onClick={toggleTheme} className="cursor-pointer dark:hover:bg-gray-700 rounded transition-all"/>
                    :
                    <Moon onClick={toggleTheme} size={28} weight="thin" className="cursor-pointer dark:hover:bg-gray-700 rounded transition-all"/>
            }
            <List onClick={() => setToggleList(!toggleList)} weight="thin" size={28} className="block sm:hidden cursor-pointer dark:hover:bg-gray-700 rounded transition-all" />
        </div>
    )
}

export default InputSearch