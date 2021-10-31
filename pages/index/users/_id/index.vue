<template>
    <div class="row">
        <div class="col-md-3">
            <div class="bg-white border px-3">
                <div class="d-flex py-3">
                    <div>
                        <hash-avatar
                            :url="
                                auth.id == $route.params.id
                                    ? auth.avatar
                                    : user.avatar
                            "
                            :user_id="
                                auth.id == $route.params.id ? auth.id : user.id
                            "
                            :size="100"
                            alt="avatar"
                            class="rounded-circle mr-2"
                        ></hash-avatar>
                    </div>
                    <div>
                        <div class="username">
                            {{
                                auth.id == $route.params.id
                                    ? auth.name
                                    : user.name
                            }}
                        </div>
                        <div>
                            第{{
                                auth.id == $route.params.id ? auth.id : user.id
                            }}位会员
                        </div>
                        <nuxt-link
                            v-if="auth.id == $route.params.id"
                            :to="'/users/' + auth.id + '/edit'"
                            class="btn btn-primary btn-sm mt-4"
                            >修改</nuxt-link
                        >
                    </div>
                </div>
                <div
                    class="border-top py-3 d-flex justify-content-between text-center"
                >
                    <div>
                        <div class="user-info">{{ posts.length || 0 }}</div>
                        <div class="text-muted">文章</div>
                    </div>
                    <div>
                        <div class="user-info">{{ comments.length || 0 }}</div>
                        <div class="text-muted">评论</div>
                    </div>
                    <div>
                        <div class="user-info">0</div>
                        <div class="text-muted">关注者</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-9">
            <div class="border bg-white mb-4">
                <div class="border-bottom text-center p-2 font-red">
                    <i class="bi bi-pen-fill"></i>
                    撰写的文章
                </div>
                <div
                    class="px-2 py-2 border-bottom border-light d-flex justify-content-between"
                    v-for="(post, index) in posts"
                    :key="index"
                >
                    <div class="col-md-11">
                        <a
                            class="text-muted"
                            target="_blank"
                            :href="'/posts/' + post.id"
                            ><div>{{ post.title }}</div></a
                        >
                    </div>
                    <div
                        class="col-md-1 text-muted text-desc p-0 items-align-bottom align-self-center text-right"
                    >
                        {{ post.read_count }} 阅读
                    </div>
                </div>
            </div>
            <div class="border bg-white mb-4">
                <div class="border-bottom text-center p-2 font-red">
                    <i class="bi bi-chat-right-quote-fill"></i>
                    最近发表的评论
                </div>
                <div
                    class="px-4 py-2 border-bottom border-light"
                    v-for="(comment, index) in comments"
                    :key="index"
                >
                    <div class="row">
                        <div class="col-md-8">
                            <a
                                class="text-secondary comment-post-title"
                                :href="'/posts/' + comment.post.id"
                                >{{ comment.post.title }}</a
                            >
                        </div>
                        <div
                            class="col-md-4 text-muted comment-time align-self-center text-right"
                        >
                            发布于 {{ comment.updated_at }}
                        </div>
                    </div>
                    <div class="d-flex justify-content-between">
                        {{ comment.content }}
                    </div>
                    <div class="ml-2 text-muted text-desc"></div>
                </div>
            </div>
            <no-ssr>
                <div
                    class="border bg-white mb-4"
                    v-if="auth.id == $route.params.id"
                >
                    <div class="border-bottom text-center p-2 font-red">
                        <i class="bi bi-archive-fill"></i>
                        我的草稿箱
                    </div>
                    <div
                        class="px-2 py-2 border-bottom border-light d-flex justify-content-between"
                        v-for="(draft, index) in drafts"
                        :key="index"
                    >
                        <div class="col-md-10">
                            <span class="text-muted">{{ draft.title }}</span>
                        </div>
                        <div class="col-md-2 text-right">
                            <a
                                class="btn btn-sm btn-primary mr-1"
                                target="_blank"
                                :href="'/posts/' + draft.id + '/edit'"
                                >编辑</a
                            >
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
import apiService from "~/services/apiService";
import HashAvatar from "~/components/hash-avatar";
import axios from "axios";
import config from "~/config/api.js";
import { authInfo } from "../../../../utils/helper";

export default {
    components: {
        "hash-avatar": HashAvatar
    },
    data() {
        return {
            user: {},
            auth: { id: 0 },
            posts: [],
            comments: [],
            drafts: []
        };
    },
    watch: {
        $route(to, from) {
            if (from.params.id !== to.params.id) {
                this.getPostInfo();
            }
            if (Number(this.auth.id) === Number(to.params.id)) {
                this.getDraft();
            }
        }
    },
    asyncData({ params, error }) {
        return axios
            .get(config.apiUrl + "/users/" + params.id)
            .then(res => {
                if (res.data.status === 0x010009) {
                    error({
                        statusCode: 404,
                        message: "你找到这个人在地球上没有"
                    });
                } else {
                    return { user: res.data.data };
                }
            })
            .catch(err => {
                error({
                    statusCode: 500,
                    message: "服务器挂了！赶快联系站长，13571899655@163.com"
                });
            });
    },
    mounted() {
        if (authInfo()) {
            this.auth = authInfo();
            if (Number(this.auth.id) === Number(this.$route.params.id)) {
                this.getDraft();
            }
        }
        this.getPostInfo();
    },
    methods: {
        getDraft() {
            apiService.get("/posts/drafts").then(response => {
                this.drafts = response.data.data;
            });
        },
        getPostInfo() {
            apiService
                .get("/users/" + this.$route.params.id + "/posts")
                .then(response => {
                    this.posts = response.data.data;
                });
            apiService
                .get("/users/" + this.$route.params.id + "/comments")
                .then(response => {
                    this.comments = response.data.data;
                });
        }
    }
};
</script>
