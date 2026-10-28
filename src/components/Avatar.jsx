export default function Avatar({ user, size = "md", onClick }) {
  const sizes = {
    xs: "h-7 w-7",
    sm: "h-9 w-9",
    md: "h-11 w-11",
    lg: "h-14 w-14",
    xl: "h-24 w-24",
  };

  const img = (
    <img
      src={user.avatar}
      alt={user.name}
      loading="lazy"
      className={`${sizes[size]} shrink-0 rounded-full border border-edge object-cover`}
    />
  );

  if (!onClick) return img;

  return (
    <button
      type="button"
      onClick={onClick}
      className="shrink-0 rounded-full transition-opacity hover:opacity-80"
      title={`Lihat profil ${user.name}`}
    >
      {img}
    </button>
  );
}
