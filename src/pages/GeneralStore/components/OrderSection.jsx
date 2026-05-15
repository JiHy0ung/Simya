import React, { useState, useEffect, useRef } from "react";
import { styled } from "@mui/material/styles";
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
import { getHeartBonus, getMaxHeartCount } from "../../../utils/heartUtils";
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

const ORDER_STORAGE_KEY = "order_slots";
const MEMBERSHIP_KEY = "membership_count";
const EXPANSION_KEY = "expansion_count";

const MEMBERSHIP_OPTIONS = [
  { label: "일반 (3개)", value: 3 },
  { label: "프리미엄 (4개)", value: 4 },
  { label: "프리미엄+ (5개)", value: 5 },
];

const EXPANSION_OPTIONS = [
  { label: "확장권 +0 (0개)", value: 0 },
  { label: "확장권 +1 (1개)", value: 1 },
  { label: "확장권 +2 (2개)", value: 2 },
];

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
  padding: "6px 12px",
  cursor: "var(--cursor-pointer)",
  "&:hover": { borderColor: "#777293", color: "#777293" },
});

const Select = styled("select")({
  background: "#0f0e13",
  border: "1px solid #3d3a52",
  color: "#c4c0da",
  fontFamily: "Mona10x12",
  letterSpacing: -0.5,
  fontSize: "0.75rem",
  padding: "5px 8px",
  cursor: "var(--cursor-pointer)",
  "&:focus": { outline: "none", borderColor: "#b7b3da" },
});

const OrderGrid = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
  gap: "1rem",
});

const OrderCard = styled(Box)({
  height: "fit-content",
  background: "#131216",
  border: "1.5px solid #3d3a52",
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.75rem",
});

const OrderCardHeader = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: "1px solid #3d3a52",
  paddingBottom: "0.5rem",
});

const SlotLabel = styled(Typography)({
  fontSize: "0.6875rem",
  color: "#767191",
  fontFamily: "Mona10x12",
  textTransform: "uppercase",
  letterSpacing: -0.5,
});

const ResetBtn = styled("button")({
  display: "flex",
  gap: "0.25rem",
  background: "none",
  border: "0.5px solid #3d3a52",
  color: "#5a5670",
  fontFamily: "Mona10x12",
  fontSize: "0.625rem",
  padding: "4px 7px 4px 8px",
  cursor: "var(--cursor-pointer)",
  "&:hover": { borderColor: "#b7b3da", color: "#b7b3da" },
});

const SearchWrap = styled(Box)({ position: "relative" });

const SearchInput = styled("input")({
  width: "100%",
  background: "#0f0e13",
  border: "1px solid #3d3a52",
  color: "#e8e4ff",
  fontFamily: "Mona8x12",
  fontSize: "0.8125rem",
  padding: "7px 10px",
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
  zIndex: 100,
  maxHeight: "180px",
  overflowY: "auto",
});

const DropdownItem = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "6px 10px",
  fontSize: "0.8125rem",
  color: "#8a86aa",
  fontFamily: "Mona8x12",
  cursor: "var(--cursor-pointer)",
  "&:hover": { background: "rgba(183,179,218,0.08)", color: "#e8e4ff" },
});

const CountInput = styled("input")({
  width: "2.25rem",
  background: "#0f0e13",
  border: "1px solid #3d3a52",
  color: "#e8e4ff",
  fontFamily: "Mona8x12",
  fontSize: "0.8125rem",
  padding: "0.2rem 0.5rem",
  textAlign: "center",
  "&:focus": { outline: "none", borderColor: "#b7b3da" },
  "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
    WebkitAppearance: "none",
    margin: 0,
  },
  "&::placeholder": {
    fontSize: "0.75rem",
  },
  MozAppearance: "textfield",
});

const SelectedItem = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "8px",
  padding: "0.625rem",
  background: "rgba(183,179,218,0.06)",
  border: "1px solid #3d3a52",
});

