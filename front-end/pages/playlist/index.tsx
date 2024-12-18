import { useEffect, useState } from "react";
import PlaylistService from "@/services/PlaylistService";
import type { Playlist, Song } from "@/types";
import Head from "next/head";
import Header from "@/components/header";
import PlaylistOverview from "@/components/playlist/PlaylistOverview";
import CreatePlaylistForm from "@/components/playlist/CreatePlaylistForm";
import SongService from "@/services/SongService";

const Playlist: React.FC = () => {
  const [playlists, setPlaylists] = useState<Array<Playlist>>([]);
  const [songs, setSongs] = useState<Array<Song>>([]);

  const getAllPlaylists = async () => {
    const response = await PlaylistService.getAllPlaylists();
    const playlists = await response.json();
    setPlaylists(playlists);
  }

  const getAllSongs = async () => {
    const response = await SongService.getAllSongs();
    const songs = await response.json();
    setSongs(songs);
  }

  useEffect(() => {
    getAllPlaylists();
    getAllSongs();
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
                <PlaylistOverview playlists={playlists} />
            </section>
            <CreatePlaylistForm songs={songs}/>
        </main>
    </>
);
};

export default Playlist;
