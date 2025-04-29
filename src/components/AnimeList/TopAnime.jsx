"use client"

import { getAnimeResponse } from "@/libs/api-libs"
import { useEffect, useRef, useState } from "react"
import Skeleton from "@/components/AnimeList/Skeleton"
import AnimeList from "@/components/AnimeList"
import TabsTopAnime from "@/components/AnimeList/TabsTopAnime"
import Header from "@/components/AnimeList/Header"

const TopAnime = () => {

    const [topAnime, setTopAnime] = useState([])
    const [loading, setLoading] = useState(false)
    const [type, setType] = useState("")
    const [isMounted, setIsMounted] = useState(false)
    const isFirstRender = useRef(true);

    const fetchData = async () => {
        setLoading(true)
        try {
            const pupulerAnime = await getAnimeResponse("top/anime", `limit=8${type && `&${type}`}`)
            setTopAnime(pupulerAnime)
        } catch (error) {
            if (error.response?.status === 429) {
                console.error("Rate limit exceeded. Retrying in 5 seconds...");
                setTimeout(fetchData, 5000); // Retry after 5 seconds
            } else {
                console.error("Failed to fetch data:", error);
            }
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        setLoading(true);
        if (isFirstRender.current) {
            const timer = setTimeout(() => {
                fetchData();
                isFirstRender.current = false
            }, 3000);

            return () => clearTimeout(timer);
        } else {
            fetchData();
        }
    }, [type]);


    useEffect(() => {
        setIsMounted(true)
    }, [])


    if (!isMounted) return <Skeleton />

    return (
        <div>
            <Header LinkHref={`/anime/populer${type && `?${type}`}`} title={"Anime Teratas"} LinkTitle={"Lihat semua..."} />
            <TabsTopAnime type={type} setType={setType} loading={loading} />
            {loading ? (
                    <Skeleton listSkeleton={false}/>
            ) : (
                <div>
                    <AnimeList api={topAnime} />
                </div>
            )}

        </div>
    )
}

export default TopAnime