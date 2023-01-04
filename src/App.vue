<script setup lang="ts">
//import RouterTransition from '@/components/transitions/RouterTransition.vue';
import { useGlobalStore } from '@/stores/global.js';
import { ref } from 'vue';
import WaitVue from './pages/Wait.vue';
import IngameVue from './pages/Ingame.vue';
import EndVue from './pages/End.vue';
enum GameProgress {
  WAIT,
  INGAME,
  END,
}
const gameprogress = ref<GameProgress>(0);
const GameStart = () => {
  gameprogress.value = GameProgress.INGAME;
};
const GameEnd = () => {
  gameprogress.value = GameProgress.END;
};
const globalStore = useGlobalStore();
</script>

<template>
  <div class="root" :class="{ darkTheme: globalStore.isThemeDark }">
    <main class="root__content">
      <WaitVue v-if="gameprogress === GameProgress.WAIT" @user_ready="() => GameStart()"></WaitVue>
      <IngameVue v-else-if="gameprogress === GameProgress.INGAME"></IngameVue>
      <EndVue v-else="gameprogress === GameProgress.END"></EndVue>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.root {
  position: absolute;
  width: 100%;
  min-height: 100%;
  overflow: hidden;
}
</style>
