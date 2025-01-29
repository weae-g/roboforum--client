<template>
  <q-scroll-area
    class="col"
    style="overflow: auto; min-width: auto; height: 90vh">
    <div class="row q-mb-md">
      <div class="col">
        <q-card flat class="bg-negative">
          <q-card-section>
            <div class="text-h4 text-uppercase">
              {{ projectId ? "Редактирование" : "Создание" }} проекта
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <q-form @submit.prevent="onSubmit" class="q-gutter-md">
      <div class="row q-mb-md">
        <div class="col">
          <q-card flat class="bg-negative">
            <q-card-section>
              <q-input
                filled
                v-model="state.title"
                label="Название"
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Поле не должно быть пустым',
                ]"
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
                type="textarea"
                v-model="state.description"
                label="Описание"
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Поле не должно быть пустым',
                ]"
                :dense="dense" />
            </q-card-section>
          </q-card>
        </div>
      </div>

      <div
        v-if="state.projectFiles.length > 0"
        class="row q-mb-md"
        :class="!$q.screen.gt.md ? 'justify-center' : ''">
        <q-card
          class="bg-transparent"
          flat
          v-for="(i, index) in state?.projectFiles">
          <q-img
            v-if="isImage(i)"
            class="q-ma-md"
            fit="cover"
            :key="index"
            :src="getImageSrc(i)"
            no-native-menu>
          </q-img>
          <q-img
            v-else
            class="q-ma-md"
            fit="none"
            src="/file.png"
            no-native-menu>
          </q-img>
          <div class="absolute-top-right q-mr-sm q-mt-sm q-pa-md">
            <q-btn
              @click="onDeleteImage(i.id, index)"
              flat
              round
              icon="delete"
              class="bg-red" />
          </div>
          <div class="absolute-bottom q-mb-xl bg-grey-10 q-pa-md text-center">
            <a class="text-white q-link" :href="getImageSrc(i)">
              {{ i.name }}
            </a>
          </div>
        </q-card>
      </div>

      <div class="row q-mb-md">
        <div class="col">
          <q-card flat class="bg-negative">
            <q-card-section>
              <q-file
                filled
                multiple
                :value="selectedFiles"
                @input="onFileInputChange"
                label="Файлы для загрузки">
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
              <q-select
                filled
                v-model="state.tags"
                multiple
                :options="projectTags.map((i) => i.name)"
                use-chips
                label="Теги">
                <template v-slot:selected-item="scope">
                  <q-chip
                    class="q-my-md"
                    removable
                    color="indigo"
                    text-color="white"
                    icon="tag"
                    @remove="scope.removeAtIndex(scope.index)"
                    :tabindex="scope.tabindex">
                    <div class="q-pa-md">{{ scope.opt }}</div>
                  </q-chip>
                </template>
              </q-select>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <div class="row q-mb-md">
        <div class="col">
          <q-card flat class="bg-negative">
            <q-card-section>
              <q-radio
                class="q-mr-md"
                v-model="state.projectTypeId"
                val="1"
                label="Публичный" />
              <q-radio
                v-model="state.projectTypeId"
                val="2"
                label="Приватный" />
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
            :label="projectId ? 'Сохранить' : 'Создать'" />
        </div>
      </div>
    </q-form>
  </q-scroll-area>
</template>
<script>
import { useNotify } from "@/hooks/useNotify";
import {
  computed,
  onBeforeMount,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  watch,
} from "vue";
import { useStore } from "vuex";
export default {
  props: {
    projectId: Number,
  },
  setup(props) {
    const store = useStore();
    const { notify } = useNotify();
    const projectTags = computed(() => store.state.tag.tags);
    const editableProject = computed(() => store.state.project.project);

    const selectedFiles = reactive([]);
    const initialState = reactive({
      title: "",
      description: "",
      projectTypeId: "1",
      projectFiles: [],
      tags: [],
    });

    const fileTypes = ["jpg", "jpeg", "png"];

    function isImage(file) {
      if (file.id) {
        const extension = file.name.split(".").pop().toLowerCase();
        const hasValidExtension = fileTypes.includes(extension);

        return hasValidExtension;
      }
      if (file instanceof File) {
        const isImageType = file.type.startsWith("image/");

        return isImageType;
      }
      return false;
    }

    const objectUrlCache = new Map();

    function getImageSrc(file) {
      const VITE_APP_API_URL = import.meta.env.VITE_APP_API_URL;

      if (file instanceof File && file.type.startsWith("image/")) {
        if (objectUrlCache.has(file)) {
          return objectUrlCache.get(file);
        }

        try {
          const objectUrl = URL.createObjectURL(file);

          objectUrlCache.set(file, objectUrl);

          return objectUrl;
        } catch (error) {
          console.error("Error creating object URL:", error);
          return "";
        }
      } else if (file.id) {
        return `${VITE_APP_API_URL}/uploads/${file.name}`;
      } else {
        return "/file.png";
      }
    }

    const state = reactive({ ...initialState });

    watch(
      () => editableProject.value,
      (newProject) => {
        if (newProject) {
          state.title = newProject.title || "";
          state.description = newProject.description || "";
          state.projectTypeId = newProject.projectTypeId || "";
          state.projectFiles = newProject.projectFiles || "";
          state.tags = newProject.projectTags.map((i) => i.tag.name) || "";
        }
      },
      { immediate: true }
    );

    onMounted(() => {
      store.dispatch("tag/GET_ALL_TAGS");
      store.dispatch("project/GET_ONE_PROJECT", { projectId: props.projectId });
    });

    onBeforeMount(() => {
      state.title = "";
      state.description = "";
      state.projectTypeId = "1";
      state.projectFiles = [];
      state.tags = [];
    });

    const onFileInputChange = (event) => {
      const files = event.target.files;
      state.projectFiles = [...state.projectFiles, ...files];
    };

    const onSubmit = async () => {
      const tagIds = state.tags.map((tagName) => {
        const tag = projectTags.value.find((tag) => tag.name === tagName);
        return tag.id;
      });

      const data = {
        userId: store.state.auth.user.userId,
        title: state.title,
        description: state.description,
        projectTypeId: state.projectTypeId,
        projectFiles: state.projectFiles,
        tags: tagIds,
      };

      if (props.projectId) {
        await store
          .dispatch("user/UPDATE_USER_PROJECT", {
            projectId: props.projectId,
            ...data,
          })
          .then(() => {
            notify("OK");
          });
      } else {
        await store.dispatch("user/POST_USER_PROJECT", { ...data }).then(() => {
          notify("OK");
        });
      }
    };

    const onDeleteImage = async (imageId, index) => {
      if (imageId) {
        await store.dispatch("project/DELETE_PROJECT_IMAGE", {
          projectId: props.projectId,
          imageId: imageId,
        });
      } else if (
        index !== undefined &&
        index >= 0 &&
        index < state.projectFiles.length
      ) {
        const updatedProjectFiles = [...state.projectFiles];
        updatedProjectFiles.splice(index, 1);
        state.projectFiles = updatedProjectFiles;
      }
    };

    return {
      state,
      onSubmit,
      projectTags,
      isImage,
      getImageSrc,
      onFileInputChange,
      onDeleteImage,
      selectedFiles,
    };
  },
};
</script>
<style lang="scss">
.q-img {
  width: 300px;
  aspect-ratio: 1;
}
</style>
