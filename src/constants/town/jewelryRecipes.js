import AquamarineRaw from "../../assets/images/jewelry/aquamarine_raw.png";
import PeridotRaw from "../../assets/images/jewelry/peridot_raw.png";
import AmberRaw from "../../assets/images/jewelry/amber_raw.png";
import CitrineRaw from "../../assets/images/jewelry/citrine_raw.png";
import CoralRaw from "../../assets/images/jewelry/coral_raw.png";
import LarimarRaw from "../../assets/images/jewelry/larimar_raw.png";
import GarnetRaw from "../../assets/images/jewelry/garnet_raw.png";
import RubyRaw from "../../assets/images/jewelry/ruby_raw.png";
import CobbleStone from "../../assets/images/jewelry/cobble_stone.png";
import CobbledDeepslate from "../../assets/images/jewelry/cobbled_deepslate.png";

import AquamarineGem from "../../assets/images/jewelry/aquamarine_gem.png";
import PeridotGem from "../../assets/images/jewelry/peridot_gem.png";
import AmberGem from "../../assets/images/jewelry/amber_gem.png";
import CitrineGem from "../../assets/images/jewelry/citrine_gem.png";
import CoralGem from "../../assets/images/jewelry/coral_gem.png";
import LarimarGem from "../../assets/images/jewelry/larimar_gem.png";
import GarnetGem from "../../assets/images/jewelry/garnet_gem.png";
import RubyGem from "../../assets/images/jewelry/ruby_gem.png";
import StoneChunk from "../../assets/images/jewelry/stone_chunk.png";

import LifeRadianceGem from "../../assets/images/jewelry/life_radiance_gem.png";
import SunBlessingGem from "../../assets/images/jewelry/sun_blessing_gem.png";
import SeaDawnGem from "../../assets/images/jewelry/sea_dawn_gem.png";
import PassionFlameGem from "../../assets/images/jewelry/passion_flame_gem.png";

import LifeNecklace from "../../assets/images/jewelry/life_necklace.png";
import SunNecklace from "../../assets/images/jewelry/sun_necklace.png";
import SeaNecklace from "../../assets/images/jewelry/sea_necklace.png";
import PassionNecklace from "../../assets/images/jewelry/passion_necklace.png";

import LifeRing from "../../assets/images/jewelry/life_ring.png";
import SunRing from "../../assets/images/jewelry/sun_ring.png";
import SeaRing from "../../assets/images/jewelry/sea_ring.png";
import PassionRing from "../../assets/images/jewelry/passion_ring.png";

import Hydrangea from "../../assets/images/flower/hydrangea.png";
import Calamus from "../../assets/images/flower/calamus.png";
import Hibiscus from "../../assets/images/flower/hibiscus.png";
import DesertRose from "../../assets/images/flower/desert_rose.png";
import Lavender from "../../assets/images/flower/lavender.png";
import Jacaranda from "../../assets/images/flower/jacaranda.png";
import FlameLily from "../../assets/images/flower/flame_lily.png";
import Agave from "../../assets/images/flower/agave.png";

import Adamantium from "../../assets/images/ingot/adamantium.png";
import Amethyst from "../../assets/images/ingot/amethyst.png";
import Iridium from "../../assets/images/ingot/iridium.png";
import Jade from "../../assets/images/ingot/jade.png";
import Malachite from "../../assets/images/ingot/malachite.png";
import Sapphire from "../../assets/images/ingot/sapphire.png";
import Spinel from "../../assets/images/ingot/spinel.png";
import Tungsten from "../../assets/images/ingot/tungsten.png";
import YellowCrystal from "../../assets/images/ingot/yellow_crystal.png";

