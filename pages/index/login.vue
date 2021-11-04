<template>
    <div class="row justify-content-center">
        <div class="col-md-5 col bg-white border shadow p-5 m-lg-5">
            <div
                class="d-flex justify-content-center align-items-center header-title pb-5 font-weight-bold"
            >
                <span style="color:red">Lua</span>
                <span style="color:#666"> China</span>
            </div>
            <no-ssr>
                <ValidationObserver ref="form">
                    <form
                        class="needs-validation"
                        novalidate
                        @submit.prevent="submitForm"
                        method="post"
                    >
                        <ValidationProvider
                            name="手机号"
                            rules="required|numeric|min:11"
                            v-slot="{ errors }"
                            ref="phone"
                        >
                            <div class="form-row form-group">
                                <div class="input-group mb-4 has-validation">
                                    <span class="input-group-text">
                                        <i class="bi bi-telephone-fill"></i
                                    ></span>
                                    <input
                                        type="text"
                                        class="form-control"
                                        :class="{
                                            'is-invalid': errors.length > 0
                                        }"
                                        placeholder="请输入手机号"
                                        v-model.trim="user.phone"
                                    />
                                    <div class="invalid-feedback">
                                        {{ errors[0] }}
                                    </div>
                                </div>
                            </div>
                        </ValidationProvider>
                        <ValidationProvider
                            name="验证码"
                            rules="required|numeric|min:4"
                            v-slot="{ errors }"
                            v-if="isSmsLogin"
                        >
                            <div class="form-row form-group">
                                <div class="input-group mb-3 has-validation">
                                    <div class="input-group-text">
                                        <i class="bi bi-shield-shaded"></i>
                                    </div>
                                    <input
                                        type="text"
                                        class="form-control mr-2"
                                        :class="{
                                            'is-invalid': errors.length > 0
                                        }"
                                        name="sms_code"
                                        placeholder="请输入验证码"
                                        v-model="user.sms_code"
                                        required
                                    />
                                    <button
                                        class="btn btn-success"
                                        :disabled="smsBtnDisabled"
                                        type="button"
                                        ref="get_sms"
                                        @click="getSmsCode()"
                                    >
                                        获取验证码
                                    </button>
                                    <div class="invalid-feedback">
                                        {{ errors[0] }}
                                    </div>
                                </div>
                            </div>
                        </ValidationProvider>
                        <ValidationProvider
                            name="密码"
                            rules="required|min:6"
                            v-slot="{ errors }"
                            v-if="!isSmsLogin"
                        >
                            <div class="form-row form-group">
                                <div class="input-group mb-4 has-validation">
                                    <div class="input-group-text">
                                        <i class="bi bi-key-fill"></i>
                                    </div>
                                    <input
                                        type="password"
                                        class="form-control"
                                        :class="{
                                            'is-invalid': errors.length > 0
                                        }"
                                        placeholder="请输入密码"
                                        v-model="user.password"
                                    />
                                    <div class="invalid-feedback">
                                        {{ errors[0] }}
                                    </div>
                                </div>
                            </div>
                        </ValidationProvider>
                        <div class="row">
                            <div class="col"></div>
                            <div class="col text-end">
                                <router-link
                                    class="text-danger"
                                    to="/register"
                                    rel="nofollow"
                                    >注册账号</router-link
                                >
                            </div>
                        </div>
                        <div class="input-group mt-4">
                            <button class="col btn btn-primary" type="submit">
                                登录
                            </button>
                        </div>
                    </form>
                </ValidationObserver>
            </no-ssr>
            <oauth-login />
        </div>
    </div>
</template>

<script>
import OAuthLogin from "~/components/oauth-login";
import apiService from "~/services/apiService";

export default {
    name: "Login",
    components: {
        "oauth-login": OAuthLogin
    },
    data() {
        return {
            smsBtnDisabled: false,
            isSmsLogin: false,
            user: {
                phone: null,
                password: null,
                sms_code: null
            }
        };
    },
    methods: {
        changeLoginWay() {
            this.$refs.form.reset();
            this.user.password = null;
            this.isSmsLogin = true;
        },
        getSmsCode() {
            const that = this;
            this.$refs.phone.validate().then(res => {
                if (res.valid) {
                    apiService
                        .post("/send/sms", { phone: that.user.phone })
                        .then(response => {
                            let time = 60;
                            that.smsBtnDisabled = true;
                            that.interval = setInterval(() => {
                                if (that.$refs.get_sms) {
                                    that.$refs.get_sms.innerHTML =
                                        time-- + "秒后重试";
                                }
                                if (time <= 0) {
                                    clearInterval(that.interval);
                                    that.smsBtnDisabled = false;
                                    if (that.$refs.get_sms) {
                                        that.$refs.get_sms.innerHTML =
                                            "获取验证码";
                                    }
                                    return false;
                                }
                            }, 1000);
                        });
                }
            });
        },
        submitForm() {
            this.$refs.form.validate().then(res => {
                if (!res) return;
                for (let k in this.user) {
                    if (this.user[k] == null) delete this.user[k];
                }
                apiService.post("/login", this.user).then(response => {
                    let newAuth = response.data.data;
                    newAuth.login_at = Date.now();
                    localStorage.set("user", newAuth);
                    this.$toast({
                        type: "success",
                        message: "登录成功"
                    });
                    this.$router.push({ path: "/" });
                });
            });
        }
    }
};
</script>
