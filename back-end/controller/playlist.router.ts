/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Playlist:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            name:
 *              type: string
 *              description: Playlist name.
 *            description:
 *              type: string
 *              description: Playlist expertise.
 *            songs:
 *              type: array
 *              items:
 *                  $ref: '#/components/schemas/Song'
 *            userId:
 *              type: number
 *              description: The user ID of the playlist owner.
 *      PlaylistInput:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *            description:
 *              type: string
 *
 */
import express, { Request, Response, NextFunction } from 'express';
import playlistService from '../service/playlist.service';
import { PlaylistInput, Role } from '../types';

const playlistRouter = express.Router();

/**
 * @swagger
 * /playlist:
 *   post:
 *      summary: Create a new playlist.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PlaylistInput'
 *      responses:
 *        200:
 *         description: A JSON object of the created playlist.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Playlist'
 */
playlistRouter.post('/', async (req, res) => {
    try {
        const playlist = <PlaylistInput>req.body;
        const result = await playlistService.createPlaylist(playlist);
        res.status(200).json(result);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(400).json({ status: 'error', errorMessage: errorMessage });
    }
});

/**
 * @swagger
 * /playlist:
 *   get:
 *      security:
 *        - bearerAuth: []
 *      summary: Get a list of all playlists.
 *      responses:
 *        200:
 *         description: A JSON array of all playlist objects.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Playlist'
 */
playlistRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = req as Request & { auth: { name: string; role: Role } };
        const { name, role } = request.auth;
        const result = await playlistService.getAllPlaylists({ name, role });
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /playlist/name/{name}:
 *   get:
 *      summary: Get a playlist by name.
 *      parameters:
 *        - in: path
 *          name: name
 *          required: true
 *          schema:
 *            type: string
 *          description: The name of the playlist to retrieve.
 *      responses:
 *        200:
 *         description: A JSON object of the playlist.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Playlist'
 */
playlistRouter.get('/name/:name', async (req, res) => {
    try {
        const name = req.params.name;
        const result = await playlistService.getPlaylistByName(name);
        res.status(200).json(result);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(400).json({ status: 'error', errorMessage: errorMessage });
    }
});

playlistRouter.get('/id/:playlistId', async (req, res) => {
    try {
        const userId = req.params.playlistId;
        const result = await playlistService.getPlaylistById(Number(userId));
        res.status(200).json(result);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(400).json({ status: 'error', errorMessage: errorMessage });
    }
});

playlistRouter.put('/:playlistId', async (req, res) => {
    try {
        const userId = req.params.playlistId;
        const playlist = <PlaylistInput>req.body;
        const result = await playlistService.updatePlaylist(Number(userId), playlist);
        res.status(200).json(result);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(400).json({ status: 'error', errorMessage: errorMessage });
    }
});

export { playlistRouter };
