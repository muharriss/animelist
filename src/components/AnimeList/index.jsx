import Image from "next/image"
import Link from "next/link"

const AnimeList = ({ api }) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 justify-center pb-5 px-3 ">
            {api.data?.map((anime, index) => {
                return (
                    <Link href={`/anime/${anime.mal_id}`} className="m-1 hover:text-[#1e88e5] transition-all" key={index}>
                        <Image src={anime.images.webp.image_url} alt={anime.images.jpg.image_url} width={1000} height={1000} priority className="rounded-md" />
                        <p className="text-center font-bold pt-1 ">{anime.title}</p>
                    </Link>
                )
            })}
        </div>
    )
}

export default AnimeList