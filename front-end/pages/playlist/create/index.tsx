import AddPlaylistForm from "@/components/playlist/CreatePlaylistForm";
import SongService from "@/services/SongService";
import { Song } from "@/types";
import { useEffect, useState } from "react";

const createPlaylist: React.FC = () => {
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
      <h1 className="text-2xl font-bold mb-4">Create Playlist</h1>
      <AddPlaylistForm songs={songs} />
    </div>
  );
};

export default createPlaylist;
