import React, { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

import pet0 from "../../../assets/images/pet/pet_0.png";
import pet1 from "../../../assets/images/pet/pet_1.png";
import pet2 from "../../../assets/images/pet/pet_2.png";
import pet3 from "../../../assets/images/pet/pet_3.png";
import pet4 from "../../../assets/images/pet/pet_4.png";
import { useNavigate } from "react-router";

const PET_FRAMES = [pet0, pet1, pet2, pet3, pet4];

const Wrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.75rem",
});

const Frame = styled(Box)({
  border: "1.25px solid #3d3a52",
  padding: "1.25rem",
  background: "#18171c",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.5rem",
});

const NpcWrapper = styled(Box)({
  position: "relative",
  display: "inline-block",
  cursor: "var(--cursor-pointer)",
  userSelect: "none",
  border: "1px solid #3d3a52",
  background: "#b19cff1d",
  WebkitUserDrag: "none",
});

const squish = keyframes`
  0%   { transform: scaleX(1)    scaleY(1); }
  25%  { transform: scaleX(1.05) scaleY(0.95); }
  50%  { transform: scaleX(0.97) scaleY(1.02); }
  75%  { transform: scaleX(1.04) scaleY(0.99); }
  100% { transform: scaleX(1)    scaleY(1); }
`;

const NpcImage = styled("img")(({ petting }) => ({
  width: "200px",
  height: "200px",
  objectFit: "contain",
  imageRendering: "pixelated",
  display: "block",
  transformOrigin: "bottom center",
  animation: petting ? `${squish} 0.5s ease-in-out infinite` : "none",
}));

const PetHand = styled("img")({
  position: "absolute",
  top: "5px",
  left: "40%",
  transform: "translateX(-30%)",
  width: "80px",
  height: "80px",
  objectFit: "contain",
  imageRendering: "pixelated",
  pointerEvents: "none",
});

const Blush = styled(Box)(({ active }) => ({
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  pointerEvents: "none",
  opacity: active ? 1 : 0,
  transition: active ? "opacity 0.15s ease" : "opacity 0.6s ease",
}));

const BlushCircle = styled(Box)({
  position: "absolute",
  width: "30px",
  height: "20px",
  borderRadius: "50%",
  filter: "blur(5px)",
  transform: "translate(-50%, -50%)",
});

const NpcName = styled(Typography)({
  fontSize: "1rem",
  fontWeight: "bold",
  color: "#e8e4ff",
  fontFamily: "Mona10x12",
  textAlign: "center",
  "&:hover": {
    cursor: "var(--cursor-pointer)",
    textDecoration: "underline",
  },
});

const NpcJob = styled(Typography)({
  fontSize: "0.6875rem",
  color: "#5a5670",
  fontFamily: "Mona8x12",
  textAlign: "center",
  marginTop: "-4px",
});

const HintText = styled(Typography)(({ active }) => ({
  fontSize: "0.75rem",
  color: active ? "#b7b3da" : "rgba(183,179,218,0.3)",
  fontFamily: "Mona10x12",
  textAlign: "center",
  transition: "color 0.3s ease",
  marginTop: "4px",
}));

const PetNpc = ({ npc, frameInterval = 50 }) => {
  const [isPetting, setIsPetting] = useState(false);
  const [frame, setFrame] = useState(0);
  const [showHeart, setShowHeart] = useState(false);
  const [petCount, setPetCount] = useState(0);
  const intervalRef = useRef(null);
  const heartTimerRef = useRef(null);
  const navigate = useNavigate();

  const startPet = () => {
    if (isPetting) return;
    setIsPetting(true);
    setFrame(0);
    setShowHeart(true);
    setPetCount((prev) => prev + 1);

    clearTimeout(heartTimerRef.current);
    heartTimerRef.current = setTimeout(() => setShowHeart(false), 600);

    let f = 0;
    intervalRef.current = setInterval(() => {
      f += 1;
      if (f >= PET_FRAMES.length) {
        clearInterval(intervalRef.current);
        setIsPetting(false);
        setFrame(0);
      } else {
        setFrame(f);
      }
    }, frameInterval);
  };

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(heartTimerRef.current);
    };
  }, []);

  if (!npc) return null;

  const hint =
    petCount === 0 ? "클릭해서 쓰다듬어 주세요" : `${petCount}번 쓰다듬었어요`;

  return (
    <Wrapper>
      <Frame>
        <NpcWrapper onClick={startPet}>
          <NpcImage
            src={npc.image}
            alt={npc.name}
            petting={isPetting}
            draggable={false}
          />
          <Blush active={isPetting || showHeart}>
            <BlushCircle
              style={{
                background:
                  npc.blush?.background ?? "rgba(255, 108, 137, 0.68)",
                left: npc.blush?.left.x ?? "35%",
                top: npc.blush?.left.y ?? "55%",
              }}
            />
            <BlushCircle
              style={{
                background:
                  npc.blush?.background ?? "rgba(255, 108, 137, 0.68)",
                left: npc.blush?.right.x ?? "65%",
                top: npc.blush?.right.y ?? "55%",
              }}
            />
          </Blush>
          {isPetting && <PetHand src={PET_FRAMES[frame]} alt="pet" />}
        </NpcWrapper>

        <NpcName onClick={() => navigate("/like")}>{npc.name}</NpcName>
        <NpcJob>
          {npc.job}
          {npc.age ? ` · ${npc.age}세` : ""}
        </NpcJob>
        <HintText active={petCount > 0}>{hint}</HintText>
      </Frame>
    </Wrapper>
  );
};

export default PetNpc;
