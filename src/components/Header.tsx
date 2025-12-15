export function Header() {
  return (
    <header className="mb-6 rounded-box bg-base-200 p-6 shadow">
      <h1 className="text-4xl font-bold leading-tight tracking-tight">
        <span className="block">Art Institute of Chicago</span>
        <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Curator&apos;s Lens
        </span>
      </h1>

      <p className="mt-2 text-sm opacity-70">
        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Search the collection and open artworks in full IIIF quality.
        </span>
      </p>
    </header>
  );
}
