<template>
  <div class="col q-mr-md account-sidebar">
    <q-card flat class="q-mb-md bg-negative">
      <q-card-section>
        <q-img
          v-if="!userProfile"
          src="/alien.jpg"
          spinner-color="white"
          img-class="my-avatar"
          class="my-avatar"
          fit="cover">
          <div class="absolute-bottom text-subtitle1 text-center">
            {{ userProfile.user.username }}
          </div>
        </q-img>
        <q-img
          v-else
          :src="`${VITE_APP_API_URL}/uploads/${userProfile.image}`"
          spinner-color="white"
          class="my-avatar"
          img-class="my-avatar"
          fit="cover">
          <div class="absolute-bottom text-subtitle1 text-center">
            {{ userProfile.user.username }}
          </div>
        </q-img>
      </q-card-section>
    </q-card>
    <q-card flat class="q-mb-md bg-negative">
      <q-card-section>
        <q-btn
          @click="navigateTo('userBody'), { userId: routeUserId }"
          class="full-width q-mb-md bg-grey-10"
          flat
          label="Главная" />

        <q-btn
          @click="
            navigateTo('foreignUserProjects', {
              userId: routeUserId,
            })
          "
          flat
          class="full-width q-mb-md bg-grey-10"
          label="Проекты" />

        <q-btn
          @click="
            navigateTo('foreignUserDiscussions', {
              userId: routeUserId,
            })
          "
          flat
          class="full-width q-mb-md bg-grey-10"
          label="Обсуждения" />
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { useNavigation } from "@/hooks/useNavigation";

export default {
  setup() {
    const store = useStore();
    const route = useRoute();

    const { navigateTo } = useNavigation();

    const userProfile = computed(
      () => store.state.user.userProfile || localStorage.getItem("userProfile")
    );

    const routeUserId = computed(() => route.params.userId);

    const loadData = async () => {
      await store.dispatch("user/GET_USER_PROFILE", {
        userId: routeUserId.value,
      });
    };

    onMounted(() => {
      loadData();
    });

    return {
      navigateTo,
      store,
      userProfile,
      VITE_APP_API_URL: import.meta.env.VITE_APP_API_URL,
      routeUserId,
    };
  },
};
</script>
<style lang="scss" scoped>
.my-avatar {
  min-width: 100% !important;
  height: 300px;
}
.account-sidebar {
  overflow: auto;
  min-width: 25%;
  max-width: 25%;
}

@media screen and (max-width: 1023px) {
  .account-sidebar {
    min-width: 100%;
    max-width: 100%;
  }
}
</style>
