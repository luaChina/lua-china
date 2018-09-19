<template>
    <header class="header-wrapper">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <router-link to="/" class="navbar-brand">
              <span style="color:red">Lua</span>
              <span style="color:#666"> China</span>
          </router-link>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
           <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item active">
                <router-link to="/posts?type=openresty">OpenResty</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/posts?type=android">安卓逆向</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/posts?type=android">Lua基础</router-link>
              </li>
              <li class="nav-item">
                <a href="https://www.github.com/horan-geeker/nana" target="_black">Nana</a>
              </li>
              <li class="search">
                  <div class="form-group navbar-nav-div">
                    <input class="form-control search-input mac-style fa fa-search" placeholder="搜索" name="q" type="text" value="">
                  </div>
                </li>
                <li class="auth">
                  <button type="button" class="el-button el-button--primary" @click="loginPage">
                    <img src="~/assets/svg/user-solid.svg"><span> 登录</span></button>
                  <button type="button" class="el-button el-button--primary">
                    <img src="~/assets/svg/user-plus-solid.svg"><span> 注册</span></button>
                </li>
            </ul>
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
    console.log('app login')
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
</style>
