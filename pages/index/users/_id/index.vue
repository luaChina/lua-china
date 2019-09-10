<template>
    <div class="row">
        <div class="col-md-3">
            <div class="bg-white border px-3">
                <div class="d-flex py-3">
                    <div>
                        <hash-avatar :url="user.avatar" :user_id="user.id" :size=100 :alt="user.name" class="rounded-circle mr-2"></hash-avatar>
                    </div>
                    <div>
                        <div class="username">{{user.name}}</div>
                        <div>第{{user.id}}位会员</div>
                    </div>
                </div>
                <div class="border-top py-3 d-flex justify-content-between text-center">
                    <div>
                        <div class="user-info">{{posts.length || 0}}</div>
                        <div class="text-muted">文章</div>
                    </div>
                    <div>
                        <div class="user-info">{{comments.length || 0}}</div>
                        <div class="text-muted">评论</div>
                    </div>
                    <div>
                        <div class="user-info">0</div>
                        <div class="text-muted">关注者</div>
                    </div>
                </div>
            </div>
            <!-- <div v-if="auth.id" class="mt-2 bg-white border text-center p-3">
                <div class="border-bottom"><a >我的草稿箱</a></div>
            </div> -->
        </div>
        <div class="col-md-9">
            <div class="border bg-white mb-4">
                <div class="border-bottom text-center p-2 font-red"><svg width="18" height="18" aria-hidden="true" data-prefix="fas" data-icon="book-open" class="svg-inline--fa fa-book-open fa-w-18 mr-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M542.22 32.05c-54.8 3.11-163.72 14.43-230.96 55.59-4.64 2.84-7.27 7.89-7.27 13.17v363.87c0 11.55 12.63 18.85 23.28 13.49 69.18-34.82 169.23-44.32 218.7-46.92 16.89-.89 30.02-14.43 30.02-30.66V62.75c.01-17.71-15.35-31.74-33.77-30.7zM264.73 87.64C197.5 46.48 88.58 35.17 33.78 32.05 15.36 31.01 0 45.04 0 62.75V400.6c0 16.24 13.13 29.78 30.02 30.66 49.49 2.6 149.59 12.11 218.77 46.95 10.62 5.35 23.21-1.94 23.21-13.46V100.63c0-5.29-2.62-10.14-7.27-12.99z"></path></svg>撰写的文章</div>
                <div class="px-2 py-2 border-bottom border-light d-flex justify-content-between" v-for="(post,index) in posts" :key=index>
                    <div class="col-md-11"><a class="text-muted" target="_blank" :href="'/posts/' + post.id"><div>{{post.title}}</div></a></div>
                    <div class="col-md-1 text-muted text-desc p-0 items-align-bottom align-self-center text-right">{{post.read_count}} 阅读</div>
                </div>
            </div>
            <div class="border bg-white mb-4">
                <div class="border-bottom text-center p-2 font-red"><svg height="18" width="18" aria-hidden="true" data-prefix="fas" data-icon="comment-dots" class="mr-2 svg-inline--fa fa-comment-dots fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 32C114.6 32 0 125.1 0 240c0 49.6 21.4 95 57 130.7C44.5 421.1 2.7 466 2.2 466.5c-2.2 2.3-2.8 5.7-1.5 8.7S4.8 480 8 480c66.3 0 116-31.8 140.6-51.4 32.7 12.3 69 19.4 107.4 19.4 141.4 0 256-93.1 256-208S397.4 32 256 32zM128 272c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm128 0c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm128 0c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"></path></svg>最近发表的评论</div>
                <div class="px-4 py-2 border-bottom border-light" v-for="(comment,index) in comments" :key=index>
                    <div class="row">
                        <div class="col-md-8"><a class="text-secondary comment-post-title" :href="'/posts/' + comment.post.id">{{comment.post.title}}</a></div>
                        <div class="col-md-4 text-muted comment-time align-self-center text-right">发布于 {{comment.updated_at}}</div>
                    </div>
                    <div class="d-flex justify-content-between">{{comment.content}}</div><div class="ml-2 text-muted text-desc"></div>
                </div>
            </div>
            <no-ssr>
                <div v-if="auth.id == $route.params.id" class="border bg-white mb-4">
                    <div class="border-bottom text-center p-2 font-red"><svg height="18" width="18" aria-hidden="true" data-prefix="fas" data-icon="box-open" class="mr-2 svg-inline--fa fa-box-open fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M53.2 41L1.7 143.8c-4.6 9.2.3 20.2 10.1 23l197.9 56.5c7.1 2 14.7-1 18.5-7.3L320 64 69.8 32.1c-6.9-.8-13.5 2.7-16.6 8.9zm585.1 102.8L586.8 41c-3.1-6.2-9.8-9.8-16.7-8.9L320 64l91.7 152.1c3.8 6.3 11.4 9.3 18.5 7.3l197.9-56.5c9.9-2.9 14.7-13.9 10.2-23.1zM425.7 256c-16.9 0-32.8-9-41.4-23.4L320 126l-64.2 106.6c-8.7 14.5-24.6 23.5-41.5 23.5-4.5 0-9-.6-13.3-1.9L64 215v178c0 14.7 10 27.5 24.2 31l216.2 54.1c10.2 2.5 20.9 2.5 31 0L551.8 424c14.2-3.6 24.2-16.4 24.2-31V215l-137 39.1c-4.3 1.3-8.8 1.9-13.3 1.9z"></path></svg>我的草稿箱</div>
                    <div class="px-2 py-2 border-bottom border-light d-flex justify-content-between" v-for="(draft,index) in drafts" :key=index>
                        <div class="col-md-10">
                            <span class="text-muted">{{draft.title}}</span>
                        </div>
                        <div class="col-md-2 text-right">
                            <a class="btn btn-sm btn-primary mr-1" target="_blank" :href="'/posts/' + draft.id + '/edit'">编辑</a>
                            <!-- <button class="btn btn-sm btn-danger" @click="deleteDraft(draft.id)">删除</button> -->
                        </div>
                    </div>
                </div>
            </no-ssr>
        </div>
    </div>
