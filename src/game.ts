import { computed, ref } from 'vue';

export enum CardShape {
  SQUARE,
  TRIANGLE,
  CIRCLE,
  STAR,
}

export enum CharacterClass {
  WARRIOR,
  MAGE,
  ACHER,
}

export interface Skill {
  class: CharacterClass;
  id: number;
  name: string;
  resources: CardShape[];
  damage: number;
  shield: number;
  heal: number;
}

export interface User extends Skill {
  class: CharacterClass;
  hp: number;
  defense: number;
  cards: CardShape[];
}
