import { Playlist } from "@/types";
import Link from "next/link";

type Props = {
  playlist: Playlist;
};

const PlaylistInfo: React.FC<Props> = ({ playlist }) => {
  const { name, description, songs } = playlist;

  return (
    <section className="p-6 bg-gray-800 rounded-lg text-white">
      {playlist && (
        <div>
          <h2 className="text-2xl font-bold mb-2">{name}</h2>
          <p className="text-gray-300 mb-4">{description}</p>
          <Link
            href={{
              pathname: "/playlist/create",
                query: { playlist: JSON.stringify(playlist)},
            }}
            className="flex justify-center"
          >
            <p>Edit Playlist</p>
          </Link>
          <ul className="list-disc pl-5 space-y-2">
            {songs?.map((song) => (
              <li key={song.id} className="text-gray-300">
                {song.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default PlaylistInfo;
