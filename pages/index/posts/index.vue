<template>
  <section class="container">
    <div>
      <h1 class="title">
        Lua 中国开源社区
      </h1>
      <h2 class="subtitle">
        Lua 开发框架-文档-开源中国社区
      </h2>
      <div class="links">
        <a
          href="https://github.com/luaChina/lua-china"
          target="_blank"
          class="button--grey">GitHub</a>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  methods: {
    getPosts() {
      console.log('posts')
    }
  },
  watch: {
    '$route' (to, from) {
      this.getPosts(this.$route.path)
    }
  }
}
</script>