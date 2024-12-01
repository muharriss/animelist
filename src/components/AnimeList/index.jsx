import Image from "next/image"
import Link from "next/link"

const AnimeList = ({ api }) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-center  pb-0 p-3 ">
            {api.data?.map((anime, index) => {
                return (
                    <div key={index} className="relative">
                        {
                            //if there is no score and favorites, set null. if not, show component
                            !anime.score && !anime.favorites ? null :
                                (
                                    //if there is score, show score. if not, show favorites.
                                    anime.score ?
                                        (
                                            <div className="flex justify-center items-center gap-1 absolute right-0 bg-yellow-500 bg-opacity-[85%] m-1 p-1  rounded-md z-[5]">
                                                <p className="text-white">★</p>
                                                <p className="text-gray-200 text-sm">{anime.score}</p>
                                            </div>
                                        ) :
                                        (
                                            <div className="flex justify-center items-center gap-1 absolute right-0 bg-rose-400 bg-opacity-[85%] m-1 p-1  rounded-md z-[5]">
                                                <p className="text-white text-sm ">❤</p>
                                                <p className="text-gray-200 text-sm">{anime.favorites}</p>
                                            </div>
                                        )
                                )
                        }
                        <Link href={`/anime/${anime.mal_id}`} className=" hover:text-[#1e88e5] transition-all pb-5 " >
                            <img
                                src={anime.images.webp.image_url}
                                alt={anime.images.jpg.image_url}
                                width={1000}
                                height={1000}
                                // priority 
                                className="rounded-md" />
                            <p className="text-center font-bold pt-1 overflow-hidden text-nowrap">{anime.title.length > 18 ? anime.title.slice(0, 18) + "..." : anime.title}</p>
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}

export default AnimeList