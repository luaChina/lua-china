<template>
    <div>
        <client-only>
            <div class="form-row form-group">
                <label for="title">文章标题</label>
                <input
                    type="text"
                    class="form-control"
                    required
                    v-model.trim="post.title"
                />
            </div>
            <div class="form-row form-group">
                <label for="tags">文章标签</label>
                <select
                    class="form-control"
                    id="tags"
                    v-model="post.post_tag_id"
                >
                    <option
                        v-for="item in tags"
                        :key="item.id"
                        :value="item.id"
                        >{{ item.type }}</option
                    >
                </select>
            </div>
            <div>
                <label for="markdownSection">文章内容</label>
                <markdown-editor
                    ref="editor"
                    :post="post"
                    :edit="true"
                ></markdown-editor>
            </div>
            <div class="form-row form-group justify-content-center">
                <button
                    class="btn btn-lg btn-success mt-4 mb-4"
                    type="submit"
                    @click="submitForm()"
                >
                    提交
                </button>
            </div>
        </client-only>
    </div>
</template>

<script>
import apiService from "~/services/apiService";
import { authInfo } from "~/utils/helper";

export default {
    name: "PostCreate",
    data() {
        return {
            post: {
                title: null,
                content: null,
                post_tag_id: 1,
                user: {}
            },
            tags: {},
            editor: Object,
            auth: { id: 0 }
        };
    },
    mounted() {
        if (authInfo()) {
            this.auth = authInfo();
        }
        apiService.get("/tags").then(response => {
            this.tags = response.data.data;
        });
        apiService
            .get("/posts/" + this.$route.params.id + "/edit")
            .then(response => {
                this.post = response.data.data;
                this.$refs.editor.setContent(this.post.content);
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
            let post = {
                title: this.post.title,
                post_tag_id: this.post.post_tag_id,
                content: this.post.content
            };
            apiService
                .put("/posts/" + this.$route.params.id, post)
                .then(response => {
                    this.$toast({
                        type: "success",
                        message: "发布成功"
                    });
                    this.$router.push("/");
                });
        }
    }
};
</script>
