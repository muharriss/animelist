"use client"

import { CaretDown, CaretUp } from "@phosphor-icons/react"
import { useState } from "react"

const HeaderMenuGenre = ({ title, shortedBy, setShortedBy, dataLength }) => {
    const [toggleSort, setToggleSort] = useState(false)
    const shortList = ["members", "score", "start_date", "title"]
    return (
        <div className="flex items-center justify-between  py-3 pt-6 px-3 w-full">
            <p className="font-bold text-xl border-l-4 border-[#1e88e5] pl-3">{title}</p>
            <div className="relative">
                {dataLength > 1 &&
                    <div className="flex text-sm gap-1">
                        <p className="hidden sm:flex">Shorted by</p>
                        <button className="flex justify-center items-center gap-1 " onClick={() => setToggleSort(!toggleSort)}>
                            <p className="capitalize">{shortedBy == "start_date" ? "newest" : shortedBy}</p>
                           {toggleSort ? <CaretUp /> : <CaretDown/>}
                            
                        </button>
                    </div>
                }
                {toggleSort && (
                    <div className="flex flex-col right-0 pl-3 items-start absolute bg-gray-100 dark:bg-[#121212] rounded-lg p-2 z-10 border-2 border-gray-500 mt-2  sm:text-sm">
                        {shortList.map((list, index) => {
                            return (
                                <div key={index}>
                                    <button
                                        className={`${shortedBy == list && "text-[#1e88e5]"} hover:text-[#1e88e5] transition-all capitalize`}
                                        onClick={() => {
                                            setShortedBy(list)
                                            setToggleSort(!toggleSort)
                                        }}>
                                        {list == "start_date" ? "newest" : list}
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}

export default HeaderMenuGenre