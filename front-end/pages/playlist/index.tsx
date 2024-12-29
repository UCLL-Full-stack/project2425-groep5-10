import { useEffect, useState } from "react";
import PlaylistService from "@/services/PlaylistService";
import type { Playlist } from "@/types";
import Head from "next/head";
import Header from "@/components/header";
import PlaylistOverview from "@/components/playlist/PlaylistOverview";
import Link from "next/link";

const Playlist: React.FC = () => {
  const [playlists, setPlaylists] = useState<Array<Playlist>>();

  const getAllPlaylists = async () => {
    const response = await PlaylistService.getAllPlaylists();
    const playlists = await response.json();
    setPlaylists(playlists);
  };

  useEffect(() => {
    getAllPlaylists();
  }, []);

  return (
    <>
      <Head>
        <title>Playlists</title>
      </Head>
      <Header />
      <main className="p-6 bg-gradient-to-b from-gray-800 to-gray-600 min-h-screen items-center flex flex-col">
        <h1 className="text-2xl font-bold mb-4">Playlists</h1>
        <section className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-2xl">
          {playlists && <PlaylistOverview playlists={playlists} />}
          <Link href="/playlist/create" className="flex justify-center">
            <p className="p-4 m-4 bg-white shadow rounded-lg hover:bg-gray-100 text-xl text-gray-700 font-bold">
              Create playlist
            </p>
          </Link>
        </section>
      </main>
    </>
  );
};

export default Playlist;
