export class Song {
    readonly id?: number;
    readonly name: string;
    readonly length: number;
    readonly artist: string;

    constructor(song: { name: string; length: number; artist: string }) {
        this.name = song.name;
        this.length = song.length;
        this.artist = song.artist;
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getLength(): number {
        return this.length;
    }

    public getArtist(): string {
        return this.artist;
    }

    equals(song: Song): boolean {
        return (
            this.name === song.name &&
            this.length === song.length &&
            this.artist === song.artist
        );
    }
}
