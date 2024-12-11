import { Song } from '../model/song';

const songs: Song[] = [];

const createSong = ({title,length,artist}: Song) => {
    const song = new Song(
        {
            title: title,
            length: length,
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