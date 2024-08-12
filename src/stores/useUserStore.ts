import { defineStore } from 'pinia';
import IUser from 'src/interfaces/IUser';

export default defineStore('user', {
  state: (): IUser => ({
    id: undefined,
    name: '',
    email: ''
  }),
  getters: {
    rules() {
      return {
        name: [
          (value: string): boolean | string => {
            return !!value ? true : 'É necessário digitar seu nome!';
          }
        ],
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
  actions: {
    setUser(data: IUser): void {
      this.id = data.id;
      this.name = data.name;
      this.email = data.email;
    },
    resetUser(): void {
      this.id = undefined;
      this.name = '';
      this.email = '';
    }
  },
})
