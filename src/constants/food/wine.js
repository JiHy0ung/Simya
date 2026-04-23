import { getCropImage } from "../../utils/recipeUtils";
import BananaWine from "../../assets/images/food/wine/banana_wine.png";
import BlueberryWine from "../../assets/images/food/wine/blueberry_wine.png";
import GrapeWine from "../../assets/images/food/wine/grape_wine.png";
import LemonWine from "../../assets/images/food/wine/lemon_wine.png";
import MangoWine from "../../assets/images/food/wine/mango_wine.png";
import MelonWine from "../../assets/images/food/wine/melon_wine.png";
import OrangeWine from "../../assets/images/food/wine/orange_wine.png";
import PeachWine from "../../assets/images/food/wine/peach_wine.png";
import PineappleWine from "../../assets/images/food/wine/pineapple_wine.png";
import StrawberryWine from "../../assets/images/food/wine/strawberry_wine.png";

export const wineRecipes = [
  {
    name: "바나나 와인",
    image: BananaWine,
    price: 23040,
    ingredients: [{ name: "바나나", count: 64, image: getCropImage("바나나") }],
  },
  {
    name: "블루베리 와인",
    image: BlueberryWine,
    price: 15360,
    ingredients: [
      { name: "블루베리", count: 64, image: getCropImage("블루베리") },
    ],
  },
  {
    name: "포도 와인",
    image: GrapeWine,
    price: 23040,
    ingredients: [{ name: "포도", count: 64, image: getCropImage("포도") }],
  },
  {
    name: "레몬 와인",
    image: LemonWine,
    price: 23040,
    ingredients: [{ name: "레몬", count: 64, image: getCropImage("레몬") }],
  },
  {
    name: "망고 와인",
    image: MangoWine,
    price: 30720,
    ingredients: [{ name: "망고", count: 64, image: getCropImage("망고") }],
  },
  {
    name: "멜론 와인",
    image: MelonWine,
    price: 15360,
    ingredients: [{ name: "멜론", count: 64, image: getCropImage("멜론") }],
  },
  {
    name: "오렌지 와인",
    image: OrangeWine,
    price: 38400,
    ingredients: [{ name: "오렌지", count: 64, image: getCropImage("오렌지") }],
  },
  {
    name: "복숭아 와인",
    image: PeachWine,
    price: 38400,
    ingredients: [{ name: "복숭아", count: 64, image: getCropImage("복숭아") }],
  },
  {
    name: "파인애플 와인",
    image: PineappleWine,
    price: 23040,
    ingredients: [
      { name: "파인애플", count: 64, image: getCropImage("파인애플") },
    ],
  },
  {
    name: "딸기 와인",
    image: StrawberryWine,
    price: 15360,
    ingredients: [{ name: "딸기", count: 64, image: getCropImage("딸기") }],
  },
];
