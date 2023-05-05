<template>
  <div id="game-container">
    <h1>Star[t] Type</h1>
    <p class="description">
      Start typing to begin the game, and try to complete each wave before the time runs out.
      <br />
      Good luck and may the force be with you!
    </p>
    <template v-if="!gameOver">
      <StatusBar />
      <div v-if="!isLoading" class="enemy-ships">
        <div class="words-container">
          <Word v-for="(wordObj, index) in words" :key="index" :wordObj="wordObj"></Word>
        </div>
      </div>
      <LoadingSpinner v-if="isLoading" />
      <InputBox />
      <button v-if="!isLoading && false" @click="endWave()">End wave (dev only)</button>
    </template>
    <EndGame v-else-if="gameOver && !isLoading" @restart="restartGame" />
    <DestroyedShipsLog />
  </div>
</template>

<script setup lang="ts">
import { useSwapiStore } from '@/store'
import { storeToRefs } from 'pinia'
import InputBox from './InputBox.vue'
import Word from './Word.vue'
import StatusBar from './StatusBar.vue'
import EndGame from './EndGame.vue'
import LoadingSpinner from './LoadingSpinner.vue'
import DestroyedShipsLog from './DestroyedShipsLog.vue'

const store = useSwapiStore()
const { isLoading, words, gameOver } = storeToRefs(store)

;(async () => {
  await store.startGame()
})()

const endWave = () => {
  words.value.forEach((w) => (w.completed = true))
  store.updateDisplayedWords()
}

const restartGame = async () => {
  store.$reset()
  await store.startGame()
}
</script>

<style scoped>
#game-container {
  width: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100%;
  text-align: center;
}

.description {
  margin-bottom: 2rem;
}

.enemy-ships {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 3rem;
}

.words-container {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  grid-gap: 10px;
}
</style>
