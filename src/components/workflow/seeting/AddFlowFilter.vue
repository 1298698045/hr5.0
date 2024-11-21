<template>
  <div>
    <a-modal v-model:open="props.isShow" width="1200px" :maskClosable="false" @cancel="handleCancel" @ok="handleSubmit">
      <template #title>
        <div>
          {{ title }}
        </div>
      </template>
      <div class="modalContainer">
        <div class="modalCenter" :style="{ height: height + 'px!important' }">
          <a-form :model="formState" ref="formRef">
            <div class="section">
              <div class="sectionRow">
                <div class="sectionItem">
                  <a-form-item label="名称" name="Name" :rules="[{ required: true, message: '请输入列表名称!' }]">
                    <a-input v-model:value="formState.Name" />
                  </a-form-item>
                </div>
              </div>
            </div>
          </a-form>
          <FilterQuery :FilterExpresssionList="FilterExpresssionList" @params="getFilterQuery"></FilterQuery>
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
    watch,
    reactive,
    toRefs,
    onMounted,
    getCurrentInstance,
    onUpdated,
    defineProps,
    defineExpose,
    defineEmits,
    toRaw,
    inject
  } from "vue";
  import {
    SearchOutlined,
    DownOutlined,
    UserOutlined,
  } from "@ant-design/icons-vue";
  import { message } from "ant-design-vue";
  import Toast from "@/utils/toast.js";
  import Dtable from "@/components/Dtable.vue";
  import Interface from "@/utils/Interface.js";
  const { proxy } = getCurrentInstance();
  import FilterQuery from "@/components/FilterQuery.vue";
  console.log(document.documentElement.clientHeight);
  const labelCol = ref({ style: { width: "100px" } });
  const props = defineProps({
    isShow: Boolean,
    id: String,
    apiName: String,
    objTypeCode: [String, Number],
    rowId: String
  });
  const formRef = ref();
  const emit = defineEmits(["cancel","load"]);
  const handleCancel = () => {
    emit("cancel", false);
  };
  const gridRef = ref();
  const data = reactive({
    title: "新建筛选器",
    height: document.documentElement.clientHeight - 300,
    id: inject("processId"),
    FilterExpresssionList: [],
    filterExpression: ""
  });
  const {
    title,
    height, id, FilterExpresssionList, filterExpression
  } = toRefs(data);
  const formState = reactive({
    Name: ""
  });

  const getFilterQuery = (e) => {
    data.filterExpression = e;
  }
  onMounted(() => {
    window.addEventListener("resize", (e) => {
      data.height = document.documentElement.clientHeight - 300;
      data.tableHeight = document.documentElement.clientHeight - 370
    });
  });


  const getDetail = () => {
    let obj = {
        actions:[{
            id: "4270;a",
            descriptor: "aura://RecordUiController/ACTION$getRecordWithFields",
            callingDescriptor: "UNKNOWN",
            params: {
                recordId: props.rowId,
                apiName: props.apiName
            }
        }]
    };
    let d = {
        message: JSON.stringify(obj)
    }
    proxy.$post(Interface.detail, d).then(res=>{
        console.log("res", res);
    })
  }

  if(props.rowId){
    getDetail();
  }

  const handleSubmit = () => {
    let url = Interface.edit;
    formRef.value.validate().then(() =>{
      let obj = {
        actions: [{
          id: "2919;a",
          descriptor: "",
          callingDescriptor: "UNKNOWN",
          params: {
            recordInput: {
              allowSaveOnDuplicate: false,
              apiName: props.apiName,
              objTypeCode: props.objTypeCode,
              fields: {
                ProcessId: props.id,
                ObjectTypeCode: 1039,
                Name: formState.Name,
                FilterExpression: data.filterExpression
              }
            }
          }
        }]
      };
      if(props.rowId){
        obj.actions[0].params.recordId = props.rowId;
        url = Interface.edit;
      }
      let d = {
        message: JSON.stringify(obj)
      };
      proxy.$post(url, d).then(res=>{
        Toast("保存自定义筛选器成功！");
        emit("cancel", false);
        emit("load", false);
      })
    }).catch(error=>{

    })
  };

  const handleSubmit_old = () => {
    if (data.filterExpression) {
      let obj = {
        processId: data.id,
        filterExpression: data.filterExpression,
      }
      proxy.$get(Interface.flow.usepriAdd, obj).then(res => {
        Toast("保存成功！");
        emit("cancel", false);
      })
    } else {
      Toast("至少填写一条条件！")
    }
  };
</script>
<style lang="less">
  @import url("@/style/modal.less");

  .searchForm {
    width: 300px;
    margin-bottom: 10px;
  }
</style>