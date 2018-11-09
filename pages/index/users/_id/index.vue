<template>
    <div class="row">
        <div class="col-md-3">
            <div class="d-flex bg-white border p-3">
                <div><hash-avatar :url="user.avatar" :user_id="user.id" :size=100 :alt="user.name" class="rounded-circle mr-2"></hash-avatar></div>
                <div>
                    <div>{{user.name}}</div>
                    <div>第{{user.id}}位会员</div>
                </div>
            </div>
        </div>
        <div class="col-md-9">
            <div class="border bg-white mb-4">
                <div class="border-bottom text-center p-2"><svg width="18" height="18" aria-hidden="true" data-prefix="fas" data-icon="book-open" class="svg-inline--fa fa-book-open fa-w-18 mr-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M542.22 32.05c-54.8 3.11-163.72 14.43-230.96 55.59-4.64 2.84-7.27 7.89-7.27 13.17v363.87c0 11.55 12.63 18.85 23.28 13.49 69.18-34.82 169.23-44.32 218.7-46.92 16.89-.89 30.02-14.43 30.02-30.66V62.75c.01-17.71-15.35-31.74-33.77-30.7zM264.73 87.64C197.5 46.48 88.58 35.17 33.78 32.05 15.36 31.01 0 45.04 0 62.75V400.6c0 16.24 13.13 29.78 30.02 30.66 49.49 2.6 149.59 12.11 218.77 46.95 10.62 5.35 23.21-1.94 23.21-13.46V100.63c0-5.29-2.62-10.14-7.27-12.99z"></path></svg>撰写的文章</div>
                <div class="px-4 py-2 border-bottom border-light d-flex justify-content-between" v-for="(post,index) in posts" :key=index>
                    <div><a target="_blank" :href="'/posts/' + post.id">{{post.title}}</a></div><div class="ml-2 text-muted text-desc">{{post.read_count}}阅读</div>
                </div>
            </div>
            <div class="border bg-white mb-4">
                <div class="border-bottom text-center p-2"><svg width="18" height="18" aria-hidden="true" data-prefix="fas" data-icon="book-open" class="svg-inline--fa fa-book-open fa-w-18 mr-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M542.22 32.05c-54.8 3.11-163.72 14.43-230.96 55.59-4.64 2.84-7.27 7.89-7.27 13.17v363.87c0 11.55 12.63 18.85 23.28 13.49 69.18-34.82 169.23-44.32 218.7-46.92 16.89-.89 30.02-14.43 30.02-30.66V62.75c.01-17.71-15.35-31.74-33.77-30.7zM264.73 87.64C197.5 46.48 88.58 35.17 33.78 32.05 15.36 31.01 0 45.04 0 62.75V400.6c0 16.24 13.13 29.78 30.02 30.66 49.49 2.6 149.59 12.11 218.77 46.95 10.62 5.35 23.21-1.94 23.21-13.46V100.63c0-5.29-2.62-10.14-7.27-12.99z"></path></svg>最近发表的评论</div>
                <div class="px-4 py-2 border-bottom border-light d-flex justify-content-between" v-for="(comment,index) in comments" :key=index>
                    <div>{{comment.content}}</div><div class="ml-2 text-muted text-desc"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.text-desc {
    font-size: 12px;
    line-height: 12px;
    bottom: 0;
}
</style>


<script>
import apiService from '~/services/apiService'
import HashAvatar from '~/components/hash-avatar'
import axios from 'axios'
import config from '~/config/api.js'

export default {
    components: {
        'hash-avatar': HashAvatar
    },
    data () {
        return {
            user: {},
            posts: [],
            comments: [],
        }
    },
    asyncData({ params }, callback) {
        axios // 由于服务端渲染对api错误处理与浏览器不同，所以使用原生axios，浏览器使用 apiService
            .get(config.apiUrl + '/users/' + params.id)
            .then(response => {
                callback(null, { user: response.data.data })
            })
            .catch(error => {
                console.log("error")
            })
    },
    created() {
        apiService.get('/users/' + this.$route.params.id + '/posts').then(response => {
            if (response.data.status === 0 ) {
                this.posts = response.data.data
            }
        })
        apiService.get('/users/' + this.$route.params.id + '/comments').then(response => {
            if (response.data.status === 0 ) {
                this.comments = response.data.data
            }
        })
    },
}
</script>