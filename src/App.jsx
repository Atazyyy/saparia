import { useState } from "react";
import { ME } from "./data/seed";
import { useSaparia } from "./hooks/useSaparia";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Feed from "./components/Feed";
import RightSidebar from "./components/RightSidebar";
import Profile from "./components/Profile";

export default function App() {
  const store = useSaparia();
  const [view, setView] = useState({ name: "feed" });
  const [tag, setTag] = useState(null);

  const navigate = (v) => {
    setView(v);
    window.scrollTo({ top: 0 });
  };

  const goFeed = () => navigate({ name: "feed" });
  const goMyProfile = () => navigate({ name: "profile", userId: ME.id });
  const openProfile = (userId) => navigate({ name: "profile", userId });
  const openTag = (t) => {
    setTag(t);
    navigate({ name: "feed" });
  };

  const postActions = {
    onLike: store.toggleLike,
    onBookmark: store.toggleBookmark,
    onShare: store.sharePost,
    onComment: store.addComment,
    onOpenProfile: openProfile,
    onTag: openTag,
  };

  return (
    <div className="flex min-h-screen flex-col bg-canvas font-sans text-ink antialiased">
      <Navbar view={view} onHome={goFeed} onMyProfile={goMyProfile} />
      <main className="flex-1 pb-20 sm:pb-0">
        <div className="mx-auto max-w-6xl px-4 py-6 md:px-8">
          {view.name === "feed" ? (
            <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
              <Feed
                me={ME}
                posts={store.posts}
                tag={tag}
                onClearTag={() => setTag(null)}
                onPost={store.addPost}
                {...postActions}
              />
              <RightSidebar
                posts={store.posts}
                follows={store.follows}
                isFollowing={store.isFollowing}
                toggleFollow={store.toggleFollow}
                postsByUser={store.postsByUser}
                onOpenProfile={openProfile}
                onTag={openTag}
                onMyProfile={goMyProfile}
              />
            </div>
          ) : (
            <Profile
              userId={view.userId}
              me={ME}
              posts={store.posts}
              follows={store.follows}
              isFollowing={store.isFollowing}
              toggleFollow={store.toggleFollow}
              onBack={goFeed}
              {...postActions}
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
