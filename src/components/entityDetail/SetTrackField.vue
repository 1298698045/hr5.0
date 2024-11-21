<template>
  <div>
    <a-modal
      v-model:open="props.isShow"
      width="800px"
      :maskClosable="false"
      @cancel="handleCancel"
      @ok="handleSubmit"
    >
      <template #title>
        <div>设置追踪字段</div>
      </template>
      <div class="modalContainer">
        <div class="modalCenter" style="padding: 0 16px !important">
          <p class="label">追踪字段</p>
          <a-checkbox
            v-model:checked="checkedAll"
            :indeterminate="indeterminate"
            @change="onCheckAllChange"
            >全选</a-checkbox
          >
          <a-checkbox-group v-model:value="selectedList" style="width: 100%">
            <a-row>
              <a-col :span="6" v-for="(item, index) in listData" :key="index">
                <a-checkbox :value="item.id">{{ item.label }}</a-checkbox>
              </a-col>
            </a-row>
          </a-checkbox-group>
        </div>
      </div>
      <template #footer>
        <div>
          <a-button @click="handleCancel">取消</a-button>
          <a-button type="primary" @click.prevent="handleSubmit">保存</a-button>
        </div>
      </template>
    </a-modal>
  </div>
</template>
<script setup>
import {
  ref,
  reactive,
  watch,
  h,
  defineComponent,
  onMounted,
  defineProps,
  toRefs,
  getCurrentInstance,
  defineExpose,
  defineEmits,
} from "vue";
import {
  PieChartOutlined,
  UpOutlined,
  DownOutlined,
} from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
  import Toast from "@/utils/toast.js";

import draggable from "vuedraggable";

import Interface from "@/utils/Interface.js";
const { proxy } = getCurrentInstance();
const props = defineProps({
  paramsData: Object,
  isShow: Boolean,
  entityId: String,
  detail: Object,
});
const isModal = ref(true);
const labelCol = ref({ style: { width: "100px" } });
const data = reactive({
  listData: [],
  selectedList: [],
  isCtrl: false,
  checkedAll: false,
  indeterminate: false,
});
const { listData, selectedList, isCtrl, checkedAll, indeterminate } =
  toRefs(data);
onMounted(() => {});
const getQuery = () => {
  proxy
    .$get(Interface.objeview.objectmanager, {
      entityId: props.entityId,
      search: "",
    })
    .then((res) => {
      console.log("res", res);
      data.listData = res.rows;
      data.selectedList = res.rows
        .filter((item) => {
          return item.isTrackingHistory;
        })
        .map((row) => row.id);
    });
};
getQuery();
const onCheckAllChange = (e) => {
  if (data.checkedAll) {
    data.selectedList = data.listData.map((item) => item.id);
  } else {
    data.selectedList = [];
  }
};
const emit = defineEmits(["cancel"]);
const handleSubmit = () => {
  data.listData.forEach((item, index) => {
    item.IsTrackingHistory = false;
    let IsTrackingHistory = false;
    data.selectedList.forEach((row) => {
      if (item.id == row) {
        item.IsTrackingHistory = true;
        IsTrackingHistory = true;
      }
    });
    let obj = {
      actions: [
        {
          id: "2919;a",
          descriptor: "",
          callingDescriptor: "UNKNOWN",
          params: {
            recordId: item.id,
            recordInput: {
              allowSaveOnDuplicate: false,
              apiName: "Attribute",
              objTypeCode: props.detail.objectTypeCode,
              fields: {
                // Id: item.id,
                IsTrackingHistory: item.IsTrackingHistory ? 1 : 0,
              },
            },
          },
        },
      ],
    };
    let messages = {
      message: JSON.stringify(obj),
    };
    proxy.$post(Interface.objeview.field.saveTrack, messages).then((res) => {
      if (data.listData.length - 1 == index) {
        Toast("保存成功！");
        handleCancel();
      }
    });
  });
};
const handleCancel = () => {
  emit("cancel", false);
};

defineExpose({ isModal });
</script>
<style lang="less">
.ant-modal-content {
  padding: 0 !important;

  .ant-modal-header {
    border-bottom: 2px solid #e5e6eb;
    padding: 12px;
    font-size: 16px;
    color: #000;
    text-align: center;
  }

  .ant-modal-footer {
    border-top: 2px solid #e5e6eb;
    padding: 16px 20px;
    box-sizing: border-box;
  }

  .modalContainer {
    .modalCenter {
      padding: 10px 15px;
      box-sizing: border-box;
      height: 300px;
      overflow-y: auto;
    }
  }
}
</style>
