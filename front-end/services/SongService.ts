const getAllSongs = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/song`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }
    )
};

const SongService = {
    getAllSongs,
};

export default SongService;