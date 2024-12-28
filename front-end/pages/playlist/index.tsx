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
  }

  useEffect(() => {
    getAllPlaylists();
  }, []);

  return (
    <>
        <Head>
            <title>Playlists</title>
        </Head>
        <Header />
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Playlists</h1>
            <section>
                {playlists && (<PlaylistOverview playlists={playlists} />)}
            </section>
            <Link href="/playlist/create">
                <p className="text-blue-500 hover:underline">Create playlist</p>
            </Link>
        </main>
    </>
);
};

export default Playlist;
