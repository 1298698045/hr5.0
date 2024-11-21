<template>
  <div>
    <a-modal
      v-model:open="props.isShow"
      width="800px"
      :style="setTop"
      :maskClosable="false"
      @cancel="handleCancel"
      @ok="handleSubmit"
    >
      <template #title>
        <div class="modal_title">{{ props.CalculateInfo.title }}</div>
      </template>
      <div class="modalContainer" ref="modelContentRef">
        <el-progress :text-inside="true" :stroke-width="25" :percentage="data.val" v-show="data.isShow" style="margin: 35px;" :format="format" :class="{'progress-success':data.val==100}"></el-progress>
        <p style="text-align: center;padding: 16px 0;" v-show="!data.isShow">
          {{ props.CalculateInfo.text||'' }}
        </p>
        <slot></slot>
      </div>
      <template #footer>
        <div>
          <a-button @click="handleCancel">取消</a-button>
          <a-button type="primary" @click.prevent="handleSubmit">确定</a-button>
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
  CalculateInfo:{
    title:String,
    text: String,
    url:String,
  }
});
const emit = defineEmits(["cancel", "ok"]);
const modelContentRef = ref(null);

const handleCancel = () => {
  emit("cancel", false);
};
const handleSubmit = () => {
    onProgressFlag();
    let url = props.CalculateInfo.url;
    let d = {
        actions:[{
            id: "2919;a",
            descriptor: "",
            callingDescriptor: "UNKNOWN",
            params: {
                
            }
        }]
    };
    let obj = {
        message: JSON.stringify(d)
    }
    if(!url){return false}
    proxy.$post(url, obj).then(res => {
      if(res&&res.actions&&res.actions[0]&&res.actions[0].state=='SUCCESS'){
        Toast("操作成功");
        emit("ok", false);
      }
      else{
          if(res&&res.actions&&res.actions[0]&&res.actions[0].errorMessage){
              Toast(res.actions[0].errorMessage);
          }
          else{
              Toast("操作失败");
          }
      }
      setTimeout(function(){
          //emit("cancel", false);
      },1000)
    })
};
const onProgressFlag = () => {
    data.isShow = true;
    var timer = setInterval(() => {
        data.val = data.val + 30;
        //加载到百分百
        if (data.val >= 100) {
            // 关闭定时器
            clearInterval(timer);
            data.val=100;
            Toast("操作成功");
            setTimeout(function () {
               emit("cancel", false);
            },1000)
        }
    }, 1000)
}
const format= (percentage) => {
    return '进度：' + percentage + '%'
}
const data = reactive({
  listData: [],
  targetKeys: [],
  selectedKeys: [],
  list: [
    {
      sortField: "",
      sortMethod: "",
    },
  ],
  top: "",
  isShow: false, 
  val: 0
});
const { listData, targetKeys, selectedKeys, list, top } = toRefs(data);
const mockData = [];
for (let i = 0; i < 20; i++) {
  mockData.push({
    key: i.toString(),
    title: `content${i + 1}`,
    description: `description of content${i + 1}`,
    // disabled: i % 3 < 1,
  });
}
const oriTargetKeys = mockData
  .filter((item) => +item.key % 3 > 1)
  .map((item) => item.key);
const disabled = ref(false);
// const targetKeys = ref(oriTargetKeys);
// const selectedKeys = ref(['1', '4']);
const handleChange = (nextTargetKeys, direction, moveKeys) => {
  console.log("targetKeys: ", nextTargetKeys);
  console.log("direction: ", direction);
  console.log("moveKeys: ", moveKeys);
};
const handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
  console.log("sourceSelectedKeys: ", sourceSelectedKeys);
  console.log("targetSelectedKeys: ", targetSelectedKeys);
};
const handleScroll = (direction, e) => {
  console.log("direction:", direction);
  console.log("target:", e.target);
};

const getQuery = () => {
  proxy.$get(Interface.entityFilter, {}).then((res) => {
    console.log("entityFilter", res);
    let attributes = res.entity.attributes.map((item) => {
      item.title = item.label + item.name;
      item.key = item.name;
      return item;
    });
    data.listData = attributes;
    let ColumnSet = res.filter[0].ColumnSet.split(",");
    // let temp = data.listData.filter(item=>{
    //     return ColumnSet.find(row=>{
    //         return row == item.key;
    //     })
    // })
    data.targetKeys = ColumnSet;
  });
};
const handleAddRowField = () => {
  data.list.push({
    sortField: "",
    sortMethod: "",
  });
};
const handleDelteField = (item, index) => {
  data.list.splice(index, 1);
};
//getQuery();
onMounted(()=>{
    let h = modelContentRef.value.clientHeight;
    data.top = (h + 126) / 2 + 'px';
})
const setTop = computed(() => ({
    top: `calc(50% - ${data.top})`
}));
</script>
<style lang="less" scoped>
@import url("@/style/modal.less");
.ant-modal-body p{
    text-align: center;
    padding: 40px 0px !important;
    font-size: 18px;
}
.modalContainer .progress-success .el-progress-bar__inner{
    background-color:green;
}
</style>
