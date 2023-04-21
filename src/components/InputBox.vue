<template>
  <div class="input-container">
    <input
      class="input-box"
      type="text"
      placeholder="Attack by typing the ship name..."
      :value="modelValue"
      @input="updateInputValue"
    />
  </div>
</template>

<script setup lang="ts">
defineProps({
  modelValue: String
})

const emit = defineEmits(['update:modelValue'])

const updateInputValue = (event: Event) => {
  const inputContainer = document.querySelector('.input-container')
  inputContainer?.classList.add('animate-input')
  setTimeout(() => {
    inputContainer?.classList.remove('animate-input')
  }, 500)
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
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
