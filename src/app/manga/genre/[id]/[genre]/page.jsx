'use client'
import AnimeList from "@/components/AnimeList";
import Pagination from "@/components/Utilities/Pagination";
import { useEffect, useState } from "react";
import { getAnimeResponse } from "@/libs/api-libs";
import HeaderMenuGenre from "@/components/Utilities/HeaderMenuGenre";

const Page = ({ params: { id, genre } }) => {

    const [isMounted, setIsMounted] = useState(false);
    const [page, setPage] = useState(1);
    const [shortedBy, setShortedBy] = useState("members")
    const [animeGenre, setAnimeGenre] = useState([]);

    genre = decodeURI(genre)

    useEffect(() => {
        // Mengatur nilai page dari localStorage saat komponen di-mount di klien
        if (typeof window !== "undefined") {
            const savedPage = parseInt(localStorage.getItem(`${genre}MangaPage`)) || 1;
            const savedshorted = localStorage.getItem(`shortedBy`) || "members";
            setPage(savedPage);
            setShortedBy(savedshorted)
            setIsMounted(true);
        }
    }, []);

    const fetchData = async () => {
        const animeGenre = await getAnimeResponse("manga", `sort=${shortedBy == "title" ? "asc" : "desc"}&genres=${id}&order_by=${shortedBy}&page=${page}`)
        setAnimeGenre(animeGenre)
    }

    useEffect(() => {
        if (isMounted) {
            fetchData();
            localStorage.setItem(`${genre}MangaPage`, page);
            localStorage.setItem("shortedBy", shortedBy)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, isMounted, shortedBy]);


    // if (!isMounted) return null;

    return (
        <div className="w-full flex flex-col justify-center items-center">
            <section className="w-full max-w-5xl">
                <HeaderMenuGenre title={`Anime ${genre} #${page}`} shortedBy={shortedBy} setShortedBy={setShortedBy} dataLength={animeGenre?.data?.length}/>
                <AnimeList api={animeGenre} type="manga"/>
                <Pagination setPage={setPage} page={page} lastPage={animeGenre.pagination?.last_visible_page} />
            </section>
        </div>
    );
}

export default Page