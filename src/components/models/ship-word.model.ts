import type { Ship } from "./ship.model"

export interface ShipWord {
  word: string
  ship: Ship
  progress: (boolean | null)[]
  isMatching: boolean
  completed: boolean
}
