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
              <div class="d-flex align-items-center" v-if="auth">
                  <a href="/posts/create" target="_blank" role="button">
                    <button class="btn btn-outline-secondary mr-2">
                      <svg width="18" height="18" aria-hidden="true" data-prefix="fas" data-icon="edit" class="svg-inline--fa fa-edit fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"></path></svg>
                      <span> 发布文章</span>
                    </button>
                  </a>
                <div class="dropdown">
                  <a href="#" class="dropdown-toggle text-muted" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <img :src="buildAvatar(auth, 32)" :alt="auth.name">
                  </a>
                  <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                    <router-link to="/users/profile" class="dropdown-item d-flex align-items-center">
                    <svg aria-hidden="true" data-prefix="fas" data-icon="cog" class="svg-inline--fa fa-cog fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M444.788 291.1l42.616 24.599c4.867 2.809 7.126 8.618 5.459 13.985-11.07 35.642-29.97 67.842-54.689 94.586a12.016 12.016 0 0 1-14.832 2.254l-42.584-24.595a191.577 191.577 0 0 1-60.759 35.13v49.182a12.01 12.01 0 0 1-9.377 11.718c-34.956 7.85-72.499 8.256-109.219.007-5.49-1.233-9.403-6.096-9.403-11.723v-49.184a191.555 191.555 0 0 1-60.759-35.13l-42.584 24.595a12.016 12.016 0 0 1-14.832-2.254c-24.718-26.744-43.619-58.944-54.689-94.586-1.667-5.366.592-11.175 5.459-13.985L67.212 291.1a193.48 193.48 0 0 1 0-70.199l-42.616-24.599c-4.867-2.809-7.126-8.618-5.459-13.985 11.07-35.642 29.97-67.842 54.689-94.586a12.016 12.016 0 0 1 14.832-2.254l42.584 24.595a191.577 191.577 0 0 1 60.759-35.13V25.759a12.01 12.01 0 0 1 9.377-11.718c34.956-7.85 72.499-8.256 109.219-.007 5.49 1.233 9.403 6.096 9.403 11.723v49.184a191.555 191.555 0 0 1 60.759 35.13l42.584-24.595a12.016 12.016 0 0 1 14.832 2.254c24.718 26.744 43.619 58.944 54.689 94.586 1.667 5.366-.592 11.175-5.459 13.985L444.788 220.9a193.485 193.485 0 0 1 0 70.2zM336 256c0-44.112-35.888-80-80-80s-80 35.888-80 80 35.888 80 80 80 80-35.888 80-80z"></path></svg><span>个人设置</span></router-link>
                    <router-link to="/users/posts" class="dropdown-item">
                    <svg aria-hidden="true" data-prefix="fas" data-icon="file-alt" class="svg-inline--fa fa-file-alt fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm64 236c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12v8zm0-64c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12v8zm0-72v8c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12zm96-114.1v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z"></path></svg>
                    <span>我的文章</span>
                    </router-link>
                    <div class="dropdown-divider"></div>
                    <a href="#" class="dropdown-item text-danger" data-toggle="modal" data-target="#logoutModal">
                      <svg aria-hidden="true" data-prefix="fas" data-icon="sign-out-alt" class="svg-inline--fa fa-sign-out-alt fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z"></path></svg>
                      <span>退出登录</span>
                    </a>
                  </div>
                </div>
              </div>
              <!-- Modal -->
              <div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="logoutModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-sm" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="logoutModalLabel">确认退出登录吗</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                      <div @click="logout()"><button type="button" data-dismiss="modal" class="btn btn-danger">退出</button></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </no-ssr>
        </div>
      </nav>
    </header>
</template>

<script>
import apiService from '~/services/apiService'
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
    logout() {
      apiService.post('/logout').then(response => {
        if (response.data.status == 0) {
          localStorage.delete('user')
          this.$emit('loginFresh', null)
          this.$router.push('/login')
        }
      })
    }
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
.dropdown-item {
  svg {
    height: 16px;
    width: 16px;
    margin-right: 8px;
  }
}
</style>
