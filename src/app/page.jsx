import Header from "@/components/AnimeList/Header";
import AnimeList from "@/components/AnimeList";
import { getAnimeResponse, getNestedAnimeResponse, reproduce } from "@/libs/api-libs";
import SeasonalAnime from "@/components/AnimeList/SeasonalAnime";
// import TabsTopAnime from "@/components/AnimeList/TabsTopAnime";
import TopAnime from "@/components/AnimeList/TopAnime";

const Page = async () => {

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // const topAnime = await getAnimeResponse("top/anime", "limit=8")
  let recommendedAnime = await getNestedAnimeResponse("recommendations/anime", "entry")

  // const end = Math.floor(Math.random() * (200 - 4 + 1)) + 4
  // const start = end - 4
  // recommendedAnime = { data: recommendedAnime.slice(start, end) }

  recommendedAnime = reproduce(recommendedAnime, 4)
  // const session = await getServerSession(authOption)
  // console.log("cek sesion", session)

  // const seasonAnime = await getAnimeResponse("seasons/now", "limit=1")
  const upcoming = await getAnimeResponse("seasons/upcoming", "limit=4")

  // const seasonsList = await getAnimeResponse("seasons")
  // const dataSeasonsList = seasonsList.data.flatMap(({ year, seasons }) =>
  //   seasons.reverse().map((season) => ({ season, year }))
  // );

  return (
    <div className=" w-full  flex flex-col justify-center items-center gap-5">
      <section className=" pt-3 w-full max-w-5xl">
        <SeasonalAnime />
      </section>
      {await delay(500)}
      <section className="w-full max-w-5xl">
        <Header LinkHref={"/anime/upcoming"} title={"Akan Datang"} LinkTitle={"Lihat semua..."} />
        <AnimeList api={upcoming} />
      </section>
      {await delay(500)}
      <section className="w-full max-w-5xl">
        <TopAnime />
      </section>
      {await delay(500)}
      <section className="pb-5 w-full max-w-5xl">
        <Header title={"Rekomendasi"} />
        {recommendedAnime.data?.length < 1 || recommendedAnime == undefined ? (
          <p>Something went wrong!</p>
        ) : (
          <AnimeList api={recommendedAnime} />
        )}
      </section>
    </div>
  );
}

export default Page