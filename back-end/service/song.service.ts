import { Song } from "../model/song";
import songDb from "../repository/song.db";
import { SongInput } from "../types";

const createSong = ({
    title,
    duration,
    artist,
}:SongInput):Song => {
    if (!title || !duration || !artist) {
        throw new Error('Missing required fields');
    }

    const song = new Song({
        title,
        duration,
        artist,
    });

    return songDb.createSong(song);
};

const getAllSongs = ():Song[] => songDb.getAllSongs();

const getSongByTitle = (title: string):Song => {
    if (!title) {
        throw new Error('Title is required');
    }

    const song = songDb.getSongByTitle(title);

    if (!song) {
        throw new Error('Song not found');
    }

    return song;
}

const getSongsByArtist = (artist: string):Song[] => {
    if (!artist) {
        throw new Error('Artist is required');
    }

    const songs = songDb.getSongsByArtist(artist);

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