import { Calendar, Hash, Sparkles, TrendingUp, UserRound } from "lucide-react";
import { ME, USERS, trendingHashtags } from "../data/seed";
import { compactNum } from "../utils/format";
import Avatar from "./Avatar";

export default function RightSidebar({
  posts,
  follows,
  isFollowing,
  toggleFollow,
  postsByUser,
  onOpenProfile,
  onTag,
  onMyProfile,
}) {
  const myPosts = postsByUser(ME.id);
  const suggestions = USERS.filter((u) => !isFollowing(u.id));
  const trends = trendingHashtags(posts);

  return (
    <aside className="space-y-4 self-start lg:sticky lg:top-20">
      {/* Kartu profil saya */}
      <div className="rounded-2xl border border-edge bg-card p-5">
        <div className="flex items-center gap-3">
          <Avatar user={ME} size="lg" />
          <div className="min-w-0 leading-tight">
            <p className="truncate font-extrabold text-ink">{ME.name}</p>
            <p className="text-xs text-mute">@{ME.username}</p>
          </div>
        </div>
        <p className="mt-3 line-clamp-3 text-sm text-mute">{ME.bio}</p>
        <div className="mt-3 grid grid-cols-3 gap-2 rounded-xl bg-raised p-3 text-center">
          <div>
            <p className="text-lg font-extrabold text-ink">{myPosts.length}</p>
            <p className="text-[11px] font-semibold text-mute">Postingan</p>
          </div>
          <div>
            <p className="text-lg font-extrabold text-ink">
              {compactNum(ME.followingBase + follows.length)}
            </p>
            <p className="text-[11px] font-semibold text-mute">Mengikuti</p>
          </div>
          <div>
            <p className="text-lg font-extrabold text-ink">
              {compactNum(ME.followers)}
            </p>
            <p className="text-[11px] font-semibold text-mute">Pengikut</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onMyProfile}
          className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-accent px-4 py-2 text-sm font-bold text-accent transition-colors hover:bg-accent hover:text-canvas"
        >
          <UserRound className="h-4 w-4" />
          Lihat profil saya
        </button>
      </div>

      {/* Saran akun */}
      <div className="rounded-2xl border border-edge bg-card p-5">
        <h2 className="flex items-center gap-1.5 text-sm font-extrabold text-ink">
          <Sparkles className="h-4 w-4 text-accent" />
          Saran untukmu
        </h2>
        <div className="mt-3 space-y-3">
          {suggestions.map((u) => (
            <div key={u.id} className="flex items-center gap-2.5">
              <Avatar user={u} size="sm" onClick={() => onOpenProfile(u.id)} />
              <div className="min-w-0 flex-1 leading-tight">
                <button
                  type="button"
                  onClick={() => onOpenProfile(u.id)}
                  className="block w-full truncate text-left text-sm font-bold text-ink hover:text-accent"
                >
                  {u.name}
                </button>
                <p className="truncate text-xs text-mute">@{u.username}</p>
              </div>
              <button
                type="button"
                onClick={() => toggleFollow(u.id)}
                className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors ${
                  isFollowing(u.id)
                    ? "border border-edge text-ink hover:border-accent hover:text-accent"
                    : "bg-accent text-canvas hover:bg-accent-bright"
                }`}
              >
                {isFollowing(u.id) ? "Mengikuti" : "Ikuti"}
              </button>
            </div>
          ))}
          {suggestions.length === 0 && (
            <p className="text-xs text-mute">
              Kamu sudah mengikuti semua akun di demo ini. Mantap!
            </p>
          )}
        </div>
      </div>

      {/* Trending hashtag */}
      <div className="rounded-2xl border border-edge bg-card p-5">
        <h2 className="flex items-center gap-1.5 text-sm font-extrabold text-ink">
          <TrendingUp className="h-4 w-4 text-accent" />
          Sedang tren
        </h2>
        <ol className="mt-3 space-y-1">
          {trends.map((t, i) => (
            <li key={t.tag}>
              <button
                type="button"
                onClick={() => onTag(t.tag)}
                className="group flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition-colors hover:bg-raised"
              >
                <span className="w-4 text-sm font-extrabold text-mute">
                  {i + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-1 truncate text-sm font-bold text-ink group-hover:text-accent">
                    <Hash className="h-3.5 w-3.5 text-accent" />
                    {t.tag}
                  </span>
                  <span className="text-[11px] text-mute">
                    {t.count} postingan
                  </span>
                </span>
              </button>
            </li>
          ))}
          {trends.length === 0 && (
            <li className="flex items-center gap-2 px-2 text-xs text-mute">
              <Hash className="h-3.5 w-3.5" />
              Belum ada hashtag.
            </li>
          )}
        </ol>
        <p className="mt-3 flex items-center gap-1.5 border-t border-edge pt-3 text-[11px] text-mute">
          <Calendar className="h-3.5 w-3.5" />
          Dihitung otomatis dari semua postingan feed.
        </p>
      </div>
    </aside>
  );
}
