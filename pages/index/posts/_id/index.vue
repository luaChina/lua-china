<template>
  <div class="row">
    <div class="col-md-9 p-0 mr-lg-4 mr-0 mb-5">
      <div class="bg-white border p-4">
        <div class="mb-4">
          <h1 class="my-4 artical-title">{{post.title}}</h1>
          <div class="text-muted border-bottom mb-5 pb-2 d-flex">
            <div class="d-flex align-items-center artical-info">
              <span v-text="post.updated_at"></span></div>
            <div class="d-flex align-items-center artical-info">
              <span>收藏数：{{post.favor_count}}</span>
            </div>
            <div class="d-flex align-items-center artical-info">
              <span>阅读数：{{post.read_count}}</span>
            </div>
            <div class="d-flex align-items-center artical-info">
              <span>评论数：{{post.comments.length || 0}}</span>
            </div>
            <no-ssr>
              <div v-if="this.post.user_id === this.auth.id" class="ml-auto">
                <router-link class="btn btn-sm btn-primary pull-right mr-2" :to='"/posts/" + post.id + "/edit"'>编辑</router-link>
                <button class="btn btn-sm btn-danger pull-right" @click="moveToDraft(post.id)">移入草稿箱</button></div>
            </no-ssr>
          </div>
        </div>
        <div class="markdown-preview" v-html="compiledMarkdown"></div>
      </div>
        <div class="d-flex justify-content-center mb-5" style="height:100px">
          <no-ssr>
            <vue-star animate="animated rotateInDownLeft" color="#F05654">
              <a slot="icon" class="btn btn-outline-secondary d-flex align-items-center justify-content-between" @click="favorClick">
                  <span class="mr-2">点赞</span>
                  <svg width="20" height="20" aria-hidden="true" data-prefix="fas" data-icon="thumbs-up" class="svg-inline--fa fa-thumbs-up fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M104 224H24c-13.255 0-24 10.745-24 24v240c0 13.255 10.745 24 24 24h80c13.255 0 24-10.745 24-24V248c0-13.255-10.745-24-24-24zM64 472c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24zM384 81.452c0 42.416-25.97 66.208-33.277 94.548h101.723c33.397 0 59.397 27.746 59.553 58.098.084 17.938-7.546 37.249-19.439 49.197l-.11.11c9.836 23.337 8.237 56.037-9.308 79.469 8.681 25.895-.069 57.704-16.382 74.757 4.298 17.598 2.244 32.575-6.148 44.632C440.202 511.587 389.616 512 346.839 512l-2.845-.001c-48.287-.017-87.806-17.598-119.56-31.725-15.957-7.099-36.821-15.887-52.651-16.178-6.54-.12-11.783-5.457-11.783-11.998v-213.77c0-3.2 1.282-6.271 3.558-8.521 39.614-39.144 56.648-80.587 89.117-113.111 14.804-14.832 20.188-37.236 25.393-58.902C282.515 39.293 291.817 0 312 0c24 0 72 8 72 81.452z"></path></svg>
              </a>
            </vue-star>
          </no-ssr>
        </div>
      <!-- 评论区 -->
      <div>
        <div class="d-flex mb-4" v-for="(comment, index) in post.comments" :key="index">
          <div class="avatar mr-3">
            <hash-avatar :url="comment.user.avatar" :user_id="comment.user.id" :size=50 :alt="comment.user.name" class="border shadow"></hash-avatar>
          </div>
          <div class="bg-white border shadow w-100">
            <div class="border-bottom p-2 font-weight-bold">{{comment.user.name}}</div>
            <div class="p-3">{{comment.content}}</div>
            <div class="p-3 text-muted">{{comment.created_at}}</div>
          </div>
        </div>
      </div>
      <!-- 发表评论 -->
      <div class="mt-4 p-3 bg-white border border-light">
        <div class="alert alert-info" role="alert">
            子曰：三缄其口，诚能慎之，福之根也；口是何伤？祸之门也。
        </div>
        <div class="form-group">
          <textarea name="comment" class="w-100 form-control" cols="30" rows="10" v-model="commentContent"></textarea>
        </div>
        <button class="btn btn-primary" @click.prevent="publishComment">发表评论</button>
      </div>
    </div>
    <div class="col">
      <div class="bg-white border p-4 mb-4">
        <div class="text-center text-muted border-bottom p-2">
          作者: {{post.user.name}}
        </div>
        <div class="d-flex justify-content-center my-3">
          <router-link :to="'/users/' + this.post.user_id">
            <hash-avatar :url="post.user.avatar" :user_id="post.user.id" :size=120 :alt="post.user.name"
                         class="rounded-circle"></hash-avatar>
          </router-link>
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
import apiService from '~/services/apiService'
import syncApiService from '~/services/syncApiService'
import HashAvatar from '~/components/hash-avatar'
import config from '~/config/api.js'
import localStorage from '~/utils/localStorage'
const marked = require('marked')

