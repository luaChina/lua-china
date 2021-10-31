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
            <form
                class="needs-validation"
                novalidate
                @submit.prevent="submitForm"
                id="login-form"
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
                <div class="form-row form-group">
                    <div class="input-group  mb-4">
                        <div class="input-group-text">
                            <i class="bi bi-telephone-fill"></i>
                        </div>
                        <input
                            type="text"
                            class="form-control"
                            v-validate="'required|numeric|min:11'"
                            :class="{ 'is-invalid': errors.has('phone') }"
                            name="phone"
                            placeholder="手机号"
                            data-vv-as="手机号"
                            v-model.trim="user.phone"
                        />
                        <div class="invalid-feedback">
                            <span>{{ errors.first("phone") }}</span>
                        </div>
                    </div>
                </div>
                <div class="form-row form-group">
                    <div class="input-group  mb-4">
                        <div class="input-group-text">
                            <i class="bi bi-shield-shaded"></i>
                        </div>
                        <input
                            type="text"
                            class="form-control mr-2"
                            v-validate="'required|numeric|min:4'"
                            :class="{ 'is-invalid': errors.has('sms_code') }"
                            data-vv-as="短信验证码"
                            name="sms_code"
                            placeholder="输入验证码"
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
                            <span>{{ errors.first("sms_code") }}</span>
                        </div>
                    </div>
                </div>
                <div class="form-row form-group">
                    <div class="input-group  mb-4">
                        <div class="input-group-text">
                            <i class="bi bi-key-fill"></i>
                        </div>
                        <input
                            type="password"
                            class="form-control"
                            name="password"
                            v-validate="'required|min:6'"
                            data-vv-as="密码"
                            :class="{ 'is-invalid': errors.has('password') }"
                            placeholder="密码"
                            v-model="user.password"
                            ref="password"
                        />
                        <div class="invalid-feedback">
                            <span>{{ errors.first("password") }}</span>
                        </div>
                    </div>
                </div>
                <div class="form-row form-group">
                    <div class="input-group  mb-4">
                        <div class="input-group-text">
                            <i class="bi bi-key-fill"></i>
                        </div>
                        <input
                            type="password"
                            class="form-control"
                            name="password_confirmed"
                            v-validate="'required|min:6|confirmed:password'"
                            data-vv-as="确认密码"
                            :class="{
                                'is-invalid': errors.has('password_confirmed')
                            }"
                            placeholder="再次输入确认密码"
                            v-model="user.password_confirmed"
                            ref="password_confirmed"
                        />
                        <div class="invalid-feedback">
                            <span>{{
                                errors.first("password_confirmed")
                            }}</span>
                        </div>
                    </div>
                </div>
                <div class="input-group">
                    <button class="col btn btn-primary" type="submit">
                        注册
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import apiService from "~/services/apiService";
import localStorage from "~/utils/localStorage";
import { ErrorBag } from "vee-validate";

export default {
    name: "Register",
    inject: ["$validator"], // nuxt 与 vee-validate 不兼容，需要手动注入
    $_veeValidate: {
        validator: "new"
    },
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
    computed: {
        errors: function() {
            return new ErrorBag();
        }
    },
    methods: {
        getSmsCode() {
            const that = this;
            this.$validator.validate("phone").then(isValid => {
                if (isValid) {
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
            this.$validator.validateAll().then(isValid => {
                if (isValid) {
                    apiService.post("/register", this.user).then(response => {
                        let newAuth = response.data.data;
                        newAuth.login_at = Date.now();
                        localStorage.set("user", newAuth);
                        this.$notify({
                            type: "success",
                            group: "tip",
                            duration: 2000,
                            title: "注册成功"
                        });
                        this.$router.push({ path: "/" });
                    });
                }
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
