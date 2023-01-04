import { defineStore } from 'pinia';

import { computed, ref } from 'vue';

// type Direction = 'Up' | 'Down' | 'Left' | 'Right'

// declare function move(direction: Direction): void

// move('Up') // possible
export type CardShape = 'SQUARE' | 'CIRCLE' | 'TRIANGLE' | 'STAR';

export type GeneClass = 'WARRIOR' | 'MAGE' | 'ACHER';

export interface Skill {
  id: number;
  name: string;
  resources: CardShape[];
  damage: number;
  shield: number;
  heal: number;
}
//interface Skills extends Array<Skill> {}
export interface Player {
  class: GeneClass;
  hp: number;
  defense: number;
  cards: CardShape[];
  skills: Skill[];
}
export const Game = () => {
  const Opponent: Player = {
    class: 'WARRIOR',
    hp: 100,
    defense: 0,
    cards: [],
    skills: [],
  };

  const WarriorSkills: Skill[] = [
    {
      id: 0,
      name: 'SEVERE BLOW',
      resources: ['TRIANGLE', 'TRIANGLE', 'TRIANGLE'],
      damage: 15,
      shield: 0,
      heal: 0,
    },
    {
      id: 1,
      name: 'BLOW',
      resources: ['TRIANGLE', 'TRIANGLE'],
      damage: 10,
      shield: 0,
      heal: 0,
    },
    {
      id: 2,
      name: 'DEFEND',
      resources: ['SQUARE', 'SQUARE'],
      damage: 0,
      shield: 5,
      heal: 0,
    },
    {
      id: 3,
      name: 'ONRUSH',
      resources: ['SQUARE', 'TRIANGLE'],
      damage: 3,
      shield: 3,
      heal: 0,
    },
    {
      id: 4,
      name: 'SHIELD SLAM',
      resources: ['CIRCLE', 'CIRCLE'],
      damage: 0, //나의 방어도. 근데 어캐함 이 스킬 쓸때마다 자기 방어도를 불러와야되나
      shield: 0,
      heal: 0,
    },
  ];
  const MageSkills: Skill[] = [
    {
      id: 0,
      name: 'HUGE EXPLOSION',
      resources: ['CIRCLE', 'CIRCLE', 'CIRCLE'],
      damage: 15,
      shield: 0,
      heal: 0,
    },
    {
      id: 1,
      name: 'FLAME BALL',
      resources: ['CIRCLE', 'CIRCLE'],
      damage: 11,
      shield: 0,
      heal: 0,
    },
    {
      id: 2,
      name: 'ELECTRIC SHOCK',
      resources: ['CIRCLE', 'TRIANGLE'],
      damage: 5,
      shield: 0,
      heal: 0,
    },
    {
      id: 3,
      name: 'ONRUSH',
      resources: ['SQUARE', 'TRIANGLE'],
      damage: 3,
      shield: 3,
      heal: 0,
    },
    {
      id: 4,
      name: 'SHIELD SLAM',
      resources: ['CIRCLE', 'CIRCLE'],
      damage: 0,
      shield: 0,
      heal: 0,
    },
  ];
  Opponent.skills = WarriorSkills;
  function GetDefenseValue() {
    Opponent.skills[4].damage = Opponent.defense;
  }
  return {
    Opponent,
    GetDefenseValue,
  };
};
