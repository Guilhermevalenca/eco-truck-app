<script lang="ts">
import { defineComponent } from 'vue';
import useUserStore from 'stores/useUserStore';
import IUser from 'src/interfaces/IUser';

export default defineComponent({
  name: 'ProfileOptions',

  data() {
    const userStore = useUserStore();
    return {
      userStore,
      edit: false,
      form: {
        name: userStore.name,
        email: userStore.email
      } as IUser
    }
  },

  methods: {
    async update(): Promise<void> {
      console.log('atualizando');
    }
  },
});
</script>

<template>
<q-card>
  <q-card-section v-show="!edit">
    <strong class="tw-mr-2">Nome:</strong>
    <span>{{userStore.name}}</span>
  </q-card-section>
  <q-card-section v-show="!edit">
    <strong class="tw-mr-2">Email:</strong>
    <span>{{userStore.email}}</span>
  </q-card-section>
  <q-card-section v-show="edit" class="q-gutter-sm">
    <q-input v-model="form.name" label="Nome" outlined />
    <q-input v-model="form.email" label="Email" outlined />
  </q-card-section>
  <q-card-actions class="flex justify-center">
    <q-btn :color="edit ? 'secondary' : 'primary'" @click="edit = !edit">
      {{edit ? 'Cancelar' : 'Editar informações'}}
    </q-btn>
    <q-btn color="primary" v-show="edit">Salvar</q-btn>
  </q-card-actions>
</q-card>
</template>

<style scoped>

</style>
