// src/composables/useAuth.ts
import { ref } from 'vue'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth'
import { useFirebase } from './useFirebase'

export const useAuth = () => {
  const { auth } = useFirebase()
  const currentUser = ref<User | null>(auth.currentUser)

  // 認証状態の監視
  onAuthStateChanged(auth, user => {
    currentUser.value = user
  })

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      currentUser.value = userCredential.user
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const signUp = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      currentUser.value = userCredential.user
    } catch (error) {
      console.error('Sign-up error:', error)
      throw error
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      currentUser.value = null
    } catch (error) {
      console.error('Logout error:', error)
      throw error
    }
  }

  return {
    currentUser,
    login,
    signUp,
    logout,
  }
}
