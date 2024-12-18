import PlaylistService from "@/services/PlaylistService";
import { Song } from "@/types";
import React, { FormEvent, useState } from "react";

type Props = {
  songs: Array<Song>;
};

const AddPlaylistForm: React.FC<Props> = ({ songs }) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [selectedSongs, setSelectedSongs] = useState<Array<string>>([]);

  const handleSongSelection = (songId: string) => {
    setSelectedSongs((prevSelectedSongs) =>
      prevSelectedSongs.includes(songId)
        ? prevSelectedSongs.filter((id) => id !== songId)
        : [...prevSelectedSongs, songId]
    );
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const newPlaylist = {
      name,
      description,
      songs: selectedSongs,
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
      <div id="songs" style={{ maxHeight: "200px", overflowY: "scroll" }}>
        {songs.map((song) => (
          <div key={song.id}>
            <input
              type="checkbox"
              id={`song-${song.id}`}
              onChange={() => song.id && handleSongSelection(song.id)}
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
