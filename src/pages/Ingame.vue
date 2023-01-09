<script setup lang="ts">
import { Game, NumberToShapeImg } from '../stores/game';
import { storeToRefs } from 'pinia';
import { ref, computed, watch } from 'vue';

const gameobj = Game();
const { Opponent, User, TurnCnt } = storeToRefs(gameobj);
const { SelectSkill } = gameobj;
function c() {
  gameobj.Turn(); //renew by every turn
  console.log(Opponent.value.cards[0]);
}
const UserSkills = User.value.skills;
const OpponentSkills = Opponent.value.skills;
</script>

<template>
  <div class="IngameRoot">
    <div class="side">
      <div class="Skills">
        <div :style="s.style" @click="SelectSkill(s.id)" v-for="s in UserSkills" class="SkillInfo">
          <div>{{ s.name }}</div>
          <div class="SkillCardShapes">
            <div v-for="q in s.resources">
              <img class="ShapeImg" :src="NumberToShapeImg(q)" alt="" />
            </div>
          </div>
          <div class="CombatElement" v-if="s.damage">
            <img class="CombatImg" src="../assets/Combat/damage.png" alt="" />
            <div>{{ s.damage }}</div>
          </div>
          <div class="CombatElement" v-if="s.shield">
            <img class="CombatImg" src="../assets/Combat/shield.png" alt="" />
            <div>{{ s.shield }}</div>
          </div>
          <div class="CombatElement" v-if="s.heal">
            <img class="CombatImg" src="../assets/Combat/heal.png" alt="" />
            <div>{{ s.heal }}</div>
          </div>
        </div>
      </div>
      <div class="Player">
        <div class="PlayerCards">
          <div v-for="q in User.cards">
            <img class="PlayerShapeImg" :src="NumberToShapeImg(q)" alt="" />
          </div>
        </div>
        <div class="playername">Username</div>
        <div><img class="gene" src="../assets/Genes/Gene2.png" alt="" /></div>
        <div>hp</div>
        <div>shield</div>
      </div>
    </div>
    <div class="center">
      <div @click="c()">timer</div>
      <div class="Turncnt">{{ TurnCnt }}</div>
    </div>
    <div class="side">
      <div class="Skills rightside">
        <div :style="s.style" v-for="s in OpponentSkills" class="SkillInfo">
          <div>{{ s.name }}</div>
          <div class="SkillCardShapes">
            <div v-for="q in s.resources">
              <img class="ShapeImg" :src="NumberToShapeImg(q)" alt="" />
            </div>
          </div>
          <div class="CombatElement" v-if="s.damage">
            <img class="CombatImg" src="../assets/Combat/damage.png" alt="" />
            <div>{{ s.damage }}</div>
          </div>
          <div class="CombatElement" v-if="s.shield">
            <img class="CombatImg" src="../assets/Combat/shield.png" alt="" />
            <div>{{ s.shield }}</div>
          </div>
          <div class="CombatElement" v-if="s.heal">
            <img class="CombatImg" src="../assets/Combat/heal.png" alt="" />
            <div>{{ s.heal }}</div>
          </div>
        </div>
      </div>
      <div class="Player">
        <div class="PlayerCards">
          <div v-for="q in Opponent.cards">
            <img class="PlayerShapeImg" :src="NumberToShapeImg(q)" alt="" />
          </div>
        </div>
        <div class="playername">PotatoSheep</div>
        <div><img class="gene" src="../assets/Genes/Gene2.png" alt="" /></div>
        <div>hp</div>
        <div>shield</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.IngameRoot {
  display: flex;
  width: 100vw;
  height: 100vh;
}
.SkillInfo {
  display: flex;
  width: 30vw;
  margin: 0.1vw;
  font-size: 2vw;
  border: 0.1vw solid white;
}
.CombatImg {
  width: 3vw;
}
.CombatElement {
  display: flex;
}
.center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 10vw;
  height: 100vh;
  font-size: 4vw;
}
.Turncnt {
  margin-bottom: 30vh;
}
.side {
  display: flex;
  flex-direction: column;
  width: 50vw;
  height: 100%;
}
.playername {
  font-size: 3vw;
}
.opponentside {
  display: flex;
  flex-direction: column;
  width: 50vw;
  height: 100%;
}
.Skills {
  display: flex;
  flex-direction: column;
}
.rightside {
  align-items: flex-end;
}
.Player {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.gene {
  width: 10vw;
}
.ShapeImg {
  width: 3vw;
  margin: 0.1vw;
}
.PlayerShapeImg {
  width: 5vw;
  margin: 0.1vw;
}
.SkillCardShapes {
  display: flex;
}
.PlayerCards {
  display: flex;
  margin-top: 5vh;
}
</style>
