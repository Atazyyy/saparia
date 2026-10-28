import { motion } from "framer-motion";
import { Hash, Home, X } from "lucide-react";
import { extractHashtags } from "../data/seed";
import Composer from "./Composer";
import PostCard from "./PostCard";

export default function Feed({
  me,
  posts,
  tag,
  onClearTag,
  onPost,
  onLike,
  onBookmark,
  onShare,
  onComment,
  onOpenProfile,
  onTag,
}) {
  const shown = tag
    ? posts.filter((p) => extractHashtags(p.text).includes(tag))
    : posts;

  return (
    <div className="space-y-4">
      <div>
        <h1 className="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-ink">
          <Home className="h-6 w-6 text-accent" />
          Beranda
        </h1>
        <p className="mt-1 text-sm text-mute">
          Dari akun yang kamu ikuti & topik yang sedang ramai.
        </p>
      </div>

      <Composer me={me} onPost={onPost} />

      {tag && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between gap-3 rounded-2xl border border-accent bg-accent-soft px-4 py-3"
        >
          <p className="flex items-center gap-2 text-sm font-bold text-accent-bright">
            <Hash className="h-4 w-4" />
            Menampilkan #{tag} · {shown.length} postingan
          </p>
          <button
            type="button"
            onClick={onClearTag}
            className="flex h-7 w-7 items-center justify-center rounded-full text-accent-bright transition-colors hover:bg-accent hover:text-canvas"
            title="Hapus filter hashtag"
          >
            <X className="h-4 w-4" />
          </button>
        </motion.div>
      )}

      {shown.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onLike={onLike}
          onBookmark={onBookmark}
          onShare={onShare}
          onComment={onComment}
          onOpenProfile={onOpenProfile}
          onTag={onTag}
        />
      ))}

      {shown.length === 0 && (
        <div className="rounded-2xl border border-dashed border-edge bg-card p-10 text-center">
          <Hash className="mx-auto h-8 w-8 text-mute" />
          <p className="mt-3 font-bold text-ink">Belum ada postingan #{tag}</p>
          <p className="mt-1 text-sm text-mute">
            Coba hashtag lain atau hapus filter ini.
          </p>
        </div>
      )}
    </div>
  );
}
