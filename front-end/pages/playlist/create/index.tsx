import Header from "@/components/header";
import AddPlaylistForm from "@/components/playlist/CreatePlaylistForm";
import SongService from "@/services/SongService";
import { Playlist, Song } from "@/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const createPlaylist: React.FC = () => {
  const router = useRouter();
  const [songs, setSongs] = useState<Song[]>([]);
  const [playlist, setPlaylist] = useState<Playlist | null>(null);

  const getAllSongs = async () => {
    const response = await SongService.getAllSongs();
    const songs = await response.json();
    setSongs(songs);
  };

  useEffect(() => {
    getAllSongs();
    if (router.query.playlist) {
      setPlaylist(JSON.parse(router.query.playlist as string));
    }
  }, [router.query]);

  return (
    <>
      <Header />
      <main className="p-6 bg-gradient-to-b from-gray-800 to-gray-600 min-h-screen items-center flex flex-col">
        <h1 className="text-2xl font-bold mb-4 text-white">
          Create Playlist
        </h1>
        <section className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-2xl">
          <AddPlaylistForm songs={songs} playlist={playlist} />
        </section>
      </main>
    </>
  );
};

export default createPlaylist;
