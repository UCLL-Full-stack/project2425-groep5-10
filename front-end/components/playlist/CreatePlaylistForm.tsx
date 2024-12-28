import PlaylistService from "@/services/PlaylistService";
import { Song } from "@/types";
import React, { FormEvent, useState } from "react";

type Props = {
  songs: Array<Song>;
};

const AddPlaylistForm: React.FC<Props> = ({ songs }) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [selectedSongs, setSelectedSongs] = useState<Array<Song>>([]);

  const handleSongSelection = (song: Song) => {
    setSelectedSongs((prevSelectedSongs) =>
      prevSelectedSongs.includes(song)
        ? prevSelectedSongs.filter((s) => s.title !== song.title)
        : [...prevSelectedSongs, song]
    );
  };
  

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const user = JSON.parse(localStorage.getItem("loggedInUser")!).email;
    const newPlaylist = {
      name,
      description,
      songs: selectedSongs,
      user: { email: user },
    };
    const response = await PlaylistService.createPlaylist(newPlaylist);
    if (response.ok) {
      console.log("Playlist added");
    } else {
      console.log("Failed to add playlist");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        onChange={(event) => setName(event.target.value)}
      />
      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        onChange={(event) => setDescription(event.target.value)}
      />
      <label htmlFor="songs">Songs</label>
      <div id="songs">
        {songs.map((song) => (
          <div key={song.id}>
            <input
              type="checkbox"
              id={`song-${song.id}`}
              checked={selectedSongs.includes(song || "")}
              onChange={() => song && handleSongSelection(song)}
            />
            <label htmlFor={`song-${song.id}`}>{song.title}</label>
          </div>
        ))}
      </div>
      <button type="submit">Add playlist</button>
    </form>
  );
};

export default AddPlaylistForm;
