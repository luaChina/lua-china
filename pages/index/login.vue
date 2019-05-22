<template>
<div class="row justify-content-center">
    <div class="col-md-5 col bg-white border shadow p-5 m-lg-5">
        <div class="d-flex justify-content-center align-items-center header-title pb-5 font-weight-bold">
            <span style="color:red">Lua</span>
            <span style="color:#666"> China</span>
        </div>
        <form class="needs-validation" novalidate @submit.prevent="submitForm" id="login-form" method="post">
            <div class="form-row form-group">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text">
                                <svg width="15" height="15" aria-hidden="true" data-prefix="fas" data-icon="user" class="svg-inline--fa fa-user fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path></svg>
                            </span>
                    </div>
                    <input type="text" class="form-control" name="phone" data-vv-as="手机号" v-validate="'required|numeric|min:11'" :class="{'is-invalid': errors.has('phone')}" placeholder="手机号" v-model.trim="user.phone" required>
                    <div class="invalid-feedback">
                        {{ errors.first('phone') }}
                    </div>
                </div>
            </div>
            <div class="form-row form-group">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text">
                                <svg width="15" height="15" aria-hidden="true" data-prefix="fas" data-icon="lock" class="svg-inline--fa fa-lock fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"></path></svg>
                            </span>
                    </div>
                    <input type="password" class="form-control" name="password" data-vv-as="密码" v-validate="'required|min:6'" :class="{'is-invalid': errors.has('password')}" placeholder="密码" v-model="user.password" required>
                    <div class="invalid-feedback">
                        {{ errors.first('password')}}
                    </div>
                </div>
            </div>
            <div class="form-row form-group justify-content-between">
                <router-link class="text-muted" to="/forget-password">忘记密码？</router-link>
                <router-link class="text-danger" to="/register">注册账号</router-link>
            </div>
            <div class="form-row">
                <button class="col btn btn-primary" type="submit">登录</button>
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
    name: 'Login',
    props: ['auth'],
    inject: ['$validator'], // nuxt 与 vee-validate 不兼容，需要手动注入
    components: {
        'oauth-login': OAuthLogin
    },
    data() {
        return {
            user: {
                phone: null,
                password: null,
                remember: null
            },
        }
    },
    computed: {
        errors: function() {
            return new ErrorBag()
        }
    },
    methods: {
        submitForm() {
            this.$validator.validateAll().then(isValide => {
                if (isValide) {
                    apiService
                        .post('/login', this.user)
                        .then(response => {
                            let newAuth = response.data.data
                            newAuth.login_at = Date.now()
                            localStorage.set('user', newAuth)
                            this.$notify({
                                type: 'success',
                                group: 'tip',
                                duration: 2000,
                                title: '登录成功',
                            })
                            this.$emit('loginFresh', newAuth)
                            this.$router.push({path: '/'})
                        })
                }
            })
        }
    }
}
</script>
