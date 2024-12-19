import { Song } from "../model/song";
import songDb from "../repository/song.db";
import { SongInput } from "../types";

const createSong = async ({
    title,
    duration,
    artist,
}:SongInput):Promise<Song> => {
    if (!title || !duration || !artist) {
        throw new Error('Missing required fields');
    }

    const song = new Song({
        title,
        duration,
        artist,
    });

    return await songDb.createSong(song);
};

const getAllSongs = async ():Promise<Song[]> => await songDb.getAllSongs();

const getSongByTitle = async (title: string):Promise<Song> => {

    const song = await songDb.getSongByTitle({title});

    if (!song) {
        throw new Error('Song not found');
    }

    return song;
}

const getSongsByArtist = async (artist: string):Promise<Song[]> => {
    
    const songs = await songDb.getSongsByArtist({artist});

    if (!songs) {
        throw new Error('Songs not found');
    }

    return songs;
}

export default {
    createSong,
    getAllSongs,
    getSongByTitle,
    getSongsByArtist
};