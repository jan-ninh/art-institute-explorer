import { SearchSection } from "./components/SearchSection";

export default function App() {
  return (
    <div className="mx-auto max-w-3xl p-4">
      <header className="mb-6 rounded-box bg-base-200 p-6 shadow">
        <h1 className="text-4xl font-bold tracking-tight leading-tight">
          <span className="block">Art Institute of Chicago</span>
          <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Art Finder
          </span>
        </h1>

        <p className="mt-2 text-sm opacity-70 block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Search the collection and open artworks in full IIIF quality.
        </p>
      </header>

      <SearchSection />
    </div>
  );
}
