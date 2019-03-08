<template>
  <Modal
    v-model="cmsTemplateModal" title="常用库列表" :closable="false" width="650px" :styles="{top: '50px'}">
    <div style="height: 450px;padding: 5px">
      <Row>
        <Col span="24">
          <Form inline>
            <FormItem>
              <span>查询条件:</span>
            </FormItem>
            <Form-item>
              <Select v-model="cmsTemplatePropertyData.cmsTemplateTypeSelected" style="width:200px;text-align: left">
                <Option v-for="item in cmsTemplatePropertyData.cmsTemplateTypeList" :value="item.id" :key="item.id">
                  {{ item.name }}
                </Option>
              </Select>
            </Form-item>
            <FormItem>
              <Button type="primary" @click="cmsTemplateQuery">
                <Icon type="search"></Icon>
                查询
              </Button>
            </FormItem>
          </Form>
        </Col>
      </Row>
      <div style="height: 400px;overflow-y: auto">
        <div v-for="item in cmsTemplateList" @click="cmsTemplateSelectedOk(item)"
             class="cms-send-display"
             :style="{width: item.width + 'px',height: item.height + 'px'}">
          <div class="cms-send-display-pic" v-if="item.picContent!=501">
            <img :style="{width: item.height + 'px',height: item.height + 'px'}"
                 :src="'../../../../static/images/cmsImg/' + item.picContent + '.png'"/>
          </div>
          <div class="cms-send-display-content"
               :style="{width: item.picContent!=501?item.width-item.height:item.width+ 'px',color: getFontColor(item.fontColor) + '',fontFamily: ''+ getFontFamily(item.font) +'' ,fontSize: getFontSize(item.fontSize) + 'px',lineHeight: getFontSize(item.fontSize) + 'px',textAlign: getAlign(item.align)}">
            <div style="white-space:nowrap;" v-for="v in item.contentArr">{{v}}</div>
          </div>
        </div>
      </div>
    </div>
    <div slot="footer">
      <Button type="primary" @click="$emit('close-cms-template-modal')">关闭</Button>
    </div>
  </Modal>
</template>

<script>
  import {getFontColor, getFontFamily, getFontSize, getAlign} from "../../../common/utils/dic-util";
  import {api_listCmsTemplateByTypeAndSize} from "../../../axios/api/cms_api";

  export default {
    name: "CmsTemplateModal",
    props: ['cmsTemplateModal', 'cmsTemplatePropertyData'],
    data() {
      return {
        cmsTemplateList: []
      }
    },
    methods: {
      cmsTemplateQuery() {
        let sizeType;
        this.cmsTemplatePropertyData.cmsSizeTypeList.forEach(v => {
          if (v.width == this.cmsTemplatePropertyData.width && v.height == this.cmsTemplatePropertyData.height) {
            sizeType = v.id
          }
        });
        api_listCmsTemplateByTypeAndSize({
          type: this.cmsTemplatePropertyData.cmsTemplateTypeSelected,
          size: sizeType
        }).then(res => {
          res.data.forEach(v => {
            if (v.content.indexOf("\n") != -1) {
              v.contentArr = v.content.split("\n");
            } else {
              let arr = new Array();
              arr.push(v.content);
              v.contentArr = arr;
            }
          })
          this.cmsTemplateList = res.data;
        }).catch(err => {

        });
      },
      cmsTemplateSelectedOk(item) {
        this.$emit('cms-template-selected', item);
      },
      getFontColor(color) {
        return getFontColor(this.cmsTemplatePropertyData.dicData.fontColorList, color);
      },
      getFontFamily(font) {
        return getFontFamily(this.cmsTemplatePropertyData.dicData.fontTypeList, font);
      },
      getFontSize(fontSize) {
        return getFontSize(this.cmsTemplatePropertyData.dicData.fontSizeList, fontSize);
      },
      getAlign(align) {
        return getAlign(this.cmsTemplatePropertyData.dicData.alignTypeList, align);
      },
    },
    mounted() {
      this.$nextTick(function () {
        //this.cmsTemplateQuery()
      })
    }
  }
</script>

<style scoped>
  @import url("../../../assets/css/cms.css");
</style>
