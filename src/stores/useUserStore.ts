import { defineStore } from 'pinia';

export interface IUser {
  id?: number,
  name?: string,
  email: string,
  password?: string,
}

export default defineStore('user', {
  state: (): IUser => ({
    id: undefined,
    name: '',
    email: ''
  }),
  getters: {

  },
  actions: {
    setUser(data: IUser) {
      this.id = data.id;
      this.name = data.name;
      this.email = data.email;
    },
    resetUser() {
      this.id = undefined;
      this.name = '';
      this.email = '';
    }
  },
})
