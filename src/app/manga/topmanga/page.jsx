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
    const [topManga, setTopManga] = useState([]);
    const [topMangaName, setTopMangaName] = useState("Top")

    const searchParams = useSearchParams();
    const type = searchParams.get("type")
    const filter = searchParams.get("filter")

    useEffect(() => {
        // Mengatur nilai page dari localStorage saat komponen di-mount di klien
        if (typeof window !== "undefined") {
            const savedPage = parseInt(localStorage.getItem("topmangaPage")) || 1;
            setTopMangaName(localStorage.getItem("topMangaName"))
            setPage(savedPage);
            setIsMounted(true);
        }
    }, []);

    const fetchData = async () => {
        const mangaTeratas = await getAnimeResponse("top/manga", `page=${page}&${filter && `filter=${filter}`}&${type && `type=${type}`}`)
        setTopManga(mangaTeratas)
    }

    useEffect(() => {
        if (isMounted) {
            fetchData();
            localStorage.setItem("topmangaPage", page);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, isMounted]);


    // if (!isMounted) return null;

    return (
        <div className="w-full flex flex-col justify-center items-center">
            <section className="w-full max-w-5xl">
                <HeaderMenu title={`${topMangaName} #${page}`} />
                <AnimeList api={topManga} type="manga" />
                <Pagination setPage={setPage} page={page} lastPage={topManga.pagination?.last_visible_page} />
            </section>
        </div>
    );
}

export default Page