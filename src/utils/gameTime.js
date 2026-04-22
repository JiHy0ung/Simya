/**
 * 심야잡화점 서버 시간 계산 유틸리티 (정밀 교정본)
 * 현실 1초 = 서버 30초
 * 현실 2초 = 서버 1분
 * 현실 120초(2분) = 서버 1시간
 */

// [교정된 기준점]
// 현실 시간: 2026-04-21 13:06:00
// 서버 시간: 봄 18일 15:00:00
const BASE_REAL_TIME = new Date("2026-04-22T23:07:00").getTime();

const SEC_PER_MIN = 2; // 현실 2초 = 서버 1분
const SEC_PER_HOUR = SEC_PER_MIN * 60; // 현실 120초 = 서버 1시간
const SEC_PER_DAY = SEC_PER_HOUR * 24; // 현실 2,880초 = 서버 1일
const SEC_PER_SEASON = SEC_PER_DAY * 30; // 현실 86,400초 = 서버 1계절(30일)
const SEC_PER_YEAR = SEC_PER_SEASON * 4;

const SEASONS = ["봄", "여름", "가을", "겨울"];

export const getGameTime = () => {
  const now = new Date().getTime();
  const diffInSeconds = Math.floor((now - BASE_REAL_TIME) / 1000);

  // 기준 서버 시간(봄 18일 15시 0분)을 초로 환산
  const baseServerSeconds =
    1 * SEC_PER_SEASON + // 여름
    (29 - 1) * SEC_PER_DAY +
    21 * SEC_PER_HOUR +
    30 * SEC_PER_MIN;

  // 현재 총 서버 시간
  const totalServerSeconds = baseServerSeconds + diffInSeconds;

  // 단위 분해
  const seasonIdx = Math.floor(
    (totalServerSeconds % SEC_PER_YEAR) / SEC_PER_SEASON,
  );
  const currentSeason = SEASONS[seasonIdx];
  const currentDay =
    Math.floor((totalServerSeconds % SEC_PER_SEASON) / SEC_PER_DAY) + 1;
  const currentHour = Math.floor(
    (totalServerSeconds % SEC_PER_DAY) / SEC_PER_HOUR,
  );
  const currentMinute = Math.floor(
    (totalServerSeconds % SEC_PER_HOUR) / SEC_PER_MIN,
  );

  return {
    season: currentSeason,
    day: currentDay,
    hour: currentHour,
    minute: currentMinute,
  };
};
