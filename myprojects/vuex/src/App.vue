<template>
  <div id="app">
    {{msg}}
  </div>
</template>

<script>
export default {
  name: 'App',
  computed:{
    msg(){
       return this.$store.state.index.msg
    }
  }
}
</script>

<style>

</style>
