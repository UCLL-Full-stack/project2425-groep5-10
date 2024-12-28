import SongService from "@/services/SongService";
import { useEffect, useState } from "react";
import type { Song } from "@/types"; // Adjust the import path as necessary
import SongOverview from "@/components/song/SongOverview";

const Song: React.FC = () => {
    const [songs, setSongs] = useState<Song[]>([]);
    
    const getAllSongs = async () => {
        const response = await SongService.getAllSongs();
        const songs = await response.json();
        setSongs(songs);
    };

    useEffect(() => {
        getAllSongs();
    }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Songs</h1>
      <section>{songs && <SongOverview songs={songs} />}</section>
    </div>
  );
};

export default Song;
