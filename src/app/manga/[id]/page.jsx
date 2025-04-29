import { getAnimeResponse } from "@/libs/api-libs"
import Image from "next/image"
import BookmarkBtn from "@/components/AnimeList/BookmarkBtn"
import { authUserSession } from "@/libs/auth-libs"
import CollectionBtn from "@/components/AnimeList/CollectionBtn"
import prisma from "@/libs/prisma"
import Link from "next/link"
import MoreDetailAnimeInfo from "@/components/AnimeList/MoreDetailAnimeInfo"
import CharactersSection from "@/components/AnimeList/CharactersSection"

const Page = async ({ params: { id } }) => {

    const detailManga = await getAnimeResponse(`manga/${id}`)
    const user = await authUserSession()

    const collection = user && await prisma.collection.findFirst({
        where: { user_email: user?.email, anime_mal_id: detailManga.data.mal_id }
    })

    const charactersManga = await getAnimeResponse(`manga/${id}/characters`)

    return (
        <div className="w-full flex flex-col justify-center items-center p-5">
            <div className="w-full max-w-2xl">
                <div className="flex flex-col justify-center items-center pt-4">
                    <img
                        src={detailManga.data.images.webp.large_image_url}
                        alt="manga image"
                        width={1000}
                        height={1000}
                        className="rounded-md max-w-96"
                    // priority
                    />

                    <div className="pt-6 w-full">
                        <div className="flex justify-between items-center py-2 gap-3">
                            <p className={`pb-1 font-bold text-xl  ${detailManga.data.title.trim().split(/\s+/).length < 2 ? "break-all" : ""}`}>{detailManga.data.title}</p>
                            {/* {
                                user
                                    ?
                                    <CollectionBtn anime_mal_id={detailManga.data.mal_id} anime_image={detailManga.data.images.webp.image_url} user_email={user.email} anime_title={detailManga.data.title} isCollection={collection} />
                                    :
                                    <BookmarkBtn mal_id={detailManga.data.mal_id} images={detailManga.data.images} title={detailManga.data.title} />

                            } */}
                        </div>
                        <p className="text-justify ">{detailManga.data.synopsis}</p>
                    </div>
                </div>
                <div className="pt-4 ">
                    <div className="flex border-b dark:border-[#333333] py-2">
                        <p className="min-w-32 border-r dark:border-[#333333]">English</p>
                        <p className="pl-7 hidden sm:block">{detailManga.data.title_english ? detailManga.data.title_english : "-"}</p>
                        <p className="pl-7 block sm:hidden">{detailManga.data.title_english?.length > 20 ? detailManga.data.title_english.slice(0, 20) + "..." : detailManga.data.title_english ? detailManga.data.title_english : "-"}</p>
                    </div>
                    <div className="flex border-b dark:border-[#333333] py-2">
                        <p className="min-w-32 border-r dark:border-[#333333]">Type</p>
                        <p className="pl-7">{detailManga.data.type ? detailManga.data.type : "Unknown"}</p>
                    </div>
                    <div className="flex border-b dark:border-[#333333] py-2">
                        <p className="min-w-32 border-r dark:border-[#333333]">Score</p>
                        <p className="pl-7">{detailManga.data.score ? detailManga.data.score + " (" + detailManga.data.scored_by + " users)" : "N/A"}</p>
                    </div>
                    <div className="flex border-b dark:border-[#333333] py-2">
                        <p className="min-w-32 border-r dark:border-[#333333]">Volumes</p>
                        <p className="pl-7">{detailManga.data.volumes ? detailManga.data.volumes : "Unknown"}</p>
                    </div>
                    <div className="flex border-b dark:border-[#333333] py-2">
                        <p className="min-w-32 border-r dark:border-[#333333]">Chapters</p>
                        <p className="pl-7">{detailManga.data.chapters ? detailManga.data.chapters : "Unknown"}</p>
                    </div>
                    <div className="flex border-b dark:border-[#333333] py-2">
                        <p className="min-w-32 border-r dark:border-[#333333]">Status</p>
                        <p className="pl-7">{detailManga.data.status ? detailManga.data.status : "Unknown"}</p>
                    </div>
                    <div className="flex border-b dark:border-[#333333] py-2">
                        <p className="min-w-32 border-r dark:border-[#333333]">Published</p>
                        <p className="pl-7">{detailManga.data.published.string ? detailManga.data.published.string : "Unknown"}</p>
                    </div>
                    <div className="flex border-b dark:border-[#333333] py-2">
                        <p className="min-w-32 border-r dark:border-[#333333]">Genres</p>
                        <p className="pl-7">
                            {detailManga.data.genres.length > 0 ?
                                detailManga.data.genres
                                    .map((genre, index) =>
                                        <span key={genre.mal_id}>
                                            <Link href={`/manga/genre/${genre.mal_id}/${genre.name}`} className="text-[#1e88e5]">
                                                {genre.name}
                                            </Link>
                                            {index < detailManga.data.genres.length - 1 && ", "}
                                        </span>
                                    )
                                : "Unknown"}
                        </p>
                    </div>
                    <div className="flex border-b dark:border-[#333333] py-2">
                        <p className="min-w-32 border-r dark:border-[#333333]">Serialization</p>
                        <p className="pl-7">{detailManga.data.serializations.length > 0 ?
                            detailManga.data.serializations
                                .map((serialization, index) => {
                                    return (
                                        <span key={serialization.mal_id}>
                                            <Link href={`/manga/magazine/${serialization.mal_id}/${serialization.name}`} className="text-[#1e88e5]">
                                                {serialization.name}
                                            </Link>
                                            {index < detailManga.data.serializations.length - 1 && ", "}
                                        </span>
                                    )
                                })
                            : "Unknown"}
                        </p>
                    </div>
                    <div className="flex border-b dark:border-[#333333] py-2">
                        <p className="min-w-32 border-r dark:border-[#333333]">Authors</p>
                        <p className="pl-7">{detailManga.data.authors.length > 0 ?
                            detailManga.data.authors
                                .map((author, index) => {
                                    return (
                                        <span key={author.mal_id}>
                                            {author.name}
                                            {index < detailManga.data.authors.length - 1 && ", "}
                                        </span>
                                    )
                                })
                            : "Unknown"}
                        </p>
                    </div>
                    {/* <MoreDetailAnimeInfo detailAnime={detailManga} /> */}
                </div>
                <div className="py-4 pt-8">
                    <h1 className="font-bold text-xl border-l-4 border-[#1e88e5] pl-3 ">Characters</h1>
                </div>
                <CharactersSection charactersAnime={charactersManga} />
            </div>
        </div>
    )
}

export default Page