import { Playlist } from "@/types";
import Link from "next/link";

type Props = {
  playlists: Array<Playlist>;
};

const PlaylistOverview: React.FC<Props> = ({ playlists }) => {
  return (
    <ul className="list-disc pl-5 space-y-4">
      {playlists.map((playlist) => (
        <li key={playlist.id} className="p-4 bg-gray-700 rounded-lg shadow">
          <Link href={`/playlist/${playlist.id}`}>
            
              <h2 className="text-xl font-bold text-white">{playlist.name}</h2>
              <p className="text-gray-300">{playlist.description}</p>
            
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default PlaylistOverview;