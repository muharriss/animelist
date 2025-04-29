"use client"

import { useEffect, useState } from "react"
import AnimeList from "."
import { getAnimeResponse } from "@/libs/api-libs"
import Header from "./Header"
import { CaretUpDown, DotsThree } from "@phosphor-icons/react"
import Intro from "./Intro"
import Skeleton from "./Skeleton"

const SeasonalAnime = () => {

    const getCurrentYearAndSeason = () => {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth(); // 0 = January, 11 = December
        const currentYear = currentDate.getFullYear();

        // Determine the season based on the month
        let season = '';
        if (currentMonth >= 0 && currentMonth <= 2) {
            season = 'winter';
        } else if (currentMonth >= 3 && currentMonth <= 5) {
            season = 'spring';
        } else if (currentMonth >= 6 && currentMonth <= 8) {
            season = 'summer';
        } else if (currentMonth >= 9 && currentMonth <= 11) {
            season = 'fall';
        }

        return { year: currentYear, season };
    };

    const { year: defaultYear, season: defaultSeason } = getCurrentYearAndSeason();

    const [seasonList, setSeasonList] = useState([])
    const [seasonalAnime, setSeasonalAnime] = useState([])
    const [year, setYear] = useState(defaultYear)
    const [season, setSeason] = useState(`${defaultSeason}`)
    const [loading, setLoading] = useState(false)
    const [toggleSeason, setToggleSeason] = useState(false)
    const [listStart, setListStart] = useState(0)
    const [listEnd, setListEnd] = useState(4)

    const handlePrevSeasonListBtn = () => {
        setListStart(prev => prev + 4)
        setListEnd(prev => prev + 4)
        setYear(prev => prev - 1)
    }

    const handleNextSeasonListBtn = () => {
        setListStart(prev => prev == 0 ? 0 : prev - 4)
        setListEnd(prev => prev == 4 ? 4 : prev - 4)
        setYear(prev => prev == defaultYear ? defaultYear : prev + 1)
    }

    const fetchData = async () => {
        setLoading(true)
        try {
            const getSeason = await getAnimeResponse(`seasons/${year}/${season}`, "limit=4")
            setSeasonalAnime(getSeason)

            const seasonsList = await getAnimeResponse("seasons")
            const dataSeasonsList = seasonsList.data.flatMap(({ year, seasons }) =>
                seasons.reverse().map((season) => ({ season, year }))
            );
            setSeasonList(dataSeasonsList)
        } catch (error) {
            if (error.response?.status === 429) {
                console.error("Rate limit exceeded. Retrying in 5 seconds...");
                setTimeout(fetchData, 5000); // Retry after 5 seconds
            } else {
                console.error("Failed to fetch data:", error);
            }
        } finally {
            setLoading(false)
            setToggleSeason(false)
        }

    }

    useEffect(() => {
        fetchData()
    }, [season, year])

    const [currentIndex, setCurrentIndex] = useState(0)
    const nextIndex = () => {
        setCurrentIndex(prev => prev + 1)
        if (currentIndex == 3) {
            setCurrentIndex(0)
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            nextIndex();
        }, 5000);
        return () => clearInterval(interval);
    }, [currentIndex]);

    useEffect(() => {
        // localStorage.removeItem("upcomingPage")
        // localStorage.removeItem("populerPage")

        Object.keys(localStorage).forEach((key) => {
            if (key.includes("Page")) {
                localStorage.removeItem(key);
            }
            localStorage.removeItem("shortedBy")
        })
    }, [])

    return (
        <>
            <div className="px-3">
                <Intro api={seasonalAnime} index={currentIndex} />
            </div>
            <Header LinkHref={`/anime/season/${year}/${season}`} title={"Seasonal Anime"} LinkTitle={"Lihat semua..."} />
            {loading ? (
                <Skeleton />
            ) : (
                <div>
                    <div className="hidden sm:flex gap-6 pl-3   ">
                        <DotsThree size={32} className="cursor-pointer hidden sm:block hover:text-[#1e88e5] transition-all" onClick={handlePrevSeasonListBtn} />
                        {seasonList.slice(listStart, listEnd).reverse().map(({ season, year }, index) => {
                            return (
                                <button onClick={() => {
                                    setSeason(season)
                                    setYear(year)
                                    if (season == seasonalAnime.data[0].season && year == seasonalAnime.data[0].year) {
                                        setToggleSeason(!toggleSeason)
                                    }
                                }}
                                    key={`${index}`}
                                    className={`capitalize ${season == seasonalAnime.data[0]?.season && year == seasonalAnime.data[0]?.year ? "opacity-[100%] sm:pointer-events-none" : "opacity-[50%] hidden sm:block"} hover:text-[#1e88e5] hover:opacity-[100%] transition-all`}
                                >

                                    <div className="flex justify-center items-center gap-2">
                                        <p>{`${season} ${year}`}</p>
                                        {toggleSeason ? (
                                            <CaretUpDown size={16} className="sm:hidden" onClick={() => setToggleSeason(!toggleSeason)} />
                                        ) : (
                                            <CaretUpDown size={16} className="sm:hidden" onClick={() => setToggleSeason(!toggleSeason)} />
                                        )}
                                    </div>

                                </button>
                            )
                        })}
                        {year != defaultYear && (
                            <DotsThree size={32} className="cursor-pointer hidden sm:block hover:text-[#1e88e5] transition-all" onClick={handleNextSeasonListBtn} />
                        )}
                    </div>

                    <div className="px-3 sm:hidden ">
                        <button onClick={() => setToggleSeason(!toggleSeason)} className="flex justify-between items-center w-full gap-6 border border-gray-500 px-2 py-1 rounded-md">
                            <p>{`${season} ${year}`}</p>
                            <CaretUpDown size={16} className="sm:hidden" />
                        </button>
                    </div>

                    {toggleSeason && (
                        <div className="w-full flex justify-center items-center relative">
                            <div className="flex flex-col w-[95%]  sm:hidden mt-2 py-3 px-1 gap-1 top-0 text-lg items-start absolute bg-gray-100 dark:bg-[#121212] rounded-md  z-10 border border-gray-500">
                              
                                <button onClick={handlePrevSeasonListBtn} className="px-1 py-[0.17rem] w-full rounded-sm hover:dark:bg-neutral-300/5 hover:bg-neutral-300">
                                    <DotsThree size={32} className=" cursor-pointer hover:text-[#1e88e5] transition-all" />
                                </button>

                                {seasonList.slice(listStart, listEnd).reverse().map(({ season, year }, index) => {
                                    return (
                                        <button
                                            onClick={() => {
                                                setSeason(season)
                                                setYear(year)
                                            }}
                                            key={index}
                                            className={`w-full text-left px-2 py-1 rounded-sm hover:dark:bg-neutral-300/5 hover:bg-neutral-300  ${season == seasonalAnime.data[0]?.season && year == seasonalAnime.data[0]?.year && "bg-neutral-300 dark:bg-neutral-300/5"}`}
                                        >
                                            {`${season} ${year}`}
                                        </button>
                                    )
                                })}

                                {year != defaultYear && (
                                    <button onClick={handleNextSeasonListBtn} className="px-1 py-[0.17rem] w-full rounded-sm hover:dark:bg-neutral-300/5 hover:bg-neutral-300">
                                        <DotsThree size={32} className="cursor-pointer hover:text-[#1e88e5] transition-all" />
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                    <AnimeList api={seasonalAnime} />
                </div>
            )}
        </>
    )
}

export default SeasonalAnime