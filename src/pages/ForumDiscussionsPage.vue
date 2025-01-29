<template>
  <q-page class="q-my-md">
    <div class="text-h6">Лента обсуждений</div>

    <q-input v-model="searchTerm" label="Поиск" counter>
      <template v-slot:prepend>
        <q-icon name="search" />
      </template>
      <template v-slot:append>
        <q-icon name="close" @click="searchTerm = ''" class="cursor-pointer" />
      </template>
    </q-input>

    <div class="q-py-md example-row-equal-width">
      <div class="row">
        <q-inner-loading v-if="loading" :showing="true">
          <q-spinner-gears size="50px" color="primary" />
        </q-inner-loading>
        <q-scroll-area
          v-else
          :thumb-style="thumbStyle"
          :bar-style="barStyle"
          class="col my-scroll-2">
          <q-card
            v-for="(discussion, index) in publicDiscussions"
            :key="index"
            class="q-mb-md bg-negative"
            flat>
            <q-card-section
              horizontal
              class="my-card"
              @click="
                navigateTo('discussion', { discussionId: discussion.id })
              ">
              <q-card-section class="q-pt-xs">
                <div class="text-h5 q-mt-sm q-mb-xs">
                  {{ discussion.title }}
                </div>
                <div class="text-caption text-grey">
                  {{ discussion.description }}
                </div>
              </q-card-section>
            </q-card-section>

            <q-separator />

            <q-card-section class="bg-grey-10">
              <q-chip
                v-for="(i, index) in discussion.discussionTags"
                :key="index"
                color="orange"
                text-color="white"
                icon="tag">
                {{ i.tag.name }}
              </q-chip>
            </q-card-section>

            <q-card-actions align="right" class="bg-grey-10 cursor-pointer">
              <q-btn
                flat
                icon="account_circle"
                @click="navigateTo('userBody', { userId: discussion.userId })"
                :label="discussion.user.username" />
              <q-space />
              <q-chip class="text-body1">
                <q-avatar icon="event"> </q-avatar>
                {{ new Date(discussion.date).toLocaleDateString("ru") }}
              </q-chip>
            </q-card-actions>
          </q-card>
        </q-scroll-area>
      </div>
    </div>
  </q-page>
</template>
<script>
import { useNavigation } from "@/hooks/useNavigation";
import { onMounted, ref, computed, watch } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const { navigateTo } = useNavigation();
    const publicDiscussions = computed(
      () => store.state.discussion.publicDiscussions
    );
    const loading = ref(true);

    const searchTerm = ref("");

    const loadData = async () => {
      await store
        .dispatch("discussion/GET_PUBLIC_DISCUSSIONS")
        .then(() => (loading.value = false));
    };

    const searchDiscussion = async () => {
      loading.value = true;
      if (searchTerm.value) {
        await store
          .dispatch("discussion/SEARCH_DISCUSSION", searchTerm.value)
          .then(() => (loading.value = false));
      } else {
        await loadData();
      }
    };

    watch(searchTerm, () => {
      searchDiscussion();
    });

    onMounted(() => {
      loadData();
    });

    return {
      publicDiscussions,
      navigateTo,
      searchTerm,
      searchDiscussion,
      loading,
    };
  },
};
</script>
<style lang=""></style>
