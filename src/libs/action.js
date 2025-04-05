// just for testing

"use server"

import prisma from "./prisma";

export async function createCollection(data) {

    try {
        const collection = await prisma.collection.create({ data })
        return { success: true, data: collection };
    } catch (error) {
        console.error("Error creating data:", error);
        return { success: false, error: error.message || "Failed to create data" };
    }

 
}