import useUserStore from 'stores/useUserStore';
import { NavigationGuardNext, RouteLocationNormalizedGeneric, RouteLocationNormalizedLoadedGeneric } from 'vue-router';

export function noLogged(
  to: RouteLocationNormalizedGeneric,
  from:  RouteLocationNormalizedLoadedGeneric,
  next:  NavigationGuardNext
) {
  const user = useUserStore()
  if(!user.id) {
    next();
  } else {
    next({name: 'home'});
  }
}
