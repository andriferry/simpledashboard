<script setup lang="ts">
import { useUsersStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { User } from '@/types/index'

const userStore = useUsersStore()
const router = useRouter()
const { userLogin, dataUsers, formAdd, formUpdate } = storeToRefs(userStore)
const { setCurrentUser, deletUser, updateUser, addUser } = userStore

const editDialog = ref()
const addDialog = ref()
const form = ref()

const tableHead = ref(['No', 'Name', 'Email', 'Country', 'Action'])

const editUser = (dataUser: User) => {
  let convertString = JSON.stringify(dataUser)
  formUpdate.value = JSON.parse(convertString || '')
  editDialog.value.showModal()
}

const logout = () => {
  localStorage.removeItem('currentUser')
  router.push({ name: 'login' })
}

onMounted(() => {
  let getCurrentUser = JSON.parse(localStorage.getItem('currentUser') || '')
  setCurrentUser(getCurrentUser)
})
</script>

<template>
  <main class="w-full h-screen">
    <div class="p-4 flex gap-5 justify-end items-center">
      <span class="font-bold"> {{ userLogin.name }}</span>
      <button @click="logout" class="btn btn-primary btn-sm">Logout</button>
    </div>

    <div class="w-full p-5 flex justify-center">
      <div class="container flex flex-col justify-end">
        <div class="text-end">
          <button @click="addDialog.showModal()" class="btn btn-primary">
            Add New User
          </button>
        </div>

        <div class="overflow-x-auto">
          <table class="table">
            <thead>
              <tr>
                <th v-for="(data, index) in tableHead" :key="index">
                  {{ data }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(data, index) in dataUsers" :key="index">
                <th>{{ index + 1 }}</th>
                <td>{{ data.name }}</td>
                <td>{{ data.email }}</td>
                <td>{{ data.country }}</td>
                <td>
                  <div class="flex gap-4">
                    <button
                      @click="editUser(data)"
                      class="btn btn-primary btn-sm"
                    >
                      Edit
                    </button>
                    <button
                      @click="deletUser(data)"
                      class="btn btn-error btn-sm text-white"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <dialog ref="editDialog" class="modal">
      <div class="modal-box">
        <h3 class="text-lg font-bold">Update User!</h3>
        <Form ref="form" as="div" class="card-body">
          <Field
            as="span"
            name="Name"
            v-slot="{ field, errors }"
            rules="required"
            class="form-control"
            v-model="formUpdate.name"
          >
            <label class="label">
              <span class="label-text">Name</span>
            </label>
            <input
              v-bind="field"
              placeholder="Name"
              class="input input-bordered"
            />
            <div v-show="errors.length > 0" class="label">
              <span class="label-text-alt text-red-500">{{ errors[0] }} </span>
            </div>
          </Field>
          <Field
            as="span"
            rules="required"
            name="Country"
            v-model="formUpdate.country"
            v-slot="{ field, errors }"
            class="form-control"
          >
            <label class="label">
              <span class="label-text">Country</span>
            </label>
            <input
              v-bind="field"
              type="text"
              placeholder="Country"
              class="input input-bordered"
              required
            />

            <div v-show="errors.length > 0" class="label">
              <span class="label-text-alt text-red-500">{{ errors[0] }} </span>
            </div>
          </Field>
        </Form>
        <div class="modal-action">
          <button @click="editDialog.close()" class="btn">Close</button>

          <form method="dialog">
            <button @click="updateUser(formUpdate)" class="btn btn-primary">
              Update
            </button>
          </form>
        </div>
      </div>
    </dialog>

    <dialog ref="addDialog" class="modal">
      <div class="modal-box">
        <h3 class="text-lg font-bold">Add User!</h3>
        <Form ref="form" as="div" class="card-body">
          <Field
            as="span"
            name="Name"
            v-slot="{ field, errors }"
            rules="required"
            class="form-control"
            v-model="formAdd.name"
          >
            <label class="label">
              <span class="label-text">Name</span>
            </label>
            <input
              v-bind="field"
              placeholder="Name"
              class="input input-bordered"
            />
            <div v-show="errors.length > 0" class="label">
              <span class="label-text-alt text-red-500">{{ errors[0] }} </span>
            </div>
          </Field>
          <Field
            as="span"
            name="Email"
            v-slot="{ field, errors }"
            rules="required|email"
            class="form-control"
            v-model="formAdd.email"
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
            name="Country"
            v-model="formAdd.country"
            v-slot="{ field, errors }"
            class="form-control"
          >
            <label class="label">
              <span class="label-text">Country</span>
            </label>
            <input
              v-bind="field"
              type="text"
              placeholder="Country"
              class="input input-bordered"
              required
            />

            <div v-show="errors.length > 0" class="label">
              <span class="label-text-alt text-red-500">{{ errors[0] }} </span>
            </div>
          </Field>
        </Form>
        <div class="modal-action">
          <button @click="addDialog.close()" class="btn">Close</button>

          <form method="dialog">
            <button @click="addUser(formAdd)" class="btn btn-primary">
              Update
            </button>
          </form>
        </div>
      </div>
    </dialog>
  </main>
</template>
