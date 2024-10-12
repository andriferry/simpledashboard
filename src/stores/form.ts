import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { FormData, User } from '@/types/index'
import { useRouter } from 'vue-router'

// User Demo Data
import { useUsersStore } from '@/stores/user'

export const useFormStore = defineStore('formStore', () => {
  const { dataUsers, addUser, setCurrentUser } = useUsersStore()
  const router = useRouter()

  const formData = ref<FormData>({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
  })

  const signIn = async () => {
    let getEmail = dataUsers.find(
      (user: User) => user.email === formData.value.email,
    )
    let getPassword = dataUsers.find(
      (user: User) => user.password === formData.value.password,
    )

    try {
      if (getEmail && getPassword) {
        localStorage.setItem('currentUser', JSON.stringify(getEmail))

        setCurrentUser(getEmail)
        resetForm()
        router.push({ name: 'dashboard' })
      } else {
        return false
      }
    } catch (error) {
      throw error
    }
  }

  const signUp = async () => {
    try {
      delete formData.value.confirmPassword

      addUser(formData.value)
      resetForm()
      router.push({ name: 'login' })
    } catch (error) {
      throw error
    }
  }

  const resetForm = async () => {
    formData.value = {
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
    }
  }

  return { formData, signIn, signUp }
})
