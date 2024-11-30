"use client"

import { useEffect, useState } from "react"
import AnimeList from "."
import { getAnimeResponse } from "@/libs/api-libs"
import Header from "./Header"
import { CaretDown } from "@phosphor-icons/react"
import Intro from "./Intro"

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
    }, [season])

    const [currentIndex, setCurrentIndex] = useState(0)
    const nextIndex = () => {
        setCurrentIndex(prev => prev + 1)
        if(currentIndex == 3) {
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
        localStorage.removeItem("upcomingPage")
        localStorage.removeItem("populerPage")
    }, [])

    return (
        <>
            <div className="px-3">
                <Intro api={seasonalAnime} index={currentIndex}/>
            </div>
            <Header LinkHref={`/season/${year}/${season}`} title={"Seasonal Anime"} LinkTitle={"Lihat semua..."} />
            {loading ? (

                //skeleton
                <div className="mb-4">
                    <div className="flex gap-6 ml-3 mt-2 mb-2">
                        <div className="h-3 w-24 mr-3 bg-gray-300 rounded-full animate-pulse dark:bg-gray-700" />
                        <div className="h-3 w-16 mr-1 bg-gray-300 rounded-full animate-pulse dark:bg-gray-700 hidden sm:block" />
                        <div className="h-3 w-24 bg-gray-300 rounded-full animate-pulse dark:bg-gray-700 hidden sm:block" />
                        <div className="h-3 w-20 bg-gray-300 rounded-full animate-pulse dark:bg-gray-700 hidden sm:block" />

                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-center  pb-0 p-3 overflow-hidden">
                        <div className="flex flex-col justify-center items-center">
                            <div className="h-52 sm:h-80 w-full bg-gray-300 rounded-md animate-pulse dark:bg-gray-700" />
                            <div className="h-3 w-32 bg-gray-300 rounded-full animate-pulse dark:bg-gray-700 mt-3" />
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <div className="h-52 sm:h-80  w-full bg-gray-300 rounded-md animate-pulse dark:bg-gray-700" />
                            <div className="h-3 w-28 bg-gray-300 rounded-full animate-pulse dark:bg-gray-700 mt-3" />
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <div className="h-52 sm:h-80  w-full bg-gray-300 rounded-md animate-pulse dark:bg-gray-700" />
                            <div className="h-3 w-24 bg-gray-300 rounded-full animate-pulse dark:bg-gray-700 mt-3" />
                        </div>
                        <div className="h-52 sm:h-80 w-56  bg-gray-300 rounded-md animate-pulse dark:bg-gray-700" />
                    </div>
                </div>
            ) : (
                <div>
                    <div className="flex gap-6 pl-3 ">
                        {seasonList.slice(0, 4).reverse().map(({ season, year }, index) => {
                            return (
                                <button onClick={() => {
                                    setSeason(season)
                                    setYear(year)
                                    if (season == seasonalAnime.data[0].season && year == seasonalAnime.data[0].year) {
                                        setToggleSeason(!toggleSeason)
                                    }
                                    localStorage.removeItem(`${season}${year}`)
                                }} key={`${index}`} className={`capitalize ${season == seasonalAnime.data[0].season && year == seasonalAnime.data[0].year ? "opacity-[100%] sm:pointer-events-none" : "opacity-[50%] hidden sm:block"} hover:text-[#1e88e5] hover:opacity-[100%] transition-all`}>
                                    <div className="flex justify-center items-center gap-2">
                                        <p>{`${season} ${year}`}</p>
                                        <CaretDown className="sm:hidden" onClick={() => setToggleSeason(!toggleSeason)} />
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                    {toggleSeason && (
                        <div className="flex flex-col  sm:hidden pl-3 items-start absolute bg-gray-100 dark:bg-[#121212] rounded-lg p-2 z-10 border-2 border-gray-500 mt-2 ml-2 ">
                            {seasonList.slice(0, 4).reverse().map(({ season, year }, index) => {
                                return (
                                    <button onClick={() => {
                                        setSeason(season)
                                        setYear(year)
                                        localStorage.removeItem(`${season}${year}`)
                                    }} key={`${index}`} className={`capitalize ${season == seasonalAnime.data[0].season && year == seasonalAnime.data[0].year ? "opacity-[100%] text-[#1e88e5] w-full text-left" : "opacity-[100%]"} hover:text-[#1e88e5] hover:opacity-[100%] transition-all`}>
                                        <p>{`${season} ${year}`}</p>
                                    </button>
                                )
                            })}
                        </div>
                    )}
                    <AnimeList api={seasonalAnime} />
                </div>
            )}
        </>
    )
}

export default SeasonalAnime