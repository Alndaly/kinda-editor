<template>
  <q-layout view="hHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Kinda Editor </q-toolbar-title>
        <q-toggle
          :model-value="darkThemeStatus"
          @update:model-value="toggleDarkTheme"
          checked-icon="dark_mode"
          color="blue"
          label="夜间"
          unchecked-icon="sunny"
        />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> 大纲 </q-item-label>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/stores/app';
const appStore = useAppStore();

const { darkThemeStatus } = storeToRefs(appStore);
const leftDrawerOpen = ref(false);

const $q = useQuasar();

const toggleDarkTheme = () => {
  appStore.setDarkThemeStatus(!darkThemeStatus.value);
  $q.dark.toggle();
};

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
</script>
