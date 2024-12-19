import { Playlist } from '../model/playlist';
import playlistDb from '../repository/playlist.db';
import songDb from '../repository/song.db';
import userDb from '../repository/user.db';
import { PlaylistInput } from '../types';

const createPlaylist = async ({
    name,
    description,
    songs: songsInput,
    user: userInput,
}: PlaylistInput): Promise<Playlist> => {
    if (!songsInput) {
        throw new Error('Songs are required');
    }

    const songs = await Promise.all(
        songsInput.map(async (songInput) => {
            if (!songInput.id) {
                throw new Error('Song is required');
            }
            const song = await songDb.getSongById(songInput.id);
            if (!song) {
                throw new Error('Song not found');
            }
            return song;
        })
    );

    if (!userInput.id) {
        throw new Error('User is required');
    }

    const user = await userDb.getUserById(userInput.id);

    if (!user) {
        throw new Error('User not found');
    }

    const playlist = new Playlist({ name, description, songs, user });

    return await playlistDb.createPlaylist(playlist);
};

const getAllPlaylists = (): Promise<Playlist[]> => {
    return playlistDb.getAllPlaylists();
};

const getPlaylistByName = async (name: string): Promise<Playlist | null> => {
    return playlistDb.getPlaylistByName({ name });
};

export default {
    createPlaylist,
    getAllPlaylists,
    getPlaylistByName,
};
