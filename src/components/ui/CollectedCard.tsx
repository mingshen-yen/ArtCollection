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
      {toast && (
        <div className="fixed top-4 left-4 text-sm text-black bg-gray-100 px-4 py-3 rounded-xl shadow-2xl">{toast}</div>
      )}
      <div className="card bg-orange-50 shadow-sm rounded-xl p-4 gap-5">
        <div className="card-body flex flex-col gap-2">
          <img
            className="w-fit rounded-t-xl"
            src={`https://www.artic.edu/iiif/2/${art.image_id}/full/400,/0/default.jpg`}
            alt={art.title}
          />
          <div className="px-2 pt-2">
            <h2 className="font-bold text-xl">{art.title}</h2>
            <p className="text-sm text-gray-500 ">{art.artist_display}</p>
            <p className="text-sm text-gray-500 ">{art.date_display}</p>
          </div>
          <div className="px-2">
            <textarea
              className="w-full mt-2 p-2 rounded border border-orange-200 bg-white text-sm"
              rows={3}
              placeholder="Write a short note..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />

            {errors.length > 0 && (
              <ul className="mt-2 text-sm text-red-600 list-disc pl-5">
                {errors.map((msg, i) => (
                  <li key={`${msg}-${i}`}>{msg}</li>
                ))}
              </ul>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <button onClick={handleSave} className="bg-orange-200 text-sm hover:font-semibold py-2 px-3 rounded-xl">
              Save note
            </button>
            <button
              onClick={() => onDelete(art)}
              className="bg-orange-200 text-sm hover:font-semibold py-2 px-3 rounded-xl"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
