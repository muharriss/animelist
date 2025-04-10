"use client"
import { CaretDoubleDown, CaretDoubleUp } from "@phosphor-icons/react"
import { useEffect, useState } from "react"
import { useMediaQuery } from "react-responsive"

const CharactersSection = ({ charactersAnime }) => {

    const [isActive, setIsActive] = useState(false)
    const isMobile = useMediaQuery({ maxWidth: 639 });

    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return null

    return (
        <div>
            <div className="grid grid-cols-2 sm:grid-cols-3  gap-4 justify-center py-2  pt-0">
                {charactersAnime.data
                    .sort((a, b) => b.favorites - a.favorites)
                    .slice(0, isActive ? undefined : isMobile ? 19 : 20)
                    .map((anime, index) => {
                        return (
                            <div key={index} className="relative rounded-xl overflow-hidden ">
                                <div className={`flex justify-center items-center gap-1 absolute right-0 ${anime.role == "Main" ? "bg-[#1e88e5]" : "bg-orange-400"} bg-opacity-[85%] m-1 p-1  rounded-md z-10`}>
                                    <p className="text-gray-200 text-sm">{anime.role}</p>
                                </div>
                                <img
                                    src={anime.character.images.webp.image_url}
                                    alt={anime.character.images.jpg.image_url}
                                    width={1000}
                                    height={1000}
                                    className=" max-h-52 sm:max-h-72 object-cover "
                                // priority
                                />
                                <div className="absolute h-full w-full bg-gradient-to-t from-neutral-900 via-transparent top-0" />
                                <p className="absolute bottom-2 left-1 text-neutral-50 ">{anime.character.name}</p>
                            </div>

                        )
                    })
                }
                {charactersAnime.data.length > 20
                    && (
                        <button className={`flex flex-col justify-center items-center gap-1 ${isActive && !isMobile && charactersAnime.data.length % 3 == 0 ? "hidden" : ""} ${isActive && isMobile && charactersAnime.data.length % 2 == 0 ? "hidden" : ""}`} onClick={() => setIsActive(!isActive)}>
                            {isActive ? (
                                <CaretDoubleUp size={20} />
                            ) : (
                                <CaretDoubleDown size={20} />
                            )}
                            <span className="text-xs">{isActive ? "view less" : "view more"}</span>
                        </button>
                    )
                }

            </div>
            {charactersAnime.data.length > 20 && isActive
                && (
                    <div className={`flex justify-center items-center pb-3 ${!isMobile && charactersAnime.data.length % 3 != 0 ? "hidden" : ""} ${isMobile && charactersAnime.data.length % 2 != 0 ? "hidden" : ""}`} >
                        {isActive ? (
                            <CaretDoubleUp size={20} onClick={() => setIsActive(!isActive)} />
                        ) : (
                            <CaretDoubleDown size={20} onClick={() => setIsActive(!isActive)} />
                        )}

                    </div>
                )
            }
        </div>
    )
}

export default CharactersSection