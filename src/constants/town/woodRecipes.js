import Willow from "../../assets/images/wood/willow.png";
import WillowPlanks from "../../assets/images/wood/willow_planks.png";
import Maple from "../../assets/images/wood/maple.png";
import MaplePlanks from "../../assets/images/wood/maple_planks.png";
import Palm from "../../assets/images/wood/palm.png";
import PalmPlanks from "../../assets/images/wood/palm_planks.png";
import Baobab from "../../assets/images/wood/baobab.png";
import BaobabPlanks from "../../assets/images/wood/baobab_planks.png";
import Olive from "../../assets/images/wood/olive.png";
import OlivePlanks from "../../assets/images/wood/olive_planks.png";
import Cypress from "../../assets/images/wood/cypress.png";
import CypressPlanks from "../../assets/images/wood/cypress_planks.png";
import Eucalyptus from "../../assets/images/wood/eucalyptus.png";
import EucalyptusPlanks from "../../assets/images/wood/eucalyptus_planks.png";
import Dragon from "../../assets/images/wood/dragon.png";
import DragonPlanks from "../../assets/images/wood/dragon_planks.png";

import OldTreePlanks from "../../assets/images/wood/old_tree_planks.png";
import TropicalPlanks from "../../assets/images/wood/tropical_planks.png";
import VolcanicPlanks from "../../assets/images/wood/volcanic_planks.png";
import WeepingPlanks from "../../assets/images/wood/weeping_planks.png";

import Oak from "../../assets/images/wood/oak.png";
import DarkOak from "../../assets/images/wood/dark_oak.png";
import Birch from "../../assets/images/wood/birch.png";
import Acacia from "../../assets/images/wood/acacia.png";
import Mangrove from "../../assets/images/wood/mangrove.png";
import Cherry from "../../assets/images/wood/cherry.png";
import Jungle from "../../assets/images/wood/jungle.png";
import Spruce from "../../assets/images/wood/spruce.png";

import Plywood from "../../assets/images/wood/plywood.png";
import PremiumPlywood from "../../assets/images/wood/premium_plywood.png";

export const woodRecipes = [
  // 1차 목재 가공
  {
    name: "버드나무 판자",
    image: WillowPlanks,
    price: 90,
    craftTime: 5,
    ingredients: [
      { name: "버드나무 통나무", image: Willow, price: 0, count: 8 },
    ],
  },
  {
    name: "단풍나무 판자",
    image: MaplePlanks,
    price: 90,
    craftTime: 5,
    ingredients: [
      { name: "단풍나무 통나무", image: Maple, price: 0, count: 8 },
    ],
  },
  {
    name: "야자나무 판자",
    image: PalmPlanks,
    price: 100,
    craftTime: 5,
    ingredients: [{ name: "야자나무 통나무", image: Palm, price: 0, count: 8 }],
  },
  {
    name: "바오밥나무 판자",
    image: BaobabPlanks,
    price: 100,
    craftTime: 5,
    ingredients: [
      { name: "바오밥나무 통나무", image: Baobab, price: 0, count: 8 },
    ],
  },
  {
    name: "올리브나무 판자",
    image: OlivePlanks,
    price: 100,
    craftTime: 5,
    ingredients: [
      { name: "올리브나무 통나무", image: Olive, price: 0, count: 8 },
    ],
  },
  {
    name: "사이프러스나무 판자",
    image: CypressPlanks,
    price: 100,
    craftTime: 5,
    ingredients: [
      { name: "사이프러스나무 통나무", image: Cypress, price: 0, count: 8 },
    ],
  },
  {
    name: "유칼립투스 판자",
    image: EucalyptusPlanks,
    price: 100,
    craftTime: 5,
    ingredients: [
      { name: "유칼립투스 통나무", image: Eucalyptus, price: 0, count: 8 },
    ],
  },
  {
    name: "용혈수 판자",
    image: DragonPlanks,
    price: 100,
    craftTime: 5,
    ingredients: [{ name: "용혈수 통나무", image: Dragon, price: 0, count: 8 }],
  },
  // 2차 합성 목재
  {
    name: "고목나무 판자",
    image: OldTreePlanks,
    price: 1021,
    craftTime: 15,
    ingredients: [
      { name: "올리브나무 판자", image: OlivePlanks, count: 4 },
      { name: "사이프러스나무 판자", image: CypressPlanks, count: 4 },
      { name: "참나무 원목", image: Oak, price: 2, count: 32 },
      { name: "짙은 참나무 원목", image: DarkOak, price: 2, count: 32 },
    ],
  },
  {
    name: "열대나무 판자",
    image: TropicalPlanks,
    price: 1021,
    craftTime: 15,
    ingredients: [
      { name: "야자나무 판자", image: PalmPlanks, count: 4 },
      { name: "바오밥나무 판자", image: BaobabPlanks, count: 4 },
      { name: "정글나무 원목", image: Jungle, price: 2, count: 32 },
      { name: "맹그로브나무 원목", image: Mangrove, price: 2, count: 32 },
    ],
  },
  {
    name: "화산나무 판자",
    image: VolcanicPlanks,
    price: 1021,
    craftTime: 15,
    ingredients: [
      { name: "유칼립투스 판자", image: EucalyptusPlanks, count: 4 },
      { name: "용혈수 판자", image: DragonPlanks, count: 4 },
      { name: "아카시아나무 원목", image: Acacia, price: 2, count: 32 },
      { name: "가문비나무 원목", image: Spruce, price: 2, count: 32 },
    ],
  },
  {
    name: "수양나무 판자",
    image: WeepingPlanks,
    price: 933,
    craftTime: 15,
    ingredients: [
      { name: "버드나무 판자", image: WillowPlanks, count: 4 },
      { name: "단풍나무 판자", image: MaplePlanks, count: 4 },
      { name: "자작나무 원목", image: Birch, price: 2, count: 32 },
      { name: "벚나무 원목", image: Cherry, price: 2, count: 32 },
    ],
  },
  // 3차 합판
  {
    name: "합판",
    image: Plywood,
    price: 2149,
    craftTime: 30,
    ingredients: [
      { name: "수양나무 판자", image: WeepingPlanks, count: 1 },
      { name: "열대나무 판자", image: TropicalPlanks, count: 1 },
    ],
  },
  {
    name: "고급 합판",
    image: PremiumPlywood,
    price: 2246,
    craftTime: 40,
    ingredients: [
      { name: "고목나무 판자", image: OldTreePlanks, count: 1 },
      { name: "화산나무 판자", image: VolcanicPlanks, count: 1 },
    ],
  },
];
