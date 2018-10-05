<template>
<div class="row justify-content-center">
    <div class="col-md-5 col bg-white border shadow p-5 m-lg-5">
        <div class="d-flex justify-content-center align-items-center header-title pb-5 font-weight-bold">
            <span style="color:red">Lua</span>
            <span style="color:#666"> China</span>
        </div>
        <form class="needs-validation" novalidate @submit="submitForm" id="login-form" method="post">
            <div class="form-row form-group">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text">
                            <svg aria-hidden="true" data-prefix="fas" data-icon="user" class="svg-inline--fa fa-user fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path></svg>
                        </span>
                    </div>
                    <input type="text" class="form-control" :class="phoneClass" id="phone" placeholder="手机号" v-model.trim="user.phone" required>
                    <div class="invalid-feedback">
                        {{errors.user.phone}}
                    </div>
                </div>
            </div>
            <div class="form-row form-group">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text">
                                <svg aria-hidden="true" data-prefix="fab" data-icon="telegram-plane" class="svg-inline--fa fa-telegram-plane fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M446.7 98.6l-67.6 318.8c-5.1 22.5-18.4 28.1-37.3 17.5l-103-75.9-49.7 47.8c-5.5 5.5-10.1 10.1-20.7 10.1l7.4-104.9 190.9-172.5c8.3-7.4-1.8-11.5-12.9-4.1L117.8 284 16.2 252.2c-22.1-6.9-22.5-22.1 4.6-32.7L418.2 66.4c18.4-6.9 34.5 4.1 28.5 32.2z"></path></svg>
                            </span>
                    </div>
                    <input type="text" class="form-control mr-2" id="sms_code" placeholder="输入验证码" v-model="user.sms_code" required>
                    <button class="btn btn-success" :class="getSmsBtn" type="button" ref="get_sms" @click="getSmsCode()">获取验证码</button>
                    <div class="invalid-feedback">
                        {{errors.user.sms_code}}
                    </div>
                </div>
            </div>
            <div class="form-row form-group">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text">
                                <svg aria-hidden="true" data-prefix="fas" data-icon="lock" class="svg-inline--fa fa-lock fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"></path></svg>
                            </span>
                    </div>
                    <input type="password" class="form-control" id="password" placeholder="密码" v-model="user.password" required>
                    <div class="invalid-feedback">
                        {{errors.user.password}}
                    </div>
                </div>
            </div>
            <div class="form-row form-group">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text">
                                <svg aria-hidden="true" data-prefix="fas" data-icon="lock" class="svg-inline--fa fa-lock fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"></path></svg>
                            </span>
                    </div>
                    <input type="password" class="form-control" id="password_confirmed" placeholder="再次输入确认密码" v-model="user.password_confirmed" ref="password_confirmed" required>
                    <div v-show="errors.user.password_confirmed" class="invalid-feedback">
                        {{errors.user.password_confirmed}}
                    </div>
                </div>
            </div>
            <div class="form-row form-group justify-content-between">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" v-model="user.remember" id="invalidCheck" required>
                    <label class="form-check-label text-muted" for="invalidCheck">记住我</label>
                </div>
                <router-link class="text-muted" to="/forget-password">忘记密码？</router-link>
            </div>
            <div v-if="errors.server" class="form-row invalid-feedback">
                {{errors.server}}
            </div>
            <div class="form-row">
                <button class="col btn btn-primary" type="submit">注册</button>
            </div>
        </form>
    </div>
</div>
</template>

<script>
import apiService from '~/services/apiService'
import localStorage from '~/store/localStorage'

export default {
    name: 'Register',
    data() {
        return {
            phoneClass: null,
            getSmsBtn: null,
            user: {
                phone: null,
                password: null,
                remember: null,
                password_confirmed: null,
                sms_code: null,
            },
            errors: {
                user: {
                    phone: null,
                    password: null,
                    password_confirmed: null,
                    sms_code: null,
                },
                server: null
            },
        }
    },
    methods: {
        getSmsCode() {
            this.errors.user = {
                phone: null,
            }
            this.phoneClass = null
            if (!this.user.phone) {
                this.phoneClass = ' is-invalid'
                this.errors.user.phone = '请输入手机号'
            }
            for(let item in this.errors.user) {
                if (this.errors.user[item]) return false
            }
            this.getSmsBtn = "disabled"
            apiService
                .post('/send/sms', this.user)
                .then(response => {
                    if(response.data.status !== 0) {
                        this.getSmsBtn = null
                        this.$notify({
                            type: 'error',
                            group: 'tip',
                            duration: 2000,
                            title: response.data.msg,
                        })
                    } else {
                        let time = 60
                        let interval = setInterval(() => {
                            this.$refs.get_sms.innerHTML = time-- + "秒后重试"
                            if (time <= 0) {
                                clearInterval(interval)
                                this.getSmsBtn = null
                                this.$refs.get_sms.innerHTML = "获取验证码"
                                return false
                            }
                        }, 1000)
                    }
                })
                .catch(error => {})
        },
        submitForm() {
            this.errors.user = {
                phone: null,
                password: null,
                remember: null,
                password_confirmed: null,
                sms_code: null,
            }
            if (!this.user.phone) {
                this.errors.user.phone = '请输入手机号'
            }
            if (!this.user.password) {
                this.errors.user.password = '请输入密码'
            }
            if (!this.user.password_confirmed) {
                this.errors.user.password_confirmed = '请再次输入确认密码'
            }
            if (!this.user.sms_code) {
                this.errors.user.sms_code = '请输入短信验证码'
            }
            if (this.user.password_confirmed !== this.user.password) {
                this.$refs.password_confirmed.className += ' is-invalid'
                this.errors.user.password_confirmed = '两次输入密码不一致'
            }
            
            for(let item in this.errors.user) {
                if (this.errors.user[item]) return false
            }

            apiService
                .post('/register', this.user)
                .then(response => {
                    if(response.data.status !== 0) {
                        this.$notify({
                            type: 'error',
                            group: 'tip',
                            duration: 2000,
                            title: response.data.msg,
                        })
                    } else {
                        let auth = response.data.data
                        auth.login_at = Date.now()
                        localStorage.set('user', auth)
                        this.$notify({
                            type: 'success',
                            group: 'tip',
                            duration: 2000,
                            title: '注册成功',
                        })
                        this.$router.push({path: '/'})
                    }
                })
        },
    }
}
</script>

<style lang="scss">
.input-group-text {
    svg {
        width: 16px;
        height: 16px;
    }
}
</style>
