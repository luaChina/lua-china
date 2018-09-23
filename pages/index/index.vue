<template>
    <div>
        <div class="row">
            <div class="side-left col-9 border mr-4 mb-4">
                posts list
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

<style>
.side-left {
  background: #fff;
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
