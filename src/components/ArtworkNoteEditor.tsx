import { useId, useState } from "react";
import { StickyNote } from "lucide-react";

type Props = {
  artworkTitle: string;
  note: string;
  onSave: (note: string) => void;
};

export function ArtworkNoteEditor({ artworkTitle, note, onSave }: Props) {
  const inputId = useId();
  const [draft, setDraft] = useState(note);
  const [error, setError] = useState<string | null>(null);
  const isDirty = draft.trim() !== note;

  function save(value: string) {
    const normalized = value.trim();
    try {
      onSave(normalized);
      setDraft(normalized);
      setError(null);
    } catch {
      setError("Could not save your note. Please try again.");
    }
  }

  return (
    <div className="space-y-2 border-t border-base-300/30 px-4 pb-4 pt-3">
      <label htmlFor={inputId} className="flex items-center gap-2 text-sm font-semibold">
        <StickyNote className="h-4 w-4" aria-hidden="true" />
        My note
      </label>
      <textarea
        id={inputId}
        aria-label={`Personal note for ${artworkTitle}`}
        className="textarea textarea-bordered w-full resize-y bg-base-200/40"
        rows={3}
        value={draft}
        placeholder="What do you like about this artwork?"
        onChange={(event) => {
          setDraft(event.target.value);
          setError(null);
        }}
      />
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          className="btn btn-primary btn-xs rounded-full"
          disabled={!isDirty}
          onClick={() => save(draft)}
        >
          Save note
        </button>
        {note && (
          <button
            type="button"
            className="btn btn-ghost btn-xs rounded-full"
            onClick={() => save("")}
          >
            Delete note
          </button>
        )}
        <span className="text-xs opacity-70" aria-live="polite">
          {isDirty ? "Unsaved" : note ? "Saved" : ""}
        </span>
      </div>
      {error && (
        <p role="alert" className="text-xs text-error">
          {error}
        </p>
      )}
    </div>
  );
}
