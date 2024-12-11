import { Review } from '../model/review';

const reviews: Review[] = [];

const createReview = ({rating, content, songId}: Review) => {
    const review = new Review(
        {
            rating: rating,
            content: content,
            songId: songId
        }
    );
    
    reviews.push(review);
    return review;
};

const getAllReviews = (): Review[] => reviews;

const getReviewBySongId = (songId: number) => {
    return reviews.filter(review => review.getSongId() === songId);
};

export default {
    createReview,
    getAllReviews,
    getReviewBySongId
};