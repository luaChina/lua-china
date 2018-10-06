<template>
  <div class="row">
    <div class="col-md-9 p-0 mr-lg-4 mr-0 mb-4">
      <div class="bg-white border p-4">
        <div class="mb-4">
          <h1 class="my-4">{{post.title}}</h1>
          <div class="text-muted border-bottom mb-5 pb-2 d-flex">
            <div class="d-flex align-items-center artical-info">
              <span v-text="timeFormat(post.updated_at)"></span></div>
            <div class="d-flex align-items-center artical-info">
              <span>收藏数：{{post.favor_count}}</span>
            </div>
            <div class="d-flex align-items-center artical-info">
              <span>阅读数：{{post.read_count}}</span>
            </div>
            <div class="d-flex align-items-center artical-info">
              <span>评论数：{{post.comments.length || 0}}</span>
            </div>
          </div>
        </div>
        <div id="markdownSection"></div>
      </div>
    </div>
    <div class="col">
      <div class="bg-white border p-4 mb-4">
        <div class="text-center text-muted border-bottom p-2">
          作者: {{post.user.name}}
        </div>
        <div class="d-flex justify-content-center my-3">
          <img width="120" height="120" :src="buildAvatar(post.user, 120)" alt="头像" class="rounded-circle">
        </div>
        <div class="d-flex justify-content-center align-items-center text-muted" v-if="post.user.city">
          <svg width="16" height="16" aria-hidden="true" data-prefix="fas" data-icon="map-marker-alt" class="svg-inline--fa fa-map-marker-alt fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"></path></svg> <span>{{post.user.city}}</span>
        </div>
      </div>
      <div class="bg-white">
        <div class="text-muted border text-center recommend-post">推荐文章</div>
        <ul class="list-group">
          <li v-for="(item,index) in posts" :key="index" class="list-group-item list-group-item-action">
            <router-link :to="'/posts/'+item.id" class="text-center text-body">{{item.title}}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import crypto from 'crypto'
import Identicon from 'identicon.js'

// require('tui-editor/dist/tui-editor-contents.css') // editor content
require('highlight.js/styles/monokai.css'); // code block highlight

import apiService from '~/services/apiService'

export default {
  name: 'PostDetail',
  data() {
    return {
      post: {
        user: {},
        title: null,
        content: null,
        editor: Object,
        comments: Array
      },
      favor: false,
      posts: Array
    }
  },
  mounted() {
    require('tui-editor').factory({
      viewer: true,
      el: document.querySelector('#markdownSection'),
      height: '300px',
      initialValue: this.post.content,
      usageStatistics: false,
    })
  },
  created() {
  },
  asyncData({ params, error }, callback) {
    apiService
      .get('/posts/')
      .then(postsResponse => {
        apiService
          .get('/posts/' + params.id)
          .then(postResponse => {
            if (postResponse.data.status !== 0) {
              error({ statusCode: 404, message: '文章不存在或已删除' })
            }
            callback(null, {
              post: postResponse.data.data,
              posts: postsResponse.data.data.data
            })
          })
          .catch(error => {
            console.log(error)
          })
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    buildAvatar(user, size) {
      if (!user.avatar) {
        let hash = crypto.createHash('md5')
        hash.update(String(user.id)) // id
        let options = {
          // foreground: [0, 0, 0, 255],               // rgba black
          // background: [255, 255, 255, 255],         // rgba white
          margin: 0, // 0.2 20% margin
          size: size
        }
        let base64Img = new Identicon(hash.digest('hex'), options)
        return 'data:image/png;base64,' + base64Img.toString()
      } else {
        return user.avatar
      }
    },
    timeFormat(time) {
      const date = new Date(time)
      return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDay() + ' ' + date.getHours() + ':' + date.getMinutes()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.tui-editor-contents {
  font-size: 15px;
}
.recommend-post {
  background-color: #eee;
  line-height: 30px;
}
.artical-info {
  font-size: 12px;
  margin-right: 8px;
  svg {
    width: 16px;
    height: 16px;
    margin-right: 4px;
  }
}
</style>
