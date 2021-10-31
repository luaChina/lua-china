<template>
    <div class="footer container-fluid text-white mt-5 pt-4">
        <div class="row text-center">
            <div class="col">
                <p class="text-light">技术支撑</p>
                <ul class="text-secondary p-0 list-unstyled">
                    <li><a class="text-secondary" href="https://github.com/horan-geeker/nana" rel="nofollow">Nana 框架</a></li>
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
                    <i class="bi bi-layout-wtf"></i>
                    <a class="text-white font-italic" href="https://github.com/horan-geeker" target="_blank" rel="nofollow"> Horan</a>
                    and
                    <a class="text-white font-italic" href="https://github.com/AmazingMoon" target="_blank" rel="nofollow"> Amazing</a>
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
