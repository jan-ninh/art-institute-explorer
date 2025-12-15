import { type FormEvent, useState } from "react";
import { searchArtworks } from "../api/aic";
import type { Artwork } from "../schemas/artwork.schema";

export function SearchSection() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //-----------------------------------------------------------------------
  // function: onSubmit ---------------------------------------------------
  //-----------------------------------------------------------------------
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
    <section className="mt-4">
      <form onSubmit={onSubmit} className="flex gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search artworks (e.g. picasso, cats)..."
          className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:ring-zinc-800"
        />

        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          {loading ? "Searching…" : "Search"}
        </button>
      </form>

      {error && (
        <p className="mt-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-200">
          {error}
        </p>
      )}

      {!loading && !error && results.length > 0 && (
        <p className="mt-4 text-sm text-zinc-700 dark:text-zinc-300">
          Found: <span className="font-semibold">{results.length}</span>
        </p>
      )}

      <ul className="mt-3 grid gap-2">
        {results.map((a) => (
          <li
            key={a.id}
            className="rounded-md border border-zinc-200 bg-white p-3 text-sm dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="font-semibold">{a.title}</div>
            <div className="text-zinc-600 dark:text-zinc-400">
              {a.artist_title}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
