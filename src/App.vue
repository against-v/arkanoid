<script setup lang="ts">
import GameScreen from "@/components/GameScreen/GameScreen.vue"
</script>

<template>
  <main :class="$style.container">
    <GameScreen />
  </main>
</template>

<style module>
.container {
  height: 100%;
}
</style>
