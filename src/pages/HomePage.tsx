import { useEffect, useState } from "react";
import { type Art, type SearchArt, ArtworkArraySchema, SearchResponseSchema } from "../types";
import ArtworkCard from "../components/ui/ArtworkCard";
import Search from "../components/layout/Search";

export default function HomePage() {
  const [arts, setArts] = useState<Art[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [url, setUrl] = useState<string>("");
  const [artUrl, setArtUrl] = useState<string>("");

  const [searchResults, setSearchResults] = useState<SearchArt[]>([]);

  const [collection, setCollection] = useState<Art[]>(() => {
    const saved = localStorage.getItem("collection");
    if (!saved) return [];
    try {
      return JSON.parse(saved) as Art[];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const getArts = async () => {
      try {
        const res = await fetch("https://api.artic.edu/api/v1/artworks?page=1&limit=10");
        if (!res.ok) throw new Error("Something went wrong!");
        const resData = await res.json();
        const result = ArtworkArraySchema.safeParse(resData);
        if (!result.success) {
          console.error(result.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`));
          return;
        }

        setArts(result.data.data.filter((a) => a.image_id !== null));
      } catch (error) {
        console.log(error);
      }
    };
    getArts();
  }, []);

  useEffect(() => {
    localStorage.setItem("collection", JSON.stringify(collection));
  }, [collection]);

  const handleAddToCollection = (art: Art) => {
    setCollection((prev) => {
      if (prev.some((a) => a.id === art.id)) {
        setToast("💡 Already in Gallery");
        return prev;
      }
      setToast("✅ Added to Gallery");
      return [...prev, art];
    });

    window.setTimeout(() => setToast(null), 2000);
  };

  useEffect(() => {
    const searchArts = async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Something went wrong!");
        const resData = await res.json();
        const result = SearchResponseSchema.safeParse(resData);
        if (!result.success) {
          console.error(result.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`));
          return;
        }
        setSearchResults(result.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    searchArts();
  }, [url]);

  const doSearch = (q: string) => {
    const encoded = encodeURIComponent(q);
    setUrl(`https://api.artic.edu/api/v1/artworks/search?q=${encoded}&query[term][is_public_domain]=true`);
  };

  return (
    <>
      {toast && (
        <div className="fixed top-5 left-4 text-sm text-black bg-white px-4 py-3 rounded-xl shadow-lg">{toast}</div>
      )}
      <Search onSearch={(q) => doSearch(q)} searchResults={searchResults} />
      {searchResults &&
        searchResults.map((a) => {
          return <div key={a.id}>{a.title}</div>;
        })}
      <div className="px-10 md:px-10 py-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-3 p-5">
          {arts.map((a) => (
            <ArtworkCard key={a.id} art={a} onAdd={handleAddToCollection} />
          ))}
        </div>
      </div>
    </>
  );
}
