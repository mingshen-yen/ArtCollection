import { Link } from "react-router";

export default function Header() {
  return (
    <div className="bg-white shadow-md">
      <div className="flex items-center justify-between px-4 md:px-8 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <i className="fa-regular fa-calendar text-[#b87f05] text-xl"></i>
          <Link to={"/"}>
            <p className="font-bold cursor-pointer">Artwork Gallery</p>
          </Link>
        </div>
        <div>
          <Link to={"/gallery"}>
            <button className="bg-orange-100 hover:font-semibold py-2 px-3 rounded-xl">Gallery</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
