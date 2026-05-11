import React, { useEffect, useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import { Box, Container, Typography, Rating } from "@mui/material";
import { npcData } from "../../constants/npc";
import NpcHint from "./components/NpcHint";

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
    key: "okay",
    emoji: "🙂",
    label: "그럭저럭 선물",
    score: "+1점",
    color: "#94a3b8",
    reaction: "소폭 상승",
  },
  {
    key: "normal",
    emoji: "😶",
    label: "보통의 선물",
    score: "0점",
    color: "#6b7280",
    reaction: "유지",
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

  "&:focus": {
    outline: "none",
  },

  "&:focus-visible": {
    outline: "none",
  },
}));

const ContentLayout = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "grid",
  gridTemplateColumns: "270px 1fr",
  gap: "1.5rem",
  alignItems: "start",

  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
  },
}));

const ProfilePanel = styled(Box)(({ theme }) => ({
  background: "#18171c",
  border: "2px solid #3d3a52",
  padding: "1.25rem",
  position: "sticky",
  top: "1rem",

  "@media (max-width: 768px)": {
    position: "static",
  },
}));

const NpcImage = styled("img")(({ theme }) => ({
  width: "100%",
  aspectRatio: "1",
  objectFit: "cover",
  imageRendering: "pixelated",
  marginBottom: "1rem",
  border: "2px solid #3d3a52",
  background: "#b19cff1d",
}));

const NpcName = styled(Typography)({
  fontSize: "1.25rem",
  fontWeight: "bold",
  color: "#e8e4ff",
  fontFamily: "Mona10x12",
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
  transition: "0.2s",
});

const SectionLabel = ({ labelColor, style, children, ...props }) => (
  <Typography
    {...props}
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "0.6875rem",
      color: labelColor ?? "#5a5670",
      fontFamily: "Mona10x12",
      fontWeight: "bold",
      marginBottom: "0.5rem",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      gap: "0.4rem",
      ...style,
    }}
  >
    {children}
  </Typography>
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
    okay: {
      bg: "rgba(148,163,184,0.15)",
      text: "#94a3b8",
      border: "rgba(148,163,184,0.3)",
    },
    normal: {
      bg: "rgba(107,114,128,0.15)",
      text: "#6b7280",
      border: "rgba(107,114,128,0.3)",
    },
    disliked: {
      bg: "rgba(99,102,241,0.15)",
      text: "#818cf8",
      border: "rgba(99,102,241,0.3)",
    },
  };

  const s = styles[variant];

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

