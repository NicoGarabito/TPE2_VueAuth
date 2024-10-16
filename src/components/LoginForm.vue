
<script setup lang="ts">
import { ref } from 'vue'
import { User } from '@/models/UserModel'

//importaciones locales
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { useAuthStore } from '@/stores/authStore'

//importaciones de librerias
import {Form, Field} from 'vee-validate'
import * as Yup from 'yup'

const router = useRouter()
const store = useUserStore()
const authStore = useAuthStore()

const schema = Yup.object().shape({
  user: Yup.string().required('El usuario es requerido'),
  password: Yup.string().required('La contraseña es requerida'),
})

if(authStore.auth.data) {
  router.push('/')
}

// Agrupamos los datos del usuario en un solo objeto usando el modelo 'User'
const userData = ref<User>({
  user: '',
  password: '',
  remember: false
})

// Función que se ejecuta cuando el usuario envia el formulario
const handleSubmit = (values: User, { setErrors }: any) => {
  const { user, password } = values;
  authStore
    .login(user, password)
    .then(() => {
      router.push('/');
    })
    .catch(error => {
        setErrors({ apiErrors: error.message || 'Error desconocido' });
    });
};
</script>


<template>
  <div class="wrapper">
    <Form @submit="handleSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
      <h1>Login</h1>
      <div class="input-bx">
        <Field name="user" type="text" :class="{ 'is-invalid': errors.user || errors.apiErrors}" placeholder="Usuario" required />
        <!--<ion-icon class="icon" name="person-circle"></ion-icon>-->
        <div class="invalid-feedback">{{  errors.user }}</div>      </div>
      <div class="input-bx">
        <Field name="password" type="password" :class="{ 'is-invalid': errors.password || errors.apiErrors}" placeholder="Contraseña" required />
        <!--<ion-icon class="icon" name="lock-closed"></ion-icon>-->
        <div class="invalid-feedback">{{  errors.password }}</div>
      </div>
      <div class="remember-forgot">
        <label><input type="checkbox" name="remember" /> Recordarme</label>
        <a href="#">Olvidaste tu contraseña</a>
      </div>
      <button type="submit" class="btn">
        <span v-show="isSubmitting" class="loader"></span>
        <p v-show="!isSubmitting">Ingresar</p>
      </button>
    </Form>
  </div>
</template>

<style>

/* estilos del componente */

.wrapper h1 {
    font-size: 3em;
    text-align: center;
}

.wrapper .input-bx {
    position: relative;
    width: 100%;
    height: 50px;
    margin: 30px 0;
}

.wrapper .input-bx input {
    width: 100%;
    height: 100%;
    background: transparent;
    border: none;
    outline: none;
    border: 2px solid rgba(255, 255, 255, .2);
    border-radius: 15px;
    color: #fff;
    padding: 20px 45px 20px 20px;
}

 .wrapper .input-bx input.is-invalid {
    width: 100%;
    height: 100%;
    background: rgba(250, 150, 150, .1);
    border: 2px solid rgba(250, 0, 0, .2);
    color: red;
} 
.wrapper .input-bx input::placeholder {
    color: #fff;
}

.wrapper .input-bx input.is-invalid::placeholder {
    color: red;
}

.wrapper .input-bx .icon {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.5em;
}

.wrapper .input-bx .invalid-feedback {
    padding: 0px 16px;
    margin: 0;
    color: red;
    font-weight: 300;
}

.wrapper .remember-forgot {
    display: flex;
    justify-content: space-between;
    font-size: 1.2em;
    margin: -15px 0 15px;
}

.wrapper .remember-forgot label input {
    accent-color: #fff;
    margin-right: 3px;
}

.wrapper .remember-forgot a {
    color: #fff;
    text-decoration: none;
}

.wrapper .remember-forgot a:hover {
    text-decoration: underline;
}

.wrapper button {
    width: 100%;
    height: 50px;
    border-radius: 15px;
    border: none;
    outline: none;
    box-shadow: 0 0 10px rgba(0,0,0,.1);
    cursor: pointer;
    font-size: 1.2em;
    font-weight: 600;
    color: #333;
}

button p {
    font-size: 1.2em;
    font-weight: 600;
    color: #333;
}

.loader {
    margin: auto 0;
    width: 24px;
    height: 24px;
    border: 4px solid purple;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
}

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

</style>
