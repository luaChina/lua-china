<template>
  <div class="bg-light d-flex flex-column main" id="app">
    <app-header :auth="auth" @loginFresh="loginFresh"></app-header>
    <no-ssr>
      <notifications group="tip" position="top right" style="top:60px"/>
    </no-ssr>
    <div class="container pt-4 main-content">
      <router-view :auth="auth" @loginFresh="loginFresh"></router-view>
    </div>
    <app-foot></app-foot>
  </div>
</template>

<script>
import header from '~/components/app-header.vue'
import footer from '~/components/app-footer.vue'
import localStorage from '~/store/localStorage'
import apiService from '~/services/apiService'

export default {
  name: 'App',
  data() {
    return {
      auth: {
        id: 0
      }
    }
  },
  components: {
    'app-header': header,
    'app-foot': footer
  },
  // if http then 301 to https
  // if (window.location.protocol === 'http:') {
  //   window.location.href = 'https://' + window.location.host + window.location.pathname + window.location.search
  // }
  beforeMount() {
    // get user
    this.auth = localStorage.get('user')
    if (!this.auth) {
      apiService.get('/userinfo').then(response => {
        if (response.data.status === 0) {
          this.auth = response.data.data
          localStorage.set('user', this.auth)
        }
      })
    }
  },
  methods: {
    loginFresh(user) {
      this.auth = user
    }
  }
}
</script>

<style lang="scss">
.main {
  min-height: 100vh; // vh 是当前视窗的百分比单位 100vh 就是当前视窗的 100%
}
.main-content {
  flex: 1; // 处理页面高度较小的情况下底部留白问题
}
</style>
