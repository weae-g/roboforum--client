<template>
    <v-account-favorite-projects :userId="user.userId" />
    <v-account-favorite-discussions :userId="user.userId"/>
</template>
<script>
import store from "@/store";
import VAccountFavoriteDiscussions from "./VAccountFavoriteDiscussions.vue";
import VAccountFavoriteProjects from "./VAccountFavoriteProjects.vue";
import { computed } from "vue";
export default {
  components: { VAccountFavoriteProjects, VAccountFavoriteDiscussions },
  setup() {
    const user = computed(() => store.state.auth.user);
    return {
      user,
    };
  },
};
</script>
