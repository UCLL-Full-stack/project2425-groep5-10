/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Review:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            rating:
 *              type: number
 *              description: Review rating.
 *            content:
 *              type: string
 *              description: Review content.
 *            songId:
 *              type: number
 *              description: Song ID.
 *      ReviewInput:
 *          type: object
 *          properties:
 *            rating:
 *              type: string
 *            content:
 *              type: string
 *            songId:
 *              type: number
 * 
 */
import express from 'express';
import reviewService from '../service/review.service';
import { ReviewInput } from '../types';

const reviewRouter = express.Router();

/**
 * @swagger
 * /review:
 *   post:
 *      summary: Create a new review.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ReviewInput'
 *      responses:
 *        200:
 *         description: A JSON object of the created review.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 */
reviewRouter.post('/', (req, res) => {
    try {
        const review = <ReviewInput>req.body;
        const result = reviewService.createReview(review);
        res.status(200).json(result);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(400).json({ status: 'error', errorMessage: errorMessage });
    }
});

/**
 * @swagger
 * /review:
 *   get:
 *      summary: Get all reviews.
 *      responses:
 *        200:
 *         description: A JSON array of all reviews.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 */
reviewRouter.get('/', (req, res) => {
    try {
        const result = reviewService.getAllReviews();
        res.status(200).json(result);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(400).json({ status: 'error', errorMessage: errorMessage });
    }
});

/**
 * @swagger
 * /review/song/{songId}:
 *   get:
 *      summary: Get all reviews for a song.
 *      parameters:
 *        - in: path
 *          name: songId
 *          required: true
 *          description: Song ID.
 *          schema:
 *            type: number
 *      responses:
 *        200:
 *         description: A JSON array of all reviews for the song.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 */
reviewRouter.get('/song/:songId', (req, res) => {
    try {
        const songId = parseInt(req.params.songId);
        const result = reviewService.getReviewsBySongId(songId);
        res.status(200).json(result);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(400).json({ status: 'error', errorMessage: errorMessage });
    }
});

export { reviewRouter };
