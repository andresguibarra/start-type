<!-- StatusBar.vue -->
<template>
  <div class="status-bar">
    <div class="score">Score: {{ score }}</div>
    <div>Time Left: {{ timeLeft }} seconds</div>

    <div class="wave">Wave: {{ waveCounter }}</div>
  </div>
</template>

<script setup lang="ts">
import { useSwapiStore } from '@/store';
import { storeToRefs } from 'pinia';

const store = useSwapiStore()
const { score, waveCounter, timeLeft } = storeToRefs(store)

</script>

<style scoped>
.status-bar {
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  margin-bottom: 1rem;
}

.score,
.wave {
  font-size: 18px;
}
</style>
