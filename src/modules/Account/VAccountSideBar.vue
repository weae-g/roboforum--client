<template>
  <div class="col q-mr-md account-sidebar">
    <q-card flat class="q-mb-md bg-negative">
      <q-card-section>
        <q-img
          v-if="!userProfile?.image"
          src="/alien.jpg"
          spinner-color="white"
          img-class="my-avatar"
          class="my-avatar"
          fit="cover">
          <div class="absolute-bottom text-subtitle1 text-center">
            {{ user.username }}
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
            {{ user.username }}
          </div>
        </q-img>
      </q-card-section>
    </q-card>
    <q-card flat class="q-mb-md bg-negative">
      <q-card-section>
        <q-btn
          @click="
            navigateTo('accountBody'), { userId: store.state.auth.user?.userId }
          "
          class="full-width q-mb-md bg-grey-10"
          flat
          label="Главная" />

        <q-btn
          @click="navigateTo('accountEdit')"
          flat
          class="full-width q-mb-md bg-grey-10"
          label="Редактировать профиль" />

        <q-btn
          @click="
            navigateTo('userProjects', {
              userId: store.state.auth.user?.userId,
            })
          "
          flat
          class="full-width q-mb-md bg-grey-10"
          label="Мои проекты" />

        <q-btn
          @click="
            navigateTo('userDiscussions', {
              userId: store.state.auth.user?.userId,
            })
          "
          flat
          class="full-width q-mb-md bg-grey-10"
          label="Мои обсуждения" />

        <q-btn
          @click="
            navigateTo('favorite', { userId: store.state.auth.user?.userId })
          "
          class="full-width q-mb-md bg-grey-10"
          flat
          label="Избранное" />

        <q-btn @click="onLogout" class="full-width" color="red" label="Выйти" />
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useNavigation } from "@/hooks/useNavigation";

export default {
  setup() {
    const store = useStore();

    const { navigateTo } = useNavigation();

    const user = computed(
      () => store.state.auth.user || localStorage.getItem("user")
    );

    const userProfile = computed(
      () => store.state.user.userProfile || localStorage.getItem("userProfile")
    );

    const onLogout = async () => {
      await store.dispatch("auth/ON_LOGOUT").then(() => {
        location.reload();
      });
    };

    const loadData = async () => {
      await store.dispatch("user/GET_USER_PROFILE", {
        userId: store.state.auth.user.userId,
      });
    };

    onMounted(() => {
      loadData();
    });

    return {
      navigateTo,
      onLogout,
      store,
      user,
      userProfile,
      VITE_APP_API_URL: import.meta.env.VITE_APP_API_URL,
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