const LikePage = () => {
  const tabRefs = useRef([]);

  const [selected, setSelected] = useState(npcData[0]);

  const [hearts, setHearts] = useState(() => {
    const saved = localStorage.getItem("npc_hearts");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    const currentIndex = npcData.findIndex((npc) => npc.name === selected.name);

    tabRefs.current[currentIndex]?.focus();
  }, []);

  useEffect(() => {
    localStorage.setItem("npc_hearts", JSON.stringify(hearts));
  }, [hearts]);

  useEffect(() => {
    npcData.forEach((npc) => {
      const img = new Image();
      img.src = npc.image;
    });
  }, []);

  const handleHeartChange = (npcName, value) => {
    setHearts((prev) => ({
      ...prev,
      [npcName]: value,
    }));
  };

  const getRecommendedSection = (npc, heart) => {
    const keys =
      heart < 5
        ? ["loved", "liked", "okay", "normal"]
        : ["normal", "okay", "liked"];

    return (
      keys
        .map((key) => GIFT_SECTIONS.find((section) => section.key === key))
        .find((section) => npc[section.key]?.length > 0) || null
    );
  };

  const currentHeart = hearts[selected.name] || 0;

  const recommendedSection = getRecommendedSection(selected, currentHeart);

  const handleTabKeyDown = (e, currentIndex) => {
    let nextIndex = currentIndex;

    if (e.key === "ArrowRight") {
      nextIndex = (currentIndex + 1) % npcData.length;
    }

    if (e.key === "ArrowLeft") {
      nextIndex = (currentIndex - 1 + npcData.length) % npcData.length;
    }

    if (nextIndex !== currentIndex) {
      setSelected(npcData[nextIndex]);

      requestAnimationFrame(() => {
        tabRefs.current[nextIndex]?.focus();
      });
    }
  };

  return (
    <LikeContainer>
      <LikeTitle>NPC 호감도</LikeTitle>

      <LikeSubtitle>주민과의 관계를 쌓아보세요</LikeSubtitle>

      <LikeDescription>
        선물을 통해 호감 점수를 올릴 수 있어요.
        <br />
        호감도가 최대인 주민이 많을수록 특별한 보너스를 받습니다.
      </LikeDescription>

      <TabContainer>
        {npcData.map((npc, index) => (
          <TabButton
            key={npc.name}
            ref={(el) => (tabRefs.current[index] = el)}
            selected={selected.name === npc.name}
            onClick={() => setSelected(npc)}
            onKeyDown={(e) => handleTabKeyDown(e, index)}
            tabIndex={selected.name === npc.name ? 0 : -1}
          >
            {npc.name}
          </TabButton>
        ))}
      </TabContainer>

      <ContentLayout>
        <ProfilePanel>
          <NpcImage src={selected.image} alt={selected.name} />

          <Box sx={{ width: "100%" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "0.5rem",
                marginBottom: "4px",
              }}
            >
              <NpcName>{selected.name}</NpcName>

              <Rating
                value={currentHeart}
                precision={0.5}
                max={5}
                onChange={(_, newValue) => {
                  handleHeartChange(selected.name, newValue || 0);
                }}
                icon={
                  <span
                    style={{
                      fontFamily: "Mona12",
                      fontSize: "1.3rem",
                      cursor: "var(--cursor-pointer)",
                    }}
                  >
                    🩵
                  </span>
                }
                emptyIcon={
                  <span
                    style={{
                      fontFamily: "Mona12",
                      fontSize: "1.3rem",
                      opacity: 0.2,
                      cursor: "var(--cursor-pointer)",
                    }}
                  >
                    🩵
                  </span>
                }
                sx={{
                  cursor: "var(--cursor-pointer)",

                  gap: "1px",
                  "& .MuiRating-icon": {
                    transform: "none !important",
                    transition: "none !important",
                  },

                  "& .MuiRating-label": {
                    transform: "none !important",
                    transition: "none !important",
                  },

                  "& .MuiRating-iconActive": {
                    transform: "none !important",
                  },

                  WebkitTapHighlightColor: "transparent",
                }}
              />

              <Typography
                sx={{
                  fontSize: "0.75rem",
                  color: "#7d7897",
                  fontFamily: "Mona8x12",
                }}
              >
                {currentHeart.toFixed(1)}
              </Typography>
            </Box>

            <NpcMeta>
              {selected.job}
              {selected.age ? ` · ${selected.age}세` : ""}
            </NpcMeta>

            <NpcDescription>{selected.description}</NpcDescription>

            <NpcHint npc={selected} />
          </Box>
        </ProfilePanel>

        <GiftPanel>
          {GIFT_SECTIONS.map(
            ({ key, emoji, label, score, color, reaction }) => {
              const isRecommended = recommendedSection?.key === key;

              return (
                <GiftSection
                  key={key}
                  sx={{
                    borderColor: isRecommended ? color : "#3d3a52",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: "0.5rem",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        flexWrap: "wrap",
                      }}
                    >
                      <SectionLabel labelColor={color}>
                        <span
                          style={{
                            fontFamily: "Mona12",
                            fontWeight: "normal",
                            fontSize: "0.875rem",
                          }}
                        >
                          {emoji}
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
                          {gift.image && (
                            <img
                              src={gift.image}
                              style={{
                                height: "1rem",
                              }}
                            />
                          )}

                          {gift.name}
                        </GiftBadge>
                      ))
                    ) : (
                      <EmptyText>찾아 헤매는 중</EmptyText>
                    )}
                  </GiftList>
                </GiftSection>
              );
            },
          )}
        </GiftPanel>
      </ContentLayout>
    </LikeContainer>
  );
};

export default LikePage;
