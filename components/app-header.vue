<template>
    <header class="shadow border-bottom bg-white">
      <nav class="navbar navbar-expand-lg navbar-light">
          <router-link to="/" class="navbar-brand header-title">
            <h2 class="seo-h2 m-0">
              <span style="color:red">Lua</span>
              <span style="color:#666"> China</span>
            </h2>
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
            <no-ssr>
            <div>
              <div v-if="!auth">
                <router-link to="/login">
                  <button type="button" class="btn btn-outline-secondary mr-2">
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
              <div v-if="auth">
                <!-- <router-link to="/posts/create"> -->
                  <a href="/posts/create" target="_blank" role="button">
                    <button class="btn btn-outline-secondary mr-2">
                      <svg width="18" height="18" aria-hidden="true" data-prefix="fas" data-icon="edit" class="svg-inline--fa fa-edit fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"></path></svg>
                      <span> 发布文章</span>
                    </button>
                  </a>
                <!-- </router-link> -->
                  <router-link :to="'/user/' + auth.id">
                      <img :src="buildAvatar(auth, 32)" :alt="auth.name">
                  </router-link>
              </div>
            </div>
            </no-ssr>
        </div>
      </nav>
    </header>
</template>

<script>
import localStorage from '~/store/localStorage'
import crypto from 'crypto'
import Identicon from 'identicon.js'
import _ from 'lodash'

export default {
  name: 'App',
  props: ['auth'],
  methods: {
    buildAvatar(user, size) {
      if (!user.avatar) {
        let hash = crypto.createHash('md5')
        hash.update(String(user.id)) // id
        let options = {
          // foreground: [0, 0, 0, 255],               // rgba black
          // background: [255, 255, 255, 255],         // rgba white
          margin: 0,                              // 0.2 20% margin
          size: size,
        }
        let base64Img = new Identicon(hash.digest('hex'), options)
        return 'data:image/png;base64,' + base64Img.toString()
      } else {
        return user.avatar
      }
    },
  }
}
</script>

<style lang="scss">
.seo-h2 {
  font-size: 24px;
}
.header-title {
  font-size: 24px;
}
</style>
