"use client"

const DeleteBookmarkBtn = ({ mal_id, onDelete }) => {
    // const router = useRouter()

    // const detailAnime = {
    //     mal_id: mal_id,
    //     title: title,
    //     images: images
    // }

    // const handleDeleteBookmark = () => {

    //     const existingBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    //     const updatedBookmarks = existingBookmarks.filter(
    //         (anime) => anime.mal_id !== detailAnime.mal_id
    //     );
    //     localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
    //     // router.refresh()

    // }

    const handleDeleteBookmark = () => {
       onDelete(mal_id)
    }

    return (
        <div>
            <button
                className="bg-white absolute top-0 right-0 rounded-md rounded-tl-none  rounded-br-none  p-1 px-3 text-sm text-red-500 hover:bg-slate-200 z-10"
                onClick={handleDeleteBookmark}>
                Hapus
            </button>
        </div>
    )
}

export default DeleteBookmarkBtn