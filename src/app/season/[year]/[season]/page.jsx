'use client'
import AnimeList from "@/components/AnimeList";
import HeaderMenu from "@/components/Utilities/HeaderMenu";
import Pagination from "@/components/Utilities/Pagination";
import { useEffect, useState } from "react";
import { getAnimeResponse } from "@/libs/api-libs";


const Page = ({ params: { year, season } }) => {
   
    const [isMounted, setIsMounted] = useState(false);
    const [page, setPage] = useState(1);
    const [seasonAnime, setSeasonAnime] = useState([]);

    useEffect(() => {
        // Mengatur nilai page dari localStorage saat komponen di-mount di klien
        if (typeof window !== "undefined") {
            const savedPage = parseInt(localStorage.getItem(`${season}${year}Page`)) || 1;
            setPage(savedPage);
            setIsMounted(true);
        }
    }, []);

    const fetchData = async () => {
        const seasonAnime = await getAnimeResponse(`seasons/${year}/${season}`, `page=${page}`)
        setSeasonAnime(seasonAnime)
    }

    useEffect(() => {
        if (isMounted) {
            fetchData();
            localStorage.setItem(`${season}${year}Page`, page);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, isMounted]);


    // if (!isMounted) return null;

    return (
        <div className="w-full flex flex-col justify-center items-center">
            <section className="w-full max-w-5xl">
                <HeaderMenu title={`Anime ${season} ${year} #${page}`} />
                <AnimeList api={seasonAnime} />
                <Pagination setPage={setPage} page={page} lastPage={seasonAnime.pagination?.last_visible_page} />
            </section>
        </div>
    );
}

export default Page