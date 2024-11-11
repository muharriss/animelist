import Image from "next/image"
import Link from "next/link"

const AnimeList = ({ api }) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-center  pb-0 p-3 ">
            {api.data?.map((anime, index) => {
                return (
                    <Link href={`/anime/${anime.mal_id}`} className=" hover:text-[#1e88e5] transition-all pb-5 " key={index}>
                        <img 
                        src={anime.images.webp.image_url} 
                        alt={anime.images.jpg.image_url} 
                        width={1000} 
                        height={1000} 
                        // priority 
                        className="rounded-md" />
                        <p className="text-center font-bold pt-1 overflow-hidden text-nowrap">{anime.title.length > 18 ? anime.title.slice(0, 18) + "..." : anime.title}</p>
                    </Link>
                )
            })}
        </div>
    )
}

export default AnimeList