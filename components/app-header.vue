<template>
    <header class="shadow border-bottom bg-white">
      <nav class="navbar navbar-expand-lg navbar-light">
          <router-link to="/" class="navbar-brand header-title">
              <span style="color:red">Lua</span>
              <span style="color:#666"> China</span>
          </router-link>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse " id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item mr-2">
                <router-link class="nav-link" to="/posts?category=openresty">OpenResty</router-link>
              </li>
              <li class="nav-item mr-2">
                <router-link class="nav-link" to="/posts?category=android">安卓逆向</router-link>
              </li>
              <li class="nav-item mr-2">
                <router-link class="nav-link" to="/posts?category=lua_base">Lua基础</router-link>
              </li>
              <li class="nav-item mr-4">
                <a class="nav-link" href="https://www.github.com/horan-geeker/nana" target="_black">Nana</a>
              </li>
            </ul>
            <form class="form-inline mr-auto mb-lg-0 mb-2">
              <input class="form-control" type="search" placeholder="Search" aria-label="Search">
            </form>
            <router-link to="/login">
              <button type="button" class="btn btn-outline-secondary mr-2" @click="loginPage">
                <img src="~/assets/svg/user-solid.svg"><span> 登录</span>
              </button>
            </router-link>
            <router-link to="/register">
              <button type="button" class="btn btn-outline-success">
                <img src="~/assets/svg/user-plus-solid.svg"><span> 注册</span>
              </button>
            </router-link>
        </div>
      </nav>
    </header>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {}
  },
  created () {
  },
  methods: {
    loginPage () {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss">
.seo-h1 {
  opacity: 0;
}
.header-title {
  font-size: 24px;
}
</style>
