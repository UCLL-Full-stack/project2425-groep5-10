import SongService from "@/services/SongService";
import { FormEvent, useState } from "react";

const CreateSongForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [duration, setDuration] = useState(0);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const newSong = {
      title,
      artist,
      duration,
    };
    const response = await SongService.createSong(newSong);
    if (response.ok) {
      console.log("Song added");
    } else {
      console.log("Failed to add song");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 m-4 bg-gray-800 rounded-lg"
    >
      <label htmlFor="title" className="block text-xl font-bold text-white">
        Title
      </label>
      <input
        type="text"
        id="title"
        onChange={(event) => setTitle(event.target.value)}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-white"
      />
      <label htmlFor="artist" className="block text-xl font-bold text-white">
        Artist
      </label>
      <input
        type="text"
        id="artist"
        onChange={(event) => setArtist(event.target.value)}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-white"
      />
      <label htmlFor="duration" className="block text-xl font-bold text-white">
        Duration
      </label>
      <input
        type="number"
        id="duration"
        onChange={(event) => setDuration(parseInt(event.target.value))}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-white"
      />
      <button
        type="submit"
        className="bg-gray-700 text-white p-2 rounded-lg hover:bg-gray-600"
      >
        Add Song
      </button>
    </form>
  );
};

export default CreateSongForm;