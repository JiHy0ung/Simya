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

import Wanja from "../../assets/images/food/processed/wanja.png";
import Uhmuk from "../../assets/images/food/processed/uhmuk.png";
import Filet from "../../assets/images/food/processed/filet.png";

import WheatBundle from "../../assets/images/food/processed/wheat_bundle.png";
import CarrotBundle from "../../assets/images/food/processed/carrot_bundle.png";
import PotatoBundle from "../../assets/images/food/processed/potato_bundle.png";
import SugarCaneBundle from "../../assets/images/food/processed/sugarcane_bundle.png";
import BeetRootBundle from "../../assets/images/food/processed/beetroot_bundle.png";
import CocoaBeansBundle from "../../assets/images/food/processed/cocoa_bundle.png";
import PumpkinBundle from "../../assets/images/food/processed/pumpkin_bundle.png";
import WaterMelonBundle from "../../assets/images/food/processed/watermelon_bundle.png";
import NetherWartBundle from "../../assets/images/food/processed/netherwart_bundle.png";

import SmallSerenity from "../../assets/images/food/fish/small_serenity.png";
import MediumSerenity from "../../assets/images/food/fish/medium_serenity.png";
import LargeSerenity from "../../assets/images/food/fish/large_serenity.png";
import SmallBluena from "../../assets/images/food/fish/small_bluena.png";
import MediumBluena from "../../assets/images/food/fish/medium_bluena.png";
import LargeBluena from "../../assets/images/food/fish/large_bluena.png";
import SmallSunbreeze from "../../assets/images/food/fish/small_sunbreeze.png";
import MediumSunbreeze from "../../assets/images/food/fish/medium_sunbreeze.png";
import LargeSunbreeze from "../../assets/images/food/fish/large_sunbreeze.png";
import SmallFury from "../../assets/images/food/fish/small_fury.png";
import MediumFury from "../../assets/images/food/fish/medium_fury.png";
import LargeFury from "../../assets/images/food/fish/large_fury.png";

import { getItemImage } from "../../utils/getItemImage";

