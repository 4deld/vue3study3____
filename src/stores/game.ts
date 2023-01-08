import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
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
  Q: -1,
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
  style: string;
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
  } else if (s == CardShape.STAR) {
    return '/src/assets/Shapes/star.png';
  } else {
    return '/src/assets/Shapes/q.png';
  }
}

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
      style: '',
    },
    {
      id: 1,
      name: 'BLOW',
      resources: [CardShape.TRIANGLE, CardShape.TRIANGLE],
      damage: 10,
      shield: 0,
      heal: 0,
      style: '',
    },
    {
      id: 2,
      name: 'DEFEND',
      resources: [CardShape.SQUARE, CardShape.SQUARE],
      damage: 0,
      shield: 5,
      heal: 0,
      style: '',
    },
    {
      id: 3,
      name: 'ONRUSH',
      resources: [CardShape.SQUARE, CardShape.TRIANGLE],
      damage: 3,
      shield: 3,
      heal: 0,
      style: '',
    },
    {
      id: 4,
      name: 'SHIELD SLAM',
      resources: [CardShape.CIRCLE, CardShape.CIRCLE],
      damage: 0, //나의 방어도. 근데 어캐함 이 스킬 쓸때마다 자기 방어도를 불러와야되나
      shield: 0,
      heal: 0,
      style: '',
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
      style: '',
    },
    {
      id: 1,
      name: 'FLAME BALL',
      resources: [CardShape.CIRCLE, CardShape.CIRCLE],
      damage: 11,
      shield: 0,
      heal: 0,
      style: '',
    },
    {
      id: 2,
      name: 'ELECTRIC SHOCK',
      resources: [CardShape.CIRCLE, CardShape.TRIANGLE],
      damage: 5, //방어도 없애기
      shield: 0,
      heal: 0,
      style: '',
    },
    {
      id: 3,
      name: 'HIT',
      resources: [CardShape.TRIANGLE, CardShape.TRIANGLE],
      damage: 6,
      shield: 0,
      heal: 0,
      style: '',
    },
    {
      id: 4,
      name: 'HEAL',
      resources: [CardShape.STAR, CardShape.STAR],
      damage: 0,
      shield: 0,
      heal: 5,
      style: '',
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
      style: '',
    },
    {
      id: 1,
      name: 'SNIPE',
      resources: [CardShape.TRIANGLE, CardShape.TRIANGLE],
      damage: 10,
      shield: 0,
      heal: 0,
      style: '',
    },
    {
      id: 2,
      name: 'SHOT',
      resources: [CardShape.TRIANGLE, CardShape.TRIANGLE],
      damage: 12,
      shield: -3, //내 방어도 -3
      heal: 0,
      style: '',
    },
    {
      id: 3,
      name: 'TUMBLE',
      resources: [CardShape.SQUARE, CardShape.CIRCLE],
      damage: 0,
      shield: 5,
      heal: 0,
      style: '',
    },
    {
      id: 4,
      name: 'SCAR',
      resources: [CardShape.STAR],
      damage: 4,
      shield: 0,
      heal: 0,
      style: '',
    },
  ];
  Opponent.value.skills = WarriorSkills;
  User.value.skills = AcherSkills;
  function GetDefenseValue() {
    Opponent.value.skills[4].damage = Opponent.value.defense;
  }

  const TurnCnt = ref(-1);
  const Timer = ref(15);
  Opponent.value.cards[0] = -1;
  function Random() {
    return Math.floor(Math.random() * (4 - 0) + 0);
  }
  //const UserCards = ref<Values<typeof CardShape>[]>([0, 0, 0, 0]);
  //const OpponentCards = ref<Values<typeof CardShape>[]>([0, 0, 0, 0]);
  function CountShapes(v: Values<typeof CardShape>[]) {
    const len = v.length;
    var CardShapeCount = [0, 0, 0, 0];
    for (var i = 0; i < len; i++) {
      CardShapeCount[v[i]] += 1;
    }
    return CardShapeCount;
  }
  //function a(v: Skill['resources']) {}
  function SkillAvailable(Player: Array<number>, Skill: Array<number>, mode: boolean) {
    //mode true->user, false->opponent
    var flag = false;
    for (var i = 0; i < 4; i++) {
      if (Skill[i] != 0) {
        var k = Player[i] - Skill[i];
        if (k < 0) {
          if (mode || k < -1 || flag) {
            return false;
          }
          flag = true;
        }
      }
    }
    return true;
  }

  function Turn() {
    TurnCnt.value += 1;
    for (var i = 0; i < 5; i++) {
      Opponent.value.skills[i].style = '';
      User.value.skills[i].style = '';
    }
    for (var j = 0; j < 4; j++) {
      User.value.cards[j] = Random();
    }
    for (var j = 1; j < 4; j++) {
      Opponent.value.cards[j] = Random();
    }
    //inefficient?
    const UserCardShapeCount = CountShapes(User.value.cards); //SQUARE CIRCLE TRIANGLE STAR
    const OpponentCardShapeCount = CountShapes(Opponent.value.cards); //SQUARE CIRCLE TRIANGLE STAR

    const UserSkillCnt = User.value.skills.length;
    for (var i = 0; i < UserSkillCnt; i++) {
      //Skill에 ShapeCount 저장하는게 더 효율적이긴할듯
      const SkillCardShapeCount = CountShapes(User.value.skills[i].resources);
      if (SkillAvailable(UserCardShapeCount, SkillCardShapeCount, true)) {
        User.value.skills[i].style = 'background-color:gold;';
      }
    }
    const OpponentSkillCnt = Opponent.value.skills.length;

    for (var i = 0; i < OpponentSkillCnt; i++) {
      //Skill에 ShapeCount 저장하는게 더 효율적이긴할듯
      const SkillCardShapeCount = CountShapes(Opponent.value.skills[i].resources);
      if (SkillAvailable(OpponentCardShapeCount, SkillCardShapeCount, false)) {
        Opponent.value.skills[i].style = 'background-color:silver;';
      }
    }
  }
  // for (var i = 0; i < 5; i++) {
  //   watch(User.value.skills[i], (newv, oldv) => {
  //     if (newv.style != oldv.style) {
  //     }
  //   });
  // }
  const count = ref(0);
  watch(
    () => count,
    (count, prevCount) => {
      /* ... */
    }
  );
  //턴 변수들 선언 -> watch?
  //Turn 함수 만들어서 계속 돌리는 식으로 하면 되나
  //나는 아무것도 못했는데 상대는 어떤 스킬이라도 사용할 수 있는 상태였다 -> 운의 영역이 맞다
  //아니면 내가 사용한 문양은 다음번에 나올 확률이 조금 줄어든다던가 100개씩 넣어놓고
  //사용하면 개수만큼 빠지면 확률이 줄어드는거긴하지
  return {
    Opponent,
    User,
    TurnCnt,
    GetDefenseValue,
    Turn,
  };
});
