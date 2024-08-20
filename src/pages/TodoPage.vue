<script lang="ts">
import { defineComponent } from 'vue';
import ITodo from 'src/interfaces/ITodo';

export default defineComponent({
  name: 'TodoPage',

  data() {
    const todos: ITodo[] = [];

    return {
      todos,
      form: {
        title: '',
        description: ''
      }
    }
  },

  methods: {
    async getTodos() {
      const notify = this.$q.notify({
        spinner: true,
        message: 'Carregando',
        position: 'center',
        group: false,
        timeout: 0
      });
      await this.$axios.get('/todo')
        .then(response => {
          notify({
            message: 'Dados carregados!',
            type: 'positive',
            timeout: 2000,
            spinner: false
          });
          this.todos = response.data as ITodo[];
        })
        .catch(() => {
          notify({
            message: 'Falha no carregamento!',
            type: 'negative',
            timeout: 2000,
            spinner: false
          });
        })
    },
    async submit() {
      await this.$axios.post('/todo', this.form)
        .then(() => {
          this.getTodos()
            .then(() => {
              this.form.title = '';
              this.form.description = '';
            })
        });
    },
    async deleteTodo(id: number) {
      await this.$axios.delete('/todo/' + id)
        .then(() => {
          this.getTodos();
        });
    }
  },

  mounted() {
    this.getTodos();
  },
});
</script>

<template>
  <q-page class="row items-center justify-evenly">
    <q-card
      v-for="todo in todos" :key="todo.id"
    >
      <q-card-section>
        <strong>Titulo: </strong>
        <span>{{todo.title}}</span>
      </q-card-section>
      <q-card-section>
        <strong>Descrição: </strong>
        <span>{{todo.description}}</span>
      </q-card-section>
      <q-card-actions>
        <q-btn @click="$router.push({name: 'todoEdit', params: {id: todo.id}})">
          editar
        </q-btn>
        <q-btn
          color="negative"
          @click="deleteTodo(Number(todo.id))"
        >
          Delete
        </q-btn>
      </q-card-actions>
    </q-card>
    <q-form
      @submit.prevent="submit"
    >
      <q-input
        v-model="form.title"
        outlined
        placeholder="Titulo"
      />
      <q-input
        v-model="form.description"
        outlined
        placeholder="Descrição"
      />
      <q-btn type="submit" push color="primary">Criar</q-btn>
    </q-form>
  </q-page>
</template>

<style scoped>

</style>
