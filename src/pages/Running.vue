<template>
  <div class="running">
    <div class="running-body">
      <Map></Map>
      <Resource></Resource>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Map from './running/Map.vue'
  import Resource from './running/Resource.vue'

  export default {
    components: {
      Map,Resource
    },
    data() {
      return {}
    },
    methods: {},
    mounted: function () {
      this.$nextTick(function () {

      })
    }
  }
</script>
<style scoped>
  @import url("../assets/css/running.css");
</style>


