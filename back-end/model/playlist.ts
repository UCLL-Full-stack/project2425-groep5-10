import { Song } from './song';

export class Playlist {
    readonly id?: number;
    readonly name: string;
    readonly description: string;
    readonly songs: Song[];

    constructor(playlist: { name: string; description: string; songs: Song[] }) {
        this.name = playlist.name;
        this.description = playlist.description;
        this.songs = playlist.songs;
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

    addSongToPlaylist(song: Song): void {
        this.songs.push(song);
    }

    equals(playlist: Playlist): boolean {
        return (
            this.name === playlist.name &&
            this.description === playlist.description &&
            this.songs.every((song, index) => song.equals(playlist.songs[index]))
        );
    }
}
