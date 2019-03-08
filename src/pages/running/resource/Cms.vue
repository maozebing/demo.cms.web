<template>
  <div class="resource-page" :style="{height: contentHeight+'px'}">
    <div class="item-card" v-for="(item ,index) in cmsData"
         @click="eventClick(item)">
      <Row>
        <Col span="20" class="item-card-content">
          <Row class="item-card-content-title">
            <Col span="24" class="item-card-content-title-p">
              {{item.cmsName}}
            </Col>
          </Row>
          <Row class="item-card-content-remark">
            <Col span="24">
              <span>路线：{{item.roadCode}}（{{item.directionCode == 1 ? '上行' : '下行'}}）</span>,
              <span>桩号：{{formatMileAge(item.mileage)}}</span>
            </Col>
          </Row>
        </Col>
        <Col span="4" class="item-card-title">
          <div v-if="item.normal==1" class="normal">
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
  import {api_listCms} from "../../../axios/api/cms_api";
  import {formatMileAge} from "../../../common/utils/util";

  export default {
    components: {},
    data() {
      return {
        formatMileAge,
        contentHeight: 0,
        cmsData: [],
      }
    },
    methods: {
      refreshTabPannelHeight() {
        this.contentHeight = this.$parent.$parent.$el.offsetHeight - 52;
      },

      initData() {
        api_listCms({}).then(res=>{
          this.cmsData=res.data;

          let params = {
            type: 1,
            data: res.data
          };

          //通知Map组件向地图中添加标注
          Bus.$emit("running_resource_marker_add", params);
        }).catch(err=>{

        });
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
