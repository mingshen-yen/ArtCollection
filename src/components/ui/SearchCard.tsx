import type { Art } from "../../types";

export default function ArtworkCard({ art, onAdd }: { art: Art; onAdd: (art: Art) => void }) {
  return (
    <>
      <div className="card bg-orange-50 shadow-sm rounded-xl p-4 gap-5">
        <div className="card-body flex flex-col gap-2">
          <img
            className="w-fit rounded-t-xl"
            src={`https://www.artic.edu/iiif/2/${art.image_id}/full/400,/0/default.jpg`}
            alt={art.title}
          />
          <div className="p-2">
            <h2 className="font-bold text-xl">{art.title}</h2>
            <p className="line-clamp-1 text-sm text-gray-500 ">{art.artist_display}</p>
            <p className="line-clamp-1 text-sm text-gray-500 ">{art.date_display}</p>
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => onAdd(art)}
              className="bg-orange-200 text-sm hover:font-semibold py-2 px-3 rounded-xl"
            >
              Add to Gallery
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
