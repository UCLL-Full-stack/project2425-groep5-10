import { Review } from '../model/review';
import reviewDb from '../repository/review.db';

const createReview = ({ rating, content, songId }: ReviewInput): Review => {
    if (!rating || !content || !songId) {
        throw new Error('Rating, content, and song are required');
    }

    const review = new Review({
        rating,
        content,
        songId,
    });

    return reviewDb.createReview(review);
};

const getAllReviews = ():Review[] => reviewDb.getAllReviews();

const getReviewsBySongId = (songId: number):Review[] => {
    if (!songId) {
        throw new Error('songId is required');
    }

    const review = reviewDb.getReviewBySongId(songId);

    if (!review) {
        throw new Error('Review not found');
    }

    return review;
};

export default {
    createReview,
    getAllReviews,
    getReviewsBySongId,
};