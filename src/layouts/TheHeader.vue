<template>
  <q-header
    :class="{ 'modal-open': isAuthDialog || isRegDialog }"
    class="text-white bg-negative"
    height-hint="61.59">
    <q-toolbar class="q-py-sm q-px-md">
      <router-link to="/">
        <q-btn
          dense
          flat
          icon="computer"
          size="24px"
          color="white"
          class="q-pa-sm logo"
          no-caps />
      </router-link>

      <div
        v-if="$q.screen.gt.sm"
        class="GL__toolbar-link q-ml-xs q-gutter-md text-body2 row items-center no-wrap">
        <router-link
          class="q-pa-sm"
          v-for="(link, index) in headerLinks"
          :key="index"
          :to="{ name: link.route }"
          >{{ link.name }}</router-link
        >
      </div>

      <q-space />

      <div
        v-if="!user"
        class="GL__toolbar-link q-ml-xs q-gutter-md text-body2 row items-center no-wrap">
        <a
          href="javascript:void(0)"
          @click="isAuthDialog = true"
          class="text-white">
          Войти
        </a>
        <a
          href="javascript:void(0)"
          @click="isRegDialog = true"
          class="text-white">
          Регистрация
        </a>
      </div>
      <div v-if="user">
        {{ user.email }}
      </div>

      <div v-if="user" class="q-pl-sm q-gutter-sm row items-center no-wrap">
        <q-btn v-if="$q.screen.gt.xs" dense flat>
          <div class="row items-center no-wrap">
            <q-icon name="add" size="20px" />
            <q-icon
              name="arrow_drop_down"
              size="16px"
              style="margin-left: -2px" />
          </div>
          <q-menu :offset="[0, 10]" auto-close>
            <q-list dense style="min-width: 100px">
              <q-item clickable class="GL__menu-link">
                <q-item-section @click="navigateTo('newProject')"
                  >Новый проект</q-item-section
                >
              </q-item>
              <q-item clickable class="GL__menu-link">
                <q-item-section @click="navigateTo('newDiscussion')"
                  >Новое обсуждение</q-item-section
                >
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>

        <q-btn round flat class="q-pa-sm">
          <q-avatar size="40px">
            <img src="/avatar.png" />
          </q-avatar>

          <q-menu :offset="[0, 10]" auto-close style="min-width: 200px">
            <q-list dense>
              <q-item class="GL__menu-link-signed-in">
                <q-item-section>
                  <div>
                    Привет, <strong>{{ user.username }}</strong>
                  </div>
                </q-item-section>
              </q-item>
              <q-separator />

              <q-item
                clickable
                class="GL__menu-link"
                v-for="(link, index) in accountLinks"
                @click="navigateTo(link.route, link?.params)">
                <q-item-section>{{ link.name }}</q-item-section>
              </q-item>
              <q-item clickable class="GL__menu-link bg-red">
                <q-item-section @click="onLogout">Выход</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </div>
    </q-toolbar>
    <div
      v-if="!$q.screen.gt.sm"
      class="GL__toolbar-link q-ml-xs q-gutter-md text-body2 row items-center justify-center wrap q-mb-md">
      <router-link
        class="q-pa-sm"
        v-for="(link, index) in headerLinks"
        :key="index"
        :to="{ name: link.route }"
        >{{ link.name }}</router-link
      >
    </div>
  </q-header>
  <q-dialog v-model="isAuthDialog">
    <VAuthForm @close="closeDialog"></VAuthForm>
  </q-dialog>
  <q-dialog v-model="isRegDialog">
    <VRegForm @close="closeDialog"></VRegForm>
  </q-dialog>
</template>
<script>
import { computed, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import VAuthForm from "../components/VAuthForm.vue";
import VRegForm from "../components/VRegForm.vue";
import { useStore } from "vuex";
import { useNavigation } from "@/hooks/useNavigation";
export default {
  components: { VAuthForm, VRegForm },
  name: "TheHeader",

  setup() {
    const store = useStore();
    const router = useRouter();
    const { navigateTo } = useNavigation();
    const headerLinks = reactive([
      {
        name: "Обсуждения",
        route: "forum-discussions",
      },
      {
        name: "Сообщество",
        route: "forum-community",
      },
      {
        name: "Поддержка",
        route: "support",
      },
    ]);
    const accountLinks = reactive([
      {
        name: "Ваш профиль",
        route: "accountBody",
        // params: { userId: store.state.auth.user?.userId },
      },
      {
        name: "Ваши проекты",
        route: "userProjects",
        params: { userId: store.state.auth.user?.userId },
      },
      {
        name: "Ваши обсуждения",
        route: "userDiscussions",
        params: { userId: store.state.auth.user?.userId },
      },
      {
        name: "Помощь",
        route: "main",
      },
    ]);

    const isAuthDialog = ref(false);
    const isRegDialog = ref(false);

    const closeDialog = () => {
      isAuthDialog.value = false;
      isRegDialog.value = false;
    };

    const user = computed(() => store.state.auth.user);

    const onLogout = async () => {
      await store.dispatch("auth/ON_LOGOUT").then(() => {
        location.reload();
      });
    };

    return {
      headerLinks,
      accountLinks,
      isAuthDialog,
      isRegDialog,
      user,
      closeDialog,
      navigateTo,
      onLogout,
    };
  },
};
</script>
<style lang="sass">
.GL
  &__select-GL__menu-link
    .default-type
      visibility: hidden

    &:hover
      background: #3F51B5
      color: white
      .q-item__section--side
        color: white
      .default-type
        visibility: visible

  &__toolbar-link
    a
      color: white
      text-decoration: none
      &:hover
        opacity: 0.7

  &__menu-link:hover
    background: #3F51B5
    color: white

  &__menu-link-status
    color: $blue-grey-6
    &:hover
      color: $light-blue-9

  &__toolbar-select.q-field--focused
    width: 450px !important
    .q-field__append
      display: none

.q-body--force-scrollbar-y
  overflow-y: hidden !important
</style>
