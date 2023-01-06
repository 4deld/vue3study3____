import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
// const Direction = {
//   Up: 0,
//   Down: 1,
//   Left: 2,
//   Right: 3,
// } as const

// type Values<T> = T[keyof T]

// declare function move(direction: Values<typeof Direction>): void

// move(Direction.Up) // Ok!
// move(0) // Ok!
// move(100) // ㅠ_ㅠ
export const CardShape = {
  SQUARE: 0,
  CIRCLE: 1,
  TRIANGLE: 2,
  STAR: 3,
} as const;
const GeneClass = {
  WARRIOR: 0,
  MAGE: 1,
  ACHER: 2,
};
export type Values<T> = T[keyof T];

export interface Skill {
  id: number;
  name: string;
  resources: Values<typeof CardShape>[];
  damage: number;
  shield: number;
  heal: number;
}
//interface Skills extends Array<Skill> {}
export interface Player {
  class: Values<typeof GeneClass>;
  hp: number;
  defense: number;
  cards: Values<typeof CardShape>[];
  skills: Skill[];
}
// ref() → state
// computed() → getters,setters
// function() → actions
export function NumberToShapeImg(s: Values<typeof CardShape>) {
  if (s == CardShape.SQUARE) {
    return '/src/assets/Shapes/square.png';
  } else if (s == CardShape.CIRCLE) {
    return '/src/assets/Shapes/circle.png';
  } else if (s == CardShape.TRIANGLE) {
    return '/src/assets/Shapes/triangle.png';
  } else {
    return '/src/assets/Shapes/star.png';
  }
}
export const Turn = defineStore('turn', () => {
  const TurnCnt = ref(0);
  function Random() {
    return Math.floor(Math.random() * (4 - 0) + 0);
  }
  const UserCards = ref<Values<typeof CardShape>[]>([0, 0, 0, 0]);
  const OpponentCards = ref<Values<typeof CardShape>[]>([0, 0, 0, 0]);
  for (var j = 0; j < 4; j++) {
    UserCards.value[j] = Random();
  }
  //User.cards에 접근해야되는데 함수로 써서 넣는건지 아니면 Turn을,,,Game안에넣는건가??
});

export const Game = defineStore('game', () => {
  // const Opponent: Player = {
  //   class: 'WARRIOR',
  //   hp: 30,
  //   defense: 0,
  //   cards: [],
  //   skills: [],
  // };
  // const User: Player = {
  //   class: GeneClass.ACHER,
  //   hp: 30,
  //   defense: 0,
  //   cards: [],
  //   skills: [],
  // };
  const Opponent = ref<Player>({
    class: GeneClass.WARRIOR, //what is difference?
    hp: 30,
    defense: 0,
    cards: [],
    skills: [],
  });
  const User = ref<Player>({
    class: GeneClass.ACHER,
    hp: 30,
    defense: 0,
    cards: [],
    skills: [],
  });
  const WarriorSkills: Skill[] = [
    {
      id: 0,
      name: 'SEVERE BLOW',
      resources: [CardShape.TRIANGLE, CardShape.TRIANGLE, CardShape.TRIANGLE],
      damage: 15,
      shield: 0,
      heal: 0,
    },
    {
      id: 1,
      name: 'BLOW',
      resources: [CardShape.TRIANGLE, CardShape.TRIANGLE],
      damage: 10,
      shield: 0,
      heal: 0,
    },
    {
      id: 2,
      name: 'DEFEND',
      resources: [CardShape.SQUARE, CardShape.SQUARE],
      damage: 0,
      shield: 5,
      heal: 0,
    },
    {
      id: 3,
      name: 'ONRUSH',
      resources: [CardShape.SQUARE, CardShape.TRIANGLE],
      damage: 3,
      shield: 3,
      heal: 0,
    },
    {
      id: 4,
      name: 'SHIELD SLAM',
      resources: [CardShape.CIRCLE, CardShape.CIRCLE],
      damage: 0, //나의 방어도. 근데 어캐함 이 스킬 쓸때마다 자기 방어도를 불러와야되나
      shield: 0,
      heal: 0,
    },
  ];
  const MageSkills: Skill[] = [
    {
      id: 0,
      name: 'HUGE EXPLOSION',
      resources: [CardShape.CIRCLE, CardShape.CIRCLE, CardShape.CIRCLE],
      damage: 15,
      shield: 0,
      heal: 0,
    },
    {
      id: 1,
      name: 'FLAME BALL',
      resources: [CardShape.CIRCLE, CardShape.CIRCLE],
      damage: 11,
      shield: 0,
      heal: 0,
    },
    {
      id: 2,
      name: 'ELECTRIC SHOCK',
      resources: [CardShape.CIRCLE, CardShape.TRIANGLE],
      damage: 5, //방어도 없애기
      shield: 0,
      heal: 0,
    },
    {
      id: 3,
      name: 'HIT',
      resources: [CardShape.TRIANGLE, CardShape.TRIANGLE],
      damage: 6,
      shield: 0,
      heal: 0,
    },
    {
      id: 4,
      name: 'HEAL',
      resources: [CardShape.STAR, CardShape.STAR],
      damage: 0,
      shield: 0,
      heal: 5,
    },
  ];
  const AcherSkills: Skill[] = [
    {
      id: 0,
      name: 'VOLLEY',
      resources: [CardShape.SQUARE, CardShape.SQUARE, CardShape.TRIANGLE],
      damage: 11, //방어도 파괴
      shield: 0,
      heal: 0,
    },
    {
      id: 1,
      name: 'SNIPE',
      resources: [CardShape.TRIANGLE, CardShape.TRIANGLE],
      damage: 10,
      shield: 0,
      heal: 0,
    },
    {
      id: 2,
      name: 'SHOT',
      resources: [CardShape.TRIANGLE, CardShape.TRIANGLE],
      damage: 12,
      shield: -3, //내 방어도 -3
      heal: 0,
    },
    {
      id: 3,
      name: 'TUMBLE',
      resources: [CardShape.SQUARE, CardShape.CIRCLE],
      damage: 0,
      shield: 5,
      heal: 0,
    },
    {
      id: 4,
      name: 'SCAR',
      resources: [CardShape.STAR],
      damage: 4,
      shield: 0,
      heal: 0,
    },
  ];
  Opponent.value.skills = WarriorSkills;
  User.value.skills = AcherSkills;
  function GetDefenseValue() {
    Opponent.value.skills[4].damage = Opponent.value.defense;
  }
  return {
    Opponent,
    User,
    GetDefenseValue,
  };
});
