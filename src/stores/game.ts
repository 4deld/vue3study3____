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
  selected_skill: number;
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
  const GameEnd = ref(false);
  const TurnTimerEnd = ref(true);
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
    selected_skill: -1,
  });
  const User = ref<Player>({
    class: GeneClass.ACHER,
    hp: 30,
    defense: 0,
    cards: [],
    skills: [],
    selected_skill: -1,
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
  const UserGeneSrc = ref('src/assets/Genes/Gene2.png');
  const UserReady = ref(false);
  const OpponentGeneSrc = ref('src/assets/Genes/Gene0.png');
  const OpponentReady = ref(false);
  function User_Ready() {
    UserGeneSrc.value = 'src/assets/Genes/Gene2_ready.png';
    UserReady.value = true;
    setTimeout(() => {
      OpponentGeneSrc.value = 'src/assets/Genes/Gene0_ready.png';
      OpponentReady.value = true;
    }, 500);
    // setTimeout(() => {
    //   emit('user_ready');
    // }, 1000);
  }
  Opponent.value.skills = WarriorSkills;
  User.value.skills = AcherSkills;
  function SelectSkill(Skillid: number) {
    //console.log(User.value.selected_skill);
    if (User.value.selected_skill != -1) {
      // User.value.skills[User.value.selected_skill].style = User.value.skills[
      //   User.value.selected_skill
      // ].style.replace('background-color:#b9f2ff ;', '');
      User.value.skills[User.value.selected_skill].style = 'border:0.1vw solid 	#ffd700;';
    }
    if (Skillid == User.value.selected_skill) {
      User.value.selected_skill = -1;
    } else if (User.value.skills[Skillid].style != '') {
      User.value.skills[Skillid].style += 'background-color:#b9f2ff ;';
      User.value.selected_skill = Skillid;
    }
  }
  const TurnCnt = ref(0);
  const sec = ref(0);
  const TimerStyle = ref('height:' + sec.value + 'vh;');

  const UserHPStyle = ref('width:0;');
  const OpponentHPStyle = ref('width:0;');
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
  function UserSkillAvailable(Player: Array<number>, Skill: Array<number>) {
    for (var i = 0; i < 4; i++) {
      if (Skill[i] != 0) {
        var k = Player[i] - Skill[i];
        if (k < 0) {
          return false;
        }
      }
    }
    return true;
  }
  function OpponentSkillAvailable(Player: Array<number>, Skill: Array<number>) {
    //0 -> never, 1-> possible, 2-> certainly
    var flag = false;
    for (var i = 0; i < 4; i++) {
      if (Skill[i] != 0) {
        var k = Player[i] - Skill[i];
        if (k < 0) {
          if (k < -1 || flag) {
            return 0;
          }
          flag = true;
        }
      }
    }
    if (flag) {
      return 1;
    }
    return 2;
  }
  function ShowAvailableSkill() {
    //inefficient?
    const UserCardShapeCount = CountShapes(User.value.cards); //SQUARE CIRCLE TRIANGLE STAR
    const OpponentCardShapeCount = CountShapes(Opponent.value.cards); //SQUARE CIRCLE TRIANGLE STAR

    const UserSkillCnt = User.value.skills.length;
    for (var i = 0; i < UserSkillCnt; i++) {
      //Skill에 ShapeCount 저장하는게 더 효율적이긴할듯
      const SkillCardShapeCount = CountShapes(User.value.skills[i].resources);
      if (UserSkillAvailable(UserCardShapeCount, SkillCardShapeCount)) {
        User.value.skills[i].style = 'border:0.1vw solid 	#ffd700;';
      }
    }
    const OpponentSkillCnt = Opponent.value.skills.length;

    for (var i = 0; i < OpponentSkillCnt; i++) {
      //Skill에 ShapeCount 저장하는게 더 효율적이긴할듯
      const SkillCardShapeCount = CountShapes(Opponent.value.skills[i].resources);
      if (OpponentSkillAvailable(OpponentCardShapeCount, SkillCardShapeCount) == 1) {
        Opponent.value.skills[i].style = 'border:0.1vw solid #B87333;';
      } else if (OpponentSkillAvailable(OpponentCardShapeCount, SkillCardShapeCount) == 2) {
        Opponent.value.skills[i].style = 'border:0.1vw solid 	#ffd700;';
      }
    }
  }
  var Timer = setInterval(function () {});
  function Init() {
    GameEnd.value = false;
    TurnTimerEnd.value = false;
    sec.value = 0;
    TurnCnt.value = 0;
    TurnStart();
  }
  function TurnStart() {
    TurnCnt.value += 1;
    TurnTimerEnd.value = false;

    //inefficient?
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
    ShowAvailableSkill();
  }
  function TurnEnd() {
    sec.value = 0;
    if (User.value.selected_skill != -1) {
      Opponent.value.hp -= User.value.skills[User.value.selected_skill].damage;
      OpponentHPStyle.value = 'width:' + 16 * (1 - Opponent.value.hp / 30) + 'vw;';
    }
    if (Opponent.value.selected_skill != -1) {
      User.value.hp -= Opponent.value.skills[Opponent.value.selected_skill].damage;
      UserHPStyle.value = 'width:' + 16 * (1 - User.value.hp / 30) + 'vw;';
    }

    setTimeout(() => {
      TurnStart();
    }, 500);
  }
  // for (var i = 0; i < 5; i++) {
  //   watch(User.value.skills[i], (newv, oldv) => {
  //     if (newv.style[25]===' ') {//selected

  //     }
  //   });
  // }
  const PlayersReady = ref(false);
  const count = ref(0);
  watch(
    () => count,
    (count, prevCount) => {
      /* ... */
    }
  );
  watch(TurnTimerEnd, (New, Old) => {
    console.log(New, Old);
    if (Old == true) {
      Timer = setInterval(function () {
        if (sec.value === 800) {
          clearInterval(Timer);
          TurnTimerEnd.value = true;
          setTimeout(() => {
            TurnEnd();
          }, 500);
        } else {
          sec.value += 1;
          //console.log(TimerStyle.value);
        }
      }, 10);
    } else {
      clearInterval(Timer);
    }
  });
  watch(GameEnd, (New, Old) => console.log(New, Old));
  watch(
    [UserReady, OpponentReady], //둘 중 하나만 바뀌어도 실행
    ([NewUserReady, NewOpponentReady], [PrvUserReady, PrvOpponentReady]) => {
      //console.log(NewUserReady, NewOpponentReady, PrvUserReady, PrvOpponentReady);
      if (NewUserReady && NewOpponentReady) {
        TurnTimerEnd.value = true;
        setTimeout(() => {
          TurnEnd();
        }, 500);
      }
    }
  );
  watch(sec, () => (TimerStyle.value = 'height:' + ((sec.value / 8) * 60) / 100 + 'vh;'));

  //watch(User.value, () => (UserHPStyle.value = 'width:' + 16 * (1 - UserHP.value / 30) + 'vw;'));
  //근데 이렇게쓰면 User.value.hp 말고 다른거 바뀔때도 실행되는거 아닌가?

  //턴 변수들 선언 -> watch?
  //Turn 함수 만들어서 계속 돌리는 식으로 하면 되나
  //나는 아무것도 못했는데 상대는 어떤 스킬이라도 사용할 수 있는 상태였다 -> 운의 영역이 맞다
  //아니면 내가 사용한 문양은 다음번에 나올 확률이 조금 줄어든다던가 100개씩 넣어놓고
  //사용하면 개수만큼 빠지면 확률이 줄어드는거긴하지
  //전사 실드슬램같은경우 이번 턴의 방어도만큼 때리고 맞는거 그니까 먼저맞고 방어도
  //줄어들고 때리면 안되지않나 그니까 턴을 전투진행할때 반응형으로 하면 안되려나
  return {
    Opponent,
    User,
    UserHPStyle,
    OpponentHPStyle,
    TurnCnt,
    TimerStyle,
    UserGeneSrc,
    OpponentGeneSrc,
    User_Ready,
    SelectSkill,
    Init,
    TurnStart,
    TurnEnd,
  };
});
