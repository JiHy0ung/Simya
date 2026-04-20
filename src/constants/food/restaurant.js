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

import StirMeatFry from "../../assets/images/food/restaurant/stir_fried_meat.png";
import Baechujeon from "../../assets/images/food/restaurant/baechujeon.png";
import PineapplePizza from "../../assets/images/food/restaurant/pineapple_pizza.png";
import Bibimbap from "../../assets/images/food/restaurant/bibimbap.png";
import VeggieRice from "../../assets/images/food/restaurant/veggie_rice.png";
import CreamRisotto from "../../assets/images/food/restaurant/cream_risotto.png";
import TomatoPasta from "../../assets/images/food/restaurant/tomato_pasta.png";
import DoenjangStew from "../../assets/images/food/restaurant/doenjang_stew.png";
import KimchiStew from "../../assets/images/food/restaurant/kimchi_stew.png";
import GochujangStew from "../../assets/images/food/restaurant/gochujang_stew.png";
import CreamSoup from "../../assets/images/food/restaurant/cream_soup.png";
import MixedFries from "../../assets/images/food/restaurant/mixed_fries.png";
import SweetPotatoStick from "../../assets/images/food/restaurant/sweet_potato_stick.png";
import VeggieFries from "../../assets/images/food/restaurant/veggie_fries.png";
import StrawberryPunch from "../../assets/images/food/restaurant/strawberry_punch.png";
import WatermelonPunch from "../../assets/images/food/restaurant/watermelon_punch.png";
import CreamPasta from "../../assets/images/food/restaurant/cream_pasta.png";

import { getCropImage } from "../../utils/recipeUtils";

