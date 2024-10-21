// src/composables/useFirestore.ts
import { useFirebase } from './useFirebase'
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import type { UpdateData } from 'firebase/firestore'

export const useFirestore = () => {
  const { db } = useFirebase()

  // タスクの型を定義
  interface Task {
    id?: string
    title: string
    completed: boolean
    userId: string
  }

  // タスク追加
  const addTask = async (task: Task) => {
    return await addDoc(collection(db, 'tasks'), task)
  }

  // タスク取得
  const getTasks = async (): Promise<Task[]> => {
    const querySnapshot = await getDocs(collection(db, 'tasks'))
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Task)
  }

  // タスク更新
  const updateTask = async (id: string, updatedData: UpdateData<Task>) => {
    return await updateDoc(doc(db, 'tasks', id), updatedData)
  }

  // タスク削除
  const deleteTask = async (id: string) => {
    return await deleteDoc(doc(db, 'tasks', id))
  }

  return {
    addTask,
    getTasks,
    updateTask,
    deleteTask,
  }
}
