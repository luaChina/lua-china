<template>
    <div>
        <no-ssr>
            <div class="form-row form-group mb-3">
                <label for="title" class="form-label">文章标题</label>
                <input
                    type="text"
                    class="form-control"
                    required
                    v-model.trim="post.title"
                />
            </div>
            <div class="form-row form-group mb-3">
                <label for="tags" class="form-label">文章标签</label>
                <select class="form-control" id="tags" v-model="post.tag_id">
                    <option
                        v-for="item in tags"
                        :key="item.id"
                        :value="item.id"
                        >{{ item.type }}</option
                    >
                </select>
            </div>
            <div>
                <label for="markdownSection" class="form-label">文章内容</label>
                <markdown-editor ref="editor" :edit="false"></markdown-editor>
            </div>
            <div class="form-row form-group justify-content-center">
                <button
                    class="btn btn-lg btn-success mt-4 mb-4"
                    type="submit"
                    @click="submitForm()"
                >
                    发布
                </button>
            </div>
        </no-ssr>
    </div>
</template>

<script>
import apiService from "~/services/apiService";
import localStorage from "~/utils/localStorage";

export default {
    name: "PostCreate",
    data() {
        return {
            post: {
                title: null,
                content: null,
                tag_id: 1,
                user: {}
            },
            tags: {},
            editor: Object
        };
    },
    created() {
        apiService.get("/tags").then(response => {
            this.tags = response.data.data;
        });
    },
    methods: {
        submitForm() {
            if (!this.post.title) {
                this.$toast({
                    type: "error",
                    message: "请填写文章标题"
                });
                return;
            }
            this.post.content = this.$refs.editor.getContent();
            if (!this.post.content) {
                this.$toast({
                    type: "error",
                    message: "请填写文章内容"
                });
                return;
            }
            apiService.post("/posts", this.post).then(response => {
                this.$toast({
                    type: "success",
                    message: "发布成功"
                });
                // 触发子组件 destroy 消除定时器
                this.$router.push("/");
                // 定时器消除后删除 localstorage
                localStorage.delete("smde_article");
            });
        }
    }
};
</script>
