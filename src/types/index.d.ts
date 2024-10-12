import type { PrivateFormContext } from 'vee-validate'

type UserValidation = PrivateFormContext
interface User {
  email: string
  password?: string
  name?: string
  country?: string
}

interface FormData extends User {
  confirmPassword?: string
}
