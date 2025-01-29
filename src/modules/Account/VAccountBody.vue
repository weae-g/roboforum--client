<template>
    <v-account-projects :userId="user.userId" />
    <v-account-discussions :userId="user.userId"/>
</template>
<script>
import store from "@/store";
import VAccountDiscussions from "./VAccountDiscussions.vue";
import VAccountProjects from "./VAccountProjects.vue";
import { computed } from "vue";
export default {
  components: { VAccountProjects, VAccountDiscussions },
  setup() {
    const user = computed(() => store.state.auth.user);
    return {
      user,
    };
  },
};
</script>
<style lang=""></style>
