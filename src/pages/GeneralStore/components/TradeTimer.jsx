import React, { useEffect, useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

const TimerBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  flexWrap: "wrap",
});

const TimerButton = styled("button", {
  shouldForwardProp: (prop) => prop !== "active",
})(({ active }) => ({
  background: active ? "rgba(166,107,239,0.08)" : "#131216",
  border: `1px solid ${active ? "#6f48a8" : "#3d3a52"}`,
  color: active ? "#c7b7ff" : "#8a86aa",
  fontFamily: "Mona10x12",
  fontSize: "0.6875rem",
  padding: "0.42rem 0.7rem",
  cursor: "var(--cursor-pointer)",
  transition: "0.15s",
  minWidth: "58px",

  "&:hover": {
    borderColor: active ? "#9b6bef" : "#777293",
    color: "#e8e4ff",
    background: active ? "rgba(166,107,239,0.12)" : "rgba(183,179,218,0.06)",
  },

  "&:disabled": {
    opacity: 0.4,
    cursor: "default",
  },
}));

const TimerDisplay = styled(Box, {
  shouldForwardProp: (prop) => prop !== "active",
})(({ active }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "0.35rem",
  padding: "0.42rem 0.65rem",
  background: active ? "rgba(166,107,239,0.05)" : "#131216",
  border: `1px solid ${active ? "#5e3d8a" : "#3d3a52"}`,
  minWidth: "75px",
  height: "30px",
  boxSizing: "border-box",
}));

const TimerText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "active",
})(({ active }) => ({
  fontFamily: "Mona10x12",
  fontSize: "0.6875rem",
  color: active ? "#d7cbff" : "#5a5670",
  lineHeight: 1,
}));

const TradeTimer = () => {
  const [timeLeft, setTimeLeft] = useState(0);

  const audioRef = useRef(new Audio("/sounds/notification1.wav"));

  const formatTime = (seconds) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");

    return `${h}:${m}:${s}`;
  };

  const startTimer = async () => {
    try {
      audioRef.current.volume = 1;

      // 오디오 활성화
      await audioRef.current.play();
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    } catch (e) {
      console.log("audio unlock failed", e);
    }

    const endTime = Date.now() + 60 * 60 * 1000;

    localStorage.setItem("tradeEndTime", endTime);
    setTimeLeft(3600);
  };

  const stopTimer = () => {
    localStorage.removeItem("tradeEndTime");
    setTimeLeft(0);
  };

  useEffect(() => {
    const savedEndTime = localStorage.getItem("tradeEndTime");

    if (savedEndTime) {
      const remain = Math.floor((Number(savedEndTime) - Date.now()) / 1000);

      if (remain > 0) {
        setTimeLeft(remain);
      }
    }

    const interval = setInterval(() => {
      const saved = localStorage.getItem("tradeEndTime");

      if (!saved) return;

      const remain = Math.floor((Number(saved) - Date.now()) / 1000);

      if (remain <= 0) {
        setTimeLeft(0);
        localStorage.removeItem("tradeEndTime");

        audioRef.current.play();

        if ("Notification" in window && Notification.permission === "granted") {
          new Notification("무역 완료!", {
            body: "무역 대기 시간이 끝났습니다.",
          });
        }
      } else {
        setTimeLeft(remain);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if ("Notification" in window) {
      if (Notification.permission !== "granted") {
        Notification.requestPermission();
      }
    }
  }, []);

  return (
    <TimerBox>
      <TimerButton
        onClick={startTimer}
        disabled={timeLeft > 0}
        active={timeLeft > 0}
      >
        무역 시작
      </TimerButton>

      {timeLeft > 0 && <TimerButton onClick={stopTimer}>중지</TimerButton>}

      <TimerDisplay active={timeLeft > 0}>
        <Typography
          sx={{
            fontSize: "0.7rem",
            fontFamily: "Mona12",
            color: timeLeft > 0 ? "#ffeb13" : "#5a5670",
            mb: "0.15rem",
          }}
        >
          ⏱
        </Typography>

        <TimerText active={timeLeft > 0}>
          {timeLeft > 0 ? formatTime(timeLeft) : "대기 중 없음"}
        </TimerText>
      </TimerDisplay>
    </TimerBox>
  );
};

export default TradeTimer;
