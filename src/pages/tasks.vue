<!-- src/pages/tasks.vue -->
<template>
  <v-container class="ma-5">
    <!-- タスク追加フォーム -->
    <v-card class="pa-4 mb-4" elevation="2">
      <v-form @submit.prevent="addTask">
        <v-row align="center">
          <v-col cols="9">
            <v-text-field
              v-model="taskTitle"
              label="新しいタスクを入力"
              outlined
              clearable
              placeholder="例: 買い物に行く"
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-btn type="submit" color="primary" block>追加</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card>

    <!-- タスクフィルター -->
    <v-row class="mb-4" align="center">
      <v-col cols="6">
        <v-select
          v-model="filter"
          :items="['すべて', '未完了', '完了']"
          label="タスクフィルター"
          outlined
        ></v-select>
      </v-col>
      <v-col cols="6" class="text-right">
        <v-btn color="secondary" @click="fetchTasks">再読み込み</v-btn>
      </v-col>
    </v-row>

    <!-- タスクリスト -->
    <v-slide-y-transition group>
      <div>
        <TaskCard
          v-for="task in filteredTasks"
          :key="task.id"
          :task="task"
          @toggle-complete="toggleComplete"
          @delete-task="deleteTask"
        />
      </div>
    </v-slide-y-transition>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import TaskCard from '../components/TaskCard.vue'
import { useAuth } from '../composables/useAuth'
import { useFirestore } from '../composables/useFirestore'

definePageMeta({
  middleware: 'auth',
})

const taskTitle = ref('')
const tasks = ref([])
const filter = ref('すべて')
const currentUser = useAuth().currentUser
const {
  addTask: addTaskToFirestore,
  getTasks,
  updateTask,
  deleteTask: deleteTaskFromFirestore,
} = useFirestore()

async function addTask() {
  if (!taskTitle.value.trim()) return

  if (!currentUser.value) {
    alert('タスクを追加するにはログインが必要です。')
    return
  }

  const taskData = {
    title: taskTitle.value.trim(),
    completed: false,
    userId: currentUser.value.uid,
  }

  const taskRef = await addTaskToFirestore(taskData)
  tasks.value.push({ id: taskRef.id, ...taskData })
  taskTitle.value = ''
}

async function fetchTasks() {
  if (!currentUser.value) return
  const allTasks = await getTasks()
  tasks.value = allTasks.filter(task => task.userId === currentUser.value.uid)
}

async function toggleComplete(task) {
  const updatedCompleted = !task.completed
  await updateTask(task.id, { completed: updatedCompleted })
  task.completed = updatedCompleted
}

async function deleteTask(id) {
  await deleteTaskFromFirestore(id)
  tasks.value = tasks.value.filter(task => task.id !== id)
}

const filteredTasks = computed(() => {
  if (filter.value === '完了') {
    return tasks.value.filter(task => task.completed)
  } else if (filter.value === '未完了') {
    return tasks.value.filter(task => !task.completed)
  } else {
    return tasks.value
  }
})

onMounted(fetchTasks)
</script>

<style scoped>
/* 必要に応じてスタイルを追加 */
</style>
