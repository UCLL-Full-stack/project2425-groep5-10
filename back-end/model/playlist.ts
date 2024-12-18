import { Song } from './song';

export class Playlist {
    readonly id?: number;
    readonly name: string;
    readonly description: string;
    readonly songs: Song[];
    readonly userId: number;

    constructor(playlist: { name: string; description: string; songs: Song[]; userId: number }) {
        this.validate(playlist);

        this.name = playlist.name;
        this.description = playlist.description;
        this.songs = playlist.songs;
        this.userId = playlist.userId;
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

    public getUserId(): number {
        return this.userId;
    }

    addSongToPlaylist(song: Song): void {
        this.songs.push(song);
    }

    equals(playlist: Playlist): boolean {
        return (
            this.name === playlist.name &&
            this.description === playlist.description &&
            this.songs.every((song, index) => song.equals(playlist.songs[index])) &&
            this.userId === playlist.userId
        );
    }
}
