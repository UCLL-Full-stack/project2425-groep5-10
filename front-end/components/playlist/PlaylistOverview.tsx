import { Playlist } from "@/types";

type Props = {
    playlists: Array<Playlist>;
};

const PlaylistOverview: React.FC<Props> = ({ playlists }) => {
    return (
        <section>
            {playlists.map((playlist) => (
                <div key={playlist.id}>
                    <h2>{playlist.name}</h2>
                    <p>{playlist.description}</p>
                </div>
            ))}
        </section>
    );
};

export default PlaylistOverview;