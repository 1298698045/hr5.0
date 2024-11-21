<template>
    <div>
      <a-modal v-model:open="props.isShow" width="800px" :style="setTop" :maskClosable="false" @cancel="handleCancel"
        @ok="handleSubmit">
        <template #title>
          <div class="modal_title">离开页面</div>
        </template>
        <div class="modalContainer" ref="modelContentRef">
          <p style="text-align: center;padding: 60px 0;" v-if="desc">
            {{ desc }}
          </p>
          <slot></slot>
        </div>
        <template #footer>
          <div>
            <a-button @click="handleCancel">取消</a-button>
            <a-button type="primary" @click.prevent="handleSubmit">确认</a-button>
          </div>
        </template>
      </a-modal>
    </div>
  </template>
  <script setup>
    import {
      ref,
      watch,
      reactive,
      toRefs,
      onMounted,
      getCurrentInstance,
      onUpdated,
      defineProps,
      defineExpose,
      defineEmits,
      computed
    } from "vue";
    import { SearchOutlined, DeleteOutlined } from "@ant-design/icons-vue";
    import { message } from "ant-design-vue";
  import Toast from "@/utils/toast.js";
    import Interface from "@/utils/Interface.js";
  
    const { proxy } = getCurrentInstance();
    const labelCol = ref({ style: { width: "100px" } });
    const props = defineProps({
      isShow: Boolean,
      desc: {
        type: String,
        default: "是否确定要导航离开此页面？您将失去任何未保存的更改。"
      },
      step: [String, Number]
    });
    const emit = defineEmits(["cancel", "ok"]);
    const modelContentRef = ref(null);
  
    const handleCancel = () => {
      emit("cancel", false);
    };
    const handleSubmit = () => {
        emit("ok", props.step);
    };
    const data = reactive({
      top: ""
    });
    const { top } = toRefs(data);
    
    onMounted(() => {
      let h = modelContentRef.value.clientHeight;
      data.top = (h + 126) / 2 + 'px';
    })
    const setTop = computed(() => ({
      top: `calc(50% - ${data.top})`
    }));
  </script>
  <style lang="less">
    @import url("@/style/modal.less");
  </style>