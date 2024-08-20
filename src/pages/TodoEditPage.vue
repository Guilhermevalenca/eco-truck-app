<script lang="ts">
import { defineComponent } from 'vue';
import ITodo from 'src/interfaces/ITodo';

export default defineComponent({
  name: 'TodoEditPage',

  data() {
    const id = this.$route.params.id;
    const form: ITodo = {
      id: 0,
      title: '',
      description: ''
    };
    return {
      id,
      form
    }
  },

  methods: {
    async loadForm() {
      await this.$axios.get('/todo/' + this.id)
        .then(response => {
          console.log(response);
          this.form = response.data as ITodo;
        })
    },
    async submit() {
      await this.$axios.put('/todo/' + this.id, this.form)
        .then(() => {
          this.$router.push({
            name: 'todo'
          })
        });
    }
  },

  mounted() {
    this.loadForm();
  }
});
</script>

<template>
<q-page class="row items-center justify-evenly">
  <q-form
    @submit.prevent="submit"
  >
    <q-input v-model="form.title" outlined />
    <q-input v-model="form.description" outlined />
    <q-btn type="submit" color="primary">Editar</q-btn>
  </q-form>
</q-page>
</template>

<style scoped>

</style>
