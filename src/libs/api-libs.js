export const getAnimeResponse = async (resource, query) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${resource}?${query}`)
    const anime = response.json(response)
    return anime
}

export const getNestedAnimeResponse = async (resource, objectProperty) => {
    const response = await getAnimeResponse(resource)
    return response.data?.flatMap(item => item[objectProperty])
}


export const reproduce = (data, gap) => {
    const end = Math.floor(Math.random() * (data?.length - gap + 1)) + gap
    const start = end - gap

    const response = {
        data: data?.slice(start, end)
    }
    
    return response
}