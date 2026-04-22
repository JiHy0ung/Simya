import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { systemTips } from "../../constants/systemTips";

const marquee = keyframes`
  from {
    transform: translateX(100vw);
  }
  to {
    transform: translateX(-100%);
  }
`;

// 전체 영역 (헤더 아래 고정)
const Wrapper = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  position: "fixed",
  bottom: "0rem",
  width: "100%",
  height: "2em",
  pointerEvents: "none",
  overflow: "hidden",
  zIndex: 9999,
  background: "#00000065",
  [theme.breakpoints.down("md")]: {
    height: "1.875em",
  },
}));
const MarqueeText = styled("div")(({ theme }) => ({
  position: "absolute",
  whiteSpace: "nowrap",
  fontFamily: "Mona8x12",
  fontSize: "0.875rem",
  color: "#fffce9",
  textShadow: "0 0 6px rgba(0,0,0,0.8)",
  animation: `${marquee} 20s linear forwards`,

  [theme.breakpoints.down("md")]: {
    fontSize: "0.75rem",
  },
}));

const FloatingTips = () => {
  const [tips, setTips] = useState([]);

  useEffect(() => {
    const spawnTip = () => {
      const random = systemTips[Math.floor(Math.random() * systemTips.length)];

      setTips((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: random,
          // top: Math.random() * 1000, // 살짝 랜덤 높이
        },
      ]);
    };

    spawnTip();

    const interval = setInterval(spawnTip, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (tips.length === 0) return;

    const timer = setTimeout(() => {
      setTips((prev) => prev.slice(1));
    }, 20000); // 애니메이션 시간과 맞추기

    return () => clearTimeout(timer);
  }, [tips]);

  return (
    <Wrapper>
      {tips.map((tip) => (
        <MarqueeText key={tip.id} style={{ top: `${tip.top}px` }}>
          <span style={{ fontFamily: "Mona12" }}>💡</span> {tip.text}
        </MarqueeText>
      ))}
    </Wrapper>
  );
};

export default FloatingTips;
