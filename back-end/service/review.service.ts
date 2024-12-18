import { Review } from '../model/review';
import reviewDb from '../repository/review.db';
import songDb from '../repository/song.db';
import { ReviewInput } from '../types';

const createReview = async ({song:songInput,content,rating}: ReviewInput): Promise<Review> => {
  if (!songInput.id) {
        throw new Error('Song is required');
    }

    const song = await songDb.getSongById(songInput.id);

    if (!song) {
        throw new Error('Song not found');
    }

    const review = new Review({rating,content,song});

    return await reviewDb.createReview(review);
};

const getAllReviews = (): Promise<Review[]> => {
    return reviewDb.getAllReviews();
}

const getReviewsBySong = async (songId: number): Promise<Review | null> => {
    return reviewDb.getReviewsBySong({id: songId});
}

export default {
    createReview,
    getAllReviews,
    getReviewsBySong,
};