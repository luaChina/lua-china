<template>
<div class="footer text-white">
  <div class="row p-4">
    <div class="col"><img src="~assets/svg/weixin-brands.svg" alt="weixin"></div>
    <div class="col"><img src="~assets/svg/qq-brands.svg" alt="qq"></div>
    <div class="col"><img src="~assets/svg/facebook-f-brands.svg" alt="facebook"></div>
    <div class="col"><img src="~assets/svg/twitter-brands.svg" alt="twitter"></div>
  </div>
    <div class="row text-center">
        <div class="col">
            <p class="text-light">技术支持</p>
            <ul class="text-secondary p-0 list-unstyled">
                <li>Nana 框架</li>
                <li>Openresty</li>
                <li>Kong API 网关</li>
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
    <div class="row border-top border-dark">
      <div class="col">
        <div class="footer-copyright text-center">Designed by ❤ <a class="text-white font-italic" href="https://github.com/horan-geeker">Horan</a></div>
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
.footer {
    background: #000;
}

.footer-copyright {
    font-size: 12px;
    opacity: 0.6;
    line-height: 58px;
}
</style>
