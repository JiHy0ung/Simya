import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { Box, Tabs, Tab, Container, Typography } from "@mui/material";
import { woodRecipes } from "../../constants/town/woodRecipes";
import RecipeCard from "../../commons/components/RecipeCard";
import WoodDetail from "./components/WoodDetail";
import { sortRecipes } from "../../utils/sortUtils";
import SortBar from "../../commons/components/SortBar";

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

const StyledTabs = styled(Tabs)(({ theme }) => ({
  display: "flex",
  minHeight: "unset",
  marginBottom: "-1.625rem",
  marginRight: "auto",
  zIndex: "99999",

  "& .MuiTabs-indicator": { display: "none" },

  [theme.breakpoints.down("md")]: {
    marginBottom: "1.25rem",
  },
}));

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
  const [tab, setTab] = useState(() => {
    return localStorage.getItem("wood_tab") || "tier1";
  });

  const [sort, setSort] = useState(() => {
    return localStorage.getItem("food_sort") || "default";
  });

  const [selectedName, setSelectedName] = useState(() => {
    return localStorage.getItem("wood_selected") || null;
  });

  const currentData = TABS.find((t) => t.value === tab)?.data ?? [];

  const sortedData = sortRecipes(currentData, sort);

  const selected =
    currentData.find((item) => item.name === selectedName) ??
    currentData[0] ??
    null;

  useEffect(() => {
    localStorage.setItem("wood_tab", tab);
  }, [tab]);

  useEffect(() => {
    localStorage.setItem("wood_selected", selectedName || "");
  }, [selectedName]);

  const handleTabChange = (_, v) => {
    setTab(v);
    const newData = TABS.find((t) => t.value === v)?.data ?? [];
    setSelectedName(newData[0]?.name ?? null);
  };

  return (
    <WoodContainer>
      <WoodTitle>나무 공방</WoodTitle>
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
        <Box sx={{ mt: { xs: 0, md: "2.5rem" } }}>
          <WoodDetail recipe={selected} />
        </Box>

        <Box>
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", mb: "0.75rem" }}
          >
            <SortBar sort={sort} onChange={setSort} />
          </Box>
          <CardGrid>
            {sortedData.map((recipe, i) => (
              <RecipeCard
                key={i}
                {...recipe}
                selected={selected?.name === recipe.name}
                onClick={() => setSelectedName(recipe.name)}
              />
            ))}
          </CardGrid>
        </Box>
      </ContentLayout>
    </WoodContainer>
  );
};

export default WoodPage;
