import { Playlist } from "@/types"

const getAllPlaylists = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/playlist`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }
    )
}

const createPlaylist = async (playlist: Playlist) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/playlist`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(playlist)
        }
    )
}

const PlaylistService = {
    getAllPlaylists,
    createPlaylist,
}

export default PlaylistService;