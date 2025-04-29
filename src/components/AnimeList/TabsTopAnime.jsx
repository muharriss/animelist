"use client"

import { CaretUpDown, DotsThree } from "@phosphor-icons/react"
import { useEffect, useState } from "react"

const TabsTopAnime = ({ type, setType, loading, isTopAnime = true }) => {

    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(5)
    const [toggleTop, setToggleTop] = useState(false)
    const [topAnimeName, setTopAnimeName] = useState("All Anime")
    const [topMangaName, setTopMangaName] = useState("All Manga")

    const dataTabsTopAnime = [{ name: "All Anime", query: "" }, { name: "Top Airing", query: "filter=airing" }, { name: "Top Upcoming", query: "filter=upcoming" }, { name: "Top TV Series", query: "type=tv" }, { name: "Top Movie", query: "type=movie" }, { name: "Most Favorited", query: "filter=favorite" }, { name: "Most Pupular", query: "filter=bypopularity" }, { name: "Top OVAs", query: "type=ova" }, { name: "Top ONAs", query: "type=ona" }, { name: "Top Specials", query: "type=tv_special" }]
    
    const dataTabsTopManga = [{ name: "All Manga", query: "" }, { name: "Top Manga", query: "type=manga" }, { name: "Top One-Shots", query: "type=oneshot" }, { name: "Top Doujinshi", query: "type=doujin" }, { name: "Top Light Novels", query: "type=lightnovel" }, { name: "Top Novels", query: "type=novel" }, { name: "Top Manhwa", query: "type=manhwa" }, { name: "Top Manhua", query: "type=manhua" }, { name: "Most Pupular", query: "filter=bypopularity" }, { name: "Most Favorited", query: "filter=favorite" }]

    const topAnimeList = isTopAnime ? dataTabsTopAnime : dataTabsTopManga

    const handleBtnList = (query, name) => {
        setType(query)

        if (isTopAnime) {
            setTopAnimeName(name)
        } else {
            setTopMangaName(name)
        }

    }

    const handleBtnListMobile = (query, name) => {
        setType(query)
        setToggleTop(false)

        if (isTopAnime) {
            setTopAnimeName(name)
        } else {
            setTopMangaName(name)
        }
    }

    const handleBtnLeft = () => {
        setType("")

        if (isTopAnime) {
            setTopAnimeName("All Anime")
        } else {
            setTopAnimeName("All Manga")
        }
        
        if (start != 0) {
            setEnd(prev => prev - 5)
            setStart(prev => prev - 5)
        }
    }

    const handleBtnRight = () => {

        if (isTopAnime) {
            setType("filter=favorite")
            setTopAnimeName("Most Favorited")
        } else {
            setType("type=novel")
            setTopAnimeName("Top Novels")
        }

        if (end != 10) {
            setEnd(prev => prev + 5)
            setStart(prev => prev + 5)
        }
    }

    useEffect(() => {

        if (isTopAnime) {
            localStorage.setItem("topAnimeName", topAnimeName)
        } else {
            localStorage.setItem("topMangaName", topMangaName)
        }

    }, [isTopAnime ? topAnimeName : topMangaName])

     

    return (
        <div className="">
            <div className="px-3  flex gap-6  items-center  ">

                {start != 0 && <DotsThree size={32} onClick={handleBtnLeft} className="cursor-pointer hidden md:block hover:text-[#1e88e5] duration-300 transition-all" />}

                {topAnimeList.slice(start, end).map((list, index) => {
                    return (
                        <button disabled={loading ? true : false} key={index} onClick={() => handleBtnList(list.query, list.name)} className={`text-nowrap hidden md:block hover:text-[#1e88e5] duration-300 transition-all ${type != list.query && "opacity-[50%] hover:opacity-[100%]"}  `}>{list.name}</button>
                    )
                })}


                {end != 10 && <DotsThree size={32} onClick={handleBtnRight} className="cursor-pointer hidden md:block hover:text-[#1e88e5] duration-300 transition-all" />}

            </div>

            <div className="px-3 md:hidden ">
                <button onClick={() => setToggleTop(!toggleTop)} className="flex justify-between items-center w-full gap-6 border border-gray-500 px-2 py-1 rounded-md">
                    <p>{topAnimeList.filter(value => value.query == type).map(value => value.name)}</p>
                    <CaretUpDown size={16} className="md:hidden" />
                </button>
            </div>

            {toggleTop && (
                <div className="w-full flex justify-center items-center relative">
                    <div className="flex flex-col w-[95%]  md:hidden mt-2 py-3 px-1 gap-1 top-0 text-lg items-start absolute bg-gray-100 dark:bg-[#121212] rounded-md  z-10 border border-gray-500">
                        {topAnimeList.map((list, index) => {
                            return (
                                <button onClick={() => handleBtnListMobile(list.query, list.name)} key={index} className={`w-full text-left px-2 py-1 rounded-sm hover:dark:bg-neutral-300/5 hover:bg-neutral-300  ${type == list.query && "bg-neutral-300 dark:bg-neutral-300/5"}`}>{list.name}</button>
                            )
                        })}
                    </div>
                </div>
            )}

        </div>
    )
}

export default TabsTopAnime