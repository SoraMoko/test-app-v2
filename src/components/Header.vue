<!-- src/components/Header.vue -->
<template>
  <v-app-bar app color="primary" dark>
    <v-toolbar-title>Todoリスト管理アプリ</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon @click="dialog = true">
      <v-icon>mdi-logout</v-icon>
    </v-btn>
    <!-- 確認ダイアログ -->
    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-title class="headline">ログアウトしますか？</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">キャンセル</v-btn>
          <v-btn color="red darken-1" text @click="confirmLogout">ログアウト</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app-bar>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '../composables/useAuth'
import { useRouter } from 'vue-router'

const auth = useAuth()
const router = useRouter()
const dialog = ref(false)

function confirmLogout() {
  auth.logout()
  router.push('/login')
}
</script>
