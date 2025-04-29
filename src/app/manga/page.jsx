import AnimeList from "@/components/AnimeList"
import Header from "@/components/AnimeList/Header"
import MangaBanner from "@/components/AnimeList/MangaBanner"
import TopManga from "@/components/AnimeList/TopManga"
import { getAnimeResponse, getNestedAnimeResponse, reproduce } from "@/libs/api-libs"


const Page = async () => {

    const topManga = await getAnimeResponse("top/manga", "limit=8")

    let recommendedManga = await getNestedAnimeResponse("recommendations/manga", "entry")
    recommendedManga = reproduce(recommendedManga, 4)


    return (
        <div className="flex flex-col justify-center items-center  ">
            <section className="w-full max-w-5xl px-3 pt-3">
                <MangaBanner />
            </section>
            <section className="w-full max-w-5xl ">
                {/* <Header title={"Top manga"} LinkTitle={"Lihat semua..."} LinkHref={"/manga/topmanga"} />
                <AnimeList api={topManga} type="manga"/> */}
                <TopManga />
            </section>
            <section className="w-full max-w-5xl">
                <Header title={"Rekomendasi Manga"} />
                <AnimeList api={recommendedManga} type="manga" />
            </section>
        </div>
    )
}

export default Page