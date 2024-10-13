<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import type { UserValidation } from '@/types/index'
import { useFormStore } from '@/stores/form'

const formStore = useFormStore()
const { formData } = storeToRefs(formStore)
const { signUp } = formStore

const form = ref<UserValidation>()

const validate = async () => {
  try {
    const data = await form.value?.validate()

    if (data?.valid) signUp()
  } catch (error) {
    throw error
  }
}
</script>

<template>
  <div class="hero bg-base-200 min-h-screen">
    <div class="hero-content gap-10 flex-col">
      <div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <Form as="div" ref="form" class="card-body">
          <Field
            as="span"
            name="Name"
            v-slot="{ field, errors }"
            rules="required"
            v-model="formData.name"
            class="form-control"
          >
            <label class="label">
              <span class="label-text">Name</span>
            </label>
            <input
              type="text"
              v-bind="field"
              placeholder="Name"
              class="input input-bordered"
              required
            />
            <div v-show="errors.length > 0" class="label">
              <span class="label-text-alt text-red-500">{{ errors[0] }} </span>
            </div>
          </Field>
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
              type="password"
              placeholder="Password"
              class="input input-bordered"
            />

            <div v-show="errors.length > 0" class="label">
              <span class="label-text-alt text-red-500">{{ errors[0] }} </span>
            </div>
          </Field>
          <Field
            as="span"
            name="Password Confirmation"
            rules="required|confirmed:@Password"
            class="form-control"
            v-model="formData.confirmPassword"
            v-slot="{ field, errors }"
          >
            <label class="label">
              <span class="label-text">Re-type Password</span>
            </label>
            <input
              v-bind="field"
              type="password"
              placeholder="Re-type Password"
              class="input input-bordered"
            />
            <div v-show="errors.length > 0" class="label">
              <span class="label-text-alt text-red-500">{{ errors[0] }} </span>
            </div>
          </Field>
          <div class="form-control mt-6">
            <button @click="validate" class="btn btn-primary">Signup</button>
          </div>
          <div class="form-control flex justify-start">
            <RouterLink :to="{ name: 'login' }" class="btn btn-active btn-link">
              Login
            </RouterLink>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
