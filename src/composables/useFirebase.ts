// src/composables/useFirebase.ts
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app'
import { getAuth, type Auth } from 'firebase/auth'
import { getFirestore, type Firestore } from 'firebase/firestore'
import { useRuntimeConfig } from 'nuxt/app'

let firebaseApp: FirebaseApp | undefined
let auth: Auth | undefined
let db: Firestore | undefined

export const useFirebase = () => {
  if (!firebaseApp) {
    const config = useRuntimeConfig().public as {
      firebaseApiKey: string
      firebaseAuthDomain: string
      firebaseProjectId: string
      firebaseStorageBucket: string
      firebaseMessagingSenderId: string
      firebaseAppId: string
      firebaseMeasurementId?: string
    }

    const firebaseConfig = {
      apiKey: config.firebaseApiKey,
      authDomain: config.firebaseAuthDomain,
      projectId: config.firebaseProjectId,
      storageBucket: config.firebaseStorageBucket,
      messagingSenderId: config.firebaseMessagingSenderId,
      appId: config.firebaseAppId,
      measurementId: config.firebaseMeasurementId,
    }

    firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp()
    auth = getAuth(firebaseApp)
    db = getFirestore(firebaseApp)
  }

  return {
    firebaseApp: firebaseApp!,
    auth: auth!,
    db: db!,
  }
}
