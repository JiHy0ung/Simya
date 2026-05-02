import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import { keyframes } from "@emotion/react";

const fadeIn = keyframes`
  0%   { opacity: 0; transform: translateY(6px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const BubbleWrap = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  marginTop: "1rem",
  paddingTop: "1rem",
  borderTop: "1px solid #3d3a52",
});

const Bubble = styled(Box)({
  width: "fit-content",
  position: "relative",
  background: "#0f0e13",
  border: "1px solid #3d3a52",
  padding: "8px 12px",
  fontSize: "0.75rem",
  color: "#8a86aa",
  fontFamily: "Mona10x12",
  lineHeight: 1.6,
  animation: `${fadeIn} 0.3s ease forwards`,
  wordBreak: "keep-all",

  // 말풍선 꼬리
  "&::before": {
    content: '""',
    position: "absolute",
    top: "-7px",
    left: "14px",
    width: 0,
    height: 0,
    borderLeft: "6px solid transparent",
    borderRight: "6px solid transparent",
    borderBottom: "7px solid #3d3a52",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    top: "-5px",
    left: "15px",
    width: 0,
    height: 0,
    borderLeft: "5px solid transparent",
    borderRight: "5px solid transparent",
    borderBottom: "6px solid #0f0e13",
  },
});

const NpcHint = ({ npc }) => {
  const [visibleCount, setVisibleCount] = useState(0);

  // NPC 바뀌면 초기화 후 순차적으로 힌트 표시
  useEffect(() => {
    setVisibleCount(0);
    if (!npc.hints?.length) return;

    const timers = npc.hints.map((_, i) =>
      setTimeout(() => setVisibleCount(i + 1), i * 300),
    );

    return () => timers.forEach(clearTimeout);
  }, [npc.name]);

  if (!npc.hints?.length) return null;

  return (
    <BubbleWrap>
      <Typography
        sx={{
          fontSize: "0.75rem",
          color: "#766ea2",
          fontFamily: "Mona8x12",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
        }}
      >
        힌트
      </Typography>
      {npc.hints.slice(0, visibleCount).map((hint, i) => (
        <Bubble key={i}>{hint}</Bubble>
      ))}
    </BubbleWrap>
  );
};

export default NpcHint;
