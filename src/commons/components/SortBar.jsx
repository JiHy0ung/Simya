import React from "react";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

const SortSelect = styled("select")({
  background: "#0f0e13",
  border: "1px solid #3d3a52",
  color: "#e8e4ff",
  fontFamily: "Mona8x12",
  fontSize: "0.75rem",
  padding: "5px 10px",
  cursor: "var(--cursor-pointer)",
  "&:focus": { outline: "none", borderColor: "#b7b3da" },
});

const SortButton = styled("button")(({ active }) => ({
  padding: "4px 12px",
  fontSize: "0.6875rem",
  color: active ? "#c4bdff" : "rgba(255,255,255,0.35)",
  background: active ? "rgba(184,178,236,0.15)" : "transparent",
  border: active
    ? "0.5px solid rgba(183,179,218,0.5)"
    : "0.5px solid rgba(183,179,218,0.15)",
  borderRadius: "6px",
  cursor: "var(--cursor-pointer)",
  fontFamily: "Mona8x12",
  transition: "all 0.12s",
  "&:hover": { color: "#c4bdff", borderColor: "rgba(183,179,218,0.4)" },
}));

export const SORT_OPTIONS = [
  { key: "default", label: "기본" },
  { key: "profit_desc", label: "순수익 높은 순" },
  { key: "profit_asc", label: "순수익 낮은 순" },
  { key: "price_desc", label: "판매가 높은 순" },
  { key: "price_asc", label: "판매가 낮은 순" },
  { key: "seasonal_desc", label: "계절 재료 많은 순" },
  { key: "seasonal_asc", label: "계절 재료 적은 순" },
];

const SortBar = ({ sort, onChange }) => (
  <SortSelect value={sort} onChange={(e) => onChange(e.target.value)}>
    {SORT_OPTIONS.map((opt) => (
      <option key={opt.key} value={opt.key}>
        {opt.label}
      </option>
    ))}
  </SortSelect>
);

export default SortBar;
