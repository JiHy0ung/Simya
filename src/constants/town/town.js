import AquamarineRaw from "../../assets/images/jewelry/aquamarine_raw.png";
import PeridotRaw from "../../assets/images/jewelry/peridot_raw.png";
import AmberRaw from "../../assets/images/jewelry/amber_raw.png";
import CitrineRaw from "../../assets/images/jewelry/citrine_raw.png";
import CoralRaw from "../../assets/images/jewelry/coral_raw.png";
import LarimarRaw from "../../assets/images/jewelry/larimar_raw.png";
import GarnetRaw from "../../assets/images/jewelry/garnet_raw.png";
import RubyRaw from "../../assets/images/jewelry/ruby_raw.png";

import Serenity from "../../assets/images/town/serenity.png";
import Bluena from "../../assets/images/town/bluena.png";
import Sunbris from "../../assets/images/town/sunbris.png";
import Fury from "../../assets/images/town/fury.png";

export const town = [
  {
    name: "세레니티 폭포",
    image: Serenity,
    seasons: ["봄", "여름", "가을", "겨울"],
    resources: {
      minerals: ["페리도트 원석", "아쿠아마린 원석"],
      trees: ["버드나무 통나무", "단풍나무 통나무"],
      flowers: ["수국", "창포"],
      fishes: [
        "에메랄드 구피",
        "구피",
        "철갑상어",
        "삼엽충",
        "블루길",
        "잉어",
        "크래피",
        "유럽 잉어",
        "은하수 열대어",
        "유령 베일",
        "강꼬치고기",
        "민물 은갈치",
        "연어",
        "송어",
        "화이트 피쉬",
      ],
    },
  },
  {
    name: "블루나 해안",
    image: Bluena,
    seasons: ["봄", "여름"],
    resources: {
      minerals: ["산호석 원석", "라리마 원석"],
      trees: ["올리브나무 통나무", "사이프러스나무 통나무"],
      flowers: ["라벤더", "능소화"],
      fishes: [
        "크리스탈 해마",
        "심해 달빛 아귀",
        "바닷가재",
        "상어",
        "가오리",
        "청새치",
        "멸치",
        "가자미",
        "유령 해파리",
        "청어",
        "고등어",
        "정어리",
        "도미",
        "참치",
      ],
    },
  },
  {
    name: "썬브리즈 사막",
    image: Sunbris,
    seasons: ["여름", "가을"],
    resources: {
      minerals: ["앰버 원석", "시트린 원석"],
      trees: ["야자나무 통나무", "바오밥나무 통나무"],
      flowers: ["히비스커스", "사막 장미"],
      fishes: [
        "코비아",
        "황금 망둑어",
        "황금 개복치",
        "새우",
        "오징어",
        "개복치",
        "배스",
        "처브",
        "대구",
        "민어",
        "데저트 피쉬",
        "유령 숭어",
        "은빛 삼치",
        "틸라피아",
        "흰수염메기",
      ],
    },
  },
  {
    name: "퓨리 화산",
    image: Fury,
    seasons: ["가을", "겨울"],
    resources: {
      minerals: ["가넷 원석", "루비 원석"],
      trees: ["유칼립투스 통나무", "용혈수 통나무"],
      flowers: ["불꽃 백합", "용설란 꽃"],
      fishes: [
        "전기 가오리",
        "불꽃 황제돔",
        "화산 문어",
        "맹독 복어",
        "빨판상어",
        "불가사리",
        "꽃게",
        "뱀장어",
        "능성어",
        "만새기",
        "퍼치",
        "섀도우 피쉬",
        "쏠배감펭",
        "화산 날치",
        "좀비 물고기",
      ],
    },
  },
];
