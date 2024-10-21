<!-- src/pages/signup.vue -->
<template>
  <v-card class="pa-10" elevation="3" style="width: 500px">
    <v-card-title class="text-h4 text-center">アカウント作成</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="handleSignUp">
        <v-text-field
          v-model="email"
          label="メールアドレス"
          type="email"
          required
          outlined
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="パスワード"
          type="password"
          required
          outlined
          class="mt-4"
        ></v-text-field>
        <v-row justify="center" class="mt-6">
          <v-col cols="12" sm="6">
            <v-btn color="secondary" block @click="goToLogin">ログイン画面に戻る</v-btn>
          </v-col>
          <v-col cols="12" sm="6">
            <v-btn type="submit" color="primary" block>アカウント作成する</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="snackbar.timeout">
      {{ snackbar.message }}
    </v-snackbar>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const email = ref('')
const password = ref('')
const router = useRouter()
const { signUp } = useAuth()
const snackbar = ref({
  show: false,
  message: '',
  color: '',
  timeout: 3000,
})

// サインアップ処理
async function handleSignUp() {
  try {
    await signUp(email.value, password.value)
    showSnackbar('アカウントが作成されました！', 'success')
    router.push('/tasks')
  } catch (error) {
    let message = 'アカウント作成エラー: '
    if (error.code === 'auth/email-already-in-use') {
      message += 'このメールアドレスは既に使用されています。'
    } else if (error.code === 'auth/weak-password') {
      message += 'パスワードが弱すぎます。6文字以上にしてください。'
    } else {
      message += error.message
    }
    showSnackbar(message, 'error')
  }
}

// ログインページへの遷移処理
function goToLogin() {
  router.push('/login')
}

// スナックバー表示処理
function showSnackbar(message, color) {
  snackbar.value.message = message
  snackbar.value.color = color
  snackbar.value.show = true
}
</script>

<style scoped>
/* 必要に応じてスタイルを追加 */
</style>
