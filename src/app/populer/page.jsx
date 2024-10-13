'use client'
import AnimeList from "@/components/AnimeList";
import HeaderMenu from "@/components/Utilities/HeaderMenu";
import Pagination from "@/components/Utilities/Pagination";
import { useEffect, useState } from "react";
import { getAnimeResponse } from "@/libs/api-libs";


const Page = () => {

    const [page, setPage] = useState(1)
    const [topAnime, setTopAnime] = useState([])

    const fetchData = async () => {
        const animeTeratas = await getAnimeResponse("top/anime", `page=${page}`)
        setTopAnime(animeTeratas)
    }

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])

    return (
        <div className="w-full flex flex-col justify-center items-center">
            <section className="max-w-5xl">
                <HeaderMenu title={`Anime Teratas #${page}`} />
                <AnimeList api={topAnime} />
                <Pagination setPage={setPage} page={page} lastPage={topAnime.pagination?.last_visible_page} />
            </section>
        </div>
    );
}

export default Page