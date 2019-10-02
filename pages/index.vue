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
  import localStorage from '~/utils/localStorage'
  import syncApiService from '~/services/syncApiService'
  import config from '~/config/api.js'

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
    beforeMount() {
      // get user
      syncApiService.get(config.apiUrl + '/userinfo').then(response => {
        if (response.data.status === 0) {
          this.auth = response.data.data;
          localStorage.set('user', this.auth)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    mounted() {
      this.$nextTick(() => {
        this.$nuxt.$loading.start();

        setTimeout(() => this.$nuxt.$loading.finish(), 500)
      });
      // init sentry
      Sentry.init({ dsn: 'https://b11425e91d854dc8a9a62b2ac1cc1590@sentry.io/1329324' });
      // init baidu seo
      var bp = document.createElement('script');
      bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(bp, s);
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
