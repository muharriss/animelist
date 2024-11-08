import DeleteCollectionBtn from "@/components/AnimeList/DeleteCollectionBtn"
import Header from "@/components/AnimeList/Header"
import { authUserSession } from "@/libs/auth-libs"
import prisma from "@/libs/prisma"
import Image from "next/image"
import Link from "next/link"

const Page = async () => {

    const user = await authUserSession()
    const collection = await prisma.collection.findMany({ where: { user_email: user.email } })

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="max-w-5xl">
                <Header title="My Collection" />
                {
                    collection.length == 0
                        ?
                        <div className="h-screen flex justify-center items-center mt-[-141px]">
                            <p>Bookmark kosong</p>
                        </div>
                        :
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 justify-center pb-5 px-3 " >
                            {collection.map(anime => {
                                return (
                                    <div key={anime.anime_mal_id} className="relative m-1 hover:text-[#1e88e5] transition-all">
                                        <DeleteCollectionBtn anime_mal_id={anime.anime_mal_id} user_email={user.email} />
                                        <Link href={`/anime/${anime.anime_mal_id}`}>
                                            <img
                                            src={anime.anime_image} 
                                            alt={"image"} 
                                            width={1000} 
                                            height={1000} 
                                            // priority 
                                            className="rounded-md" />
                                            <p className="text-center font-bold pt-1 ">{anime.anime_title}</p>
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