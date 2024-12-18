import { Song } from './song';
import { Playlist as PlaylistPrisma,
    Song as SongPrisma,
    User as UserPrisma
 } from '@prisma/client';
import { User } from './user';

export class Playlist {
    readonly id?: number;
    readonly name: string;
    readonly description: string;
    readonly songs: Song[];
    readonly user: User;

    constructor(playlist: {
        id?: number;
        name: string;
        description: string;
        songs: Song[];
        user: User;
    }) {
        this.validate(playlist);

        this.name = playlist.name;
        this.description = playlist.description;
        this.songs = playlist.songs;
        this.user = playlist.user;
        this.id = playlist.id;
    }

    validate(playlist: { name: string; description: string }): void {
        if (!playlist.name) {
            throw new Error('Playlist name is required');
        }
        if (!playlist.description) {
            throw new Error('Playlist description is required');
        }
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getDescription(): string {
        return this.description;
    }

    public getSongs(): Song[] {
        return this.songs;
    }

    public getUser(): User {
        return this.user;
    }

    addSongToPlaylist(song: Song): void {
        this.songs.push(song);
    }

    equals(playlist: Playlist): boolean {
        return (
            this.name === playlist.name &&
            this.description === playlist.description &&
            this.songs.every((song, index) => song.equals(playlist.songs[index])) &&
            this.user === playlist.user
        );
    }

    static from({
        id,
        name,
        description,
        user,
        songs
    }: PlaylistPrisma & { user: UserPrisma; songs: SongPrisma[] }) {
        return new Playlist({
            id,
            name,
            description,
            user: User.from(user),
            songs: songs.map((song) => Song.from(song))
        });
    }
}
