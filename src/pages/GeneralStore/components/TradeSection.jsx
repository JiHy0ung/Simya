import React, { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import { processedRecipes } from "../../../constants/food/processed";
import { restaurantRecipes } from "../../../constants/food/restaurant";
import { cafeRecipes } from "../../../constants/food/cafe";
import { jamRecipes } from "../../../constants/food/jam";
import { wineRecipes } from "../../../constants/food/wine";
import {
  flower,
  ingot,
  jewelryRecipes,
} from "../../../constants/town/jewelryRecipes";
import { woodRecipes } from "../../../constants/town/woodRecipes";
import IngredientTree from "../../../commons/components/IngredientTree";
import { seasonal } from "../../../constants/food/seasonal";
import { vanilla } from "../../../constants/food/vanilla";

const allSeasonalCrops = Object.values(seasonal).flat();
const crops = [...vanilla, ...allSeasonalCrops];

const allItems = [
  ...flower,
  ...ingot,
  ...crops,
  ...processedRecipes,
  ...restaurantRecipes,
  ...cafeRecipes,
  ...jamRecipes,
  ...wineRecipes,
  ...jewelryRecipes,
  ...woodRecipes,
];

const TRADE_STORAGE_KEY = "trade_board";
const TRADE_CHECKED_KEY = "trade_checked";
const GRID_SIZE = 5;
const TOTAL_CELLS = GRID_SIZE * GRID_SIZE;

const emptyCard = () => ({ items: [], query: "" });
const emptyBoard = () => Array(TOTAL_CELLS).fill(null).map(emptyCard);

const collectIngredients = (ingredients, multiplier = 1, result = {}) => {
  for (const ing of ingredients) {
    const key = ing.name;
    if (!result[key]) result[key] = { ...ing, totalCount: 0 };
    result[key].totalCount += ing.count * multiplier;
  }
  return result;
};

// 빙고 라인 (가로 5 + 세로 5 + 대각 2)
const getBingoLines = () => {
  const lines = [];
  for (let r = 0; r < GRID_SIZE; r++)
    lines.push(Array.from({ length: GRID_SIZE }, (_, c) => r * GRID_SIZE + c));
  for (let c = 0; c < GRID_SIZE; c++)
    lines.push(Array.from({ length: GRID_SIZE }, (_, r) => r * GRID_SIZE + c));
  lines.push(Array.from({ length: GRID_SIZE }, (_, i) => i * GRID_SIZE + i));
  lines.push(
    Array.from(
      { length: GRID_SIZE },
      (_, i) => i * GRID_SIZE + (GRID_SIZE - 1 - i),
    ),
  );
  return lines;
};

const BINGO_LINES = getBingoLines();

const getCompletedLines = (checked) =>
  BINGO_LINES.filter((line) => line.every((idx) => checked[idx]));

// ── Styled ───────────────────────────────────────────
const Section = styled(Box)({ width: "100%" });

const SectionHeader = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "1.25rem",
});

const SectionTitle = styled(Typography)({
  fontSize: "1.1rem",
  fontWeight: "bold",
  color: "#e8e4ff",
  fontFamily: "Mona10x12",
});

const ResetAllBtn = styled("button")({
  background: "none",
  border: "0.5px solid #3d3a52",
  color: "#5a5670",
  fontFamily: "Mona8x12",
  fontSize: "0.75rem",
  padding: "4px 12px",
  cursor: "var(--cursor-pointer)",
  "&:hover": { borderColor: "#777293", color: "#777293" },
});

const TradeGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: "0.75rem",
  [theme.breakpoints.up("xs")]: { gridTemplateColumns: "repeat(1, 1fr)" },
  [theme.breakpoints.up("sm")]: { gridTemplateColumns: "repeat(2, 1fr)" },
  [theme.breakpoints.up("md")]: { gridTemplateColumns: "repeat(3, 1fr)" },
  [theme.breakpoints.up("lg")]: { gridTemplateColumns: "repeat(5, 1fr)" },
}));

