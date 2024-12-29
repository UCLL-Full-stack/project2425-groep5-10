import { Playlist } from "@/types"

const getAllPlaylists = async () => {
    const token = JSON.parse(localStorage.getItem('loggedInUser')!).token;
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/playlist`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
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

const getPlaylistByName = async (name: string) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/playlist/name/${name}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }
    )
}

const getPlaylistById = async (id: string) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/playlist/id/${id}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }
    )
}

const updatePlaylist = async (id: string, playlist: Playlist) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/playlist/${id}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(playlist)
        }
    )
};

const PlaylistService = {
    getAllPlaylists,
    createPlaylist,
    getPlaylistByName,
    getPlaylistById,
    updatePlaylist
}

export default PlaylistService;