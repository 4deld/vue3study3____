<script setup lang="ts">
import { Game, Turn, NumberToShapeImg } from '../stores/game';
import { storeToRefs } from 'pinia';
const gameobj = Game();
const turnobj = Turn();
const { Opponent, User } = storeToRefs(gameobj);
function c() {
  gameobj.GetDefenseValue(); //renew by every turn
}

const UserSkills = User.value.skills;
const OpponentSkills = Opponent.value.skills;
console.log(User.value.cards);
</script>

<template>
  <div class="IngameRoot">
    <div class="side">
      <div class="Skills">
        <div v-for="s in UserSkills" class="SkillInfo">
          <div>{{ s.name }}</div>
          <div class="Shapes">
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
        <div>
          <div v-for="q in User.cards">
            <img class="ShapeImg" :src="NumberToShapeImg(q)" alt="" />
          </div>
        </div>
        <div class="playername">Username</div>
        <div><img class="gene" src="../assets/Genes/Gene2.png" alt="" /></div>
        <div>hp</div>
        <div>shield</div>
      </div>
    </div>
    <div class="timer">timer</div>
    <div class="side">
      <div class="Skills rightside">
        <div v-for="s in OpponentSkills" class="SkillInfo">
          <div>{{ s.name }}</div>
          <div class="Shapes">
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
        <div>
          <div v-for="q in User.cards">
            <img class="ShapeImg" :src="NumberToShapeImg(q)" alt="" />
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
.timer {
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
  width: 50vw;
  height: 100%;
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
}
.Shapes {
  display: flex;
}
</style>
