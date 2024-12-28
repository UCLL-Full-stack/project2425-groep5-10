import { Song } from "@/types";

type Props = {
  songs: Song[];
};

const SongOverview: React.FC<Props> = ({ songs }) => {
  return (
    <ul className="list-disc pl-5">
      {songs.map((song) => (
        <ul key={song.id} className="mb-4">
          <li className="text-red-500 font-bold">{song.title}</li>
          <li className="text-gray-700">{song.artist}</li>
        </ul>
      ))}
    </ul>
  );
};

export default SongOverview;
