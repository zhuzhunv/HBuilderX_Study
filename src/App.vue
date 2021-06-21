<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import * as font from '@/util/font'

export default {
  name: 'App',
  created() {
    font.setRem()
  },
}
</script>

<style lang='scss'>

</style>
