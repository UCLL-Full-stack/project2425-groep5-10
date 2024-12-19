import { useEffect, useState } from "react";
import PlaylistService from "@/services/PlaylistService";
import type { Playlist, Song } from "@/types";
import Head from "next/head";
import Header from "@/components/header";
import PlaylistOverview from "@/components/playlist/PlaylistOverview";
import CreatePlaylistForm from "@/components/playlist/CreatePlaylistForm";
import SongService from "@/services/SongService";
import Link from "next/link";

const Playlist: React.FC = () => {
  const [playlists, setPlaylists] = useState<Array<Playlist>>([]);
  const [songs, setSongs] = useState<Array<Song>>([]);

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
                <PlaylistOverview playlists={playlists} />
            </section>
            <Link href="/playlist/create">
                <p>Create playlist</p>
            </Link>
        </main>
    </>
);
};

export default Playlist;
