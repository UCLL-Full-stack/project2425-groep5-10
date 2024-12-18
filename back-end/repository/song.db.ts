import { Song } from '../model/song';

const songs: Song[] = [];

const createSong = ({title,duration,artist}: Song) => {
    const song = new Song(
        {
            title: title,
            duration: duration,
            artist: artist
        }
    );
    
    songs.push(song);
    return song;
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