import Header from "@/components/AnimeList/Header";
import AnimeList from "@/components/AnimeList";
import { getAnimeResponse, getNestedAnimeResponse, reproduce } from "@/libs/api-libs";

const Page = async () => {

  const topAnime = await getAnimeResponse("top/anime", "limit=8")

  // let recommendedAnime = await getNestedAnimeResponse("recommendations/anime", "entry")
  
  // const end = Math.floor(Math.random() * (200 - 4 + 1)) + 4
  // const start = end - 4
  // recommendedAnime = { data: recommendedAnime.slice(start, end) }

  // recommendedAnime = reproduce(recommendedAnime, 4)


  // const session = await getServerSession(authOption)
  // console.log("cek sesion", session)

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <section className="max-w-5xl">
        <Header LinkHref={"/populer"} title={"Anime Teratas"} LinkTitle={"Lihat semua..."} />
        <AnimeList api={topAnime} />
      </section>
      {/* <section className="max-w-5xl">
        <Header title={"Rekomendasi"} />
        {recommendedAnime.data.length < 1 || recommendedAnime == undefined ? (
          <p>Something went wrong!</p>
        ) : (
          <AnimeList api={recommendedAnime} />
        )}
      </section> */}
    </div>
  );
}

export default Page