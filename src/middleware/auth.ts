// middleware/auth.ts
import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app'
import { useFirebase } from '../composables/useFirebase'

export default defineNuxtRouteMiddleware(to => {
  const { auth } = useFirebase()
  const user = auth.currentUser

  // ユーザーが未認証で、ログインページやサインアップページ以外にアクセスしようとした場合
  if (!user && to.path !== '/login' && to.path !== '/signup') {
    return navigateTo('/login')
  }

  // ユーザーが認証済みで、ログインページやサインアップページにアクセスしようとした場合
  if (user && (to.path === '/login' || to.path === '/signup')) {
    return navigateTo('/')
  }
})
