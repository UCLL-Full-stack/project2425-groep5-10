import { useEffect, useState } from "react";
import PlaylistService from "@/services/PlaylistService";
import type { Playlist } from "@/types";
import Head from "next/head";
import Header from "@/components/header";
import PlaylistOverview from "@/components/playlist/PlaylistOverview";

const Playlist: React.FC = () => {
  const [playlist, setPlaylist] = useState<Array<Playlist>>([]);

  const getAllPlaylists = async () => {
    const response = await PlaylistService.getAllPlaylists();
    const playlists = await response.json();
    setPlaylist(playlists);
  }

  useEffect(() => {
    getAllPlaylists();
  }, []);

  return (
    <>
        <Head>
            <title>Lecturers</title>
        </Head>
        <Header />
        <main>
            <h1>Lecturers</h1>
            <section>
                <PlaylistOverview playlist={playlist} />
            </section>
        </main>
    </>
);
};

export default Playlist;
