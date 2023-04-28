<template>
    <div>
        <h1 style="display: none">lua 中国社区，lua 论坛</h1>
        <div class="row">
            <div class="col-lg-9 col-12 mb-4 px-lg-3">
                <div class="card">
                    <div class="card-header">
                        <ul class="nav nav-tabs card-header-tabs">
                            <li class="nav-item">
                                <a
                                    href="#"
                                    class="nav-link text-muted active"
                                    data-toggle="tab"
                                    @click="getPosts(1)"
                                    id="nav-news"
                                    aria-selected="true"
                                    >最新</a
                                >
                            </li>
                            <!-- <li class="nav-item">
                                <a href="#" class="nav-link text-muted" data-toggle="tab" @click="getPosts('hot')" id="nav-hot" aria-selected="false">精华</a>
                            </li>
                             <li class="nav-item">
                                <a href="#" class="nav-link text-muted" data-toggle="tab" @click="getPosts('discuss')" id="nav-discuss" aria-selected="false">回复最多</a>
                            </li> -->
                        </ul>
                    </div>
                    <div class="tab-content" id="nav-tabContent">
                        <ul class="list-group">
                            <li
                                v-for="(post, index) in posts"
                                :key="index"
                                class="
                                    list-group-item
                                    py-3
                                    list-group-item-action
                                    border-left-0 border-right-0
                                "
                            >
                                <router-link
                                    :to="'/posts/' + post.id"
                                    class="text-body list-content"
                                >
                                    <div>
                                        <hash-avatar
                                            :url="post.user.avatar"
                                            :user_id="post.user.id"
                                            :size="31"
                                            :alt="post.user.name"
                                            class="rounded-circle me-2"
                                        ></hash-avatar>
                                        <span>{{ post.title }}</span>
                                        <i
                                            class="bi bi-bookmark-star-fill"
                                            style="color: #ffec3d"
                                            v-if="post.excellent === 1"
                                        ></i>
                                    </div>
                                    <!-- <div style="font-size: 14px;color: #8c8c8c;">阅读数:{{post.read_count}}</div> -->
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </div>
                <ul class="pagination justify-content-center">
                    <li :class="prevAble ? 'page-item' : 'page-item disabled'">
                        <a
                            class="page-link"
                            aria-label="Previous"
                            :href="getPageUrl(pageActive - 1)"
                        >
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    <template v-if="pageNum.length <= 8">
                        <li
                            :key="'pa' + index"
                            :class="
                                pageActive === item
                                    ? 'page-item active'
                                    : 'page-item'
                            "
                            v-for="(item, index) in pageNum"
                        >
                            <a
                                class="page-link"
                                :href="getPageUrl(item)"
                                >{{ item }}</a
                            >
                        </li>
                    </template>
                    <template v-else>
                        <li
                            :key="'pa' + index"
                            :class="
                                pageActive == item
                                    ? 'page-item active'
                                    : 'page-item'
                            "
                            v-for="(item, index) in pageNum.slice(0, 5)"
                        >
                            <a
                                class="page-link"
                                :href="getPageUrl(item)"
                                >{{ item }}</a
                            >
                        </li>
                        <li class="d-flex align-items-end mx-1">...</li>
                        <li
                            class="page-item active"
                            v-if="
                                pageActive > 5 &&
                                pageActive <= pageNum.length - 1
                            "
                        >
                            <a
                                class="page-link"
                                :href="getPageUrl(pageActive)"
                                >{{ pageActive }}</a
                            >
                        </li>
                        <li
                            :key="'pa' + pageNum.length - 1"
                            :class="
                                pageActive == pageNum[pageNum.length - 1]
                                    ? 'page-item active'
                                    : 'page-item'
                            "
                        >
                            <a
                                class="page-link"
                                :href="getPageUrl(pageNum[pageNum.length - 1])"
                                >{{ pageNum[pageNum.length - 1] }}</a
                            >
                        </li>
                    </template>

                    <li :class="nextAble ? 'page-item' : 'page-item disabled'">
                        <a
                            class="page-link"
                            aria-label="Next"
                            :href="getPageUrl(parseInt(pageActive) + 1)"
                        >
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="col">
                <div class="border bg-white mb-4">
                    <div
                        class="
                            text-muted
                            border-bottom
                            right-card-title
                            d-flex
                            align-items-center
                            justify-content-center
                        "
                    >
                        <i class="me-2 bi bi-megaphone-fill"></i>
                        <span>&nbsp;社区公告</span>
                    </div>
                    <div class="announcement-content p-4 text-muted">
                        欢迎Openresty、游戏逆向爱好者
                    </div>
                </div>
                <div class="border bg-white active-user mb-4">
                    <div
                        class="
                            text-muted
                            border-bottom
                            right-card-title
                            d-flex
                            align-items-center
                            justify-content-center
                        "
                    >
                        <i class="bi bi-sort-up"></i>
                        <span>&nbsp;本周活跃用户</span>
                    </div>
                    <div class="p-2 text-muted">
                        <ul class="list-group">
                            <li
                                class="
                                    list-group-item
                                    border-0
                                    d-flex
                                    align-items-center
                                    justify-content-between
                                "
                                v-for="(user, index) in topUsers"
                                :key="index"
                            >
                                <div>
                                    <hash-avatar
                                        :url="user.avatar"
                                        :user_id="user.id"
                                        :size="20"
                                        :alt="user.name"
                                        class="rounded-circle me-2"
                                    ></hash-avatar>
                                    <router-link
                                        class="font-red text-decoration-none"
                                        :to="'/users/' + user.id"
                                        >{{ user.name }}</router-link
                                    >
                                </div>
                                <span class="badge rounded-pill bg-danger">{{
                                    index + 1
                                }}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="bg-white border">
                    <div
                        class="
                            text-muted
                            border-bottom
                            text-center
                            right-card-title
                        "
                    >
                        <i class="bi bi-file-earmark-code"></i>
                        <span>&nbsp;社区生态</span>
                    </div>
                    <div class="p-4">
                        <span class="contact-text">社区源码：</span
                        ><a
                            href="https://github.com/luaChina/lua-china"
                            target="_blank"
                            rel="nofollow"
                        >
                            <i class="bi bi-github"></i>
                        </a>
                    </div>
                    <div class="p-4">
                        <span class="contact-text">站长微信：</span>
                        <img
                            class="img-fluid"
                            src="~/assets/images/wechat-qrcode-100x100.jpeg"
                            alt="adv"
                        />
                    </div>
                    <cite class="ps-4 pe-4 announcement-content text-muted">
                        扫描上方二维码，站长拉你进微信群，备注: lua
                    </cite>
                    <div class="p-4">
                        <span class="contact-text">qq群：</span>
                        <img
                            class="img-fluid"
                            src="~/assets/images/qq-group-qrcode-100x100.jpeg"
                            alt="adv"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.contact-text {
    display: inline-block;
    min-width: 80px;
}
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
    display: block;
}

