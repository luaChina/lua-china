<template>
  <div id="app">
    <app-header></app-header>
    <div class="bg-light">
      <router-view class="container"></router-view>
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
  }
}
</script>

<style lang="scss">
// body {
//   background: #f0f2f5;
// }
</style>
