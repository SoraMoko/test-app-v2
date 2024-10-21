<!-- src/pages/index.vue -->
<template>
  <!-- メインコンテンツコンテナ　カード内　タイトル中央、ボタン中央-->
  <v-card class="pa-10" elevation="3" max-width="1000">
    <v-card-title class="text-h4 text-center">Todoリスト管理アプリへ</v-card-title>
    <v-card-text>
      <v-row justify="center" class="mt-6">
        <v-col cols="12" sm="6" class="d-flex justify-center">
          <v-btn color="primary" block @click="goToLogin">ログイン</v-btn>
        </v-col>
        <v-col cols="12" sm="6" class="d-flex justify-center">
          <v-btn color="secondary" block @click="goToSignUp">サインアップ</v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

// ログインページへ遷移させる
function goToLogin() {
  router.push('/login')
}

// サインアップページへ遷移させる
function goToSignUp() {
  router.push('/signup')
}
</script>

<style scoped>
/* 必要に応じてスタイルを追加 */
</style>
