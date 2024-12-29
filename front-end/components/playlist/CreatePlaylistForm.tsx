import PlaylistService from "@/services/PlaylistService";
import { Song, Playlist } from "@/types";
import React, { FormEvent, useEffect, useState } from "react";

type Props = {
  songs: Array<Song>;
  playlist: Playlist | null;
};

const AddPlaylistForm: React.FC<Props> = ({ songs, playlist }) => {
  const [name, setName] = useState<string>(playlist?.name || "");
  const [description, setDescription] = useState<string>(playlist?.description || "");
  const [selectedSongs, setSelectedSongs] = useState<Array<Song>>(playlist?.songs || []);

  // Update state whenever the playlist prop changes
  useEffect(() => {
    if (playlist) {
      setName(playlist.name || "");
      setDescription(playlist.description || "");
      setSelectedSongs(playlist.songs || []);
    } else {
      setName("");
      setDescription("");
      setSelectedSongs([]);
    }
  }, [playlist]);

  const handleSongSelection = (song: Song) => {
    setSelectedSongs((prevSelectedSongs) =>
      prevSelectedSongs.some((s) => s.id === song.id)
        ? prevSelectedSongs.filter((s) => s.id !== song.id)
        : [...prevSelectedSongs, song]
    );
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const user = JSON.parse(localStorage.getItem("loggedInUser")!)?.email;
    if (!user) {
      console.log("No logged-in user found.");
      return;
    }
    const newPlaylist = {
      name,
      description,
      songs: selectedSongs,
      user: { email: user },
    };
    try {
      const response = playlist
        ? await PlaylistService.updatePlaylist( playlist.id!,newPlaylist) // Update if editing
        : await PlaylistService.createPlaylist(newPlaylist); // Create if adding
      if (response.ok) {
        console.log(playlist ? "Playlist updated" : "Playlist added");
      } else {
        console.log("Failed to save playlist");
      }
    } catch (error) {
      console.error("Error saving playlist:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 m-4 bg-gray-800 rounded-lg">
      <label htmlFor="name" className="block text-xl font-bold text-white">Name</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-white"
      />
      <label htmlFor="description" className="block text-xl font-bold text-white">Description</label>
      <textarea
        id="description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-white"
      />
      <label htmlFor="songs" className="block text-xl font-bold text-white">Songs</label>
      <div id="songs" className="space-y-2 max-h-48 overflow-y-auto">
        {songs.map((song) => (
          <div key={song.id} className="flex items-center">
            <input
              type="checkbox"
              id={`song-${song.id}`}
              checked={selectedSongs.some((s) => s.id === song.id)}
              onChange={() => song && handleSongSelection(song)}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded bg-gray-700"
            />
            <label htmlFor={`song-${song.id}`} className="ml-2 block text-sm text-white">
              {song.title}
            </label>
          </div>
        ))}
      </div>
      <button
        type="submit"
        className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {playlist ? "Update Playlist" : "Add Playlist"}
      </button>
    </form>
  );
};

export default AddPlaylistForm;
