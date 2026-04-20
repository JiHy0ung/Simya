import styled from "@emotion/styled";
import { Container } from "@mui/material";
import React from "react";

const JewelContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "3rem",
});

const JewelPage = () => {
  // TODO
  // 보석상 스테이션 참고해서 순수익, 재료 조합, 가격 기재

  return (
    <JewelContainer>
      준비 중인 페이지입니다. 아쿠아 마린, 아쿠아 마린 원석 페리도트, 페리도트
      원석 산호석, 산호석 원석 라미라, 라리마 원석 앰버, 앰버 원석 스트린,
      시트린 원석 가넷, 가넷 원석 루비, 루비 원석
    </JewelContainer>
  );
};

export default JewelPage;
