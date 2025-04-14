"use client"

import DeleteBookmarkBtn from "@/components/AnimeList/DeleteBookmarkBtn"
import Header from "@/components/AnimeList/Header"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"


const Page = () => {

    const [bookmarks, setBookmarks] = useState([]);

    useEffect(() => {

        const handleStorageChange = () => {
            const collectionAnime = JSON.parse(localStorage.getItem("bookmarks"))
            setBookmarks(collectionAnime)
        }

        handleStorageChange()

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };

    }, []);

    const handleDeleteBookmark = (mal_id) => {
        const updatedBookmarks = bookmarks.filter((anime) => anime.mal_id !== mal_id);
        localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
        setBookmarks(updatedBookmarks);
    };

    return (
        <div className=" w-full flex flex-col justify-center items-center">
            <div className="w-full max-w-5xl">
                <Header title="My Collection" />
                {
                    bookmarks == undefined || bookmarks.length == 0
                        ?
                        <div className="h-screen flex justify-center items-center mt-[-141px]">
                            <p>Bookmark kosong</p>
                        </div>
                        :
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 justify-center pb-5 px-3 " >
                            {bookmarks.map(anime => {
                                return (
                                    <div key={anime.mal_id} className="relative m-1 hover:text-[#1e88e5] transition-all">
                                        <DeleteBookmarkBtn  mal_id={anime.mal_id} onDelete={handleDeleteBookmark}/>
                                        <Link href={`/anime/${anime.mal_id}`}>
                                            <img
                                            src={anime.images.webp.image_url} 
                                            alt={anime.images.jpg.image_url} 
                                            width={1000} 
                                            height={1000} 
                                            // priority 
                                            className="rounded-md" />
                                            <p className="text-center font-bold pt-1 ">{anime.title}</p>
                                        </Link>
                                    </div>
                                )
                            })}
                        </div>

                }
            </div>
        </div>
    )
}

export default Page