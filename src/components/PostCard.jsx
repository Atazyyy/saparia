import { useState } from "react";
import { motion } from "framer-motion";
import { Bookmark, Heart, MessageCircle, Share2 } from "lucide-react";
import { ME, userById } from "../data/seed";
import { compactNum, timeAgo } from "../utils/format";
import Avatar from "./Avatar";

const HASHTAG_SPLIT = /(#[A-Za-z0-9_]+)/g;

function ActionBtn({ active, icon: Icon, count, onClick, title, activeClass }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`group flex items-center gap-1.5 text-xs font-bold transition-colors ${
        active ? activeClass : "text-mute hover:text-ink"
      }`}
    >
      <span
        className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
          active ? "bg-accent-soft" : "group-hover:bg-raised"
        }`}
      >
        <Icon className={`h-4 w-4 ${active ? "fill-current" : ""}`} />
      </span>
      {count !== undefined && <span>{compactNum(count)}</span>}
    </button>
  );
}

export default function PostCard({
  post,
  onLike,
  onBookmark,
  onShare,
  onComment,
  onOpenProfile,
  onTag,
}) {
  const author = userById(post.authorId);
  const [openComments, setOpenComments] = useState(false);
  const [draft, setDraft] = useState("");
  const [sharedFlash, setSharedFlash] = useState(false);

  const handleShare = () => {
    onShare(post.id);
    setSharedFlash(true);
    setTimeout(() => setSharedFlash(false), 1800);
  };

  const submitComment = (e) => {
    e.preventDefault();
    if (!draft.trim()) return;
    onComment(post.id, draft);
    setDraft("");
  };

  const renderText = () =>
    post.text.split(HASHTAG_SPLIT).map((part, i) =>
      part.startsWith("#") ? (
        <button
          key={i}
          type="button"
          onClick={() => onTag(part.slice(1).toLowerCase())}
          className="font-semibold text-accent hover:text-accent-bright"
        >
          {part}
        </button>
      ) : (
        <span key={i}>{part}</span>
      )
    );

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="rounded-2xl border border-edge bg-card p-4 sm:p-5"
    >
      {/* Kepala: akun + waktu */}
      <div className="flex items-center gap-3">
        <Avatar user={author} onClick={() => onOpenProfile(author.id)} />
        <div className="min-w-0 flex-1 leading-tight">
          <div className="flex flex-wrap items-baseline gap-x-1.5">
            <button
              type="button"
              onClick={() => onOpenProfile(author.id)}
              className="truncate text-sm font-bold text-ink hover:text-accent"
            >
              {author.name}
            </button>
            {author.role && (
              <span className="hidden rounded-full bg-raised px-2 py-0.5 text-[10px] font-bold text-mute sm:inline">
                {author.role}
              </span>
            )}
          </div>
          <p className="mt-0.5 text-xs text-mute">
            @{author.username} · {timeAgo(post.ts)}
          </p>
        </div>
      </div>

      {/* Isi */}
      <p className="mt-3 whitespace-pre-wrap break-words text-[15px] leading-relaxed text-ink">
        {renderText()}
      </p>

      {/* Foto */}
      {post.photos.length === 1 && (
        <img
          src={post.photos[0]}
          alt="Lampiran postingan"
          loading="lazy"
          className="mt-3 max-h-96 w-full rounded-2xl border border-edge object-cover"
        />
      )}
      {post.photos.length >= 2 && (
        <div className="mt-3 grid grid-cols-2 gap-1.5">
          {post.photos.map((url, i) => (
            <img
              key={i}
              src={url}
              alt={`Lampiran ${i + 1}`}
              loading="lazy"
              className="aspect-[4/3] w-full rounded-xl border border-edge object-cover"
            />
          ))}
        </div>
      )}

      {/* Aksi */}
      <div className="mt-3 flex items-center gap-1 border-t border-edge pt-2.5">
        <ActionBtn
          icon={Heart}
          active={post.liked}
          activeClass="text-accent"
          count={post.likes}
          onClick={() => onLike(post.id)}
          title="Suka"
        />
        <ActionBtn
          icon={MessageCircle}
          count={post.comments.length}
          onClick={() => setOpenComments((s) => !s)}
          title="Komentar"
        />
        <ActionBtn
          icon={Share2}
          count={post.shares}
          onClick={handleShare}
          title="Bagikan"
        />
        {sharedFlash && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs font-semibold text-accent-bright"
          >
            Dibagikan!
          </motion.span>
        )}
        <div className="ml-auto">
          <ActionBtn
            icon={Bookmark}
            active={post.bookmarked}
            activeClass="text-accent"
            onClick={() => onBookmark(post.id)}
            title="Simpan"
          />
        </div>
      </div>

      {/* Komentar */}
      {openComments && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-3 space-y-3 overflow-hidden border-t border-edge pt-3"
        >
          {post.comments.length === 0 && (
            <p className="text-xs text-mute">Belum ada komentar. Jadilah yang pertama!</p>
          )}
          {post.comments.map((cm) => {
            const u = userById(cm.authorId);
            return (
              <div key={cm.id} className="flex gap-2.5">
                <Avatar user={u} size="sm" onClick={() => onOpenProfile(u.id)} />
                <div className="min-w-0 flex-1 rounded-2xl rounded-tl-sm bg-raised px-3.5 py-2.5">
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <button
                      type="button"
                      onClick={() => onOpenProfile(u.id)}
                      className="text-sm font-bold text-ink hover:text-accent"
                    >
                      {u.name}
                    </button>
                    <span className="text-[11px] text-mute">
                      @{u.username} · {timeAgo(cm.ts)}
                    </span>
                  </div>
                  <p className="mt-0.5 whitespace-pre-wrap break-words text-sm text-ink">
                    {cm.text}
                  </p>
                </div>
              </div>
            );
          })}

          <form onSubmit={submitComment} className="flex items-center gap-2">
            <Avatar user={ME} size="sm" />
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Tulis komentar…"
              className="h-10 min-w-0 flex-1 rounded-full border border-edge bg-canvas px-4 text-sm text-ink placeholder:text-mute focus:border-accent focus:outline-none"
            />
            <button
              type="submit"
              disabled={!draft.trim()}
              className="rounded-full bg-accent px-4 py-2 text-xs font-bold text-canvas transition-opacity hover:bg-accent-bright disabled:cursor-not-allowed disabled:opacity-40"
            >
              Kirim
            </button>
          </form>
        </motion.div>
      )}
    </motion.article>
  );
}
