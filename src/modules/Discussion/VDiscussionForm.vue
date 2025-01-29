<template>
  <q-scroll-area
    class="col"
    style="overflow: auto; min-width: auto; height: 90vh">
    <div class="row q-mb-md">
      <div class="col">
        <q-card flat class="bg-negative">
          <q-card-section>
            <div class="text-h4 text-uppercase">
              {{ discussionId ? "Редактирование" : "Создание" }} обсуждения
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
        v-if="state.discussionFiles.length > 0"
        class="row q-mb-md"
        :class="!$q.screen.gt.md ? 'justify-center' : ''">
        <q-card
          class="bg-transparent"
          flat
          v-for="(i, index) in state?.discussionFiles">
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
                :options="discussionTags.map((i) => i.name)"
                use-chips
                label="Теги">
                <template v-slot:selected-item="scope">
                  <q-chip
                    class="q-my-md"
                    removable
                    color="orange"
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
          <q-btn
            type="submit"
            class="full-width"
            color="indigo"
            :label="discussionId ? 'Сохранить' : 'Создать'" />
        </div>
      </div>
    </q-form>
  </q-scroll-area>
</template>
<script>
import { computed, onBeforeMount, onMounted, reactive, watch } from "vue";
import { useStore } from "vuex";
import { useNotify } from "@/hooks/useNotify";

export default {
  props: {
    discussionId: Number,
  },
  setup(props) {
    const store = useStore();
    const { notify } = useNotify();
    const discussionTags = computed(() => store.state.tag.tags);
    const editableDiscussion = computed(
      () => store.state.discussion.discussion
    );

    const selectedFiles = reactive([]);
    const initialState = reactive({
      title: "",
      description: "",
      discussionFiles: [],
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
      () => editableDiscussion.value,
      (newDiscussion) => {
        if (newDiscussion) {
          state.title = newDiscussion.title || "";
          state.description = newDiscussion.description || "";
          state.discussionFiles = newDiscussion.discussionFiles || "";
          state.tags =
            newDiscussion.discussionTags.map((i) => i.tag.name) || "";
        }
      },
      { immediate: true }
    );

    onMounted(() => {
      store.dispatch("tag/GET_ALL_TAGS");
      store.dispatch("discussion/GET_ONE_DISCUSSION", {
        discussionId: props.discussionId,
      });
    });

    onBeforeMount(() => {
      state.title = "";
      state.description = "";
      state.discussionFiles = [];
      state.tags = [];
    });

    const onFileInputChange = (event) => {
      const files = event.target.files;
      state.discussionFiles = [...state.discussionFiles, ...files];
    };

    const onSubmit = async () => {
      const tagIds = state.tags.map((tagName) => {
        const tag = discussionTags.value.find((tag) => tag.name === tagName);
        return tag.id;
      });

      const data = {
        userId: store.state.auth.user.userId,
        title: state.title,
        description: state.description,
        discussionFiles: state.discussionFiles,
        tags: tagIds,
      };

      if (props.discussionId) {
        await store
          .dispatch("user/UPDATE_USER_DISCUSSION", {
            discussionId: props.discussionId,
            ...data,
          })
          .then(() => {
            notify("OK");
          });
      } else {
        await store
          .dispatch("user/POST_USER_DISCUSSION", { ...data })
          .then(() => {
            notify("OK");
          });
      }
    };

    const onDeleteImage = async (imageId, index) => {
      if (imageId) {
        await store.dispatch("discussion/DELETE_DISCUSSION_IMAGE", {
          discussionId: props.discussionId,
          imageId: imageId,
        });
      } else if (
        index !== undefined &&
        index >= 0 &&
        index < state.discussionFiles.length
      ) {
        const updatedDiscussionFiles = [...state.discussionFiles];
        updatedDiscussionFiles.splice(index, 1);
        state.discussionFiles = updatedDiscussionFiles;
      }
    };

    return {
      state,
      onSubmit,
      discussionTags,
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
