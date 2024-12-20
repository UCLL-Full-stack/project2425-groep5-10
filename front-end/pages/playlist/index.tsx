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
        <main>
            <h1>Playlists</h1>
            <section>
                {playlists && (<PlaylistOverview playlists={playlists} />)}
            </section>
            <Link href="/playlist/create">
                <p>Create playlist</p>
            </Link>
        </main>
    </>
);
};

export default Playlist;
