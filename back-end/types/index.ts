type PlaylistInput = {
    id?: number;
    name?: string;
    description?: string;
    songs?: SongInput[];
};

type SongInput = {
    id?: number;
    title?: string;
    length?: number;
    artist?: string;
};

type ReviewInput = {
    id?: number;
    rating?: number;
    content?: string;
    songId?: number;
};

type UserInput = {
    id?: number;
    name?: string;
    email?: string;
    password?: string;
};

export { PlaylistInput, SongInput, ReviewInput, UserInput };