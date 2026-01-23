import { Link } from "react-router";
import { Plus, MoveLeft } from "lucide-react";
import { useEffect, useState } from "react";
import type { Art, SavedArt } from "../types";
import CollectedCard from "../components/ui/CollectedCard";

export default function Gallery() {
  const [toast, setToast] = useState<string | null>(null);

  const [collection, setCollection] = useState<SavedArt[]>(() => {
    const saved = localStorage.getItem("collection");
    if (!saved) return [];
    try {
      return JSON.parse(saved) as SavedArt[];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("collection", JSON.stringify(collection));
  }, [collection]);

  const handleSaveNote = (id: number, rawNote: string) => {
    const trimmed = rawNote.trim();

    setCollection((prev) =>
      prev.map((a) => (a.id === id ? { ...a, note: trimmed.length === 0 ? undefined : trimmed } : a)),
    );
    return { ok: true as const };
  };

  const handleDelete = (art: Art) => {
    setCollection((prev) => prev.filter((a) => a.id !== art.id));
    setToast("💡 Removed from Gallery!");
    setTimeout(() => setToast(null), 2000);
  };

  return (
    <>
      {toast && (
        <div className="fixed top-4 left-4 text-sm text-black bg-gray-100 px-4 py-3 rounded-xl shadow-2xl">{toast}</div>
      )}
      <div className="px-10 md:px-10 py-2 max-w-7xl mx-auto">
        <Link to="/" className="flex gap-1 pb-2 text-slate-200 text-sm items-center">
          <MoveLeft className="w-4" />
          <p className="cursor-pointer hover:underline">Go back</p>
        </Link>
        <h1>Personal Gallery</h1>
        {/* Card */}
        {collection.length === 0 ? (
          <div className="text-center py-10">
            <div className="bg-orange-50 rounded-2xl p-12 shadow-sm max-w-md mx-auto">
              <div className="w-16 h-16 bg-orange-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-orange-400" />
              </div>
              <h2 className="text-gray-900 mb-2">No entries yet</h2>
              <p className="text-gray-700">Add your favourites to your artwork collection.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-3 p-5">
            {collection.map((a) => (
              <CollectedCard key={a.id} art={a} onSaveNote={handleSaveNote} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
