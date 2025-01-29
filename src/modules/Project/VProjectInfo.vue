<template>
  <q-page class="q-my-md">
    <div class="q-py-md example-row-equal-width">
      <div class="row">
        <q-scroll-area
          :thumb-style="thumbStyle"
          :bar-style="barStyle"
          class="col"
          style="overflow: auto; min-width: auto; height: 88vh">
          <q-card v-if="project" class="q-mb-md bg-negative" flat>
            <q-card-section horizontal class="bg-grey-10">
              <q-card-section class="q-pt-xs">
                <div class="text-h4 q-mt-sm q-mb-xs">{{ project.title }}</div>
                <div class="text-body1">
                  {{ project.description }}
                </div>
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

            <q-separator />

            <div class="row" :class="!$q.screen.gt.md ? 'justify-center' : ''">
              <q-card
                class="bg-transparent"
                flat
                v-for="(i, index) in project.projectFiles">
                <q-img
                  v-if="isImage(i.file)"
                  class="q-ma-md"
                  fit="cover"
                  :key="index"
                  :src="`${VITE_APP_API_URL}/uploads/${i.file}`"
                  no-native-menu>
                  <div class="absolute-bottom text-center">
                    <a
                      class="text-white q-link"
                      :href="`${VITE_APP_API_URL}/uploads/${i.file}`">
                      {{ i.file }}
                    </a>
                  </div>
                </q-img>
                <q-img
                  v-else
                  class="q-ma-md"
                  fit="none"
                  src="/file.png"
                  no-native-menu>
                  <div class="absolute-bottom text-center">
                    <a
                      class="text-white q-link"
                      :href="`${VITE_APP_API_URL}/uploads/${i.file}`">
                      {{ i.file }}
                    </a>
                  </div>
                </q-img>
              </q-card>
            </div>

            <q-separator />

            <q-card-actions align="right" class="cursor-pointer">
              <q-btn
                flat
                icon="account_circle"
                @click="navigateTo('userBody', { userId: project.userId })"
                :label="project.user.username" />
              <q-space />

              <q-btn
                @click="addToFavorite"
                flat
                icon="star"
                class="bg-yellow-8 q-mr-sm" />

              <q-chip class="text-body1">
                <q-avatar icon="event" />
                {{ new Date(project.date).toLocaleDateString("ru") }}
              </q-chip>
            </q-card-actions>
          </q-card>
          <VCommentsWall :type="'project'" :projectId="projectId" />
        </q-scroll-area>
      </div>
    </div>
  </q-page>
</template>

<script>
import { onMounted, computed, ref } from "vue";
import { useStore } from "vuex";
import VCommentsWall from "../Comment/VCommentsWall.vue";
import { useNavigation } from "@/hooks/useNavigation";
import { useNotify } from "@/hooks/useNotify";

export default {
  props: {
    projectId: Number,
  },
  setup(props) {
    const store = useStore();
    const { notify } = useNotify();

    const { navigateTo } = useNavigation();

    const project = computed(() => store.state.project.project);
    const loadData = async () => {
      await store.dispatch("project/GET_ONE_PROJECT", {
        projectId: props.projectId,
      });
    };

    const fileTypes = ["jpg", "jpeg", "png"];

    function isImage(file) {
      if (file) {
        const extension = file.split(".").pop().toLowerCase();
        const isSuccess = fileTypes.indexOf(extension) > -1;

        return isSuccess;
      }
    }

    const addToFavorite = async () => {
      await store
        .dispatch("project/POST_FAVORITE_PROJECT", {
          userId: store.state.auth.user?.userId,
          projectId: props.projectId,
        })
        .then(() => {
          notify("OK");
        });
    };

    onMounted(() => {
      loadData();
    });

    return {
      projectId: ref(props.projectId),
      project,
      isImage,
      VITE_APP_API_URL: import.meta.env.VITE_APP_API_URL,
      navigateTo,
      addToFavorite,
    };
  },
  components: { VCommentsWall },
};
</script>

<style lang="scss">
.q-img {
  width: 300px;
  aspect-ratio: 1;
}
</style>
