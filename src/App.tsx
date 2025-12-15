import { useEffect } from "react";
import { searchArtworks } from "./api/aic";

export default function App() {
  useEffect(() => {
    searchArtworks("cats")
      .then((data) => console.log("artworks", data))
      .catch((err) => console.error(err));
  }, []);

  return <div>Check console</div>;
}
