<script lang="ts">
import { defineComponent } from 'vue';
import useUserStore from 'stores/useUserStore';
import IUser from 'src/interfaces/IUser';

export default defineComponent({
  name: 'RegisterPage',

  data() {
    const form: IUser = {
      name: '',
      email: '',
      password: '',
    };
    const userStore = useUserStore();
    return {
      form,
      userStore,
      rules: userStore.rules,
      loading: false,
      showPassword: false,
    };
  },

  methods: {
    async submit(): Promise<void> {
      this.loading = true;
      const notify = this.$q.notify({
        spinner: true,
        message: 'Carregando...',
        timeout: 0,
        group: false,
      });
      const notifyNegative = () => {
        notify({
          type: 'negative',
          message:
            'Não foi possível realizar seu cadastro! preencha os campos corretamente',
          timeout: 4000,
          icon: 'warning',
          spinner: false,
        });
      };
      await this.$axios
        .post('/register', this.form)
        .then((response) => {
          if (response.data.success) {
            this.userStore.setUser(response.data.data as IUser);
            this.$router.push({ name: 'home' });
            notify({
              spinner: false,
              message: 'Cadastro realizado com sucesso!',
              type: 'positive',
              timeout: 3000,
              icon: 'done',
            });
          } else {
            notifyNegative();
          }
        })
        .catch(() => {
          notifyNegative();
        });
      this.loading = false;
    },
  },
});
</script>

<template>
  <q-page class="row items-center justify-evenly">
    <q-form @submit.prevent="submit" class="col-10 q-gutter-xs">
      <q-input
        v-model="form.name"
        label="Name"
        type="text"
        outlined
        :loading="loading"
        :rules="rules.name"
      />
      <q-input
        v-model="form.email"
        label="Email"
        type="email"
        outlined
        :loading="loading"
        :rules="rules.email"
      />
      <q-input
        v-model="form.password"
        label="Password"
        outlined
        :loading="loading"
        :type="showPassword ? 'text' : 'password'"
        :rules="rules.password"
      >
        <template #append>
          <q-icon
            :name="`mdi-${showPassword ? 'eye-outline' : 'eye-off-outline'}`"
            @click="showPassword = !showPassword"
          />
        </template>
      </q-input>
      <div class="flex justify-end">
        <q-btn color="primary" :loading="loading" type="submit"
          >Criar conta</q-btn
        >
      </div>
    </q-form>
  </q-page>
</template>

<style scoped></style>
