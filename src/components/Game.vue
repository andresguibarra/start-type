<template>
  <div id="game-container">
    <h1>Star[t] Type</h1>
    <p class="description">
      Start typing to begin the game, and try to complete each wave before the time runs out.
      <br/> 
      Good luck and may the force be with you!
    </p>
    <template v-if="!gameOver">
      <StatusBar :score="score" :wave="waveCounter" :timeLeft="timeLeft" />
      <div v-if="!isLoading" class="enemy-ships">
        <div class="words-container">
          <Word v-for="(wordObj, index) in words" :key="index" :wordObj="wordObj"></Word>
        </div>
      </div>
      <LoadingSpinner v-if="isLoading" />
      <InputBox v-model="typedValue" @input="updateWordProgress" />
      <button v-if="!isLoading && false" @click="endWave()">End wave (dev only)</button>
    </template>
    <EndGame
      :timeIsUp="timeIsUp"
      v-else-if="gameOver && !isLoading"
      :score="score"
      :wave="waveCounter"
      @restart="restartGame"
    />
    <DestroyedShipsLog :destroyedShips="destroyedShips" />
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref, computed } from 'vue'
import InputBox from './InputBox.vue'
import Word from './Word.vue'
import { fetchShips } from '../services/starshipService'
import StatusBar from './StatusBar.vue'
import EndGame from './EndGame.vue'
import LoadingSpinner from './LoadingSpinner.vue'
import type { Ship } from './models/ship.model'
import DestroyedShipsLog from './DestroyedShipsLog.vue'

const BASE_URL = 'https://swapi.dev/api/starships'
const DEFAULT_TIME_LEFT = 90
const score = ref(0)
const typedValue = ref('')
const waveCounter = ref(1)
const words: Ref<any[]> = ref([])
const isLoading = ref(false)
const destroyedShips: Ref<Ship[]> = ref([])
const timerStarted = ref(false)

const timeLeft = ref(DEFAULT_TIME_LEFT)
const timeIsUp = ref(false)

let shipsList: any[] = []
let nextPage: Ref<string> = ref(BASE_URL)
let currentIndex = 0

const getNextWords = (shipsList: any[]) => {
  const nextWords = shipsList.slice(currentIndex, currentIndex + 3)
  return nextWords
}

const startTimer = () => {
  const timerInterval = setInterval(() => {
    timeLeft.value--
    if (timeLeft.value <= 0) {
      clearInterval(timerInterval)
      timeIsUp.value = true
    }
  }, 1000)
}

const startGame = async (url: string) => {
  isLoading.value = true
  const { shipsList: initialShipsList, nextPage: initialNextPage } = await fetchShips(url)
  shipsList = initialShipsList
  nextPage.value = initialNextPage
  words.value = getNextWords(shipsList)
  isLoading.value = false
}

;(async () => {
  await startGame(nextPage.value)
})()

const endWave = () => {
  words.value.forEach((w) => (w.completed = true))
  updateDisplayedWords()
}

const gameOver = computed(() => {
  return (!nextPage.value && checkCompleted()) || timeIsUp.value
})

const restartGame = async () => {
  score.value = 0
  typedValue.value = ''
  waveCounter.value = 1
  currentIndex = 0
  timerStarted.value = false
  timeIsUp.value = false
  timeLeft.value = DEFAULT_TIME_LEFT
  destroyedShips.value = []
  await startGame(BASE_URL)
}
const checkCompleted = () => {
  return words.value.every((wordObj) => wordObj.completed)
}

const updateWordProgress = async () => {
  if (!timerStarted.value && typedValue.value !== '') {
    startTimer()
    timerStarted.value = true
  }
  for (const wordObj of words.value) {
    let isMatchingWord = true
    if (typedValue.value === '') {
      wordObj.progress.fill(null)
      wordObj.isMatching = false
      continue
    }
    const lowercaseTypedValue = typedValue.value.toLowerCase()
    const lowercaseWord = wordObj.word.toLowerCase()
    for (let i = 0; i < lowercaseWord.length; i++) {
      const letterMatches = lowercaseTypedValue[i] === lowercaseWord[i]

      if (isMatchingWord && letterMatches) {
        wordObj.progress[i] = true
        wordObj.isMatching = true
      } else if (isMatchingWord && !letterMatches && lowercaseTypedValue[i] !== undefined) {
        wordObj.progress[i] = false
        isMatchingWord = false
      } else {
        wordObj.progress[i] = null
      }
    }

    if (!isMatchingWord && !wordObj.isMatching) {
      wordObj.progress.fill(null)
    } else if (isMatchingWord && lowercaseWord.length === lowercaseTypedValue.length) {
      wordObj.completed = true
      typedValue.value = ''
      score.value++
      destroyedShips.value.push(wordObj.ship)
    }
  }
  await updateDisplayedWords()
}

const updateDisplayedWords = async () => {
  if (checkCompleted()) {
    currentIndex += 3
    if (currentIndex >= shipsList.length && nextPage.value) {
      isLoading.value = true
      currentIndex = 0
      const { shipsList: newShipsList, nextPage: newNextPage } = await fetchShips(nextPage.value)
      shipsList = newShipsList
      nextPage.value = newNextPage
      isLoading.value = false
    }
    words.value = getNextWords(shipsList)
    waveCounter.value++
  }
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
