export const num = (n) => n.toLocaleString("id-ID");

// 1240 → "1,2 rb" (gaya label media sosial)
export const compactNum = (n) => {
  if (n >= 1000) {
    const v = (n / 1000).toFixed(1).replace(".", ",");
    return `${v.endsWith(",0") ? v.slice(0, -2) : v} rb`;
  }
  return String(n);
};

export const timeAgo = (ts) => {
  const diff = Math.max(0, Date.now() - new Date(ts).getTime());
  const min = Math.floor(diff / 60000);
  if (min < 1) return "baru saja";
  if (min < 60) return `${min} mnt`;
  const hour = Math.floor(min / 60);
  if (hour < 24) return `${hour} jam`;
  const day = Math.floor(hour / 24);
  if (day < 7) return `${day} hari`;
  const week = Math.floor(day / 7);
  if (week < 5) return `${week} pekan`;
  const month = Math.floor(day / 30);
  return `${month} bln`;
};

export const fmtDate = (ts) =>
  new Date(ts).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