</template>

<style>
.username {
    font-size: 1.2em;
    font-weight: bold;
}
.user-info {
    font-size: 1.2em;
}
.text-desc {
    font-size: 12px;
    line-height: 12px;
    bottom: 0;
}
.comment-post-title {
    font-size: 0.8em;
}
.comment-time {
    font-size: 0.7em;
}
</style>

<script>
import apiService from '~/services/apiService'
import HashAvatar from '~/components/hash-avatar'
import axios from 'axios'
import config from '~/config/api.js'

export default {
    props: ['auth'],
    components: {
        'hash-avatar': HashAvatar
    },
    data () {
        return {
            user: {},
            posts: [],
            comments: [],
            drafts: [],
            globalAuth: this.auth
        }
    },
    asyncData({params, error}) {
        return axios.get(config.apiUrl + '/users/' + params.id)
            .then((res) => {
                if (res.data.status === 0x010009) {
                    error({statusCode: 404, message: '你找到这个人在地球上没有'})
                } else {
                    return {user: res.data.data};
                }
            }).catch(err => {
                error({statusCode: 500, message: '服务器挂了！赶快联系站长，13571899655@163.com'})
            })
    },
    created() {
        //刷新页面后父组件props [auth]被初始化，需重新赋值
        this.getAuth();
        apiService.get('/users/' + this.$route.params.id + '/posts').then(response => {
            this.posts = response.data.data
        });
        apiService.get('/users/' + this.$route.params.id + '/comments').then(response => {
            this.comments = response.data.data
        });
    },
    methods: {
        deleteDraft(draftId) {
            console.log(draftId)
        },
        getDraft() {
            if (this.globalAuth.id === Number(this.$route.params.id)) {
                apiService.get('/posts/drafts').then(response => {
                    this.drafts = response.data.data
                })
            }
        },
        getAuth() {
            if (!this.globalAuth.name) {
                apiService.get('/userinfo').then(response => {
                    this.globalAuth = response.data.data;
                    this.getDraft();
                })
            } else {
                this.getDraft();
            }
        }
    }
}
</script>