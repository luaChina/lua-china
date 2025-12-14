<template>
    <div class="max-w-screen-2xl mx-auto px-0 sm:px-2 py-4">
        <h1 class="hidden">lua 中国社区，lua 论坛</h1>
        <div class="flex flex-wrap sm:-mx-4">
            <!-- Main Content -->
            <div class="w-full lg:w-3/4 px-0 sm:px-4 mb-8">
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div class="border-b border-gray-200 bg-gray-50 py-3">
                        <ul class="flex space-x-6">
                            <li>
                                <a
                                    href="#"
                                    class="text-red-600 font-medium border-b-2 border-red-600 pb-1"
                                    @click.prevent="getPosts(1)"
                                    id="nav-news"
                                    >最新</a
                                >
                            </li>
                            <!-- <li>
                                <a href="#" class="text-gray-500 hover:text-gray-700" @click.prevent="getPosts('hot')">精华</a>
                            </li>
                            <li>
                                <a href="#" class="text-gray-500 hover:text-gray-700" @click.prevent="getPosts('discuss')">回复最多</a>
                            </li> -->
                        </ul>
                    </div>
                    <div class="divide-y divide-gray-100">
                        <div
                            v-for="(post, index) in posts"
                            :key="index"
                            class="py-3 px-4 hover:bg-gray-50 transition duration-150 ease-in-out group"
                        >
                            <router-link
                                :to="'/posts/' + post.id"
                                class="flex items-center text-gray-800 group-hover:text-red-600 no-underline"
                            >
                                <div class="flex-shrink-0 mr-4">
                                    <hash-avatar
                                        :url="post.user.avatar"
                                        :user_id="post.user.id"
                                        :size="40"
                                        :alt="post.user.name"
                                        class="rounded-full"
                                    ></hash-avatar>
                                </div>
                                <div class="flex-grow">
                                    <div class="flex items-center">
                                        <h2 class="text-sm sm:text-lg font-medium m-0">{{ post.title }}</h2>
                                        <i
                                            class="bi bi-bookmark-star-fill ml-2 text-yellow-400"
                                            v-if="post.excellent === 1"
                                        ></i>
                                    </div>
                                    <!-- <div class="text-sm text-gray-400 mt-1">阅读数: {{post.read_count}}</div> -->
                                </div>
                            </router-link>
                        </div>
                    </div>
                </div>

                <!-- Pagination -->
                <div class="mt-8 flex justify-center px-2">
                    <nav class="relative z-0 inline-flex flex-wrap justify-center rounded-md shadow-sm gap-1 sm:gap-0 sm:-space-x-px" aria-label="Pagination">
                        <!-- Previous Button -->
                        <a
                            v-if="prevAble"
                            :href="getPageUrl(pageActive - 1)"
                            class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-xs sm:text-sm font-medium text-gray-500 hover:bg-gray-50 no-underline"
                        >
                            <span class="sr-only">Previous</span>
                            <i class="bi bi-chevron-left"></i>
                        </a>
                        <span
                            v-else
                            class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-gray-100 text-xs sm:text-sm font-medium text-gray-300 cursor-not-allowed"
                        >
                            <i class="bi bi-chevron-left"></i>
                        </span>
                        
                        <template v-if="pageNum.length <= 8">
                            <a
                                v-for="(item, index) in pageNum"
                                :key="'pa' + index"
                                :href="getPageUrl(item)"
                                class="relative inline-flex items-center px-3 sm:px-4 py-2 border border-gray-300 bg-white text-xs sm:text-sm font-medium hover:bg-gray-50 no-underline"
                                :class="pageActive === item ? 'z-10 bg-red-50 border-red-500 text-red-600' : 'text-gray-500'"
                            >
                                {{ item }}
                            </a>
                        </template>
                        <template v-else>
                            <a
                                v-for="(item, index) in pageNum.slice(0, 5)"
                                :key="'pa' + index"
                                :href="getPageUrl(item)"
                                class="relative inline-flex items-center px-3 sm:px-4 py-2 border border-gray-300 bg-white text-xs sm:text-sm font-medium hover:bg-gray-50 no-underline"
                                :class="pageActive === item ? 'z-10 bg-red-50 border-red-500 text-red-600' : 'text-gray-500'"
                            >
                                {{ item }}
                            </a>
                            <span class="relative inline-flex items-center px-3 sm:px-4 py-2 border border-gray-300 bg-white text-xs sm:text-sm font-medium text-gray-700">
                                ...
                            </span>
                            <a
                                v-if="pageActive > 5 && pageActive <= pageNum.length - 1"
                                :href="getPageUrl(pageActive)"
                                class="relative inline-flex items-center px-3 sm:px-4 py-2 border border-red-500 bg-red-50 text-xs sm:text-sm font-medium text-red-600 z-10 no-underline"
                            >
                                {{ pageActive }}
                            </a>
                            <a
                                :href="getPageUrl(pageNum[pageNum.length - 1])"
                                class="relative inline-flex items-center px-3 sm:px-4 py-2 border border-gray-300 bg-white text-xs sm:text-sm font-medium hover:bg-gray-50 no-underline"
                                :class="pageActive === pageNum[pageNum.length - 1] ? 'z-10 bg-red-50 border-red-500 text-red-600' : 'text-gray-500'"
                            >
                                {{ pageNum[pageNum.length - 1] }}
                            </a>
                        </template>

                        <!-- Next Button -->
                        <a
                            v-if="nextAble"
                            :href="getPageUrl(parseInt(pageActive) + 1)"
                            class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-xs sm:text-sm font-medium text-gray-500 hover:bg-gray-50 no-underline"
                        >
                            <span class="sr-only">Next</span>
                            <i class="bi bi-chevron-right"></i>
                        </a>
                        <span
                            v-else
                            class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-gray-100 text-xs sm:text-sm font-medium text-gray-300 cursor-not-allowed"
                        >
                            <i class="bi bi-chevron-right"></i>
                        </span>
                    </nav>
                </div>

                <!-- Technical Support -->

            </div>

            <!-- Sidebar -->
            <div class="w-full lg:w-1/4 px-4">
                <!-- Announcement -->
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
                    <div class="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center text-gray-700 font-medium">
                        <i class="bi bi-megaphone-fill mr-2 text-red-500"></i>
                        <h3 class="m-0 text-base">社区公告</h3>
                    </div>
                    <div class="p-4 text-gray-600 text-sm leading-relaxed">
                        欢迎Openresty、游戏逆向爱好者
                    </div>
                </div>

                <!-- Active Users -->
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
                    <div class="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center text-gray-700 font-medium">
                        <i class="bi bi-sort-up mr-2 text-red-500"></i>
                        <h3 class="m-0 text-base">本周活跃用户</h3>
                    </div>
                    <div class="p-2">
                        <ul class="space-y-2">
                            <li
                                v-for="(user, index) in topUsers"
                                :key="index"
                                class="flex items-center p-2 hover:bg-gray-50 rounded transition"
                            >
                                <span class="inline-flex items-center justify-center w-6 h-6 rounded text-xs font-medium bg-red-100 text-red-800 mr-2 flex-shrink-0">
                                    {{ index + 1 }}
                                </span>
                                <hash-avatar
                                    :url="user.avatar"
                                    :user_id="user.id"
                                    :size="24"
                                    :alt="user.name"
                                    class="rounded-full mr-2 flex-shrink-0"
                                ></hash-avatar>
                                <router-link
                                    class="text-gray-700 hover:text-red-600 text-sm font-medium no-underline truncate"
                                    :to="'/users/' + user.id"
                                    >{{ user.name }}</router-link
                                >
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Ecosystem -->
                <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div class="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center text-gray-700 font-medium">
                        <i class="bi bi-file-earmark-code mr-2 text-red-500"></i>
                        <h3 class="m-0 text-base">社区生态</h3>
                    </div>
                    <div class="p-4 space-y-4">
                        <div>
                            <span class="text-gray-600 text-sm block mb-2">有任何需要请站长微信：</span>
                            <img
                                class="w-full rounded shadow-sm"
                                src="https://lua-china-1256147061.cos.accelerate.tencentcos.cn/public/wechat-qrcode.png"
                                alt="adv"
                                width="300"
                                height="300"
                                loading="lazy"
                            />
                            <p class="text-xs text-gray-500 mt-2">
                                由于微信群二维码会自动过期，加群可以扫描上方二维码，站长拉你进微信群，备注: lua
                            </p>
                        </div>
                        <div>
                            <span class="text-gray-600 text-sm block mb-2">qq群：</span>
                            <img
                                class="w-full rounded shadow-sm"
                                src="https://lua-china-1256147061.cos.accelerate.tencentcos.cn/public/qq-qrcode.png"
                                alt="adv"
                                width="300"
                                height="300"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>



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
            .get(apiUrl + "/posts?pagesize=40&page=" + page)
            .then((res) => {
                if (res.data.data.data.length == undefined) {
                    context.error({
                        statusCode: 404,
                        message: "未找到该网页"
                    });
                    return;
                }
                let num = Math.ceil(res.data.data.total / 20);
                let numArr = [];
                for (let i = 0; i < num; i++) {
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
