import { Song } from "@/types";

type Props = {
  songs: Song[];
};

const SongOverview: React.FC<Props> = ({ songs }) => {
  return (
    <ul className="list-disc pl-5 space-y-4">
      {songs.map((song) => (
        <li key={song.id} className="p-4 bg-gray-700 rounded-lg shadow">
          <h2 className="text-xl font-bold text-white">{song.title}</h2>
          <p className="text-gray-300">{song.artist}</p>
        </li>
      ))}
    </ul>
  );
};

export default SongOverview;
