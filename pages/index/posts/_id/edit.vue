<template>
  <div>
      <div class="form-row form-group">
        <label for="title">文章标题</label>
        <input type="text" class="form-control" required v-model.trim="post.title">
      </div>
      <div class="form-row form-group">
        <label for="tags">文章标签</label>
        <select class="form-control" id="tags" v-model="post.post_tag_id">
          <option v-for="(item) in tags" :key="item.id" :value="item.id">{{item.type}}</option>
        </select>
      </div>
      <div>
        <label for="markdownSection">文章内容</label>
        <div id="markdownSection"></div>
      </div>
      <div class="form-row form-group justify-content-center">
        <button class="btn btn-lg btn-success mt-4 mb-4" type="submit" @click="submitForm()">提交</button>
      </div>
  </div>
</template>


<script>
import apiService from '~/services/apiService'

export default {
  name: 'PostCreate',
  props: ['auth'],
  data() {
    return {
      post: {
        title: null,
        content: null,
        post_tag_id: 1,
        user: {},
      },
      tags: {},
      editor: Object
    }
  },
  created() {
     // if not login
    if (!this.auth) {
      return this.$router.push('/login')
    }
    apiService.get('/tags').then(response => {
      this.tags = response.data.data
    })
  },
  mounted() {
    //editor css
    require('codemirror/lib/codemirror.css'); // codemirror
    require('tui-editor/dist/tui-editor.css'); // editor ui
    require('codemirror/theme/monokai.css'); // codemirror
    require('tui-editor/dist/tui-editor-extColorSyntax.js')
    // viewer style
    require('highlight.js/styles/monokai.css'); // code block highlight
    //js
    require('tui-editor/dist/tui-editor-extScrollSync.js'); // scrollSync
    apiService.get('/posts/' + this.$route.params.id).then(response => {
      if (response.data.status === 0) {
        this.post = response.data.data
        if (this.auth.id !== this.post.user_id) {
          this.$notify({
              type: 'error',
              group: 'tip',
              duration: 2000,
              title: '这不是你的文章，不可编辑',
          })
          return
        }
        var that = this
        this.editor = require('tui-editor').factory({
          initialEditType: 'markdown',
          el: document.querySelector('#markdownSection'),
          height: '800px',
          initialValue: this.post.content,
          previewStyle: 'vertical',
          exts: ['scrollSync', 'colorSyntax'],
          hooks: {
            addImageBlobHook(blob, callback) {
              return callback('image url', 'image alt')
            }
          },
          events: {
            load() {
              
            },
            change(codeBlockElement) {
              that.post.content = that.editor.getValue()
            }
          },
          language: 'zh_CN',
          usageStatistics: false
        })
        let codeMirror = this.editor.getCodeMirror()
        codeMirror.setOption('theme', 'monokai')
        codeMirror.setOption('lineNumbers', true)
      }
    })
  },
  methods: {
    submitForm() {
      if (!this.post.title) {
        this.$notify({
            type: 'error',
            group: 'tip',
            duration: 2000,
            title: '请填写文章标题',
        })
        return
      }
      if (!this.post.content) {
        this.$notify({
            type: 'error',
            group: 'tip',
            duration: 2000,
            title: '请填写文章内容',
        })
        return
      }
      let post = {
        title: this.post.title,
        post_tag_id: this.post.post_tag_id,
        content: this.post.content
      }
      apiService.put('/posts/' + this.$route.params.id, post).then(response => {
        if (response.data.status === 0) {
          this.$notify({
              type: 'success',
              group: 'tip',
              duration: 2000,
              title: '发布成功',
          })
          this.$router.push('/')
        } else {
          this.$notify({
              type: 'error',
              group: 'tip',
              duration: 2000,
              title: response.data.msg,
          })
        }
      })
    }
  }
}
</script>