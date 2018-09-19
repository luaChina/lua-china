<template>
<div class="container-fluid bg-dark text-white">
  <nav class="p-5 text-center d-flex justify-content-center">
    <div class="mr-5 wechat-qrcode-wrapper">
        <img class="social-logo" src="~assets/svg/weixin-brands.svg" alt="weixin">
        <div class="d-flex justify-content-center">
            <img class="wechat-qrcode" src="~/assets/images/wechat-qrcode-100x100.jpeg" alt="wechat">
        </div>
    </div>
    <div class="mr-5 qq-qrcode-wrapper">
        <img class="social-logo" src="~assets/svg/qq-brands.svg" alt="qq">
        <div class="d-flex justify-content-center">
            <img class="qq-qrcode" src="~/assets/images/qq-group-qrcode-100x100.jpeg" alt="wechat">
        </div>
    </div>
    <div>
        <a class="mr-5"><img class="social-logo" src="~assets/svg/facebook-f-brands.svg" alt="facebook"></a>
    </div>
    <div>
        <a><img class="social-logo" src="~assets/svg/twitter-brands.svg" alt="twitter"></a>
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
                <li>会员 2333</li>
                <li>文章数: 666</li>
                <li>话题数: 7669</li>
            </ul>
        </div>
  </div>
  <div>
    <div class="row border-top border-secondary">
      <div class="col">
        <div class="footer-copyright text-center">Designed by <img src="~/assets/svg/heart-solid.svg"> <a class="text-white font-italic" href="https://github.com/horan-geeker"> Horan</a></div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
    name: 'App'
}
</script>

<style lang="scss">
.footer-copyright {
    font-size: 12px;
    opacity: 0.6;
    line-height: 58px;
}

 .social-logo {
     color: #000000;
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
