import { Link } from "react-router";

export default function Header() {
  return (
    <div className="bg-slate-300 shadow-md p-1">
      <div className="flex items-center justify-between px-4 md:px-8 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <i className="fa-regular fa-calendar text-[#b87f05] text-xl"></i>
          <Link to={"/"}>
            <p className="font-bold cursor-pointer">Artwork Gallery</p>
          </Link>
        </div>
        <div>
          <Link to={"/gallery"} className="hover:underline hover:font-semibold">
            Gallery
          </Link>
        </div>
      </div>
    </div>
  );
}
