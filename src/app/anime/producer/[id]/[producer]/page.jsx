'use client'
import AnimeList from "@/components/AnimeList";
import Pagination from "@/components/Utilities/Pagination";
import { useEffect, useState } from "react";
import { getAnimeResponse } from "@/libs/api-libs";
import HeaderMenuGenre from "@/components/Utilities/HeaderMenuGenre";

const Page = ({ params: { id, producer } }) => {

    const [isMounted, setIsMounted] = useState(false);
    const [page, setPage] = useState(1);
    const [shortedBy, setShortedBy] = useState("members")
    const [animeProduser, setAnimeProducer] = useState([]);

    producer = decodeURI(producer)

    useEffect(() => {
        // Mengatur nilai page dari localStorage saat komponen di-mount di klien
        if (typeof window !== "undefined") {
            const savedPage = parseInt(localStorage.getItem(`${producer}Page`)) || 1;
            const savedshorted = localStorage.getItem(`shortedBy`) || "members";
            setPage(savedPage);
            setShortedBy(savedshorted)
            setIsMounted(true);
        }
    }, []);

    const fetchData = async () => {
        const animeProducer = await getAnimeResponse("anime", `sort=${shortedBy == "title" ? "asc" : "desc"}&producers=${id}&order_by=${shortedBy}&page=${page}`)
        setAnimeProducer(animeProducer)
    }

    useEffect(() => {
        if (isMounted) {
            fetchData();
            localStorage.setItem(`${producer}Page`, page);
            localStorage.setItem("shortedBy", shortedBy)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, isMounted, shortedBy]);


    // if (!isMounted) return null;

    return (
        <div className="w-full flex flex-col justify-center items-center">
            <section className="w-full max-w-5xl">
                <HeaderMenuGenre title={`${producer} Anime #${page}`} shortedBy={shortedBy} setShortedBy={setShortedBy} dataLength={animeProduser?.data?.length}/>
                <AnimeList api={animeProduser} />
                <Pagination setPage={setPage} page={page} lastPage={animeProduser.pagination?.last_visible_page} />
            </section>
        </div>
    );
}

export default Page