import { NavLink } from "react-router";
import paintingIcon from "../assets/icons/painting-1.svg";

export function Header() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    [
      "btn",
      "btn-sm",
      "rounded-full",
      "px-4",
      isActive ? "btn-primary shadow-md" : "btn-ghost",
    ].join(" ");

  return (
    <header className="pt-4">
      <div className="sticky top-0 z-50">
        <div className="relative">
          {/* soft glow behind the bar */}
          <div className="pointer-events-none absolute inset-0 -z-10 rounded-[1.25rem] bg-gradient-to-r from-primary/25 via-secondary/10 to-accent/20 blur-xl opacity-70" />

          {/* gradient frame */}
          <div className="rounded-[1.25rem] bg-gradient-to-r from-primary/30 via-base-content/10 to-secondary/30 p-[1px]">
            <div className="navbar rounded-[1.2rem] border border-base-300/30 bg-base-100/60 backdrop-blur-xl">
              <div className="navbar-start gap-3">
                <div className="relative">
                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/45 to-secondary/30 blur-lg" />
                  <div className="relative rounded-2xl border border-base-300/30 bg-base-200/40 p-2">
                    <img
                      src={paintingIcon}
                      alt="Painting icon"
                      className="h-8 w-8 opacity-90"
                    />
                  </div>
                </div>

                <div className="min-w-0">
                  <div className="text-lg font-black tracking-tight sm:text-xl">
                    <span className="bg-gradient-to-r from-base-content via-primary to-secondary bg-clip-text text-transparent">
                      Curator&apos;s Lens
                    </span>
                  </div>

                  <div className="mt-0.5 flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold opacity-70 sm:text-sm">
                      Art Institute of Chicago
                    </span>
                    <span className="badge badge-outline badge-xs">IIIF</span>
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
        </div>
      </div>
    </header>
  );
}
