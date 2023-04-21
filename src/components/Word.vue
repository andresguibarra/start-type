<template>
  <div class="word" :class="{ completed: wordObj.completed }">
    <div class="word-image-container">
      <img :src="imagePath" alt="Starship image" class="word-image" />
      <div>
        <span
          v-for="(letter, i) in capitalizedWord"
          :key="i"
          :class="{
            correct: wordObj.progress[i] === true,
            incorrect: wordObj.progress[i] === false
          }"
        >
          {{ letter }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  wordObj: { type: Object, required: true }
})

const imagePath = computed(() => {
  const shipName = props.wordObj.word.toLowerCase().replace(/\s+/g, '-')
  return `./${shipName}.png`
})

const capitalizedWord = computed(() => {
  return props.wordObj.word.toUpperCase()
})
</script>

<style scoped>
.word-image-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  height: 150px;
}
.word-image {
  max-width: 100px;
}
.correct {
  background-color: green;
  color: white;
}

.incorrect {
  background-color: rgb(241, 241, 135);
  color: rgb(63, 62, 62);
}

.word {
  font-family: sans-serif;
  text-transform: capitalize;
  font-size: 24px;
  color: white;
}

.word:nth-child(1) {
  grid-column-start: 1;
  grid-column-end: 2;
}

.word:nth-child(2) {
  grid-column-start: 2;
  grid-column-end: 3;
}

.word:nth-child(3) {
  grid-column-start: 3;
  grid-column-end: 4;
}

@keyframes explode {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(3);
    opacity: 0;
  }
}

.word.completed {
  opacity: 0;
  pointer-events: none;
  animation: explode 0.5s forwards;
}
</style>
