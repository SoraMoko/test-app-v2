// types/nuxt.d.ts
import type { Auth } from 'firebase/auth'
import type { Firestore } from 'firebase/firestore'

declare module 'nuxt/app' {
  interface NuxtApp {
    $auth: Auth
    $db: Firestore
  }
}

export {}
