<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import type { UserValidation } from '@/types/index'
import { useFormStore } from '@/stores/form'

const formStore = useFormStore()
const { formData } = storeToRefs(formStore)

const form = ref<UserValidation>()
const alert = ref(false)

const validate = async () => {
  try {
    const data = await form.value?.validate()

    if (data?.valid) {
      formStore.signIn().then(result => {
        if (!result) alert.value = true
      })
    }
  } catch (error) {
    throw error
  }
}
</script>

<template>
  <div class="hero bg-base-200 min-h-screen">
    <div class="hero-content gap-10 flex-col">
      <div class="w-full">
        <div class="alert shadow-lg">
          <div>
            <h3 class="font-bold">Demo Login</h3>
            <div class="text-xs">Email: johndoe@mail.com</div>
            <div class="text-xs">Password: admin123</div>
          </div>
        </div>

        <div
          role="alert"
          v-show="alert"
          class="alert flex justify-between mt-3 shadow-lg"
        >
          <div>
            <h3 class="font-bold">Alert</h3>
            <div class="text-xs">Your Credential Is wrong</div>
          </div>
          <button @click="alert = !alert" class="btn btn-sm">See</button>
        </div>
      </div>

      <div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <Form ref="form" as="div" class="card-body">
          <Field
            as="span"
            name="Email"
            v-slot="{ field, errors }"
            rules="email|required"
            class="form-control"
            v-model="formData.email"
          >
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input
              v-bind="field"
              @keyup.enter="validate"
              placeholder="Email"
              class="input input-bordered"
            />
            <div v-show="errors.length > 0" class="label">
              <span class="label-text-alt text-red-500">{{ errors[0] }} </span>
            </div>
          </Field>
          <Field
            as="span"
            rules="required"
            name="Password"
            v-model="formData.password"
            v-slot="{ field, errors }"
            class="form-control"
          >
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <input
              v-bind="field"
              @keyup.enter="validate"
              type="password"
              placeholder="Password"
              class="input input-bordered"
              required
            />

            <div v-show="errors.length > 0" class="label">
              <span class="label-text-alt text-red-500">{{ errors[0] }} </span>
            </div>
          </Field>
          <div class="form-control mt-6">
            <button @click="validate" class="btn btn-primary">Login</button>
          </div>
          <div class="form-control flex justify-start">
            <RouterLink
              :to="{ name: 'signup' }"
              class="btn btn-active btn-link"
            >
              Register
            </RouterLink>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
