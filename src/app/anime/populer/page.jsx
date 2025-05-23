'use client'
import AnimeList from "@/components/AnimeList";
import HeaderMenu from "@/components/Utilities/HeaderMenu";
import Pagination from "@/components/Utilities/Pagination";
import { useEffect, useState } from "react";
import { getAnimeResponse } from "@/libs/api-libs";
import { useSearchParams } from "next/navigation";


const Page = () => {

    const [isMounted, setIsMounted] = useState(false);
    const [page, setPage] = useState(1);
    const [topAnime, setTopAnime] = useState([]);
    const [topAnimeName,setTopAnimeName] = useState("Top")

    const searchParams = useSearchParams();
    const type = searchParams.get("type")
    const filter = searchParams.get("filter")

    useEffect(() => {
        // Mengatur nilai page dari localStorage saat komponen di-mount di klien
        if (typeof window !== "undefined") {
            const savedPage = parseInt(localStorage.getItem("populerPage")) || 1;
            setTopAnimeName(localStorage.getItem("topAnimeName"))
            setPage(savedPage);
            setIsMounted(true);
        }
    }, []);

    const fetchData = async () => {
        const animeTeratas = await getAnimeResponse("top/anime", `page=${page}&${filter && `filter=${filter}`}&${type && `type=${type}`}`)
        setTopAnime(animeTeratas)
    }

    useEffect(() => {
        if (isMounted) {
            fetchData();
            localStorage.setItem("populerPage", page);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, isMounted]);


    // if (!isMounted) return null;

    return (
        <div className="w-full flex flex-col justify-center items-center">
            <section className="w-full max-w-5xl">
                <HeaderMenu title={`${topAnimeName} #${page}`} />
                <AnimeList api={topAnime} />
                <Pagination setPage={setPage} page={page} lastPage={topAnime.pagination?.last_visible_page} />
            </section>
        </div>
    );
}

export default Page