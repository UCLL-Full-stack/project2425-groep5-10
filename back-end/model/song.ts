import { Song as SongPrisma } from '@prisma/client';

export class Song {
    readonly id?: number;
    readonly title: string;
    readonly duration: number;
    readonly artist: string;

    constructor(song: { id?: number; title: string; duration: number; artist: string }) {
        this.validate(song);

        this.id = song.id;
        this.title = song.title;
        this.duration = song.duration;
        this.artist = song.artist;
    }

    validate(song: { title: string; duration: number; artist: string }): void {
        if (!song.title) {
            throw new Error('Song title is required');
        }
        if (!song.duration) {
            throw new Error('Song duration is required');
        }
        if (song.duration < 0) {
            throw new Error('Song duration must be greater than 0');
        }
        if (!song.artist) {
            throw new Error('Song artist is required');
        }
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getTtile(): string {
        return this.title;
    }

    public getduration(): number {
        return this.duration;
    }

    public getArtist(): string {
        return this.artist;
    }

    equals(song: Song): boolean {
        return (
            this.title === song.title && this.duration === song.duration && this.artist === song.artist
        );
    }

    static from({ id, title, duration, artist }: SongPrisma): Song {
        return new Song({
            id,
            title,
            duration,
            artist,
        });
    }
}
