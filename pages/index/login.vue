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
                            <font-awesome-icon :icon="['fas', 'user']" :style="{width:'13px',height:'15px'}"/>
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
                        <span class="input-group-text"><font-awesome-icon :icon="['fas', 'lock']" :style="{width:'13px',height:'15px'}"/></span>
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
