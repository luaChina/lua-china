<template>
    <div class="row">
        <div class="col-md-9 mr-lg-4 mr-0 mb-5">
            <div class="bg-white border p-4">
                <div class="mb-2">
                    <h1 class="my-4 article-title">{{ post.title }}</h1>
                    <div class="text-muted border-bottom mb-4 pb-4 d-flex">
                        <div>
                            <div class="d-flex align-items-center article-info articleTime">
                                <span>{{displayTime}}</span>
                            </div>
                        </div>
                        <div class="d-flex">
                            <div class="d-flex align-items-center article-info">
                                <span>收藏：{{ post.favor_count }}</span>
                            </div>
                            <div class="d-flex align-items-center article-info">
                                <span>阅读：{{ post.read_count }}</span>
                            </div>
                            <div class="d-flex align-items-center article-info">
                                <span>评论：{{ post.comments.length || 0 }}</span>
                            </div>
                        </div>
                    </div>
                    <client-only>
                        <div
                            v-if="this.post.user_id === this.auth.id"
                            class="ml-auto"
                        >
                            <router-link
                                class="btn btn-sm btn-primary me-2"
                                :to="'/posts/' + post.id + '/edit'"
                                rel="nofollow"
                                >编辑</router-link
                            >
                            <button
                                class="btn btn-sm btn-danger pull-right"
                                @click="moveToDraft(post.id)"
                                rel="nofollow"
                            >
                                移入草稿箱
                            </button>
                        </div>
                    </client-only>
                </div>
                <div class="markdown-preview" v-html="compiledMarkdown"></div>
                <div v-if="this.post.stackoverflow" class="border-top pt-4 mt-4"><p class="stackoverflow">原文链接 https://stackoverflow.com/questions/{{this.post.stackoverflow.id}}</p></div>
            </div>
            <div class="d-flex justify-content-center mb-5 mt-3">
                <div class="card text-dark bg-light mb-3" style="width: 100px">
                    <div class="card-header text-center">点赞</div>
                    <div
                        class="card-body d-flex justify-content-center align-items-center"
                    >
                        <client-only>
                            <vue-star
                                animate="animated rubberBand"
                                color="#F05654"
                            >
                                <i
                                    class="bi bi-hand-thumbs-up-fill"
                                    slot="icon"
                                    type="button"
                                    @click="favorClick"
                                ></i>
                            </vue-star>
                        </client-only>
                    </div>
                </div>
            </div>
            <!-- 评论区 -->
            <div>
                <div
                    class="d-flex mb-4"
                    v-for="(comment, index) in post.comments"
                    :key="index"
                >
                    <div class="avatar">
                        <hash-avatar
                            :url="comment.user.avatar"
                            :user_id="comment.user.id"
                            :size="40"
                            :alt="comment.user.name"
                            class="border shadow rounded-circle me-2"
                        ></hash-avatar>
                    </div>
                    <div class="bg-white border shadow w-100 comment-box">
                        <div class="border-bottom p-2 fw-bold">
                            {{ comment.user.name }}
                        </div>
                        <div
                            class="p-3 comment-md text-break markdown-preview"
                            v-html="comment.contentMd"
                        ></div>
                        <div class="p-3 text-muted">
                            {{ comment.created_at }}
                        </div>
                    </div>
                </div>
            </div>
            <!-- 发表评论 -->
            <div class="mt-4 p-3 bg-white border border-light">
                <div class="alert alert-info" role="alert">
                    评论区的留言会收到邮件通知哦~
                </div>
                <div class="form-group">
                    <textarea
                        name="comment"
                        class="w-100 form-control"
                        cols="30"
                        rows="10"
                        v-model="commentContent"
                    ></textarea>
                </div>
                <button
                    class="btn btn-primary mt-3"
                    @click.prevent="publishComment"
                    :disabled="isSubmitting"
                >
                    发表评论
                </button>
            </div>
        </div>
        <!-- 右侧栏 -->
        <div class="col">
            <div class="bg-white border p-4 mb-4">
                <div class="d-flex justify-content-center align-items-center text-center border-bottom p-2">
                    <p class="m-0">作者:</p><p class="m-0 mx-2 fw-bolder">{{ post.user.name }}</p>
                </div>
                <div class="d-flex justify-content-center my-3">
                    <router-link :to="'/users/' + this.post.user_id">
                        <hash-avatar
                            :url="post.user.avatar"
                            :user_id="post.user.id"
                            :size="120"
                            :alt="post.user.name"
                            class="rounded-circle"
                        ></hash-avatar>
                    </router-link>
                </div>
                <div
                    class="d-flex justify-content-center align-items-center text-muted"
                    v-if="post.user.city"
                >
                    <svg
                        width="16"
                        height="16"
                        aria-hidden="true"
                        data-prefix="fas"
                        data-icon="map-marker-alt"
                        class="svg-inline--fa fa-map-marker-alt fa-w-12"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                    >
                        <path
                            fill="currentColor"
                            d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"
                        ></path>
                    </svg>
                    <span>{{ post.user.city }}</span>
                </div>
            </div>
            <div class="bg-white">
                <div class="text-muted border text-center recommend-post">
                    推荐文章
                </div>
                <ul class="list-group">
                    <li
                        v-for="(item, index) in posts"
                        :key="index"
                        class="list-group-item list-group-item-action"
                    >
                        <router-link
                            :to="'/posts/' + item.id"
                            class="text-center text-body text-decoration-none"
                            >{{ item.title }}</router-link
                        >
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import apiService from "~/services/apiService";
import HashAvatar from "~/components/hash-avatar";
import config from "~/config/api.js";
import localStorage from "~/utils/localStorage";
import { authInfo } from "~/utils/helper";
const marked = require("marked");
import mediumZoom from "medium-zoom";

