<!-- src/components/TaskCard.vue -->
<template>
  <v-card
    class="mb-2"
    :elevation="task.completed ? 1 : 3"
    :class="task.completed ? 'task-completed' : ''"
  >
    <v-card-text>
      <div class="d-flex align-center">
        <v-btn icon color="green" class="mr-2" @click="onToggleComplete">
          <v-icon>
            {{
              task.completed ? 'mdi-checkbox-marked-circle' : 'mdi-checkbox-blank-circle-outline'
            }}
          </v-icon>
        </v-btn>
        <div class="flex-grow-1">
          <div class="task-title">{{ task.title }}</div>
        </div>
        <v-btn icon color="red" @click="onDeleteTask">
          <v-icon>mdi-trash-can-outline</v-icon>
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
})
const emits = defineEmits(['toggle-complete', 'delete-task'])

function onToggleComplete() {
  emits('toggle-complete', props.task)
}

function onDeleteTask() {
  emits('delete-task', props.task.id)
}
</script>

<style scoped>
.task-completed .task-title {
  text-decoration: line-through;
  color: gray;
}
.task-title {
  font-size: 16px;
}
</style>
