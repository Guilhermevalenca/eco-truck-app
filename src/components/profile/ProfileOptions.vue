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
        email: userStore.email,
      } as IUser,
    };
  },

  methods: {
    async submit(): Promise<void> {
      const notify = this.$q.notify({
        spinner: true,
        message: 'Atualizando dados...',
        timeout: 0,
        group: false,
      });
      await this.$axios
        .put('/user', this.form)
        .then((response) => {
          if (response.data.success) {
            notify({
              spinner: false,
              message: 'Atualização concluida',
              timeout: 3000,
              type: 'positive',
              icon: 'done',
            });
            this.userStore.setUser(response.data.data as IUser);
          } else {
            notify({
              spinner: false,
              message: 'Tivermos algum problema ao atualizar seus dados!',
              timeout: 5000,
              type: 'negative',
              icon: 'warning',
            });
          }
        })
        .catch((error) => {
          notify({
            spinner: false,
            timeout: 100,
          });
          if (error.response.status === 400) {
            const data = error.response.data;
            if (data.email) {
              this.$q.notify({
                type: 'negative',
                position: 'center',
                icon: 'warning',
                message:
                  'Email invalido ou já cadastrado, por favor use outro email!',
                timeout: 4000,
              });
            }
          }
        });
    },
  },
});
</script>

<template>
  <q-card>
    <q-form @submit.prevent="submit">
      <q-card-section v-show="!edit">
        <strong class="tw-mr-2">Nome:</strong>
        <span>{{ userStore.name }}</span>
      </q-card-section>
      <q-card-section v-show="!edit">
        <strong class="tw-mr-2">Email:</strong>
        <span>{{ userStore.email }}</span>
      </q-card-section>
      <q-card-section v-show="edit" class="q-gutter-sm">
        <q-input
          v-model="form.name"
          label="Nome"
          :rules="userStore.rules.name"
          outlined
        />
        <q-input
          v-model="form.email"
          label="Email"
          :rules="userStore.rules.email"
          outlined
        />
      </q-card-section>
      <q-card-actions class="flex justify-center">
        <q-btn
          :color="edit ? 'secondary' : 'primary'"
          @click="edit = !edit"
          type="button"
        >
          {{ edit ? 'Cancelar' : 'Editar informações' }}
        </q-btn>
        <q-btn color="primary" v-show="edit" type="submit">Salvar</q-btn>
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<style scoped></style>
