<script setup lang="ts">
import { Game, NumberToShapeImg } from '../stores/game';
import { storeToRefs } from 'pinia';
import { ref, computed, watch } from 'vue';

const gameobj = Game();
const {
  Opponent,
  User,
  TurnCnt,
  UserHPStyle,
  OpponentHPStyle,
  TimerStyle,
  UserGeneSrc,
  OpponentGeneSrc,
} = storeToRefs(gameobj);
const { SelectSkill, Init, User_Ready } = gameobj;
function c() {
  gameobj.TurnStart(); //renew by every turn
  console.log(UserHPStyle.value);
}
function d() {
  gameobj.TurnEnd(); //renew by every turn
  console.log(UserHPStyle.value);
}

const UserSkills = User.value.skills;
const OpponentSkills = Opponent.value.skills;
Init();
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
        <div>
          <img @click="User_Ready()" class="gene" :src="UserGeneSrc" alt="" />
        </div>
        <div class="health_bar">
          <div class="hit_bar" :style="UserHPStyle"></div>
          <div class="health">
            <div>{{ User.hp }}</div>
            <div>/30</div>
          </div>
        </div>
        <div>shield</div>
      </div>
    </div>
    <div class="center">
      <div class="Turncnt" @click="d()">{{ TurnCnt }}</div>
      <div class="timer_bar" @click="c()">
        <div class="count_bar" :style="TimerStyle"></div>
      </div>
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
        <div><img class="gene" :src="OpponentGeneSrc" alt="" /></div>
        <div class="health_bar">
          <div class="hit_bar" :style="OpponentHPStyle"></div>
          <div class="health">
            <div>{{ Opponent.hp }}</div>
            <div>/30</div>
          </div>
        </div>
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
  height: 6vh;
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
  margin-top: 4vh;
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
.timer_bar {
  position: relative;
  width: 4vw;
  height: 60vh;
  margin-bottom: 10vh;
  background-color: black;
}
.count_bar {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 0;
  background: red;
}
.health_bar {
  position: relative;
  width: 16.4vw;
  height: 4vh;
  background: rgb(245, 74, 74);
  border: 0.2vw solid white;
  border-radius: 5px;
}

.hit_bar {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  background: black;
}
.health {
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4vw;
  height: 4vh;
  margin-top: -2vh;
  margin-left: -2vw;
  font-size: 1.3vw;
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
