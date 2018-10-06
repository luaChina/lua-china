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
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" v-model="user.remember" id="invalidCheck" required>
                    <label class="form-check-label text-muted" for="invalidCheck">记住我</label>
                </div>
                <router-link class="text-muted" to="/forget-password">忘记密码？</router-link>
            </div>
            <div class="form-row">
                <button class="col btn btn-primary" type="submit">登录</button>
            </div>
        </form>
        <div>
            <div class="row text-muted mt-4 mb-4">
                <div class="col-3 border-bottom mb-2"></div>
                <div class="col-6 text-center">社交账号登录</div>
                <div class="col-3 border-bottom mb-2"></div>
            </div>
            <div class="d-flex justify-content-around">
                <svg width="36" height="36" aria-hidden="true" data-prefix="fab" data-icon="weixin" class="svg-inline--fa fa-weixin fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#00bb29" d="M385.2 167.6c6.4 0 12.6.3 18.8 1.1C387.4 90.3 303.3 32 207.7 32 100.5 32 13 104.8 13 197.4c0 53.4 29.3 97.5 77.9 131.6l-19.3 58.6 68-34.1c24.4 4.8 43.8 9.7 68.2 9.7 6.2 0 12.1-.3 18.3-.8-4-12.9-6.2-26.6-6.2-40.8-.1-84.9 72.9-154 165.3-154zm-104.5-52.9c14.5 0 24.2 9.7 24.2 24.4 0 14.5-9.7 24.2-24.2 24.2-14.8 0-29.3-9.7-29.3-24.2.1-14.7 14.6-24.4 29.3-24.4zm-136.4 48.6c-14.5 0-29.3-9.7-29.3-24.2 0-14.8 14.8-24.4 29.3-24.4 14.8 0 24.4 9.7 24.4 24.4 0 14.6-9.6 24.2-24.4 24.2zM563 319.4c0-77.9-77.9-141.3-165.4-141.3-92.7 0-165.4 63.4-165.4 141.3S305 460.7 397.6 460.7c19.3 0 38.9-5.1 58.6-9.9l53.4 29.3-14.8-48.6C534 402.1 563 363.2 563 319.4zm-219.1-24.5c-9.7 0-19.3-9.7-19.3-19.6 0-9.7 9.7-19.3 19.3-19.3 14.8 0 24.4 9.7 24.4 19.3 0 10-9.7 19.6-24.4 19.6zm107.1 0c-9.7 0-19.3-9.7-19.3-19.6 0-9.7 9.7-19.3 19.3-19.3 14.5 0 24.4 9.7 24.4 19.3.1 10-9.9 19.6-24.4 19.6z"></path></svg>
                <svg width="34" height="34" aria-labelledby="simpleicons-github-icon" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title id="simpleicons-github-icon">GitHub icon</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import apiService from '~/services/apiService'
import localStorage from '~/store/localStorage'

export default {
    name: 'Login',
    props: ['auth'],
    data() {
        return {
            user: {
                phone: null,
                password: null,
                remember: null
            },
        }
    },
    methods: {
        submitForm() {
            this.$validator.validateAll().then(isValide => {
                if(isValide) {
                    apiService
                        .post('/login', this.user)
                        .then(response => {
                            if (response.data.status != 0) {
                                this.$notify({
                                    type: 'error',
                                    group: 'tip',
                                    duration: 2000,
                                    title: response.data.msg,
                                })
                            } else {
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
                            }
                        })
                }
            })
        }
    }
}
</script>
