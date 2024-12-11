import { Playlist } from '../model/playlist';

const playlists: Playlist[] = [];

const createPlaylist = ({name,description}: Playlist) => {
    const playlist = new Playlist(
        {
            name: name,
            description: description,
            songs: []
        }
    );
    
    playlists.push(playlist);
    return playlist;
};

const getAllPlaylists = (): Playlist[] => playlists;

const getPlaylistByName = (name: string) => {
    return playlists.find(playlist => playlist.getName() === name);
};

export default {
    createPlaylist,
    getAllPlaylists,
    getPlaylistByName
};