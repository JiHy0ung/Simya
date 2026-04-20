import React, { useState } from "react";
import styled from "@emotion/styled";
import { Box, Tabs, Tab, Container, Typography } from "@mui/material";
import { processedRecipes } from "../../constants/processed";
import { restaurantRecipes } from "../../constants/restaurant";
import RecipeCard from "./components/RecipeCard";
import RecipeDetail from "./components/RecipeDetail";
import { cafeRecipes } from "../../constants/cafe";

const FoodContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "3rem",
});

const FoodTitle = styled(Typography)({
  fontSize: "3.5rem",
  fontWeight: "900",
  marginBottom: "1rem",
});

const FoodSubtitle = styled(Typography)({
  fontSize: "1.1rem",
  color: "#666",
  marginBottom: "0.5rem",
  textAlign: "center",
});

const FoodDescription = styled(Typography)({
  fontSize: "0.875rem",
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

// 좌우 분할 레이아웃
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

const TABS = [
  { value: "process", label: "가공식품", data: processedRecipes },
  { value: "restaurant", label: "레스토랑", data: restaurantRecipes },
  { value: "cafe", label: "디저트 카페", data: cafeRecipes },
];

const FoodPage = () => {
  const [tab, setTab] = useState("process");
  const [selected, setSelected] = useState(processedRecipes[0] ?? null);

  const currentData = TABS.find((t) => t.value === tab)?.data ?? [];

  const handleTabChange = (_, v) => {
    setTab(v);
    const newData = TABS.find((t) => t.value === v)?.data ?? [];
    setSelected(newData[0] ?? null); // 탭 전환 시 첫번째 자동 선택
  };

  return (
    <FoodContainer>
      <FoodTitle>요리 분석소</FoodTitle>
      <FoodSubtitle>요리의 재료 조합과 순수익을 계산합니다</FoodSubtitle>
      <FoodDescription>
        모든 요리는 고정된 가격 기준으로 계산됩니다.
        <br />
        재료 구성과 총 비용, 순수익을 확인해 효율을 분석하세요.
      </FoodDescription>

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
        {/* 왼쪽: 선택된 레시피 상세 */}
        <RecipeDetail recipe={selected} />

        {/* 오른쪽: 카드 그리드 */}
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
    </FoodContainer>
  );
};

export default FoodPage;
