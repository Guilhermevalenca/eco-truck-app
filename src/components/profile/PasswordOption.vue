<script lang="ts">
import { defineComponent } from 'vue';
import useUserStore from 'stores/useUserStore';

export default defineComponent({
  name: 'PasswordOption',

  data() {
    return {
      currentPassword: '',
      newPassword: '',
      rules: useUserStore()?.rules,
    };
  },
});
</script>

<template>
  <q-card>
    <q-card-section class="q-gutter-sm">
      <q-input
        v-model="currentPassword"
        outlined
        label="Senha atual"
        :rules="rules.password"
      />
      <q-input
        v-model="newPassword"
        outlined
        label="Nova senha"
        :rules="rules.password"
      />
    </q-card-section>
    <q-card-actions class="flex justify-center">
      <q-btn color="primary">Alterar senha</q-btn>
    </q-card-actions>
  </q-card>
</template>

<style scoped></style>
