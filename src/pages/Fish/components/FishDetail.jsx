import React from "react";
import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import { town } from "../../../constants/town/town";
import { SEASON_THEME } from "../../../constants/commons";
import { GRADE_COLORS } from "./FishCard";

import SmallSerenity from "../../../assets/images/food/fish/small_serenity.png";
import MediumSerenity from "../../../assets/images/food/fish/medium_serenity.png";
import LargeSerenity from "../../../assets/images/food/fish/large_serenity.png";
import SmallBluena from "../../../assets/images/food/fish/small_bluena.png";
import MediumBluena from "../../../assets/images/food/fish/medium_bluena.png";
import LargeBluena from "../../../assets/images/food/fish/large_bluena.png";
import SmallSunbreeze from "../../../assets/images/food/fish/small_sunbreeze.png";
import MediumSunbreeze from "../../../assets/images/food/fish/medium_sunbreeze.png";
import LargeSunbreeze from "../../../assets/images/food/fish/large_sunbreeze.png";
import SmallFury from "../../../assets/images/food/fish/small_fury.png";
import MediumFury from "../../../assets/images/food/fish/medium_fury.png";
import LargeFury from "../../../assets/images/food/fish/large_fury.png";

const TOWN_SHORT = {
  "세레니티 폭포": "세레니티",
  "블루나 해안": "블루나",
  "썬브리즈 사막": "썬브리즈",
  "퓨리 화산": "퓨리",
};

const DECOMP_COUNT = { 일반: 1, 희귀: 2, 고급: 4, 특급: 6, 전설: 10 };

const MEAT_IMAGE = {
  세레니티_소형: SmallSerenity,
  세레니티_중형: MediumSerenity,
  세레니티_대형: LargeSerenity,
  블루나_소형: SmallBluena,
  블루나_중형: MediumBluena,
  블루나_대형: LargeBluena,
  썬브리즈_소형: SmallSunbreeze,
  썬브리즈_중형: MediumSunbreeze,
  썬브리즈_대형: LargeSunbreeze,
  퓨리_소형: SmallFury,
  퓨리_중형: MediumFury,
  퓨리_대형: LargeFury,
};

function getBaseName(name) {
  return name.startsWith("특별한 ") ? name.slice(4) : name;
}

export function getVillage(fishName) {
  const base = getBaseName(fishName);
  return town.find((t) => t.resources.fishes.includes(base)) ?? null;
}

export function getDecomposition(fishItem) {
  const v = getVillage(fishItem.name);
  if (!v) return null;
  const short = TOWN_SHORT[v.name] ?? v.name.split(" ")[0];
  const count = DECOMP_COUNT[fishItem.grade] ?? 1;
  const name = `${short} ${fishItem.size} 생선살`;
  const image = MEAT_IMAGE[`${short}_${fishItem.size}`] ?? null;
  return { name, count, image };
}

const Panel = styled(Box)(({ theme }) => ({
  background: "#18171c",
  border: "2px solid #3d3a52",
  padding: "1.25rem",
  position: "sticky",
  top: "1rem",
  [theme.breakpoints.down("md")]: {
    position: "static",
  },
}));

const FishImage = styled("img")({
  width: "80px",
  height: "80px",
  objectFit: "contain",
  imageRendering: "pixelated",
  marginBottom: "0.75rem",
});

const FishName = styled(Typography)({
  fontSize: "1.1rem",
  fontWeight: "bold",
  color: "#e8e4ff",
  fontFamily: "Mona10x12",
  marginBottom: "1rem",
  borderBottom: "1px solid #3d3a52",
  paddingBottom: "0.5rem",
});

const SectionLabel = styled(Typography)({
  fontSize: "0.6875rem",
  color: "#5a5670",
  fontFamily: "Mona8x12",
  marginBottom: "0.375rem",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
});

const StatRow = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: "0.8125rem",
  color: "#8a86aa",
  fontFamily: "Mona8x12",
  padding: "4px 0",
  borderBottom: "1px solid #28263a",
  "&:last-child": { borderBottom: "none" },
});

const StatValue = styled("span")({
  color: "#c4bdff",
  fontWeight: "bold",
});

const TownRow = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "5px 0",
  borderBottom: "1px solid #28263a",
  marginBottom: "0.5rem",
  "&:last-child": { borderBottom: "none" },
});

const TownName = styled("span")({
  fontSize: "0.8125rem",
  color: "#8a86aa",
  fontFamily: "Mona10x12",
});

const SeasonBadge = styled("span")(({ season }) => {
  const c = SEASON_THEME[season] ?? {
    bg: "rgba(255,255,255,0.1)",
    text: "#fff",
  };
  return {
    fontSize: "0.625rem",
    padding: "1px 6px",
    background: c.bg,
    color: c.text,
    fontFamily: "Mona8x12",
    marginLeft: "4px",
  };
});

const DecompBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "5px 0",
});

const DecompLeft = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "6px",
});

const DecompIcon = styled("img")({
  width: "2rem",
  height: "2rem",
  imageRendering: "pixelated",
});

const DecompName = styled("span")({
  fontSize: "0.75rem",
  color: "#8a86aa",
  fontFamily: "Mona8x12",
});

const DecompCount = styled("span")({
  fontSize: "0.75rem",
  color: "#c4bdff",
  fontFamily: "Mona8x12",
});

const EmptyPanel = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "200px",
  color: "#3d3a52",
  fontSize: "0.8125rem",
  fontFamily: "Mona8x12",
  border: "2px solid #3d3a52",
});

const FishDetail = ({ fish }) => {
  if (!fish) return <EmptyPanel>물고기를 선택하세요</EmptyPanel>;

  const village = getVillage(fish.name);
  const decomp = getDecomposition(fish);
  const gradeColor = GRADE_COLORS[fish.grade] ?? GRADE_COLORS["일반"];

  return (
    <Panel>
      {fish.image && <FishImage src={fish.image} alt={fish.name} />}
      <FishName>{fish.name}</FishName>

      <SectionLabel>정보</SectionLabel>
      <Box sx={{ mb: "1rem" }}>
        <StatRow>
          <span>등급</span>
          <StatValue style={{ color: gradeColor.text }}>{fish.grade}</StatValue>
        </StatRow>
        <StatRow>
          <span>크기</span>
          <StatValue>{fish.size}</StatValue>
        </StatRow>
        <StatRow>
          <span>판매가</span>
          <StatValue style={{ color: "#eee" }}>
            {fish.price?.toLocaleString()}G
          </StatValue>
        </StatRow>
      </Box>

      {village && (
        <>
          <SectionLabel>어획 마을</SectionLabel>
          <Box sx={{ mb: "1rem" }}>
            <TownRow>
              <TownName>{village.name}</TownName>
              <Box>
                {village.seasons.map((s) => (
                  <SeasonBadge key={s} season={s}>
                    {s}
                  </SeasonBadge>
                ))}
              </Box>
            </TownRow>
          </Box>
        </>
      )}

      {decomp && (
        <>
          <SectionLabel>분해 결과</SectionLabel>
          <DecompBox>
            <DecompLeft>
              {decomp.image && (
                <DecompIcon src={decomp.image} alt={decomp.name} />
              )}
              <DecompName>{decomp.name}</DecompName>
            </DecompLeft>
            <DecompCount>x {decomp.count}</DecompCount>
          </DecompBox>
        </>
      )}
    </Panel>
  );
};

export default FishDetail;
