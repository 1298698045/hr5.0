<template>
  <div>
    <a-modal v-model:open="props.isShow" width="800px" :style="setTop" :maskClosable="false" @cancel="handleCancel"
      @ok="handleSubmit">
      <template #title>
        <div class="modal_title">预览人员</div>
      </template>
      <div class="modalContainer" ref="modelContentRef">
        <div class="modalCenter">
          <div class="peopleRow">
            <div class="peopleItem" v-for="(item, index) in users" :key="index">
              {{item.Name}}
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <div>
          <a-button @click="handleCancel">取消</a-button>
          <!-- <a-button type="primary" @click.prevent="handleSubmit">确认</a-button> -->
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
    id: String,
    stepId: String
  });
  const emit = defineEmits(["cancel", "ok"]);
  const modelContentRef = ref(null);

  const handleCancel = () => {
    emit("cancel", false);
  };
  const handleSubmit = () => {
    emit("ok", false);
  };
  const data = reactive({
    top: "",
    users: []
  });
  const { top, users } = toRefs(data);
  const getParticipants = () => {
    let obj = {
      actions: [{
        id: "562;a",
        descriptor: "",
        callingDescriptor: "UNKNOWN",
        params: {
          id: props.stepId
        }
      }]
    };
    let d = {
      message: JSON.stringify(obj)
    };
    proxy.$post(Interface.workflow.getParticipants, d).then(res=>{
      let { Users, Roles, Groups, BusinessUnits } = res.actions[0].returnValue;
      data.users = Users;
    })
  }
  getParticipants();
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
  .peopleRow{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .peopleItem{
      width: 30%;
    }
  }
</style>