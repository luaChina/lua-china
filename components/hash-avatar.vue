<template>
    <img :src="avatar_url" :alt="name" :width="size" :height="size">
</template>

<script>
import md5 from 'crypto-js/md5'
import Identicon from 'identicon.js'

export default {
  name: 'Avatar',
  props: ['url', 'user_id', 'size', 'name'],
  computed: {
      avatar_url() {
        if (!this.url) {
            let options = {
                // foreground: [0, 0, 0, 255],               // rgba black
                // background: [255, 255, 255, 255],         // rgba white
                margin: 0, // 0.2 20% margin
                size: this.size
            }
            let base64Img = new Identicon(md5(String(this.user_id)).toString(), options)
            return 'data:image/png;base64,' + base64Img.toString()
        }
        return this.url
      }
  }
}
</script>