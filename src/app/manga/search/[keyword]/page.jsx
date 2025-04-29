import { getAnimeResponse } from "@/libs/api-libs";
import AnimeList from "@/components/AnimeList";
import Header from "@/components/AnimeList/Header";


const Page = async ({ params }) => {

  const decodedKeyword = decodeURI(params.keyword)
  const searchManga = await getAnimeResponse("manga", `q=${decodedKeyword}`)

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <section className="w-full max-w-5xl">
        <Header title={`Pencarian Untuk ${decodedKeyword}...`} />
        <AnimeList api={searchManga} type="manga"/>
      </section>
    </div>
  );
}

export default Page