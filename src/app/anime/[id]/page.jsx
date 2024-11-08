import VideoPlayer from "@/components/Utilities/VideoPlayer"
import { getAnimeResponse } from "@/libs/api-libs"
import Image from "next/image"
import BookmarkBtn from "@/components/AnimeList/BookmarkBtn"
import { authUserSession } from "@/libs/auth-libs"
import CollectionBtn from "@/components/AnimeList/CollectionBtn"
import prisma from "@/libs/prisma"
// import Notif from "@/components/AnimeList/Notif"

const Page = async ({ params: { id } }) => {

    const detailAnime = await getAnimeResponse(`anime/${id}`)
    const user = await authUserSession()

    const collection = user && await prisma.collection.findFirst({
        where: { user_email: user?.email, anime_mal_id: detailAnime.data.mal_id }
    })

    return (
        <div className="w-full flex flex-col justify-center items-center p-5">
            {/* <Notif notif_text={"Berhasil ditambahkan di Local"} isVisible={true}/> */}
            <div className="max-w-2xl">
                <div className="flex flex-col justify-center items-center pt-4">
                    <img
                        src={detailAnime.data.images.webp.large_image_url}
                        alt={detailAnime.data.images.jpg.large_image_url}
                        width={1000}
                        height={1000}
                        className="rounded max-w-96"
                        // priority
                    />

                    <div className="pt-6 w-full">
                        <div className="flex justify-between items-center py-2">
                            <p className="pb-1 font-bold text-xl">{detailAnime.data.title}</p>
                            {
                                user
                                    ?
                                    <CollectionBtn anime_mal_id={detailAnime.data.mal_id} anime_image={detailAnime.data.images.webp.image_url} user_email={user.email} anime_title={detailAnime.data.title} isCollection={collection} />
                                    :
                                    <BookmarkBtn mal_id={detailAnime.data.mal_id} images={detailAnime.data.images} title={detailAnime.data.title} />

                            }
                        </div>
                        <p className="text-justify ">{detailAnime.data.synopsis}</p>
                    </div>
                </div>
                <div className="pt-4 ">
                    <div className="flex border-b dark:border-[#333333] py-2">
                        <p className="w-32 border-r dark:border-[#333333]">English</p>
                        <p className="pl-7 hidden sm:block">{detailAnime.data.title_english}</p>
                        <p className="pl-7 block sm:hidden">{detailAnime.data.title_english?.length > 20 ? detailAnime.data.title_english.slice(0, 20) + "..." : detailAnime.data.title_english}</p>
                    </div>
                    <div className="flex border-b dark:border-[#333333] py-2">
                        <p className="w-32 border-r dark:border-[#333333]">Type</p>
                        <p className="pl-7">{detailAnime.data.type}</p>
                    </div>
                    <div className="flex border-b dark:border-[#333333] py-2">
                        <p className="w-32 border-r dark:border-[#333333]">Score</p>
                        <p className="pl-7">{detailAnime.data.score}</p>
                    </div>
                    <div className="flex border-b dark:border-[#333333] py-2">
                        <p className="w-32 border-r dark:border-[#333333]">Total Episode</p>
                        <p className="pl-7">{detailAnime.data.episodes}</p>
                    </div>
                    <div className="flex border-b dark:border-[#333333] py-2">
                        <p className="w-32 border-r dark:border-[#333333]">Genre</p>
                        <p className="pl-7">{detailAnime.data.genres.map(genre => genre.name).join(", ")}</p>
                    </div>
                    <div className="flex border-b dark:border-[#333333] py-2">
                        <p className="w-32 border-r dark:border-[#333333]">Released</p>
                        <p className="pl-7">{detailAnime.data.aired.string}</p>
                    </div>
                </div>
                <div className="mt-4">
                    <VideoPlayer youtubeId={detailAnime.data.trailer.youtube_id} />
                </div>
            </div>
        </div>
    )
}

export default Page