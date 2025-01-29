<template>
  <q-scroll-area class="col my-scroll">
    <q-form @submit.prevent="onSaveUsername" class="q-gutter-md">
      <div class="row q-mb-md">
        <div class="col">
          <q-card flat class="bg-negative">
            <q-card-section>
              <div class="text-h6 text-uppercase">Информация профиля</div>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <div class="row q-mb-md">
        <div class="col">
          <q-card flat class="bg-negative">
            <q-card-section>
              <q-input
                disable
                filled
                v-model="state.email"
                label="email"
                :dense="dense" />
            </q-card-section>
          </q-card>
        </div>
      </div>
      <div class="row q-mb-md">
        <div class="col">
          <q-card flat horizontal class="bg-negative">
            <q-card-section>
              <q-input
                filled
                v-model="state.username"
                label="username"
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Поле не должно быть пустым',
                ]"
                :dense="dense" />
            </q-card-section>
            <q-card-actions align="center" class="q-mx-sm">
              <q-btn
                type="submit"
                class="full-width"
                color="indigo"
                label="Сохранить" />
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </q-form>
    <q-form @submit.prevent="onSave" class="q-gutter-md">
      <div class="row q-mb-md">
        <div class="col">
          <q-card flat class="bg-negative">
            <q-card-section>
              <div class="text-h6 text-uppercase">Личная информация</div>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <div class="row q-mb-md">
        <div class="col">
          <q-card flat class="bg-negative">
            <q-card-section>
              <q-file label="Фото профиля" outlined v-model="state.image">
                <template v-slot:prepend>
                  <q-icon name="attach_file" />
                </template>
              </q-file>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <div class="row q-mb-md">
        <div class="col">
          <q-card flat class="bg-negative">
            <q-card-section>
              <q-input filled v-model="state.name" label="Имя" :dense="dense" />
            </q-card-section>
          </q-card>
        </div>
      </div>
      <div class="row q-mb-md">
        <div class="col">
          <q-card flat class="bg-negative">
            <q-card-section>
              <q-input
                filled
                v-model="state.bio"
                label="О себе"
                :dense="dense" />
            </q-card-section>
          </q-card>
        </div>
      </div>
      <div class="row q-mb-md">
        <div class="col">
          <q-card flat class="bg-negative">
            <q-card-section>
              <q-input
                filled
                v-model="state.company"
                label="Компания"
                :dense="dense" />
            </q-card-section>
          </q-card>
        </div>
      </div>
      <div class="row q-mb-md">
        <div class="col">
          <q-card flat class="bg-negative">
            <q-card-section>
              <q-input
                filled
                v-model="state.location"
                label="Местоположение"
                :dense="dense" />
            </q-card-section>
          </q-card>
        </div>
      </div>
      <div
        class="row q-mb-md"
        v-for="(link, index) in state.links"
        :key="index">
        <div class="col">
          <q-card flat class="bg-negative">
            <q-card-section>
              <q-input
                filled
                v-model="state.links[index].link"
                label="Ссылка"
                :dense="dense" />
            </q-card-section>
          </q-card>
        </div>
        <div class="col">
          <q-card flat class="bg-negative">
            <q-card-section>
              <q-input
                filled
                v-model="state.links[index].resource"
                label="Текст к ссылке"
                :dense="dense" />
            </q-card-section>
          </q-card>
        </div>
      </div>
      <div class="row q-mb-md">
        <div class="col">
          <q-btn
            type="submit"
            class="full-width"
            color="indigo"
            label="Сохранить" />
        </div>
      </div>
    </q-form>
  </q-scroll-area>
</template>
<script>
import { onMounted, reactive, computed } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();

    const user = computed(() => store.state.auth.user);
    const userProfile = computed(() => store.state.user.userProfile);

    const initialState = reactive({
      username: "",
      email: "",
      bio: "",
      name: "",
      company: "",
      location: "",
      image: [],
      links: [
        { id: null, link: "", resource: "" },
        { id: null, link: "", resource: "" },
      ],
    });

    const state = reactive({ ...initialState });

    const loadData = async () => {
      await store
        .dispatch("user/GET_USER_PROFILE", {
          userId: user.value.userId,
        })
        .then(() => {
          state.username = user.value.username;
          state.email = user.value.email;
          state.bio = userProfile.value.bio;
          state.name = userProfile.value.name;
          state.company = userProfile.value.company;
          state.location = userProfile.value.location;
          for (let i = 0; i < userProfile.value.userSocials.length; i++) {
            state.links[i] = userProfile.value.userSocials[i];
          }
        });
    };

    const onSave = async () => {
      await store.dispatch("user/UPDATE_USER_PROFILE", {
        userId: user.value.userId,
        name: state.name,
        bio: state.bio,
        company: state.company,
        location: state.location,
        links: state.links,
        image: state.image,
      });
    };

    const onSaveUsername = async () => {
      if (state.username.length > 0) {
        await store.dispatch("user/UPDATE_USER", {
          userId: user.value.userId,
          username: state.username,
        });
      }
    };

    onMounted(() => {
      loadData();
    });

    return {
      state,
      onSave,
      onSaveUsername,
    };
  },
};
</script>
<style lang=""></style>
