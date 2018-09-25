<template>
  <div>
        <div class="row">
            <div class="col-lg-9 col-12 mb-4 px-lg-3 p-0">
                <div class="card">
                    <div class="card-header">
                        <ul class="nav nav-tabs card-header-tabs">
                            <li class="nav-item">
                                <router-link class="nav-link text-muted active" :to="buildParams('/posts', {'type':'news'})" id="nav-news" aria-selected="true">最新</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link class="nav-link text-muted" to="/posts?type=hot" id="nav-hot" aria-selected="false">精华</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link class="nav-link text-muted" to="/posts?type=discuss" id="nav-discuss" aria-selected="false">回复最多</router-link>
                            </li>
                        </ul>
                    </div>
                    <div class="tab-content" id="nav-tabContent">
                        <ul class="list-group">
                          <li v-for="(post,index) in posts" :key="index" class="list-group-item list-group-item-action border-left-0 border-right-0">
                            <router-link to="/posts/1" class="d-flex justify-content-between align-items-center text-body">
                              <div><img class="rounded-circle mr-2" :src="post.user.avatar" :alt="post.user.name"><span>{{post.title}}</span></div><div>阅读数:{{post.read_count}} / 评论数:{{post.comments.length}}</div>
                            </router-link>
                          </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col p-0">
                <div class="border bg-white mb-4">
                    <div class="text-muted border-bottom text-center right-card-title">社区公告</div>
                    <div class="announcement-content p-4 text-muted">祝贺 LuaChina 社区成功上线，qq群：284519473</div>
                </div>
                <div class="border bg-white active-user mb-4">
                    <div class="text-muted border-bottom text-center right-card-title">本周活跃用户</div>
                    <div class="p-2 text-muted">
                        <ul class="list-group">
                            <li class="list-group-item border-0 d-flex justify-content-between align-items-center" v-for="(user, index) in topUsers" :key=index><div>{{user.name}}</div><span class="badge badge-pill badge-success">{{index+1}}</span></li>
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
import crypto from 'crypto'
import Identicon from 'identicon.js'
import _ from 'lodash'

export default {
  data() {
    return {
      topUsers: [
        {
          name: 'Horan'
        },
        {
          name: '诸葛亮'
        },
        {
          name: '司马懿'
        },
        {
          name: '宇文成都'
        },
        {
          name: 'Peter'
        }
      ],
      posts: [
        {
          title: 'Cras justo odio',
          read_count: 132,
          user: {
            id: 1,
            avatar: ''
          },
          comments: [{}, {}]
        },
        {
          title: 'Dapibus ac facilisis in',
          read_count: 32,
          user: {
            id: 2,
            avatar: ''
          },
          comments: [{}]
        },
        {
          title: 'Morbi leo risus',
          read_count: 98,
          user: {
            id: 3,
            avatar: ''
          },
          comments: [{}, {}]
        },
        {
          title: 'Cras justo odio',
          read_count: 132,
          user: {
            id: 4,
            avatar: ''
          },
          comments: [{}, {}]
        },
        {
          title: 'Dapibus ac facilisis in',
          read_count: 32,
          user: {
            id: 5,
            avatar: ''
          },
          comments: [{}]
        },
        {
          title: 'Morbi leo risus',
          read_count: 98,
          user: {
            id: 6,
            avatar: ''
          },
          comments: [{}, {}]
        },
        {
          title: 'Vestibulum at eros',
          read_count: 12,
          user: {
            id: 7,
            avatar: ''
          },
          comments: [{}, {}]
        },
        {
          title: 'Cras justo odio',
          read_count: 132,
          user: {
            id: 8,
            avatar: ''
          },
          comments: [{}, {}]
        },
        {
          title: 'Dapibus ac facilisis in',
          read_count: 32,
          user: {
            id: 9,
            avatar: ''
          },
          comments: [{}]
        },
        {
          title: 'Morbi leo risus',
          read_count: 98,
          user: {
            id: 10,
            avatar: ''
          },
          comments: [{}, {}]
        },
        {
          title: 'Vestibulum at eros',
          read_count: 12,
          user: {
            id: 11,
            avatar: ''
          },
          comments: [{}, {}]
        },
        {
          title: 'Cras justo odio',
          read_count: 132,
          user: {
            id: 12,
            avatar: ''
          },
          comments: [{}, {}]
        },
        {
          title: 'Dapibus ac facilisis in',
          read_count: 32,
          user: {
            id: 13,
            avatar: ''
          },
          comments: [{}]
        },
        {
          title: 'Morbi leo risus',
          read_count: 98,
          user: {
            id: 14,
            avatar: ''
          },
          comments: [{}, {}]
        },
        {
          title: 'Vestibulum at eros',
          read_count: 12,
          user: {
            id: 15,
            avatar: ''
          },
          comments: [{}, {}]
        }
      ]
    }
  },
  created() {
    this.buildAvatar()
  },
  methods: {
    buildParams(url, orignalParam) {
      return url
    },
    getPosts() {
      console.log('posts')
    },
    buildAvatar() {
      _.each(this.posts, (value, key) => {
        if (!value.user.avatar) {
          let hash = crypto.createHash('md5')
          hash.update(String(value.user.id)) // id
          let options = {
            // foreground: [0, 0, 0, 255],               // rgba black
            // background: [255, 255, 255, 255],         // rgba white
            margin: 0,                              // 20% margin
            size: 48,                                // 420px square
          }
          let base64Img = new Identicon(hash.digest('hex'), options)
          this.posts[key].user.avatar = 'data:image/png;base64,' + base64Img.toString()
        }
      })
    }
  },
  watch: {
    $route(to, from) {
      this.getPosts(this.$route.path)
      this.buildAvatar()
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
}
.announcement-content {
    font-size: 14px;
    line-height: 30px;
}
</style>
