import styled from "@emotion/styled";
import { Container } from "@mui/material";
import React from "react";

const WoodContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "3rem",
});

const WoodPage = () => {
  // TODO
  // 보석상 스테이션 참고해서 순수익, 재료 조합, 가격 기재

  return <WoodContainer>준비 중인 페이지입니다.</WoodContainer>;
};

export default WoodPage;