export default {
    name: "PostDetail",
    components: {
        "hash-avatar": HashAvatar
    },
    data() {
        return {
            post: {
                user: {},
                title: null,
                content: "",
                editor: {},
                comments: [],
                updated_at: null,
                stackoverflow: null,
            },
            favor: false,
            posts: [],
            commentContent: null,
            owner: false,
            isSubmitting: false,
            auth: { id: 0 },
        };
    },
    mounted() {
        mediumZoom(document.querySelectorAll(".markdown-preview p > img"));
        if (authInfo()) {
            this.auth = authInfo();
        }
    },
    head() {
        return {
            title: this.post.title + " | Lua China - Lua 中国开发者社区"
        };
    },
    computed: {
        displayTime: function() {
            let date = new Date(this.post.updated_at)
            var minute = 1000 * 60;
            var hour = minute * 60;
            var day = hour * 24;
            var month = day * 30;
            var now = new Date().getTime();
            var diffValue = now - date.getTime();
            if(diffValue < 0){return;}
            var monthC =diffValue/month;
            var weekC =diffValue/(7*day);
            var dayC =diffValue/day;
            var hourC =diffValue/hour;
            var minC =diffValue/minute;

            if(monthC >= 1) {
                console.log(date)
                return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
            } else if(weekC>=1){
                return "" + parseInt(weekC) + "周前";
            } else if(dayC>=1){
                return ""+ parseInt(dayC) +"天前";
            } else if(hourC>=1){
                return ""+ parseInt(hourC) +"小时前";
            } else if(minC>=1){
                return ""+ parseInt(minC) +"分钟前";
            } else {
                return "刚刚";
            }
        },
        compiledMarkdown: function() {
            return marked(this.post.content, {
                highlight: code => {
                    return require("highlight.js").highlightAuto(code, [
                        "lua",
                        "html",
                        "xml",
                        "yml",
                        "bash",
                        "cpp",
                        "json",
                        "nginx",
                        "shell",
                        "dockerfile"
                    ]).value;
                }
            });
        }
    },
    async asyncData({ params, error }) {
        let apiUrl = config.apiInternalUrl;
        if (process.client) {
            apiUrl = config.apiUrl;
        }
        //推荐文章
        let posts = await apiService
            .get(apiUrl + "/posts/")
            .then(posts => {
                return posts.data.data.data;
            })
            .catch(err => {
                return error({
                    statusCode: 500,
                    message: "服务器挂了！赶快联系站长，13571899655@163.com"
                });
            });
        //当前文章
        let post = await apiService
            .get(apiUrl + "/posts/" + params.id)
            .then(res => {
                if (res.data.status !== 0) {
                    return error({
                        statusCode: 404,
                        message: "文章不存在或已删除"
                    });
                }
                return res.data.data;
            })
            .catch(err => {
                return error({
                    statusCode: 500,
                    message: "服务器挂了！赶快联系站长，13571899655@163.com"
                });
            });
        if (!Array.isArray(post.comments)) {
            post.comments = [];
        } else {
            post.comments.forEach(item => {
                item.contentMd = marked(item.content, {
                    highlight: code => {
                        return require("highlight.js").highlightAuto(code, [
                            "lua",
                            "html",
                            "xml",
                            "yml",
                            "bash",
                            "cpp",
                            "json",
                            "nginx",
                            "shell",
                            "dockerfile"
                        ]).value;
                    }
                });
            });
        }
        return {
            post: post,
            posts: posts
        };
    },
    methods: {
        favorClick() {
            apiService
                .post("/posts/" + this.post.id + "/favor")
                .then(response => {});
        },
        publishComment() {
            if (!this.commentContent) {
                this.$toast({
                    type: "error",
                    message: "评论内容不能为空"
                });
                return;
            }
            this.isSubmitting = true;
            apiService
                .post("/posts/" + this.post.id + "/comments", {
                    content: this.commentContent
                })
                .then(response => {
                    this.$toast({
                        type: "success",
                        message: "发布成功"
                    });
                    this.isSubmitting = false;
                    let comment = {
                        content: this.commentContent,
                        user: localStorage.get("user")
                    };
                    this.post.comments.push(comment);
                });
        },
        moveToDraft(post_id) {
            apiService.delete("/posts/" + this.post.id).then(response => {
                this.$toast({
                    type: "success",
                    message: "已移入草稿箱，可到个人中心查看"
                });
                this.$router.push("/users/" + this.auth.id);
            });
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.recommend-post {
    background-color: #eee;
    line-height: 30px;
}

.medium-zoom-image--opened {
    z-index: 889;
}

.article-title {
    font-size: 1.6rem;
}

.article-info {
    font-size: 12px;
    margin-right: 8px;

    svg {
        width: 16px;
        height: 16px;
        margin-right: 4px;
    }
}

@media screen and (max-width: 400px) {
    .article-info {
        font-size: 11px;
    }
}

.articleTime {
    margin-right: 2rem;
}

.VueStar {
    color: #999;
}

.comment-md {
    pre {
        background-color: #212529;
        color: #ffffff;
    }
}

.comment-box {
    overflow: hidden;
}

.stackoverflow {
    color: #999999;
    font-size: 0.7em;
}
</style>
