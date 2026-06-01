import Kimchi from "../../assets/images/food/processed/kimchi.png";
import Flour from "../../assets/images/food/processed/flour.png";
import RiceFlour from "../../assets/images/food/processed/rice_flour.png";
import Starch from "../../assets/images/food/processed/starch.png";
import Syrup from "../../assets/images/food/processed/syrup.png";
import CocoaPowder from "../../assets/images/food/processed/cocoa_powder.png";
import Ketchup from "../../assets/images/food/processed/ketchup.png";
import Stock from "../../assets/images/food/processed/stock.png";
import SoySauce from "../../assets/images/food/processed/soy_sauce.png";
import Doenjang from "../../assets/images/food/processed/doenjang.png";
import Gochujang from "../../assets/images/food/processed/gochujang.png";
import GarlicOil from "../../assets/images/food/processed/garlic_oil.png";
import ChiliOil from "../../assets/images/food/processed/chili_oil.png";
import Seasoning from "../../assets/images/food/processed/seasoning_sauce.png";
import Cream from "../../assets/images/food/processed/cream.png";
import Pickle from "../../assets/images/food/processed/pickle.png";
import Sugar from "../../assets/images/food/processed/sugar.png";
import Oil from "../../assets/images/food/etc/oil.png";
import { getItemImage } from "../../utils/getItemImage";

export const processedRecipes = [
  {
    name: "김치",
    image: Kimchi,
    price: 12049,
    craftTime: 40,
    ingredients: [
      { name: "배추", count: 8, image: getItemImage("배추") },
      { name: "양념장", count: 1, image: Seasoning },
    ],
  },
  {
    name: "밀가루",
    image: Flour,
    price: 384,
    craftTime: 10,
    ingredients: [{ name: "밀", count: 128, image: getItemImage("밀") }],
  },
  {
    name: "쌀가루",
    image: RiceFlour,
    price: 2400,
    craftTime: 20,
    ingredients: [{ name: "쌀", count: 8, image: getItemImage("쌀") }],
  },
  {
    name: "전분가루",
    image: Starch,
    price: 1200,
    craftTime: 10,
    ingredients: [{ name: "옥수수", count: 8, image: getItemImage("옥수수") }],
  },
  {
    name: "시럽",
    image: Syrup,
    price: 128,
    craftTime: 10,
    ingredients: [
      { name: "사탕수수", count: 128, image: getItemImage("사탕수수") },
    ],
  },
  {
    name: "코코아가루",
    image: CocoaPowder,
    price: 128,
    craftTime: 10,
    ingredients: [
      { name: "코코아콩", count: 128, image: getItemImage("코코아콩") },
    ],
  },
  {
    name: "토마토케첩",
    image: Ketchup,
    price: 4049,
    craftTime: 20,
    ingredients: [
      { name: "토마토", count: 16, image: getItemImage("토마토") },
      { name: "양파", count: 4, image: getItemImage("양파") },
      { name: "설탕", count: 1, image: Sugar },
    ],
  },
  {
    name: "육수",
    image: Stock,
    price: 3217,
    craftTime: 20,
    ingredients: [
      { name: "양배추", count: 4, image: getItemImage("양배추") },
      { name: "당근", count: 64, image: getItemImage("당근") },
      { name: "양파", count: 4, image: getItemImage("양파") },
      { name: "파", count: 4, image: getItemImage("파") },
    ],
  },
  {
    name: "간장",
    image: SoySauce,
    price: 3885,
    craftTime: 20,
    ingredients: [
      { name: "콩", count: 16, image: getItemImage("콩") },
      { name: "쌀", count: 4, image: getItemImage("쌀") },
      { name: "소금", count: 1, image: getItemImage("소금") },
    ],
  },
  {
    name: "된장",
    image: Doenjang,
    price: 2730,
    craftTime: 20,
    ingredients: [
      { name: "콩", count: 16, image: getItemImage("콩") },
      { name: "소금", count: 2, image: getItemImage("소금") },
    ],
  },
  {
    name: "고추장",
    image: Gochujang,
    price: 5939,
    craftTime: 30,
    ingredients: [
      { name: "고추", count: 16, image: getItemImage("고추") },
      { name: "쌀", count: 2, image: getItemImage("쌀") },
      { name: "설탕", count: 1, image: Sugar },
    ],
  },
  {
    name: "마늘기름",
    image: GarlicOil,
    price: 5145,
    craftTime: 30,
    ingredients: [
      { name: "마늘", count: 8, image: getItemImage("마늘") },
      { name: "기름", count: 1, image: Oil },
    ],
  },
  {
    name: "고추기름",
    image: ChiliOil,
    price: 5145,
    craftTime: 30,
    ingredients: [
      { name: "고추", count: 16, image: getItemImage("고추") },
      { name: "기름", count: 1, image: Oil },
    ],
  },
  {
    name: "양념장",
    image: Seasoning,
    price: 7875,
    craftTime: 30,
    ingredients: [
      { name: "고추", count: 10, image: getItemImage("고추") },
      { name: "마늘", count: 5, image: getItemImage("마늘") },
      { name: "파", count: 5, image: getItemImage("파") },
    ],
  },
  {
    name: "크림",
    image: Cream,
    price: 1956,
    craftTime: 20,
    ingredients: [
      { name: "우유", count: 16, image: getItemImage("우유") },
      { name: "설탕", count: 1, image: Sugar },
      { name: "계란", count: 1, image: getItemImage("계란") },
    ],
  },
  {
    name: "피클",
    image: Pickle,
    price: 6703,
    craftTime: 30,
    ingredients: [
      { name: "비트", count: 128, image: getItemImage("비트") },
      { name: "무", count: 8, image: getItemImage("무") },
      { name: "순무", count: 8, image: getItemImage("순무") },
    ],
  },
  {
    name: "설탕",
    image: Sugar,
    price: 256,
    craftTime: 10,
    ingredients: [
      { name: "사탕수수", count: 64, image: getItemImage("사탕수수") },
      { name: "비트", count: 64, image: getItemImage("비트") },
    ],
  },
];
