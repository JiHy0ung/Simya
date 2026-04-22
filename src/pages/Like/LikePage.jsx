import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Box, Container, Typography } from "@mui/material";
import { npcData } from "../../constants/npc";

const LikeContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "3rem",
  paddingBottom: "3rem",
  [theme.breakpoints.down("sm")]: {
    paddingInline: "2rem",
  },
}));

const LikeTitle = styled(Typography)(({ theme }) => ({
  fontSize: "3.5rem",
  fontWeight: "900",
  marginBottom: "1rem",
  [theme.breakpoints.down("md")]: {
    fontSize: "3rem",
  },
}));

const LikeSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.1rem",
  color: "#666",
  marginBottom: "0.5rem",
  textAlign: "center",
  [theme.breakpoints.down("md")]: {
    fontSize: "0.875rem",
  },
}));

const LikeDescription = styled(Typography)(({ theme }) => ({
  fontSize: "0.95rem",
  color: "#888",
  textAlign: "center",
  maxWidth: "600px",
  marginBottom: "4rem",
  [theme.breakpoints.down("md")]: {
    fontSize: "0.75rem",
    marginBottom: "3rem",
  },
}));

const TabContainer = styled(Box)({
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
  gap: "6px",
  marginBottom: "1.5rem",
});

const TabButton = styled("button")(({ selected }) => ({
  minHeight: "unset",
  padding: "4px 16px",
  fontSize: "0.8125rem",
  color: selected ? "#c4bdff" : "rgba(255,255,255,0.45)",
  backgroundColor: selected ? "rgba(184,178,236,0.27)" : "transparent",
  border: selected
    ? "0.5px solid rgba(183,179,218,0.5)"
    : "0.5px solid rgba(183,179,218,0.25)",
  borderRadius: "8px",
  cursor: "var(--cursor-pointer)",
  fontWeight: selected ? "bold" : "normal",
  fontFamily: "Mona10x12",
  "&:hover": {
    borderColor: "rgba(183,179,218,0.5)",
    color: "#c4bdff",
  },
}));

const ContentLayout = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "grid",
  gridTemplateColumns: "240px 1fr",
  gap: "1.5rem",
  alignItems: "start",
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
  },
}));

const ProfilePanel = styled(Box)({
  background: "#18171c",
  border: "2px solid #3d3a52",
  padding: "1.25rem",
  position: "sticky",
  top: "1rem",
  "@media (max-width: 768px)": { position: "static" },
});

const NpcImage = styled("img")({
  width: "100%",
  aspectRatio: "1",
  objectFit: "cover",
  imageRendering: "pixelated",
  marginBottom: "1rem",
  border: "2px solid #3d3a52",
  background: "#b19cff1d",
});

const NpcName = styled(Typography)({
  fontSize: "1.25rem",
  fontWeight: "bold",
  color: "#e8e4ff",
  fontFamily: "Mona10x12",
  marginBottom: "4px",
});

const NpcMeta = styled(Typography)({
  fontSize: "0.75rem",
  color: "#5a5670",
  fontFamily: "Mona8x12",
  marginBottom: "0.75rem",
});

const NpcDescription = styled(Typography)({
  fontSize: "0.75rem",
  color: "#8a86aa",
  fontFamily: "Mona8x12",
  lineHeight: "1.6",
  borderTop: "1px solid #3d3a52",
  paddingTop: "0.75rem",
  wordBreak: "keep-all",
  whiteSpace: "pre-line",
});

const GiftPanel = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

const GiftSection = styled(Box)({
  background: "#18171c",
  border: "2px solid #3d3a52",
  padding: "1rem 1.25rem",
});

// styled 완전히 제거, 인라인 style로 교체
const SectionLabel = ({ labelColor, style, children }) => (
  <span
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "0.6875rem",
      color: "red",
      fontFamily: "sans-serif", // ← 임시로 변경
      fontWeight: "bold",
      marginBottom: "0.5rem",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      gap: "0.4rem",
      ...style,
    }}
  >
    {children}
  </span>
);

const GiftList = styled(Box)({
  display: "flex",
  flexWrap: "wrap",
  gap: "6px",
});

