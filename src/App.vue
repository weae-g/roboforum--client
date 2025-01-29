<template>
  <q-layout>
    <TheHeader />
    <!-- <q-drawer show-if-above side="left" class="my-drawer">
    </q-drawer> -->
    <q-page-container class="q-mx-md">
      <router-view />
    </q-page-container>
    <!-- <q-drawer show-if-above side="right" class="my-drawer">
    </q-drawer> -->
  </q-layout>
  <VBackgroundStars />
</template>

<script>
import { useQuasar } from "quasar";
import TheHeader from "./layouts/TheHeader.vue";
import VBackgroundStars from "./components/VBackgroundStars.vue";

export default {
  name: "MainLayout",

  components: { TheHeader, VBackgroundStars },

  setup() {
    const $q = useQuasar();
    $q.dark.set(true);
    return {};
  },
};
</script>

<style>
.q-drawer {
  background: transparent;
}
.q-page {
  z-index: 999;
}
</style>