export const jewelryRecipes = [
  // 1차 보석 가공
  {
    name: "아쿠아마린 보석",
    image: AquamarineGem,
    price: 90,
    ingredients: [
      { name: "아쿠아마린 원석", image: AquamarineRaw, price: 0, count: 8 },
    ],
  },
  {
    name: "페리도트 보석",
    image: PeridotGem,
    price: 90,
    ingredients: [
      { name: "페리도트 원석", image: PeridotRaw, price: 0, count: 8 },
    ],
  },
  {
    name: "앰버 보석",
    image: AmberGem,
    price: 100,
    ingredients: [{ name: "앰버 원석", image: AmberRaw, price: 0, count: 8 }],
  },
  {
    name: "시트린 보석",
    image: CitrineGem,
    price: 100,
    ingredients: [
      { name: "시트린 원석", image: CitrineRaw, price: 0, count: 8 },
    ],
  },
  {
    name: "산호석 보석",
    image: CoralGem,
    price: 100,
    ingredients: [{ name: "산호석 원석", image: CoralRaw, price: 0, count: 8 }],
  },
  {
    name: "라리마 보석",
    image: LarimarGem,
    price: 100,
    ingredients: [
      { name: "라리마 원석", image: LarimarRaw, price: 0, count: 8 },
    ],
  },
  {
    name: "가넷 보석",
    image: GarnetGem,
    price: 100,
    ingredients: [{ name: "가넷 원석", image: GarnetRaw, price: 0, count: 8 }],
  },
  {
    name: "루비 보석",
    image: RubyGem,
    price: 100,
    ingredients: [{ name: "루비 원석", image: RubyRaw, price: 0, count: 8 }],
  },
  {
    name: "돌 뭉치",
    image: StoneChunk,
    price: 10,
    ingredients: [
      { name: "조약돌", image: CobbleStone, price: 0, count: 192 },
      { name: "심층암 조약돌", image: CobbledDeepslate, price: 0, count: 128 },
    ],
  },

  // 2차 보석 합성 (생명 광휘 보석 등)
  {
    name: "생명의 광휘 보석",
    image: LifeRadianceGem,
    price: 950,
    ingredients: [
      { name: "아쿠아마린 보석", image: AquamarineGem, count: 4 },
      { name: "페리도트 보석", image: PeridotGem, count: 4 },
      { name: "제이드 주괴", image: Jade, price: 5, count: 16 },
      { name: "공작석 주괴", image: Malachite, price: 4, count: 16 },
    ],
  },
  {
    name: "태양의 축복 보석",
    image: SunBlessingGem,
    price: 1021,
    ingredients: [
      { name: "앰버 보석", image: AmberGem, count: 4 },
      { name: "시트린 보석", image: CitrineGem, count: 4 },
      { name: "황수정 주괴", image: YellowCrystal, price: 1, count: 64 },
      { name: "텅스텐 주괴", image: Tungsten, price: 2, count: 32 },
    ],
  },
  {
    name: "바다의 여명 보석",
    image: SeaDawnGem,
    price: 1038,
    ingredients: [
      { name: "산호석 보석", image: CoralGem, count: 4 },
      { name: "라리마 보석", image: LarimarGem, count: 4 },
      { name: "자수정 주괴", image: Amethyst, price: 1, count: 64 },
      { name: "사파이어 주괴", image: Sapphire, count: 8 },
    ],
  },
  {
    name: "열정의 불꽃 보석",
    image: PassionFlameGem,
    price: 1118,
    ingredients: [
      { name: "가넷 보석", image: GarnetGem, count: 4 },
      { name: "루비 보석", image: RubyGem, count: 4 },
      { name: "스피넬 주괴", image: Spinel, price: 3, count: 32 },
      { name: "이리듐 주괴", image: Iridium, price: 15, count: 8 },
    ],
  },
  // 최종 주얼리 제작
  // 목걸이
  {
    name: "생명의 목걸이",
    image: LifeNecklace,
    price: 1404,
    ingredients: [
      { name: "생명의 광휘 보석", image: LifeRadianceGem, count: 1 },
      { name: "수국", image: Hydrangea, price: 5, count: 12 },
      { name: "창포", image: Calamus, price: 5, count: 12 },
      { name: "돌 뭉치", image: StoneChunk, count: 1 },
    ],
  },
  {
    name: "태양의 목걸이",
    image: SunNecklace,
    price: 1496,
    ingredients: [
      { name: "태양의 축복 보석", image: SunBlessingGem, count: 1 },
      { name: "히비스커스", image: Hibiscus, price: 5, count: 12 },
      { name: "사막 장미", image: DesertRose, price: 5, count: 12 },
      { name: "돌 뭉치", image: StoneChunk, count: 1 },
    ],
  },
  {
    name: "바다의 목걸이",
    image: SeaNecklace,
    price: 1518,
    ingredients: [
      { name: "바다의 여명 보석", image: SeaDawnGem, count: 1 },
      { name: "라벤더", image: Lavender, price: 5, count: 12 },
      { name: "능소화", image: Jacaranda, price: 5, count: 12 },
      { name: "돌 뭉치", image: StoneChunk, count: 1 },
    ],
  },
  {
    name: "열정의 목걸이",
    image: PassionNecklace,
    price: 1622,
    ingredients: [
      { name: "열정의 불꽃 보석", image: PassionFlameGem, count: 1 },
      { name: "불꽃 백합", image: FlameLily, price: 5, count: 12 },
      { name: "용설란 꽃", image: Agave, price: 5, count: 12 },
      { name: "돌 뭉치", image: StoneChunk, count: 1 },
    ],
  },
  // 반지
  {
    name: "생명의 반지",
    image: LifeRing,
    price: 1365,
    ingredients: [
      { name: "생명의 광휘 보석", image: LifeRadianceGem, count: 1 },
      { name: "아만타디움 주괴", image: Adamantium, price: 20, count: 4 },
      { name: "돌 뭉치", image: StoneChunk, count: 2 },
    ],
  },
  {
    name: "태양의 반지",
    image: SunRing,
    price: 1457,
    ingredients: [
      { name: "태양의 축복 보석", image: SunBlessingGem, count: 1 },
      { name: "아만타디움 주괴", image: Adamantium, price: 20, count: 4 },
      { name: "돌 뭉치", image: StoneChunk, count: 2 },
    ],
  },
  {
    name: "바다의 반지",
    image: SeaRing,
    price: 1479,
    ingredients: [
      { name: "바다의 여명 보석", image: SeaDawnGem, count: 1 },
      { name: "아만타디움 주괴", image: Adamantium, price: 20, count: 4 },
      { name: "돌 뭉치", image: StoneChunk, count: 2 },
    ],
  },
  {
    name: "열정의 반지",
    image: PassionRing,
    price: 1583,
    ingredients: [
      { name: "열정의 불꽃 보석", image: PassionFlameGem, count: 1 },
      { name: "아만타디움 주괴", image: Adamantium, price: 20, count: 4 },
      { name: "돌 뭉치", image: StoneChunk, count: 2 },
    ],
  },
];
