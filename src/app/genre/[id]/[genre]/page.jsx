'use client'
import AnimeList from "@/components/AnimeList";
import HeaderMenu from "@/components/Utilities/HeaderMenu";
import Pagination from "@/components/Utilities/Pagination";
import { useEffect, useState } from "react";
import { getAnimeResponse } from "@/libs/api-libs";


const Page = ({params: {id, genre}}) => {
   
    const [isMounted, setIsMounted] = useState(false);
    const [page, setPage] = useState(1);
    const [shortedBy, setShortedBy] = useState("members")
    const [animeGenre, setAnimeGenre] = useState([]);

    useEffect(() => {
        // Mengatur nilai page dari localStorage saat komponen di-mount di klien
        if (typeof window !== "undefined") {
            const savedPage = parseInt(localStorage.getItem(`${genre}Page`)) || 1;
            setPage(savedPage);
            setIsMounted(true);
        }
    }, []);

    const fetchData = async () => {
        const animeGenre = await getAnimeResponse("anime", `sort=desc&genres=${id}&order_by=${shortedBy}&page=${page}`)
        setAnimeGenre(animeGenre)
    }

    useEffect(() => {
        if (isMounted) {
            fetchData();
            localStorage.setItem(`${genre}Page`, page);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, isMounted]);


    // if (!isMounted) return null;

    return (
        <div className="w-full flex flex-col justify-center items-center">
            <section className="max-w-5xl">
                <HeaderMenu title={`Anime ${genre} #${page}`} />
                <AnimeList api={animeGenre} />
                <Pagination setPage={setPage} page={page} lastPage={animeGenre.pagination?.last_visible_page} />
            </section>
        </div>
    );
}

export default Page