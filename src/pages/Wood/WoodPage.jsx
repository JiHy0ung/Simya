import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Box, Tabs, Tab, Container, Typography } from "@mui/material";
import { woodRecipes } from "../../constants/town/woodRecipes";
import RecipeCard from "../../commons/components/RecipeCard";
import WoodDetail from "./components/WoodDetail";

const WoodContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "3rem",
  paddingBottom: "3rem",
});

const WoodTitle = styled(Typography)(({ theme }) => ({
  fontSize: "3.5rem",
  fontWeight: "900",
  marginBottom: "1rem",
  [theme.breakpoints.down("md")]: {
    fontSize: "3rem",
  },
}));

const WoodSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.1rem",
  color: "#666",
  marginBottom: "0.5rem",
  textAlign: "center",
  [theme.breakpoints.down("md")]: {
    fontSize: "0.875rem",
  },
}));

const WoodDescription = styled(Typography)(({ theme }) => ({
  fontSize: "0.95rem",
  color: "#888",
  textAlign: "center",
  maxWidth: "600px",
  marginBottom: "4rem",
  [theme.breakpoints.down("md")]: {
    fontSize: "0.75rem",
  },
}));

const StyledTabs = styled(Tabs)({
  width: "100%",
  minHeight: "unset",
  marginBottom: "1.25rem",
  "& .MuiTabs-indicator": { display: "none" },
});

const StyledTab = styled(Tab)(({ theme }) => ({
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

const tier1 = woodRecipes.filter((_, i) => i <= 7);
const tier2 = woodRecipes.filter((_, i) => i >= 8 && i <= 11);
const tier3 = woodRecipes.filter((_, i) => i >= 12);

const TABS = [
  { value: "tier1", label: "1차 가공", data: tier1 },
  { value: "tier2", label: "2차 합성", data: tier2 },
  { value: "tier3", label: "합판", data: tier3 },
];

const WoodPage = () => {
  const [tab, setTab] = useState("tier1");
  const [selected, setSelected] = useState(tier1[0] ?? null);

  const currentData = TABS.find((t) => t.value === tab)?.data ?? [];

  const handleTabChange = (_, v) => {
    setTab(v);
    const newData = TABS.find((t) => t.value === v)?.data ?? [];
    setSelected(newData[0] ?? null);
  };

  return (
    <WoodContainer>
      <WoodTitle>제재소</WoodTitle>
      <WoodSubtitle>목재 제작 조합과 순수익을 계산합니다</WoodSubtitle>
      <WoodDescription>
        모든 목재는 고정된 가격 기준으로 계산됩니다.
        <br />
        재료 구성과 총 비용, 순수익을 확인해 효율을 분석하세요.
      </WoodDescription>

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
        <WoodDetail recipe={selected} />
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
    </WoodContainer>
  );
};

export default WoodPage;
