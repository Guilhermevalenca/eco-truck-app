<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Eco Truck </q-toolbar-title>

        <div v-if="!userStore.id">
          <q-btn class="tw-mr-2" push :to="{ name: 'login' }">Login</q-btn>
          <q-btn push :to="{ name: 'register' }">Criar conta</q-btn>
        </div>
        <div v-else>
          <q-btn push>
            {{ userStore.name }}
            <q-menu>
              <div class="row no-wrap q-pa-md">
                <div>
                  <div class="text-h6 q-mb-md">Opções</div>
                  <div class="column q-gutter-sm">
                    <q-btn color="secondary" :to="{ name: 'profile' }"
                      >Perfil</q-btn
                    >
                    <q-btn>Histórico</q-btn>
                  </div>
                </div>

                <q-separator vertical inset class="q-mx-lg" />

                <div class="column items-center">
                  <q-avatar size="72px">
                    <img
                      src="https://cdn.quasar.dev/img/avatar4.jpg"
                      alt="foto de perfil"
                    />
                  </q-avatar>

                  <div class="text-subtitle1 q-mt-md q-mb-xs">
                    {{ userStore.name }}
                  </div>

                  <q-btn
                    color="negative"
                    push
                    size="sm"
                    :loading="loading"
                    @click="logout"
                    >deslogar</q-btn
                  >
                </div>
              </div>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>
        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import EssentialLink, {
  EssentialLinkProps,
} from 'components/EssentialLink.vue';
import useUserStore from 'stores/useUserStore';
import IUser from 'src/interfaces/IUser';

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
  },

  data() {
    const linksList: EssentialLinkProps[] = [
      {
        title: 'Pagina inicial',
        icon: 'school',
        name: 'home',
      },
    ];

    return {
      linksList,
      leftDrawerOpen: false,
      userStore: useUserStore(),
      loading: false,
    };
  },

  methods: {
    toggleLeftDrawer(): void {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
    async recoverUser(): Promise<void> {
      await this.$axios.get('/user').then((response) => {
        this.userStore.setUser(response.data as IUser);
      });
    },
    async logout(): Promise<void> {
      this.loading = true;
      this.$axios.post('/logout').then(() => {
        this.userStore.resetUser();
      });
      this.loading = false;
    },
  },

  mounted() {
    this.recoverUser();
  },
});
</script>
