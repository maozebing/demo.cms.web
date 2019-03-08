<template>
  <Modal v-model="cmsTemplateTypeModalShow" :closable="false" title="常用库类型列表" :styles="{top: '50px'}">
    <div>
      <Row>
        <Col span="24">
          <Form inline style="text-align: left;margin-left:10px;margin-bottom: -14px">
            <FormItem>
              <span>常用库类型:</span>
            </FormItem>
            <Form-item>
              <Select v-model="cmsTemplateTypePropertyData.cmsTemplateTypeSelected"
                      style="width:200px;text-align: left">
                <Option v-for="item in cmsTemplateTypePropertyData.cmsTemplateTypeList" :value="item.id" :key="item.id">
                  {{ item.name }}
                </Option>
              </Select>
            </Form-item>
          </Form>
        </Col>
      </Row>
    </div>
    <div slot="footer">
      <Button type="text" @click="handleCloseClick">关闭</Button>
      <Button type="primary" @click="saveCmsTemplate">确定</Button>
    </div>
  </Modal>
</template>

<script>
  import {api_saveCmsTemplate} from "../../../axios/api/cms_api";

  export default {
    name: "CmsTemplateTypeModal",
    props: ['cmsTemplateTypeModalShow', 'cmsTemplateTypePropertyData'],
    data() {
      return {}
    },
    methods: {
      handleCloseClick() {
        this.$emit('close-cms-template-type-modal');
      },
      //保存情报板模板数据
      saveCmsTemplate() {
        let editEntity = this.cmsTemplateTypePropertyData.cmsEditEntity;
        let sizeType;
        this.cmsTemplateTypePropertyData.cmsSizeTypeList.forEach(v => {
          if (v.width == editEntity.width && v.height == editEntity.height) {
            sizeType = v.id;
          }
        });

        let cmsTemplateEntity = {
          height: editEntity.height,
          width: editEntity.width,
          content: editEntity.content,
          picContent: editEntity.picContent,
          delay: editEntity.delay,
          transition: editEntity.transition,
          font: editEntity.font,
          align: editEntity.align,
          fontColor: editEntity.fontColor,
          fontSize: editEntity.fontSize,
          sizeType: sizeType,
          templateType: this.cmsTemplateTypePropertyData.cmsTemplateTypeSelected,
        };

        api_saveCmsTemplate(cmsTemplateEntity).then(res => {
          this.$Notice.success({
            title: '成功提示',
            desc: '数据保存成功！'
          });
          this.handleCloseClick();
        }).catch(err => {

        })
      },
    }
  }
</script>

<style scoped>

</style>
