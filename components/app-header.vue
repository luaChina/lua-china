<template>
  <div class="header-wrapper">
    <header class="navbar">
      <div class="header">
        <div class="row">
          <h1 class="col-sm-2">
            <router-link to="/" class="navbar-brand">
              <span style="color:red">Lua</span>
              <span style="color:#666"> China</span>
            </router-link>
          </h1>
          <div class="col-sm-10">
            <div class="navbar-header">
              <button class="navbar-toggle collapsed" type="button" data-toggle="collapse" data-target="#bs-navbar" aria-controls="bs-navbar" aria-expanded="false">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
            </div>
            <nav id="bs-navbar" class="collapse navbar-collapse">
              <ul class="nav navbar-nav" style="width: 100%;">
                <li>
                  <router-link to="/posts?type=openresty">OpenResty</router-link>
                </li>
                <li>
                  <router-link to="/posts?type=lua">Lua</router-link>
                </li>
                <li>
                  <a href="https://www.gitbook.com/" target="_black">Nana</a>
                </li>
                <li class="search">
                  <div class="form-group navbar-nav-div">
                    <input class="form-control search-input mac-style fa fa-search" placeholder="搜索" name="q" type="text" value="">
                  </div>
                </li>
                <li class="auth">
                  <button type="button" class="el-button el-button--primary" @click="loginPage">
                    <i class="fa fa-user"></i><span> 登录</span></button>
                  <button type="button" class="el-button el-button--primary">
                    <i class="fa fa-user-plus"></i><span> 注册</span></button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  </div>
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
.header-wrapper {
  background-color: #fff;
  border-bottom: 1px solid #000;
}
nav ul.navbar-nav {
  margin-top: 20px;
}
.search {
  margin-left: 10%;
  margin-top: 10px;
  margin-right: 5%;
}

@media (max-width: 768px) {
  header {
    width: 100%;
  }
  .navbar-toggle {
    margin-top: -1px;
  }
  .navbar-toggle .icon-bar {
    background: red;
  }
  .search {
    margin-left: 10px;
    width: 80%;
  }

  .login {
    margin-left: 5px;
  }
  .recommend {
    display: none;
  }
  nav ul.navbar-nav {
    margin-top: 0;
  }
}
</style>
