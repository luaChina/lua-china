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
                          <router-link to="/posts/1" class="d-flex justify-content-between align-items-center text-body list-content">
                            <div>
                              <img class="rounded-circle mr-2" :src="buildAvatar(post.user, 48)" :alt="post.user.name"><span>{{post.title}}</span>
                            </div>
                            <div>阅读数:{{post.read_count}} / 评论数:{{post.comments.length}}</div>
                          </router-link>
                        </li>
                      </ul>
                  </div>
              </div>
          </div>
          <div class="col p-0">
              <div class="border bg-white mb-4">
                  <div class="text-muted border-bottom text-center right-card-title">社区公告</div>
                  <div class="announcement-content p-4 text-muted">祝贺 LuaChina 社区成功上线，欢迎加入 qq 群：284519473</div>
              </div>
              <div class="border bg-white active-user mb-4">
                  <div class="text-muted border-bottom text-center right-card-title">本周活跃用户</div>
                  <div class="p-2 text-muted">
                      <ul class="list-group">
                          <li class="list-group-item border-0 d-flex align-items-center justify-content-between" v-for="(user, index) in topUsers" :key=index><div><img class="rounded-circle mr-2" :src="buildAvatar(user, 32)" :alt="user.name"><span>{{user.name}}</span></div><span class="badge badge-pill badge-success">{{index+1}}</span></li>
                      </ul>
                  </div>
              </div>
              <div class="bg-white border advertising">
                  <div class="text-muted border-bottom text-center right-card-title">广告位</div>
                  <div><img class="img-fluid" src="~/assets/images/lua-logo.jpg" alt="adv"></div>
                  <div class="announcement-content p-4 text-muted">祝贺 LuaChina 社区成功上线，qq群：284519473</div>
              </div>
          </div>
        </div>
    </div>
</template>

<script>
import apiService from '~/services/apiService'
import crypto from 'crypto'
import Identicon from 'identicon.js'
import _ from 'lodash'
import Mock from 'mockjs'

export default {
  data() {
    return {
      topUsers: [
        {
          id: 1,
          name: 'Horan'
        },
        {
          id: 2,
          name: '诸葛亮'
        },
        {
          id: 3,
          name: '司马懿'
        },
        {
          id: 4,
          name: '宇文成都'
        },
        {
          id: 5,
          name: 'Peter'
        }
      ],
      posts: []
    }
  },
  created() {
    // apiService.get('').then(response => {

    // })
  },
  asyncData({ params }, callback) {
    apiService.get('/mockjsdata/31154/posts', 'http://rapapi.org').then((response) => {
        return Mock.mock(response.data)
      }).then(response => {
        callback(null, { posts: response.data.data })
      }).catch(error => {
        console.log(error)
      })
  },
  methods: {
    buildParams(url, orignalParam) {
      return url
    },
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
    getPosts() {
      apiService.get('/mockjsdata/31154/posts', 'http://rapapi.org').then((response) => {
        return Mock.mock(response.data)
      }).then(response => {
        this.posts = response.data.data
      }).catch(error => {
        console.log(error)
      })
    }
  },
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
}
.announcement-content {
    font-size: 14px;
    line-height: 30px;
}
.list-content {
  text-decoration: none !important;
}
</style>
