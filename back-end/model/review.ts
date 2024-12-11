export class Review {
    readonly id?: number;
    readonly rating: number;
    readonly content: string;
    readonly songId: number;

    constructor(review: { rating: number; content: string; songId: number }) {
        this.validate(review);

        this.rating = review.rating;
        this.content = review.content;
        this.songId = review.songId;
    }

    validate(review: { rating: number; content: string; songId: number }): void {
        if (!review.rating) {
            throw new Error('Review rating is required');
        }
        if (review.rating < 1 || review.rating > 5) {
            throw new Error('Review rating must be between 1 and 5');
        }
        if (!review.content) {
            throw new Error('Review content is required');
        }
        if (!review.songId) {
            throw new Error('Review songId is required');
        }
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
