import { useEffect, useState } from "react";
import { type Art, ArtworkArraySchema } from "../types";
import ArtworkCard from "../components/ui/ArtworkCard";

const url = "https://api.artic.edu/api/v1/artworks?page=1&limit=10";

export default function HomePage() {
  const [arts, setArts] = useState<Art[]>([]);
  const [toast, setToast] = useState<string | null>(null);

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
        const res = await fetch(url);
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
        setToast("💡 Already in your collection!");
        return prev;
      }
      setToast("✅ Added to your collection!");
      return [...prev, art];
    });

    setTimeout(() => setToast(null), 2000);
  };

  const handleSearch = () => {};

  return (
    <>
      <div className="px-10 md:px-10 py-4 max-w-7xl mx-auto">
        <div className="flex justify-center py-5">
          <label className="input border flex flex-row gap-1 items-center px-3 py-2 rounded-lg w-1/2">
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input className="w-full p-1" type="search" required placeholder="Search" />
            <button onClick={handleSearch} className="bg-orange-100 text-orange-900 py-1 px-2 rounded-lg">
              search
            </button>
          </label>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-3 p-5">
          {arts.map((a) => (
            <ArtworkCard key={a.id} art={a} onAdd={handleAddToCollection} />
          ))}
        </div>
        {toast && (
          <div className="fixed top-4 left-4 text-sm text-black bg-gray-100 px-4 py-3 rounded-xl shadow-2xl">
            {toast}
          </div>
        )}
      </div>
    </>
  );
}
