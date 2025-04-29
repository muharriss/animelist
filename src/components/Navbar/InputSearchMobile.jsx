'use client'

import { CaretDown, MagnifyingGlass,  } from "@phosphor-icons/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useSharedState } from "./StateContext"

const InputSearchMobile = () => {
    const [searchValue, setSearchValue] = useState("")
    const [toggleSelectSearch, setToggleSelectSearch] = useState(false)
    const [selectSearchValue, setSelectSearchValue] = useState("anime")
    const {toggleInput, setToggleInput} = useSharedState()
    const router = useRouter()

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
        <div className={`flex items-center gap-2 px-3 pb-2  ${toggleInput ? "block md:hidden" : "hidden"} `}>
            <div className={`relative `}>
                <button onClick={() => setToggleSelectSearch(!toggleSelectSearch)} className="flex items-center gap-1">
                    <p className="capitalize">{selectSearchValue}</p>
                    <CaretDown />
                </button>
                {toggleSelectSearch && (
                    <div className="absolute -left-3 bg-white/90  dark:bg-[#1e1e1e]/90 text-left  p-1 w-28  rounded-md space-y-1">
                        <button onClick={() => { setToggleSelectSearch(false), setSelectSearchValue("anime") }} className={`px-2 text-left w-full ${selectSearchValue == "anime" && "bg-neutral-200  dark:bg-neutral-300/5"} rounded-sm hover:bg-neutral-200  hover:dark:bg-neutral-300/5`}>Anime</button>
                        <button onClick={() => { setToggleSelectSearch(false), setSelectSearchValue("manga") }} className={`px-2 text-left w-full ${selectSearchValue == "manga" && "bg-neutral-200  dark:bg-neutral-300/5"} rounded-sm hover:bg-neutral-200  hover:dark:bg-neutral-300/5`}>Manga</button>
                    </div>
                )}
            </div>
            <input placeholder={`cari ${selectSearchValue}...`} onKeyDown={handleSearch} value={searchValue} className={`shadow-sm border-2 w-full md:w-auto dark:border-[#333333] rounded-md outline-none p-2 dark:bg-[#121212]`} onChange={e => setSearchValue(e.target.value)} />
            <MagnifyingGlass size={28} weight="thin" onClick={handleSearch} className={`size-9 cursor-pointer dark:hover:bg-gray-700 rounded transition-all ${searchValue.length > 0 ? "animate-pulse" : "animate-none"} `} />
        </div>
    )
}

export default InputSearchMobile