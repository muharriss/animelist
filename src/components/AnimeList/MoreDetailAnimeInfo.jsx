"use client"

import { CaretDoubleDown, CaretDoubleUp, CaretDown, CaretUp } from "@phosphor-icons/react"
import { useState } from "react"

const MoreDetailAnimeInfo = ({ detailAnime }) => {

    const [isActive, setIsActive] = useState(false)

    return (
        <div className="">
            <button
                onClick={() => setIsActive(true)}
                className={`flex flex-col justify-center items-center text-center w-full mt-3 text-sm   text-[#1e88e5] ${isActive ? "hidden" : "block"}`}
            >
                <CaretDoubleDown size={20} className="text-black dark:text-white " />
                View more
            </button>
            <div className={`${isActive ? "block" : "hidden"}`}>
                <div className="flex border-b dark:border-[#333333] py-2">
                    <p className="w-32 border-r dark:border-[#333333]">Status</p>
                    <p className="pl-7">{detailAnime.data.status ? detailAnime.data.status : "Unknown"}</p>
                </div>
                <div className="flex border-b dark:border-[#333333] py-2">
                    <p className="w-32 border-r dark:border-[#333333]">Premiered</p>
                    <p className="pl-7 capitalize">{detailAnime.data.season ? detailAnime.data.season + " " + detailAnime.data.year  : "Unknown"}</p>
                </div>
                <div className="flex border-b dark:border-[#333333] py-2">
                    <p className="w-32 border-r dark:border-[#333333]">Broadcast</p>
                    <p className="pl-7">{detailAnime.data.broadcast.string ? detailAnime.data.broadcast.string : "Unknown"}</p>
                </div>
                <div className="flex border-b dark:border-[#333333] py-2">
                    <p className="w-32 border-r dark:border-[#333333]">Duration</p>
                    <p className="pl-7">{detailAnime.data.duration ? detailAnime.data.duration : "Unknown"}</p>
                </div>
                <div className="flex border-b dark:border-[#333333] py-2">
                    <p className="w-32 border-r dark:border-[#333333]">Rating</p>
                    <p className="pl-7">{detailAnime.data.rating ? detailAnime.data.rating : "Unknown"}</p>
                </div>
                <button
                    onClick={() => setIsActive(false)}
                    className={`flex flex-col justify-center items-center text-center w-full mt-3 text-sm   text-[#1e88e5] ${isActive ? "block" : "hidden"}`}
                >
                    <CaretDoubleUp size={20} className="text-black dark:text-white " />
                    View less
                </button>
            </div>
        </div>
    )
}

export default MoreDetailAnimeInfo