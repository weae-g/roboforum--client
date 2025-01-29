<template>
  <div class="row">
    <q-form @submit.prevent="onSubmit" class="q-gutter-md full-width">
      <q-card flat class="full-width q-pb-md">
        <q-card-section>
          <div class="text-h6">Оставить комментарий:</div>
        </q-card-section>
        <q-card-section>
          <q-input
            v-model="state.comment"
            filled
            type="textarea"
            :rules="[
              (val) => (val && val.length > 0) || 'Поле не должно быть пустым',
            ]" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            type="submit"
            color="indigo"
            icon-right="mail"
            class="q-mr-sm"
            label="Отправить" />
        </q-card-actions>
      </q-card>
    </q-form>
  </div>
  <div class="row">
    <VComment
      v-for="(comment, index) in comments"
      :key="index"
      :comment="comment"
      :projectId="projectId"
      :discussionId="discussionId"
      @loadData="loadData" />
  </div>
</template>
<script>
import { computed, onMounted, reactive } from "vue";
import VComment from "./VComment.vue";
import { useStore } from "vuex";
import { useNotify } from "@/hooks/useNotify";

export default {
  props: {
    projectId: Number,
    discussionId: Number,
    type: String,
  },
  setup(props) {
    const store = useStore();
    const { notify } = useNotify();

    const initialState = reactive({
      userId: store.state.auth.user?.userId || "",
      comment: "",
      projectId: props.projectId,
      discussionId: props.discussionId,
    });

    const state = reactive({
      ...initialState,
    });

    const comments = computed(() => {
      if (props.projectId) return store.state.project.projectComments;
      if (props.discussionId) return store.state.discussion.discussionComments;
    });

    const loadData = async () => {
      if (props.projectId)
        await store.dispatch("project/GET_PROJECT_COMMENTS", {
          projectId: props.projectId,
        });
      if (props.discussionId)
        await store.dispatch("discussion/GET_DISCUSSION_COMMENTS", {
          discussionId: props.discussionId,
        });
    };

    const onSubmit = async () => {
      if (state.userId) {
        if (props.projectId)
          await store
            .dispatch("project/POST_PROJECT_COMMENT", {
              ...state,
            })
            .then(() => {
              loadData();
              state.comment = null;
            });
        if (props.discussionId)
          await store
            .dispatch("discussion/POST_DISCUSSION_COMMENT", {
              ...state,
            })
            .then(() => {
              loadData();
              state.comment = null;
            });
      } else {
        notify("ERR", "Войдите в учетную запись");
      }
    };

    onMounted(() => {
      loadData();
    });

    return {
      comments,
      onSubmit,
      state,
      loadData,
    };
  },
  components: { VComment },
};
</script>
<style lang=""></style>
