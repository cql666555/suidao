<template>
    <div class="login-container">
        <el-form class="user" size="large" :model="user">
            <div class="title-container">
                <h3 class="title">隧道后台管理系统登录</h3>
            </div>
            <el-form-item prop="username">
                <el-input prefix-icon="User" v-model="user.username" type="text" placeholder="请输入用户名"
                    name="username"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input prefix-icon="Lock" v-model="user.password" type="password" placeholder="请输入密码"
                    name="password"></el-input>
            </el-form-item>
            <el-button style="width: 100%;margin-bottom: 30px;" type="primary"
                @click.native.prevent="handleLogin">登录</el-button>
        </el-form>
    </div>
</template>

<script setup>
import api from '@/api/index.js'
import { useLoginStore } from '@/stores/loginStore.js'
import { pushScopeId, reactive } from 'vue'
import { useRouter } from 'vue-router'

// 登录仓库
const loginStore = useLoginStore();
// 获取路由对象
const router = useRouter()

// 声明用户信息
const user = reactive({
    username: '',
    password: ''
})

// 登录事件
const handleLogin = () => {
    api.getLogin({
        username: user.username,
        password: user.password
    }).then(res => {
        if (res.data.status === 200) {
            loginStore.token = res.data.token;
            loginStore.username = res.data.username;
            loginStore.permission = res.data.permission;
            router.push('/')
        } else {
            // 失败
            ElMessage({
                message: res.data.msg,
                type: 'error',
                plain: true,
            })
        }
    })
}

</script>

<style scoped>
.login-container {
    width: 100%;
    height: 100%;
    background-color: #2d3a4b;
}

.user {
    position: relative;
    width: 400px;
    padding: 160px 35px 0;
    margin: 0 auto;
}

.title-container .title {
    font-size: 30px;
    color: #fff;
    text-align: center;
    margin: 20px;
}
</style>