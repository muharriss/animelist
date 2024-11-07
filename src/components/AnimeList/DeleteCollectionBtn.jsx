"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

const DeleteCollectionBtn = ({ anime_mal_id, user_email }) => {

    const [loading, setLoading] = useState(false)

    const router = useRouter()

    const handleDeleteCollection = async () => {
        setLoading(true)

        try {
            const data = { anime_mal_id, user_email }
            const response = await fetch("/api/v1/collection", {
                method: "DELETE",
                body: JSON.stringify(data)
            })
            const collection = await response.json()
            if (collection.status == 200) {
                console.log("delete success")
                router.refresh()
            }
        } catch (error) {
            alert("Something went wrong")
            setLoading(false)
        }
    }

    return (
        <div>
            <button
                className="bg-white absolute top-0 right-0 rounded-md rounded-tl-none  rounded-br-none  p-1 px-3 text-sm text-red-500 hover:bg-slate-200 z-10"
                onClick={handleDeleteCollection}
            >
                {loading ? (
                    <p className="animate-pulse">Hapus...</p>
                ) : (
                    <p>Hapus</p>
                )}
            </button>
        </div>
    )
}

export default DeleteCollectionBtn

// "bg-white absolute top-6 rounded-md rounded-tl-none  rounded-br-none right-0 p-1 px-3 text-sm text-red-500 hover:bg-slate-200 z-10"