<template>
  <div>
    <div class="cms-edit">
      <Row :gutter="8" class="margin-top">
        <Col span="12">
          <div class="cms-send-display" :style="{width: editEntity.width + 'px',height: editEntity.height + 'px'}">
            <div class="cms-send-display-pic" v-if="editEntity.picContent!=501">
              <img :style="{width: editEntity.height + 'px',height: editEntity.height + 'px'}"
                   :src="'../../../../static/images/cmsPic/' + editEntity.picContent + '.png'"/>
            </div>
            <div id="messageShow" class="cms-send-display-content"
                 :style="{width: editEntity.picContent!=501?editEntity.width-editEntity.height:editEntity.width+ 'px',color: getFontColor(editEntity.fontColor) + '',fontFamily: ''+ getFontFamily(editEntity.font) +'' ,fontSize: getFontSize(editEntity.fontSize)+ 'px',lineHeight: getFontSize(editEntity.fontSize) + 'px',textAlign: getAlign(editEntity.align)}">

            </div>
          </div>
          <Row class="margin-top">
            <i-col span="3">
              <span>文字内容：<span style="color: red">*</span></span>
            </i-col>
            <i-col span="21">
              <Input v-model="editEntity.content" type="textarea" :rows="3" placeholder="请输入要发送的内容..."></Input>
            </i-col>
          </Row>
          <Row class="margin-top">
            <i-col span="3">
              <span>图片内容：<span style="color: red">*</span></span>
            </i-col>
            <i-col span="21">
              <Select v-model="editEntity.picContent">
                <Option v-for="item in dicData.cmsPicTypeList" :value="item.dicValue" :key="item.dicValue">
                  {{ item.dicName}}
                </Option>
              </Select>
            </i-col>
          </Row>
          <Row class="margin-top">
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
                <Option v-for="item in dicData.fontColorList" :value="item.dicValue" :key="item.dicValue">
                  {{ item.dicName }}
                </Option>
              </Select>
            </i-col>
          </Row>
          <Row class="margin-top">
            <i-col span="3">
              <span>字体大小：<span style="color: red">*</span></span>
            </i-col>
            <i-col span="8">
              <Select placement="top" v-model="editEntity.fontSize">
                <Option v-for="item in dicData.fontSizeList" :value="item.dicValue" :key="item.dicValue">
                  {{ item.dicName}}
                </Option>
              </Select>
            </i-col>
            <i-col span="3" offset="2">
              <span>字体类型：<span style="color: red">*</span></span>
            </i-col>
            <i-col span="8">
              <Select placement="top" v-model="editEntity.font">
                <Option v-for="item in dicData.fontTypeList" :value="item.dicValue" :key="item.dicValue">
                  {{ item.dicName}}
                </Option>
              </Select>
            </i-col>
          </Row>
          <Row class="margin-top">
            <i-col span="3">
              <span>对齐方式：<span style="color: red">*</span></span>
            </i-col>
            <i-col span="8">
              <Select placement="top" v-model="editEntity.align">
                <Option v-for="item in dicData.alignTypeList" :value="item.dicValue" :key="item.dicValue">
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
          <div style="height: 40px;text-align: right;margin-top: 20px">
            <Button type="primary" @click="openCmsTemplateTypeModal">添加到常用库</Button>
            <Button type="primary" @click="">选择常用库</Button>
            <Button type="primary" @click="">选择情报板</Button>
            <Button type="primary" @click="addToSendList">添加到列表</Button>
          </div>
        </Col>
        <Col span="12">
          <div style="border-bottom: #4d667d 1px solid;margin-top: 10px">发送列表：</div>
          <div style="height: 65px;width:100%;border-bottom: #4d667d 1px solid;overflow-x: auto">
            <Tag color="blue" v-for="item in cmsSelectedList" :key="item.id">{{item.cmsName}}</Tag>
          </div>
          <div style="border-bottom: #4d667d 1px solid;">发送内容：</div>
          <div>
            <div v-for="(item,index) in cmsSendList">
              <table>
                <tr>
                  <td>
                    <div @click="cmsSendItemClick(item)" class="cms-send-display"
                         :style="{width: item.width + 'px',height: item.height + 'px'}">
                      <div class="cms-send-display-pic" v-if="item.picContent!=501">
                        <img :style="{width: item.height + 'px',height: item.height + 'px'}"
                             :src="'../../../../static/images/cmsPic/' + item.picContent + '.png'"/>
                      </div>
                      <div class="cms-send-display-content"
                           :style="{width: item.picContent!=501?item.width-item.height:item.width+ 'px',color: getFontColor(item.fontColor) + '',fontFamily: ''+ getFontFamily(item.font) +'' ,fontSize: getFontSize(editEntity.fontSize) + 'px',lineHeight: getFontSize(editEntity.fontSize) + 'px',textAlign: getAlign(item.align)}">
                        <div style="white-space:nowrap;" v-for="v in item.contentArr">{{v}}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="cms-send-list-delete">
                      <div class="cms-send-list-delete-btn" @click="deleteCmsSendItem(index)">
                      </div>
                    </div>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </Col>
      </Row>
    </div>
    <CmsTemplateTypeModal :cmsTemplateTypeModalShow="cmsTemplateTypeModal"
                          :cmsTemplateTypePropertyData="cmsTemplateTypePropertyData"
                          @close-cms-template-type-modal="closeCmsTemplateTypeModal"></CmsTemplateTypeModal>
  </div>
