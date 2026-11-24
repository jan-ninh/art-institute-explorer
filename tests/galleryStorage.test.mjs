import { beforeEach, test } from "node:test";
import assert from "node:assert/strict";
import {
  addToGallery,
  getGallery,
  removeFromGallery,
  updateGalleryNote,
} from "../src/storage/galleryStorage.ts";

const key = "aic-gallery-v1";
const first = { id: 1, title: "First", artist_title: "Artist", image_id: null };
const second = { ...first, id: 2, title: "Second" };
let data;

beforeEach(() => {
  data = new Map();
  Object.defineProperty(globalThis, "window", { value: {}, configurable: true });
  Object.defineProperty(globalThis, "localStorage", {
    value: {
      getItem: (name) => data.get(name) ?? null,
      setItem: (name, value) => data.set(name, value),
    },
    configurable: true,
  });
});

test("legacy gallery entries survive and have an empty note", () => {
  localStorage.setItem(key, JSON.stringify([first]));
  assert.deepEqual(getGallery(), [{ ...first, note: "" }]);
  assert.equal(updateGalleryNote(first.id, "New note")[0].note, "New note");
});

test("creating and editing a note preserves other artworks and survives storage reads", () => {
  addToGallery(first);
  addToGallery(second);
  updateGalleryNote(1, "  First note  ");
  updateGalleryNote(2, "Other note");
  updateGalleryNote(1, "Edited\nnote");
  assert.deepEqual(getGallery(), [
    { ...second, note: "Other note" },
    { ...first, note: "Edited\nnote" },
  ]);
  assert.deepEqual(JSON.parse(localStorage.getItem(key)), getGallery());
});

test("duplicate additions do not erase notes", () => {
  addToGallery(first);
  updateGalleryNote(1, "Keep me");
  addToGallery(first);
  assert.deepEqual(getGallery(), [{ ...first, note: "Keep me" }]);
});

test("deleting only the note keeps the artwork; removing the artwork removes the note", () => {
  addToGallery(first);
  updateGalleryNote(1, "Note");
  updateGalleryNote(1, "");
  assert.deepEqual(getGallery(), [{ ...first, note: "" }]);
  updateGalleryNote(1, "Another note");
  removeFromGallery(1);
  assert.deepEqual(getGallery(), []);
  addToGallery(first);
  assert.deepEqual(getGallery(), [{ ...first, note: "" }]);
});

test("malformed notes do not discard valid artworks", () => {
  localStorage.setItem(key, JSON.stringify([{ ...first, note: 42 }, { ...second, note: "Keep" }]));
  assert.deepEqual(getGallery(), [{ ...first, note: "" }, { ...second, note: "Keep" }]);
});

test("updating a missing artwork leaves stored data untouched", () => {
  addToGallery(first);
  const before = localStorage.getItem(key);
  assert.throws(() => updateGalleryNote(999, "No artwork"));
  assert.equal(localStorage.getItem(key), before);
});

test("storage write failure propagates instead of reporting a successful save", () => {
  addToGallery(first);
  localStorage.setItem = () => { throw new Error("Storage full"); };
  assert.throws(() => updateGalleryNote(1, "Not saved"), /Storage full/);
  assert.equal(getGallery()[0].note, "");
});
