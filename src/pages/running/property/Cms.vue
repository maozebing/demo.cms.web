<template>
  <Modal v-model="showProperty" :showProperty="showProperty" fullscreen footer-hide title="情报板发送">
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
    <Modal
      v-model="cmsTemplateTypeModal"
      title="常用库类型列表" :styles="{top: '50px'}">
      <div>
        <Row>
          <Col span="24">
            <Form inline style="text-align: left;margin-left:10px;margin-bottom: -14px">
              <FormItem>
                <span>常用库类型:</span>
              </FormItem>
              <Form-item>
                <Select v-model="cmsTemplateTypeSelected" style="width:200px;text-align: left">
                  <Option v-for="item in cmsTemplateTypeList" :value="item.id" :key="item.id">
                    {{ item.name }}
                  </Option>
                </Select>
              </Form-item>
            </Form>
          </Col>
        </Row>
      </div>
      <div slot="footer">
        <Button type="text" @click="cmsTemplateTypeModal=false">关闭</Button>
        <Button type="primary" @click="saveCmsTemplate">确定</Button>
      </div>
    </Modal>
  </Modal>
</template>
<script>
  import {VueTabs, VTab} from 'vue-nav-tabs'
  import {api_listCmsSizeType, api_listCmsTemplateType,api_saveCmsTemplate} from "../../../axios/api/cms_api";

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
      handleCloseClick() {
        this.$emit('close-property', false)
      },
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
      openCmsTemplateTypeModal(){
        if (this.editEntity.content == "") {
          this.$Notice.warning({
            title: '警告提示',
            desc: '发送内容不能为空！'
          });
          return
        }
        this.cmsTemplateTypeModal = true;
        this.cmsTemplateTypeSelected = this.cmsTemplateTypeList[0].id;
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

      cmsSendItemClick() {

      },
      deleteCmsSendItem(index) {
        this.cmsSendList.splice(index, 1)
      },
      getFontColor(color) {
        let colorR = 'green';
        if (this.dicData.fontColorList.filter((item) => {
          return item.dicValue == color
        }).length > 0) {
          let t = this.dicData.fontColorList.filter((item) => {
            return item.dicValue == color
          })[0];
          if (t) {
            switch (t.dicName) {
              case '绿色':
                colorR = 'green';
                break;
              case '红色':
                colorR = 'red';
                break;
              case '黄色':
                colorR = 'yellow';
                break;
            }
          }
        }
        return colorR
      },
      getFontFamily(font) {
        let result = '宋体'
        if (this.dicData.fontTypeList.filter((item) => {
          return item.dicValue == font
        }).length > 0) {
          let t = this.dicData.fontTypeList.filter((item) => {
            return item.dicValue == font
          })[0];
          if (t) {
            result = t.dicName
          }
        }
        return result
      },
      getFontSize(fontSize) {
        let result = 16;
        if (this.dicData.fontSizeList.filter((item) => {
          return item.dicValue == fontSize
        }).length > 0) {
          let t = this.dicData.fontSizeList.filter((item) => {
            return item.dicValue == fontSize
          })[0];
          if (t) {
            result = t.dicName
          }
        }
        return result
      },
      getAlign(align) {
        let result = 'left';
        let array = this.dicData.alignTypeList.filter((item) => {
          return item.dicValue == align
        });
        if (array.length > 0) {
          let t = this.dicData.alignTypeList.filter((item) => {
            return item.dicValue == align
          })[0];
          if (t) {
            switch (t.dicName) {
              case '居中':
                result = 'center';
                break;
              case '居左':
                result = 'left';
                break;
              case '居右':
                result = 'right';
                break;
            }
          }
        }
        return result;
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
