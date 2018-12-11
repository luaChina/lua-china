<template>
  <div>
      <div class="row">
          <div class="col-lg-9 col-12 mb-4 px-lg-3 p-0">
              <div class="card">
                  <div class="card-header">
                      <ul class="nav nav-tabs card-header-tabs">
                          <li class="nav-item">
                              <a href="#" class="nav-link text-muted active" data-toggle="tab" @click="getPosts('news')" id="nav-news" aria-selected="true">最新</a>
                          </li>
                          <li class="nav-item">
                              <a href="#" class="nav-link text-muted" data-toggle="tab" @click="getPosts('hot')" id="nav-hot" aria-selected="false">精华</a>
                          </li>
                           <li class="nav-item">
                              <a href="#" class="nav-link text-muted" data-toggle="tab" @click="getPosts('discuss')" id="nav-discuss" aria-selected="false">回复最多</a>
                          </li>
                      </ul>
                  </div>
                  <div class="tab-content" id="nav-tabContent">
                      <ul class="list-group">
                        <li v-for="(post,index) in posts" :key="index" class="list-group-item list-group-item-action border-left-0 border-right-0">
                          <router-link :to="'/posts/' + post.id" class="d-flex justify-content-between align-items-center text-body list-content">
                            <div>
                              <hash-avatar :url="post.user.avatar" :user_id="post.user.id" :size=48 :alt="post.user.name" class="rounded-circle mr-2"></hash-avatar>
                              <span>{{post.title}}</span>
                            </div>
                            <div>阅读数:{{post.read_count}} 
                              <!-- / 评论数:{{post.comments.length}} -->
                              </div>
                          </router-link>
                        </li>
                      </ul>
                  </div>
              </div>
          </div>
          <div class="col p-0">
              <div class="border bg-white mb-4">
                  <div class="text-muted border-bottom right-card-title d-flex align-items-center justify-content-center">
                    <svg aria-hidden="true" data-prefix="fas" data-icon="bullhorn" class="svg-inline--fa fa-bullhorn fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#444" d="M576 240c0-23.63-12.95-44.04-32-55.12V32.01C544 23.26 537.02 0 512 0c-7.12 0-14.19 2.38-19.98 7.02l-85.03 68.03C364.28 109.19 310.66 128 256 128H64c-35.35 0-64 28.65-64 64v96c0 35.35 28.65 64 64 64h33.7c-1.39 10.48-2.18 21.14-2.18 32 0 39.77 9.26 77.35 25.56 110.94 5.19 10.69 16.52 17.06 28.4 17.06h74.28c26.05 0 41.69-29.84 25.9-50.56-16.4-21.52-26.15-48.36-26.15-77.44 0-11.11 1.62-21.79 4.41-32H256c54.66 0 108.28 18.81 150.98 52.95l85.03 68.03a32.023 32.023 0 0 0 19.98 7.02c24.92 0 32-22.78 32-32V295.13C563.05 284.04 576 263.63 576 240zm-96 141.42l-33.05-26.44C392.95 311.78 325.12 288 256 288v-96c69.12 0 136.95-23.78 190.95-66.98L480 98.58v282.84z"></path></svg>
                    <span>社区公告</span>
                  </div>
                  <div class="announcement-content p-4 text-muted">祝贺 LuaChina 社区成功上线，欢迎加入 qq 群：284519473</div>
              </div>
              <div class="border bg-white active-user mb-4">
                  <div class="text-muted border-bottom right-card-title d-flex align-items-center justify-content-center">
                    <svg aria-hidden="true" data-prefix="fas" data-icon="fire" class="svg-inline--fa fa-fire fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="red" d="M216 23.858c0-23.802-30.653-32.765-44.149-13.038C48 191.851 224 200 224 288c0 35.629-29.114 64.458-64.85 63.994C123.98 351.538 96 322.22 96 287.046v-85.51c0-21.703-26.471-32.225-41.432-16.504C27.801 213.158 0 261.332 0 320c0 105.869 86.131 192 192 192s192-86.131 192-192c0-170.29-168-193.003-168-296.142z"></path></svg>
                    <span>本周活跃用户</span>
                  </div>
                  <div class="p-2 text-muted">
                      <ul class="list-group">
                          <li class="list-group-item border-0 d-flex align-items-center justify-content-between" v-for="(user, index) in topUsers" :key=index>
                            <div>
                              <hash-avatar :url="user.avatar" :user_id="user.id" :size=32 :alt="user.name" class="rounded-circle mr-2"></hash-avatar>
                              <router-link class="font-red" :to="'/users/' + user.id">{{user.name}}</router-link>
                            </div>
                            <span class="badge badge-pill badge-success">{{index+1}}</span>
                          </li>
                      </ul>
                  </div>
              </div>
              <div class="bg-white border advertising">
                  <div class="text-muted border-bottom text-center right-card-title">Lua社区</div>
                  <div><img class="img-fluid" src="~/assets/images/lua-logo.jpg" alt="adv"></div>
                  <div class="announcement-content p-4 text-muted">祝贺 LuaChina 社区成功上线，扫描下方二维码加微信群</div>
              </div>
              <div class="mt-2 text-center"><img class="img-fluid" src="https://lua-china.oss-cn-beijing.aliyuncs.com/wechat-group-100x100.jpeg" alt="adv"></div>
          </div>
        </div>
    </div>
</template>

<script>
import apiService from '~/services/apiService'
import HashAvatar from '~/components/hash-avatar'
import axios from 'axios'
import config from '~/config/api.js'

export default {
  components: {
    'hash-avatar': HashAvatar
  },
  data() {
    return {
      topUsers: [],
      posts: []
    }
  },
  created() {
    apiService.get('/users/top').then(response => {
      this.topUsers = response.data.data
    })
  },
  asyncData({ params,error }, callback) {
    axios
      .get(config.apiUrl + '/posts')
      .then(response => {
        callback(null, { posts: response.data.data.data })
      })
      .catch(err => {
        callback()
        error({ statusCode: 500, message: '服务器挂了！赶快联系站长，13571899655@163.com' })
        console.log("async error")
      })
  },
  methods: {
    buildParams(url, orignalParam) {
      return url
    },
    getPosts() {
      apiService
        .get('/posts')
        .then(response => {
          this.posts = response.data.data.data
        })
        .catch(error => {
          this.$notify({
            type: 'error',
            group: 'tip',
            duration: 2000,
            title: error
          })
          return false
        })
    }
  }
}
</script>

<style lang="scss">
.list-group-item:first-child {
  border-top: 0;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.list-group-item:last-child {
  border-bottom: 0;
}
.right-card-title {
  background-color: #eee;
  line-height: 30px;
  svg {
    height: 18px;
    width: 18px;
    margin-right: 4px;
  }
}
.announcement-content {
  font-size: 14px;
  line-height: 30px;
}
.list-content {
  text-decoration: none !important;
}
</style>
