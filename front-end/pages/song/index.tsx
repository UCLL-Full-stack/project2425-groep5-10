import SongService from "@/services/SongService";
import { useEffect, useState } from "react";
import type { Song } from "@/types"; // Adjust the import path as necessary
import SongOverview from "@/components/song/SongOverview";
import Header from "@/components/header";
import Link from "next/link";

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
    <>
      <Header />
      <main className="p-6 bg-gradient-to-b from-gray-800 to-gray-600 min-h-screen items-center flex flex-col">
        <h1 className="text-2xl font-bold mb-4 text-white">
          Songs
        </h1>
        <section className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-2xl">
          {songs && <SongOverview songs={songs} />}
        <Link href="/song/create" className="flex justify-center">
          <p className="p-4 m-4 bg-white shadow rounded-lg hover:bg-gray-100 text-xl text-gray-700 font-bold">Add a new song</p>
        </Link>
        </section>
      </main>
    </>
  );
};

export default Song;
