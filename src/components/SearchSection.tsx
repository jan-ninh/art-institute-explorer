import { type FormEvent, useState } from "react";
import { searchArtworks } from "../api/aic";
import type { Artwork } from "../schemas/artwork.schema";
import { ArtworkCard } from "./ArtworkCard";
import { addToGallery, getGallery } from "../storage/galleryStorage";
import { getRandomQuickPicks } from "../functions/getRandomQuickPicks";

//----------------------------------------------------------------------------
// function: SearchSection ---------------------------------------------------
//----------------------------------------------------------------------------
export function SearchSection() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Button-Status ("Saved")
  const [galleryIds, setGalleryIds] = useState<Set<number>>(
    () => new Set(getGallery().map((a) => a.id))
  );

  // Bei jedem Mount: neue zufällige Quick Picks
  const NUMBER_QUICK_PICKS = 5;
  const [suggestions, setSuggestions] = useState<string[]>(() =>
    getRandomQuickPicks(NUMBER_QUICK_PICKS)
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

  function handleAdd(artwork: Artwork) {
    const next = addToGallery(artwork);
    setGalleryIds(new Set(next.map((a) => a.id)));
  }

  function clearAll() {
    setQuery("");
    setResults([]);
    setError(null);
    setSuggestions(getRandomQuickPicks(NUMBER_QUICK_PICKS));
  }

  //-----------------------------------------------------------------------
  // return ---------------------------------------------------------------
  //-----------------------------------------------------------------------
  return (
    <section className="space-y-6">
      {/* "Poster" */}
      <div className="relative overflow-hidden rounded-[2rem] border border-base-300/30 bg-base-100/50 p-6 shadow-xl backdrop-blur">
        {/* Orbs */}
        <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-primary/25 blur-3xl" />
        <div className="pointer-events-none absolute -right-28 -bottom-28 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />
        <div className="pointer-events-none absolute left-1/2 top-10 h-56 w-56 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          {/* LEFT: title block */}
          <div className="text-center lg:text-left">
            <div className="flex flex-wrap items-center justify-center gap-2 lg:justify-start">
              <span className="badge badge-outline">Explore</span>
              <span className="badge badge-ghost">AIC • IIIF ready</span>
              {results.length > 0 && !loading && !error && (
                <span className="badge badge-neutral">
                  {results.length} found
                </span>
              )}
            </div>

            <h1 className="mt-3 text-3xl font-black leading-none tracking-tight sm:text-4xl">
              <span className="block">Build a tiny museum</span>
              <span className="block pb-[0.12em] bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                from a single search.
              </span>
            </h1>

            <p className="mt-3 mx-auto max-w-[44ch] lg:mx-0 lg:max-w-[52ch] text-sm opacity-70 sm:text-base text-balance">
              Discover artists, movements, and motifs. View in IIIF quality.
              Curate your own gallery!
            </p>
          </div>

          {/* RIGHT: search form */}
          <form onSubmit={onSubmit} className="space-y-3">
            <div className="join w-full">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="input input-bordered input-lg join-item w-full bg-base-200/40"
                aria-label="Search artworks"
              />
              <button
                type="submit"
                disabled={!canSearch}
                className="btn btn-primary btn-lg join-item"
                title="Search"
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm" />
                    Searching…
                  </>
                ) : (
                  <>
                    Search{" "}
                    <span className="hidden sm:inline opacity-80">↵</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 flex-1 items-center gap-2">
                <span className="shrink-0 text-xs opacity-60">
                  Quick picks:
                </span>

                <div
                  className={[
                    "flex min-w-0 flex-1 items-center gap-2",
                    "overflow-x-auto whitespace-nowrap",
                    "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
                  ].join(" ")}
                >
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      className="btn btn-xs shrink-0 rounded-full border border-base-300/40 bg-base-100/40 backdrop-blur hover:shadow"
                      onClick={() => {
                        setQuery(s);
                        void runSearch(s);
                      }}
                      title={s}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                className="btn btn-ghost btn-sm shrink-0 rounded-full"
                onClick={clearAll}
                disabled={loading && query.trim().length > 0}
                title="Clear search"
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>

      {error && (
        <div className="rounded-[1.25rem] border border-error/30 bg-error/10 p-4">
          <div role="alert" className="alert alert-error">
            <span>{error}</span>
          </div>
        </div>
      )}

      {!loading && !error && query.trim() && results.length === 0 && (
        <div className="rounded-[1.25rem] border border-warning/30 bg-warning/10 p-4">
          <div role="alert" className="alert alert-warning">
            <span>No results for “{query.trim()}”.</span>
          </div>
        </div>
      )}

      {/* Loading skeletons */}
      {loading && (
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <li
              key={i}
              className="overflow-hidden rounded-[1.25rem] border border-base-300/30 bg-base-100/50 shadow-lg"
            >
              <div className="skeleton aspect-[4/3] w-full" />
              <div className="p-4 space-y-3">
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
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((a) => {
            const isSaved = galleryIds.has(a.id);

            return (
              <li key={a.id}>
                <ArtworkCard
                  artwork={a}
                  actions={
                    <button
                      className={[
                        "btn",
                        "btn-sm",
                        "rounded-full",
                        isSaved ? "btn-outline" : "btn-secondary",
                      ].join(" ")}
                      disabled={isSaved}
                      onClick={() => handleAdd(a)}
                      title={isSaved ? "Already saved" : "Add to Gallery"}
                    >
                      {isSaved ? "Saved" : "Add"}
                    </button>
                  }
                />
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
