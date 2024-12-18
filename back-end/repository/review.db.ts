import { Song } from '@prisma/client';
import { Review } from '../model/review';
import database from './database';

const createReview = async ({ song, rating, content }: Review): Promise<Review> => {
    try {
        const reviewPrisma = await database.review.create({
            data: {
                song: {
                    connect: {
                        id: song.getId(),
                    },
                },
                rating,
                content,
            },
            include: {
                song: true,
            },
        });

        return Review.from(reviewPrisma);
    } catch (error) {
        throw new Error('Database error. See server log for details');
    }
};

const getAllReviews = async (): Promise<Review[]> => {
    try {
        const reviewPrismas = await database.review.findMany({
            include: {
                song: true,
            },
        });

        return reviewPrismas.map(Review.from);
    } catch (error) {
        throw new Error('Database error. See server log for details');
    }
}

const getReviewBySong = async ({ id }: { id: number }): Promise<Review | null> => {
    try {
        const reviewPrisma = await database.review.findFirst({
            where: {
                song:{id},
            },
            include: {
                song: true,
            },
        });

        return reviewPrisma ? Review.from(reviewPrisma) : null;
    } catch (error) {
        throw new Error('Database error. See server log for details');
    }
}

export default {
    createReview,
    getAllReviews,
    getReviewBySong,
};
