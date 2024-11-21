<template>
  <div>
    <a-modal v-model:open="props.isShow" width="850px" :maskClosable="false" @cancel="handleCancel" @ok="handleSubmit">
      <template #title>
        <div>
          {{ title }}
        </div>
      </template>
      <div class="modalContainer">
        <div class="modalCenter" :style="{ height: height + 'px!important' }">
          <a-form :model="formState" ref="formRef">
            <div class="section">
              <div class="sectionTitle">基本信息</div>
              <div class="sectionRow">
                <div class="sectionItem">
                  <a-form-item name="parentBusinessUnitId" label="父部门" :rules="[{ required: true, message: '请选择' }]">
                      <a-select allowClear v-model:value="formState.parentBusinessUnitId.Id" 
                      :default-active-first-option="false" :filter-option="false" showSearch @search="(e) => {searchlookup(e,'10', 'parentBusinessUnitId');}" @dropdownVisibleChange="(e) => {searchlookup('','10', 'parentBusinessUnitId');}">
                          <template #suffixIcon></template>
                          <a-select-option v-for="(option, optionIdx) in search.parentBusinessUnitId" :key="optionIdx" :value="option.ID">{{ option.Name }}</a-select-option>
                      </a-select>
                      <div class="selectIcon">
                          <SearchOutlined class="ant-select-suffix" @click="handleOpenLook('10')" />
                      </div>
                  </a-form-item>
                </div>
              </div>
              <div class="sectionRow">
                <div class="sectionItem">
                  <a-form-item name="submitDate" label="变更日期" :rules="[{ required: true, message: '请选择' }]">
                      <a-date-picker :locale="locale" @change="(e)=>{changeDate(e,item)}" valueFormat="YYYY-MM-DD" v-model:value="formState.submitDate" placeholder="选择日期"></a-date-picker>
                  </a-form-item>
                </div>
              </div>
              <div class="sectionRow">
                  <div class="sectionItem">
                      <a-form-item name="reason" label="原因">
                          <a-textarea :rows="4" placeholder="请输入" v-model:value="formState.reason" />
                      </a-form-item>
                  </div>
              </div>

            </div>
          </a-form>
        </div>
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
    toRaw,
  } from "vue";
  import {
    SearchOutlined,
    DownOutlined,
    UserOutlined,
  } from "@ant-design/icons-vue";
  import { message } from "ant-design-vue";
  import Toast from "@/utils/toast.js";
  import { formTreeData } from "@/utils/common.js";
  import FilterQuery from "@/components/FilterQuery.vue";
  import Interface from "@/utils/Interface.js";
  import moment from "moment";
  import dayjs from 'dayjs';
  import 'dayjs/locale/zh-cn';
  import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
  dayjs.locale('zh-cn');
  const { proxy } = getCurrentInstance();
  console.log(document.documentElement.clientHeight);
  const props = defineProps({
    isShow: Boolean,
    ids: String
  });
  const formRef = ref();
  const emit = defineEmits(["cancel","ok"]);
  const handleCancel = () => {
    emit("cancel", false);
  };
  const data = reactive({
    title: "变更父部门",
    height: document.documentElement.clientHeight - 300,
    select: {
    },
    search: {
      parentBusinessUnitId:[]
    }
  });
  const {
    title,
    height, select, search
  } = toRefs(data);
  const nowtime=new Date();
  const formState = reactive({
    parentBusinessUnitId: {
        Id: '',
    },
    submitDate: nowtime.getFullYear()+'-'+(nowtime.getMonth()+1>9?nowtime.getMonth()+1:'0'+(nowtime.getMonth()+1))+'-'+(nowtime.getDate()>9?nowtime.getDate():'0'+nowtime.getDate()),
    reason: '',
  });

  const onSearch = (e) => {

  }
  onMounted(() => {
    window.addEventListener("resize", (e) => {
      data.height = document.documentElement.clientHeight - 300;
    });
  });
  const changeDate = (e,item) => {
      let time = moment(e).format("YYYY-MM-DD");
  }
  const searchlookup = (saerchVal, Lktp, field) => {
    proxy.$get(Interface.uilook, {
        Lktp: Lktp,
        Lksrch: saerchVal,
    }).then((res) => {
        let listData = res.listData;
        data.search[field] = listData;
    });
  }
  const handleOpenLook = (type) => {

  }
  const handleSubmit = () => {
    formRef.value
      .validate()
      .then(() => {
            console.log("values", formState, toRaw(formState));
            let item = toRaw(formState)
            let fields={
              IsTrackingHistory: 0
            };
            let ids=props.ids.split(',');
            setTimeout(function(){
                ids.map((item,index)=>{
                    if(index==ids.length-1){
                        saveid(item,fields,true);
                    }
                    else{
                        saveid(item,fields,false);
                    }
                });
            },200)
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  const saveid =(rid,fields,isend)=>{
            let url='Interface.create';
            let d = {
                actions:[{
                    id: "2919;a",
                    descriptor: "",
                    callingDescriptor: "UNKNOWN",
                    params: {
                        recordInput: {
                            allowSaveOnDuplicate: false,
                            apiName: props.sObjectName,
                            objTypeCode: '',
                            fields: fields
                        }              
                    }
                }]
            };
            if(rid){
                d.actions[0].params.recordInput.Id=rid;
                d.actions[0].params.recordId=rid;
                url='Interface.edit';
            }
            let obj = {
                message: JSON.stringify(d)
            }
            proxy.$post(url,obj).then(res=>{
                if(isend==true){
                    message.warning("保存成功！");
                    emit("load", false);
                    setTimeout(function(){
                        emit("cancel", false);
                    },1000)
                }
            });
    }
</script>
<style lang="less">
  @import url("@/style/modal.less");
  .section {
    .sectionTitle {
      height: 30px;
      background-color: rgb(243, 242, 242);
      line-height: 30px;
      border-radius: 4px;
      padding-left: 15px;
      margin-bottom: 12px;
      /* margin: 2rem 2rem 0.5rem 2rem; */
    }

    .sectionRow {
      padding: 0 10px;
      box-sizing: border-box;
      display: flex;

      .sectionItem {
        flex: 1;
        margin-right: 20px;

        .ant-row {
          display: block !important;
        }
      }

      .sectionItem:last-child {
        margin-right: 0;
      }
    }
  }

  :where(.css-dev-only-do-not-override-kqecok).ant-picker {
    width: 100%;
  }

  .ant-form-item {
    position: relative;
  }

  .selectIcon {
    position: absolute;
    right: 10px;
    top: 5px;
  }
</style>