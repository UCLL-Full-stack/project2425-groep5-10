const getAllPlaylists = async () => {
    return fetch(process.env.NEXT + `/playlists`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }
    )
}

const PlaylistService = {
    getAllPlaylists
}

export default PlaylistService;