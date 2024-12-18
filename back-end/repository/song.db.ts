import { Song } from '../model/song';
import database from './database';

const createSong = async ({title,duration,artist}: Song):Promise<Song> => {
    try{
        const songPrisma = await database.song.create({
            data: {
                title,
                duration,
                artist
            }
        });

        return Song.from(songPrisma);
    }
    catch(error){
        throw new Error('Failed to create song');
    }
};

const getAllSongs = (): Song[] => songs;

const getSongByTitle = (title: string) => {
    return songs.find(song => song.getTtile() === title);
};

const getSongsByArtist = (artist: string) => {
    return songs.filter(song => song.getArtist() === artist);
}

export default {
    createSong,
    getAllSongs,
    getSongByTitle,
    getSongsByArtist
};