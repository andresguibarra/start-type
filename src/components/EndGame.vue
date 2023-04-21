<template>
  <div class="end-game">
    <h2 v-if="!timeIsUp">Congratulations! You won!</h2>
    <h2 v-else>Best luck next time and... may the force be with you</h2>
    <p>Your score: {{ score }}</p>
    <p>Waves completed: {{ wave }}</p>
    <button @click="$emit('restart')">Restart</button>
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
  timeIsUp: {
    type: Boolean,
    required: true
  }
})
</script>

<style scoped>
.end-game {
  text-align: center;
  margin-top: 2rem;
}

button {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}
</style>
