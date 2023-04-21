<template>
  <div>
    <table>
      <thead>
        <tr>
          <th v-for="header in headers" :key="header" @click="sortTable(header)">
            {{ header }}
            <span v-if="sortOrder.column === header.toLowerCase().replace(' ', '_')">
              {{ sortOrder.ascending ? '↑' : '↓' }}
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="person in people" :key="person.url">
          <td>{{ person.name }}</td>
          <td>{{ person.height }}</td>
          <td>{{ person.mass }}</td>
          <td>{{ person.hair_color }}</td>
          <td>{{ person.skin_color }}</td>
          <td>{{ person.eye_color }}</td>
          <td>{{ person.birth_year }}</td>
          <td>{{ person.gender }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, ref } from 'vue'
import type { People } from './models/people.model'
import { fetchPeople } from '@/services/peopleService'

const props = defineProps<{ urls: string[] }>()

const headers = [
  'Name',
  'Height',
  'Mass',
  'Hair Color',
  'Skin Color',
  'Eye Color',
  'Birth Year',
  'Gender'
]

const people = ref<People[]>([])
const sortOrder = ref<{ column: string; ascending: boolean }>({
  column: '',
  ascending: true
})

onMounted(async () => {
  const peoplePromises = props.urls.map((url) => fetchPeople(url))
  people.value = await Promise.all(peoplePromises)
})

const sortFunctions = {
  string: (a: string, b: string, ascending: boolean) => {
    if (a === b) return 0
    return ascending ? (a < b ? -1 : 1) : a > b ? -1 : 1
  },
  number: (a: string, b: string, ascending: boolean) => {
    const numA = parseFloat(a)
    const numB = parseFloat(b)
    if (numA === numB) return 0
    return ascending ? (numA < numB ? -1 : 1) : numA > numB ? -1 : 1
  }
}

const sortTable = (header: string) => {
  const sortColumn = header.toLowerCase().replace(' ', '_')
  sortOrder.value.ascending =
    sortOrder.value.column === sortColumn ? !sortOrder.value.ascending : true
  sortOrder.value.column = sortColumn

  const isNumeric = ['height', 'mass'].includes(sortColumn)
  const compareFunction = isNumeric ? sortFunctions.number : sortFunctions.string

  people.value.sort((a: any, b: any) => {
    const aValue = a[sortOrder.value.column]
    const bValue = b[sortOrder.value.column]
    return compareFunction(aValue, bValue, sortOrder.value.ascending)
  })
}
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}

th {
  font-weight: bold;
  cursor: pointer;
}
</style>
