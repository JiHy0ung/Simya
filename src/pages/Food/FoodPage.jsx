import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { Box, Tabs, Tab, Container, Typography } from "@mui/material";
import { processedRecipes } from "../../constants/food/processed";
import { restaurantRecipes } from "../../constants/food/restaurant";
import RecipeCard from "../../commons/components/RecipeCard";
import RecipeDetail from "./components/RecipeDetail";
import { cafeRecipes } from "../../constants/food/cafe";
import { jamRecipes } from "../../constants/food/jam";
import { wineRecipes } from "../../constants/food/wine";
import { sortRecipes } from "../../utils/sortUtils";
import SortBar from "../../commons/components/SortBar";

const FoodContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "3rem",
  paddingBottom: "3rem",
});

const FoodTitle = styled(Typography)(({ theme }) => ({
  fontSize: "3.5rem",
  fontWeight: "900",
  marginBottom: "1rem",
  [theme.breakpoints.down("md")]: {
    fontSize: "3rem",
  },
}));

const FoodSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.1rem",
  color: "#666",
  marginBottom: "0.5rem",
  textAlign: "center",
  [theme.breakpoints.down("md")]: {
    fontSize: "0.875rem",
  },
}));

const FoodDescription = styled(Typography)(({ theme }) => ({
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
  zIndex: "99999",

  [theme.breakpoints.down("md")]: {
    marginBottom: "1.25rem",
  },
}));

const StyledTabs = styled(Tabs)({
  display: "flex",
  flexWrap: "wrap",
  width: "100%",
  minHeight: "unset",
  marginBottom: "1.25rem",
  "& .MuiTabs-indicator": { display: "none" },
});

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

// 좌우 분할 레이아웃
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

const TABS = [
  { value: "process", label: "가공식품", data: processedRecipes },
  { value: "restaurant", label: "레스토랑", data: restaurantRecipes },
  { value: "cafe", label: "디저트 카페", data: cafeRecipes },
  { value: "preserves", label: "절임통", data: jamRecipes },
  { value: "winery", label: "양조통", data: wineRecipes },
];

const FoodPage = () => {
  const [sort, setSort] = useState(() => {
    return localStorage.getItem("food_sort") || "default";
  });

  useEffect(() => {
    localStorage.setItem("food_sort", sort);
  }, [sort]);
  const [tab, setTab] = useState(() => {
    return localStorage.getItem("food_tab") || "process";
  });

  const [selected, setSelected] = useState(() => {
    const saved = localStorage.getItem("food_selected");
    return saved ? JSON.parse(saved) : (processedRecipes[0] ?? null);
  });

  useEffect(() => {
    localStorage.setItem("food_tab", tab);
  }, [tab]);

  useEffect(() => {
    if (selected) {
      localStorage.setItem("food_selected", JSON.stringify(selected));
    }
  }, [selected]);

  const currentData = TABS.find((t) => t.value === tab)?.data ?? [];

  const sortedData = sortRecipes(currentData, sort);

  useEffect(() => {
    localStorage.setItem("food_sort", sort);
  }, [sort]);

  const handleTabChange = (_, v) => {
    setTab(v);
    const newData = TABS.find((t) => t.value === v)?.data ?? [];
    setSelected(newData[0] ?? null); // 탭 전환 시 첫번째 자동 선택
  };

  return (
    <FoodContainer>
      <FoodTitle>레시피 연구소</FoodTitle>
      <FoodSubtitle>요리의 재료 조합과 순수익을 계산합니다</FoodSubtitle>
      <FoodDescription>
        모든 요리는 고정된 가격 기준으로 계산됩니다.
        <br />
        재료 구성과 총 비용, 순수익을 확인해 효율을 분석하세요.
      </FoodDescription>

      <TabsWrapper>
        {TABS.map((t) => (
          <StyledTab
            key={t.value}
            active={tab === t.value}
            onClick={() => handleTabChange(null, t.value)}
          >
            {t.label}
          </StyledTab>
        ))}
      </TabsWrapper>

      <ContentLayout>
        {/* 왼쪽: 선택된 레시피 상세 */}
        <Box sx={{ mt: { xs: 0, md: "2.5rem" } }}>
          <RecipeDetail recipe={selected} />
        </Box>

        {/* 오른쪽: 카드 그리드 */}
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
                onClick={() => setSelected(recipe)}
              />
            ))}
          </CardGrid>
        </Box>
      </ContentLayout>
    </FoodContainer>
  );
};

export default FoodPage;
