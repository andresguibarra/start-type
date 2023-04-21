<!-- StatusBar.vue -->
<template>
  <div class="status-bar">
    <div class="score">Score: {{ score }}</div>
    <div>Time Left: {{ timeLeft }} seconds</div>

    <div class="wave">Wave: {{ wave }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  score: {
    type: Number,
    required: true
  },
  wave: {
    type: Number,
    required: true
  },
  timeLeft: {
    type: Number,
    required: true
  }
})
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
