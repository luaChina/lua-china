<template>
    <div class="footer container-fluid text-white mt-5">
        <nav class="p-4 text-center d-flex justify-content-center">
            <div class="mr-5">
                <a target="_blank" href="https://github.com/luaChina" class="link">
                    <font-awesome-icon :icon="['fab', 'github']" style="width: 21px;height: auto"/>
                </a>
            </div>
            <div class="mr-5 wechat-qrcode-wrapper" data-toggle="tooltip" data-placement="bottom" title="联系作者">
                <font-awesome-icon :icon="['fas', 'comment']" style="width: 21px;height: auto"/>
                <div class="d-flex justify-content-center">
                    <img class="wechat-qrcode" src="~/assets/images/wechat-qrcode-100x100.jpeg" alt="wechat">
                </div>
            </div>
            <div class="mr-5 qq-qrcode-wrapper" data-toggle="tooltip" data-placement="bottom" title="加入 qq 群">
                <font-awesome-icon :icon="['fab', 'qq']" style="width: 18px;height: auto"/>
                <div class="d-flex justify-content-center">
                    <img class="qq-qrcode" src="~/assets/images/qq-group-qrcode-100x100.jpeg" alt="wechat">
                </div>
            </div>
            <div>
                <a target="_blank" href="https://www.facebook.com/groups/2274306536124822/" class="mr-5 link">
                    <font-awesome-icon :icon="['fab', 'facebook']" style="width: 21px;height: auto"/>
                </a>
            </div>
            <div>
                <a target="_blank" href="https://twitter.com/horan18927220" class="link">
                    <font-awesome-icon :icon="['fab', 'twitter']" style="width: 21px;height: auto"/>
                </a>
            </div>
        </nav>
        <div class="row text-center">
            <div class="col">
                <p class="text-light">技术支撑</p>
                <ul class="text-secondary p-0 list-unstyled">
                    <li><a class="text-secondary" href="https://github.com/horan-geeker/nana">Nana 框架</a></li>
                    <li>Kong API 网关</li>
                    <li>Nuxt 服务端渲染</li>
                </ul>
            </div>
            <div class="col">
                <p>统计信息</p>
                <ul class="text-secondary p-0 list-unstyled">
                    <li>会员 {{users_count}}</li>
                    <li>文章数: {{posts_count}}</li>
                    <li>话题数: ...</li>
                </ul>
            </div>
        </div>
        <div class="row border-top border-dark">
            <div class="col">
                <div class="footer-copyright text-center">Designed by
                    <font-awesome-icon :icon="['fab', 'sketch']" style="width: 18px;height: auto;"/>
                    <a class="text-white font-italic" href="https://github.com/horan-geeker" target="_blank"> Horan</a>
                    and
                    <a class="text-white font-italic" href="https://github.com/AmazingMoon" target="_blank"> Amazing</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import apiService from '~/services/apiService'

    export default {
        name: 'Footer',
        data() {
            return {
                posts_count: 0,
                users_count: 0,
            }
        },
        created() {
            apiService.get('/posts/count').then(response => {
                this.posts_count = response.data.data
            })
            apiService.get('/users/count').then(response => {
                this.users_count = response.data.data
            })
        }
    }
</script>

<style lang="scss" scoped>
    .footer {
        background-color: #000;
    }

    .link {
        color: #ffffff;
    }

    .footer-copyright {
        font-size: 12px;
        opacity: 0.6;
        line-height: 58px;
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