export const restaurantRecipes = [
  {
    name: "고기볶음",
    image: StirMeatFry,
    price: 10780,
    ingredients: [
      { name: "고기", count: 8, image: getCropImage("고기") },
      { name: "고추기름", count: 2, image: ChiliOil },
      { name: "마늘", count: 4, image: getCropImage("마늘") },
      { name: "파", count: 4, image: getCropImage("파") },
    ],
  },
  {
    name: "배추전",
    image: Baechujeon,
    price: 8140,
    ingredients: [
      { name: "배추", count: 8, image: getCropImage("배추") },
      { name: "마늘기름", count: 2, image: GarlicOil },
      { name: "쌀가루", count: 1, image: RiceFlour },
      { name: "계란", count: 1, image: getCropImage("계란") },
    ],
  },
  {
    name: "파인애플피자",
    image: PineapplePizza,
    price: 9669,
    ingredients: [
      { name: "파인애플", count: 8, image: getCropImage("파인애플") },
      { name: "토마토", count: 8, image: getCropImage("토마토") },
      { name: "밀가루", count: 4, image: Flour },
      { name: "피클", count: 1, image: Pickle },
    ],
  },
  {
    name: "비빔밥",
    image: Bibimbap,
    price: 8367,
    ingredients: [
      { name: "쌀", count: 16, image: getCropImage("쌀") },
      { name: "당근", count: 64, image: getCropImage("당근") },
      { name: "고추장", count: 1, image: Gochujang },
      { name: "계란", count: 1, image: getCropImage("계란") },
    ],
  },
  {
    name: "채소덮밥",
    image: VeggieRice,
    price: 9326,
    ingredients: [
      { name: "쌀", count: 16, image: getCropImage("쌀") },
      { name: "브로콜리", count: 8, image: getCropImage("브로콜리") },
      { name: "당근", count: 128, image: getCropImage("당근") },
      { name: "간장", count: 1, image: SoySauce },
    ],
  },
  {
    name: "크림리조또",
    image: CreamRisotto,
    price: 10952,
    ingredients: [
      { name: "쌀", count: 16, image: getCropImage("쌀") },
      { name: "크림", count: 1, image: Cream },
      { name: "브로콜리", count: 4, image: getCropImage("브로콜리") },
      { name: "아스파라거스", count: 4, image: getCropImage("아스파라거스") },
      { name: "아티초크", count: 4, image: getCropImage("아티초크") },
    ],
  },
  {
    name: "토마토파스타",
    image: TomatoPasta,
    price: 8019,
    ingredients: [
      { name: "밀가루", count: 2, image: Flour },
      { name: "토마토캐첩", count: 1, image: Ketchup },
      { name: "파프리카", count: 8, image: getCropImage("파프리카") },
      { name: "파슬리", count: 4, image: getCropImage("파슬리") },
    ],
  },
  {
    name: "된장찌개",
    image: DoenjangStew,
    price: 11022,
    ingredients: [
      { name: "된장", count: 1, image: Doenjang },
      { name: "육수", count: 1, image: Stock },
      { name: "양파", count: 16, image: getCropImage("양파") },
      { name: "간장", count: 1, image: SoySauce },
    ],
  },
  {
    name: "김치찌개",
    image: KimchiStew,
    price: 14036,
    ingredients: [
      { name: "김치", count: 1, image: Kimchi },
      { name: "육수", count: 1, image: Stock },
      { name: "고기", count: 2, image: getCropImage("고기") },
      { name: "마늘", count: 4, image: getCropImage("마늘") },
    ],
  },
  {
    name: "고추장찌개",
    image: GochujangStew,
    price: 9064,
    ingredients: [
      { name: "고추장", count: 1, image: Gochujang },
      { name: "육수", count: 1, image: Stock },
      { name: "감자", count: 128, image: getCropImage("감자") },
      { name: "파", count: 8, image: getCropImage("파") },
    ],
  },
  {
    name: "크림스프",
    image: CreamSoup,
    price: 4422,
    ingredients: [
      { name: "옥수수", count: 16, image: getCropImage("옥수수") },
      { name: "우유", count: 1, image: getCropImage("우유") },
      { name: "전분가루", count: 1, image: Starch },
      { name: "양파", count: 6, image: getCropImage("양파") },
      { name: "호박", count: 64, image: getCropImage("호박") },
    ],
  },
  {
    name: "모둠튀김",
    image: MixedFries,
    price: 9005,
    ingredients: [
      { name: "고구마", count: 4, image: getCropImage("고구마") },
      { name: "감자", count: 64, image: getCropImage("감자") },
      { name: "가지", count: 12, image: getCropImage("가지") },
      { name: "토마토캐첩", count: 1, image: Ketchup },
    ],
  },
  {
    name: "고구마스틱",
    image: SweetPotatoStick,
    price: 3912,
    ingredients: [
      { name: "고구마", count: 4, image: getCropImage("고구마") },
      { name: "시럽", count: 2, image: Syrup },
      { name: "기름", count: 1, image: getCropImage("기름") },
      { name: "전분가루", count: 2, image: Starch },
    ],
  },
  {
    name: "야채튀김",
    image: VeggieFries,
    price: 2011,
    ingredients: [
      { name: "감자", count: 64, image: getCropImage("감자") },
      { name: "당근", count: 64, image: getCropImage("당근") },
      { name: "전분가루", count: 2, image: Starch },
      { name: "기름", count: 1, image: getCropImage("기름") },
    ],
  },
  {
    name: "딸기화채",
    image: StrawberryPunch,
    price: 7920,
    ingredients: [
      { name: "딸기", count: 16, image: getCropImage("딸기") },
      { name: "멜론", count: 4, image: getCropImage("멜론") },
      { name: "망고", count: 2, image: getCropImage("망고") },
      { name: "바나나", count: 8, image: getCropImage("바나나") },
    ],
  },
  {
    name: "수박화채",
    image: WatermelonPunch,
    price: 9592,
    ingredients: [
      { name: "수박", count: 64, image: getCropImage("수박") },
      { name: "블루베리", count: 10, image: getCropImage("블루베리") },
      { name: "복숭아", count: 8, image: getCropImage("복숭아") },
      { name: "포도", count: 8, image: getCropImage("포도") },
    ],
  },
  {
    name: "크림파스타",
    image: CreamPasta,
    price: 6908,
    ingredients: [
      { name: "밀가루", count: 4, image: Flour },
      { name: "크림", count: 2, image: Cream },
      { name: "브로콜리", count: 4, image: getCropImage("브로콜리") },
      { name: "파슬리", count: 4, image: getCropImage("파슬리") },
    ],
  },
];
