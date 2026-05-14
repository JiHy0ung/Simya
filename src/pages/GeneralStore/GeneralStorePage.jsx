import React from "react";
import styled from "@emotion/styled";
import { Box, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { hasAllHearts } from "../../utils/heartUtils";
import OrderSection from "./components/OrderSection";
import TradeSection from "./components/TradeSection";

const PageContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "3rem",
  paddingBottom: "3rem",
});

const Title = styled(Typography)(({ theme }) => ({
  fontSize: "3.5rem",
  fontWeight: "900",
  marginBottom: "1rem",
  [theme.breakpoints.down("md")]: { fontSize: "3rem" },
}));

const Subtitle = styled(Typography)({
  fontSize: "1.1rem",
  color: "#666",
  marginBottom: "0.5rem",
  textAlign: "center",
});

const Description = styled(Typography)({
  fontSize: "0.95rem",
  color: "#888",
  textAlign: "center",
  maxWidth: "600px",
  marginBottom: "4rem",
});

const NoticeBanner = styled(Box)({
  width: "100%",
  background: "rgba(183,179,218,0.06)",
  border: "1px solid rgba(183,179,218,0.2)",
  padding: "0.875rem 1.25rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "2rem",
});

const NoticeLink = styled("button")({
  background: "none",
  border: "0.5px solid rgba(183,179,218,0.3)",
  color: "#c4bdff",
  fontFamily: "Mona8x12",
  fontSize: "0.75rem",
  padding: "4px 12px",
  cursor: "var(--cursor-pointer)",
  "&:hover": { background: "rgba(183,179,218,0.1)" },
});

const Divider = styled(Box)({
  width: "100%",
  height: "1px",
  background: "linear-gradient(to right, transparent, #3d3a52, transparent)",
  margin: "4rem 0",
});

const GeneralStorePage = () => {
  const navigate = useNavigate();
  const hasHearts = hasAllHearts();

  return (
    <PageContainer>
      <Title>개인 잡화점</Title>
      <Subtitle>
        주문과 무역을 물품을 관리하고 필요한 재료를 한눈에 확인해보세요.
      </Subtitle>
      <Description>
        주문 판매는 상점가의 1.4배, 무역 판매는 최대 2.0배 배율이 적용됩니다.
        <br />
        판매 시 호감도 보너스도 함께 적용됩니다.
      </Description>

      {!hasHearts && (
        <NoticeBanner>
          <Typography
            sx={{
              fontSize: "0.8125rem",
              color: "#8a86aa",
              fontFamily: "Mona8x12",
            }}
          >
            호감도 보너스를 적용하려면 먼저 NPC 호감도를 설정해주세요
          </Typography>
          <NoticeLink onClick={() => navigate("/like")}>
            호감도 페이지 바로가기 →
          </NoticeLink>
        </NoticeBanner>
      )}

      <OrderSection />
      <Divider />
      <TradeSection />
    </PageContainer>
  );
};

export default GeneralStorePage;
