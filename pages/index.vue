<template>
  <div id="app" class="container-fluid">
    <app-header></app-header>
    <div class="container">
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
  }
}
</script>

<style lang="scss">
.container-fluid {
  background-color: #f0f2f5;
  padding: 0;
}
body {
  background: #f0f2f5;
}
</style>
