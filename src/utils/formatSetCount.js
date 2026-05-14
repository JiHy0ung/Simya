export const formatSetCount = (count) => {
  if (!count || count <= 0) return "0개";

  const set = Math.floor(count / 64);
  const remain = count % 64;

  if (set > 0 && remain > 0) {
    return `${set}세트 ${remain}개`;
  }

  if (set > 0) {
    return `${set}세트`;
  }

  return `${remain}개`;
};
