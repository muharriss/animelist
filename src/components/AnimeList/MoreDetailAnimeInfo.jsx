"use client"

import { CaretDoubleDown, CaretDoubleUp } from "@phosphor-icons/react"
import Link from "next/link"
import { useState } from "react"

const MoreDetailAnimeInfo = ({ detailAnime }) => {

    const [isActive, setIsActive] = useState(false)

    return (
        <div className="">
            <div
                className={`flex flex-col justify-center items-center text-center w-full mt-3 text-sm   ${isActive ? "hidden" : "block"}`}
            >
                <CaretDoubleDown size={20} onClick={() => setIsActive(true)} className="cursor-pointer" />
            </div>
            <div className={`${isActive ? "block" : "hidden"}`}>
                <div className="flex border-b dark:border-[#333333] py-2">
                    <p className="min-w-32 border-r dark:border-[#333333]">Status</p>
                    <p className="pl-7">{detailAnime.data.status ? detailAnime.data.status : "Unknown"}</p>
                </div>
                <div className="flex border-b dark:border-[#333333] py-2">
                    <p className="min-w-32 border-r dark:border-[#333333]">Premiered</p>
                    <div className="pl-7" >
                        {detailAnime.data.season ? (
                            <Link href={`/season/${detailAnime.data.year}/${detailAnime.data.season}`} className=" capitalize text-[#1e88e5]">{ detailAnime.data.season + " " + detailAnime.data.year}</Link>
                        ) : (
                            <p>Unknown</p>
                        )}
                    </div>
                </div>
                <div className="flex border-b dark:border-[#333333] py-2">
                    <p className="min-w-32 border-r dark:border-[#333333]">Broadcast</p>
                    <p className="pl-7">{detailAnime.data.broadcast.string ? detailAnime.data.broadcast.string : "Unknown"}</p>
                </div>
                <div className="flex border-b dark:border-[#333333] py-2">
                    <p className="min-w-32 border-r dark:border-[#333333]">Duration</p>
                    <p className="pl-7">{detailAnime.data.duration ? detailAnime.data.duration : "Unknown"}</p>
                </div>
                <div className="flex border-b dark:border-[#333333] py-2">
                    <p className="min-w-32 border-r dark:border-[#333333]">Rating</p>
                    <p className="pl-7">{detailAnime.data.rating ? detailAnime.data.rating : "Unknown"}</p>
                </div>
                <div

                    className={`flex flex-col justify-center items-center text-center w-full mt-3 text-sm   ${isActive ? "block" : "hidden"}`}
                >
                    <CaretDoubleUp size={20} className="cursor-pointer" onClick={() => setIsActive(false)} />
                </div>
            </div>
        </div>
    )
}

export default MoreDetailAnimeInfo