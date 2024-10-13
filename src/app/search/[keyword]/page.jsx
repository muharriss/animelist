import { getAnimeResponse } from "@/libs/api-libs";
import AnimeList from "@/components/AnimeList";
import Header from "@/components/AnimeList/Header";


const Page = async ({ params }) => {

  const decodedKeyword = decodeURI(params.keyword)
  const searcAnime = await getAnimeResponse("anime", `q=${decodedKeyword}`)

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <section className="max-w-5xl">
        <Header title={`Pencarian Untuk ${decodedKeyword}...`} />
        <AnimeList api={searcAnime} />
      </section>
    </div>
  );
}

export default Page