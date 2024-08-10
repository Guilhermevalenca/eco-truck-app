import { boot } from 'quasar/wrappers';
import { Router, useRouter } from 'vue-router';


declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $router: Router;
  }
}

export default boot(({ app }) => {
  app.config.globalProperties.$router = useRouter();
});
