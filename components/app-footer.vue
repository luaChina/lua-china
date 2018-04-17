<template>
  <div class="footer">
    <div class="footer-box">
      <div class="row">
        <div class="col-xs-12 col-sm-3">
          <p>我们是高品质的 Laravel 开发者社区，致力于为 Laravel 和 PHP 开发者提供一个分享创造、结识伙伴、协同互助的平台。</p>
          <p>
            <i class="fa fa-envelope-open"></i>
            <i class="fa fa-envelope-open"></i>
            <i class="fa fa-envelope-open"></i>
          </p>
          <p>Designed by ❤ Summer</p>
        </div>
        <div class="text-align-center col-xs-12 col-sm-3">
          <h3>赞助商</h3>
          <ul>
            <li>
              <a href="#">蓝石创想</a>
            </li>
          </ul>
        </div>
        <div class="text-align-center col-xs-12 col-sm-3">
          <h3>统计信息</h3>
          <ul>
            <li>会员 2333</li>
            <li>话题数: 7669</li>
            <li>话题数: 7669</li>
          </ul>
        </div>
        <div class="text-align-center col-xs-12 col-sm-3">
          <h3>统计信息</h3>
          <ul>
            <li>会员 2333</li>
            <li>话题数: 7669</li>
            <li>话题数: 7669</li>
          </ul>
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
  .footer{
    position: absolute;
    bottom: 0;
    width: 100%;
    margin-top: 20px;
    padding: 20px;
    background: #fff;
    overflow: hidden;
  }
  .footer-box {
    width: 80%;
    margin: 0 auto;
  }
  h3{
    color: #999;
    margin: 0 0 10px 0;
  }
  ul{
    padding-left:0;
    list-style: none;
    line-height: 25px;
  }
  .text-align-center{
    text-align: center;
  }
  @media (max-width: 768px) {
    .text-align-center{
      text-align: left;
    }
  }
</style>
