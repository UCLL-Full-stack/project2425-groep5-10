import { Playlist } from "@/types";

type Props = {
    playlist: Playlist,
};

const PlaylistInfo: React.FC<Props> = ({playlist}) => {
    const {name, description, songs} = playlist;

    return (
        <section>
        {playlist && (
            <div>
                <h2>{name}</h2>
                <p>{description}</p>
                <ul>
                    {songs?.map((song) => (
                        <li key={song.id}>{song.title}</li>
                    ))}
                </ul>
            </div>
        )}
        </section>
    );
    };