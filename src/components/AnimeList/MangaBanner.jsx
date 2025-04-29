// "use client"

// import { Heart, Star, Users } from "@phosphor-icons/react"
// import Link from "next/link"
// import { useEffect, useState } from "react"

// const MangaBanner = ({ api }) => {

//   const [index, setIndex] = useState(0)
//   const [isNext, setIsNext] = useState(false)

//   const nextIndex = () => {
//     setIndex(prev => prev + 1)
//     if (index == 3) {
//       setIndex(0)
//     }
//   }

//   useEffect(() => {
//     const interval = setInterval(() => {
//       nextIndex();
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [index]);

//   useEffect(() => {
//     try {
//       setIsNext(true)
//     } finally {
//       setTimeout(() => {
//         setIsNext(false)
//       }, 2000);
//     }
//   }, [index])

//   return (
//     <div className="overflow-hidden rounded-md mt-2  relative ">

//       {api.data ?
//         <img
//           src={api.data[index]?.images.webp.large_image_url} className="h-[50vh] w-full  object-cover"
//           alt="manga image"
//         /> : (<div className="h-[50vh] w-full bg-gray-300  animate-pulse dark:bg-gray-700 " />)}

//       <div className="absolute top-0 h-full w-full bg-neutral-950/60 md:bg-transparent md:bg-gradient-to-r md:from-neutral-950/80" />
//       {api.data && <div className={`absolute top-1/2 left-5 transform -translate-y-1/2 sm:left-14`}>
//         <div className={`flex flex-col ${isNext ? "slide-in-left" : ""}`}>
//           <div className="flex gap-5">
//             {api.data[index]?.score && <div className="flex items-center gap-1">
//               <Star weight="fill" size={20} className="text-yellow-500" />
//               <p className="text-yellow-500">{api.data[index]?.score}</p>
//               <p className="text-neutral-50"> ({api.data[index]?.scored_by})</p>
//             </div>}
//             {!api.data[index]?.score && <div className="flex items-center gap-1 text-neutral-50">
//               <Users size={23} />
//               <p >{api.data[index]?.members}</p>
//             </div>}
//             {api.data[index]?.favorites && <div className="flex items-center gap-1">
//               <Heart size={20} weight="fill" className="text-rose-500" />
//               <p className="text-neutral-50">{api.data[index]?.favorites}</p>
//             </div>}
//           </div>
//           <Link href={`/anime/${api.data[index]?.mal_id}`} className="text-neutral-50 font-bold text-[2rem] sm:text-[3rem] ">{api.data[index]?.title}</Link>
//           <h2 className="text-neutral-200 font-medium sm:text-[1rem]">
//             {api.data[index]?.title_japanese}
//           </h2>
//         </div>
//       </div>}
//     </div>
//   )
// }

// export default MangaBanner



const MangaBanner = () => {
  return (
    <div className="overflow-hidden rounded-md mt-2  relative">

      <img
        src={"/berserk.jpg"} className="h-[50vh] w-full  object-cover"
        alt="manga image"
      />

      <div className="absolute top-0 h-full w-full bg-neutral-950/60 md:bg-transparent md:bg-gradient-to-r md:from-neutral-950/80" />
      <div className={`absolute w-full flex justify-center items-center top-1/2  transform -translate-y-1/2 `}>
        <div className={`flex flex-col justify-center items-center`}>
          <p className="text-neutral-50 font-bold text-[2rem] sm:text-[3rem] ">Top Manga</p>
          <h2 className="text-neutral-200 font-medium sm:text-[1rem]">
          Top Ranked Manga of All Time
          </h2>
        </div>
      </div>
    </div>
  )
}

export default MangaBanner