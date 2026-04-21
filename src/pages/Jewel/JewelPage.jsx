import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Box, Tabs, Tab, Container, Typography } from "@mui/material";
import { jewelryRecipes } from "../../constants/town/jewelryRecipes";
import RecipeCard from "../../commons/components/RecipeCard";
import JewelDetail from "./components/JewelDetail";

const JewelContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "3rem",
});

const JewelTitle = styled(Typography)({
  fontSize: "3.5rem",
  fontWeight: "900",
  marginBottom: "1rem",
});

const JewelSubtitle = styled(Typography)({
  fontSize: "1.1rem",
  color: "#666",
  marginBottom: "0.5rem",
  textAlign: "center",
});

const JewelDescription = styled(Typography)({
  fontSize: "0.95rem",
  color: "#888",
  textAlign: "center",
  maxWidth: "600px",
  marginBottom: "4rem",
});

const StyledTabs = styled(Tabs)({
  width: "100%",
  minHeight: "unset",
  marginBottom: "1.25rem",
  "& .MuiTabs-indicator": { display: "none" },
});

const StyledTab = styled(Tab)({
  minHeight: "unset",
  minWidth: "140px",
  padding: "8px 18px",
  fontSize: "0.85rem",
  color: "rgba(255,255,255,0.45)",
  border: "0.5px solid rgba(183,179,218,0.25)",
  borderRadius: "8px",
  marginRight: "8px",
  cursor: "var(--cursor-pointer)",
  "&.Mui-selected": {
    color: "#c4bdff",
    backgroundColor: "rgba(184,178,236,0.27)",
    borderColor: "rgba(183,179,218,0.5)",
    fontWeight: "bold",
  },
});

const ContentLayout = styled(Box)({
  width: "100%",
  display: "grid",
  gridTemplateColumns: "280px 1fr",
  gap: "1.5rem",
  alignItems: "start",
  "@media (max-width: 768px)": {
    gridTemplateColumns: "1fr",
  },
});

const CardGrid = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(148px, 1fr))",
  gap: "1rem",
});

const tier1 = jewelryRecipes.filter((_, i) => i <= 8); // 1차 가공 (원석 → 보석, 돌뭉치)
const tier2 = jewelryRecipes.filter((_, i) => i >= 9 && i <= 12); // 2차 합성
const tier3 = jewelryRecipes.filter((_, i) => i >= 13); // 주얼리

const TABS = [
  { value: "tier1", label: "1차 가공", data: tier1 },
  { value: "tier2", label: "2차 합성", data: tier2 },
  { value: "tier3", label: "주얼리", data: tier3 },
];

const JewelPage = () => {
  const [tab, setTab] = useState("tier1");
  const [selected, setSelected] = useState(tier1[0] ?? null);

  const currentData = TABS.find((t) => t.value === tab)?.data ?? [];

  const handleTabChange = (_, v) => {
    setTab(v);
    const newData = TABS.find((t) => t.value === v)?.data ?? [];
    setSelected(newData[0] ?? null);
  };

  return (
    <JewelContainer>
      <JewelTitle>보석 공방</JewelTitle>
      <JewelSubtitle>보석 제작 조합과 순수익을 계산합니다</JewelSubtitle>
      <JewelDescription>
        모든 보석은 고정된 가격 기준으로 계산됩니다.
        <br />
        재료 구성과 총 비용, 순수익을 확인해 효율을 분석하세요.
      </JewelDescription>

      <StyledTabs value={tab} onChange={handleTabChange}>
        {TABS.map((t) => (
          <StyledTab
            key={t.value}
            value={t.value}
            label={t.label}
            disableRipple
          />
        ))}
      </StyledTabs>

      <ContentLayout>
        <JewelDetail recipe={selected} />
        <CardGrid>
          {currentData.map((recipe, i) => (
            <RecipeCard
              key={i}
              {...recipe}
              selected={selected?.name === recipe.name}
              onClick={() => setSelected(recipe)}
            />
          ))}
        </CardGrid>
      </ContentLayout>
    </JewelContainer>
  );
};

export default JewelPage;
