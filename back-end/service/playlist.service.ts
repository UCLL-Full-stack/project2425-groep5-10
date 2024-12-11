import { Playlist } from '../model/playlist';
import playlistDb from '../repository/playlist.db';

const createPlaylist = ({ name, description}: PlaylistInput): Playlist => {
    if (!name || !description) {
        throw new Error('Name and description are required');
    }

    const playlist = new Playlist({
        name,
        description,
        songs: [],
    });

    return playlistDb.createPlaylist(playlist);
};

const getAllPlaylists = (): Playlist[] => playlistDb.getAllPlaylists();

const getPlaylistByName = (name: string): Playlist => {
    if (!name) {
        throw new Error('Name is required');
    }
    
    const playlist = playlistDb.getPlaylistByName(name);

    if (!playlist) {
        throw new Error('Playlist not found');
    }

    return playlist; 
};

export default {
    createPlaylist,
    getAllPlaylists,
    getPlaylistByName,
};
