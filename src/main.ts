import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { defineRule, configure, Field, Form, ErrorMessage } from 'vee-validate'
import { all } from '@vee-validate/rules'

import { localize } from '@vee-validate/i18n'
import en from '@vee-validate/i18n/dist/locale/en.json'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app
  .component('Field', Field)
  .component('Form', Form)
  .component('ErrorMessage', ErrorMessage)

configure({
  validateOnChange: true,
  generateMessage: localize({
    en,
  }),
})

Object.entries(all).forEach(([name, rule]) => {
  defineRule(name, rule)
})

app.use(createPinia())
app.use(router)

app.mount('#app')
