"use client"

import { getAnimeResponse } from "@/libs/api-libs"
import { useEffect, useRef, useState } from "react"
import Skeleton from "@/components/AnimeList/Skeleton"
import AnimeList from "@/components/AnimeList"
import TabsTopAnime from "@/components/AnimeList/TabsTopAnime"
import Header from "@/components/AnimeList/Header"

const TopManga = () => {

    const [topManga, setTopManga] = useState([])
    const [loading, setLoading] = useState(false)
    const [type, setType] = useState("")
    const [isMounted, setIsMounted] = useState(false)
    const isFirstRender = useRef(true);

    const fetchData = async () => {
        setLoading(true)
        try {
            const pupulerManga = await getAnimeResponse("top/manga", `limit=8${type && `&${type}`}`)
            setTopManga(pupulerManga)
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
            }, 2000);

            return () => clearTimeout(timer);
        } else {
            fetchData();
        }
    }, [type]);

    useEffect(() => {

        Object.keys(localStorage).forEach((key) => {
            if (key.includes("Page")) {
                localStorage.removeItem(key);
            }
            localStorage.removeItem("shortedBy")
        })
    }, [])


    useEffect(() => {
        setIsMounted(true)
    }, [])


    if (!isMounted) return <Skeleton />

    return (
        <div>
            <Header LinkHref={`/manga/topmanga${type && `?${type}`}`} title={"Top Manga"} LinkTitle={"Lihat semua..."} />
            <TabsTopAnime type={type} setType={setType} loading={loading} isTopAnime={false} />
            {loading ? (
                <Skeleton listSkeleton={false} />
            ) : (
                <div>
                    <AnimeList api={topManga} type="manga" />
                </div>
            )}

        </div>
    )
}

export default TopManga