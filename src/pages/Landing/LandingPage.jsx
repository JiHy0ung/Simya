import { styled } from "@mui/material/styles";
import { Box, Container, Typography } from "@mui/material";
import React, { useState } from "react";
import { npcData } from "../../constants/npc";
import PetNpc from "./components/PetNpc";
import { useNavigate } from "react-router";
import Discord from "../../assets/images/icons/discord.png";
import Wiki from "../../assets/images/icons/moonlit.png";
import Minelist from "../../assets/images/icons/minecraft.png";
import SeasonWidget from "./components/SeasonWidget";

const LandingContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "1.875rem",
  paddingBlock: "3rem",
});

const Title = styled(Typography)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  maxWidth: "720px",
  fontSize: "3rem",
  fontWeight: "bold",
  color: "#ffffff",
  fontFamily: "Mona8x12",
  letterSpacing: "0.08em",
});

const Divider = styled(Box)({
  width: "100%",
  maxWidth: "400px",
  height: "1px",
  background: "linear-gradient(to right, transparent, #3d3a52, transparent)",
});

/* 섹션 타이틀 개선 */
const SectionTitle = styled(Typography)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  maxWidth: "720px",
  fontSize: "0.8rem",
  color: "#c4bdff",
  fontFamily: "Mona10x12",
  letterSpacing: "0.08em",
});

const MenuGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: "0.75rem",
  width: "100%",
  gridTemplateColumns: "repeat(2, 1fr)",

  [theme.breakpoints.up("sm")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
    width: "100%",
  },

  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "repeat(4, 1fr)",
    width: "100%",
  },

  [theme.breakpoints.up("lg")]: {
    gridTemplateColumns: "repeat(7, 1fr)",
    width: "100%",
  },
}));

const MenuCard = styled(Box)({
  background: "#18171c",
  border: "1.5px solid #3d3a52",
  padding: "1.25rem 1rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.5rem",
  cursor: "var(--cursor-pointer)",
  transition: "all 0.15s ease",

  "&:hover": {
    borderColor: "#b7b3da",
    transform: "translateY(-2px)",
    background: "#1f1d26",
  },

  "&:active": {
    transform: "translateY(0px) scale(0.98)",
  },
});

const MenuIcon = styled(Typography)({
  fontSize: "1.5rem",
  fontFamily: "Mona12",
});

const MenuLabel = styled(Typography)({
  fontSize: "1rem",
  color: "#e8e4ff",
  fontFamily: "Mona10x12",
  fontWeight: "bold",
});

const MenuDesc = styled(Typography)({
  fontSize: "0.75rem",
  color: "#5a5670",
  fontFamily: "Mona8x12",
});

/* 외부 링크 */
const LinkGrid = styled(Box)({
  display: "flex",
  gap: "0.75rem",
  flexWrap: "wrap",
  justifyContent: "center",
});

const LinkCard = styled("a")({
  display: "flex",
  alignItems: "center",
  background: "#18171c",
  border: "0.5px solid #3d3a52",
  padding: "0.625rem 1.25rem",
  gap: "0.5rem",
  cursor: "var(--cursor-pointer)",
  textDecoration: "none",
  transition: "all 0.15s ease",

  "&:hover": {
    borderColor: "#b7b3da",
    background: "#1f1d26",
  },
});

const LinkLabel = styled(Typography)({
  fontSize: "0.8125rem",
  color: "rgba(255,255,255,0.5)",
  fontFamily: "Mona10x12",
});

/* 상단 공지 (카드 느낌 강화) */
const TopNotice = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  maxWidth: "600px",
  background: "linear-gradient(135deg, #18171c, #1f1d26)",
  border: "1px solid #3d3a52",
  padding: "0.9rem 1.1rem",

  gap: "0.5rem",
  boxShadow: "0 0 0 1px rgba(183,179,218,0.1)",
});

const NoticeTitle = styled(Typography)({
  fontWeight: "bold",
  fontSize: "0.95rem",
  color: "#c4bdff",
  fontFamily: "Mona10x12",
  wordBreak: "keep-all",
});

