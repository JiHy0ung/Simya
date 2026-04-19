import React, { useState } from "react";
import styled from "@emotion/styled";
import { Box, Tabs, Tab, Container, Typography } from "@mui/material";
import { processedRecipes } from "../../constants/processed";
import { restaurantRecipes } from "../../constants/restaurant";
import RecipeCard from "./components/RecipeCard";

const FoodContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "3rem",
});

const FoodTitle = styled(Typography)({
  fontSize: "3rem",
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
  fontSize: "0.95rem",
  color: "#888",
  textAlign: "center",
  maxWidth: "600px",
  marginBottom: "4rem",
});

const StyledTabs = styled(Tabs)({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  minHeight: "unset",
  marginBottom: "1.25rem",
  "& .MuiTabs-indicator": {
    display: "none",
  },
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
    backgroundColor: "rgba(184, 178, 236, 0.27)",
    borderColor: "rgba(183,179,218,0.5)",
    fontWeight: "bold",
  },
});

const CardGrid = styled(Box)({
  width: "100%",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(155px, 1fr))",
  gap: "1rem",
});

const TABS = [
  { value: "process", label: "가공 스테이션", data: processedRecipes },
  { value: "restaurant", label: "레스토랑 스테이션", data: restaurantRecipes },
  { value: "cafe", label: "카페", data: [] },
];

const FoodPage = () => {
  const [tab, setTab] = useState("process");

  const currentData = TABS.find((t) => t.value === tab)?.data ?? [];

  // TODO
  // 왼쪽은 순수익 자세한 재료 오른쪽은 선택 탭 이렇게 나눠서 보여지도록
  // 미선택시 자동으로 김치 선택, 디폴트 값 넣기
  // 모바일은 왼쪽/오른쪽이 위/아래로 적용되도록
  // 왼쪽 정보 - 가격, 계절 작물이 들어간다면 성장기간(가장 오래걸리는)참고해서 완성품 하나 만드는데 걸리는 시간, 각 재료의 순수익 값

  return (
    <FoodContainer>
      <FoodTitle>요리 분석소</FoodTitle>
      <FoodSubtitle>요리의 재료 조합과 순수익을 계산합니다</FoodSubtitle>
      <FoodDescription>
        모든 요리는 고정된 가격 기준으로 계산됩니다.
        <br />
        재료 구성과 총 비용, 순수익을 확인해 효율을 분석하세요.
      </FoodDescription>

      <StyledTabs value={tab} onChange={(_, v) => setTab(v)}>
        {TABS.map((t) => (
          <StyledTab
            key={t.value}
            value={t.value}
            label={t.label}
            disableRipple
          />
        ))}
      </StyledTabs>

      <CardGrid>
        {currentData.map((recipe, i) => (
          <RecipeCard key={i} {...recipe} />
        ))}
      </CardGrid>
    </FoodContainer>
  );
};

export default FoodPage;
