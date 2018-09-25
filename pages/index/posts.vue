<template>
    <div class="p-0">
        <div class="row">
            <div class="col-lg-9 col-sm-12 mb-4">
                <div class="card">
                    <div class="card-header">
                        <ul class="nav nav-tabs card-header-tabs">
                            <li class="nav-item">
                                <router-link class="nav-link text-muted active" :to="buildParams('/posts', {'type':'news'})" id="nav-news" aria-selected="true">最新</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link class="nav-link text-muted" to="/posts?type=hot" id="nav-hot" aria-selected="false">精华</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link class="nav-link text-muted" to="/posts?type=discuss" id="nav-discuss" aria-selected="false">回复最多</router-link>
                            </li>
                        </ul>
                    </div>
                    <div class="tab-content border border-top-0 side-left" id="nav-tabContent">
                        <router-view></router-view>
                    </div>
                </div>
            </div>
            <div class="col p-0">
                <div class="border bg-white mb-4">
                    <div class="text-muted border-bottom text-center right-card-title">社区公告</div>
                    <div class="announcement-content p-4 text-muted">祝贺 LuaChina 社区成功上线，qq群：284519473</div>
                </div>
                <div class="border bg-white active-user mb-4">
                    <div class="text-muted border-bottom text-center right-card-title">本周活跃用户</div>
                    <div class="p-2 text-muted">
                        <ul>
                            <li>Horan</li>
                            <li>诸葛亮</li>
                            <li>司马懿</li>
                            <li>王阳明</li>
                            <li>姬昌</li>
                        </ul>
                    </div>
                </div>
                <div class="bg-white border advertising">
                    <div class="text-muted border-bottom text-center right-card-title">广告位</div>
                    <div><img class="img-fluid" src="~/assets/images/lua-logo.jpg" alt="adv"></div>
                    <div class="announcement-content p-4 text-muted">祝贺 LuaChina 社区成功上线，qq群：284519473</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'PostIndex',
  methods: {
      buildParams(url, orignalParam) {
        return url;
      }
  }
}
</script>

<style>
.side-left {
  min-height: 600px;
}
.right-card-title {
    background-color: #eee;
    line-height: 30px;
}
.announcement-content {
    font-size: 14px;
    line-height: 30px;
}
</style>
