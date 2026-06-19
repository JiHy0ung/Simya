export const formatCraftTime = (seconds) => {
  if (seconds < 0) return null;
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  const parts = [];
  if (h > 0) parts.push(`${h}시간`);
  if (m > 0) parts.push(`${m}분`);
  if (s >= 0) parts.push(`${s}초`);

  return parts.join(" ");
};
