<script setup lang="ts">
import { ref } from "vue";
import { Arkanoid } from "@/components/TheArkanoid/Arkanoid";

const gameContainerRef = ref<HTMLElement>();

const gameIsStarted = ref(false);
const gameIsFinished = ref(false);
const playerName = ref("");
const currentPoints = ref(0);

const handleClickStartGameButton = async () => {
  if (gameContainerRef.value) {
    await arkanoid.init(gameContainerRef.value);
    gameIsStarted.value = true;
  }
};
const handleFinishGame = (points: number) => {
  arkanoid.destroy();
  currentPoints.value = points;
  gameIsFinished.value = true;
};
const handleClickFinishButton = () => {
  gameIsStarted.value = false;
  gameIsFinished.value = false;
};
const arkanoid = new Arkanoid(handleFinishGame);
</script>

<template>
  <div :class="$style.container">
    <!--!gameIsStarted && !gameIsFinished    -->
    <div v-if="!gameIsStarted && !gameIsFinished" :class="$style.startForm">
      <div :class="$style.title">Enter name</div>
      <input type="text" v-model="playerName" :class="$style.startFormInput" />
      <button @click.prevent="handleClickStartGameButton" :class="$style.button">Start game</button>
    </div>
    <div :class="$style.gameContainer" ref="gameContainerRef" />
    <!--gameIsStarted && gameIsFinished    -->
    <div v-if="gameIsStarted && gameIsFinished" :class="$style.resultsContainer">
      <div :class="$style.title">Game is finished!</div>
      <div :class="$style.currentPoints">You have earned {{ currentPoints }} points!</div>
      <div>table</div>
      <button @click.prevent="handleClickFinishButton" :class="$style.button">New round</button>
    </div>
  </div>
</template>

<style module>
.container {
  height: 100%;
  position: relative;
}
.gameContainer {
  height: 100%;
  overflow: hidden;
}
.startForm {
  position: absolute;
  top: 50%;
  left: 50%;
  max-width: 400px;
  width: 90%;
  background-color: #fff;
  border-radius: 4px;
  transform: translate(-50%, -50%);
  padding: 20px;
}
.title {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  font-family: Arial, sans-serif;
  margin-bottom: 20px;
}
.startFormInput {
  display: block;
  font-size: 24px;
  font-family: Arial, sans-serif;
  margin-bottom: 20px;
  border: 4px solid #d520f7;
  width: 100%;
  border-radius: 4px;
}
.button {
  display: block;
  width: 100%;
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  background-color: #d520f7;
  padding: 4px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  text-transform: uppercase;
}
.button:hover {
  background-color: #eea6fc;
}
.resultsContainer {
  position: absolute;
  top: 50%;
  left: 50%;
  max-width: 400px;
  width: 90%;
  background-color: #fff;
  border-radius: 4px;
  transform: translate(-50%, -50%);
  padding: 20px;
}
.currentPoints {
  font-size: 24px;
  font-weight: normal;
  font-family: Arial, sans-serif;
  text-align: center;
}
</style>
