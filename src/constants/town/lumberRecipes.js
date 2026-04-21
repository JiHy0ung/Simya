export const lumberRecipes = [
  // 1차 판자 가공
  {
    name: "버드나무 판자",
    ingredients: [{ name: "버드나무 통나무", count: 8 }],
  },
  {
    name: "단풍나무 판자",
    ingredients: [{ name: "단풍나무 통나무", count: 8 }],
  },
  {
    name: "올리브나무 판자",
    ingredients: [{ name: "올리브나무 통나무", count: 8 }],
  },
  {
    name: "사이프러스나무 판자",
    ingredients: [{ name: "사이프러스나무 통나무", count: 8 }],
  },
  {
    name: "야자나무 판자",
    ingredients: [{ name: "야자나무 통나무", count: 8 }],
  },
  {
    name: "바오밥나무 판자",
    ingredients: [{ name: "바오밥나무 통나무", count: 8 }],
  },
  {
    name: "유칼립투스 판자",
    ingredients: [{ name: "유칼립투스 통나무", count: 8 }],
  },
  {
    name: "용혈수 판자",
    ingredients: [{ name: "용혈수 통나무", count: 8 }],
  },
  // 2차 판자 합성
  {
    name: "고목나무 판자",
    ingredients: [
      { name: "올리브나무 판자", count: 4 },
      { name: "사이프러스나무 판자", count: 4 },
      { name: "참나무 원목", count: 32 },
      { name: "짙은 참나무 원목", count: 32 },
    ],
  },
  {
    name: "열대나무 판자",
    ingredients: [
      { name: "야자나무 판자", count: 4 },
      { name: "바오밥나무 판자", count: 4 },
      { name: "정글나무 원목", count: 32 },
      { name: "맹그로브나무 원목", count: 32 },
    ],
  },
  {
    name: "화산나무 판자",
    ingredients: [
      { name: "유칼립투스 판자", count: 4 },
      { name: "용혈수 판자", count: 4 },
      { name: "아카시아나무 원목", count: 32 },
      { name: "가문비나무 원목", count: 32 },
    ],
  },
  {
    name: "수양나무 판자",
    ingredients: [
      { name: "버드나무 판자", count: 4 },
      { name: "단풍나무 판자", count: 4 },
      { name: "자작나무 원목", count: 32 },
      { name: "벚꽃나무 원목", count: 32 },
    ],
  },
  // 최종 합판 제작
  {
    name: "합판",
    ingredients: [
      { name: "수양나무 판자", count: 1 },
      { name: "열대나무 판자", count: 1 },
    ],
  },
  {
    name: "고급합판",
    ingredients: [
      { name: "고목나무 판자", count: 1 },
      { name: "화산나무 판자", count: 1 },
    ],
  },
];
