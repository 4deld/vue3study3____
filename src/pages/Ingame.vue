<script setup lang="ts">
import { CardShape, GeneClass, Game } from '../game';
const gameobj = Game();
const { Opponent, GetDefenseValue } = gameobj;
function c() {
  GetDefenseValue();
}
</script>

<template>
  <div class="IngameRoot">
    <div class="userside">
      <div @click="c()">스킬들.</div>
      <div>카드들.</div>
      <div class="username"></div>
      <div><img src="" alt="" /></div>
      <div>hp</div>
      <div>shield</div>
    </div>
    <div @click="() => (Opponent.defense += 10)">timer</div>
    <div class="opponentside">
      <div>스킬들.</div>
      <div>카드들.</div>
      <div class="opponentname"></div>
      <div><img src="" alt="" /></div>
      <div>hp</div>
      <div>shield</div>
    </div>
  </div>
</template>

<style scoped></style>
