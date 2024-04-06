<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Arkanoid } from "@/components/TheArkanoid/Arkanoid";

const containerRef = ref<HTMLElement>();

const arkanoid = new Arkanoid();

onMounted(() => {
  if (containerRef.value) {
    void arkanoid.init(containerRef.value);
  }
});
</script>

<template>
  <div :class="$style.container" ref="containerRef" />
</template>

<style module>
.container {
  height: 100%;
  overflow: hidden;
}
</style>
