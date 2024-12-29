import { Playlist } from '../model/playlist';
import playlistDb from '../repository/playlist.db';
import songDb from '../repository/song.db';
import userDb from '../repository/user.db';
import { PlaylistInput, Role } from '../types';

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
            if (!songInput.title) {
                throw new Error('Song is required');
            }
            const song = await songDb.getSongByTitle({ title: songInput.title });
            if (!song) {
                throw new Error('Song not found');
            }
            return song;
        })
    );

    if (!userInput.email) {
        throw new Error('User is required');
    }

    const user = await userDb.getUserByEmail({ email: userInput.email });

    if (!user) {
        throw new Error('User not found');
    }

    const playlist = new Playlist({ name, description, songs, user });

    return await playlistDb.createPlaylist(playlist);
};

const getAllPlaylists = async ({ name, role }: { name: string; role: Role }): Promise<Playlist[]> => {
    if (role === Role.ADMIN) {
        return playlistDb.getAllPlaylists();
    }
    if (role === Role.USER || role === Role.ARTIST) {
        return playlistDb.getPlaylistsByUser({ name });
    } else {
        throw new Error('Invalid role');
    }
};

const getPlaylistByName = async (name: string): Promise<Playlist | null> => {
    return playlistDb.getPlaylistByName({ name });
};

const getPlaylistById = async (id: number): Promise<Playlist | null> => {
    return playlistDb.getPlaylistById({ id });
};

const updatePlaylist = async (id: number, playlist: PlaylistInput): Promise<Playlist> => {
    const existingPlaylist = await getPlaylistById(id);
    if (!existingPlaylist) {
        throw new Error('Playlist not found');
    }
    const songs = playlist.songs
        ? await Promise.all(
              playlist.songs.map(async (songInput) => {
                  if (!songInput.title) {
                      throw new Error('Song is required');
                  }
                  const song = await songDb.getSongByTitle({ title: songInput.title });
                  if (!song) {
                      throw new Error('Song not found');
                  }
                  return song;
              })
          )
        : existingPlaylist.songs;
    const user = await userDb.getUserByEmail({ email: playlist.user.email });
    if (!user) {
        throw new Error('User not found');
    }
    const updatedPlaylist = new Playlist({ ...existingPlaylist, ...playlist, songs, user });
    return playlistDb.updatePlaylist(id, updatedPlaylist);
};

export default {
    createPlaylist,
    getAllPlaylists,
    getPlaylistByName,
    getPlaylistById,
    updatePlaylist,
};
