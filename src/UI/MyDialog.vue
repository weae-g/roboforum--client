<template>
  <q-dialog v-model="icon">
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Close icon</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
        repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis
        perferendis totam, ea at omnis vel numquam exercitationem aut, natus
        minima, porro labore.
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>
export default {
  setup() {
    const icon = ref(false);
    const bar = ref(false);
    const bar2 = ref(false);
    const toolbar = ref(false);

    return {
        icon,
        bar,
        bar2,
        toolbar
    }
  },
};
</script>
<style lang=""></style>
