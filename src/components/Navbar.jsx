import { Home, MessageCircle, MessagesSquare, UserRound } from "lucide-react";
import { WA_NUMBER } from "../data/seed";

export const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
  "Halo Saparia! Saya mau tanya lebih lanjut."
)}`;

export default function Navbar({ view, onHome, onMyProfile }) {
  const active = view.name === "profile" && view.userId === "me" ? "profile" : "feed";

  const items = [
    { id: "feed", label: "Beranda", icon: Home, onClick: onHome },
    { id: "profile", label: "Profil Saya", icon: UserRound, onClick: onMyProfile },
  ];

  return (
    <>
      {/* Bar atas */}
      <header className="sticky top-0 z-30 border-b border-edge bg-card/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 md:px-8">
          <button
            onClick={onHome}
            className="flex items-center gap-2.5"
            title="Ke beranda"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent">
              <MessagesSquare className="h-5 w-5 text-canvas" />
            </div>
            <span className="text-lg font-extrabold tracking-tight text-ink">
              Saparia<span className="text-accent">.</span>
            </span>
          </button>

          <div className="flex items-center gap-2">
            <nav className="hidden items-center gap-1 rounded-full bg-raised p-1 sm:flex">
              {items.map((n) => (
                <button
                  key={n.id}
                  onClick={n.onClick}
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    active === n.id
                      ? "bg-accent text-canvas shadow-sm"
                      : "text-mute hover:text-ink"
                  }`}
                >
                  <n.icon className="h-4 w-4" />
                  {n.label}
                </button>
              ))}
            </nav>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-1.5 rounded-full border border-edge px-4 py-2 text-sm font-bold text-accent-bright transition-colors hover:border-accent hover:bg-accent-soft md:inline-flex"
            >
              <MessageCircle className="h-4 w-4" />
              62812-3456-7890
            </a>
          </div>
        </div>
      </header>

      {/* Tab bawah mobile */}
      <nav className="fixed inset-x-0 bottom-0 z-30 flex border-t border-edge bg-card/95 backdrop-blur sm:hidden">
        {items.map((n) => (
          <button
            key={n.id}
            onClick={n.onClick}
            className={`flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[11px] font-bold ${
              active === n.id ? "text-accent" : "text-mute"
            }`}
          >
            <n.icon className="h-5 w-5" />
            {n.label}
          </button>
        ))}
      </nav>
    </>
  );
}
