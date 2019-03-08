<template>
  <Modal v-model="showProperty" :closable="false" :mask-closable="false" fullscreen title="情报板发送">
    <div v-if="showProperty">
      <Cms :showProperty="showProperty" :propertyValue="propertyValue"></Cms>
    </div>
    <div slot="footer">
      <Button type="primary" @click="$emit('close-property')">关闭</Button>
    </div>
  </Modal>
</template>

<script>
  import Cms from './Cms'

  export default {
    name: "Base",
    components: {Cms},
    props: ['showProperty', 'propertyValue'],
    methods: {}
  }
</script>

<style scoped>
  .ivu-modal-close {
    display: none !important;
  }
</style>
