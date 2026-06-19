import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { FISHING_RODS, SIZES } from "../../constants/fishingRod/fishingRod";
import {
  getFishRodSettings,
  setFishRodSettings,
  FALLBACK_FISH_MEAT_PRICE,
} from "../../utils/fishingRodUtils";

const Bar = styled(Box)({
  width: "100%",
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  flexWrap: "wrap",
});

const RodSelect = styled("select")({
  background: "#0f0e13",
  border: "1px solid #3d3a52",
  color: "#e8e4ff",
  fontFamily: "Mona8x12",
  fontSize: "0.75rem",
  padding: "5px 10px",
  cursor: "var(--cursor-pointer)",
  "&:focus": { outline: "none", borderColor: "#b7b3da" },
});

const RodLabel = styled("span")({
  fontSize: "0.75rem",
  color: "#5a5670",
  fontFamily: "Mona8x12",
  whiteSpace: "nowrap",
});

const PriceChip = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "0.375rem",
  padding: "4px 10px",
  border: "1px solid #3d3a52",
  fontSize: "0.75rem",
  color: "#8a86aa",
  fontFamily: "Mona8x12",
});

const Notice = styled("span")({
  fontSize: "0.7rem",
  color: "#5a5670",
  fontFamily: "Mona8x12",
  fontStyle: "italic",
  marginLeft: "auto",
});

const RodSettingsBar = ({ onChange }) => {
  const [rodName, setRodName] = useState(
    () => getFishRodSettings()?.rodGrade || "",
  );
  const [prices, setPrices] = useState(
    () =>
      getFishRodSettings()?.expectedFishMeatPrice || FALLBACK_FISH_MEAT_PRICE,
  );

  const handleChange = (name) => {
    setRodName(name);
    if (name) {
      const newPrices = setFishRodSettings(name);
      setPrices(newPrices);
    } else {
      localStorage.removeItem("fish_rod_settings");
      setPrices(FALLBACK_FISH_MEAT_PRICE);
    }
    onChange?.();
  };

  return (
    <Bar>
      <RodLabel>낚싯대</RodLabel>
      <RodSelect value={rodName} onChange={(e) => handleChange(e.target.value)}>
        <option value="">평균</option>
        {FISHING_RODS.map((r) => (
          <option key={r.name} value={r.name}>
            {r.name}
          </option>
        ))}
      </RodSelect>
      {SIZES.map((size) => (
        <PriceChip key={size}>
          {size} 생선살 ≈ {Math.round(prices[size])}G
        </PriceChip>
      ))}
      <Notice>
        * 등급 출현 확률만 반영한 추정치이며, 입질 속도·도망 확률 등은
        미반영입니다. 더 나은 계산법이 있다면 제보 부탁드려요!
      </Notice>
    </Bar>
  );
};

export default RodSettingsBar;
