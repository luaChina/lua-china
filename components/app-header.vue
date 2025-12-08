<template>
    <header class="shadow-sm border-b border-gray-200 bg-white sticky top-0 z-50">
        <nav class="max-w-screen-2xl mx-auto px-4 h-16 flex items-center justify-between">
            <!-- Brand -->
            <router-link to="/" class="flex items-center text-decoration-none hover:no-underline">
                <h2 class="text-2xl font-bold m-0 flex items-center">
                    <span class="text-red-600">Lua</span>
                    <span class="text-gray-600 ml-1">China</span>
                </h2>
            </router-link>

            <!-- Navigation Links -->
            <div class="hidden md:flex items-center space-x-8">
                <router-link
                    to="/"
                    class="text-gray-600 hover:text-red-600 font-medium transition text-decoration-none"
                    active-class="text-red-600 font-bold"
                    exact
                    rel="nofollow"
                >文章</router-link>
                <a
                    href="https://www.github.com/horan-geeker/nana"
                    target="_blank"
                    rel="nofollow"
                    class="text-gray-600 hover:text-red-600 font-medium transition text-decoration-none"
                >Nana</a>
                <a
                    href="https://konghq.com/"
                    target="_blank"
                    rel="nofollow"
                    class="text-gray-600 hover:text-red-600 font-medium transition text-decoration-none"
                >Kong</a>
            </div>

            <!-- Auth Buttons -->
            <client-only>
                <div class="flex items-center">
                    <div v-if="user.id == 0" class="flex items-center space-x-3">
                        <router-link to="/login" rel="nofollow" class="text-decoration-none">
                            <button
                                type="button"
                                class="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 hover:text-gray-900 transition flex items-center"
                            >
                                <i class="bi bi-person-fill mr-1"></i>
                                <span>登录</span>
                            </button>
                        </router-link>
                        <router-link to="/register" rel="nofollow" class="text-decoration-none">
                            <button
                                type="button"
                                class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition flex items-center shadow-sm"
                            >
                                <i class="bi bi-person-plus-fill mr-1"></i>
                                <span>注册</span>
                            </button>
                        </router-link>
                    </div>
                    <div class="flex items-center" v-else>
                        <router-link
                            :to="'/posts/create'"
                            class="px-4 py-2 border border-red-600 text-red-600 rounded hover:bg-red-600 hover:text-white transition mr-4 text-decoration-none"
                            rel="nofollow"
                        >发布文章</router-link>

                        <div class="relative group">
                            <a
                                href="#"
                                class="flex items-center text-decoration-none"
                                id="dropdownMenuButton"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <hash-avatar
                                    :url="avatar"
                                    :user_id="user.id"
                                    :size="36"
                                    :alt="user.name"
                                    class="rounded-full border border-gray-200 shadow-sm overflow-hidden"
                                    style="border-radius: 50%;"
                                ></hash-avatar>
                            </a>
                            <div
                                class="hidden group-hover:block absolute right-0 mt-0 w-48 bg-white rounded-md shadow-lg border border-gray-100 py-1"
                            >
                                <router-link
                                    :to="'/users/' + user.id"
                                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center text-decoration-none"
                                    rel="nofollow"
                                >
                                    <i class="bi bi-person-fill mr-2 text-gray-400"></i>
                                    <span>个人中心</span>
                                </router-link>
                                <div class="border-t border-gray-100 my-1"></div>
                                <a
                                    href="#"
                                    class="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center text-decoration-none"
                                    data-bs-toggle="modal"
                                    data-bs-target="#logoutModal"
                                    rel="nofollow"
                                >
                                    <i class="bi bi-box-arrow-right mr-2"></i>
                                    <span>退出登录</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <!-- Modal -->
                    <div
                        class="modal fade"
                        id="logoutModal"
                        tabindex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                        style="z-index: 9999;"
                    >
                        <div class="modal-dialog modal-sm text-center">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">温馨提示</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    确认退出登录吗？
                                </div>
                                <div class="modal-footer justify-center">
                                    <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">取消</button>
                                    <button type="button" data-bs-dismiss="modal" class="btn btn-danger btn-sm" @click="logout()">确定</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </client-only>
        </nav>
    </header>
</template>

<script>
import apiService from "~/services/apiService";
import localStorage from "~/utils/localStorage";
import HashAvatar from "~/components/hash-avatar";

export default {
    name: "Header",
    components: {
        "hash-avatar": HashAvatar
    },
    data() {
        return {
            user: {}
        };
    },
    watch: {
        $route(to, from) {
            this.updateUserInfo();
            if (from.name === "index-users-id-edit") {
                apiService.get("/users/" + this.user.id).then(res => {
                    this.user = res.data.data;
                });
            }
        }
    },
    computed: {
        avatar: function() {
            return this.user.avatar;
        }
    },
    mounted() {
        this.updateUserInfo();
    },
    methods: {
        updateUserInfo() {
            this.user = { id: 0 }
            let userInfo = localStorage.get("user");
            if (userInfo) {
                this.user = userInfo
            } else {
                apiService.get("/userinfo").then(response => {
                    if (response.data.status === 4) {
                        return
                    }
                    if (response.data.data) {
                        this.user = response.data.data
                        localStorage.set("user", this.user);
                    }
                });
            }
        },
        logout() {
            localStorage.delete("user");
            apiService.post("/logout").then(response => {
                this.$router.push({ path: "/login" });
            });
        }
    }
};
</script>

<style lang="scss">
.seo-h2 {
    font-size: 24px;
}
.header-title {
    font-size: 24px;
}
.dropdown-item {
    svg {
        height: 16px;
        width: 16px;
        margin-right: 8px;
    }
}
</style>
