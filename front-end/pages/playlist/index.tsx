import { useEffect, useState } from "react";
import { Playlist } from "@types";

const Playlist: React.FC = () => {
  const [playlist, setPlaylist] = useState<Array<Playlist>>([]);

  useEffect(() => {
  }, []);

  return <div>Playlist</div>;
};

export default Playlist;
