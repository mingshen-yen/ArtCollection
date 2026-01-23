import { Link } from "react-router";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="bg-slate-300 shadow-sm ">
        <div className="flex items-center justify-between px-4 md:px-8 py-4 max-w-7xl mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link to={"/"}>
              <p className="text-xl font-bold text-slate-800 cursor-pointer hover:text-slate-600">ArtworkHub</p>
            </Link>
          </div>
          <div>
            <Link to={"/gallery"} className="text-base underline hover:font-semibold">
              Gallery
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
