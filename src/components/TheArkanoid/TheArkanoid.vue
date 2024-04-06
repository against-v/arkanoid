<script setup lang="ts">
import { useArkanoidLauncher } from "@/components/TheArkanoid/composables/useArkanoidLauncher";
import { onMounted, ref } from "vue";

const { init } = useArkanoidLauncher();

const containerRef = ref<HTMLElement>();

onMounted(() => {
  if (containerRef.value) {
    void init(containerRef.value);
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
