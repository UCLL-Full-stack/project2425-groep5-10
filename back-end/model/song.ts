export class Song {
    readonly id?: number;
    readonly title: string;
    readonly length: number;
    readonly artist: string;

    constructor(song: { title: string; length: number; artist: string }) {
        this.validate(song);

        this.title = song.title;
        this.length = song.length;
        this.artist = song.artist;
    }

    validate(song: { title: string; length: number; artist: string }): void {
        if (!song.title) {
            throw new Error('Song title is required');
        }
        if (!song.length) {
            throw new Error('Song length is required');
        }
        if (song.length < 0) {
            throw new Error('Song length must be greater than 0');
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

    public getLength(): number {
        return this.length;
    }

    public getArtist(): string {
        return this.artist;
    }

    equals(song: Song): boolean {
        return (
            this.title === song.title && this.length === song.length && this.artist === song.artist
        );
    }
}
