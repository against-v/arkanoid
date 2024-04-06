<script setup lang="ts">
import TheArkanoid from "@/components/TheArkanoid/TheArkanoid.vue"
</script>

<template>
  <div :class="$style.container">
    <TheArkanoid />
  </div>
</template>

<style module>
.container {
  background-color: grey;
  height: 100%;
}
</style>
