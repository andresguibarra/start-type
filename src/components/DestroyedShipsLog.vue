<template>
  <div class="destroyed-ships-log" v-if="destroyedShips.length">
    <h2>Destroyed Ships:</h2>
    <ul>
      <li v-for="(ship, index) in destroyedShips" :key="index">
        {{ ship.name }} (
        <span>
          <Popper hover>
            <span class="pilots">{{ ship.pilots.length }} pilots</span>
            <template #content>
              <PeopleTableVue v-if="ship.pilots.length" :urls="ship.pilots"></PeopleTableVue>
              <span v-else>No pilots found</span>
            </template>
          </Popper>
        </span>
        and {{ ship.passengers }} passengers)
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import Popper from 'vue3-popper'
import PeopleTableVue from './PeopleTable.vue'
import { useSwapiStore } from '@/store';
import { storeToRefs } from 'pinia';

const { destroyedShips } = storeToRefs(useSwapiStore())
</script>

<style scoped>
.pilots {
  text-decoration: underline;
  color: #4dc5c5;
  cursor: pointer;
}
.destroyed-ships-log {
  width: 800px;
  margin: 2rem auto;
  text-align: center;
}

.destroyed-ships-log ul {
  list-style-type: none;
  padding: 0;
}
</style>
