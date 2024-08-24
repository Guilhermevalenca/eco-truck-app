import {
  NavigationGuardNext,
  RouteLocationNormalizedGeneric,
  RouteLocationNormalizedLoadedGeneric,
} from 'vue-router';
import { api } from 'boot/axios';

export async function noLogged(
  to: RouteLocationNormalizedGeneric,
  from: RouteLocationNormalizedLoadedGeneric,
  next: NavigationGuardNext
): Promise<void> {
  try {
    const response = await api.get('/isLogged');
    if (!response.data.isLogged) {
      next();
    } else {
      next({ name: 'home' });
    }
  } catch (error) {
    next({ name: 'home' });
  }
}
export async function logged(
  to: RouteLocationNormalizedGeneric,
  from: RouteLocationNormalizedLoadedGeneric,
  next: NavigationGuardNext
): Promise<void> {
  try {
    const response = await api.get('/isLogged');
    if (response.data.isLogged) {
      next();
    } else {
      next({ name: 'login' });
    }
  } catch (error) {
    next({ name: 'login' });
  }
}
