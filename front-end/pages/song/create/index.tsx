import Header from "@/components/header";
import AddPlaylistForm from "@/components/playlist/CreatePlaylistForm";
import CreateSongForm from "@/components/song/CreateSongForm";
import SongService from "@/services/SongService";
import { Song } from "@/types";
import { useEffect, useState } from "react";

const createPlaylist: React.FC = () => {

  return (
    <>
      <Header />
      <main className="p-6 bg-gradient-to-b from-gray-800 to-gray-600 min-h-screen items-center flex flex-col">
        <h1 className="text-2xl font-bold mb-4 text-white">
          Add Song
        </h1>
        <section className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-2xl">
          <CreateSongForm/>
        </section>
      </main>
    </>
  );
};

export default createPlaylist;
