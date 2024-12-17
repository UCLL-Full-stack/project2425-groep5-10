import { Playlist } from "@/types";

type Props = {
    playlist: Array<Playlist>;
};

const PlaylistOverview: React.FC<Props> = ({ playlist }) => {
    return (
        <section>
            {playlist.map((playlist) => (
                <div key={playlist.id}>
                    <h2>{playlist.name}</h2>
                    <p>{playlist.description}</p>
                </div>
            ))}
        </section>
    );
};

export default PlaylistOverview;