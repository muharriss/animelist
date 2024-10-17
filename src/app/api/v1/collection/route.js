import { NextResponse } from "next/server"

export async function POST(request) {
    const { anime_mal_id, user_email, anime_image, anime_title } = await request.json()
    const data = { anime_mal_id, user_email, anime_image, anime_title }

    const createCollection = await prisma.collection.create({ data })
    if (!createCollection) return Response.json({ status: 500, isCreated: false })
    else return Response.json({ status: 200, isCreated: true })
}

export async function DELETE(request) {
    try {
        const { anime_mal_id, user_email } = await request.json();

        const deleteCollection = await prisma.collection.deleteMany({
            where: { anime_mal_id, user_email }
        });

        // Cek apakah data berhasil dihapus
        if (deleteCollection.count === 0) {
            return Response.json({ status: 404, isDeleted: false, message: "Data not found" });
        }

        return Response.json({ status: 200, isDeleted: true, message: "Data deleted successfully" });
    } catch (error) {
        console.error("Error deleting collection:", error);
        return Response.json({ status: 500, isDeleted: false, message: "Internal server error" });
    }
}