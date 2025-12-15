import { type FormEvent, useMemo, useState } from "react";
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

  const suggestions = useMemo(
    () => ["monet", "picasso", "cats", "portrait", "impressionism", "ukiyo-e"],
    []
  );

  const canSearch = query.trim().length > 0 && !loading;

  async function runSearch(raw: string) {
    const q = raw.trim();
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

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    await runSearch(query);
  }

  //-----------------------------------------------------------------------
  // return ---------------------------------------------------------------
  //-----------------------------------------------------------------------
  return (
    <section className="space-y-4">
      <div className="rounded-box border border-base-300/40 bg-base-100 p-4 shadow-md">
        <form onSubmit={onSubmit} className="space-y-3">
          <div className="join w-full">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='Search artworks (e.g. "monet", "cats")...'
              className="input input-bordered join-item w-full"
            />
            <button
              type="submit"
              disabled={!canSearch}
              className="btn btn-primary join-item"
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  Searching…
                </>
              ) : (
                "Search"
              )}
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs opacity-60">Quick picks:</span>
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                className="btn btn-xs btn-ghost border border-base-300/40"
                onClick={() => {
                  setQuery(s);
                  void runSearch(s);
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </form>
      </div>

      {error && (
        <div role="alert" className="alert alert-error">
          <span>{error}</span>
        </div>
      )}

      {!loading && !error && query.trim() && results.length === 0 && (
        <div role="alert" className="alert alert-warning">
          <span>No results for “{query.trim()}”.</span>
        </div>
      )}

      {!loading && !error && results.length > 0 && (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-base-content/70">Found</span>
          <span className="badge badge-neutral">{results.length}</span>
        </div>
      )}

      {/* Loading skeletons */}
      {loading && (
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <li key={i} className="card bg-base-100 shadow-md">
              <div className="skeleton aspect-[4/3] w-full" />
              <div className="card-body gap-3">
                <div className="skeleton h-5 w-3/4" />
                <div className="skeleton h-4 w-1/2" />
                <div className="flex justify-between">
                  <div className="skeleton h-7 w-20" />
                  <div className="skeleton h-7 w-16" />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {!loading && results.length > 0 && (
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {results.map((a) => (
            <li
              key={a.id}
              className="rounded-box transition duration-200 hover:-translate-y-1 hover:shadow-xl"
            >
              <ArtworkCard artwork={a} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
