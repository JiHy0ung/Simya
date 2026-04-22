import { styled } from "@mui/material/styles";
import { Box, Container, Typography } from "@mui/material";
import React, { useState } from "react";
import { npcData } from "../../constants/npc";
import PetNpc from "./components/PetNpc";
import { useNavigate } from "react-router";
import Discord from "../../assets/images/icons/discord.png";
import Wiki from "../../assets/images/icons/moonlit.png";
import Minelist from "../../assets/images/icons/minecraft.png";

const LandingContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "3rem",
  gap: "2.5rem",
});

const Title = styled(Typography)({
  fontSize: "3.5rem",
  fontWeight: "900",
  textAlign: "center",
  letterSpacing: "-0.02em",
});

const Subtitle = styled(Typography)({
  fontSize: "1rem",
  color: "#666",
  textAlign: "center",
  lineHeight: 1.8,
});

const Divider = styled(Box)({
  width: "100%",
  maxWidth: "400px",
  height: "1px",
  background: "linear-gradient(to right, transparent, #3d3a52, transparent)",
});

const MenuGrid = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "0.75rem",
  width: "100%",
  "@media (max-width: 768px)": {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
});

const MenuCard = styled(Box)({
  background: "#18171c",
  border: "2px solid #3d3a52",
  padding: "1.25rem 1rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.5rem",
  cursor: "var(--cursor-pointer)",
  transition: "border-color 0.15s ease",
  "&:hover": {
    borderColor: "#b7b3da",
  },
});

const MenuIcon = styled(Typography)({
  fontSize: "1.5rem",
  fontFamily: "Mona12",
  lineHeight: 1,
});

const MenuLabel = styled(Typography)({
  fontSize: "0.8125rem",
  color: "#e8e4ff",
  fontFamily: "Mona8x12",
  textAlign: "center",
});

const MenuDesc = styled(Typography)({
  fontSize: "0.6875rem",
  color: "#5a5670",
  fontFamily: "Mona8x12",
  textAlign: "center",
});

const LinkGrid = styled(Box)({
  display: "flex",
  gap: "0.75rem",
  flexWrap: "wrap",
  justifyContent: "center",
});

const LinkCard = styled("a")({
  display: "flex",
  justifyContent: "center",
  alignContent: "center",
  background: "#18171c",
  border: "0.5px solid #3d3a52",
  padding: "0.625rem 1.25rem",
  gap: "0.5rem",
  cursor: "var(--cursor-pointer)",
  textDecoration: "none",
  transition: "border-color 0.15s ease",
  "&:hover": {
    borderColor: "#b7b3da",
  },
});

const LinkLabel = styled(Typography)({
  fontSize: "0.8125rem",
  color: "rgba(255,255,255,0.5)",
  fontFamily: "Mona10x12",
});

const Disclaimer = styled(Typography)({
  fontSize: "0.75rem",
  color: "rgba(255,255,255,0.2)",
  textAlign: "center",
  maxWidth: "500px",
  lineHeight: 1.8,
});

const MENUS = [
  { icon: "🍖", label: "요리 분석소", desc: "레시피 & 순수익", path: "/food" },
  { icon: "💎", label: "보석 공방", desc: "보석 제작 & 마을", path: "/jewel" },
  { icon: "🪵", label: "목재 공방", desc: "목재 제작 & 마을", path: "/wood" },
  { icon: "❤️", label: "호감도", desc: "NPC 선물 정보", path: "/like" },
];

const LINKS = [
  {
    icon: Discord,
    label: "공식 디스코드",
    href: "https://discord.gg/wsRpXq2H",
    isPixel: true,
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
      {/* 면책 */}
      <Disclaimer>
        본 사이트는 '심야 잡화점' 유저가 제작한 비공식 웹사이트로, 유저 제보를
        바탕으로 정보를 제공하며 일부 내용은 실제와 다를 수 있습니다.
      </Disclaimer>
      {/* 타이틀
      <Box sx={{ textAlign: "center" }}>
        <Title>심야잡화점</Title>
        <Subtitle>
          요리 분석, 보석 공방, 호감도까지
          <br />
          심야잡화점 공략 정보를 한눈에 확인하세요
        </Subtitle>
      </Box>
      빠른 메뉴
      <MenuGrid>
        {MENUS.map((menu) => (
          <MenuCard key={menu.path} onClick={() => navigate(menu.path)}>
            <MenuIcon>{menu.icon}</MenuIcon>
            <MenuLabel>{menu.label}</MenuLabel>
            <MenuDesc>{menu.desc}</MenuDesc>
          </MenuCard>
        ))}
      </MenuGrid> */}
      <Divider />
      {/* NPC 쓰다듬기 */}
      <PetNpc npc={npc} />
      <Divider />
      {/* 외부 링크 */}
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
