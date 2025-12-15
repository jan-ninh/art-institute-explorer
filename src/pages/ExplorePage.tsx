import { SearchSection } from "../components/SearchSection";

export function ExplorePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold">Explore</h2>
          <p className="text-sm opacity-70">
            Try artists, motifs, styles… “monet”, “cats”, “impressionism”.
          </p>
        </div>
        <div className="badge badge-outline">AIC Search</div>
      </div>

      <SearchSection />
    </div>
  );
}
