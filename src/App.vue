<template>
  <div id="app">
    <loading v-if="loading"></loading>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import loading from "./components/loding.vue"
export default {
  name: 'App',
  components:{
    loading
  },
  computed:{
    loading(){
      return this.$store.state.loading
    }
  }
}
</script>

<style>
</style>
