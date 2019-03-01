<template>
  <Modal v-model="showProperty" fullscreen title="情报板发送">
    <vue-tabs>
      <v-tab title="信息发送">
        <Row :gutter="8">
          <div
            style="width:620px;height: 446px;display: block;float: left;padding: 5px; border-right: 1px solid #324d5f">
            <div style="height: 396px;overflow-y: auto;border-bottom: #4d667d 1px solid;">
              <Form ref="formInline" inline style="color: #FFFFFF;font-size: 12px">
                <div
                  style="width: 605px; padding:0 0;border-bottom: #4d667d 1px solid;border-top: #4d667d 1px solid;">
                  <div>
                    <div style="white-space:nowrap;display:flex;justify-content:center;align-items:center;"
                         :style="{width: editEntity.width + 'px',height: editEntity.height + 'px', backgroundColor: 'black',margin: '0 auto'}">
                      <div style="display: block; float: left" v-if="editEntity.picContent!=701">
                        <img :style="{width: editEntity.height + 'px',height: editEntity.height + 'px'}"
                             :src="'../../../../static/images/cmsImg/' + editEntity.picContent + '.png'"/>
                      </div>
                      <!--<div id="messageShow" style="display: block; float: left;"
                           :style="{width: editEntity.picContent!=701?editEntity.width-editEntity.height:editEntity.width+ 'px',color: getFontColor(editEntity.fontColor) + '',fontFamily: ''+ getFontFamily(editEntity.font) +'' ,fontSize: editEntity.fontSize + 'px',lineHeight: editEntity.fontSize + 'px',textAlign: getAlign(editEntity.align),margin: '0 auto'}">

                      </div>-->
                    </div>
                  </div>
                </div>
                <Row style="margin-top: 10px">
                  <i-col span="3">
                    <span>文字内容：<span style="color: red">*</span></span>
                  </i-col>
                  <i-col span="21">
                    <Input v-model="editEntity.content" type="textarea" :rows="3" placeholder="请输入要发送的内容..."
                           value="前方1000米发生事故"></Input>
                  </i-col>
                </Row>
                <Row style="margin-top: 10px;">
                  <i-col span="3">
                    <span>图片内容：<span style="color: red">*</span></span>
                  </i-col>
                  <i-col span="21">
                    <Select v-model="editEntity.picContent">
                      <Option v-for="item in dicData.cmsImgList" :value="item.dicValue" :key="item.dicValue">
                        {{ item.dicName}}
                      </Option>
                    </Select>
                  </i-col>
                </Row>
                <Row style="margin-top: 10px;">
                  <i-col span="3">
                    <span>播放方式：<span style="color: red">*</span></span>
                  </i-col>
                  <i-col span="8">
                    <Select placement="top" v-model="editEntity.transition">
                      <Option v-for="item in dicData.playTypeList" :value="item.dicValue" :key="item.dicValue">
                        {{ item.dicName}}
                      </Option>
                    </Select>
                  </i-col>
                  <i-col span="3" offset="2">
                    <span>字体颜色：<span style="color: red">*</span></span>
                  </i-col>
                  <i-col span="8">
                    <Select placement="top" v-model="editEntity.fontColor">
                      <Option v-for="item in dicData.playColorList" :value="item.dicValue" :key="item.dicValue">
                        {{ item.dicName
                        }}
                      </Option>
                    </Select>
                  </i-col>
                </Row>
                <Row style="margin-top: 10px;">
                  <i-col span="3">
                    <span>字体大小：<span style="color: red">*</span></span>
                  </i-col>
                  <i-col span="8">
                    <Select placement="top" v-model="editEntity.fontSize">
                      <Option v-for="item in fontSizeList" :value="item.id" :key="item.id">
                        {{ item.name}}
                      </Option>
                    </Select>
                  </i-col>
                  <i-col span="3" offset="2">
                    <span>字体类型：<span style="color: red">*</span></span>
                  </i-col>
                  <i-col span="8">
                    <Select placement="top" v-model="editEntity.font">
                      <Option v-for="item in dicData.playFontTypeList" :value="item.dicValue" :key="item.dicValue">
                        {{ item.dicName}}
                      </Option>
                    </Select>
                  </i-col>
                </Row>
                <Row style="margin-top: 10px;">
                  <i-col span="3">
                    <span>对齐方式：<span style="color: red">*</span></span>
                  </i-col>
                  <i-col span="8">
                    <Select placement="top" v-model="editEntity.align">
                      <Option v-for="item in dicData.playAlignTypeList" :value="item.dicValue" :key="item.dicValue">
                        {{ item.dicName }}
                      </Option>
                    </Select>
                  </i-col>
                  <i-col span="3" offset="2">
                    <span>驻留时间：<span style="color: red">*</span></span>
                  </i-col>
                  <i-col span="8">
                    <Input placeholder="请输入" v-model="editEntity.delay" style="width: 100px;" :maxlength="7"/>&nbsp;&nbsp;秒
                  </i-col>
                </Row>
              </Form>
            </div>
            <div style="height: 40px;text-align: right;margin-top: 10px">
              <Button type="primary" @click="openCmsTemplateTypeModal">添加到常用库</Button>
              <Button type="primary" @click="openCmsTemplateModal">选择常用库</Button>
              <Button type="primary" @click="openCmsListModal">选择情报板</Button>
              <Button type="primary" @click="addToSendList">添加到列表</Button>
            </div>
          </div>
          <div style="width:630px;display: block;float: left;padding: 5px;  ">
            <div style="border-bottom: #4d667d 1px solid;">发送列表：</div>
            <div style="height: 65px;width:610px;border-bottom: #4d667d 1px solid;overflow-x: auto">
              <Tag color="blue" v-for="item in cmsSelectedList" :key="item.id">{{item.cmsName}}</Tag>
            </div>
            <div style="border-bottom: #4d667d 1px solid;">发送内容：</div>
            <div style="height: 280px;border-bottom: #4d667d 1px solid;overflow-y: auto;overflow-x: auto">
              <div v-for="(item,index) in cmsSendList">
                <table>
                  <tr>
                    <td>
                      <div @click="cmsSendItemClick(item)"
                           style="white-space:nowrap;margin-top: 5px;cursor: pointer;display:flex;justify-content:center;align-items:center;"
                           :style="{width: item.width + 'px',height: item.height + 'px', backgroundColor: 'black',margin: '0 auto'}">
                        <div style="display: block; float: left" v-if="item.picContent!=701">
                          <img :style="{width: item.height + 'px',height: item.height + 'px'}"
                               :src="'../../../../static/images/cmsImg/' + item.picContent + '.png'"/>
                        </div>
                        <!--<div style="display: block; float: left"
                             :style="{width: item.picContent!=701?item.width-item.height:item.width+ 'px',color: getFontColor(item.fontColor) + '',fontFamily: ''+ getFontFamily(item.font) +'' ,fontSize: item.fontSize + 'px',lineHeight: item.fontSize + 'px',textAlign: getAlign(item.align),margin: '0 auto'}">
                          <div style="white-space:nowrap;" v-for="v in item.contentArr">{{v}}</div>
                        </div>-->
                      </div>

                    </td>
                    <td>
                      <div style="display: inline-block;padding-left: 10px;">
                        <div class="closeBtn" @click="delMessage(index)">
                        </div>
                      </div>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
            <div style="height: 40px;text-align: right;margin-top: 10px">
              <Button type="primary" @click="send">发送</Button>
            </div>
          </div>
        </Row>
      </v-tab>
    </vue-tabs>
    <div slot="footer">
      <Button type="primary" @click="handleCloseClick">关闭</Button>
    </div>
  </Modal>
</template>
<script>
  import {VueTabs, VTab} from 'vue-nav-tabs'

  export default {
    name: 'cmsProperty',
    components: {
      VueTabs, VTab
    },
    model: {
      prop: 'showProperty',
      event: 'close-property'
    },
    props: {
      showProperty: {
        type: Boolean,
        default() {
          return false
        }
      },
      propertyValue: {
        type: Object,
        require: true,
        default() {
          return {
            type: 1,
            data: {},
          }
        }
      }
    },
    data() {
      return {
        editEntity:{},
        dicData:{}
      }
    },
    computed: {},
    methods: {
      handleCloseClick() {
        this.$emit('close-property', false)
      },
    }
  }
</script>
<style scoped>
  .ivu-modal-close {
    display: none !important;
  }
</style>
