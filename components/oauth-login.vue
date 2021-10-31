<template>
    <div>
        <div class="row text-muted mt-4 mb-4">
            <div class="col-3 border-bottom mb-2"></div>
            <div class="col-6 text-center">其他登录方式</div>
            <div class="col-3 border-bottom mb-2"></div>
        </div>
        <div class="d-flex justify-content-around">
            <div class="text-center">
                <button
                    type="button"
                    class="btn btn-outline-secondary"
                    @click="githubLogin"
                >
                    <i class="bi bi-github"></i>&nbsp;GitHub登录
                </button>
            </div>
            <div class="text-center pointer-cursor" @click="smsLogin">
                <button type="button" class="btn btn-outline-secondary">
                    <i class="bi bi-chat-text-fill"></i>&nbsp;验证码登录
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import config from "~/config/api.js";

export default {
    data() {
        return {
            github_redirect_url: config.apiUrl + "/oauth/github",
            github_client_id: config.githubClientId
        };
    },
    methods: {
        githubLogin() {
            location.href =
                "https://github.com/login/oauth/authorize/?client_id=" +
                this.github_client_id +
                "&redirect_uri=" +
                this.github_redirect_url +
                "&scope=user:email";
        },
        smsLogin() {
            this.$parent.changeLoginWay();
        }
    }
};
</script>
