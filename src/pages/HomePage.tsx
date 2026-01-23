import { useEffect, useState } from "react";
import { type Art, ArtworkArraySchema, SearchResponseSchema } from "../types";
import ArtworkCard from "../components/ui/ArtworkCard";
import Search from "../components/layout/Search";

export default function HomePage() {
  const [arts, setArts] = useState<Art[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [searchUrl, setSearchUrl] = useState<string>("");
  const [searchDetails, setSearchDetails] = useState<Art[]>([]);
  const [collection, setCollection] = useState<Art[]>(() => {
    const saved = localStorage.getItem("collection");
    if (!saved) return [];
    try {
      return JSON.parse(saved) as Art[];
    } catch {
      return [];
    }
  });

  // initial artworks
  useEffect(() => {
    const getArts = async () => {
      try {
        const res = await fetch("https://api.artic.edu/api/v1/artworks");
        if (!res.ok) return;
        const resData = await res.json();
        const result = ArtworkArraySchema.safeParse(resData);

        if (!result.success) {
          console.error(result.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`));
          return;
        }

        const cleaned = result.data.data.filter((a) => a.image_id != null);
        setArts(cleaned);
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

  // search: get ids + titles (search hits)
  useEffect(() => {
    if (!searchUrl) return;
    const searchArts = async () => {
      try {
        const res = await fetch(searchUrl);
        if (!res.ok) throw new Error("Something went wrong!");
        const resData = await res.json();
        const result = SearchResponseSchema.safeParse(resData);
        if (!result.success) {
          console.error(result.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`));
          return;
        }
        // get search results details
        const ids = result.data.data.map((x) => x.id);
        if (ids.length === 0) {
          setSearchDetails([]);
          return;
        }
        // fetch details in ONE call
        const fields = ["id", "title", "image_id", "artist_display", "date_display"].join(",");
        const detailsUrl = `https://api.artic.edu/api/v1/artworks?ids=${ids.join(",")}&fields=${fields}`;
        const detailsRes = await fetch(detailsUrl);
        if (!detailsRes.ok) throw new Error("Failed to fetch artwork details");
        const detailsJson = await detailsRes.json();
        const detailsParsed = ArtworkArraySchema.safeParse(detailsJson);
        if (!detailsParsed.success) {
          console.error(detailsParsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`));
          return;
        }
        setSearchDetails(detailsParsed.data.data.filter((a) => a.image_id != null));
      } catch (error) {
        console.log(error);
      }
    };
    searchArts();
  }, [searchUrl]);

  const doSearch = (q: string) => {
    const encoded = encodeURIComponent(q);
    setSearchUrl(`https://api.artic.edu/api/v1/artworks/search?q=${encoded}&query[term][is_public_domain]=true`);
  };

  return (
    <>
      {toast && <div className="toast">{toast}</div>}
      <div className="px-4 max-w-7xl mx-auto">
        <Search onSearch={(q) => doSearch(q)} />
      </div>
      {searchDetails.length > 0 && (
        <div className="px-10 md:px-10 py-4 max-w-7xl mx-auto">
          <h1>Search Results</h1>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mt-3 p-5">
            {searchDetails.map((a) => (
              <ArtworkCard key={a.id} art={a} onAdd={handleAddToCollection} />
            ))}
          </div>
        </div>
      )}
      <div className="px-10 md:px-10 py-4 max-w-7xl mx-auto">
        <h1>Artworks</h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mt-3 p-5">
          {arts.map((a) => (
            <ArtworkCard key={a.id} art={a} onAdd={handleAddToCollection} />
          ))}
        </div>
      </div>
    </>
  );
}
