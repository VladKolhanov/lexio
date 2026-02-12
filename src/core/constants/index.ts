export const Routes = {
  Home: '/',
  SignIn: '/sign-in',
  SignUp: '/sign-up',
  Dashboard: '/dashboard',
  ConfirmEmail: '/confirm-email',
  EmailVerified: '/email-verified',
} as const

export const PersistKeys = {
  FormSignUp: 'form-sign-up',
  FormSignIn: 'form-sign-in',
  FormAddWord: 'form-add-word',
} as const

export type PersistKeys = (typeof PersistKeys)[keyof typeof PersistKeys]
