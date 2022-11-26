export const fetchAdoptions = async (): Promise<[]> => {
    const response = await fetch(
        'http://localhost:3000/api/read/adoptionposts/all'
    )
    const adoptions: [] = await response.json()

    return adoptions
}
