import { Playlist } from "@/types";
import Link from "next/link";

type Props = {
    playlists: Array<Playlist>;
};

const PlaylistOverview: React.FC<Props> = ({ playlists }) => {
    return (
        <section className="space-y-4">
            {playlists.map((playlist) => (
                <Link href={`/playlist/${playlist.id}`} key={playlist.id}>
                <div className="p-4 bg-white shadow rounded-lg hover:bg-gray-100">
                    <h2 className="text-xl font-bold">{playlist.name}</h2>
                    <p className="text-gray-700">{playlist.description}</p>
                </div>
                </Link>
            ))}
        </section>
    );
};

export default PlaylistOverview;