const TradeCard = styled(Box, {
  shouldForwardProp: (p) => p !== "ischecked" && p !== "isbingo",
})(({ ischecked, isbingo }) => ({
  background: isbingo
    ? "rgba(255, 235, 19, 0.04)"
    : ischecked
      ? "rgba(166, 107, 239, 0.04)"
      : "#131216",
  border: isbingo
    ? "1.5px solid #7a6e00"
    : ischecked
      ? "1.5px solid #5e3d8a"
      : "1.5px solid #3d3a52",
  padding: "0.75rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  minHeight: "120px",
  transition: "background 0.15s, border-color 0.15s",
}));

const CardHeader = styled(Box)(({ isFilled }) => ({
  display: isFilled ? "flex" : "none",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: "1px solid #3d3a52",
  paddingBottom: "0.625rem",
}));

const CardHeaderLeft = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "0.4rem",
});

const SlotLabel = styled(Typography, {
  shouldForwardProp: (p) => p !== "ischecked",
})(({ ischecked }) => ({
  fontSize: "0.5625rem",
  color: ischecked ? "#9e6bef" : "#767191",
  fontFamily: "Mona10x12",
  textTransform: "uppercase",
  letterSpacing: -0.5,
  transition: "color 0.15s",
}));

const CheckboxWrap = styled(Box, {
  shouldForwardProp: (p) => p !== "ischecked",
})(({ ischecked }) => ({
  width: "12px",
  height: "12px",
  border: ischecked ? "1.5px solid #a66bef" : "1.5px solid #3d3a52",
  background: ischecked ? "rgba(144, 107, 239, 0.15)" : "transparent",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "var(--cursor-pointer)",
  flexShrink: 0,
  transition: "border-color 0.15s, background 0.15s",
  "&:hover": { borderColor: ischecked ? "#ab6bef" : "#767191" },
}));

const ResetBtn = styled("button")({
  borderRadius: "1rem",
  background: "none",
  border: "0.9px solid #3d3a52",
  color: "#5a5670",
  fontFamily: "Mona10x12",
  fontSize: "0.625rem",
  padding: "0.3rem 0.4rem 0.3rem 0.5rem",
  cursor: "var(--cursor-pointer)",
  "&:hover": {
    borderColor: "#797794",
    color: "#737193",
    background: "#b7b3da23",
  },
});

const SearchWrap = styled(Box)({ position: "relative" });

const SearchInput = styled("input")({
  width: "100%",
  background: "#0f0e13",
  border: "1px solid #3d3a52",
  color: "#e8e4ff",
  fontFamily: "Mona8x12",
  fontSize: "0.75rem",
  padding: "0.5rem",
  boxSizing: "border-box",
  "&:focus": { outline: "none", borderColor: "#b7b3da" },
  "&::placeholder": { color: "#3d3a52" },
});

const Dropdown = styled(Box)({
  position: "absolute",
  top: "100%",
  left: 0,
  right: 0,
  background: "#0f0e13",
  border: "1px solid #3d3a52",
  borderTop: "none",
  zIndex: 200,
  maxHeight: "160px",
  overflowY: "auto",
});

const DropdownItem = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "6px",
  padding: "5px 8px",
  fontSize: "0.6875rem",
  color: "#8a86aa",
  fontFamily: "Mona8x12",
  cursor: "var(--cursor-pointer)",
  "&:hover": { background: "rgba(183,179,218,0.08)", color: "#e8e4ff" },
});

const ItemRow = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "4px",
  padding: "0.3rem 0.4rem",
  background: "rgba(183,179,218,0.04)",
  border: "1px solid #28263a",
});

const CountInput = styled("input")({
  width: "2.5rem",
  background: "#0f0e13",
  border: "1px solid #28263a",
  color: "#e8e4ff",
  fontFamily: "Mona8x12",
  fontSize: "0.625rem",
  padding: "0.3rem",
  textAlign: "center",
  "&:focus": { outline: "none", borderColor: "#b7b3da" },
  "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
    WebkitAppearance: "none",
    margin: 0,
  },
  "&::placeholder": { fontSize: "0.625rem", color: "#3d3a52" },
  MozAppearance: "textfield",
});

