export type Playlist = {
    id?: string;
    name?: string;
    description?: string;
    songs?: Song[];
};

export type Song = {
    id?: string;
    title?: string;
    length?: number;
    artist?: string;
};

export type User = {
    id?: string;
    name?: string;
    email?: string;
    password?: string;
};

export type Review = {
    id?: string;
    rating?: number;
    content?: string;
    songId?: number;
};