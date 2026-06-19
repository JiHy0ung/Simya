import Egg from "../../assets/images/food/etc/egg.png";
import Meat from "../../assets/images/food/etc/meat.png";
import Milk from "../../assets/images/food/etc/milk.png";
import Oil from "../../assets/images/food/etc/oil.png";
import Salt from "../../assets/images/food/etc/salt.png";

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

import ChocoShake from "../../assets/images/food/cafe/choco_shake.png";
import ChocoMacaron from "../../assets/images/food/cafe/choco_macaron.png";
import SweetPotatoRoll from "../../assets/images/food/cafe/sweet_potato_roll.png";
import MilkRoll from "../../assets/images/food/cafe/milk_roll.png";
import MangoRoll from "../../assets/images/food/cafe/mango_roll.png";
import MelonBread from "../../assets/images/food/cafe/melon_bread.png";
import Sandwich from "../../assets/images/food/cafe/sandwich.png";
import BlueberryCake from "../../assets/images/food/cafe/blueberry_cake.png";
import StrawberryMacaron from "../../assets/images/food/cafe/strawberry_macaron.png";
import OrangeCandy from "../../assets/images/food/cafe/orange_candy.png";
import AdultCandy from "../../assets/images/food/cafe/adult_candy.png";
import LemonTart from "../../assets/images/food/cafe/lemon_tart.png";
import ChocoCreamDonut from "../../assets/images/food/cafe/choco_cream_donut.png";
import CornIcecream from "../../assets/images/food/cafe/corn_icecream.png";
import RiceCroissant from "../../assets/images/food/cafe/rice_croissant.png";

import { getItemImage } from "../../utils/getItemImage";

export const cafeRecipes = [
  {
    name: "초코 쉐이크",
    image: ChocoShake,
    price: 1734,
    craftTime: 30,
    ingredients: [
      { name: "우유", count: 1, image: Milk },
      { name: "코코아 파우더", count: 1, image: CocoaPowder },
      { name: "시럽", count: 1, image: Syrup },
    ],
  },
  {
    name: "초코 뚱카롱",
    image: ChocoMacaron,
    price: 3329,
    craftTime: 50,
    ingredients: [
      { name: "우유", count: 1, image: Milk },
      { name: "코코아 파우더", count: 1, image: CocoaPowder },
      { name: "크림", count: 1, image: Cream },
    ],
  },
  {
    name: "고구마 롤케이크",
    image: SweetPotatoRoll,
    price: 6518,
    craftTime: 50,
    ingredients: [
      { name: "고구마", count: 8, image: getItemImage("고구마") },
      { name: "우유", count: 1, image: Milk },
      { name: "시럽", count: 1, image: Syrup },
    ],
  },
  {
    name: "우유 롤케이크",
    image: MilkRoll,
    price: 4360,
    craftTime: 50,
    ingredients: [
      { name: "우유", count: 1, image: Milk },
      { name: "밀가루", count: 1, image: Flour },
      { name: "크림", count: 1, image: Cream },
    ],
  },
  {
    name: "망고 롤케이크",
    image: MangoRoll,
    price: 9393,
    craftTime: 50,
    ingredients: [
      { name: "망고", count: 12, image: getItemImage("망고") },
      { name: "우유", count: 2, image: Milk },
      { name: "시럽", count: 1, image: Syrup },
    ],
  },
  {
    name: "메론빵",
    image: MelonBread,
    price: 5161,
    craftTime: 60,
    ingredients: [
      { name: "멜론", count: 6, image: getItemImage("멜론") },
      { name: "밀가루", count: 1, image: Flour },
      { name: "설탕", count: 1, image: Sugar },
    ],
  },
  {
    name: "샌드위치",
    image: Sandwich,
    price: 4526,
    craftTime: 30,
    ingredients: [
      { name: "밀가루", count: 1, image: Flour },
      { name: "양배추", count: 8, image: getItemImage("양배추") },
      { name: "토마토", count: 8, image: getItemImage("토마토") },
    ],
  },
  {
    name: "블루베리 케이크",
    image: BlueberryCake,
    price: 5873,
    craftTime: 50,
    ingredients: [
      { name: "크림", count: 1, image: Cream },
      { name: "블루베리", count: 6, image: getItemImage("블루베리") },
      { name: "설탕", count: 1, image: Sugar },
    ],
  },
  {
    name: "딸기 마카롱",
    image: StrawberryMacaron,
    price: 4663,
    craftTime: 50,
    ingredients: [
      { name: "딸기", count: 6, image: getItemImage("딸기") },
      { name: "우유", count: 1, image: Milk },
      { name: "크림", count: 1, image: Cream },
    ],
  },
  {
    name: "오렌지 캔디",
    image: OrangeCandy,
    price: 9108,
    craftTime: 30,
    ingredients: [
      { name: "설탕", count: 1, image: Sugar },
      { name: "시럽", count: 1, image: Syrup },
      { name: "오렌지", count: 8, image: getItemImage("오렌지") },
    ],
  },
  {
    name: "어른 캔디",
    image: AdultCandy,
    price: 9108,
    craftTime: 50,
    ingredients: [
      { name: "산삼", count: 8, image: getItemImage("산삼") },
      { name: "시럽", count: 1, image: Syrup },
      { name: "설탕", count: 1, image: Sugar },
    ],
  },
  {
    name: "레몬 타르트",
    image: LemonTart,
    price: 9571,
    craftTime: 50,
    ingredients: [
      { name: "레몬", count: 8, image: getItemImage("레몬") },
      { name: "크림", count: 1, image: Cream },
      { name: "전분가루", count: 1, image: Starch },
      { name: "시럽", count: 1, image: Syrup },
    ],
  },
  {
    name: "초코 크림 도넛",
    image: ChocoCreamDonut,
    price: 3942,
    craftTime: 30,
    ingredients: [
      { name: "코코아 파우더", count: 1, image: CocoaPowder },
      { name: "우유", count: 1, image: Milk },
      { name: "설탕", count: 1, image: Sugar },
      { name: "밀가루", count: 1, image: Flour },
    ],
  },
  {
    name: "옥수수 아이스크림",
    image: CornIcecream,
    price: 5183,
    craftTime: 30,
    ingredients: [
      { name: "옥수수", count: 8, image: getItemImage("옥수수") },
      { name: "크림", count: 1, image: Cream },
      { name: "설탕", count: 1, image: Sugar },
    ],
  },
  {
    name: "쌀 크루아상",
    image: RiceCroissant,
    price: 7843,
    craftTime: 50,
    ingredients: [
      { name: "쌀가루", count: 2, image: RiceFlour },
      { name: "계란", count: 1, image: getItemImage("계란") },
      { name: "설탕", count: 1, image: Sugar },
      { name: "시럽", count: 1, image: Syrup },
    ],
  },
];
