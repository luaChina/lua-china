<template>
<div class="footer container-fluid text-white mt-5">
  <nav class="p-4 text-center d-flex justify-content-center">
    <div class="mr-5">
        <a target="_blank" href="https://github.com/luaChina">
            <svg width="21" height="21" fill="#fff" aria-labelledby="simpleicons-github-icon" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title id="simpleicons-github-icon">LuaChina github</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
        </a>
    </div>
    <div class="mr-5 wechat-qrcode-wrapper" data-toggle="tooltip" data-placement="bottom" title="联系作者">
        <svg width="22" height="18" aria-hidden="true" data-prefix="fas" data-icon="comment" class="svg-inline--fa fa-comment fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#fff" d="M256 32C114.6 32 0 125.1 0 240c0 49.6 21.4 95 57 130.7C44.5 421.1 2.7 466 2.2 466.5c-2.2 2.3-2.8 5.7-1.5 8.7S4.8 480 8 480c66.3 0 116-31.8 140.6-51.4 32.7 12.3 69 19.4 107.4 19.4 141.4 0 256-93.1 256-208S397.4 32 256 32z"></path></svg>
        <div class="d-flex justify-content-center">
            <img class="wechat-qrcode" src="~/assets/images/wechat-qrcode-100x100.jpeg" alt="wechat">
        </div>
    </div>
    <div class="mr-5 wechat-qrcode-wrapper" data-toggle="tooltip" data-placement="bottom" title="加入微信群">
        <svg width="22" height="18" aria-hidden="true" data-prefix="fab" data-icon="weixin" class="svg-inline--fa fa-weixin fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#fff" d="M385.2 167.6c6.4 0 12.6.3 18.8 1.1C387.4 90.3 303.3 32 207.7 32 100.5 32 13 104.8 13 197.4c0 53.4 29.3 97.5 77.9 131.6l-19.3 58.6 68-34.1c24.4 4.8 43.8 9.7 68.2 9.7 6.2 0 12.1-.3 18.3-.8-4-12.9-6.2-26.6-6.2-40.8-.1-84.9 72.9-154 165.3-154zm-104.5-52.9c14.5 0 24.2 9.7 24.2 24.4 0 14.5-9.7 24.2-24.2 24.2-14.8 0-29.3-9.7-29.3-24.2.1-14.7 14.6-24.4 29.3-24.4zm-136.4 48.6c-14.5 0-29.3-9.7-29.3-24.2 0-14.8 14.8-24.4 29.3-24.4 14.8 0 24.4 9.7 24.4 24.4 0 14.6-9.6 24.2-24.4 24.2zM563 319.4c0-77.9-77.9-141.3-165.4-141.3-92.7 0-165.4 63.4-165.4 141.3S305 460.7 397.6 460.7c19.3 0 38.9-5.1 58.6-9.9l53.4 29.3-14.8-48.6C534 402.1 563 363.2 563 319.4zm-219.1-24.5c-9.7 0-19.3-9.7-19.3-19.6 0-9.7 9.7-19.3 19.3-19.3 14.8 0 24.4 9.7 24.4 19.3 0 10-9.7 19.6-24.4 19.6zm107.1 0c-9.7 0-19.3-9.7-19.3-19.6 0-9.7 9.7-19.3 19.3-19.3 14.5 0 24.4 9.7 24.4 19.3.1 10-9.9 19.6-24.4 19.6z"></path></svg>
        <div class="d-flex justify-content-center">
            <img class="wechat-qrcode" src="https://lua-china.oss-cn-beijing.aliyuncs.com/wechat-group-100x100.jpeg" alt="wechat">
        </div>
    </div>
    <div class="mr-5 qq-qrcode-wrapper" data-toggle="tooltip" data-placement="bottom" title="加入 qq 群">
        <svg width="22" height="18" aria-hidden="true" data-prefix="fab" data-icon="qq" class="svg-inline--fa fa-qq fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#fff" d="M433.754 420.445c-11.526 1.393-44.86-52.741-44.86-52.741 0 31.345-16.136 72.247-51.051 101.786 16.842 5.192 54.843 19.167 45.803 34.421-7.316 12.343-125.51 7.881-159.632 4.037-34.122 3.844-152.316 8.306-159.632-4.037-9.045-15.25 28.918-29.214 45.783-34.415-34.92-29.539-51.059-70.445-51.059-101.792 0 0-33.334 54.134-44.859 52.741-5.37-.65-12.424-29.644 9.347-99.704 10.261-33.024 21.995-60.478 40.144-105.779C60.683 98.063 108.982.006 224 0c113.737.006 163.156 96.133 160.264 214.963 18.118 45.223 29.912 72.85 40.144 105.778 21.768 70.06 14.716 99.053 9.346 99.704z"></path></svg>
        <div class="d-flex justify-content-center">
            <img class="qq-qrcode" src="~/assets/images/qq-group-qrcode-100x100.jpeg" alt="wechat">
        </div>
    </div>
    <div>
        <a target="_blank" href="https://www.facebook.com/groups/2274306536124822/" class="mr-5">
            <svg width="20" height="18" aria-hidden="true" data-prefix="fab" data-icon="facebook-f" class="svg-inline--fa fa-facebook-f fa-w-9" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 264 512"><path fill="#fff" d="M76.7 512V283H0v-91h76.7v-71.7C76.7 42.4 124.3 0 193.8 0c33.3 0 61.9 2.5 70.2 3.6V85h-48.2c-37.8 0-45.1 18-45.1 44.3V192H256l-11.7 91h-73.6v229"></path></svg>
        </a>
    </div>
    <div>
        <a target="_blank" href="https://twitter.com/horan18927220">
            <svg width="22" height="18" aria-hidden="true" data-prefix="fab" data-icon="twitter" class="svg-inline--fa fa-twitter fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#fff" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path></svg>
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
  <div>
    <div class="row border-top border-dark">
      <div class="col">
        <div class="footer-copyright text-center">Designed by <svg width="18" height="18" aria-hidden="true" data-prefix="fas" data-icon="heart" class="svg-inline--fa fa-heart fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="red" d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path></svg> <a class="text-white font-italic" href="https://github.com/horan-geeker"> Horan</a></div>
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

<style lang="scss">
.footer {
    background-color: #000;
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
