<template>
  <q-card class="q-mb-md" flat>
    <q-card-section class="bg-negative text-white">
      <div class="text-h6">{{ userProfile?.name }}</div>
      <div class="text-subtitle2">{{ userProfile?.user.email }}</div>
    </q-card-section>

    <q-separator />

    <q-card-section>
      <div class="text-body1">{{ userProfile?.bio }}</div>
      <div class="text-body1">{{ userProfile?.company }}</div>
      <div class="text-body1">{{ userProfile?.location }}</div>
    </q-card-section>

    <q-card-section>
      <q-chip
        v-for="(social, index) in userProfile?.userSocials"
        :key="index"
        color="indigo"
        text-color="white"
        icon="link"
        >{{ social.link }}</q-chip
      >
    </q-card-section>
  </q-card>
  <v-foreign-account-projects :userId="routeUserId" />
  <v-foreign-account-discussions :userId="routeUserId" />
</template>
<script>
import VForeignAccountDiscussions from "./VForeignAccountDiscussions.vue";
import VForeignAccountProjects from "./VForeignAccountProjects.vue";
import { onMounted, reactive, computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default {
  components: { VForeignAccountDiscussions, VForeignAccountProjects },
  setup() {
    const store = useStore();
    const route = useRoute();
    const routeUserId = computed(() => route.params.userId);

    const userProfile = computed(() => store.state.user.userProfile);

    const loadData = async () => {
      await store.dispatch("user/GET_USER_PROFILE", {
        userId: routeUserId.value,
      });
    };

    onMounted(() => {
      loadData();
    });
    return {
      routeUserId,
      userProfile,
    };
  },
};
</script>
