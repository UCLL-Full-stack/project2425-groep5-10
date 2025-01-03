enum Role {
    ADMIN = 'admin',
    USER ='user',
    ARTIST='artist'
}

type PlaylistInput = {
    id?: number;
    name: string;
    description: string;
    songs?: SongInput[];
    user: UserInput;
};

type SongInput = {
    id?: number;
    title?: string;
    duration?: number;
    artist?: string;
};

type ReviewInput = {
    id?: number;
    rating: number;
    content: string;
    song: SongInput;
};

type UserInput = {
    id?: number;
    name: string;
    email: string;
    password: string;
    role: Role;
};

type AuthenticationResponse = {
    token: string;
    name: string;
    email: string;
    role: string;
};

export { PlaylistInput, SongInput, ReviewInput, UserInput, Role, AuthenticationResponse };