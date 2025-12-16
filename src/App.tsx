import { Outlet } from "react-router";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-base-200">
      {/* Background Orbs */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -left-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -right-40 top-10 h-[30rem] w-[30rem] rounded-full bg-secondary/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
      </div>

      {/* App content */}
      <div className="relative z-10">
        <div className="mx-auto max-w-6xl px-4 pb-12">
          <Header />

          <main className="mt-6 rounded-box bg-base-100/70 p-4 shadow-xl backdrop-blur sm:p-6">
            <Outlet />
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
}
