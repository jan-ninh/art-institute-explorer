import { NavLink, Outlet } from "react-router";
import { Header } from "./components/Header";

export default function App() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "btn btn-sm btn-primary" : "btn btn-sm btn-ghost";

  return (
    <div className="mx-auto max-w-3xl p-4">
      <Header />

      <nav className="mb-6 flex gap-2">
        <NavLink to="/" end className={linkClass}>
          Explore
        </NavLink>
        <NavLink to="/gallery" className={linkClass}>
          Gallery
        </NavLink>
      </nav>

      <Outlet />
    </div>
  );
}
