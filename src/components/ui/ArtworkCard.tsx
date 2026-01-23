import type { Art } from "../../types";

export default function ArtworkCard({ art, onAdd }: { art: Art; onAdd: (art: Art) => void }) {
  return (
    <>
      <div className="card bg-slate-100 shadow-sm gap-5 rounded-sm">
        <div className="card-body flex flex-col gap-1">
          <div className="aspect-[4/5] w-full overflow-hidden">
            <img
              className="h-full w-full object-cover rounded-sm"
              src={`https://www.artic.edu/iiif/2/${art.image_id}/full/400,/0/default.jpg`}
              alt={art.title}
            />
          </div>
          <div className="p-2 flex flex-col ">
            <div className="">
              <h2 className="line-clamp-2 font-bold text-sm h-10">{art.title}</h2>
              <p className="p-1 line-clamp-2 text-xs text-gray-500 h-14">{art.artist_display}</p>
              <p className="p-1 text-xs text-gray-500">{art.date_display}</p>
            </div>
            <div className="flex justify-end">
              <button onClick={() => onAdd(art)} className="btn">
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
