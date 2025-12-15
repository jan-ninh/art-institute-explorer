import { Outlet } from "react-router";
import { Header } from "./components/Header";

export default function App() {
  return (
    <div className="min-h-screen bg-base-200">
      <div className="mx-auto max-w-6xl px-4 pb-12">
        <Header />

        <main className="mt-6 rounded-box bg-base-100/70 p-4 shadow-xl backdrop-blur sm:p-6">
          <Outlet />
        </main>

        <footer className="mt-10 text-center text-xs opacity-60">
          Data © Art Institute of Chicago • Built with IIIF
        </footer>
      </div>
    </div>
  );
}
