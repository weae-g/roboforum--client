<template>
  <q-card flat style="width: 300px">
    <q-card-section>
      <div class="text-h6">Регистрация</div>
    </q-card-section>
    <q-card-section>
      <q-form @submit="onSubmit" class="q-gutter-md">
        <q-input
          filled
          v-model="state.username"
          label="Username"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Поле не должно быть пустым',
          ]" />

        <q-input
          filled
          v-model="state.email"
          label="Email"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Поле не должно быть пустым',
          ]" />

        <q-input
          filled
          v-model="state.password"
          label="Пароль"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Поле не должно быть пустым',
          ]" />

        <div>
          <q-btn
            class="full-width"
            label="Зарегистрироваться"
            type="submit"
            color="primary" />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script>
import { useQuasar } from "quasar";
import { ref, reactive } from "vue";
import { useStore } from "vuex";
import { useNotify } from "@/hooks/useNotify";

export default {
  setup(props, { emit }) {
    const $q = useQuasar();
    const store = useStore();
    const { notify } = useNotify();

    const initialState = reactive({
      username: "",
      email: "",
      password: "",
    });

    const state = reactive({ ...initialState });
    const accept = ref(false);

    const onSubmit = () => {
      store
        .dispatch("auth/ON_REGISTRATION", {
          ...state,
        })
        .then(() => {
          notify("OK", "Регистрация прошла успешно");
          emit("close");
        });
    };

    return {
      state,
      accept,
      onSubmit,
      $q,
    };
  },
};
</script>

<style lang="scss"></style>
