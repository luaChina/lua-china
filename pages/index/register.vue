<template>
<div class="row justify-content-center">
    <div class="col-md-5 col bg-white border shadow p-5 m-lg-5">
        <div class="d-flex justify-content-center align-items-center header-title pb-5 font-weight-bold">
            <span style="color:red">Lua</span>
            <span style="color:#666"> China</span>
        </div>
        <!-- 在 @submit 或 @click 上需要加 prevent，阻止默认事件触发，否则会发生跳转 -->
        <form class="needs-validation" novalidate @submit.prevent="submitForm" id="login-form" method="post">
            <div class="form-row form-group">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text">
                            <svg aria-hidden="true" data-prefix="fas" data-icon="user" class="svg-inline--fa fa-user fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path></svg>
                        </span>
                    </div>
                    <input type="text" class="form-control" name="name" placeholder="昵称（可选）" v-model.trim="user.name">
                </div>
            </div>
            <div class="form-row form-group">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text">
                            <svg aria-hidden="true" data-prefix="fas" data-icon="user" class="svg-inline--fa fa-user fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path></svg>
                        </span>
                    </div>
                    <input type="text" class="form-control" v-validate="'required|numeric|min:11'" :class="{'is-invalid': errors.has('phone')}" name="phone" placeholder="手机号" data-vv-as="手机号" v-model.trim="user.phone">
                    <div class="invalid-feedback">
                        <span>{{ errors.first('phone') }}</span>
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
                    <input type="text" class="form-control mr-2"  v-validate="'required|numeric|min:4'" :class="{'is-invalid': errors.has('sms_code')}" data-vv-as="短信验证码" name="sms_code" placeholder="输入验证码" v-model="user.sms_code" required>
                    <button class="btn btn-success" :disabled="smsBtnDisabled" type="button" ref="get_sms" @click="getSmsCode()">获取验证码</button>
                    <div class="invalid-feedback">
                        <span>{{ errors.first('sms_code') }}</span>
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
                    <input type="password" class="form-control" name="password" v-validate="'required|min:6'" data-vv-as="密码" :class="{'is-invalid': errors.has('password')}" placeholder="密码" v-model="user.password" ref="password">
                    <div class="invalid-feedback">
                        <span>{{ errors.first('password') }}</span>
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
                    <input type="password" class="form-control" name="password_confirmed" v-validate="'required|min:6|confirmed:password'" data-vv-as="确认密码" :class="{'is-invalid': errors.has('password_confirmed')}" placeholder="再次输入确认密码" v-model="user.password_confirmed" ref="password_confirmed">
                    <div class="invalid-feedback">
                        <span>{{ errors.first('password_confirmed') }}</span>
                    </div>
                </div>
            </div>
            <div class="form-row">
                <button class="col btn btn-primary" type="submit">注册</button>
            </div>
        </form>
        <oauth-login/>
    </div>
</div>
</template>

<script>
import OAuthLogin from '~/components/oauth-login'

import apiService from '~/services/apiService'
import localStorage from '~/utils/localStorage'
import { ErrorBag } from 'vee-validate'

export default {
    name: 'Register',
    inject: ['$validator'], // nuxt 与 vee-validate 不兼容，需要手动注入
    $_veeValidate: {
        validator: 'new'
    },
    components: {
        'oauth-login': OAuthLogin
    },
    beforeDestroy() {
        console.log('clear interval')
        clearInterval(this.interval)
    },
    data() {
        return {
            interval: null,
            phoneClass: null,
            smsBtnDisabled: false,
            user: {
                phone: null,
                password: null,
                remember: null,
                password_confirmed: null,
                sms_code: null,
                name: null
            },
        }
    },
    computed: {
        errors: function() {
            return new ErrorBag()
        }
    },
    methods: {
        getSmsCode() {
            const that = this
            this.$validator.validate('phone').then(isValid => {
                if (isValid) {
                    apiService
                        .post('/send/sms', that.user)
                        .then(response => {
                            let time = 60;
                            that.smsBtnDisabled = true;
                            that.interval = setInterval(() => {
                                if (that.$refs.get_sms) {
                                    that.$refs.get_sms.innerHTML = time-- + "秒后重试"
                                }
                                if (time <= 0) {
                                    clearInterval(that.interval)
                                    that.smsBtnDisabled = false
                                    if (that.$refs.get_sms) {
                                        that.$refs.get_sms.innerHTML = "获取验证码"
                                    }
                                    return false
                                }
                            }, 1000)
                        })
                }
            })
        },
        submitForm() {
            this.$validator.validateAll().then(isValid => {
                if (isValid) {
                    apiService
                        .post('/register', this.user)
                        .then(response => {
                            let newAuth = response.data.data;
                            newAuth.login_at = Date.now();
                            localStorage.set('user', newAuth);
                            this.$notify({
                                type: 'success',
                                group: 'tip',
                                duration: 2000,
                                title: '注册成功',
                            });
                            this.$emit('loginFresh', newAuth);
                            this.$router.push({path: '/'})
                        })
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
