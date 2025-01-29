<template>
  <q-page class="my-page q-py-md">
    <q-scroll-area
      class="col my-scroll">
      <q-timeline color="secondary" class="q-pa-md bg-grey-10 rounded-borders">
        <q-timeline-entry heading class="text-center">
          RoboForum
        </q-timeline-entry>

        <q-timeline-entry icon="start">
          <template v-slot:title> Регистрация 🤖 </template>
          <template v-slot:subtitle> Шаг 1: </template>

          <div>
            Присоединяйтесь к нашему сообществу, создав учетную запись. Просто
            заполните несколько полей, и вы готовы к вдохновляющим открытиям!
          </div>
        </q-timeline-entry>

        <q-timeline-entry icon="input">
          <template v-slot:title> Авторизация 🔐 </template>
          <template v-slot:subtitle> Шаг 2: </template>

          <div>
            Легкий доступ к вашему аккаунту. Войдите, чтобы увидеть последние
            обновления и общаться с единомышленниками в мире робототехники.
          </div>
        </q-timeline-entry>
        <q-timeline-entry icon="add">
          <template v-slot:title> Создание Проекта 🤯 </template>
          <template v-slot:subtitle> Шаг 3: </template>

          <div>
            Воплотите свои идеи в жизнь. Создайте свой проект, дайте ему имя, и
            делитесь своим творчеством с сообществом.
          </div>
        </q-timeline-entry>

        <q-timeline-entry icon="people">
          <template v-slot:title> Обсуждение Проектов 🗣️</template>
          <template v-slot:subtitle> Шаг 4: </template>

          <div>
            Ваши проекты - в центре внимания! Обсудите их с другими участниками,
            дайте и получите обратную связь.
          </div>
        </q-timeline-entry>

        <q-timeline-entry color="orange" icon="message">
          <template v-slot:title> Комментирование 💬 </template>
          <template v-slot:subtitle> Шаг 5: </template>

          <div>
            Ваши мысли важны. Комментируйте проекты, дискуссии и делитесь своим
            опытом с сообществом. Здесь каждый вклад ценен.
          </div>
        </q-timeline-entry>
      </q-timeline>
    </q-scroll-area>
  </q-page>
</template>
<script>
export default {};
</script>
<style lang=""></style>
