<template>
    <div class="footer-wrapper mt-5 text-sm">
        
        <!-- White Background Section -->
        <div class="bg-white text-dark py-5">
            <div class="max-w-screen-2xl mx-auto px-0 sm:px-2">
                <!-- Section 0: Guide -->
                <div class="row mb-5">
                    <div class="col-12 col-md-6 mb-3 mb-md-0">
                        <router-link to="/community-rules" class="block text-decoration-none group">
                            <div class="bg-red-50 rounded p-4 border border-red-100 flex items-center hover:shadow-md transition">
                                <div class="bg-red-100 text-red-600 w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0 group-hover:bg-red-600 group-hover:text-white transition">
                                    <i class="bi bi-shield-check text-xl"></i>
                                </div>
                                <div>
                                    <h6 class="text-gray-800 font-bold text-lg mb-1 group-hover:text-red-600 transition">社区规范</h6>
                                    <p class="text-gray-500 text-sm mb-0">了解社区行为准则，共建良好氛围</p>
                                </div>
                                <i class="bi bi-arrow-right ml-auto text-gray-400 group-hover:text-red-600 transition"></i>
                            </div>
                        </router-link>
                    </div>
                    <div class="col-12 col-md-6">
                        <router-link to="/publishing-guide" class="block text-decoration-none group">
                            <div class="bg-blue-50 rounded p-4 border border-blue-100 flex items-center hover:shadow-md transition">
                                <div class="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition">
                                    <i class="bi bi-pencil-square text-xl"></i>
                                </div>
                                <div>
                                    <h6 class="text-gray-800 font-bold text-lg mb-1 group-hover:text-blue-600 transition">发文指南</h6>
                                    <p class="text-gray-500 text-sm mb-0">如何撰写高质量的技术文章</p>
                                </div>
                                <i class="bi bi-arrow-right ml-auto text-gray-400 group-hover:text-blue-600 transition"></i>
                            </div>
                        </router-link>
                    </div>
                </div>

                <!-- Section 1: Community Articles -->
                <div class="row mb-5">
                    <div class="col-12 mb-3">
                        <h5 class="text-dark border-l-4 border-red-600 pl-2 font-bold">社区文章</h5>
                    </div>
                    <div class="col-12 col-md-3 mb-3" v-for="post in posts" :key="post.id">
                        <div class="bg-white rounded p-3 h-100 shadow-sm border border-gray-100 hover:shadow-md transition">
                            <router-link :to="'/posts/' + post.id" class="text-dark text-decoration-none block h-100 flex flex-col justify-between">
                                <h6 class="font-bold text-truncate mb-2 text-gray-800">{{ post.title }}</h6>
                                <div class="flex items-center justify-between mt-2 pt-2 border-t border-gray-50">
                                    <div class="flex items-center text-gray-500 text-xs">
                                        <hash-avatar
                                            :url="post.user.avatar"
                                            :user_id="post.user.id"
                                            :size="24"
                                            :alt="post.user.name"
                                            class="rounded-full mr-2"
                                        ></hash-avatar>
                                        <span class="truncate max-w-[80px]">{{ post.user.name }}</span>
                                    </div>
                                    <div class="text-gray-400 text-xs flex items-center">
                                        <i class="bi bi-eye mr-1"></i>
                                        <span>{{ post.read_count }}</span>
                                    </div>
                                </div>
                            </router-link>
                        </div>
                    </div>
                </div>

                <!-- Section 2: Open Source Projects -->
                <div class="row mb-4">
                    <div class="col-12 mb-3">
                        <h5 class="text-dark border-l-4 border-red-600 pl-2 font-bold">开源项目 & 应用</h5>
                    </div>
                    
                    <!-- Game Development -->
                    <div class="col-12 mb-2">
                        <h6 class="text-gray-600 font-bold border-bottom pb-2 mb-3">🎮 游戏开发</h6>
                    </div>
                    <div class="col-12 col-md-3 mb-3" v-for="project in gameProjects" :key="project.name">
                        <a :href="project.link" target="_blank" class="block h-100 text-decoration-none">
                            <div class="bg-white rounded p-3 h-100 shadow-sm border border-gray-100 hover:shadow-md transition flex flex-col items-center justify-center text-center">
                                <h6 class="text-gray-800 font-bold mb-1">{{ project.name }}</h6>
                                <span class="text-gray-500 text-xs">{{ project.desc }}</span>
                            </div>
                        </a>
                    </div>

                    <!-- Web Services -->
                    <div class="col-12 mt-4 mb-2">
                        <h6 class="text-gray-600 font-bold border-bottom pb-2 mb-3">🌐 高性能网络与 Web 服务</h6>
                    </div>
                    <div class="col-12 col-md-3 mb-3" v-for="project in webProjects" :key="project.name">
                        <a :href="project.link" target="_blank" class="block h-100 text-decoration-none">
                            <div class="bg-white rounded p-3 h-100 shadow-sm border border-gray-100 hover:shadow-md transition flex flex-col items-center justify-center text-center">
                                <h6 class="text-gray-800 font-bold mb-1">{{ project.name }}</h6>
                                <span class="text-gray-500 text-xs">{{ project.desc }}</span>
                            </div>
                        </a>
                    </div>

                    <!-- System & Tools -->
                    <div class="col-12 mt-4 mb-2">
                        <h6 class="text-gray-600 font-bold border-bottom pb-2 mb-3">⚙️ 嵌入式系统与应用工具</h6>
                    </div>
                    <div class="col-12 col-md-3 mb-3" v-for="project in systemProjects" :key="project.name">
                        <a :href="project.link" target="_blank" class="block h-100 text-decoration-none">
                            <div class="bg-white rounded p-3 h-100 shadow-sm border border-gray-100 hover:shadow-md transition flex flex-col items-center justify-center text-center">
                                <h6 class="text-gray-800 font-bold mb-1">{{ project.name }}</h6>
                                <span class="text-gray-500 text-xs">{{ project.desc }}</span>
                            </div>
                        </a>
                    </div>

                    <!-- AI & Science -->
                    <div class="col-12 mt-4 mb-2">
                        <h6 class="text-gray-600 font-bold border-bottom pb-2 mb-3">🧠 人工智能与科学计算</h6>
                    </div>
                    <div class="col-12 col-md-3 mb-3" v-for="project in aiProjects" :key="project.name">
                        <a :href="project.link" target="_blank" class="block h-100 text-decoration-none">
                            <div class="bg-white rounded p-3 h-100 shadow-sm border border-gray-100 hover:shadow-md transition flex flex-col items-center justify-center text-center">
                                <h6 class="text-gray-800 font-bold mb-1">{{ project.name }}</h6>
                                <span class="text-gray-500 text-xs">{{ project.desc }}</span>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <!-- Black Background Section -->
        <div class="bg-black text-white py-5">
            <div class="max-w-screen-2xl mx-auto px-0 sm:px-2">
                <!-- Section 3: Original Footer Content -->
                <div class="row text-center pt-2">
                    <div class="col">
                        <p class="text-light font-bold mb-3">关于 Lua 社区</p>
                        <p class="text-gray-400 text-xs mb-3">Lua 社区为开发者提供学习交流的平台，内容板块为 Lua 开发，Openresty 开发，逆向分析开发，游戏逆向等</p>
                        <ul class="text-secondary p-0 list-unstyled">
                            <li><a class="text-secondary text-decoration-none hover:text-white transition" href="https://github.com/horan-geeker/nana" target="_blank" rel="nofollow">Nana 框架 (开源 Lua Web 框架)</a></li>
                            <li><a class="text-secondary text-decoration-none hover:text-white transition" href="https://github.com/luaChina/lua-china" target="_blank" rel="nofollow">社区前端 (Vue + Nuxt.js)</a></li>
                            <li><a class="text-secondary text-decoration-none hover:text-white transition" href="https://github.com/luaChina/lua-china-api" target="_blank" rel="nofollow">社区后端 (基于 Nana 完成的后端建设)</a></li>
                        </ul>
                    </div>
                    <div class="col">
                        <p class="text-light font-bold mb-3">社区共建</p>
                        <div class="text-secondary small">
                            <p class="mb-2">欢迎提 PR 增加社区能力</p>
                            <div class="wechat-qrcode-wrapper d-inline-block">
                                <span class="text-secondary pointer hover:text-white transition">任何意见和反馈都是我们前进的基石</span>
                                <img class="wechat-qrcode rounded shadow-lg" src="https://lua-china-1256147061.cos.accelerate.tencentcos.cn/public/wechat-qrcode.png" alt="WeChat QR" width="120" />
                            </div>
                            <p class="mb2 mt-2">社区使用指南</p>
                            <p class="mb2">文档撰写指南</p>
                        </div>
                    </div>
                    <div class="col">
                        <p class="text-light font-bold mb-3">社区赞助商</p>
                        <ul class="text-secondary p-0 list-unstyled">
                            <li><span class="text-secondary">空位以待</span></li>
                            <li><span class="text-secondary">有意向可以联系站长</span></li>
                        </ul>
                    </div>
                    <div class="col">
                        <p class="text-light font-bold mb-3">统计信息</p>
                        <ul class="text-secondary p-0 list-unstyled">
                            <li>会员 {{users_count}}</li>
                            <li>文章数: {{posts_count}}</li>
                            <li>话题数: ...</li>
                        </ul>
                    </div>
                </div>
                <div class="row border-top border-gray-800 mt-5 pt-4">
                    <div class="col">
                        <div class="footer-copyright text-center text-gray-500 text-xs">Designed by
                            <i class="bi bi-layout-wtf"></i>
                            <a class="text-gray-400 font-italic hover:text-white transition" href="https://github.com/horan-geeker" target="_blank" rel="nofollow"> Horan</a>
                            and
                            <a class="text-gray-400 font-italic hover:text-white transition" href="https://github.com/AmazingMoon" target="_blank" rel="nofollow"> Amazing</a>
                            <div class="mt-1"><a class="text-gray-500 font-italic text-decoration-none hover:text-white transition" href="https://beian.miit.gov.cn" target="_blank">陕ICP备16002741号</a></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import apiService from '~/services/apiService'
    import HashAvatar from "~/components/hash-avatar";

    export default {
        name: 'Footer',
        components: {
            "hash-avatar": HashAvatar,
        },
        data() {
            return {
                posts_count: 0,
                users_count: 0,
                posts: [],
                gameProjects: [
                    { name: "World of Warcraft", desc: "UI 插件和宏的脚本语言", link: "https://worldofwarcraft.com/" },
                    { name: "Roblox", desc: "在线创作平台 (Luau)", link: "https://www.roblox.com/" },
                    { name: "Defold", desc: "轻量级 2D 游戏引擎", link: "https://defold.com/" },
                    { name: "LÖVE 2D", desc: "2D 游戏开发框架", link: "https://love2d.org/" }
                ],
                webProjects: [
                    { name: "OpenResty", desc: "高性能 Web 应用平台", link: "https://openresty.org/" },
                    { name: "Kong", desc: "云原生 API 网关", link: "https://konghq.com/" },
                    { name: "Redis", desc: "高性能键值数据库", link: "https://redis.io/" },
                    { name: "Nmap", desc: "网络安全扫描扩展 (NSE)", link: "https://nmap.org/" },
                    { name: "LuaJIT", desc: "高性能 JIT 编译器", link: "http://luajit.org/" },
                    { name: "Wapiti", desc: "Web 应用漏洞扫描", link: "http://wapiti.sourceforge.net/" },
                    { name: "Wireshark", desc: "网络协议分析", link: "https://www.wireshark.org/" }
                ],
                systemProjects: [
                    { name: "LuatOS", desc: "运行在嵌入式设备的 Lua", link: "https://wiki.luatos.com/" },
                    { name: "TeX Live", desc: "强大的排版系统脚本", link: "https://www.tug.org/texlive/" },
                    { name: "Awesome WM", desc: "窗口管理器", link: "https://awesomewm.org/" },
                    { name: "Vim/Neovim", desc: "文本编辑器", link: "https://neovim.io/" },
                    { name: "FFmpeg", desc: "多媒体处理", link: "https://ffmpeg.org/" }
                ],
                aiProjects: [
                    { name: "Torch", desc: "机器学习框架", link: "http://torch.ch/" },
                    { name: "SciLua", desc: "科学计算库", link: "http://scilua.org/" }
                ]
            }
        },
        created() {
            apiService.get('/posts/count').then(response => {
                this.posts_count = response.data.data
            })
            apiService.get('/users/count').then(response => {
                this.users_count = response.data.data
            })
            apiService.get('/posts?pagesize=4').then(response => {
                this.posts = response.data.data.data
            })
        }
    }
</script>

<style lang="scss" scoped>
    /* Removed global footer background to allow split backgrounds */


    .link {
        color: #ffffff;
    }

    .footer-copyright {
        font-size: 12px;
        opacity: 0.6;
        line-height: 36px;
    }

    .wechat-qrcode {
        top: -100px;
        position: absolute;
        opacity: 0;
        transition: opacity .6s;
    }

    .wechat-qrcode-wrapper {
        position: relative;
        cursor: pointer;
        &:hover {
            .wechat-qrcode {
                opacity: 1;
            }
        }
    }

    .qq-qrcode {
        top: -100px;
        position: absolute;
        opacity: 0;
        transition: opacity .6s;
    }

    .qq-qrcode-wrapper {
        position: relative;
        cursor: pointer;
        &:hover {
            .qq-qrcode {
                opacity: 1;
            }
        }
    }

</style>