const NoticeText = styled(Typography)({
  fontSize: "0.75rem",
  color: "rgba(255,255,255,0.5)",
  fontFamily: "Mona10x12",
  wordBreak: "keep-all",
  lineHeight: 1.6,
});

/* NPC 카드 감싸기 */
const NpcWrapper = styled(Box)({
  border: "1px solid #3d3a52",
  padding: "1rem",
  background: "#18171c",
  width: "100%",
  maxWidth: "400px",
});

const MENUS = [
  {
    icon: "🛒",
    label: "개인 잡화점",
    desc: "주문 / 납품 정보",
    path: "/store",
  },
  {
    icon: "🌅",
    label: "계절 정보",
    desc: "계절별 아이템 정보",
    path: "/season",
  },
  { icon: "❤️", label: "NPC 호감도", desc: "NPC 선물 정보", path: "/like" },
  {
    icon: "💰",
    label: "행상인",
    desc: "슬롯별 아이템 레시피 확인",
    path: "/shop",
  },
  {
    icon: "🍖",
    label: "레시피 연구소",
    desc: "레시피 & 순수익",
    path: "/food",
  },
  { icon: "💎", label: "보석 공방", desc: "보석 제작 & 마을", path: "/jewel" },
  { icon: "🪵", label: "나무 공방", desc: "목재 제작 & 마을", path: "/wood" },
];

const LINKS = [
  {
    icon: Discord,
    label: "공식 디스코드",
    href: "https://discord.gg/EjFhfmWqs",
  },
  { icon: Wiki, label: "위키", href: "https://wiki.moonlit.kr/ko" },
  {
    icon: Minelist,
    label: "마인리스트",
    href: "https://minelist.kr/servers/17045-moonlit.kr",
  },
];

const LandingPage = () => {
  const navigate = useNavigate();
  const [npc] = useState(
    () => npcData[Math.floor(Math.random() * npcData.length)],
  );

  return (
    <LandingContainer>
      {/* 상단 공지 */}
      <TopNotice>
        <NoticeTitle>
          <span style={{ fontFamily: "Mona12", fontWeight: "normal" }}>
            📢{" "}
          </span>{" "}
          최근 업데이트
        </NoticeTitle>

        <NoticeText>· 마을 별 어획 가능한 물고기 정보 추가</NoticeText>

        <NoticeText sx={{ opacity: 0.6, fontFamily: "Mona8x12" }}>
          본 사이트는 '심야 잡화점' 유저가 제작한 비공식 웹사이트로, 유저 제보를
          바탕으로 정보를 제공하며 일부 내용은 실제와 다를 수 있습니다.
        </NoticeText>
      </TopNotice>

      <Divider />

      {/* 빠른 메뉴 */}
      <SectionTitle>빠른 메뉴</SectionTitle>
      <MenuGrid>
        {MENUS.map((menu) => (
          <MenuCard key={menu.path} onClick={() => navigate(menu.path)}>
            <MenuIcon>{menu.icon}</MenuIcon>
            <MenuLabel>{menu.label}</MenuLabel>
            <MenuDesc>{menu.desc}</MenuDesc>
          </MenuCard>
        ))}
      </MenuGrid>

      <Divider />

      <SectionTitle>계절 정보</SectionTitle>
      <SeasonWidget />

      <Divider />

      {/* NPC */}
      <SectionTitle>복복복복</SectionTitle>
      <PetNpc npc={npc} />

      <Divider />

      {/* 외부 링크 */}
      <SectionTitle>공식 링크</SectionTitle>
      <LinkGrid>
        {LINKS.map((link) => (
          <LinkCard
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noreferrer"
          >
            <img src={link.icon} style={{ height: "1rem" }} />
            <LinkLabel>{link.label}</LinkLabel>
          </LinkCard>
        ))}
      </LinkGrid>
    </LandingContainer>
  );
};

export default LandingPage;
