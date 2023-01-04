<script setup lang="ts">
import { ref } from 'vue';
const emit = defineEmits(['user_ready']);
const UserGene = ref('src/assets/Genes/Gene2.png');
const OpponentGene = ref('src/assets/Genes/Gene0.png');
function UserReady() {
  UserGene.value = 'src/assets/Genes/Gene2_ready.png';
  setTimeout(() => {
    OpponentGene.value = 'src/assets/Genes/Gene0_ready.png';
  }, 500);
  setTimeout(() => {
    emit('user_ready');
  }, 1000);
}
</script>

<template>
  <div class="WaitRoot">
    <div class="side">
      <div class="score">745</div>
      <div class="username">Username</div>
      <div><img class="gene" @click="UserReady()" :src="UserGene" alt="" /></div>
      <div class="class">Acher</div>
    </div>
    <div class="center">vs</div>
    <div class="side">
      <div class="score">762</div>
      <div class="username">PotatoSheep</div>
      <div><img class="gene" :src="OpponentGene" alt="" /></div>
      <div class="class">Warrior</div>
    </div>
  </div>
</template>

<style scoped>
.WaitRoot {
  display: flex;
  width: 100vw;
  height: 100vh;
}
.score {
  font-size: 4vw;
}
.username {
  font-size: 3vw;
}
.class {
  font-size: 2vw;
}
.center {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10vw;
  height: 100vh;
  font-size: 9vw;
}
.side {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50vw;
  height: 100%;
}
.gene {
  width: 20vw;
  height: 60vh;
}
</style>
