import { npcData } from "../constants/npc";

const MAX_HEARTS = 5;

export const loadHearts = () => {
  try {
    return JSON.parse(localStorage.getItem("npc_hearts") || "{}");
  } catch {
    return {};
  }
};

// 호감도 Max인 NPC 수
export const getMaxHeartCount = () => {
  const hearts = loadHearts();
  return npcData.filter((npc) => (hearts[npc.name] ?? 0) >= MAX_HEARTS).length;
};

// 호감도 보너스 %
export const getHeartBonus = () => {
  const count = getMaxHeartCount();
  if (count >= 14) return 15;
  if (count >= 10) return 10;
  if (count >= 6) return 7;
  if (count >= 3) return 5;
  return 0;
};

// 모든 NPC 하트가 입력되었는지 확인
export const hasAllHearts = () => {
  const hearts = loadHearts();
  return npcData.every((npc) => (hearts[npc.name] ?? 0) > 0);
};
