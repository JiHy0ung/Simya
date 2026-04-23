import { getCropImage } from "../../utils/recipeUtils";
import BananaJam from "../../assets/images/food/jam/banana_jam.png";
import BlueberryJam from "../../assets/images/food/jam/blueberry_jam.png";
import GrapeJam from "../../assets/images/food/jam/grape_jam.png";
import LemonJam from "../../assets/images/food/jam/lemon_jam.png";
import MangoJam from "../../assets/images/food/jam/mango_jam.png";
import MelonJam from "../../assets/images/food/jam/melon_jam.png";
import OrangeJam from "../../assets/images/food/jam/orange_jam.png";
import PeachJam from "../../assets/images/food/jam/peach_jam.png";
import PineappleJam from "../../assets/images/food/jam/pineapple_jam.png";
import StrawberryJam from "../../assets/images/food/jam/strawberry_jam.png";

export const jamRecipes = [
  {
    name: "바나나 잼",
    image: BananaJam,
    price: 21120,
    ingredients: [{ name: "바나나", count: 64, image: getCropImage("바나나") }],
  },
  {
    name: "블루베리 잼",
    image: BlueberryJam,
    price: 14080,
    ingredients: [
      { name: "블루베리", count: 64, image: getCropImage("블루베리") },
    ],
  },
  {
    name: "포도 잼",
    image: GrapeJam,
    price: 21120,
    ingredients: [{ name: "포도", count: 64, image: getCropImage("포도") }],
  },
  {
    name: "레몬 잼",
    image: LemonJam,
    price: 21120,
    ingredients: [{ name: "레몬", count: 64, image: getCropImage("레몬") }],
  },
  {
    name: "망고 잼",
    image: MangoJam,
    price: 28160,
    ingredients: [{ name: "망고", count: 64, image: getCropImage("망고") }],
  },
  {
    name: "멜론 잼",
    image: MelonJam,
    price: 14080,
    ingredients: [{ name: "멜론", count: 64, image: getCropImage("멜론") }],
  },
  {
    name: "오렌지 잼",
    image: OrangeJam,
    price: 35200,
    ingredients: [{ name: "오렌지", count: 64, image: getCropImage("오렌지") }],
  },
  {
    name: "복숭아 잼",
    image: PeachJam,
    price: 35200,
    ingredients: [{ name: "복숭아", count: 64, image: getCropImage("복숭아") }],
  },
  {
    name: "파인애플 잼",
    image: PineappleJam,
    price: 21120,
    ingredients: [
      { name: "파인애플", count: 64, image: getCropImage("파인애플") },
    ],
  },
  {
    name: "딸기 잼",
    image: StrawberryJam,
    price: 14080,
    ingredients: [{ name: "딸기", count: 64, image: getCropImage("딸기") }],
  },
];
