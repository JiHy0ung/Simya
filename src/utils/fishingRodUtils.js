import {
  FISHING_RODS,
  FISH_PRICE_BY_SIZE_GRADE,
  FISH_DECOMP_COUNT,
  GRADES,
  SIZES,
} from "../constants/fishingRod/fishingRod";

const FISH_ROD_KEY = "fish_rod_settings";

export const FALLBACK_FISH_MEAT_PRICE = { 소형: 298.2, 중형: 460.1, 대형: 638.9 };

export function calculateExpectedFishMeatPrice(rodName) {
  const rod = FISHING_RODS.find((r) => r.name === rodName);
  if (!rod) return null;

  const result = {};
  for (const size of SIZES) {
    let numerator = 0;
    let denominator = 0;
    for (const grade of GRADES) {
      const p = rod.probs[grade] ?? 0;
      numerator += p * FISH_PRICE_BY_SIZE_GRADE[size][grade];
      denominator += p * FISH_DECOMP_COUNT[grade];
    }
    result[size] = denominator > 0 ? Math.round((numerator / denominator) * 10) / 10 : 0;
  }
  return result;
}

export function getFishRodSettings() {
  try {
    const raw = localStorage.getItem(FISH_ROD_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setFishRodSettings(rodName) {
  const prices = calculateExpectedFishMeatPrice(rodName);
  if (!prices) return null;
  localStorage.setItem(
    FISH_ROD_KEY,
    JSON.stringify({
      rodGrade: rodName,
      expectedFishMeatPrice: prices,
      updatedAt: new Date().toISOString(),
    }),
  );
  return prices;
}

export function getExpectedFishMeatPriceByName(ingredientName) {
  const sizeMatch = ingredientName.match(/소형|중형|대형/);
  if (!sizeMatch) return 0;
  const size = sizeMatch[0];
  const settings = getFishRodSettings();
  const priceMap = settings?.expectedFishMeatPrice ?? FALLBACK_FISH_MEAT_PRICE;
  return priceMap[size] ?? 0;
}
