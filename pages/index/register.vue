<template>
    <div class="row justify-content-center">
        <div class="col-md-5 col bg-white border shadow p-5 m-lg-5">
            <div
                class="d-flex justify-content-center align-items-center header-title pb-5 font-weight-bold"
            >
                <span style="color:red">Lua</span>
                <span style="color:#666"> China</span>
            </div>
            <!-- 在 @submit 或 @click 上需要加 prevent，阻止默认事件触发，否则会发生跳转 -->
            <no-ssr>
                <ValidationObserver ref="form">
                    <form
                        class="needs-validation"
                        novalidate
                        @submit.prevent="submitForm"
                        method="post"
                    >
                        <div class="form-row form-group">
                            <div class="input-group  mb-4">
                                <div class="input-group-text">
                                    <i class="bi bi-person-lines-fill"></i>
                                </div>
                                <input
                                    type="text"
                                    class="form-control"
                                    name="name"
                                    placeholder="昵称（可选）"
                                    v-model.trim="user.name"
                                />
                            </div>
                        </div>
                        <ValidationProvider
                            name="手机号"
                            rules="required|numeric|min:11"
                            v-slot="{ errors }"
                            ref="phone"
                        >
                            <div class="form-row form-group">
                                <div class="input-group  mb-4 has-validation">
                                    <div class="input-group-text">
                                        <i class="bi bi-telephone-fill"></i>
                                    </div>
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
                        >
                            <div class="form-row form-group">
                                <div class="input-group  mb-4 has-validation">
                                    <div class="input-group-text">
                                        <i class="bi bi-shield-shaded"></i>
                                    </div>
                                    <input
                                        type="text"
                                        class="form-control mr-2"
                                        :class="{
                                            'is-invalid': errors.length > 0
                                        }"
                                        placeholder="请输入验证码"
                                        v-model.trim="user.sms_code"
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
                            vid="password"
                        >
                            <div class="form-row form-group">
                                <div class="input-group  mb-4 has-validation">
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
                        <ValidationProvider
                            name="确认密码"
                            rules="required|min:6|confirmed:password"
                            v-slot="{ errors }"
                        >
                            <div class="form-row form-group">
                                <div class="input-group  mb-4 has-validation">
                                    <div class="input-group-text">
                                        <i class="bi bi-key-fill"></i>
                                    </div>
                                    <input
                                        type="password"
                                        class="form-control"
                                        :class="{
                                            'is-invalid': errors.length > 0
                                        }"
                                        placeholder="请再次输入密码"
                                        v-model="user.password_confirmed"
                                        ref="password_confirmed"
                                    />
                                    <div class="invalid-feedback">
                                        {{ errors[0] }}
                                    </div>
                                </div>
                            </div>
                        </ValidationProvider>
                        <div class="input-group">
                            <button class="col btn btn-primary" type="submit">
                                注册
                            </button>
                        </div>
                    </form>
                </ValidationObserver>
            </no-ssr>
        </div>
    </div>
</template>

<script>
import apiService from "~/services/apiService";
import localStorage from "~/utils/localStorage";

export default {
    name: "Register",
    components: {},
    beforeDestroy() {
        clearInterval(this.interval);
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
            }
        };
    },
    methods: {
        getSmsCode() {
            const that = this;
            this.$refs.phone.validate().then(res => {
                if (res.valid) {
                    apiService.post("/send/sms", that.user).then(response => {
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
                                    that.$refs.get_sms.innerHTML = "获取验证码";
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
                apiService.post("/register", this.user).then(response => {
                    let newAuth = response.data.data;
                    newAuth.login_at = Date.now();
                    localStorage.set("user", newAuth);
                    this.$toast({
                        type: "success",
                        message: "注册成功"
                    });
                    this.$router.push({ path: "/" });
                });
            });
        }
    }
};
</script>

<style lang="scss">
.input-group-text {
    svg {
        width: 16px;
        height: 16px;
    }
}
</style>
