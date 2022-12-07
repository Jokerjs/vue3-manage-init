<template>
    <div class="login-container">
        <el-row>
            <el-col :xs="24" :sm="24" :md="12" :lg="16" :xl="16">
                <div style="color: transparent">占位符</div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form ref="refForm" :model="form" :rules="rules" class="login-form" label-position="left">
                    <div class="title">hello !</div>
                    <div class="title-tips">欢迎来到{{ title }}！</div>
                    <el-form-item style="margin-top: 40px" prop="username">
                        <el-input v-model.trim="form.username" placeholder="请输入用户名" tabindex="1" type="text"/>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input :key="passwordType" ref="password" v-model.trim="form.password" :type="passwordType" tabindex="2" placeholder="请输入密码" @keyup.enter="handleLogin"/>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-row :gutter="10" style="width: 100%;">
                            <el-col :span="17">
                                <el-input :key="passwordType" v-model.trim="form.captcha" placeholder="请输入验证码" @keyup.enter="handleLogin"/>
                            </el-col>
                            <el-col :span="7">
                                <img :src="captchaImg" class="captcha-img" @click="getCaptchaImg" />
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-button :loading="loading" class="login-btn" type="primary" @click="handleLogin">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import website from '@/config/website'
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { _http, _api } from '@/libs/'

const mgStore = useStore()
const mgRouter = useRouter()

const now = ref(0)
const captchaImg = ref('')
const refForm = ref(null)
const title = ref(website.base_title)
const passwordType = ref('password')
const loading = ref(false)
const form = reactive({
    username: 'jeecg',
    password: '123456',
})
const rules = reactive({
    username: [
        {
            required: true,
            trigger: 'blur',
            message: '用户名不能为空'
        }],
    password: [
        {
            required: true,
            trigger: 'blur',
            message: '密码不能为空'
        }
    ],
    captcha: [
    {
            required: true,
            trigger: 'blur',
            message: 'y验证码能为空'
        }
    ]
})

getCaptchaImg()

function getCaptchaImg() {
    now.value = new Date().getTime()
    _http.get(_api.randomImage + '/' + now.value).then(res => {
        captchaImg.value = res
    })
}
function handleLogin(){
    refForm.value.validate((valid) => {
        if (valid) {
            loading.value = true
            form.checkKey = now.value
            mgStore.dispatch('user/LoginByUsername', form).then(() => {
                mgRouter.push({ path: '/Manage' })
                loading.value = false
            }).catch(() => {
                loading.value = false
            })
        } else {
            return false
        }
    })
}
</script>

<style lang="scss" scoped>
.login-container {
    height: 100vh;
    background: url('~@/assets/login_images/login_background.png') center center fixed no-repeat;
    background-size: cover;

    .title {
        font-size: 54px;
        font-weight: 500;
        color: #ffffff;
    }

    .title-tips {
        margin-top: 29px;
        font-size: 26px;
        font-weight: 400;
        color: #ffffff;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .login-btn {
        width: 100%;
        height: 48px;
        line-height: 48px;
        margin-top: 5px;
        border-radius: 99px;

        &:hover {
            opacity: 0.9;
        }
    }

    .login-form {
        width: 380px;
        padding: 4vh;
        margin-top: calc(50vh - 250px);
        background: url('~@/assets/login_images/login_form.png');
        background-size: 100% 100%;
        border-radius: 10px;
        box-shadow: 0 2px 8px 0 rgb(7 17 27 / 6%);
    }

    ::v-deep {
        .el-input {
            box-sizing: border-box;

            input {
                height: 48px;
                padding-left: 45px;
                line-height: 48px;
                background: #f6f4fc;
                border: 0;
            }
        }
    }

    .captcha-img {
        width: 100%;
        height: 46px;
    }
}
</style>
