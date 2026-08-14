# Art Institute Explorer

A React and TypeScript application for exploring artworks from the **Art Institute of Chicago collection**.

The project focuses on external API integration, runtime data validation with Zod, typed frontend development and local persistence.

### [▶ Open the live demo](https://art-institute-explorer-sul8.onrender.com/)

---

## Key Features

- search artworks from the Art Institute of Chicago collection
- display artwork titles, artists and images
- randomized quick-pick search suggestions
- loading, error and empty-result states
- save artworks to a personal gallery
- prevent duplicate gallery entries
- remove saved artworks
- persist the gallery with `localStorage`
- dedicated Explore and Gallery routes
- responsive artwork grid and UI

---

## Tech Stack

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS
- daisyUI
- Zod
- Art Institute of Chicago API
- localStorage
- Lucide React
- ESLint

---

## API Integration

Artwork data is fetched from the **Art Institute of Chicago Search API**.

The application requests only the fields it needs for the UI:

- artwork ID
- title
- artist
- image ID

Instead of assuming that external API data matches the expected TypeScript structure, the response is validated at runtime with **Zod** before it is used by the application.

Invalid API responses result in an error rather than being passed directly into the UI.

Artwork images are loaded through the Art Institute of Chicago's IIIF image service.

---

## Type Safety & Validation

The project uses a Zod schema as the central definition for artwork data.

The schema handles API values such as missing titles, artists or image IDs and normalizes them before the data reaches the UI.

The TypeScript `Artwork` type is inferred directly from the Zod schema:

```ts
export type Artwork = z.infer<typeof ArtworkSchema>;
```

This keeps runtime validation and TypeScript types based on the same data definition.

---

## Gallery & Persistence

Users can save artworks from search results to a personal gallery.

The gallery is stored in `localStorage`, so saved artworks remain available after a page reload.

The persistence layer is kept separate from the UI and provides dedicated functions for:

- loading the gallery
- saving the gallery
- adding artworks
- removing artworks

Stored data is also validated with Zod when it is read from `localStorage`.

Duplicate artworks are prevented by checking their artwork ID before adding them to the gallery.

---

## Application Structure

The project separates different responsibilities into dedicated areas:

- `api` – communication with the external API
- `schemas` – Zod schemas and TypeScript types
- `storage` – local gallery persistence
- `components` – reusable UI components
- `pages` – Explore and Gallery views
- `functions` – supporting application logic

React Router provides separate routes for the artwork search and the saved gallery.

---

## Project Context

Art Institute Explorer was developed as a **solo project in the WBS Coding School course context**.

The project was especially useful for practicing the interaction between several frontend concerns:

- React component structure
- TypeScript
- external API fetching
- runtime validation
- schema-derived types
- error and loading states
- client-side persistence
- separation of API, data and UI responsibilities

Compared with my other portfolio projects, its main focus is on **typed API integration and validation of external data**.

---

## Running Locally

Clone the repository and install the dependencies:

```bash
git clone https://github.com/jan-ninh/art-institute-explorer.git
cd art-institute-explorer
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build with:

```bash
npm run build
```
