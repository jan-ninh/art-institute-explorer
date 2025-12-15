type FooterProps = {
  year?: number;
};

export function Footer({ year = new Date().getFullYear() }: FooterProps) {
  return (
    <footer className="mt-10 text-center font-meta text-[11px] font-medium uppercase tracking-[0.22em] text-base-content/55 sm:text-xs">
      {year} © Jan Ninh • Art Institute of Chicago API
    </footer>
  );
}
