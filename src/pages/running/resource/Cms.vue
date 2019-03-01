<template>
  <div class="resource-page" :style="{height: contentHeight+'px'}">
    <div class="item-card" v-for="(item ,index) in cmsData"
         @click="eventClick(item)">
      <Row>
        <Col span="20" class="item-card-content">
          <Row class="item-card-content-title">
            <Col span="24" class="item-card-content-title-p">
              {{item.name}}
            </Col>
          </Row>
          <Row class="item-card-content-remark">
            <Col span="24">
              <span>路线：{{item.roadCode}}（{{item.directionCode == 1 ? '上行' : '下行'}}）</span>,
              <span>桩号：{{item.mileage}}</span>
            </Col>
          </Row>
        </Col>
        <Col span="4" class="item-card-title">
          <div v-if="item.status==1" class="normal">
            正常
          </div>
          <div v-else="" class="off-line">
            离线
          </div>
        </Col>
      </Row>
    </div>
  </div>
</template>
<script>
  import Bus from '../../../bus/bus'

  export default {
    components: {},
    data() {
      return {
        contentHeight: 0,
        cmsData: [
          {
            name: '大湾互通情报板',
            roadCode: 'G30',
            directionCode: 1,
            mileage: 'K450+100',
            status: 1
          },
          {
            name: '大屿山情报板',
            roadCode: 'G30',
            directionCode: 1,
            mileage: 'K480+100',
            status: 0
          }
        ],
      }
    },
    methods: {
      refreshTabPannelHeight() {
        this.contentHeight = this.$parent.$parent.$el.offsetHeight - 52;
      },

      initData() {
        this.cmsData = [
          {
            name: '大湾互通情报板',
            roadCode: 'G30',
            directionCode: 1,
            mileage: 'K450+100',
            status: 1,
            longitude: 100.79957,
            latitude: 37.243287
          },
          {
            name: '大屿山情报板',
            roadCode: 'G30',
            directionCode: 1,
            mileage: 'K480+100',
            status: 0,
            longitude: 100.99957,
            latitude: 37.443287
          }
        ];

        let params = {
          type: 1,
          data: this.cmsData
        };

        //通知Map组件向地图中添加标注
        Bus.$emit("running_resource_marker_add", params);
      },

      eventClick(item) {
        let params = {
          type: 1,
          data: item
        };
        Bus.$emit("running_resource_marker_click", params);
      }
    },
    mounted: function () {
      this.$root.$on('fullScreen', this.refreshTabPannelHeight);
      this.$nextTick(() => {
        this.refreshTabPannelHeight();
        this.initData();
      });
    },
    beforeDestroy() {
      this.$root.$off('fullScreen');
    }
  }
</script>
<style scoped>
  @import url("../../../assets/css/running-resource.css");
</style>
