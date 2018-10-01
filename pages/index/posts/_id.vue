<template>
  <div class="row">
    <div class="col-md-9 p-0 mr-lg-4 mr-0 mb-4">
      <div class="bg-white border p-4">
        <div class="text-center mb-4">
          <h1 class="my-4">
            {{post.title}}
          </h1>
          <div class="text-muted row mb-2 px-5">
            <div class="d-flex align-items-center artical-info col">
              <svg aria-hidden="true" data-prefix="fas" data-icon="clock" class="svg-inline--fa fa-clock fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#666" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm57.1 350.1L224.9 294c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h48c6.6 0 12 5.4 12 12v137.7l63.5 46.2c5.4 3.9 6.5 11.4 2.6 16.8l-28.2 38.8c-3.9 5.3-11.4 6.5-16.8 2.6z"></path></svg>
              <span>2018-10-01</span></div>
            <div class="d-flex align-items-center artical-info col">
              <svg v-if="!favor" aria-hidden="true" data-prefix="far" data-icon="heart" class="svg-inline--fa fa-heart fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z"></path></svg>
              <svg v-if="favor" width="18" height="18" aria-hidden="true" data-prefix="fas" data-icon="heart" class="mr-1 svg-inline--fa fa-heart fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="red" d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path></svg>
              <span>收藏数：{{post.favor_count}}</span>
            </div>
          </div>
          <div class="text-muted row pb-2 border-bottom px-5">
            <div class="d-flex align-items-center artical-info col">
              <svg aria-hidden="true" data-prefix="fas" data-icon="book-open" class="svg-inline--fa fa-book-open fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M542.22 32.05c-54.8 3.11-163.72 14.43-230.96 55.59-4.64 2.84-7.27 7.89-7.27 13.17v363.87c0 11.55 12.63 18.85 23.28 13.49 69.18-34.82 169.23-44.32 218.7-46.92 16.89-.89 30.02-14.43 30.02-30.66V62.75c.01-17.71-15.35-31.74-33.77-30.7zM264.73 87.64C197.5 46.48 88.58 35.17 33.78 32.05 15.36 31.01 0 45.04 0 62.75V400.6c0 16.24 13.13 29.78 30.02 30.66 49.49 2.6 149.59 12.11 218.77 46.95 10.62 5.35 23.21-1.94 23.21-13.46V100.63c0-5.29-2.62-10.14-7.27-12.99z"></path></svg>
              <span>阅读数：{{post.read_count}}</span>
            </div>
            <div class="d-flex align-items-center artical-info col">
              <svg aria-hidden="true" data-prefix="fas" data-icon="comments" class="svg-inline--fa fa-comments fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M416 192c0-88.4-93.1-160-208-160S0 103.6 0 192c0 34.3 14.1 65.9 38 92-13.4 30.2-35.5 54.2-35.8 54.5-2.2 2.3-2.8 5.7-1.5 8.7S4.8 352 8 352c36.6 0 66.9-12.3 88.7-25 32.2 15.7 70.3 25 111.3 25 114.9 0 208-71.6 208-160zm122 220c23.9-26 38-57.7 38-92 0-66.9-53.5-124.2-129.3-148.1.9 6.6 1.3 13.3 1.3 20.1 0 105.9-107.7 192-240 192-10.8 0-21.3-.8-31.7-1.9C207.8 439.6 281.8 480 368 480c41 0 79.1-9.2 111.3-25 21.8 12.7 52.1 25 88.7 25 3.2 0 6.1-1.9 7.3-4.8 1.3-2.9.7-6.3-1.5-8.7-.3-.3-22.4-24.2-35.8-54.5z"></path></svg>
              <span>评论数：{{post.comments.length}}</span>
            </div>
          </div>
        </div>
        <div id="viewerSection"></div>
      </div>
    </div>
    <div class="col">
      <div class="bg-white border p-4 mb-4">
        <div class="text-center text-muted border-bottom p-2">
          作者: {{post.user.name}}
        </div>
        <div class="d-flex justify-content-center my-3">
          <img width="120" height="120" :src="buildAvatar(post.user, 48)" alt="头像" class="rounded-circle">
        </div>
        <div class="d-flex justify-content-center align-items-center text-muted">
          <svg width="16" height="16" aria-hidden="true" data-prefix="fas" data-icon="map-marker-alt" class="svg-inline--fa fa-map-marker-alt fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"></path></svg> <span>{{post.user.city}}</span>
        </div>
      </div>
      <div class="bg-white">
        <div class="text-muted border-bottom text-center recommend-post">推荐文章</div>
        <ul class="list-group">
          <li v-for="(post,index) in posts" :key="index" class="list-group-item list-group-item-action">
            <router-link :to="'/posts/'+post.id" class="text-center text-body">
              <div>{{post.title}}</div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>

</template>

<script>
import crypto from 'crypto'
import Identicon from 'identicon.js'

require('tui-editor/dist/tui-editor-contents.css') // editor content
require('highlight.js/styles/github.css') // code block highlight
import apiService from '~/services/apiService'
import Mock from 'mockjs'

export default {
  name: 'PostDetail',
  data() {
    return {
      post: {
        user: {},
        title: '',
        editor: Object,
        comments: Array
      },
      favor: false,
      posts: Array
    }
  },
  mounted() {
    this.editor = require('tui-editor').factory({
      viewer: true,
      el: document.querySelector('#viewerSection'),
      previewStyle: 'vertical',
      height: '300px',
      initialValue: this.post.content
    })
  },
  created() {
    // console.log(this.posts)
  },
  asyncData({ params }, callback) {
    apiService
      .get('/mockjsdata/31154/posts', 'http://rapapi.org')
      .then(response => {
        return Mock.mock(response.data)
      })
      .then(postsResponse => {
        apiService
          .get('/mockjsdata/31154/posts/1', 'http://rapapi.org')
          .then(response => {
            return Mock.mock(response.data)
          })
          .then(postResponse => {
            callback(null, {
              post: postResponse.data.post,
              posts: postsResponse.data.data
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
  svg {
    width: 16px;
    height: 16px;
    margin-right: 4px;
  }
}
</style>
