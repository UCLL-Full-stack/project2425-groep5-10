import { Review as ReviewPrisma,
    Song as SongPrisma
 } from '@prisma/client';
import { Song } from './song';

export class Review {
    readonly id?: number;
    readonly rating: number;
    readonly content: string;
    readonly song: Song;

    constructor(review: { id?: number; rating: number; content: string; song: Song }) {
        this.validate(review);

        this.id = review.id;
        this.rating = review.rating;
        this.content = review.content;
        this.song = review.song;
    }

    validate(review: { rating: number; content: string; song: Song }): void {
        if (!review.rating) {
            throw new Error('Review rating is required');
        }
        if (review.rating < 1 || review.rating > 5) {
            throw new Error('Review rating must be between 1 and 5');
        }
        if (!review.content) {
            throw new Error('Review content is required');
        }
        if (!review.song) {
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

    public getSong(): Song {
        return this.song;
    }

    equals(review: Review): boolean {
        return (
            this.rating === review.rating &&
            this.content === review.content &&
            this.song === review.song
        );
    }

    static from({id,rating,content,song}: ReviewPrisma & {song: SongPrisma}): Review {
        return new Review({
            id,
            rating,
            content,
            song: Song.from(song),
        });
    }
}
