/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Song:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            title:
 *              type: string
 *              description: Song title.
 *            length:
 *              type: number
 *              format: int64
 *              description: Song length.
 *            artist:
 *              type: string
 *              description: Song artist.
 *      SongInput:
 *          type: object
 *          properties:
 *            title:
 *              type: string
 *            length:
 *              type: number
 *            artist:
 *              type: string
 * 
 */
import express from 'express';
import songService from '../service/song.service';
import { SongInput } from '../types';

const songRouter = express.Router();

/**
 * @swagger
 * /song:
 *   post:
 *      summary: Create a new song.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/SongInput'
 *      responses:
 *        200:
 *         description: A JSON object of the created song.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Song'
 */
songRouter.post('/', (req, res) => {
    try {
        const song = <SongInput>req.body;
        const result = songService.createSong(song);
        res.status(200).json(result);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(400).json({ status: 'error', errorMessage: errorMessage });
    }
});

/**
 * @swagger
 * /song:
 *   get:
 *      summary: Get all songs.
 *      responses:
 *        200:
 *         description: A JSON array of all songs.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Song'
 */
songRouter.get('/', (req, res) => {
    try {
        const result = songService.getAllSongs();
        res.status(200).json(result);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(400).json({ status: 'error', errorMessage: errorMessage });
    }
});

/**
 * @swagger
 * /song/{title}:
 *   get:
 *      summary: Get a song by title.
 *      parameters:
 *        - in: path
 *          name: title
 *          required: true
 *          description: Song title.
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *         description: A JSON object of the song.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Song'
 */
songRouter.get('/title/:title', (req, res) => {
    try {
        const title = req.params.title;
        const result = songService.getSongByTitle(title);
        res.status(200).json(result);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(400).json({ status: 'error', errorMessage: errorMessage });
    }
});

/**
 * @swagger
 * /song/artist/{artist}:
 *   get:
 *      summary: Get all songs by artist.
 *      parameters:
 *        - in: path
 *          name: artist
 *          required: true
 *          description: Artist name.
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *         description: A JSON array of all songs by the artist.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Song'
 */
songRouter.get('/artist/:artist', (req, res) => {
    try {
        const artist = req.params.artist;
        const result = songService.getSongsByArtist(artist);
        res.status(200).json(result);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(400).json({ status: 'error', errorMessage: errorMessage });
    }
});

export { songRouter };
