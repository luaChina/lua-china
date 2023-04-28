<template>
    <div class="edit-container p-3">
        <div class="card text-center" style="width: 28rem">
            <div class="card-body">
                <div
                    class="avatar-box"
                    @mouseenter="isShowUploadText = true"
                    @mouseleave="isShowUploadText = false"
                >
                    <hash-avatar
                        :url="user.avatar"
                        :user_id="user.id"
                        :size="100"
                        alt="avatar"
                        class="rounded-circle me-2"
                    ></hash-avatar>
                    <div class="upload-text" v-if="isShowUploadText">
                        点击上传
                    </div>
                    <input
                        type="file"
                        class="upload-file"
                        @change="handleFileChange($event)"
                        v-show="!isUploading"
                    />
                </div>
                <input
                    class="form-control mb-3 mt-3"
                    type="text"
                    placeholder="请输入姓名"
                    v-model.trim="user.name"
                />
                <button
                    type="button"
                    class="btn btn-primary"
                    @click="updateInfo"
                >
                    确定
                </button>
                <nuxt-link :to="'/users/' + user.id" class="btn btn-secondary"
                    >取消</nuxt-link
                >
            </div>
        </div>
    </div>
</template>

<script>
import HashAvatar from "~/components/hash-avatar";
import apiService from "~/services/apiService";
import config from "~/config/api.js";

export default {
    name: "user-details",
    components: {
        "hash-avatar": HashAvatar
    },
    data() {
        return {
            isShowUploadText: false,
            user: {},
            isUploading: false
        };
    },
    async asyncData({ params, error }) {
        return await apiService
            .get(config.apiInternalUrl + "/users/" + params.id)
            .then(res => {
                if (res.data.status === 0x010009) {
                    error({
                        statusCode: 404,
                        message: "你找到这个人在地球上没有"
                    });
                } else {
                    return { user: res.data.data };
                }
            })
            .catch(err => {
                error({
                    statusCode: 500,
                    message: "服务器挂了！赶快联系站长，13571899655@163.com"
                });
            });
    },
    methods: {
        updateInfo() {
            apiService.put("/user", this.user).then(res => {
                this.$router.push("/users/" + this.user.id);
            });
        },
        handleFileChange(e) {
            let avatar = e.target.files[0];
            if (typeof avatar === "undefined") {
                return;
            }
            let formdata = new FormData();
            formdata.append("file", avatar);
            this.isUploading = true;
            apiService
                .post("https://file.lua-china.com/v1/cos/upload/cdn", formdata)
                .then(res => {
                    this.user.avatar = res.data.data.cdn_url;
                    this.$toast({
                        type: "success",
                        message: "头像修改成功"
                    });
                    this.isUploading = false;
                });
        }
    }
};
</script>

<style scoped lang="scss">
.edit-container {
    display: flex;
    align-items: center;
    justify-content: center;
}

.avatar-box {
    position: relative;
    margin: 0 auto;
    width: 100px;
    height: 100px;
}

.rounded-circle {
    width: 100px;
    height: 100px;
}

.upload-text {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 50px;
    line-height: 45px;
    background-color: #7f828b;
    opacity: 0.8;
    overflow: hidden;
    z-index: 1;
    border-bottom-left-radius: 50px;
    border-bottom-right-radius: 50px;
    color: #ffffff;
}

.upload-file {
    z-index: 3;
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100px;
    height: 100px;
    cursor: pointer;
}
</style>
