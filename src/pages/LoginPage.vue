<script lang="ts">
import { defineComponent } from 'vue';
import useUserStore, { IUser } from 'stores/useUserStore';

export default defineComponent({
  name: 'LoginPage',

  data() {
    const form: IUser = {
      email: '',
      password: ''
    }
    return {
      form,
      loading: false,
      userStore: useUserStore(),
      showPassword: false,
      rules: {
        email: [
          (value: string): boolean | string => {
            return !!value ? true : 'É necessário digitar um email!';
          },
          (value: string): boolean | string => {
            if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
              return true;
            }
            return 'Email invalido!';
          },
        ],
        password: [
          (value: string): boolean | string => {
            return !!value ? true : 'É necessário digitar sua senha!';
          },
          (value: string): boolean | string => {
            if (value.length < 6) {
              return 'Sua senha deve conter no minimo 6 digitos';
            } else if (/[A-Za-z]/.test(value) && /\d/.test(value)) {
              return true;
            } else {
              return 'Sua senha deve conter números e letras';
            }
          },
        ]
      }
    }
  },

  methods: {
    async submit() {
      this.loading = true;
      await this.$axios.post('/login', this.form)
        .then(response => {
          console.log(response.data);
          if(response.data.success) {
            this.userStore.setUser(response.data.data as IUser);
            this.$router.push({name: 'home'});
          }
        })
        .catch(error => {
          console.log(error)
        });
      this.loading = false;
    }
  }
});
</script>

<template>
<q-page class="row items-center justify-evenly">
  <q-form
    @submit.prevent="submit"
    class="col-10 q-gutter-xs"
  >
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
      <q-btn color="primary" :loading="loading" type="submit">Criar conta</q-btn>
    </div>
  </q-form>
</q-page>
</template>

<style scoped>

</style>
