export class Song {
    readonly id?: number;
    readonly title: string;
    readonly length: number;
    readonly artist: string;

    constructor(song: { title: string; length: number; artist: string }) {
        this.title = song.title;
        this.length = song.length;
        this.artist = song.artist;
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
            this.title === song.title &&
            this.length === song.length &&
            this.artist === song.artist
        );
    }
}
