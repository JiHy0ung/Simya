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

import SeafoodPancake from "../../assets/images/food/restaurant/seafoodpancake.png";
import SpicyRawFish from "../../assets/images/food/restaurant/spicyrawfish.png";
import Sushi from "../../assets/images/food/restaurant/sushi.png";
import FishCroquettes from "../../assets/images/food/restaurant/fishcroquettes.png";
import GrilledFish from "../../assets/images/food/restaurant/grilledfish.png";
import FishBurger from "../../assets/images/food/restaurant/FishBurger.png";
import SpicyFishStew from "../../assets/images/food/restaurant/SpicyFishStew.png";
import RawFishBowl from "../../assets/images/food/restaurant/RawFishBowl.png";
import Tteokbbokki from "../../assets/images/food/restaurant/Tteokbbokki.png";
import FishSalad from "../../assets/images/food/restaurant/FishSalad.png";

import NoImage from "../../assets/images/no_image.png";

import { getItemImage } from "../../utils/getItemImage";

export const restaurantRecipes = [
  {
    name: "고기볶음",
    image: StirMeatFry,
    price: 13060,
    craftTime: 100,
    ingredients: [
      { name: "고기", count: 8, image: getItemImage("고기") },
      { name: "고추기름", count: 1, image: ChiliOil },
      { name: "마늘", count: 8, image: getItemImage("마늘") },
      { name: "당근 주머니", count: 8, image: CarrotBundle },
    ],
  },
  {
    name: "배추전",
    image: Baechujeon,
    price: 17226,
    craftTime: 100,
    ingredients: [
      { name: "마늘기름", count: 1, image: GarlicOil },
      { name: "배추", count: 16, image: getItemImage("배추") },
      { name: "밀가루", count: 1, image: Flour },
      { name: "계란", count: 1, image: getItemImage("계란") },
    ],
  },
  {
    name: "파인애플피자",
    image: PineapplePizza,
    price: 16615,
    craftTime: 100,
    ingredients: [
      { name: "파인애플", count: 8, image: getItemImage("파인애플") },
      { name: "토마토", count: 8, image: getItemImage("토마토") },
      { name: "밀가루", count: 1, image: Flour },
      { name: "피클", count: 1, image: Pickle },
    ],
  },
  {
    name: "생선 샐러드",
    image: FishSalad,
    price: 19555,
    craftTime: 100,
    ingredients: [
      { name: "완자", count: 1, image: Wanja },
      { name: "레몬", count: 12, image: getItemImage("레몬") },
      { name: "양파", count: 6, image: getItemImage("양파") },
      { name: "비트 주머니", count: 4, image: BeetRootBundle },
    ],
  },
  {
    name: "떡볶이",
    image: Tteokbbokki,
    price: 17400,
    craftTime: 100,
    ingredients: [
      { name: "어묵", count: 1, image: Uhmuk },
      { name: "밀 주머니", count: 10, image: WheatBundle },
      { name: "고추장", count: 1, image: Gochujang },
    ],
  },
  {
    name: "회덮밥",
    image: RawFishBowl,
    price: 15134,
    craftTime: 100,
    ingredients: [
      { name: "블루나 소형 생선살", count: 10, image: SmallBluena },
      { name: "세레니티 중형 생선살", count: 5, image: MediumSerenity },
      { name: "당근 주머니", count: 4, image: CarrotBundle },
      { name: "쌀", count: 12, image: getItemImage("쌀") },
      { name: "아티초크", count: 4, image: getItemImage("아티초크") },
    ],
  },
  {
    name: "매운탕",
    image: SpicyFishStew,
    price: 15874,
    craftTime: 100,
    ingredients: [
      { name: "모둠 생선 필렛", count: 1, image: Filet },
      { name: "무", count: 8, image: getItemImage("무") },
      { name: "육수", count: 1, image: Stock },
    ],
  },
  {
    name: "피시버거",
    image: FishBurger,
    price: 21367,
    craftTime: 100,
    ingredients: [
      { name: "완자", count: 1, image: Wanja },
      { name: "토마토", count: 8, image: getItemImage("토마토") },
      { name: "밀 주머니", count: 4, image: WheatBundle },
      { name: "피클", count: 1, image: Pickle },
    ],
  },
  {
    name: "생선 구이",
    image: GrilledFish,
    price: 14870,
    craftTime: 100,
    ingredients: [
      { name: "모둠 생선 필렛", count: 1, image: Filet },
      { name: "감자 주머니", count: 4, image: PotatoBundle },
      { name: "토마토", count: 8, image: getItemImage("토마토") },
      { name: "아스파라거스", count: 8, image: getItemImage("아스파라거스") },
    ],
  },
  {
    name: "생선 고로켓",
    image: FishCroquettes,
    price: 8736,
    craftTime: 100,
    ingredients: [
      { name: "퓨리 소형 생선살", count: 10, image: SmallFury },
      { name: "썬브리즈 소형 생선살", count: 10, image: SmallSunbreeze },
      { name: "감자 주머니", count: 5, image: PotatoBundle },
      { name: "당근 주머니", count: 5, image: CarrotBundle },
    ],
  },
  {
    name: "초밥 세트",
    image: Sushi,
    price: 15576,
    craftTime: 100,
    ingredients: [
      { name: "세레니티 중형 생선살", count: 6, image: MediumSerenity },
      { name: "블루나 중형 생선살", count: 5, image: MediumBluena },
      { name: "쌀", count: 16, image: getItemImage("쌀") },
      { name: "간장", count: 1, image: SoySauce },
    ],
  },
  {
    name: "물회",
    image: SpicyRawFish,
    price: 12461,
    craftTime: 100,
    ingredients: [
      { name: "썬브리즈 중형 생선살", count: 5, image: MediumSunbreeze },
      { name: "퓨리 중형 생선살", count: 5, image: MediumFury },
      { name: "고추장", count: 1, image: Gochujang },
      { name: "당근 주머니", count: 4, image: CarrotBundle },
      { name: "수박 주머니", count: 2, image: WaterMelonBundle },
    ],
  },
  {
    name: "해물 파전",
    image: SeafoodPancake,
    price: 7085,
    craftTime: 100,
    ingredients: [
      { name: "호박 주머니", count: 3, image: PumpkinBundle },
      { name: "파", count: 8, image: getItemImage("파") },
      { name: "밀가루", count: 1, image: Flour },
      { name: "세레니티 소형 생선살", count: 6, image: SmallSerenity },
    ],
  },
  {
    name: "비빔밥",
    image: Bibimbap,
    price: 11880,
    craftTime: 100,
    ingredients: [
      { name: "쌀", count: 16, image: getItemImage("쌀") },
      { name: "당근 주머니", count: 5, image: CarrotBundle },
      { name: "고추장", count: 1, image: Gochujang },
      { name: "계란", count: 1, image: getItemImage("계란") },
    ],
  },
  {
    name: "채소덮밥",
    image: VeggieRice,
    price: 14064,
    craftTime: 100,
    ingredients: [
      { name: "쌀", count: 16, image: getItemImage("쌀") },
      { name: "브로콜리", count: 8, image: getItemImage("브로콜리") },
      { name: "당근 주머니", count: 5, image: CarrotBundle },
      { name: "간장", count: 1, image: SoySauce },
    ],
  },
  {
    name: "크림리조또",
    image: CreamRisotto,
    price: 15258,
    craftTime: 100,
    ingredients: [
      { name: "크림", count: 1, image: Cream },
      { name: "쌀", count: 8, image: getItemImage("쌀") },
      { name: "완자", count: 1, image: Wanja },
      { name: "파슬리", count: 4, image: getItemImage("파슬리") },
    ],
  },
  {
    name: "토마토파스타",
    image: TomatoPasta,
    price: 14239,
    craftTime: 100,
    ingredients: [
      { name: "밀가루", count: 1, image: Flour },
      { name: "토마토케첩", count: 1, image: Ketchup },
      { name: "파프리카", count: 10, image: getItemImage("파프리카") },
      { name: "파슬리", count: 4, image: getItemImage("파슬리") },
    ],
  },
  {
    name: "된장찌개",
    image: DoenjangStew,
    price: 12540,
    craftTime: 100,
    ingredients: [
      { name: "된장", count: 1, image: Doenjang },
      { name: "육수", count: 1, image: Stock },
      { name: "감자 주머니", count: 4, image: PotatoBundle },
    ],
  },
  {
    name: "김치찌개",
    image: KimchiStew,
    price: 21764,
    craftTime: 100,
    ingredients: [
      { name: "김치", count: 1, image: Kimchi },
      { name: "육수", count: 1, image: Stock },
      { name: "고기", count: 2, image: getItemImage("고기") },
    ],
  },
  {
    name: "고추장찌개",
    image: GochujangStew,
    price: 14664,
    craftTime: 100,
    ingredients: [
      { name: "고추장", count: 1, image: Gochujang },
      { name: "육수", count: 1, image: Stock },
      { name: "감자  주머니", count: 4, image: NoImage },
      { name: "파", count: 8, image: getItemImage("파") },
    ],
  },
  {
    name: "크림수프",
    image: CreamSoup,
    price: 8855,
    craftTime: 60,
    ingredients: [
      { name: "옥수수", count: 16, image: getItemImage("옥수수") },
      { name: "크림", count: 1, image: Cream },
      { name: "양파", count: 6, image: getItemImage("양파") },
      { name: "호박 주머니", count: 4, image: PumpkinBundle },
    ],
  },
  {
    name: "모듬튀김",
    image: MixedFries,
    price: 15324,
    craftTime: 100,
    ingredients: [
      { name: "고구마", count: 8, image: getItemImage("고구마") },
      { name: "감자 주머니", count: 5, image: PotatoBundle },
      { name: "가지", count: 8, image: getItemImage("가지") },
      { name: "토마토케첩", count: 1, image: Ketchup },
    ],
  },
  {
    name: "고구마스틱",
    image: SweetPotatoStick,
    price: 10402,
    craftTime: 60,
    ingredients: [
      { name: "고구마", count: 10, image: getItemImage("고구마") },
      { name: "시럽", count: 1, image: Syrup },
      { name: "기름", count: 1, image: getItemImage("기름") },
      { name: "전분가루", count: 1, image: Starch },
    ],
  },
  {
    name: "야채튀김",
    image: VeggieFries,
    price: 5362,
    craftTime: 40,
    ingredients: [
      { name: "감자 주머니", count: 3, image: PotatoBundle },
      { name: "당근 주머니", count: 3, image: CarrotBundle },
      { name: "전분가루", count: 2, image: Starch },
      { name: "기름", count: 1, image: getItemImage("기름") },
    ],
  },
  {
    name: "딸기화채",
    image: StrawberryPunch,
    price: 8122,
    craftTime: 100,
    ingredients: [
      { name: "딸기", count: 8, image: getItemImage("딸기") },
      { name: "바나나", count: 8, image: getItemImage("바나나") },
      { name: "시럽", count: 1, image: Syrup },
    ],
  },
  {
    name: "수박화채",
    image: WatermelonPunch,
    price: 10229,
    craftTime: 100,
    ingredients: [
      { name: "수박 주머니", count: 4, image: WaterMelonBundle },
      { name: "블루베리", count: 5, image: getItemImage("블루베리") },
      { name: "복숭아", count: 5, image: getItemImage("복숭아") },
      { name: "포도", count: 5, image: getItemImage("포도") },
    ],
  },
  {
    name: "크림파스타",
    image: CreamPasta,
    price: 10189,
    craftTime: 100,
    ingredients: [
      { name: "밀가루", count: 1, image: Flour },
      { name: "크림", count: 1, image: Cream },
      { name: "브로콜리", count: 8, image: getItemImage("브로콜리") },
      { name: "파슬리", count: 8, image: getItemImage("파슬리") },
    ],
  },
];
