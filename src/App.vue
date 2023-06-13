<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useQuasar } from 'quasar';
import { useAppStore } from '@/stores/app';

export default defineComponent({
  name: 'App',
  setup() {
    const time = new Date();
    const hour = time.getHours();
    const $q = useQuasar();
    const appStore = useAppStore();
    console.log(hour);
    if (hour > 18 || hour < 6) {
      // 设置为夜间模式
      $q.dark.set(true);
      appStore.setDarkThemeStatus(true);
      return;
    }
    // 设置为夜间模式
    $q.dark.set(false);
    appStore.setDarkThemeStatus(false);
  },
});
</script>