const BingoBadge = styled(Box)({
  display: "inline-flex",
  alignItems: "center",
  padding: "2px 6px 2px 8px",
  background: "rgba(160, 107, 239, 0.08)",
  border: "1px solid #5e3d8a",
  color: "#9b6bef",
  fontFamily: "Mona10x12",
  fontSize: "0.625rem",
  letterSpacing: "0.05em",
});

// ── Component ────────────────────────────────────────
const TradeSection = () => {
  const [board, setBoard] = useState(() => {
    try {
      const saved = localStorage.getItem(TRADE_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed[0] && "item" in parsed[0]) {
          return parsed.map((c) =>
            c.item
              ? { items: [{ item: c.item, count: c.count || 1 }], query: "" }
              : emptyCard(),
          );
        }
        return parsed;
      }
      return emptyBoard();
    } catch {
      return emptyBoard();
    }
  });

  const [checked, setChecked] = useState(() => {
    try {
      const saved = localStorage.getItem(TRADE_CHECKED_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [openDropdown, setOpenDropdown] = useState(null);
  const [expandedIngredients, setExpandedIngredients] = useState({});
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const dropdownRef = useRef(null);
  const countInputRefs = useRef({});

  useEffect(() => {
    localStorage.setItem(TRADE_STORAGE_KEY, JSON.stringify(board));
  }, [board]);

  useEffect(() => {
    localStorage.setItem(TRADE_CHECKED_KEY, JSON.stringify(checked));
  }, [checked]);

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null);
        setHighlightedIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const getFiltered = (query) => {
    if (!query.trim()) return [];
    return allItems
      .filter((item) =>
        item.name.replace(/\s/g, "").includes(query.replace(/\s/g, "")),
      )
      .slice(0, 8);
  };

  const updateQuery = (cardIdx, query) =>
    setBoard((prev) =>
      prev.map((c, i) => (i === cardIdx ? { ...c, query } : c)),
    );

  const addItemToCard = (cardIdx, item) => {
    setBoard((prev) =>
      prev.map((c, i) => {
        if (i !== cardIdx) return c;
        const exists = c.items.findIndex((it) => it.item.name === item.name);
        if (exists !== -1) {
          requestAnimationFrame(() => {
            countInputRefs.current[`${cardIdx}-${exists}`]?.focus();
            countInputRefs.current[`${cardIdx}-${exists}`]?.select();
          });
          return { ...c, query: "" };
        }
        const newIdx = c.items.length;
        requestAnimationFrame(() => {
          countInputRefs.current[`${cardIdx}-${newIdx}`]?.focus();
        });
        return { ...c, query: "", items: [...c.items, { item, count: "" }] };
      }),
    );
    setOpenDropdown(null);
    setHighlightedIndex(-1);
  };

  const updateItemCount = (cardIdx, itemIdx, count) =>
    setBoard((prev) =>
      prev.map((c, i) => {
        if (i !== cardIdx) return c;
        return {
          ...c,
          items: c.items.map((it, idx) =>
            idx === itemIdx ? { ...it, count } : it,
          ),
        };
      }),
    );

  const resetCard = (cardIdx) => {
    setBoard((prev) => prev.map((c, i) => (i === cardIdx ? emptyCard() : c)));
    setChecked((prev) => {
      const next = { ...prev };
      delete next[cardIdx];
      return next;
    });
  };

  const resetAll = () => {
    setBoard(emptyBoard());
    setChecked({});
    setExpandedIngredients({});
  };

  const toggleIngredients = (key) =>
    setExpandedIngredients((prev) => ({ ...prev, [key]: !prev[key] }));

  const toggleChecked = (idx) =>
    setChecked((prev) => ({ ...prev, [idx]: !prev[idx] }));

  // const filledCount = board.filter((c) => c.items.length > 0).length;
  const checkedCount = Object.values(checked).filter(Boolean).length;
  const bingoCount = getCompletedLines(checked).length;

  const completedLines = getCompletedLines(checked);
  const bingoCardIndices = new Set(completedLines.flat());

  return (
    <Section>
      <SectionHeader>
        <SectionTitle>
          <span style={{ fontFamily: "Mona12", fontWeight: "normal" }}>
            🚢{" "}
          </span>
          무역
        </SectionTitle>
        <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {bingoCount > 0 && <BingoBadge>BINGO x {bingoCount}</BingoBadge>}
          <Typography
            sx={{
              fontSize: "0.75rem",
              color: "#5a5670",
              fontFamily: "Mona10x12",
            }}
          >
            {/* <span style={{ color: "#a29cc2", fontWeight: "bold" }}>
              {filledCount}
            </span>
            {" / "}
            {TOTAL_CELLS} 칸 */}
            {checkedCount > 0 && (
              <span
                style={{
                  marginLeft: "0.1rem",
                  fontSize: "1rem",
                  color: "#fff475",
                  lineHeight: 1,
                  fontFamily: "Mona12",
                  fontWeight: "bold",
                  userSelect: "none",
                  marginBottom: "0.4rem",
                }}
              >
                ✓{" "}
                <span
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: "normal",
                  }}
                >
                  준비 완료:{" "}
                </span>
                <span
                  style={{
                    fontSize: "0.75rem",
                  }}
                >
                  {checkedCount}칸
                </span>
              </span>
            )}
          </Typography>
          <ResetAllBtn onClick={resetAll}>
            <span style={{ fontFamily: "Mona12" }}>↻</span> 전체 초기화
          </ResetAllBtn>
        </Box>
      </SectionHeader>

      <TradeGrid ref={dropdownRef}>
        {board.map((card, cardIdx) => {
          const filtered = getFiltered(card.query);
          const isChecked = !!checked[cardIdx];

          return (
            <TradeCard
              key={cardIdx}
              ischecked={isChecked}
              isbingo={bingoCardIndices.has(cardIdx)}
            >
              <CardHeader isFilled={card.items.length !== 0}>
                {card.items.length !== 0 && (
                  <>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.35rem",
                      }}
                    >
                      <CheckboxWrap
                        isbingo={bingoCardIndices.has(cardIdx)}
                        ischecked={isChecked}
                        onClick={() => toggleChecked(cardIdx)}
                      >
                        {isChecked && (
                          <Typography
                            sx={{
                              fontSize: "1rem",
                              color: "#ffeb13",
                              lineHeight: 1,
                              fontFamily: "Mona12",
                              fontWeight: "bold",
                              userSelect: "none",
                              marginBottom: "0.45rem",
                              marginLeft: "0.15rem",
                            }}
                          >
                            ✓
                          </Typography>
                        )}
                      </CheckboxWrap>
                      <Typography sx={{ fontSize: "0.625rem" }}>
                        준비 완료
                      </Typography>
                    </Box>
                    <ResetBtn onClick={() => resetCard(cardIdx)}>↻</ResetBtn>
                  </>
                )}
              </CardHeader>

              {/* 검색창 — items가 없을 때만 표시 */}
              {card.items.length === 0 && (
                <SearchWrap>
                  <SearchInput
                    placeholder="물품 이름 검색..."
                    value={card.query}
                    onChange={(e) => {
                      updateQuery(cardIdx, e.target.value);
                      setOpenDropdown(cardIdx);
                      setHighlightedIndex(-1);
                    }}
                    onFocus={() => {
                      if (card.query) setOpenDropdown(cardIdx);
                    }}
                    onKeyDown={(e) => {
                      const f = getFiltered(card.query);
                      if (openDropdown !== cardIdx || f.length === 0) return;
                      if (e.key === "ArrowDown") {
                        e.preventDefault();
                        setHighlightedIndex((prev) =>
                          Math.min(prev + 1, f.length - 1),
                        );
                      } else if (e.key === "ArrowUp") {
                        e.preventDefault();
                        setHighlightedIndex((prev) => Math.max(prev - 1, 0));
                      } else if (e.key === "Enter") {
                        e.preventDefault();
                        const target = f[highlightedIndex] ?? f[0];
                        if (target) addItemToCard(cardIdx, target);
                      } else if (e.key === "Escape") {
                        setOpenDropdown(null);
                        setHighlightedIndex(-1);
                      }
                    }}
                  />
                  {openDropdown === cardIdx && filtered.length > 0 && (
                    <Dropdown>
                      {filtered.map((item, idx) => (
                        <DropdownItem
                          key={item.name}
                          onMouseDown={() => addItemToCard(cardIdx, item)}
                          onMouseEnter={() => setHighlightedIndex(idx)}
                          sx={{
                            background:
                              highlightedIndex === idx
                                ? "rgba(183,179,218,0.12)"
                                : undefined,
                            color:
                              highlightedIndex === idx ? "#e8e4ff" : undefined,
                          }}
                        >
                          {item.image && (
                            <img
                              src={item.image}
                              width="14"
                              height="14"
                              style={{ imageRendering: "pixelated" }}
                              alt=""
                            />
                          )}
                          {item.name}
                        </DropdownItem>
                      ))}
                    </Dropdown>
                  )}
                </SearchWrap>
              )}

              {/* 아이템 목록 */}
              {card.items.map((orderItem, itemIdx) => {
                const ingKey = `${cardIdx}-${itemIdx}`;
                const isExpanded = expandedIngredients[ingKey];

                const scaledIngredients = orderItem.item?.ingredients
                  ? Object.values(
                      collectIngredients(
                        orderItem.item.ingredients,
                        orderItem.count || 1,
                      ),
                    ).map((ing) => ({ ...ing, count: ing.totalCount }))
                  : [];

                const hasIngredients = scaledIngredients.length > 0;

                return (
                  <Box
                    key={itemIdx}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "2px",
                    }}
                  >
                    <ItemRow>
                      <Box
                        sx={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          pb: "0.4rem",
                          borderBottom: hasIngredients
                            ? "1px solid #28263a"
                            : "none",
                        }}
                      >
                        {orderItem.item.image && (
                          <img
                            src={orderItem.item.image}
                            width="28"
                            height="28"
                            style={{
                              imageRendering: "pixelated",
                              flexShrink: 0,
                              marginRight: "0.25rem",
                            }}
                            alt=""
                          />
                        )}
                        <Typography
                          sx={{
                            fontSize: "0.75rem",
                            color: "#e8e4ff",
                            fontFamily: "Mona8x12",
                            flex: 1,
                            lineHeight: 1.2,
                          }}
                        >
                          {orderItem.item.name}
                        </Typography>
                        <CountInput
                          ref={(el) => {
                            countInputRefs.current[`${cardIdx}-${itemIdx}`] =
                              el;
                          }}
                          type="number"
                          min="1"
                          placeholder="수량"
                          value={orderItem.count === 0 ? "" : orderItem.count}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateItemCount(
                              cardIdx,
                              itemIdx,
                              val === "" ? "" : Math.max(1, Number(val)),
                            );
                          }}
                        />
                      </Box>
                      {hasIngredients && (
                        <Box
                          sx={{
                            width: "100%",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              cursor: "var(--cursor-pointer)",
                              px: "4px",
                              py: "1px",
                            }}
                            onClick={() => toggleIngredients(ingKey)}
                          >
                            <Typography
                              sx={{
                                fontSize: "0.625rem",
                                color: "#5a5670",
                                fontFamily: "Mona10x12",
                                textTransform: "uppercase",
                                letterSpacing: "0.05em",
                                padding: "0.25rem 0",
                              }}
                            >
                              재료
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "0.625rem",
                                color: "#5a5670",
                                fontFamily: "Mona12",
                              }}
                            >
                              {isExpanded ? "▲" : "▼"}
                            </Typography>
                          </Box>
                          {isExpanded && (
                            <Box sx={{ pt: "0.25rem" }}>
                              <IngredientTree ingredients={scaledIngredients} />
                            </Box>
                          )}
                        </Box>
                      )}
                    </ItemRow>
                  </Box>
                );
              })}
            </TradeCard>
          );
        })}
      </TradeGrid>
    </Section>
  );
};

export default TradeSection;
