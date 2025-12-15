import { type FormEvent, useState } from "react";
import { searchArtworks } from "../api/aic";
import type { Artwork } from "../schemas/artwork.schema";
import { ArtworkCard } from "./ArtworkCard";

//----------------------------------------------------------------------------
// function: SearchSection ---------------------------------------------------
//----------------------------------------------------------------------------
export function SearchSection() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    const q = query.trim();
    if (!q) {
      setResults([]);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await searchArtworks(q);
      setResults(data);
    } catch (err) {
      setResults([]);
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  //-----------------------------------------------------------------------
  // return ---------------------------------------------------------------
  //-----------------------------------------------------------------------
  return (
    <section className="mt-6">
      <form onSubmit={onSubmit} className="flex flex-col gap-2 sm:flex-row">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search artworks (e.g. picasso, cats)..."
          className="input input-bordered w-full"
        />

        <button
          type="submit"
          disabled={loading}
          className={`btn btn-primary sm:w-auto ${
            loading ? "btn-disabled" : ""
          }`}
        >
          {loading ? "Searching…" : "Search"}
        </button>
      </form>

      {error && (
        <div role="alert" className="alert alert-error mt-3">
          <span>{error}</span>
        </div>
      )}

      {!loading && !error && results.length > 0 && (
        <div className="mt-4 flex items-center gap-2 text-sm">
          <span className="text-base-content/70">Found</span>
          <span className="badge badge-neutral">{results.length}</span>
        </div>
      )}

      <ul className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {results.map((a) => (
          <li
            key={a.id}
            className="transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md rounded-box"
          >
            <ArtworkCard artwork={a} />
          </li>
        ))}
      </ul>
    </section>
  );
}