.list-content {
    text-decoration: none !important;
}

.pagination {
    margin-top: 15px;
}

.page-item.active .page-link {
    background-color: #dc3545;
    border-color: #dc3545;
}

.page-link,
.page-link:hover,
.page-link:focus {
    color: #dc3545;
}

.page-link:focus {
    box-shadow: none;
}
</style>

<script>
import apiService from "~/services/apiService";
import HashAvatar from "~/components/hash-avatar";
import axios from "axios";
import config from "~/config/api.js";

export default {
    components: {
        "hash-avatar": HashAvatar,
    },
    data() {
        return {
            topUsers: [],
            posts: [],
            pageNum: [1],
            pageActive: 1,
        };
    },
    created() {
        apiService.get("/users/top").then((response) => {
            this.topUsers = response.data.data;
        });
    },
    computed: {
        prevAble() {
            return parseInt(this.pageActive) != 1
        },
        nextAble() {
            return parseInt(this.pageActive) <= this.pageNum.length-1
        },
    },
    //2.x版本 asyncData不推荐使用callback方式
    asyncData(context) {
        let query = context.query
        var page = 1
        if (query.page) {
            page = query.page
        }
        let apiUrl = config.apiInternalUrl;
        if (process.client) {
            apiUrl = config.apiUrl;
        }
        return axios
            .get(apiUrl + "/posts?page=" + page)
            .then((res) => {
                let num = Math.ceil(res.data.data.total / 20);
                let numArr = [1];
                for (let i = 1; i < num; i++) {
                    numArr.push(i + 1);
                }
                return {
                    posts: res.data.data.data,
                    pageNum: numArr,
                    pageActive: page
                };
            })
            .catch((err) => {
                context.error({
                    statusCode: 500,
                    message: "服务器维护中，稍后再试试吧",
                });
            });
    },

    methods: {
        buildParams(url, orignalParam) {
            return url;
        },
        getPosts(page = 1) {
            scrollTo(0, 0);
            apiService.get("/posts?page=" + page).then((response) => {
                this.posts = response.data.data.data;
            });
        },
        getPageUrl(page = 1) {
            return '/?page=' + page;
        }
    },
};
</script>
