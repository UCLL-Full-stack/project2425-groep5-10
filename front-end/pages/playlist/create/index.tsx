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
    <div>
      <h1>Create Playlist</h1>
      <AddPlaylistForm songs={songs} />
    </div>
  );
};

export default createPlaylist;