const OrderSection = () => {
  const [membershipCount, setMembershipCount] = useState(() =>
    parseInt(localStorage.getItem(MEMBERSHIP_KEY) || "3"),
  );
  const [expansionCount, setExpansionCount] = useState(() =>
    parseInt(localStorage.getItem(EXPANSION_KEY) || "0"),
  );
  const slotCount = membershipCount + expansionCount;

  useEffect(() => {
    localStorage.setItem(MEMBERSHIP_KEY, String(membershipCount));
  }, [membershipCount]);
  useEffect(() => {
    localStorage.setItem(EXPANSION_KEY, String(expansionCount));
  }, [expansionCount]);

  // 슬롯: { items: [...], query: "" }
  // 검색창은 슬롯당 하나, 선택된 아이템은 items 배열에 쌓임
  const [slots, setSlots] = useState(() => {
    try {
      const saved = localStorage.getItem(ORDER_STORAGE_KEY);
      return saved
        ? JSON.parse(saved)
        : Array(7)
            .fill(null)
            .map(() => ({ items: [], query: "" }));
    } catch {
      return Array(7)
        .fill(null)
        .map(() => ({ items: [], query: "" }));
    }
  });

  const [openDropdown, setOpenDropdown] = useState(null);
  const [expandedIngredients, setExpandedIngredients] = useState({});
  const dropdownRef = useRef(null);

  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const countInputRefs = useRef({}); // { "slotIdx-itemIdx": ref }

  const justSelectedRef = useRef(false);

  // const heartBonus = getHeartBonus();
  // const maxHeartCount = getMaxHeartCount();

  useEffect(() => {
    localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(slots));
  }, [slots]);

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const getFilteredItems = (query) => {
    if (!query.trim()) return [];
    return allItems
      .filter((item) =>
        item.name.replace(/\s/g, "").includes(query.replace(/\s/g, "")),
      )
      .slice(0, 10);
  };

  const updateSlotQuery = (slotIdx, query) => {
    setSlots((prev) =>
      prev.map((slot, i) => (i === slotIdx ? { ...slot, query } : slot)),
    );
  };

  // 드롭다운에서 선택 → items에 추가, 이미 있으면 count +1
  const addItemToSlot = (slotIdx, item) => {
    setSlots((prev) =>
      prev.map((slot, i) => {
        if (i !== slotIdx) return slot;
        const exists = slot.items.findIndex((it) => it.item.name === item.name);
        if (exists !== -1) {
          // 이미 있으면 포커스만
          requestAnimationFrame(() => {
            countInputRefs.current[`${slotIdx}-${exists}`]?.focus();
            countInputRefs.current[`${slotIdx}-${exists}`]?.select();
          });
          return { ...slot, query: "" };
        }
        const newIdx = slot.items.length;
        requestAnimationFrame(() => {
          countInputRefs.current[`${slotIdx}-${newIdx}`]?.focus();
        });
        return {
          ...slot,
          query: "",
          items: [...slot.items, { item, count: "" }], // 기본값 빈칸
        };
      }),
    );
    setOpenDropdown(null);
  };

  const updateItemCount = (slotIdx, itemIdx, count) => {
    setSlots((prev) =>
      prev.map((slot, i) => {
        if (i !== slotIdx) return slot;
        return {
          ...slot,
          items: slot.items.map((it, idx) =>
            idx === itemIdx ? { ...it, count } : it,
          ),
        };
      }),
    );
  };

  const removeItem = (slotIdx, itemIdx) => {
    setSlots((prev) =>
      prev.map((slot, i) => {
        if (i !== slotIdx) return slot;
        return {
          ...slot,
          items: slot.items.filter((_, idx) => idx !== itemIdx),
        };
      }),
    );
  };

  const resetSlot = (slotIdx) => {
    setSlots((prev) =>
      prev.map((s, i) => (i === slotIdx ? { items: [], query: "" } : s)),
    );
  };

  const toggleIngredients = (key) => {
    setExpandedIngredients((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const resetAllSlots = () => {
    setSlots(
      Array(7)
        .fill(null)
        .map(() => ({ items: [], query: "" })),
    );
  };

  return (
    <Section>
      {/* <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "right",
          gap: "8px",
          pb: "1.25rem",
        }}
      >
        {heartBonus > 0 && (
          <Typography
            sx={{
              fontSize: "0.75rem",
              color: "#6befc3",
              fontFamily: "Mona10x12",
            }}
          >
            호감도 보너스 +{heartBonus}%{" "}
            <span
              style={{
                fontFamily: "Mona10x12",
                color: "#b8b8b8",
                fontSize: "0.625rem",
              }}
            >
              ({maxHeartCount}명 MAX)
            </span>
          </Typography>
        )}
        <Select
          value={membershipCount}
          onChange={(e) => setMembershipCount(Number(e.target.value))}
        >
          {MEMBERSHIP_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </Select>
        <Select
          value={expansionCount}
          onChange={(e) => setExpansionCount(Number(e.target.value))}
        >
          {EXPANSION_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </Select>
      </Box> */}

      <SectionHeader>
        <SectionTitle>
          <span style={{ fontFamily: "Mona12", fontWeight: "normal" }}>📜</span>{" "}
          주문
        </SectionTitle>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.625rem",
          }}
        >
          <Select
            value={membershipCount}
            onChange={(e) => setMembershipCount(Number(e.target.value))}
          >
            {MEMBERSHIP_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </Select>
          <Select
            value={expansionCount}
            onChange={(e) => setExpansionCount(Number(e.target.value))}
          >
            {EXPANSION_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </Select>
          <ResetAllBtn onClick={resetAllSlots}>
            <span style={{ fontFamily: "Mona12" }}>↻</span> 전체 초기화
          </ResetAllBtn>
        </Box>
      </SectionHeader>

      <OrderGrid ref={dropdownRef}>
        {Array.from({ length: slotCount }).map((_, slotIdx) => {
          const slot = slots[slotIdx] ?? { items: [], query: "" };
          const filtered = getFilteredItems(slot.query);

          return (
            <OrderCard key={slotIdx}>
              <OrderCardHeader>
                <SlotLabel>주문 {slotIdx + 1}</SlotLabel>
                <ResetBtn onClick={() => resetSlot(slotIdx)}>
                  <span style={{ fontFamily: "Mona12" }}>↻</span> 초기화
                </ResetBtn>
              </OrderCardHeader>

              {/* 검색창 — 슬롯당 하나, 항상 아이템 목록 아래 */}
              {slot.items.length < 5 && (
                <SearchWrap>
                  <SearchInput
                    placeholder="물품 이름 검색..."
                    value={slot.query}
                    onChange={(e) => {
                      if (justSelectedRef.current) return; // 방금 선택한 직후면 무시
                      updateSlotQuery(slotIdx, e.target.value);
                      setOpenDropdown(slotIdx);
                      setHighlightedIndex(-1);
                    }}
                    onFocus={() => {
                      if (slot.query) setOpenDropdown(slotIdx);
                    }}
                    onKeyDown={(e) => {
                      if (openDropdown !== slotIdx || filtered.length === 0)
                        return;
                      if (e.key === "ArrowDown") {
                        e.preventDefault();
                        setHighlightedIndex((prev) =>
                          Math.min(prev + 1, filtered.length - 1),
                        );
                      } else if (e.key === "ArrowUp") {
                        e.preventDefault();
                        setHighlightedIndex((prev) => Math.max(prev - 1, 0));
                      } else if (e.key === "Enter") {
                        e.preventDefault();
                        e.stopPropagation();
                        const target =
                          filtered[highlightedIndex] ?? filtered[0];
                        if (target) {
                          justSelectedRef.current = true; // 플래그 설정
                          addItemToSlot(slotIdx, target);
                          setHighlightedIndex(-1);
                          const newItemIdx = slots[slotIdx].items.findIndex(
                            (it) => it.item.name === target.name,
                          );
                          const key = `${slotIdx}-${newItemIdx !== -1 ? newItemIdx : slots[slotIdx].items.length}`;
                          requestAnimationFrame(() => {
                            countInputRefs.current[key]?.focus();
                            justSelectedRef.current = false; // 플래그 해제
                          });
                        }
                      } else if (e.key === "Escape") {
                        setOpenDropdown(null);
                        setHighlightedIndex(-1);
                      }
                    }}
                  />

                  {openDropdown === slotIdx && filtered.length > 0 && (
                    <Dropdown>
                      {filtered.map((item, idx) => (
                        <DropdownItem
                          key={item.name}
                          onMouseDown={() => {
                            addItemToSlot(slotIdx, item);
                            setHighlightedIndex(-1);
                          }}
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
                              width="16"
                              height="16"
                              style={{ imageRendering: "pixelated" }}
                              alt=""
                            />
                          )}
                          {item.name}
                          <span
                            style={{
                              color: "#5a5670",
                              fontSize: "0.625rem",
                              marginLeft: "auto",
                            }}
                          >
                            {item.price?.toLocaleString()}G
                          </span>
                        </DropdownItem>
                      ))}
                    </Dropdown>
                  )}
                </SearchWrap>
              )}

              {/* 아이템 목록 */}
              {slot.items.map((orderItem, itemIdx) => {
                const ingKey = `${slotIdx}-${itemIdx}`;
                const isExpanded = expandedIngredients[ingKey];
                const scaledIngredients = orderItem.item?.ingredients
                  ? orderItem.item.ingredients.map((ing) => ({
                      ...ing,
                      count: ing.count * (orderItem.count || 1),
                    }))
                  : [];

                return (
                  <Box
                    key={itemIdx}
                    sx={{
                      pb: "0.75rem",
                      borderBottom:
                        itemIdx !== slot.items.length - 1
                          ? "1px solid #28263a"
                          : "none",
                    }}
                  >
                    <SelectedItem>
                      <Box
                        sx={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          borderBottom:
                            orderItem.item.ingredients &&
                            orderItem.item.ingredients.length !== 0
                              ? "1px solid #3d3a52"
                              : "none",

                          pb:
                            orderItem.item.ingredients &&
                            orderItem.item.ingredients.length !== 0
                              ? "0.625rem"
                              : 0,
                        }}
                      >
                        {orderItem.item.image && (
                          <img
                            src={orderItem.item.image}
                            width="24"
                            height="24"
                            style={{ imageRendering: "pixelated" }}
                            alt=""
                          />
                        )}
                        <Typography
                          sx={{
                            fontSize: "0.8125rem",
                            color: "#e8e4ff",
                            fontFamily: "Mona8x12",
                            flex: 1,
                          }}
                        >
                          {orderItem.item.name}
                        </Typography>
                        <CountInput
                          ref={(el) => {
                            countInputRefs.current[`${slotIdx}-${itemIdx}`] =
                              el;
                          }}
                          type="number"
                          min="1"
                          placeholder="수량"
                          value={orderItem.count === 0 ? "" : orderItem.count}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateItemCount(
                              slotIdx,
                              itemIdx,
                              val === "" ? "" : Math.max(1, Number(val)),
                            );
                          }}
                        />
                        <Typography
                          sx={{
                            fontSize: "0.75rem",
                            color: "#5a5670",
                            fontFamily: "Mona8x12",
                          }}
                        >
                          개
                        </Typography>
                        <ResetBtn
                          onClick={() => removeItem(slotIdx, itemIdx)}
                          sx={{
                            fontWeight: "bold",
                            background: "#151518",
                            fontSize: "0.45rem",
                            lineHeight: "0.75rem",
                          }}
                        >
                          ✕
                        </ResetBtn>
                      </Box>

                      {orderItem.item?.ingredients?.length > 0 && (
                        <Box sx={{ width: "100%" }}>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              cursor: "var(--cursor-pointer)",
                              p: "0.25rem 0.5rem",
                            }}
                            onClick={() => toggleIngredients(ingKey)}
                          >
                            <Typography
                              sx={{
                                fontSize: "0.6875rem",
                                color: "#777199",
                                fontFamily: "Mona10x12",
                                textTransform: "uppercase",
                                letterSpacing: "0.05em",
                              }}
                            >
                              재료
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "0.5rem",
                                color: "#5a5670",
                                fontFamily: "Mona12",
                              }}
                            >
                              {isExpanded ? "▲" : "▼"}
                            </Typography>
                          </Box>
                          {isExpanded && (
                            <Box sx={{ px: "0.5rem", pt: "0.25rem" }}>
                              <IngredientTree ingredients={scaledIngredients} />
                            </Box>
                          )}
                        </Box>
                      )}
                    </SelectedItem>
                  </Box>
                );
              })}
            </OrderCard>
          );
        })}
      </OrderGrid>
    </Section>
  );
};

export default OrderSection;
