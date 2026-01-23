import { useEffect, useState } from "react";
import { type SearchArt } from "../../types";

export default function Search({
  onSearch,
  searchResults,
}: {
  onSearch: (q: string) => void;
  searchResults: SearchArt[];
}) {
  const [searchItem, setSearchItem] = useState("");

  useEffect(() => {
    setSearchItem(searchItem ?? "");
  }, [searchItem]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchItem.trim();
    if (!q) return;
    onSearch(q);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex justify-center py-5">
        <label className="input border flex flex-row gap-1 items-center px-3 py-2 rounded-lg">
          <svg className="h-[1em] opacity-50 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            className="w-full p-1 bg-inherit text-white"
            type="search"
            value={searchItem}
            required
            placeholder="eg. cat"
            onChange={(e) => setSearchItem(e.target.value)}
          />
          <button type="submit">search</button>
        </label>
      </form>
      {}
    </>
  );
}
