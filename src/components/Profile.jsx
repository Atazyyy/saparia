import { motion } from "framer-motion";
import {
  ArrowLeft,
  BadgeCheck,
  Calendar,
  MapPin,
  StickyNote,
  UserPlus,
  UserRound,
  UserX,
} from "lucide-react";
import { ME, userById } from "../data/seed";
import { compactNum } from "../utils/format";
import Avatar from "./Avatar";
import PostCard from "./PostCard";

export default function Profile({
  userId,
  me,
  posts,
  follows,
  isFollowing,
  toggleFollow,
  onBack,
  onLike,
  onBookmark,
  onShare,
  onComment,
  onOpenProfile,
  onTag,
}) {
  const user = userById(userId);
  const isMe = user.id === me.id;
  const userPosts = posts.filter((p) => p.authorId === userId);

  const followers = isMe
    ? me.followers
    : user.followers + (isFollowing(user.id) ? 1 : 0);
  const following = isMe ? me.followingBase + follows.length : user.following;

  return (
    <div className="space-y-5">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-sm font-bold text-mute transition-colors hover:text-accent"
      >
        <ArrowLeft className="h-4 w-4" />
        Kembali ke beranda
      </button>

      {/* Kartu profil */}
      <div className="overflow-hidden rounded-2xl border border-edge bg-card">
        <div className="relative h-32 bg-gradient-to-r from-accent-soft via-raised to-accent-soft sm:h-40">
          <div className="absolute -right-10 -top-16 h-48 w-48 rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute -left-8 bottom-0 h-32 w-32 rounded-full bg-accent/10 blur-3xl" />
        </div>

        <div className="px-5 pb-5">
          <div className="-mt-12 flex items-end justify-between gap-3">
            <div className="rounded-full ring-4 ring-card">
              <Avatar user={user} size="xl" />
            </div>
            {isMe ? (
              <span className="mb-1 inline-flex items-center gap-1.5 rounded-full border border-accent px-4 py-2 text-sm font-bold text-accent">
                <StickyNote className="h-4 w-4" />
                Profil kamu
              </span>
            ) : (
              <button
                type="button"
                onClick={() => toggleFollow(user.id)}
                className={`mb-1 inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-sm font-bold transition-colors ${
                  isFollowing(user.id)
                    ? "border border-edge text-ink hover:border-accent hover:text-accent"
                    : "bg-accent text-canvas hover:bg-accent-bright"
                }`}
              >
                {isFollowing(user.id) ? (
                  <>
                    <UserX className="h-4 w-4" />
                    Mengikuti
                  </>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4" />
                    Ikuti
                  </>
                )}
              </button>
            )}
          </div>

          <div className="mt-3">
            <h1 className="flex flex-wrap items-center gap-2 text-xl font-extrabold tracking-tight text-ink">
              {user.name}
              <span className="inline-flex items-center gap-1 rounded-full bg-accent-soft px-2.5 py-0.5 text-[11px] font-bold text-accent-bright">
                <BadgeCheck className="h-3.5 w-3.5" />
                {user.role}
              </span>
            </h1>
            <p className="mt-0.5 text-sm text-mute">@{user.username}</p>
          </div>

          <p className="mt-3 text-sm leading-relaxed text-ink">{user.bio}</p>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-mute">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              {user.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              Bergabung {user.joined}
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 border-t border-edge pt-4 text-sm">
            <span className="text-mute">
              <b className="text-ink">{userPosts.length}</b> Postingan
            </span>
            <span className="text-mute">
              <b className="text-ink">{compactNum(followers)}</b> Pengikut
            </span>
            <span className="text-mute">
              <b className="text-ink">{compactNum(following)}</b> Mengikuti
            </span>
          </div>
        </div>
      </div>

      {/* Daftar postingan */}
      <div>
        <h2 className="mb-3 flex items-center gap-2 text-lg font-extrabold text-ink">
          <UserRound className="h-5 w-5 text-accent" />
          Postingan {isMe ? "saya" : user.name.split(" ")[0]}
        </h2>

        {userPosts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-edge bg-card p-10 text-center">
            <StickyNote className="mx-auto h-8 w-8 text-mute" />
            <p className="mt-3 font-bold text-ink">Belum ada postingan</p>
            <p className="mt-1 text-sm text-mute">
              {isMe
                ? "Tulis postingan pertamamu dari beranda."
                : "Akun ini belum membagikan apa pun."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {userPosts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
              >
                <PostCard
                  post={post}
                  onLike={onLike}
                  onBookmark={onBookmark}
                  onShare={onShare}
                  onComment={onComment}
                  onOpenProfile={onOpenProfile}
                  onTag={onTag}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
