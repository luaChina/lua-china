<template>
    <post-component></post-component>
</template>

<script>
import PostComponent from './posts/index'
export default {
  name: 'Index',
  components: {
    'post-component': PostComponent
  }
}
</script>