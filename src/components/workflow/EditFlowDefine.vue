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
                  <a-form-item name="Name" label="流程名称" :rules="[{ required: true, message: '请选择类型' }]">
                      <a-input v-model:value="formState.Name"></a-input>
                  </a-form-item>
                </div>
                <div class="sectionItem">
                  <a-form-item name="EntityLayoutId" label="关联表单" :rules="[{ required: true, message: '请选择类型' }]">
                      <a-select allowClear v-model:value="formState.EntityLayoutId" 
                      :default-active-first-option="false" :filter-option="false" showSearch @search="(e) => {searchlookup(e,'EntityForm', 'EntityLayoutId');}" @dropdownVisibleChange="(e) => {searchlookup('','EntityForm', 'EntityLayoutId');}">
                          <template #suffixIcon></template>
                          <a-select-option v-for="(option, optionIdx) in search.EntityLayoutId" :key="optionIdx" :value="option.ID">{{ option.Name }}</a-select-option>
                      </a-select>
                      <div class="selectIcon">
                          <SearchOutlined class="ant-select-suffix" @click="handleOpenLook('20018')" />
                      </div>
                  </a-form-item>
                </div>
              </div>
              <div class="sectionRow">
                <div class="sectionItem">
                  <a-form-item name="FolderId" label="流程分类" :rules="[{ required: true, message: '请选择类型' }]">
                      <a-select allowClear v-model:value="formState.FolderId" 
                      :default-active-first-option="false" :filter-option="false" showSearch @search="(e) => {searchlookup(e,'ItemTree', 'FolderId');}" @dropdownVisibleChange="(e) => {searchlookup('','ItemTree', 'FolderId');}">
                          <template #suffixIcon></template>
                          <a-select-option v-for="(option, optionIdx) in search.FolderId" :key="optionIdx" :value="option.ID">{{ option.Name }}</a-select-option>
                      </a-select>
                      <div class="selectIcon">
                          <SearchOutlined class="ant-select-suffix" @click="handleOpenLook('100200')" />
                      </div>
                  </a-form-item>
                </div>
                <div class="sectionItem">
                  <a-form-item name="Position" label="显示顺序" :rules="[{ required: true, message: '请选择类型' }]">
                      <a-input v-model:value="formState.Position"></a-input>
                  </a-form-item>
                </div>
              </div>
              <div class="sectionRow">
                <div class="sectionItem">
                  <a-form-item name="Priority" label="优先级">
                    <a-select v-model:value="formState.Priority">
                      <a-select-option v-for="(item,index) in select.Priority" :value="item.value" :key="index">{{item.label}}</a-select-option>
                    </a-select>
                  </a-form-item>
                </div>
                <div class="sectionItem">
                  <a-form-item name="StateCode" label="状态">
                    <a-select v-model:value="formState.StateCode">
                      <a-select-option v-for="(item,index) in select.StateCode" :value="item.value" :key="index">{{item.label}}</a-select-option>
                    </a-select>
                  </a-form-item>
                </div>
              </div>
              <div class="sectionRow">
                <div class="sectionItem">
                  <a-form-item name="IsHide" label="是否隐藏流程">
                      <a-checkbox v-model:checked="formState.IsHide"></a-checkbox>
                  </a-form-item>
                </div>
                <div class="sectionItem">
                  <a-form-item name="RequireAttach" label="是否必须上传附件">
                      <a-checkbox v-model:checked="formState.RequireAttach"></a-checkbox>

                  </a-form-item>
                </div>
              </div>
            </div>
            <div class="section">
              <div class="sectionTitle">备注</div>
              <div class="sectionRow">
                  <div class="sectionItem">
                      <a-form-item name="Description" label="描述">
                          <a-textarea :rows="4" placeholder="请输入内容" v-model:value="formState.Description" />
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
  const { proxy } = getCurrentInstance();
  console.log(document.documentElement.clientHeight);
  import { getPickerList } from "@/utils/commonApi.js";
  //   const labelCol = ref({ style: { width: "100px" } });
  const props = defineProps({
    isShow: Boolean,
    id: String
  });
  const formRef = ref();
  const emit = defineEmits(["cancel","load"]);
  const handleCancel = () => {
    emit("cancel", false);
  };
  const data = reactive({
    title: "新建流程定义",
    height: document.documentElement.clientHeight - 300,
    select: {},
    search: {}
  });
  const {
    title,
    height, select, search
  } = toRefs(data);
  const formState = reactive({
    Name: '',
    EntityLayoutId: "",
    Position: '',
    IsHide: false,
    RequireAttach: false,

    FolderId: "",
    Description: '',
    StateCode: '',
    Priority: ''
  });

  const onSearch = (e) => {

  }
  onMounted(() => {
    window.addEventListener("resize", (e) => {
      data.height = document.documentElement.clientHeight - 300;
    });
  });


  const loadPickerData = async () => {
    const picklist = await getPickerList('WFProcess');
    console.log("picklist:", picklist);
    for(let key in picklist){
      data.select[key] = picklist[key].values;
    }
    if(props.id){
        getDetail();
        data.title='编辑流程定义';
    }
  };
  loadPickerData();



  const searchlookup = (saerchVal, targetApiName, field) => {
    let obj = {
          actions:[{
              id: "6129;a",
              descriptor: "",
              callingDescriptor: "UNKNOWN",
              params: {
                  objectApiName: "WFProcess",
                  fieldApiName: field,
                  pageParam: 1,
                  pageSize: 25,
                  q: "",
                  searchType: "Recent",
                  targetApiName: targetApiName,
                  body: {
                      sourceRecord: {
                          apiName: "WFProcess",
                          fields: {
                              id: null,
                              RecordTypeId: ""
                          }
                      }
                  }
              }
          }]
      };
      let d = {
          message: JSON.stringify(obj)
      }
    proxy.$post(Interface.lookup, d).then((res) => {
        let list = res.actions[0].returnValue.lookupResults.records;
        let arr = [];
        list.forEach(item=>{
            arr.push({
                ID: item.fields.Id.value,
                Name: item.fields.Name.value
            })
        });
        data.search[field] = arr;
    });
  }
  const handleOpenLook = (type) => {

  }

  const getDetail = () => {
    let d = {
        actions:[{
            id: "4270;a",
            descriptor: "aura://RecordUiController/ACTION$getRecordWithFields",
            callingDescriptor: "UNKNOWN",
            params: {
              recordId: props.id,
              apiName: "WFProcess"
            }
        }]
    };
    let obj = {
        message: JSON.stringify(d)
    }
    proxy.$post(Interface.detail,obj).then(res=>{
        if(res&&res.actions&&res.actions[0]){
          let fields = res.actions[0].returnValue.fields;
          for(let key in formState) {
            formState[key] = fields[key]?.value;
            if(key=='EntityLayoutId'||key=='FolderId'){
              data.search[key] = [{
                ID: fields[key].value,
                Name: fields[key].displayValue
              }]
            }
          }
        }
    })
    
  }
  
  const handleSubmit = () => {
    formRef.value
      .validate()
      .then(() => {
            console.log("values", formState, toRaw(formState));
            let item = toRaw(formState)
            let url=Interface.create;
            let d = {
            actions:[{
                id: "2919;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                  recordInput: {
                    allowSaveOnDuplicate: false,
                    apiName: 'WFProcess',
                    objTypeCode: 121,
                    fields: {
                        IsTrackingHistory: 0,
                        Name: item.Name,
                        FolderId: item.FolderId,
                        EntityLayoutId: item.EntityLayoutId,
                        Description: item.Description,
                        RequireAttach: item.RequireAttach,
                        Position: item.Position,
                        Fshare: item.IsHide,
                        StateCode: item.StateCode,
                        Priority: item.Priority,
                    }
                  }              
                }
            }]
            };
            if(props.id){
                d.actions[0].params.recordInput.Id=props.id;
                d.actions[0].params.recordId=props.id;
                url=Interface.edit;
            }
            let obj = {
                message: JSON.stringify(d)
            }
            proxy.$post(url,obj).then(res=>{
                  formRef.value.resetFields();
                  message.warning("保存成功！");
                  emit("load", false);
                  setTimeout(function(){
                      emit("cancel", false);
                  },1000)
            });
      
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
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