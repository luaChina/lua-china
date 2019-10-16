<template>
  <div>
    <div class="row text-muted mt-4 mb-4">
      <div class="col-3 border-bottom mb-2"></div>
      <div class="col-6 text-center">其他登录方式</div>
      <div class="col-3 border-bottom mb-2"></div>
    </div>
    <div class="d-flex justify-content-around">
      <div class="text-center">
        <a :href="'https://github.com/login/oauth/authorize/?client_id=' + github_client_id + '&redirect_uri=' + github_redirect_url + '&scope=user:email'" rel="nofollow">
          <font-awesome-icon :icon="['fab', 'github']" style="width: 34px;height: 34px;color:black"/>
        </a>
        <div class="text-muted">GitHub 登录</div>
      </div>
      <div class="text-center" @click="smsLogin">
        <a>
          <font-awesome-icon :icon="['fas', 'sms']" style="width: 34px;height: 34px;color:black"/>
        </a>
        <div class="text-muted">短信验证码登录</div>
      </div>
    </div>
  </div>
</template>


<script>
  import config from '~/config/api.js'

  export default {
    data() {
      return {
        github_redirect_url: config.apiUrl + '/oauth/github',
        github_client_id: config.githubClientId
      }
    },
    methods: {
      smsLogin() {
        this.$parent.changeLoginWay();
      }
    }
  }
</script>
