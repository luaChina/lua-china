<template>
  <div class="bg-light d-flex flex-column main" id="app">
    <app-header></app-header>
    <div class="container pt-4 main-content">
      <router-view></router-view>
    </div>
    <app-foot></app-foot>
  </div>
</template>

<script>
import header from '~/components/app-header.vue'
import footer from '~/components/app-footer.vue'

export default {
  name: 'App',
  components: {
    'app-header': header,
    'app-foot': footer
  },
  beforeMount() {
    // if http 301 to https
    if (window.location.host === 'localhost:3000') return;
    if (window.location.protocol === 'http:') {
      window.location.href = 'https://' + window.location.host + window.location.pathname + window.location.search
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
