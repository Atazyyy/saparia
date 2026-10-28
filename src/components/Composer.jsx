import { useState } from "react";
import { ImagePlus, Send, X } from "lucide-react";
import { PICKER_PHOTOS } from "../data/seed";
import Avatar from "./Avatar";

const MAX_CHARS = 280;

export default function Composer({ me, onPost }) {
  const [text, setText] = useState("");
  const [photo, setPhoto] = useState(null);
  const [showPicker, setShowPicker] = useState(false);

  const over = text.length > MAX_CHARS;
  const canPost = text.trim().length > 0 && !over;

  const submit = (e) => {
    e.preventDefault();
    if (!canPost) return;
    onPost(text, photo);
    setText("");
    setPhoto(null);
    setShowPicker(false);
  };

  const counterTone = over
    ? "text-red-400"
    : text.length > MAX_CHARS - 40
      ? "text-accent"
      : "text-mute";

  return (
    <form
      onSubmit={submit}
      className="rounded-2xl border border-edge bg-card p-4 sm:p-5"
    >
      <div className="flex gap-3">
        <Avatar user={me} />
        <div className="min-w-0 flex-1">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={2}
            placeholder="Bagikan pikiranmu hari ini…"
            className="w-full resize-none bg-transparent text-[15px] leading-relaxed text-ink placeholder:text-mute focus:outline-none"
          />

          {/* Lampiran foto terpilih */}
          {photo && (
            <div className="relative mt-2 inline-block">
              <img
                src={photo}
                alt="Lampiran"
                className="h-28 w-44 rounded-xl border border-edge object-cover"
              />
              <button
                type="button"
                onClick={() => setPhoto(null)}
                className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-raised text-ink ring-1 ring-edge transition-colors hover:bg-accent hover:text-canvas"
                title="Hapus foto"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          {/* Pilihan foto dari galeri demo */}
          {showPicker && (
            <div className="mt-3 rounded-xl border border-edge bg-raised p-3">
              <p className="mb-2 text-xs font-semibold text-mute">
                Pilih foto dari galeri demo (maks. 1 foto):
              </p>
              <div className="flex flex-wrap gap-2">
                {PICKER_PHOTOS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPhoto(photo === p.url ? null : p.url)}
                    title={p.label}
                    className={`overflow-hidden rounded-lg border-2 transition-colors ${
                      photo === p.url
                        ? "border-accent"
                        : "border-transparent hover:border-edge"
                    }`}
                  >
                    <img
                      src={p.url}
                      alt={p.label}
                      loading="lazy"
                      className="h-16 w-24 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowPicker((s) => !s)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-colors ${
                  showPicker
                    ? "bg-accent-soft text-accent-bright"
                    : "bg-raised text-mute hover:text-accent"
                }`}
              >
                <ImagePlus className="h-4 w-4" />
                Foto
              </button>
              <span className={`text-xs font-semibold ${counterTone}`}>
                {text.length}/{MAX_CHARS}
              </span>
            </div>
            <button
              type="submit"
              disabled={!canPost}
              className="inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2 text-sm font-bold text-canvas transition-opacity hover:bg-accent-bright disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Send className="h-4 w-4" />
              Posting
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
