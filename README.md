# Star[t] Type

Welcome to Star[t] Type, a fun and challenging typing game set in the Star Wars universe! Test your typing speed and accuracy by typing the names of various starships as quickly as possible. Complete each wave before the time runs out to win the game.

![Game Screenshot](./screenshot.png)

## Demo

Try out the live demo here: [https://start-type.web.app](https://start-type.web.app)

## How to Play

1. Start typing the name of the starship displayed on the screen.
2. Complete each wave before the timer reaches zero.
3. Keep an eye on your score and wave counter in the status bar.
4. If you manage to complete all the waves within the given time, you win the game!
5. (Optional) Hover over the pilots to display a table with more information about them. You can sort the information in ascending or descending order by clicking on the header of each column.
![Game Screenshot](./screenshot-2.png)

Good luck and may the force be with you!

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```