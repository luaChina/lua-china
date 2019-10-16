<template>
    <div>
        <h1 style="display:none">lua 中国社区，lua 论坛</h1>
        <div class="row">
            <div class="col-lg-9 col-12 mb-4 px-lg-3 p-0">
                <div class="card">
                    <div class="card-header">
                        <ul class="nav nav-tabs card-header-tabs">
                            <li class="nav-item">
                                <a href="#" class="nav-link text-muted active" data-toggle="tab"
                                   @click="getPosts(1)" id="nav-news" aria-selected="true">最新</a>
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
                            <li v-for="(post,index) in posts" :key="index"
                                class="list-group-item list-group-item-action border-left-0 border-right-0">
                                <router-link :to="'/posts/' + post.id"
                                             class="text-body list-content">
                                    <div>
                                        <hash-avatar :url="post.user.avatar" :user_id="post.user.id" :size=31
                                                     :alt="post.user.name" class="rounded-circle mr-2"></hash-avatar>
                                        <span>{{post.title}}</span>
                                        <font-awesome-icon :icon="['fas', 'crown']" :style="{ width: '18px',height:'18px',color: '#ffec3d', 'margin-bottom': '4.5px'}" v-if="post.excellent===1"/>
                                    </div>
                                    <!-- <div style="font-size: 14px;color: #8c8c8c;">阅读数:{{post.read_count}}</div> -->
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </div>
                <ul class="pagination justify-content-center">
                    <li :class="prevAble ? 'page-item' : 'page-item disabled' ">
                        <a class="page-link" aria-label="Previous" @click="getPosts(pageActive-1)" href="#">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    <li :class="pageActive === item ? 'page-item active' : 'page-item' " v-for="item in pageNum"><a class="page-link" @click="getPosts(item)" href="#">{{item}}</a></li>
                    <li :class="nextAble ? 'page-item' : 'page-item disabled' ">
                        <a class="page-link" aria-label="Next" @click="getPosts(pageActive+1)" href="#">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="col p-0">
                <div class="border bg-white mb-4">
                    <div class="text-muted border-bottom right-card-title d-flex align-items-center justify-content-center">
                        <font-awesome-icon :icon="['fas', 'bullhorn']"/>
                        <span>社区公告</span>
                    </div>
                    <div class="announcement-content p-4 text-muted">欢迎各位 Openresty， 游戏逆向爱好者</div>
                </div>
                <div class="border bg-white active-user mb-4">
                    <div class="text-muted border-bottom right-card-title d-flex align-items-center justify-content-center">
                        <font-awesome-icon :icon="['fab', 'gripfire']" :style="{ color: '#dc3545' }"/>
                        <span>本周活跃用户</span>
                    </div>
                    <div class="p-2 text-muted">
                        <ul class="list-group">
                            <li class="list-group-item border-0 d-flex align-items-center justify-content-between"
                                v-for="(user, index) in topUsers" :key=index>
                                <div>
                                    <hash-avatar :url="user.avatar" :user_id="user.id" :size=20 :alt="user.name"
                                                 class="rounded-circle mr-2"></hash-avatar>
                                    <router-link class="font-red" :to="'/users/' + user.id">{{user.name}}</router-link>
                                </div>
                                <span class="badge badge-pill badge-danger">{{index+1}}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="bg-white border">
                    <div class="text-muted border-bottom text-center right-card-title">
                        <font-awesome-icon :icon="['fab', 'github']"/>
                        <span>本站 github</span>
                    </div>
                    <div class="p-4 text-center"><a href="https://github.com/luaChina/lua-china" target="_blank" rel="nofollow"><img
                            class="img-fluid" src="~/assets/images/github.png" alt="adv"></a></div>
                    <div class="announcement-content pb-4 px-4 text-muted">希望大家参与开发，共建 Lua 社区，扫描下方二维码站长拉你加微信群，备注: lua</div>
                    <div class="mb-4 text-center">
                        <img class="img-fluid"
                             src="~/assets/images/wechat-qrcode-100x100.jpeg" alt="adv">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
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
        font-size: 14px;
        line-height: 30px;
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

    .page-link {
        color: #dc3545;
    }

    .page-link:focus {
        box-shadow: none;
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
    data() {
        return {
            topUsers: [],
            posts: [],
            pageNum: [1],
            pageActive: 1,
            prevAble: false,
            nextAble: false
        }
    },
    created() {
        apiService.get('/users/top').then(response => {
            this.topUsers = response.data.data
        })
    },

    //2.x版本 asyncData不推荐使用callback方式
    asyncData({params, error}) {
        return axios.get(config.apiUrl + '/posts')
            .then((res) => {
                let num = Math.ceil(res.data.data.total / 20);
                let numArr = [1];
                for (let i = 1; i < num; i++) {
                    numArr.push(i + 1);
                }
                return {posts: res.data.data.data, pageNum: numArr, nextAble: num > 1}
            }).catch(err => {
                error({statusCode: 500, message: '服务器挂了！赶快联系站长，13571899655@163.com'})
            })
    },


    methods: {
        buildParams(url, orignalParam) {
            return url
        },
        getPosts(page = 1) {
            scrollTo(0,0);
            this.pageActive = page;
            this.nextAble = page < this.pageNum.length;
            this.prevAble = page > 1;
            apiService.get('/posts?page=' + page).then(response => {
                this.posts = response.data.data.data;
            })
        }
    }
}
</script>
