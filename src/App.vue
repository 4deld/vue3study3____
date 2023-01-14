<script setup lang="ts">
//import RouterTransition from '@/components/transitions/RouterTransition.vue';
import { useGlobalStore } from '@/stores/global.js';
import { ref } from 'vue';
import WaitVue from './pages/Wait.vue';
import IngameVue from './pages/Ingame.vue';
import EndVue from './pages/End.vue';
import Values from './stores/game.ts';
const GameProgress = {
  WAIT: 0,
  INGAME: 1,
  END: 2,
} as const;

const State = ref<Values<typeof GameProgress>>(GameProgress.WAIT);
const GameStart = () => {
  State.value = GameProgress.INGAME;
};
const GameEnd = () => {
  State.value = GameProgress.END;
};
const globalStore = useGlobalStore();
</script>

<template>
  <div class="root" :class="{ darkTheme: globalStore.isThemeDark }">
    <main class="root__content">
      <WaitVue v-if="State === GameProgress.WAIT" @gamestart="() => GameStart()"></WaitVue>
      <IngameVue v-else-if="State === GameProgress.INGAME" @gameend="() => GameEnd()"></IngameVue>
      <EndVue v-else="State === GameProgress.END"></EndVue>
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
