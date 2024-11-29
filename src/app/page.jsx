import Header from "@/components/AnimeList/Header";
import AnimeList from "@/components/AnimeList";
import { getAnimeResponse, getNestedAnimeResponse, reproduce } from "@/libs/api-libs";
import SeasonalAnime from "@/components/AnimeList/SeasonalAnime";
// import Intro from "@/components/AnimeList/Intro";

//testing

const Page = async () => {

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const topAnime = await getAnimeResponse("top/anime", "limit=8")
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
    <div className=" w-full flex flex-col justify-center items-center gap-5">
      {/* <div className="overflow-hidden rounded-md">
        <img
          src={upcoming.data[2].trailer.images.maximum_image_url} className="h-[50vh] w-screen max-w-[950px] object-cover "
          alt={upcoming.data[2].trailer.images.large_image_url}
       />
      </div> */}
      {/* <Intro upcoming={upcoming}/> */}
      <section className=" pt-3">
        {/* <Header LinkHref={"/season"} title={"Seasonal Anime"} LinkTitle={"Lihat semua..."} /> */}
        {/* <SeasonalAnime seasonNow={seasonAnime.data[0].season} yearNow = {seasonAnime.data[0].year}/> */}
        <SeasonalAnime />
      </section>
      {await delay(500)}
      <section className="">
        <Header LinkHref={"/upcoming"} title={"Akan Datang"} LinkTitle={"Lihat semua..."} />
        <AnimeList api={upcoming} />
      </section>
      {await delay(500)}
      <section className="">
        <Header LinkHref={"/populer"} title={"Anime Teratas"} LinkTitle={"Lihat semua..."} />
        <AnimeList api={topAnime} />
      </section>
      {await delay(500)}
      <section className="pb-5">
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