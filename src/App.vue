<template>
  <div>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import {KeyCommand} from "@/commands/KeyCommand";
import {Game} from "@/Game";

export default {
  name: 'App',
  components: {},
  mounted() {
    KeyCommand.start()
    new Game()
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style>
body {
  margin: 0;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
