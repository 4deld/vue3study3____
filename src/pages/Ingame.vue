<script setup lang="ts">
import { Game, Turn } from '../stores/game';
import { storeToRefs } from 'pinia';
const gameobj = Game();
const turnobj = Turn();
const { Opponent, User } = storeToRefs(gameobj);
function c() {
  gameobj.GetDefenseValue();
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
