<template>
  <div class="full-width">
    <div class="row q-mb-md">
      <div class="col-12">
        <q-card flat class="bg-negative">
          <q-card-section>
            <div class="text-h6 text-uppercase">Проекты</div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <q-card
      v-for="(project, index) in userProjects"
      :key="index"
      class="q-mb-md bg-grey-10"
      flat>
      <q-card-section
        horizontal
        class="my-card"
        @click="navigateTo('project', { projectId: project.id })">
        <q-card-section class="q-pt-xs">
          <div class="text-h5 q-mt-sm q-mb-xs">{{ project.title }}</div>
          <div class="text-caption">{{ project.description }}</div>
        </q-card-section>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-chip
          v-for="(i, index) in project.projectTags"
          :key="index"
          color="indigo"
          text-color="white"
          icon="tag">
          {{ i.tag.name }}
        </q-chip>
      </q-card-section>

      <q-card-actions align="left">
        <q-chip class="text-body1">
          <q-avatar icon="event"> </q-avatar>
          {{ new Date(project.date).toLocaleDateString("ru") }}
        </q-chip>
        <q-space />
        <q-btn flat round icon="lock_open" class="bg-green" />
      </q-card-actions>
    </q-card>

    <q-card
      v-if="userProjects.length == 0"
      class="my-card q-mb-md bg-grey-10"
      flat>
      <q-card-section class="q-pt-xs">
        <div class="text-h5 text-center text-uppercase q-mt-sm q-mb-xs">
          Список пуст
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import { useNavigation } from "@/hooks/useNavigation";
import { onMounted, computed, ref } from "vue";
import { useStore } from "vuex";
export default {
  props: {
    userId: Number,
  },
  setup(props) {
    const store = useStore();
    const { navigateTo } = useNavigation();

    const isUserProjects = ref(store.state.user.userProjects);

    const userProjects = computed(() =>
      store.state.user.userProjects.filter((i) => i.projectTypeId == 1)
    );

    const loadData = async () => {
      await store.dispatch("user/GET_USER_PROJECTS", {
        userId: props.userId,
      });
    };

    onMounted(() => {
      loadData();
    });

    return {
      userProjects,
      isUserProjects,
      navigateTo,
      store,
    };
  },
};
</script>
<style lang=""></style>
