<template>
  <div class="input-container">
    <input
      class="input-box"
      ref="$inputBox"
      type="text"
      placeholder="Attack by typing the ship name..."
      :value="typedValue"
      @input="updateInputValue"
    />
  </div>
</template>

<script setup lang="ts">
import { useSwapiStore } from '@/store'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'

const store = useSwapiStore()
const { timerStarted, typedValue } = storeToRefs(store)
const $inputBox = ref<HTMLElement>()

const updateInputValue = async (event: Event) => {
  store.updateTypedValue((event.target as HTMLInputElement).value)
  const inputContainer = document.querySelector('.input-container')
  inputContainer?.classList.add('animate-input')
  setTimeout(() => {
    inputContainer?.classList.remove('animate-input')
  }, 500)
  if (!timerStarted.value && typedValue.value !== '') {
    store.startTimer()
  }

  await store.updateWordProgress()
}

onMounted(() => {
  $inputBox!.value!.focus()
})
</script>

<style>
.input-container {
  border: 2px solid black;
  padding: 10px;
  width: 100%;
  max-width: 400px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  background-color: #222;
  border-radius: 25px;
  transition: transform 0.5s;
}

.animate-input {
  transform: scale(1.05);
}

.input-box {
  width: 100%;
  background-color: transparent;
  color: white;
  border: none;
  outline: none;
  font-size: 18px;
  padding: 5px;
}

::placeholder {
  color: #aaa;
}
</style>
