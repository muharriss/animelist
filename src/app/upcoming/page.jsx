'use client'
import AnimeList from "@/components/AnimeList";
import HeaderMenu from "@/components/Utilities/HeaderMenu";
import Pagination from "@/components/Utilities/Pagination";
import { useEffect, useState } from "react";
import { getAnimeResponse } from "@/libs/api-libs";


const Page = () => {
   
    const [isMounted, setIsMounted] = useState(false);
    const [page, setPage] = useState(1);
    const [upcoming, setUpcoming] = useState([]);

    useEffect(() => {
        // Mengatur nilai page dari localStorage saat komponen di-mount di klien
        if (typeof window !== "undefined") {
            const savedPage = parseInt(localStorage.getItem("upcomingPage")) || 1;
            setPage(savedPage);
            setIsMounted(true);
        }
    }, []);

    const fetchData = async () => {
        const upcoming = await getAnimeResponse("seasons/upcoming", `page=${page}`)
        setUpcoming(upcoming)
    }

    useEffect(() => {
        if (isMounted) {
            fetchData();
            localStorage.setItem("upcomingPage", page);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, isMounted]);


    // if (!isMounted) return null;

    return (
        <div className="w-full flex flex-col justify-center items-center">
            <section className="w-full max-w-5xl">
                <HeaderMenu title={`Anime Yang Akan Datang #${page}`} />
                <AnimeList api={upcoming} />
                <Pagination setPage={setPage} page={page} lastPage={upcoming.pagination?.last_visible_page} />
            </section>
        </div>
    );
}

export default Page