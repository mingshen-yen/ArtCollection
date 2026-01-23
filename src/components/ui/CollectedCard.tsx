import type { SavedArt } from "../../types";
import { useEffect, useState } from "react";

type Props = {
  art: SavedArt;
  onSaveNote: (id: number, note: string) => { ok: true } | { ok: false; errors: string[] };
  onDelete: (art: SavedArt) => void;
};

export default function CollectedCard({ art, onSaveNote, onDelete }: Props) {
  const [note, setNote] = useState(art.note ?? "");
  const [errors, setErrors] = useState<string[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    setNote(art.note ?? "");
  }, [art.note]);

  const handleSave = () => {
    const result = onSaveNote(art.id, note);
    if (result.ok) {
      setErrors([]);
      setToast("✅ Your note successfully saved!");
    } else {
      setErrors(result.errors);
    }
    if (note.length === 0) setToast("⚠️ Your note is empty!");
    setTimeout(() => setToast(null), 2000);
  };
  return (
    <>
      {toast && <div className="toast">{toast}</div>}

      <div className="card bg-slate-100 shadow-sm gap-5 rounded-sm">
        <div className="card-body flex flex-col gap-1">
          <div className="aspect-[4/5] w-full overflow-hidden">
            <img
              className="h-full w-full object-cover rounded-sm"
              src={`https://www.artic.edu/iiif/2/${art.image_id}/full/400,/0/default.jpg`}
              alt={art.title}
            />
          </div>
          <div className="p-2 flex flex-col">
            <h2 className="line-clamp-2 font-bold text-sm h-10">{art.title}</h2>
            <p className="p-1 line-clamp-2 text-xs text-gray-500 h-10">{art.artist_display}</p>
            <p className="p-1 text-xs text-gray-500">{art.date_display}</p>
            <div className="flex justify-end">
              <textarea
                className="w-full py-1 px-2 rounded border border-slate-200 bg-white text-sm"
                rows={2}
                placeholder="Write a short note..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
          </div>
          <div className="pb-2 px-2 flex justify-end gap-1">
            <button onClick={handleSave} className="btn">
              Save note
            </button>
            <button onClick={() => onDelete(art)} className="btn">
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
