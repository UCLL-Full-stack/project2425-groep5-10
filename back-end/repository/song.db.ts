import { Song } from '../model/song';
import database from './database';

const createSong = async ({ title, duration, artist }: Song): Promise<Song> => {
    try {
        const songPrisma = await database.song.create({
            data: {
                title,
                duration,
                artist,
            },
        });

        return Song.from(songPrisma);
    } catch (error) {
        throw new Error('Database error. See server log for details');
    }
};

const getAllSongs = async (): Promise<Song[]> => {
    try {
        const songPrismas = await database.song.findMany();
        return songPrismas.map(Song.from);
    } catch (error) {
        throw new Error('Database error. See server log for details');
    }
};

const getSongByTitle = async ({ title }: { title: string }): Promise<Song | null> => {
    try {
        const songPrisma = await database.song.findUnique({
            where: {
                title,
            },
        });

        return songPrisma ? Song.from(songPrisma) : null;
    } catch (error) {
        throw new Error('Database error. See server log for details');
    }
};

const getSongsByArtist = async ({ artist }: { artist: string }): Promise<Song[]> => {
    try {
        const songPrismas = await database.song.findMany({
            where: {
                artist,
            },
        });

        return songPrismas.map(Song.from);
    } catch (error) {
        throw new Error('Database error. See server log for details');
    }
};

const getSongById = async (id: number): Promise<Song | null> => {
    try {
        const songPrisma = await database.song.findUnique({
            where: {
                id,
            },
        });

        return songPrisma ? Song.from(songPrisma) : null;
    } catch (error) {
        throw new Error('Database error. See server log for details');
    }
};

export default {
    createSong,
    getAllSongs,
    getSongByTitle,
    getSongsByArtist,
    getSongById,
};