export default {
  name: 'PostDetail',
  props: ['auth'],
  components: {
    'hash-avatar': HashAvatar
  },
  data() {
    return {
      post: {
        user: {},
        title: null,
        content: '',
        editor: {},
        comments: [],
      },
      favor: false,
      posts: [],
      commentContent: null,
      owner: false
    }
  },
  head() {
    return {
      title: this.post.title + ' | Lua China - Lua 中国开发者社区'
    }
  },
  computed: {
    compiledMarkdown: function () {
        return marked(this.post.content, {
                gfm: true,
                tables: true,
                breaks: false,
                pedantic: false,
                sanitize: true,
                highlight: (code) => {
                  return require('highlight.js').highlightAuto(code).value;
                }
              })
    }
  },
  async asyncData({params, error}) {
    //推荐文章
    let posts = await syncApiService.get(config.apiUrl + '/posts/')
            .then(posts => {
                return posts.data.data.data;
            }).catch(err => {
                return error({statusCode: 500, message: '服务器挂了！赶快联系站长，13571899655@163.com'})
            });
    //当前文章
    let post = await syncApiService.get(config.apiUrl + '/posts/' + params.id)
            .then(res => {
                if (res.data.status !== 0) {
                  return error({statusCode: 404, message: '文章不存在或已删除'});
                }
                return res.data.data;
            }).catch(err => {
                return error({statusCode: 500, message: '服务器挂了！赶快联系站长，13571899655@163.com'})
            });
    return {
      post: post,
      posts: posts
    };
  },
  methods: {
    favorClick() {
      apiService.post('/posts/' + this.post.id + '/favor').then(response => {
        if (response.data.status !== 0) {
          this.$notify({
            type: 'error',
            group: 'tip',
            duration: 2000,
            title: response.data.msg,
          })
        }
      })
    },
    publishComment() {
      if (!this.commentContent) {
        this.$notify({
          type: 'error',
          group: 'tip',
          duration: 2000,
          title: '评论内容不能为空',
        });
        return
      }
      apiService.post('/posts/' + this.post.id + '/comments', {content: this.commentContent}).then(response => {
        if (response.data.status !== 0) {
          this.$notify({
            type: 'error',
            group: 'tip',
            duration: 2000,
            title: response.data.msg,
          });
          return
        }
        this.$notify({
          type: 'success',
          group: 'tip',
          duration: 2000,
          title: '发布成功',
        });
        let comment = {
          content: this.commentContent,
          user: localStorage.get('user')
        };
        this.post.comments.push(comment);
      })
    },
    moveToDraft(post_id) {
      apiService.delete('/posts/' + this.post.id).then(response => {
        if (response.data.status !== 0) {
          this.$notify({
            type: 'error',
            group: 'tip',
            duration: 2000,
            title: response.data.msg,
          })
        } else {
          this.$notify({
            type: 'success',
            group: 'tip',
            duration: 2000,
            title: '已移入草稿箱，可到个人中心查看',
          })
          this.$router.push('/users/' + this.auth.id)
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.recommend-post {
  background-color: #eee;
  line-height: 30px;
}
.artical-title {
  font-size: 1.6rem;
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
.VueStar {
  color: #999;
}
</style>
