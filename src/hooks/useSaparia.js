import { useEffect, useMemo, useState } from "react";
import { ME, SEED_POSTS, SEED_FOLLOWS } from "../data/seed";

const POSTS_KEY = "saparia:posts-v1";
const FOLLOWS_KEY = "saparia:follows-v1";

let _seq = 0;
const uid = (prefix) => `${prefix}${Date.now().toString(36)}-${++_seq}`;

function loadPosts() {
  try {
    const raw = JSON.parse(localStorage.getItem(POSTS_KEY) || "null");
    if (Array.isArray(raw) && raw.length > 0) return raw;
  } catch {
    /* abaikan data rusak */
  }
  return SEED_POSTS;
}

function loadFollows() {
  try {
    const raw = JSON.parse(localStorage.getItem(FOLLOWS_KEY) || "null");
    if (Array.isArray(raw)) return raw;
  } catch {
    /* abaikan data rusak */
  }
  return SEED_FOLLOWS;
}

// State terpusat Saparia: postingan (like/komentar/bookmark/share/compose)
// dan daftar akun yang diikuti — semuanya persist di localStorage.
export function useSaparia() {
  const [posts, setPosts] = useState(loadPosts);
  const [follows, setFollows] = useState(loadFollows);

  useEffect(() => {
    localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem(FOLLOWS_KEY, JSON.stringify(follows));
  }, [follows]);

  const patchPost = (id, fn) =>
    setPosts((list) => list.map((p) => (p.id === id ? fn(p) : p)));

  const toggleLike = (id) =>
    patchPost(id, (p) => ({
      ...p,
      liked: !p.liked,
      likes: p.likes + (p.liked ? -1 : 1),
    }));

  const toggleBookmark = (id) =>
    patchPost(id, (p) => ({ ...p, bookmarked: !p.bookmarked }));

  const sharePost = (id) =>
    patchPost(id, (p) => ({ ...p, shares: p.shares + 1 }));

  const addComment = (id, text) => {
    const clean = String(text || "").trim();
    if (!clean) return;
    patchPost(id, (p) => ({
      ...p,
      comments: [
        ...p.comments,
        { id: uid("c"), authorId: ME.id, ts: Date.now(), text: clean },
      ],
    }));
  };

  const addPost = (text, photo) => {
    const clean = String(text || "").trim();
    if (!clean) return null;
    const post = {
      id: uid("p"),
      authorId: ME.id,
      ts: Date.now(),
      text: clean,
      photos: photo ? [photo] : [],
      likes: 0,
      liked: false,
      bookmarked: false,
      shares: 0,
      comments: [],
    };
    setPosts((list) => [post, ...list]);
    return post;
  };

  const toggleFollow = (userId) =>
    setFollows((list) =>
      list.includes(userId)
        ? list.filter((id) => id !== userId)
        : [...list, userId]
    );

  const isFollowing = (userId) => follows.includes(userId);

  // Hashtag yang sedang dipakai semua postingan (untuk kartu profil & filter)
  const postsByUser = useMemo(
    () => (userId) => posts.filter((p) => p.authorId === userId),
    [posts]
  );

  return {
    posts,
    follows,
    isFollowing,
    toggleLike,
    toggleBookmark,
    sharePost,
    addComment,
    addPost,
    toggleFollow,
    postsByUser,
  };
}
