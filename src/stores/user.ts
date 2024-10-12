import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { User, FormData } from '@/types/index'

export const useUsersStore = defineStore('userStore', () => {
  const users = ref<User[]>([
    {
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: 'admin123',
      country: 'USA',
    },
    {
      name: 'Andreas',
      password: 'admin123',
      email: 'andras@mail.com',
      country: 'Australia',
    },
    {
      name: 'Dallas Wisoky',
      password: 'admin123',
      email: 'dallas@mail.com',
      country: 'Alabama',
    },
    { name: 'Vivian Jerde', email: 'vivian@mail.com', country: 'New Mexico' },
    {
      name: 'Annabell Sammert',
      password: 'admin123',
      email: 'annabell@mail.com',
      country: 'Saarland',
    },
  ])

  const formUpdate = ref<FormData>({
    name: '',
    password: '',
    email: '',
  })
  const formAdd = ref<FormData>({
    name: '',
    country: '',
    email: '',
  })

  const currentUser = ref<User>({
    email: '',
    name: '',
    country: '',
  })

  const dataUsers = computed(() => users.value)

  const userLogin = computed(() => currentUser.value)

  const addUser = (user: User) => {
    users.value.push(user)
    resetForm()
  }

  const setCurrentUser = (user: User) => {
    currentUser.value = user
  }

  const updateUser = (user: User) => {
    let getIndex = users.value.findIndex(
      (data: User) => data.email === user.email,
    )
    users.value[getIndex] = user

    resetForm()
  }

  const deletUser = (user: User) => {
    let getUser = users.value.findIndex(
      (data: User) => data.email === user.email,
    )

    users.value.splice(getUser, 1)
  }

  const resetForm = () => {
    formAdd.value = {
      name: '',
      country: '',
      email: '',
    }

    formUpdate.value = {
      name: '',
      password: '',
      email: '',
    }
  }

  return {
    dataUsers,
    currentUser,
    userLogin,
    formUpdate,
    formAdd,
    updateUser,
    addUser,
    setCurrentUser,
    deletUser,
  }
})
