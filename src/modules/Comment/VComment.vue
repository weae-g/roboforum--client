<template>
  <q-card flat class="full-width q-pa-md">
    <q-card-section class="bg-grey-10">
      <q-btn
        flat
        color="blue"
        icon="account_circle"
        @click="navigateTo('userBody', { userId: comment.userComment.userId })"
        :label="comment.userComment.user.username" />
      <div class="text-body1 q-my-sm q-ml-sm">
        {{ comment.userComment.comment }}
      </div>
    </q-card-section>
    <q-card-actions align="right" class="bg-grey-9">
      {{ new Date(comment.userComment.dateTime).toLocaleDateString("ru") }}
      <q-separator spaced inset vertical dark />
      <q-btn
        flat
        color="blue"
        icon="mood"
        label="ответить"
        @click="onAnswerComment" />
    </q-card-actions>

    <div v-show="isAnswer" class="row">
      <q-card flat class="full-width q-pb-sm">
        <q-card-section class="row">
          <div class="text-body2">
            Ответить пользователю {{ comment.userComment.user.username }}:
          </div>
        </q-card-section>
        <q-card-section>
          <q-input
            class="bg-blue-grey-10"
            v-model="state.comment"
            filled
            type="textarea"
            :rules="[
              (val) => (val && val.length > 0) || 'Поле не должно быть пустым',
            ]" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            color="red"
            icon="mood_bad"
            label="Отмена"
            @click="onCancelAnswerComment" />
          <q-btn
            @click="onSubmit"
            color="indigo"
            icon-right="mail"
            class="q-mr-sm"
            label="Отправить" />
        </q-card-actions>
      </q-card>
    </div>

    <q-card-section
      v-for="(answer, index) in comment.projectCommentFork ||
      comment.discussionCommentFork"
      :key="index"
      class="q-ml-xl q-my-md bg-grey-10">
      <q-btn
        flat
        color="blue-3"
        icon="account_circle"
        @click="navigateTo('userBody', { userId: answer.userComment.userId })"
        :label="answer.userComment.user.username" />

      <div class="text-body1 q-my-sm q-ml-sm">
        {{ answer.userComment.comment }}
      </div>
      <div align="right">
        {{ new Date(answer.userComment.dateTime).toLocaleDateString("ru") }}
      </div>
    </q-card-section>
  </q-card>
</template>
<script>
import { ref, reactive } from "vue";
import { useStore } from "vuex";
import { useNotify } from "@/hooks/useNotify";
import { useNavigation } from "@/hooks/useNavigation";

export default {
  props: {
    comment: {
      type: Object,
      required: true,
      default: () => ({
        comment: "",
        userCommentId: "",
        projectCommentFork: {},
        discussionCommentFork: {},
        user: { username: "", email: "", userId: "" },
        date: "",
      }),
    },
    projectId: String,
    discussionId: String,
  },
  setup(props, { emit }) {
    const store = useStore();
    const { notify } = useNotify();
    const { navigateTo } = useNavigation();

    const initialState = reactive({
      userId: store.state.auth.user?.userId || "",
      commentAnswer: "",
      projectId: props.projectId,
      discussionId: props.discussionId,
      userCommentId: props.comment.userCommentId,
    });

    const state = reactive({
      ...initialState,
    });

    const isAnswer = ref(false);

    const onAnswerComment = async () => {
      isAnswer.value = true;
    };

    const onCancelAnswerComment = async () => {
      isAnswer.value = false;
    };

    const onSubmit = async () => {
      if (state.userId) {
        if (props.projectId)
          await store
            .dispatch("project/POST_PROJECT_COMMENT_ANSWER", {
              ...state,
            })
            .then(() => {
              emit("loadData");
              state.comment = null;
              onCancelAnswerComment();
            });
        if (props.discussionId)
          await store
            .dispatch("discussion/POST_DISCUSSION_COMMENT_ANSWER", {
              ...state,
            })
            .then(() => {
              emit("loadData");
              state.comment = null;
              onCancelAnswerComment();
            });
      } else {
        notify("ERR", "Войдите в учетную запись");
      }
    };

    return {
      onAnswerComment,
      onCancelAnswerComment,
      onSubmit,
      isAnswer,
      state,
      navigateTo,
    };
  },
};
</script>
