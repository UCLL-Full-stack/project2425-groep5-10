export class Review {
    readonly id?: number;
    readonly rating: number;
    readonly content: string;
    readonly songId: number;

    constructor(review: { rating: number; content: string; songId: number }) {
        this.rating = review.rating;
        this.content = review.content;
        this.songId = review.songId;
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getRating(): number {
        return this.rating;
    }

    public getContent(): string {
        return this.content;
    }

    public getSongId(): number {
        return this.songId;
    }

    equals(review: Review): boolean {
        return (
            this.rating === review.rating &&
            this.content === review.content &&
            this.songId === review.songId
        );
    }
}
