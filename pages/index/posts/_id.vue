<template>
  <div class="row">
    <div class="col-md-9">
      <div class="block-content">
        <div class="text-center">
          <h1 class="title">
            {{post.title}}
          </h1>
          <div class="post-info">
            <span><i class="fa fa-clock-o"></i> 1个月前</span>
            <span><i class="fa fa-eye"></i> {{post.read_count}}</span>
            <span><i class="fa fa-thumbs-o-up"></i> {{post.favor_count}}</span>
            <span><i class="fa fa-comments-o"></i> {{post.comment_count}}</span>
            </div>
        </div>
        <div id="viewerSection"></div>
      </div>
    </div>
    <div class="col-md-3">
      <div class="block-content">
        <div class="text-center author">
          作者: {{post.user.name}}
        </div>
        <div class="border-1px"></div>
        <div class="row">
          <div class="col-md-12">
            <div class="userinfo">
              <img :src="post.user.avatar" alt="头像" class="center-block img-responsive img-circle avatar">
              <div class="text-center">
                <div class="userinfo">
                  <i class="fa fa-map-marker"></i> {{post.user.city}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import crypto from 'crypto'
import Identicon from 'identicon.js'

require('tui-editor/dist/tui-editor-contents.css'); // editor content
require('highlight.js/styles/github.css'); // code block highlight
import axios from 'axios'
import Mock from 'mockjs'

export default {
  name: 'PostDetail',
  data () {
    return {
      post: {
        user: Object,
        editor: Object
      }
    }
  },
  mounted () {
    this.getPost()
  },
  methods: {
    getPost () {
      return this.$http.get('http://rapapi.org/mockjsdata/31154/posts/1')
        .then(response => {
          return Mock.mock(response.data)
        }).then(response => {
          if (response.status === 0) {
            this.post = response.data.post
            // @todo add if
            this.post.user.avatar = this.buildAvatar(this.post.user.id)
            this.editor = new window.tuiEditor.factory({
              viewer: true,
              el: document.querySelector('#viewerSection'),
              previewStyle: 'vertical',
              height: '300px',
              initialValue: this.post.content
            });
          }
        }).catch(response => {
          console.log(response)
        })
    },
    buildAvatar(id) {
      let hash = crypto.createHash('md5')
      hash.update(String(id)) // id
      let options = {
        // foreground: [0, 0, 0, 255],               // rgba black
        // background: [255, 255, 255, 255],         // rgba white
        margin: 0,                              // 0.2 20% margin
        size: 120,
      }
      let base64Img = new Identicon(hash.digest('hex'), options)
      return 'data:image/png;base64,' + base64Img.toString()
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import './assets/scss/app.scss';
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