export const processedRecipes = [
  {
    name: "김치",
    image: Kimchi,
    price: 12989,
    craftTime: 40,
    ingredients: [
      { name: "배추", count: 8, image: getItemImage("배추") },
      { name: "양념장", count: 1, image: Seasoning },
    ],
  },
  {
    name: "밀가루",
    image: Flour,
    price: 1536,
    craftTime: 10,
    ingredients: [{ name: "밀 주머니", count: 4, image: WheatBundle }],
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
    price: 1800,
    craftTime: 10,
    ingredients: [{ name: "옥수수", count: 12, image: getItemImage("옥수수") }],
  },
  {
    name: "시럽",
    image: Syrup,
    price: 768,
    craftTime: 10,
    ingredients: [
      {
        name: "사탕수수 주머니",
        count: 6,
        image: SugarCaneBundle,
      },
    ],
  },
  {
    name: "코코아 파우더",
    image: CocoaPowder,
    price: 640,
    craftTime: 10,
    ingredients: [
      {
        name: "코코아콩 주머니",
        count: 5,
        image: CocoaBeansBundle,
      },
    ],
  },
  {
    name: "토마토케첩",
    image: Ketchup,
    price: 3730,
    craftTime: 20,
    ingredients: [
      { name: "토마토", count: 8, image: getItemImage("토마토") },
      { name: "양파", count: 4, image: getItemImage("양파") },
      { name: "설탕", count: 1, image: Sugar },
    ],
  },
  {
    name: "육수",
    image: Stock,
    price: 4948,
    craftTime: 20,
    ingredients: [
      { name: "양배추", count: 8, image: getItemImage("양배추") },
      { name: "당근 주머니", count: 4, image: CarrotBundle },
      { name: "산삼", count: 4, image: getItemImage("산삼") },
    ],
  },
  {
    name: "간장",
    image: SoySauce,
    price: 2680,
    craftTime: 20,
    ingredients: [
      { name: "콩", count: 8, image: getItemImage("콩") },
      { name: "소금", count: 2, image: getItemImage("소금") },
      { name: "설탕", count: 1, image: Sugar },
    ],
  },
  {
    name: "된장",
    image: Doenjang,
    price: 4990,
    craftTime: 20,
    ingredients: [
      { name: "콩", count: 8, image: getItemImage("콩") },
      { name: "설탕", count: 1, image: Sugar },
      { name: "고추", count: 8, image: getItemImage("고추") },
    ],
  },
  {
    name: "고추장",
    image: Gochujang,
    price: 4360,
    craftTime: 30,
    ingredients: [
      { name: "고추", count: 8, image: getItemImage("고추") },
      { name: "쌀", count: 2, image: getItemImage("쌀") },
      { name: "설탕", count: 1, image: Sugar },
    ],
  },
  {
    name: "마늘기름",
    image: GarlicOil,
    price: 5519,
    craftTime: 30,
    ingredients: [
      { name: "마늘", count: 8, image: getItemImage("마늘") },
      { name: "기름", count: 2, image: Oil },
      { name: "네더사마귀 주머니", count: 2, image: NetherWartBundle },
    ],
  },
  {
    name: "고추기름",
    image: ChiliOil,
    price: 4259,
    craftTime: 30,
    ingredients: [
      { name: "고추", count: 12, image: getItemImage("고추") },
      { name: "기름", count: 2, image: Oil },
      { name: "네더사마귀 주머니", count: 2, image: NetherWartBundle },
    ],
  },
  {
    name: "양념장",
    image: Seasoning,
    price: 8770,
    craftTime: 30,
    ingredients: [
      { name: "고추", count: 8, image: getItemImage("고추") },
      { name: "마늘", count: 8, image: getItemImage("마늘") },
      { name: "설탕", count: 1, image: Sugar },
    ],
  },
  {
    name: "크림",
    image: Cream,
    price: 2155,
    craftTime: 20,
    ingredients: [
      { name: "우유", count: 8, image: getItemImage("우유") },
      { name: "설탕", count: 1, image: Sugar },
      { name: "계란", count: 1, image: getItemImage("계란") },
    ],
  },
  {
    name: "피클",
    image: Pickle,
    price: 7510,
    craftTime: 30,
    ingredients: [
      { name: "무", count: 8, image: getItemImage("무") },
      { name: "순무", count: 8, image: getItemImage("순무") },
      { name: "비트 주머니", count: 3, image: BeetRootBundle },
    ],
  },
  {
    name: "설탕",
    image: Sugar,
    price: 1152,
    craftTime: 10,
    ingredients: [
      {
        name: "사탕수수 주머니",
        count: 3,
        image: SugarCaneBundle,
      },
      { name: "비트 주머니", count: 2, image: BeetRootBundle },
    ],
  },
  {
    name: "완자",
    image: Wanja,
    price: 7560,
    craftTime: 20,
    ingredients: [
      { name: "세레니티 소형 생선살", count: 6, image: SmallSerenity },
      { name: "블루나 소형 생선살", count: 6, image: SmallBluena },
      { name: "썬브리즈 소형 생선살", count: 6, image: SmallSunbreeze },
      { name: "퓨리 소형 생선살", count: 6, image: SmallFury },
    ],
  },
  {
    name: "어묵",
    image: Uhmuk,
    price: 6300,
    craftTime: 20,
    ingredients: [
      { name: "세레니티 중형 생선살", count: 3, image: MediumSerenity },
      { name: "블루나 중형 생선살", count: 3, image: MediumBluena },
      { name: "썬브리즈 중형 생선살", count: 3, image: MediumSunbreeze },
      { name: "퓨리 중형 생선살", count: 3, image: MediumFury },
    ],
  },
  {
    name: "모둠 생선 필렛",
    image: Filet,
    price: 5880,
    craftTime: 20,
    ingredients: [
      { name: "세레니티 대형 생선살", count: 2, image: LargeSerenity },
      { name: "블루나 대형 생선살", count: 2, image: LargeBluena },
      { name: "썬브리즈 대형 생선살", count: 2, image: LargeSunbreeze },
      { name: "퓨리 대형 생선살", count: 2, image: LargeFury },
    ],
  },
];
