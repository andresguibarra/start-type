// src/store/index.ts

import type { ShipWord } from '@/components/models/ship-word.model'
import type { Ship } from '@/components/models/ship.model'
import { fetchShips } from '@/services/starshipService'
import { defineStore } from 'pinia'

const BASE_URL = 'https://swapi.dev/api/starships'
const DEFAULT_TIME_LEFT = 90
const WAVE_SIZE = 3

export const useSwapiStore = defineStore({
  id: 'game',
  state: () => ({
    score: 0,
    typedValue: '',
    waveCounter: 1,
    words: [] as ShipWord[],
    isLoading: false,
    destroyedShips: [] as Ship[],
    timerStarted: false,
    timeLeft: DEFAULT_TIME_LEFT,
    timeIsUp: false,
    totalShipWords: [] as ShipWord[],
    nextPage: BASE_URL,
    currentIndex: 0
  }),
  getters: {
    gameOver(state): boolean {
      return state.timeIsUp
    },
    getNextWords(state) {
      const nextWords = state.totalShipWords.slice(
        state.currentIndex,
        state.currentIndex + WAVE_SIZE
      )
      return nextWords
    },
    isWaveCompleted(state) {
      return state.words.every((wordObj) => wordObj.completed)
    }
  },
  actions: {
    startTimer() {
      this.timerStarted = true
      const timerInterval = setInterval(() => {
        this.timeLeft--
        if (this.timeLeft <= 0) {
          clearInterval(timerInterval)
          this.timeIsUp = true
        }
      }, 1000)
    },
    async startGame() {
      await this.fetchShips()
      this.words = this.getNextWords
    },
    async fetchShips() {
      if (this.nextPage) {
        this.isLoading = true
        const { shipsList: newShipsList, nextPage: newNextPage } = await fetchShips(this.nextPage)
        this.isLoading = false
        this.totalShipWords = newShipsList
        this.nextPage = newNextPage
      }
    },
    async updateDisplayedWords() {
      if (this.isWaveCompleted) {
        this.currentIndex += WAVE_SIZE
        if (this.currentIndex >= this.totalShipWords.length && this.nextPage) {
          this.currentIndex = 0
          await this.fetchShips()
        }
        this.words = this.getNextWords
        this.waveCounter++
      }
    },
    async updateWordProgress() {
      for (const wordObj of this.words) {
        if (wordObj.completed) continue

        if (this.typedValue === '' || this.typedValue[0] !== wordObj.word[0]) {
          wordObj.progress.fill(null)
          continue
        }

        for (let i = 0; i < this.typedValue.length && i < wordObj.word.length; i++) {
          const letterMatches = this.typedValue[i] === wordObj.word[i]
          wordObj.progress[i] = letterMatches
          wordObj.progress.fill(null, i + 1)
        }

        if (this.typedValue.length === wordObj.word.length && wordObj.progress.every((p) => p)) {
          wordObj.completed = true
          this.typedValue = ''
          this.score++
          this.destroyedShips.push(wordObj.ship)
          this.words.forEach((w) => w.progress.fill(null))
          break
        }
      }
      await this.updateDisplayedWords()
    },
    updateTypedValue(value: string) {
      this.typedValue = value
    }
  }
})
