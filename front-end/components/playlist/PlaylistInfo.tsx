import { Playlist } from "@/types";

type Props = {
    playlist: Playlist,
};

const PlaylistInfo: React.FC<Props> = ({playlist}) => {
    const {name, description, songs} = playlist;

    return (
        <section className="p-4 bg-white shadow rounded-lg">
        {playlist && (
            <div>
                <h2 className="text-2xl font-bold mb-2">{name}</h2>
                <p className="text-gray-700 mb-4">{description}</p>
                <ul className="list-disc pl-5 space-y-2">
                    {songs?.map((song) => (
                        <li key={song.id} className="text-gray-700">{song.title}</li>
                    ))}
                </ul>
            </div>
        )}
        </section>
    );
    };

export default PlaylistInfo;