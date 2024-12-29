import { Song } from "@/types";

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

const createSong = async (song: Song) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/song`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(song)
        }
    )
};

const SongService = {
    getAllSongs,
    createSong
};

export default SongService;