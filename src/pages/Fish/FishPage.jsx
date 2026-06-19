import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { Box, Tabs, Tab, Container, Typography } from "@mui/material";
import { fish } from "../../constants/town/fish";
import { town } from "../../constants/town/town";
import FishCard from "./components/FishCard";
import FishDetail, { getVillage } from "./components/FishDetail";
import { SIZES } from "../../constants/fishingRod/fishingRod";
import RodSettingsBar from "../../commons/components/RodSettingsBar";

const FishContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "3rem",
  paddingBottom: "3rem",
});

const FishTitle = styled(Typography)(({ theme }) => ({
  fontSize: "3.5rem",
  fontWeight: "900",
  marginBottom: "1rem",
  [theme.breakpoints.down("md")]: {
    fontSize: "3rem",
  },
}));

const FishSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.1rem",
  color: "#666",
  marginBottom: "0.5rem",
  textAlign: "center",
  [theme.breakpoints.down("md")]: {
    fontSize: "0.875rem",
  },
}));

const FishDescription = styled(Typography)(({ theme }) => ({
  fontSize: "0.95rem",
  color: "#888",
  textAlign: "center",
  maxWidth: "600px",
  marginBottom: "4rem",
  [theme.breakpoints.down("md")]: {
    fontSize: "0.75rem",
  },
}));

const TabsWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  width: "fit-content",
  gap: "8px",
  marginBottom: "-1.75rem",
  marginRight: "auto",
  zIndex: "999",
  [theme.breakpoints.down("md")]: {
    marginBottom: "1.25rem",
  },
}));

const StyledTab = styled(Box)(({ theme, active }) => ({
  minWidth: "137px",
  padding: "8px 18px",
  fontSize: "0.85rem",
  color: "rgba(255,255,255,0.45)",
  border: "0.5px solid rgba(183,179,218,0.25)",
  borderRadius: "8px",
  cursor: "var(--cursor-pointer)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  ...(active && {
    color: "#c4bdff",
    backgroundColor: "rgba(184,178,236,0.27)",
    borderColor: "rgba(183,179,218,0.5)",
    fontWeight: "bold",
  }),

  [theme.breakpoints.down("md")]: {
    minWidth: "100px",
  },
}));

const ContentLayout = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "grid",
  gridTemplateColumns: "280px 1fr",
  gap: "1.5rem",
  alignItems: "start",
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
  },
}));

const CardGrid = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(148px, 1fr))",
  gap: "1rem",
});

const VillageHeader = styled(Typography)({
  fontSize: "1rem",
  fontWeight: "bold",
  color: "#c4bdff",
  fontFamily: "Mona10x12",
  borderBottom: "1px solid #3d3a52",
  paddingBottom: "0.5rem",
  marginBottom: "1rem",
});

const SizeLabel = styled(Typography)({
  fontSize: "0.75rem",
  color: "#5a5670",
  fontFamily: "Mona8x12",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  marginBottom: "0.5rem",
});

const RodBar = styled(Box)({
  width: "100%",
  marginBottom: "2rem",
});

const TABS = [
  { value: "all", label: "전체" },
  ...town.map((t) => ({ value: t.name, label: t.name })),
];

function getFishForTown(villageName) {
  return fish.filter((f) => {
    const v = getVillage(f.name);
    return v?.name === villageName;
  });
}

const FishPage = () => {
  const [tab, setTab] = useState(
    () => localStorage.getItem("fish_tab") || "all",
  );
  const [selectedName, setSelectedName] = useState(() => {
    const saved = localStorage.getItem(
      `fish_selected_${localStorage.getItem("fish_tab") || "all"}`,
    );
    return saved || fish[0]?.name || null;
  });

  useEffect(() => {
    localStorage.setItem("fish_tab", tab);
  }, [tab]);

  useEffect(() => {
    localStorage.setItem(`fish_selected_${tab}`, selectedName || "");
  }, [selectedName, tab]);

  const selectedFish =
    fish.find((f) => f.name === selectedName) ?? fish[0] ?? null;

  const handleTabChange = (newTab) => {
    setTab(newTab);

    const saved = localStorage.getItem(`fish_selected_${newTab}`);
    if (saved) {
      setSelectedName(saved);
      return;
    }

    if (newTab === "all") {
      setSelectedName(fish[0]?.name ?? null);
    } else {
      const first = fish.find((f) => getVillage(f.name)?.name === newTab);
      setSelectedName(first?.name ?? null);
    }
  };

  const renderSections = (fishList) =>
    SIZES.map((size) => {
      const items = fishList.filter((f) => f.size === size);
      if (!items.length) return null;
      return (
        <Box key={size} sx={{ mb: "1.5rem" }}>
          <SizeLabel>{size}</SizeLabel>
          <CardGrid>
            {items.map((f) => (
              <FishCard
                key={f.name}
                {...f}
                selected={selectedName === f.name}
                onClick={() => setSelectedName(f.name)}
              />
            ))}
          </CardGrid>
        </Box>
      );
    }).filter(Boolean);

  const renderContent = () => {
    if (tab === "all") {
      return town.map((t) => {
        const townFish = getFishForTown(t.name);
        if (!townFish.length) return null;
        return (
          <Box key={t.name} sx={{ mb: "2.5rem" }}>
            <VillageHeader>{t.name}</VillageHeader>
            {renderSections(townFish)}
          </Box>
        );
      });
    }

    const townFish = getFishForTown(tab);
    return renderSections(townFish);
  };

  return (
    <FishContainer>
      <FishTitle>낚시 도감</FishTitle>
      <FishSubtitle>어획 가능한 물고기와 분해 정보를 확인합니다</FishSubtitle>
      <FishDescription>
        마을별로 얻을 수 있는 물고기와
        <br />
        분해 시 획득하는 생선살 정보를 확인하세요.
      </FishDescription>

      <TabsWrapper>
        {TABS.map((t) => (
          <StyledTab
            key={t.value}
            active={tab === t.value}
            onClick={() => handleTabChange(t.value)}
          >
            {t.label}
          </StyledTab>
        ))}
      </TabsWrapper>

      <ContentLayout>
        <Box sx={{ mt: { xs: 0, md: "2.5rem" } }}>
          <FishDetail fish={selectedFish} />
        </Box>

        <Box sx={{ mt: { xs: 0, md: "2.5rem" } }}>{renderContent()}</Box>
      </ContentLayout>
    </FishContainer>
  );
};

export default FishPage;
