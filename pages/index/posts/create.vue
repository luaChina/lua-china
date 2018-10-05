<template>
  <div>
      <div class="form-row form-group">
        <label for="title">文章标题</label>
        <input type="text" class="form-control" required v-model.trim="post.title">
      </div>
      <div class="form-row form-group">
        <label for="tags">文章标签</label>
        <select class="form-control" id="tags" v-model="post.tag_id">
          <option v-for="(item) in tags" :key="item.id" :value="item.id">{{item.type}}</option>
        </select>
      </div>
      <div>
        <label for="markdownSection">文章内容</label>
        <div id="markdownSection"></div>
      </div>
      <div class="form-row form-group justify-content-center">
        <button class="btn btn-lg btn-success mt-4 mb-4" type="submit" @click="submitForm()">发布</button>
      </div>
  </div>
</template>

<script>
import apiService from '~/services/apiService'

export default {
  name: 'PostCreate',
  data() {
    return {
      post: {
        title: null,
        content: null,
        tag_id: 1,
        user: {},
      },
      tags: {},
      editor: Object
    }
  },
  created() {
    this.post.content = [
        '<span style="color:#e11d21">请参考以下格式，使用Markdown书写，以下内容均可删除</span>',
        '# 这是一级标题',
        '## 这也是二级标题完全与一级标题相同，推荐使用##对SEO友好',
        '### 三级标题',
        '#### 四级标题',
        '在```之后跟上语言类型可以准确高亮',
        '```lua',
        '-- 这是foo函数',
        'function foo()',
        '    local foo = "bar"',
        '    return foo',
        'end',
        '```',
        '* list',
        '    * list indented',
        '1. ordered',
        '2. list',
        '    1. ordered list',
        '    2. indented',
        '',
        '- [ ] task',
        '- [x] list completed',
        '',
        '[link](https://nhnent.github.io/tui.editor/)',
        '> block quote',
        '---',
        'horizontal line',
        '***',
        '`code`, *italic*, **bold**, ~~strikethrough~~, <span style="color:#e11d21">Red color</span>',
        '|table|head|',
        '|---|---|',
        '|table|body|'
      ].join('\n');
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
    // require('tui-editor/dist/tui-editor-contents.css'); // editor content
    //js
    require('tui-editor/dist/tui-editor-extScrollSync.js'); // scrollSync
    var that = this
    this.editor = require('tui-editor').factory({
      initialEditType: 'markdown',
      el: document.querySelector('#markdownSection'),
      height: '700px',
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
      apiService.post('/posts', this.post).then(response => {
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