const GiftBadge = styled(Box, {
  shouldForwardProp: (prop) => prop !== "variant",
})(({ variant }) => {
  const styles = {
    loved: {
      bg: "rgba(251,113,133,0.15)",
      text: "#fb7185",
      border: "rgba(251,113,133,0.3)",
    },
    liked: {
      bg: "rgba(251,191,36,0.15)",
      text: "#fbbf24",
      border: "rgba(251,191,36,0.3)",
    },
    neutral: {
      bg: "rgba(148,163,184,0.15)",
      text: "#94a3b8",
      border: "rgba(148,163,184,0.3)",
    },
    disliked: {
      bg: "rgba(99,102,241,0.15)",
      text: "#818cf8",
      border: "rgba(99,102,241,0.3)",
    },
  };
  const s = styles[variant] ?? styles.neutral;
  return {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "0.2rem",
    fontSize: "0.75rem",
    padding: "0.2rem 0.4rem",
    background: s.bg,
    color: s.text,
    border: `0.5px solid ${s.border}`,
    fontFamily: "Mona8x12",
  };
});

const EmptyText = styled(Typography)({
  fontSize: "0.75rem",
  color: "#3d3a52",
  fontFamily: "Mona8x12",
});

const GIFT_SECTIONS = [
  {
    key: "loved",
    emoji: "😍",
    label: "가장 좋아하는 선물",
    score: "+4점",
    color: "#fb7185",
    reaction: "대폭 상승",
  },
  {
    key: "liked",
    emoji: "😀",
    label: "좋아하는 선물",
    score: "+2점",
    color: "#fbbf24",
    reaction: "상승",
  },
  {
    key: "neutral",
    emoji: "😐",
    label: "보통의 선물",
    score: "+1점",
    color: "#94a3b8",
    reaction: "소폭 상승",
  },
  {
    key: "disliked",
    emoji: "🤢",
    label: "싫어하는 선물",
    score: "-3점",
    color: "#818cf8",
    reaction: "하락",
  },
];

const LikePage = () => {
  const [selected, setSelected] = useState(npcData[0]);

  return (
    <LikeContainer>
      <LikeTitle>호감도</LikeTitle>
      <LikeSubtitle>주민과의 관계를 쌓아보세요</LikeSubtitle>
      <LikeDescription>
        선물을 통해 호감 점수를 올릴 수 있어요.
        <br />
        호감도가 최대인 주민이 많을수록 특별한 보너스를 받습니다.
      </LikeDescription>

      <TabContainer>
        {npcData.map((npc) => (
          <TabButton
            key={npc.name}
            selected={selected.name === npc.name}
            onClick={() => setSelected(npc)}
          >
            {npc.name}
          </TabButton>
        ))}
      </TabContainer>

      <ContentLayout>
        {/* 왼쪽: NPC 프로필 */}
        <ProfilePanel>
          <NpcImage src={selected.image} alt={selected.name} />
          <NpcName>{selected.name}</NpcName>
          <NpcMeta>
            {selected.job}
            {selected.age ? ` · ${selected.age}세` : ""}
          </NpcMeta>
          <NpcDescription>{selected.description}</NpcDescription>
        </ProfilePanel>

        {/* 오른쪽: 선물 정보 */}
        <GiftPanel>
          {GIFT_SECTIONS.map(
            ({ key, emoji, label, score, color, reaction }) => (
              <GiftSection key={key}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: "0.5rem",
                  }}
                >
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "4px" }}
                  >
                    <SectionLabel labelColor={color}>
                      <span
                        style={{
                          fontFamily: "Mona12",
                          fontWeight: "normal",
                          fontSize: "0.875rem",
                        }}
                      >
                        {emoji}{" "}
                      </span>
                      {label}
                    </SectionLabel>
                    <SectionLabel
                      labelColor={color}
                      style={{
                        opacity: 0.6,
                        fontFamily: "Mona8x12",
                        fontWeight: "normal",
                      }}
                    >
                      · {reaction}
                    </SectionLabel>
                  </Box>
                  <SectionLabel labelColor={color}>{score}</SectionLabel>
                </Box>
                <GiftList>
                  {selected[key].length > 0 ? (
                    selected[key].map((gift, i) => (
                      <GiftBadge key={i} variant={key}>
                        <img src={gift.image} style={{ height: "1rem" }} />
                        {gift.name}
                      </GiftBadge>
                    ))
                  ) : (
                    <EmptyText>준비 중</EmptyText>
                  )}
                </GiftList>
              </GiftSection>
            ),
          )}
        </GiftPanel>
      </ContentLayout>
    </LikeContainer>
  );
};

export default LikePage;
