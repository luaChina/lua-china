<template>
    <header class="shadow border-bottom bg-white">
        <nav class="navbar navbar-expand-lg navbar-light">
            <div class="container-fluid">
                <router-link to="/" class="navbar-brand header-title">
                    <h2 class="seo-h2 m-0">
                        <span style="color:red">Lua</span>
                        <span style="color:#666"> China</span>
                    </h2>
                </router-link>
                <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div
                    class="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul class="navbar-nav me-auto">
                        <li class="nav-item mr-2">
                            <router-link
                                class="nav-link"
                                to="/"
                                active-class="active"
                                exact
                                rel="nofollow"
                                >文章</router-link
                            >
                        </li>
                        <li class="nav-item mr-2">
                            <a
                                class="nav-link"
                                href="https://www.github.com/horan-geeker/nana"
                                target="_black"
                                rel="nofollow"
                                >Nana</a
                            >
                        </li>
                        <li class="nav-item mr-2">
                            <a
                                class="nav-link"
                                href="https://konghq.com/"
                                target="_black"
                                rel="nofollow"
                                >Kong</a
                            >
                        </li>
                    </ul>
                    <no-ssr>
                        <div>
                            <div v-if="user.id == 0">
                                <router-link to="/login" rel="nofollow">
                                    <button
                                        type="button"
                                        class="btn btn-outline-secondary mr-2"
                                    >
                                        <i class="bi bi-person-fill"></i>
                                        <span> 登录</span>
                                    </button>
                                </router-link>
                                <router-link to="/register" rel="nofollow">
                                    <button
                                        type="button"
                                        class="btn btn-outline-success"
                                    >
                                        <i class="bi bi-person-plus-fill"></i>
                                        <span> 注册</span>
                                    </button>
                                </router-link>
                            </div>
                            <div class="d-flex align-items-center" v-else>
                                <router-link
                                    :to="'/posts/create'"
                                    class="btn btn-outline-danger btn-sm md-2 me-2"
                                    rel="nofollow"
                                    >发布文章</router-link
                                >

                                <div class="dropdown">
                                    <a
                                        href="#"
                                        class="dropdown-toggle text-muted"
                                        id="dropdownMenuButton"
                                        data-bs-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        <hash-avatar
                                            :url="avatar"
                                            :user_id="user.id"
                                            :size="31"
                                            :alt="user.name"
                                            class="rounded-circle"
                                        ></hash-avatar>
                                    </a>
                                    <div
                                        class="dropdown-menu dropdown-menu-lg-end"
                                        aria-labelledby="dropdownMenuButton"
                                    >
                                        <router-link
                                            :to="'/users/' + user.id"
                                            class="dropdown-item"
                                            rel="nofollow"
                                        >
                                            <i class="bi bi-person-fill"></i>
                                            <span>个人中心</span>
                                        </router-link>
                                        <div class="dropdown-divider"></div>
                                        <a
                                            href="#"
                                            class="dropdown-item text-danger"
                                            data-bs-toggle="modal"
                                            data-bs-target="#logoutModal"
                                            rel="nofollow"
                                        >
                                            <i
                                                class="bi bi-box-arrow-right"
                                            ></i>
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
                            >
                                <div class="modal-dialog modal-sm">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5
                                                class="modal-title"
                                                id="exampleModalLabel"
                                            >
                                                温馨提示
                                            </h5>
                                            <button
                                                type="button"
                                                class="btn-close"
                                                data-bs-dismiss="modal"
                                                aria-label="Close"
                                            ></button>
                                        </div>
                                        <div class="modal-body">
                                            确认退出登录吗？
                                        </div>
                                        <div class="modal-footer">
                                            <button
                                                type="button"
                                                class="btn btn-secondary"
                                                data-bs-dismiss="modal"
                                            >
                                                取消
                                            </button>
                                            <button
                                                type="button"
                                                data-bs-dismiss="modal"
                                                class="btn btn-danger"
                                                @click="logout()"
                                            >
                                                确定
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </no-ssr>
                </div>
            </div>
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
            let userInfo = localStorage.get("user");
            this.user = userInfo ? userInfo : { id: 0 };
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
