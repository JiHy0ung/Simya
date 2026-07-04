import Wheat from "../../assets/images/food/vanilla/wheat.png";
import Carrot from "../../assets/images/food/vanilla/carrot.png";
import Potato from "../../assets/images/food/vanilla/potato.png";
import SugarCane from "../../assets/images/food/vanilla/sugar_cane.png";
import BeetRoot from "../../assets/images/food/vanilla/beetroot.png";
import CocoaBeans from "../../assets/images/food/vanilla/cocoa_beans.png";
import Pumpkin from "../../assets/images/food/vanilla/pumpkin.png";
import WaterMelon from "../../assets/images/food/vanilla/watermelon.png";
import NetherWart from "../../assets/images/food/vanilla/netherwart.png";
import NoImage from "../../assets/images/no_image.png";

import WheatBundle from "../../assets/images/food/processed/wheat_bundle.png";
import CarrotBundle from "../../assets/images/food/processed/carrot_bundle.png";
import PotatoBundle from "../../assets/images/food/processed/potato_bundle.png";
import SugarCaneBundle from "../../assets/images/food/processed/sugarcane_bundle.png";
import BeetRootBundle from "../../assets/images/food/processed/beetroot_bundle.png";
import CocoaBeansBundle from "../../assets/images/food/processed/cocoa_bundle.png";
import PumpkinBundle from "../../assets/images/food/processed/pumpkin_bundle.png";
import WaterMelonBundle from "../../assets/images/food/processed/watermelon_bundle.png";
import NetherWartBundle from "../../assets/images/food/processed/netherwart_bundle.png";

export const vanilla = [
  { id: "wheat", name: "밀", image: Wheat, price: 6 },
  { id: "carrot", name: "당근", image: Carrot, price: 2 },
  { id: "potato", name: "감자", image: Potato, price: 2 },
  { id: "sugar_cane", name: "사탕수수", image: SugarCane, price: 2 },
  { id: "beetroot", name: "비트", image: BeetRoot, price: 6 },
  { id: "cocoa_beans", name: "코코아콩", image: CocoaBeans, price: 2 },
  { id: "pumpkin", name: "호박", image: Pumpkin, price: 4 },
  { id: "watermelon", name: "수박", image: WaterMelon, price: 4 },
  { id: "netherwart", name: "네더사마귀", image: NetherWart, price: 1 },
  {
    name: "감자 주머니",
    image: PotatoBundle,
    price: 128,
    craftTime: 1,
    ingredients: [{ name: "감자", count: 64, image: Potato }],
  },
  {
    name: "당근 주머니",
    image: CarrotBundle,
    price: 128,
    craftTime: 1,
    ingredients: [{ name: "당근", count: 64, image: Carrot }],
  },
  {
    name: "밀 주머니",
    image: WheatBundle,
    price: 384,
    craftTime: 1,
    ingredients: [{ name: "밀", count: 64, image: Wheat }],
  },
  {
    name: "사탕수수 주머니",
    image: SugarCaneBundle,
    price: 128,
    craftTime: 1,
    ingredients: [{ name: "사탕수수", count: 64, image: SugarCane }],
  },
  {
    name: "비트 주머니",
    image: BeetRootBundle,
    price: 384,
    craftTime: 1,
    ingredients: [{ name: "비트", count: 64, image: BeetRoot }],
  },
  {
    name: "호박 주머니",
    image: PumpkinBundle,
    price: 256,
    craftTime: 1,
    ingredients: [{ name: "호박", count: 64, image: Pumpkin }],
  },
  {
    name: "수박 주머니",
    image: WaterMelonBundle,
    price: 256,
    craftTime: 1,
    ingredients: [{ name: "수박", count: 64, image: WaterMelon }],
  },
  {
    name: "네더사마귀 주머니",
    image: NetherWartBundle,
    price: 128,
    craftTime: 1,
    ingredients: [{ name: "네더사마귀", count: 64, image: NetherWart }],
  },
  {
    name: "코코아콩 주머니",
    image: CocoaBeansBundle,
    price: 128,
    craftTime: 1,
    ingredients: [{ name: "코코아콩", count: 64, image: CocoaBeans }],
  },
];
