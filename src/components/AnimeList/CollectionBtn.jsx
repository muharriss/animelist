"use client"

import { BookmarkSimple, X } from "@phosphor-icons/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
// import Notif from "./Notif"

const CollectionBtn = ({ anime_mal_id, anime_image, anime_title, user_email, isCollection }) => {

    const [isCreated, setIsCreated] = useState(false)
    // const [isVisible, setIsVisible] = useState(false)
    const router = useRouter()

    useEffect(() => {

        if (isCollection) {
            setIsCreated(true)
        } else {
            setIsCreated(false)
        }


    }, [isCollection])

    const handleCollection = async (event) => {
        event.preventDefault()
        if (!isCreated) {

            const data = { anime_mal_id, user_email, anime_image, anime_title }

            const response = await fetch('/api/v1/collection', {
                method: "POST",
                body: JSON.stringify(data)
            })

            const collection = await response.json()
            if (collection.status == 200) {
                setIsCreated(true)
                router.refresh()

                // setIsVisible(true); // Tampilkan teks
                // setTimeout(() => setIsVisible(false), 1500);
            }
        } else {

            const data = { anime_mal_id, user_email }
            const response = await fetch("/api/v1/collection", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            })
            const collection = await response.json()
            if (collection.status == 200) {
                setIsCreated(false)
                router.refresh()
            }
        }
    }

    return (
        <div>
            {/* <div className="hidden">
                <Notif isVisible={isVisible} />
            </div> */}
            {
                isCreated
                    ?
                    <div className="cursor-pointer flex justify-center items-center border border-gray-400 rounded px-2 w-24" onClick={handleCollection} title="remove from collection">
                        <div className="relative">
                            <BookmarkSimple size={25} />
                            <X size={12} className="absolute top-[16%] right-[25%] " weight="bold" />
                        </div>
                        <p className="text-sm font-bold">Hapus</p>
                    </div>
                    :
                    <div title="Add to collection" className="flex justify-center items-center border border-gray-400 rounded px-2 w-24 cursor-pointer" onClick={handleCollection}>
                        <BookmarkSimple size={25} />
                        <p className="text-sm font-bold">Collect</p>
                    </div>
            }
        </div>
    )
}

export default CollectionBtn