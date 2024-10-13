'use client'

import { BookmarkSimple, X } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

const BookmarkBtn = ({ mal_id, images, title }) => {

    const [isBrowser, setIsBrowser] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false)

    const detailAnime = {
        mal_id: mal_id,
        title: title,
        images: images
    }

    useEffect(() => {
        setIsBrowser(true);

        const existingBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
        const isBookmark = existingBookmarks.some(
            (anime) => anime.mal_id === detailAnime.mal_id
        )

        if (isBookmark) {
            setIsBookmarked(true)
        } else {
            setIsBookmarked(false)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleBookmark = () => {

        if (isBrowser) {

            const existingBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
            const isBookmark = existingBookmarks.some(
                (anime) => anime.mal_id === detailAnime.mal_id
            )

            if (!isBookmark) {
                const updateBookmarks = [...existingBookmarks, detailAnime]
                localStorage.setItem("bookmarks", JSON.stringify(updateBookmarks))
                setIsBookmarked(true)
            } else {
                const existingBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
                const updatedBookmarks = existingBookmarks.filter(
                    (anime) => anime.mal_id !== detailAnime.mal_id
                );
                localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
                setIsBookmarked(false)
            }

        }

    }

    return (
        <div>
            {
                isBookmarked
                    ?
                    <div className="cursor-pointer flex justify-center items-center border border-gray-400 rounded px-2 w-24" onClick={handleBookmark} title="remove from collection">
                        <div className="relative">
                            <BookmarkSimple size={25} />
                            <X size={12} className="absolute top-[16%] right-[25%] " weight="bold" />
                        </div>
                        <p className="text-sm font-bold">Hapus</p>
                    </div>
                    :
                    <div title="Add to collection" className="flex justify-center items-center border border-gray-400 rounded px-2 w-24 cursor-pointer" onClick={handleBookmark}>
                        <BookmarkSimple size={25} />
                        <p className="text-sm font-bold">Collect</p>
                    </div>
            }
        </div>

    )
}

export default BookmarkBtn
