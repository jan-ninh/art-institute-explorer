import { NavLink } from "react-router";
import paintingIcon from "../assets/icons/painting-1.svg";

export function Header() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    ["btn", "btn-sm", isActive ? "btn-primary" : "btn-ghost"].join(" ");

  return (
    <header className="pt-4">
      {/* Top bar (sticky) */}
      <div className="sticky top-0 z-50">
        <div className="navbar rounded-box border border-base-300/40 bg-base-100/70 shadow-md backdrop-blur">
          <div className="navbar-start gap-3">
            <div className="avatar placeholder">
              <img
                src={paintingIcon}
                alt="Painting icon"
                className="h-10 w-10"
              />
            </div>

            <div className="min-w-0">
              <div className="text-lg font-extrabold leading-tight tracking-tight sm:text-xl">
                <span className="block">Curator&apos;s Lens</span>
                <span className="block text-xs font-semibold opacity-70 sm:text-sm">
                  Art Institute of Chicago
                </span>
              </div>
            </div>
          </div>

          <div className="navbar-end">
            <nav className="flex items-center gap-2">
              <NavLink to="/" end className={linkClass}>
                Explore
              </NavLink>
              <NavLink to="/gallery" className={linkClass}>
                Gallery
              </NavLink>
            </nav>
          </div>
        </div>
      </div>

      {/* Hero strip */}
      <div className="mt-6 rounded-box bg-gradient-to-r from-primary/20 via-transparent to-secondary/20 p-[1px]">
        <div className="rounded-box bg-base-200/60 p-5">
          <h2 className="text-2xl font-bold leading-tight sm:text-3xl">
            <span className="block">Find art. Curate taste.</span>
            <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Save your favorites.
            </span>
          </h2>
          <p className="mt-2 text-sm opacity-70 sm:text-base">
            Search the collection and open artworks in full IIIF quality.
          </p>
        </div>
      </div>
    </header>
  );
}