</template>
<script>
  import {VueTabs, VTab} from 'vue-nav-tabs'
  import {api_listCmsSizeType, api_listCmsTemplateType, api_saveCmsTemplate} from "../../../axios/api/cms_api";
  import {cloneObj} from "../../../common/utils/util";
  import {getFontColor, getFontFamily, getFontSize, getAlign} from "../../../common/utils/dic-util";
  import CmsTemplateTypeModal from './CmsTemplateTypeModal'

  export default {
    name: 'cmsProperty',
    components: {
      VueTabs, VTab, CmsTemplateTypeModal
    },
    props: {
      showProperty: {
        type: Boolean
      },
      propertyValue: {
        type: Object,
        require: true
      }
    },
    data() {
      return {
        editEntity: {},
        dicData: {
          playTypeList: [],
          fontColorList: [],
          fontTypeList: [],
          alignTypeList: [],
          fontSizeList: [],
          cmsPicTypeList: []
        },
        cmsSelectedList: [],
        cmsSendList: [],
        cmsSizeTypeList: [],
        cmsTemplateTypeList: [],
        cmsTemplateTypeModal: false,
        cmsTemplateTypePropertyData: {},
        cmsTemplateTypeSelected: '',
      }
    },
    watch: {
      editEntity: {
        handler(val, oldVal) {
          let content = val.content.replace(/\n/g, "<br/>");
          document.getElementById("messageShow").innerHTML = content;
        },
        deep: true
      }
    },
    methods: {
      //获取字典
      getDics() {
        this.dicData.fontTypeList = this.$constant.FONT_TYPE;
        this.dicData.fontSizeList = this.$constant.FONT_SIZE;
        this.dicData.fontColorList = this.$constant.FONT_COLOR;
        this.dicData.alignTypeList = this.$constant.ALIGN_TYPE;
        this.dicData.cmsPicTypeList = this.$constant.CMS_PIC_TYPE;
        this.dicData.playTypeList = this.$constant.PLAY_TYPE;
      },

      //获取情报板大小类型
      listCmsSizeType() {
        api_listCmsSizeType({}).then(res => {
          this.cmsSizeTypeList = res.data;
        }).catch(err => {

        })
      },

      //获取情报板模板类型
      listCmsTemplateType() {
        api_listCmsTemplateType({}).then(res => {
          this.cmsTemplateTypeList = res.data;
        }).catch(err => {

        })
      },

      //打开情报板模板类型选择窗口
      openCmsTemplateTypeModal() {
        if (this.editEntity.content == "") {
          this.$Notice.warning({
            title: '警告提示',
            desc: '发送内容不能为空！'
          });
          return
        }
        this.cmsTemplateTypeModal = true;
        this.cmsTemplateTypePropertyData = {
          cmsTemplateTypeSelected: this.cmsTemplateTypeList[0].id,
          cmsTemplateTypeList: this.cmsTemplateTypeList,
          cmsSizeTypeList: this.cmsSizeTypeList,
          cmsEditEntity: this.editEntity
        };
      },
      closeCmsTemplateTypeModal() {
        this.cmsTemplateTypeModal = false;
      },

      //保存情报板模板数据
      saveCmsTemplate() {
        let sizeType;
        this.cmsSizeTypeList.forEach(v => {
          if (v.width == this.propertyValue.data.width && v.height == this.propertyValue.data.height) {
            sizeType = v.id;
          }
        });

        let cmsTemplateEntity = {
          height: this.editEntity.height,
          width: this.editEntity.width,
          content: this.editEntity.content,
          picContent: this.editEntity.picContent,
          delay: this.editEntity.delay,
          transition: this.editEntity.transition,
          font: this.editEntity.font,
          align: this.editEntity.align,
          fontColor: this.editEntity.fontColor,
          fontSize: this.editEntity.fontSize,
          sizeType: sizeType,
          templateType: this.cmsTemplateTypeSelected,
        };

        api_saveCmsTemplate(cmsTemplateEntity).then(res => {
          this.$Notice.success({
            title: '成功提示',
            desc: '数据保存成功！'
          });
          this.cmsTemplateTypeModal = false;
        }).catch(err => {

        })
      },

      //初始化表单的属性值
      initCmsEntity() {
        this.editEntity = {
          content: "",
          picContent: this.dicData.cmsPicTypeList[0].dicValue,
          transition: this.dicData.playTypeList[0].dicValue,
          fontColor: this.dicData.fontColorList[0].dicValue,
          fontSize: this.dicData.fontSizeList[0].dicValue,
          font: this.dicData.fontTypeList[0].dicValue,
          align: this.dicData.alignTypeList[0].dicValue,
          delay: 5,
          height: this.propertyValue.data.height,
          width: this.propertyValue.data.width
        }
      },

      //编辑的发送内容添加到发送列表
      addToSendList() {
        if (this.editEntity.content == "") {
          this.$Notice.warning({
            title: '警告提示',
            desc: '发送内容不能为空！'
          });
          return
        }
        let cmsSendEntity = {
          height: this.editEntity.height,
          width: this.editEntity.width,
          content: this.editEntity.content,
          picContent: this.editEntity.picContent,
          delay: this.editEntity.delay,
          transition: this.editEntity.transition,
          font: this.editEntity.font,
          align: this.editEntity.align,
          fontColor: this.editEntity.fontColor,
          fontSize: this.editEntity.fontSize
        };
        if (cmsSendEntity.content.indexOf("\n") != -1) {
          cmsSendEntity.contentArr = cmsSendEntity.content.split("\n");
        } else {
          let arr = new Array();
          arr.push(cmsSendEntity.content);
          cmsSendEntity.contentArr = arr;
        }
        this.cmsSendList.push(cmsSendEntity);
      },

      //发送列表的发送内容重新编辑
      cmsSendItemClick(item) {
        this.editEntity = cloneObj(item);
      },

      //删除发送列表的发送内容
      deleteCmsSendItem(index) {
        this.cmsSendList.splice(index, 1)
      },
      getFontColor(color) {
        return getFontColor(this.dicData.fontColorList, color);
      },
      getFontFamily(font) {
        return getFontFamily(this.dicData.fontTypeList, font);
      },
      getFontSize(fontSize) {
        return getFontSize(this.dicData.fontSizeList, fontSize);
      },
      getAlign(align) {
        return getAlign(this.dicData.alignTypeList, align);
      },
    },
    mounted: function () {
      this.$nextTick(function () {
        this.getDics();
        this.listCmsSizeType();
        this.listCmsTemplateType();
        this.initCmsEntity()
      })
    }
  }
</script>
<style scoped>
  .cms-send-display {
    white-space: nowrap;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: black;
    margin: 0 auto
  }

  .cms-send-display-pic {
    display: block;
    float: left
  }

  .cms-send-display-content {
    display: block;
    float: left;
    margin: 0 auto;
  }

  .margin-top {
    margin-top: 10px;
  }

  .cms-send-list-delete {
    display: inline-block;
    padding-left: 10px;
  }

  .cms-send-list-delete-btn {
    background-image: url('../../../../static/images/common/btn_delete.png');
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
</style>
