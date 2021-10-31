<template>
  <div class="row justify-content-center">
    <div class="col-md-5 col bg-white border shadow p-5 m-lg-5">
      <div
        class="d-flex justify-content-center align-items-center header-title pb-5 font-weight-bold"
      >
        <span style="color:red">Lua</span>
        <span style="color:#666"> China</span>
      </div>
      <form
        class="needs-validation"
        novalidate
        @submit.prevent="submitForm"
        id="login-form"
        method="post"
      >
        <div class="form-row form-group">
          <div class="input-group mb-4">
            <span class="input-group-text">
              <i class="bi bi-telephone-fill"></i
            ></span>
            <input
              type="text"
              class="form-control"
              name="phone"
              data-vv-as="手机号"
              v-validate="'required|numeric|min:11'"
              :class="{ 'is-invalid': errors.has('phone') }"
              placeholder="手机号"
              v-model.trim="user.phone"
              required
            />
            <div class="invalid-feedback">
              {{ errors.first("phone") }}
            </div>
          </div>
        </div>
        <div class="form-row form-group" v-show="isSmsLogin">
          <div class="input-group mb-3">
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
        <div class="form-row form-group" v-show="!isSmsLogin">
          <div class="input-group mb-4">
            <div class="input-group-text">
              <i class="bi bi-key-fill"></i>
            </div>
            <input
              type="password"
              class="form-control"
              name="password"
              data-vv-as="密码"
              v-validate="'required|min:6'"
              :class="{ 'is-invalid': errors.has('password') }"
              placeholder="密码"
              v-model="user.password"
              required
            />
            <div class="invalid-feedback">
              {{ errors.first("password") }}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <!-- <router-link class="text-muted" to="/forget-password" rel="nofollow"
              >忘记密码？</router-link
            > -->
          </div>
          <div class="col text-end">
            <router-link class="text-danger" to="/register" rel="nofollow"
              >注册账号</router-link
            >
          </div>
        </div>
        <div class="input-group mt-4">
          <button class="col btn btn-primary" type="submit">登录</button>
        </div>
      </form>
      <oauth-login />
    </div>
  </div>
</template>

<script>
import OAuthLogin from "~/components/oauth-login";

import apiService from "~/services/apiService";
import localStorage from "~/utils/localStorage";
import { ErrorBag } from "vee-validate";

export default {
  name: "Login",
  inject: ["$validator"], // nuxt 与 vee-validate 不兼容，需要手动注入
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
  computed: {
    errors: function() {
      return new ErrorBag();
    }
  },
  methods: {
    changeLoginWay() {
      this.$validator.reset();
      this.user.password = null;
      this.isSmsLogin = true;
    },
    getSmsCode() {
      const that = this;
      this.$validator.validate("phone").then(isValid => {
        if (isValid) {
          apiService
            .post("/send/sms", { phone: that.user.phone })
            .then(response => {
              let time = 60;
              that.smsBtnDisabled = true;
              that.interval = setInterval(() => {
                if (that.$refs.get_sms) {
                  that.$refs.get_sms.innerHTML = time-- + "秒后重试";
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
      for (let k in this.user) {
        if (this.user[k] == null) delete this.user[k];
      }
      let validateArr = this.isSmsLogin
        ? ["phone", "sms_code"]
        : ["phone", "password"];
      this.$validator.validateAll(validateArr).then(isValidated => {
        if (isValidated) {
          apiService.post("/login", this.user).then(response => {
            let newAuth = response.data.data;
            newAuth.login_at = Date.now();
            localStorage.set("user", newAuth);
            this.$notify({
              type: "success",
              group: "tip",
              duration: 2000,
              title: "登录成功"
            });
            this.$router.push({ path: "/" });
          });
        }
      });
    }
  }
};
</script>
