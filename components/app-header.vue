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
                <router-link class="nav-link" to="/" active-class="active" exact>文章</router-link>
              </li>
              <li class="nav-item mr-2">
                <router-link class="nav-link" to="/">问答</router-link>
              </li>
              <!-- <li class="nav-item mr-2">
                <router-link class="nav-link" to="/posts?category=lua_base">Lua基础</router-link>
              </li> -->
              <li class="nav-item mr-4">
                <a class="nav-link" href="https://www.github.com/horan-geeker/nana" target="_black">Nana</a>
              </li>
            </ul>
            <form class="form-inline mr-auto mb-lg-0 mb-2">
              <input class="form-control" type="search" placeholder="搜索" aria-label="Search">
            </form>
            <router-link to="/login">
              <button type="button" class="btn btn-outline-secondary mr-2" @click="loginPage">
                <svg width="15" height="15" aria-hidden="true" data-prefix="fas" data-icon="user" class="svg-inline--fa fa-user fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path></svg>
                <span> 登录</span>
              </button>
            </router-link>
            <router-link to="/register">
              <button type="button" class="btn btn-outline-success">
                <svg width="18" height="18" aria-hidden="true" data-prefix="fas" data-icon="user-plus" class="svg-inline--fa fa-user-plus fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M624 208h-64v-64c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v64h-64c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h64v64c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-64h64c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm-400 48c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path></svg>
                <span> 注册</span>
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
