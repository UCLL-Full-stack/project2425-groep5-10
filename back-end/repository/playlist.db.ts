import { Playlist } from '../model/playlist';
import database from './database';

const createPlaylist = async ({ name, description, songs, user }: Playlist): Promise<Playlist> => {
    try {
        const playlistPrisma = await database.playlist.create({
            data: {
                name,
                description,
                songs: {
                    connect: songs.map((song) => ({ id: song.getId() })),
                },
                user: {
                    connect: {
                        id: user.getId(),
                    },
                },
            },
            include: {
                songs: true,
                user: true,
            },
        });

        return Playlist.from(playlistPrisma);
    } catch (error) {
        throw new Error('Database error. See server log for details');
    }
};

const getAllPlaylists = async (): Promise<Playlist[]> => {
    try {
        const playlistPrismas = await database.playlist.findMany({
            include: {
                songs: true,
                user: true,
            },
        });

        return playlistPrismas.map((playlistPrisma) => Playlist.from(playlistPrisma));
    } catch (error) {
        throw new Error('Database error. See server log for details');
    }
};

const getPlaylistByName = async ({ name }: { name: string }): Promise<Playlist | null> => {
    try {
        const playlistPrisma = await database.playlist.findUnique({
            where: {
                name,
            },
            include: {
                songs: true,
                user: true,
            },
        });

        return playlistPrisma ? Playlist.from(playlistPrisma) : null;
    } catch (error) {
        throw new Error('Database error. See server log for details');
    }
};

const getPlaylistById = async ({ id }: { id: number }): Promise<Playlist | null> => {
    try {
        const playlistPrisma = await database.playlist.findUnique({
            where: {
                id,
            },
            include: {
                songs: true,
                user: true,
            },
        });
        return playlistPrisma ? Playlist.from(playlistPrisma) : null;
    } catch (error) {
        throw new Error('Database error. See server log for details');
    }
};

const updatePlaylist = async (id: number, playlist: Playlist): Promise<Playlist> => {
    try {
        const playlistPrisma = await database.playlist.update({
            where: {
                id,
            },
            data: {
                name: playlist.getName(),
                description: playlist.getDescription(),
                songs: {
                    connect: playlist.getSongs().map((song) => ({ id: song.getId() })),
                },
                user: {
                    connect: {
                        id: playlist.getUser().getId(),
                    },
                },
            },
            include: {
                songs: true,
                user: true,
            },
        });
        return Playlist.from(playlistPrisma);
    } catch (error) {
        throw new Error('Database error. See server log for details');
    }
};

const getPlaylistsByUser = async ({ name }: { name: string }): Promise<Playlist[]> => {
    try {
        console.log(name);
        const playlistsPrisma = await database.playlist.findMany({
            where: {
                user: {
                    name,
                },
            },
            include: {
                songs: true,
                user: true,
            },
        });
        return playlistsPrisma.map((playlistPrisma) => Playlist.from(playlistPrisma));
    } catch (error) {
        throw new Error('Database error. See server log for details');
    }
};

export default {
    createPlaylist,
    getAllPlaylists,
    getPlaylistByName,
    getPlaylistById,
    updatePlaylist,
    getPlaylistsByUser,
};
