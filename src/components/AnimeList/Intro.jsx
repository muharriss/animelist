"use client"

import { Users } from "@phosphor-icons/react"
import { useEffect, useState } from "react"

const Intro = ({ api, index }) => {

  const [isNext, setIsNext] = useState(false)
  useEffect(() => {
    try {
      setIsNext(true)
    } finally {
      setTimeout(() => {
        setIsNext(false)
      }, 2000);
    }
  }, [index])

  return (
    <div className="overflow-hidden rounded-md mt-2 max-w-[950px] relative">
      <img
        src={api.data ? api.data[index].trailer.images.maximum_image_url : null} className="h-[50vh] w-screen  object-cover over"
        alt={api.data ? api.data[index].trailer.images.large_image_url : null}
      />
      <div className="absolute top-0 h-full w-full bg-neutral-950/60 md:bg-transparent md:bg-gradient-to-r md:from-neutral-950/80" />
      {api.data && <div className={`absolute top-1/2 left-5 transform -translate-y-1/2 sm:left-14`}>
        <div className={`flex flex-col ${isNext ? "slide-in-left" : ""}`}>
          <div className="flex gap-5">
            {api.data[index].score && <div className="flex items-center gap-1">
              <p className="text-2xl text-yellow-500">★</p>
              <p className="text-yellow-500">{api.data[index].score}</p>
              <p className="text-neutral-50"> ({api.data[index].scored_by})</p>
            </div>}
            {!api.data[index].score && <div className="flex items-center gap-1 text-neutral-50">
              <Users size={23} />
              <p >{api.data[index].members}</p>
            </div>}
            {api.data[index].favorites && <div className="flex items-center gap-1">
              <p className="text-rose-500 text-xl">❤︎</p>
              <p className="text-neutral-50">{api.data[index].favorites}</p>
            </div>}
          </div>
          <h1 className="text-neutral-50 font-bold text-[2rem] sm:text-[3rem] ">{api.data[index].title}</h1>
          <h2 className="text-neutral-200 font-medium sm:text-[1rem]">
            {api.data[index].title_japanese}
          </h2>
        </div>
      </div>}
    </div>
  )
}

export default Intro