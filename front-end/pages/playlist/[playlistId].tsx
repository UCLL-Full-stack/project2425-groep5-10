import PlaylistService from "@/services/PlaylistService";
import { Playlist } from "@/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import PlaylistInfo from "@/components/playlist/PlaylistInfo";
import Header from "@/components/header";

const PlaylistInfoPage: React.FC = () => {
  const { playlistId } = useParams<{ playlistId: string }>();
  const [playlist, setPlaylist] = useState<Playlist>();

  const getPlaylistInfo = async () => {
    const response = await PlaylistService.getPlaylistById(playlistId);
    const playlist = await response.json();
    setPlaylist(playlist);
  };

  useEffect(() => {
    getPlaylistInfo();
  }, []);

  return (
    <div className="p-6">
      <Header />
      <h2 className="text-2xl font-bold mb-4">Playlist Info</h2>
      <section>
        {playlist && (<PlaylistInfo playlist={playlist} />)}
      </section>
    </div>
  );
};

export default PlaylistInfoPage;
