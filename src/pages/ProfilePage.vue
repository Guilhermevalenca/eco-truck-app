<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue';
import ProfileOptions from 'components/profile/ProfileOptions.vue';

export default defineComponent({
  name: 'ProfilePage',
  components: {
    DeleteAccountOption: defineAsyncComponent(
      () => import('components/profile/DeleteAccountOption.vue')
    ),
    PasswordOption: defineAsyncComponent(
      () => import('components/profile/PasswordOption.vue')
    ),
    ProfileOptions,
  },

  data() {
    return {
      tab: 'profile',
    };
  },
});
</script>

<template>
  <q-page class="row items-center justify-evenly">
    <q-tabs v-model="tab" class="bg-primary text-white shadow-2" vertical>
      <q-tab name="profile" icon="profile" label="Editar Perfil" />
      <q-tab name="password" icon="password" label="Editar Senha" />
      <q-tab name="delete" icon="delete" label="Deletar conta" />
    </q-tabs>
    <q-tab-panels
      v-model="tab"
      animated
      vertical
      infinite
      transition-prev="jump-down"
      transition-next="jump-up"
      class="col-8"
      transition-duration="1000"
    >
      <q-tab-panel name="profile">
        <ProfileOptions />
      </q-tab-panel>
      <q-tab-panel name="password">
        <PasswordOption />
      </q-tab-panel>
      <q-tab-panel name="delete">
        <DeleteAccountOption />
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<style scoped></style>
