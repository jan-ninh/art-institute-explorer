const DEFAULT_COUNT = 6;

function getSuggestionPool(): string[] {
  return [
    "Monet",
    "Van Gogh",
    "Picasso",
    "Rembrandt",
    "Vermeer",
    "Klimt",
    "Matisse",
    "Kandinsky",
    "Warhol",
    "Hopper",
    "Cezanne",
    "Degas",
    "Manet",
    "Renoir",
    "Gauguin",
    "Chagall",
    "Turner",
    "Dali",
    "Miro",
    "Rothko",
    "Pollock",
    "O'Keeffe",
    "Hokusai",
    "Hiroshige",
    "Utamaro",
    "Basquiat",
    "Frida Kahlo",
    "Caravaggio",
    "Botticelli",
    "Raphael",
    "Michelangelo",
    "Leonardo da Vinci",
    "Durer",
    "Rubens",
    "Goya",
    "Toulouse-Lautrec",
    "Modigliani",
    "Seurat",
    "Cassatt",
    "Sargent",
    "Impressionism",
    "Surrealism",
    "Cubism",
    "Art Nouveau",
    "Ukiyo-e",
    "Portrait",
    "Self Portrait",
    "Landscape",
    "Still Life",
    "Cats",
  ];
}

function pickRandomUnique(items: readonly string[], count: number): string[] {
  const pool = [...items];

  // Fisher–Yates shuffle
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  return pool.slice(0, Math.min(count, pool.length));
}

export function getRandomQuickPicks(count = DEFAULT_COUNT): string[] {
  return pickRandomUnique(getSuggestionPool(), count);
}
