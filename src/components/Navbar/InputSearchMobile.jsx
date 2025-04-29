'use client'

import { CaretDown, MagnifyingGlass, } from "@phosphor-icons/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useSharedState } from "./StateContext"

const InputSearchMobile = () => {
    const [searchValue, setSearchValue] = useState("")
    const [selectSearchValue, setSelectSearchValue] = useState("anime")
    const { toggleInput, setToggleInput } = useSharedState()
    const { toggleSelectSearch, setToggleSelectSearch } = useSharedState();
    const router = useRouter()

    const handleSearch = (event) => {

        if (event.key === "Enter" || event.type === "click") {
            event.preventDefault();
            try {
                if (searchValue.length == 0 || searchValue.trim() == "") {
                    setToggleInput(!toggleInput)
                    setToggleSelectSearch(false)
                } else {
                    router.push(`/${selectSearchValue}/search/${searchValue}`)
                }
            } finally {
                setSearchValue("")
                setToggleInput(!toggleInput)
                setToggleSelectSearch(false)
            }

        }
    }

    return (
        <>
            {toggleInput && <div className="fixed inset-0 bg-[#1e1e1e]/30 h-[100dvh] z-0 cursor-pointer transition-all " onClick={() => setToggleInput(false)}/>}

            <div className={`flex items-center gap-2 px-3 pb-2  z-20 ${toggleInput ? "block md:hidden" : "hidden"} `} >
                <div className={`relative `} >
                    <button onClick={() => setToggleSelectSearch(!toggleSelectSearch)} className="flex items-center gap-1   py-2  ">
                        <p className="capitalize">{selectSearchValue}</p>
                        <CaretDown />
                    </button>
                    {toggleSelectSearch && (
                        <div className="z-30 absolute -left-3 top-9 bg-white/90  dark:bg-[#1e1e1e]/90 text-left  p-1  w-28  rounded-md space-y-1">
                            <button onClick={() => { setToggleSelectSearch(false), setSelectSearchValue("anime") }} className={`p-2 text-left w-full ${selectSearchValue == "anime" && "bg-neutral-200  dark:bg-neutral-300/5"} rounded-sm hover:bg-neutral-200  hover:dark:bg-neutral-300/5`}>Anime</button>
                            <button onClick={() => { setToggleSelectSearch(false), setSelectSearchValue("manga") }} className={`p-2 text-left w-full ${selectSearchValue == "manga" && "bg-neutral-200  dark:bg-neutral-300/5"} rounded-sm hover:bg-neutral-200  hover:dark:bg-neutral-300/5`}>Manga</button>
                        </div>
                    )}
                </div>
                <input placeholder={`cari ${selectSearchValue}...`} onKeyDown={handleSearch} value={searchValue} className={` z-20 shadow-sm border-2 w-full md:w-auto dark:border-[#333333] rounded-md outline-none p-2 dark:bg-[#121212]`} onChange={e => setSearchValue(e.target.value)} />
                <MagnifyingGlass size={28} weight="thin" onClick={handleSearch} className={`z-20 size-9 cursor-pointer dark:hover:bg-gray-700 rounded transition-all ${searchValue.length > 0 ? "animate-pulse" : "animate-none"} `} />
            </div>
        </>
    )
}

export default InputSearchMobile