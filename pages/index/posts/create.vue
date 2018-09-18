<template>
  <div class="row">
    <div class="col-md-9">
      <div class="block-content">
        <div class="text-center">
          <h2 class="title">
            {{post.title}}
          </h2>
          <div class="post-info">
            <span>
              <i class="fa fa-clock-o"></i> 1个月前</span>
            <span>
              <i class="fa fa-eye"></i> {{post.read_count}}</span>
            <span>
              <i class="fa fa-thumbs-o-up"></i> {{post.favor_count}}</span>
            <span>
              <i class="fa fa-comments-o"></i> {{post.comment_count}}</span>
          </div>
        </div>
        <div id="editSection"></div>
      </div>
    </div>
  </div>

</template>

<script>
require('codemirror/lib/codemirror.css') // codemirror
require('tui-editor/dist/tui-editor.css') // editor ui
require('tui-editor/dist/tui-editor-contents.css') // editor content
require('highlight.js/styles/github.css') // code block highlight
export default {
  name: 'PostCreate',
  data() {
    return {
      post: {
        user: Object,
        editor: Object
      },
      here: '',
      there: ''
    }
  },
  created() {},
  mounted() {
    this.editor = new window.tuiEditor.factory({
      el: document.querySelector('#editSection'),
      initialEditType: 'markdown',
      previewStyle: 'vertical',
      height: '300px',
      hooks: {
        addImageBlobHook(blob, callback) {
          return callback('image url', 'image alt')
        }
      },
      events: {
        change() {}
      }
    })
  },
  methods: {
    nextInput() {
      console.log('here', this.here)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '~bootstrap/scss/bootstrap';
.block-content {
  background-color: #fff;
  border: 1px solid #dde2e8;
  padding: 40px;
  margin-bottom: 20px;
}
.title {
  margin-top: 40px;
}
.author {
  padding: 0 0 10px 0;
  color: #aaa;
}
.border-1px {
  border: 1px solid #f8f8f8;
}
.avatar {
  width: 140px;
  height: 140px;
}
.app-container {
  padding: 15px;
}
.userinfo {
  margin: 20px;
}
.post-info {
  margin: 20px 0;
  color: #aaa;
}
.post-info span {
  margin: 5px;
}
</style>
