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
    <>
      <Header />
      <main className="p-6 bg-gradient-to-b from-gray-800 to-gray-600 min-h-screen items-center flex flex-col">
        <h2 className="text-2xl font-bold mb-4 text-white">Playlist Info</h2>
        <section className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md">
          {playlist && <PlaylistInfo playlist={playlist} />}
        </section>
      </main>
    </>
  );
};

export default PlaylistInfoPage;
