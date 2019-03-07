<template>
  <div>
    <!-- 地图容器 -->
    <div id="mapNode" :style="{height: mapHeight + 'px'}"></div>
    <Cms v-model="showModal" :showProperty="showModal" :propertyValue="propertyData"/>
  </div>
</template>
<script type="text/ecmascript-6">
  import MapUtil from "../../common/utils/amap-util";
  import Bus from '../../bus/bus'
  import Cms from './property/Cms.vue'

  let mapHelper = new MapUtil();
  let map;
  let cmsLayer;
  export default {
    components: {Cms},
    data() {
      return {
        mapHeight: document.body.clientHeight - 60,
        showModal: false,
        propertyData: {}
      }
    },
    methods: {
      refreshHeight() {
        this.mapHeight = document.body.clientHeight - 60;
      },
      //初始化地图
      initMap() {
        //地图对象
        let target = 'mapNode';
        let center = window.mapCenter;
        let zooms = window.mapZooms;
        let zoom = window.mapZoom;
        map = mapHelper.createMap(target, center, zooms, zoom);

        //设置地图样式
        let mapStyle = window.mapStyle;
        mapHelper.setMapStyle(map, mapStyle);

        //实时路况图层
        mapHelper.addTrafficLayer(map);

        //初始化突情报板图层
        cmsLayer = mapHelper.addLayer(map);

        //设置甘肃省边界
        //let area = window.mapArea;
        //mapHelper.selectArea(map, area);
      },
      //添加标记位置
      addMarkers(params) {
        let image = "../../../static/images/marker/marker_cms24.png";
        let layer = cmsLayer;

        let markers = [];
        params.data.forEach(v => {
          console.log(v)
          if (v.longitude != null && v.latitude != null) {
            if (v.normal == 1) {
              image = "../../../static/images/marker/marker_cms24.png";
            } else {
              image = "../../../static/images/marker/marker_cmsError24.png";
            }

            let marker = mapHelper.createMarker(v.longitude, v.latitude, image, v);
            markers.push(marker);
          }
        });
        mapHelper.addMarkers(layer, markers);
      },
      //资源点击事件
      resourceClick(item) {
        this.propertyData = item;
        this.showModal = true;
      }
    },
    //生命周期钩子函数
    mounted() {
      this.$root.$on('fullScreen', this.refreshHeight);
      Bus.$on("running_resource_marker_add", this.addMarkers);
      Bus.$on("running_resource_marker_click", this.resourceClick);
      this.$nextTick(() => {
        //初始化地图
        this.initMap();
      })
    },
    beforeDestroy() {
      this.$root.$off('fullScreen');
    }
  }
</script>
<style scoped>

</style>
