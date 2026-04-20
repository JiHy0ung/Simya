import styled from "@emotion/styled";
import { Container } from "@mui/material";
import React from "react";

const LandingContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "3rem",
});

const LandingPage = () => {
  // TODO
  // 인게임 시간 확인
  // NPC 복복 할 수 있는 것

  return (
    <LandingContainer>
      본 사이트는 ‘심야 잡화점’ 유저가 제작한 비공식 웹사이트로, 유저 제보를
      바탕으로 정보를 제공하며 일부 내용은 실제와 다를 수 있습니다.
    </LandingContainer>
  );
};

export default LandingPage;
