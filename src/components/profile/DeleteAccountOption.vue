<script lang="ts">
import { defineComponent } from 'vue';
import useUserStore from 'stores/useUserStore';

export default defineComponent({
  name: 'DeleteAccountOption',

  data() {
    return {
      password: '',
      showPassword: false,
      rules: useUserStore()?.rules,
      loading: false,
      showDialog: false,
    };
  },

  methods: {
    async submit() {
      this.$axios
        .delete('/user', {
          data: {
            password: this.password,
          },
        })
        .then((response) => {
          if (response.status === 204) {
            this.$router.push('/login');
          }
        })
        .catch(() => {
          this.$q.notify({
            message: 'Não foi possível deletar sua conta',
            type: 'negative',
            icon: 'warning',
            position: 'center',
            timeout: 2000,
          });
        });
    },
  },
});
</script>

<template>
  <q-card>
    <q-card-section>
      <div>Tem certeza que deseja deletar sua conta ?</div>
      <div>Ao deletar sua conta, você não terá como recuperar seus dados!</div>
    </q-card-section>
    <q-card-actions class="flex justify-center">
      <q-btn @click="showDialog = true" color="negative">Deletar conta</q-btn>
    </q-card-actions>
  </q-card>
  <q-dialog
    v-model="showDialog"
    persistent
    full-width
    backdrop-filter="blur(4px)"
  >
    <div class="full-width row justify-center">
      <q-form class="col-8" @submit.prevent="submit">
        <q-card>
          <q-card-section>
            <q-input
              v-model="password"
              label="Password"
              outlined
              :loading="loading"
              :type="showPassword ? 'text' : 'password'"
              :rules="rules.password"
              :disable="loading"
            >
              <template #append>
                <q-icon
                  :name="`mdi-${
                    showPassword ? 'eye-outline' : 'eye-off-outline'
                  }`"
                  @click="showPassword = !showPassword"
                />
              </template>
            </q-input>
          </q-card-section>
          <q-card-actions class="flex justify-center">
            <q-btn
              :disable="loading"
              v-close-popup
              label="cancelar"
              type="button"
            />
            <q-btn
              color="negative"
              :loading="loading"
              :disable="loading"
              type="submit"
            >
              Deletar conta
            </q-btn>
          </q-card-actions>
        </q-card>
      </q-form>
    </div>
  </q-dialog>
</template>

<style scoped></style>
