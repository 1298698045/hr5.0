<template>
    <div>
        <a-modal v-model:open="props.isShow" width="850px" :maskClosable="false" @cancel="handleCancel"
            @ok="handleSubmit">
            <template #title>
                <div>
                    新建流程
                </div>
            </template>
            <div class="modalContainer">
                <div class="modalCenter" :style="{ height: height + 'px' }">
                    <div class="form-legend-desktop">
                        <abbr class="required">*</abbr>
                        = 必填信息
                    </div>
                    <a-form :model="formState" ref="formRef">
                        <div class="section">
                            <div class="sectionTitle">基本信息</div>
                            <div class="sectionRow">
                                <div class="sectionItem">
                                    <a-form-item name="Name" label="名称"
                                        :rules="[{ required: true, message: '请输入名称',},]">
                                        <a-input v-model:value="formState.Name"></a-input>
                                    </a-form-item>
                                </div>
                                <div class="sectionItem">
                                    <a-form-item name="FolderId" label="流程分类"
                                        :rules="[{ required: true, message: '请输入流程分类',},]">
                                        <a-select allowClear v-model:value="formState.FolderId.value"
                                            :default-active-first-option="false" :filter-option="false" showSearch
                                            @search=" (e) => {
                                    searchlookup(e, {localId: 'FolderId', referencedEntityName: 'ItemTree', referencedEntityObjectTypeCode:100200 } );
                                    }
                                " @dropdownVisibleChange="
                                    (e) => {
                                    searchlookup('', {localId: 'FolderId', referencedEntityName: 'ItemTree', referencedEntityObjectTypeCode:100200 });
                                    }
                                " :placeholder="'请选择流程分类'">
                                            <template #suffixIcon></template>
                                            <a-select-option v-for="(option, optionIdx) in search.FolderId"
                                                :key="optionIdx" :value="option.ID">{{ option.Name }}</a-select-option>

                                        </a-select>
                                    <div class="selectIcon">
                                        <SearchOutlined class="ant-select-suffix"
                                            @click="handleOpenLook({localId: 'FolderId', referencedEntityName: 'ItemTree', referencedEntityObjectTypeCode:100200 })"
                                        />
                                        </div>
                                    </a-form-item>
                                </div>
                            </div>
                            <div class="sectionRow">
                                <div class="sectionItem">
                                    <a-form-item name="EntityLayoutId" label="表单"
                                        :rules="[{ required: true, message: '请输入表单',},]">
                                        <a-select allowClear v-model:value="formState.EntityLayoutId.value"
                                            :default-active-first-option="false" :filter-option="false" showSearch
                                            @search=" (e) => {
                                    searchlookup(e, {localId: 'EntityLayoutId', referencedEntityName: 'EntityForm', referencedEntityObjectTypeCode:20018 });
                                    }
                                " @dropdownVisibleChange="
                                    (e) => {
                                    searchlookup('', {localId: 'EntityLayoutId', referencedEntityName: 'EntityForm', referencedEntityObjectTypeCode:20018 });
                                    }
                                " :placeholder="'请选择表单'">
                                            <template #suffixIcon></template>
                                            <a-select-option v-for="(option, optionIdx) in search.EntityLayoutId"
                                                :key="optionIdx" :value="option.ID">{{ option.Name }}</a-select-option>

                                        </a-select>
                                    <div class="selectIcon">
                                        <SearchOutlined class="ant-select-suffix"
                                            @click="handleOpenLook({localId: 'EntityLayoutId', referencedEntityName: 'EntityForm', referencedEntityObjectTypeCode:20018 })"
                                        />
                                        </div>
                                    </a-form-item>
                                </div>
                                <div class="sectionItem">
                                    <a-form-item name="StateCode" label="状态" :rules="[{ required: true, message: '请选择状态',},]">
                                        <a-select allowClear v-model:value="formState.StateCode" :placeholder="'请选择状态'">
                                            <a-select-option v-for="(option, optionIdx) in select.StateCode?.values" :key="optionIdx" :value="option.value">
                                                {{ option.label }}
                                            </a-select-option>
                                        </a-select>
                                    </a-form-item>
                                </div>
                            </div>
                            <div class="sectionRow">
                                <div class="sectionItem">
                                    <a-form-item name="Position" label="位置"
                                        :rules="[{ required: true, message: '请输入名称',},]">
                                        <a-input v-model:value="formState.Position"></a-input>
                                    </a-form-item>
                                </div>
                                <div class="sectionItem">
                                    <a-form-item name="Description" label="描述">
                                        <a-input v-model:value="formState.Description"></a-input>
                                    </a-form-item>
                                </div>
                            </div>
                        </div>
                    </a-form>
                    <Lookup-filter v-if="isLookup" :isShow="isLookup" :field="localId" :entityApiName="entityApiName"
                        :lookEntityApiName="lookEntityApiName" :objectTypeCode="sObjectType" @cancel="isLookup=false"
                        @select="handleSelectData"></Lookup-filter>
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

    import LookupFilter from "@/components/commonModal/LookupFilter.vue";

    import { message } from "ant-design-vue";
  import Toast from "@/utils/toast.js";

    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    console.log(document.documentElement.clientHeight);
    const labelCol = ref({ style: { width: "100px" } });
    const props = defineProps({
        isShow: Boolean,
        title: String,
        objectTypeCode: String,
        id: String,
        entityId: String,
        entityApiName: String
    });
    console.log("props.entityId", props.entityId);
    const formRef = ref();
    const emit = defineEmits(["cancel"]);
    const handleCancel = () => {
        emit("cancel", false);
    };
    const data = reactive({
        title: "新建部门变动",
        layoutList: [],
        list: {},
        select: {},
        search: {
            FolderId: [],
            EntityLayoutId: []
        },
        height: document.documentElement.clientHeight - 300,
        isRadioDept: false,
        isMultipleDept: false,
        isRadioUser: false,
        localId: "",
        isMultipleUser: false,
        isLookup: false,
        sObjectType: "",
        recordObj: {}, // 记录当前点击的数据
        picklistFieldMap: {}, // 依赖字段关联关系
        selectFixed: {}, // select 固定不变的数据
        lookEntityApiName: ""
    });
    if (props.title) {
        data.title = props.title;
    }
    const {
        title,
        layoutList,
        list,
        select,
        search,
        height,
        isRadioDept,
        isRadioUser,
        isMultipleDept,
        localId,
        isMultipleUser,
        isLookup,
        sObjectType,
        recordObj,
        picklistFieldMap,
        selectFixed, lookEntityApiName
    } = toRefs(data);
    const formState = reactive({
        Name: "",
        FolderId: {
            Id: "",
            value: "",
            Name: "",
            displayValue: ""
        },
        EntityLayoutId: {
            Id: "",
            value: "",
            Name: "",
            displayValue: ""
        },
        StateCode: "",
        Position: "",
        Description: ""
    });



    const getPickerList = () => {
        let d = {
            actions: [{
                id: "2320;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    objectApiName: props.entityApiName,
                    recordTypeId: ""
                }
            }]
        }
        let obj = {
            message: JSON.stringify(d)
        }
        proxy.$post(Interface.pickListValues, obj).then((res) => {
            let picklistFieldValues = res.actions[0].returnValue;
            console.log("picklistFieldValues",picklistFieldValues);
            data.selectFixed = JSON.parse(JSON.stringify(picklistFieldValues));
            data.select = picklistFieldValues;
        });
    };
    getPickerList();

    const searchlookup = (search, attribute) => {
        console.log(search, attribute);
        let obj = {
            actions: [{
                id: "6129;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    objectApiName: props.entityApiName,
                    fieldApiName: attribute.localId,
                    pageParam: 1,
                    pageSize: 25,
                    q: "",
                    searchType: "Recent",
                    targetApiName: attribute.referencedEntityName,
                    body: {
                        sourceRecord: {
                            apiName: props.entityApiName,
                            fields: {
                                Id: null,
                                RecordTypeId: ""
                            }
                        }
                    }
                }
            }]
        }
        let d = {
            message: JSON.stringify(obj)
        }
        proxy.$post(Interface.lookup, d).then((res) => {
            let list = res.actions[0].returnValue.lookupResults.records;
            let arr = [];
            list.forEach(item => {
                arr.push({
                    ID: item.fields.Id.value,
                    Name: item.fields.Name.value
                })
            });
            data.search[attribute.localId] = arr;
        });
    };

    onMounted(() => {
        window.addEventListener("resize", (e) => {
            data.height = document.documentElement.clientHeight - 300;
        });
    });

    const cancelDeptModal = (params) => {
        data.isRadioDept = params;
        data.isMultipleDept = params;
    };
    // 弹框选中部门
    const handleDeptParams = (params) => {
        console.log("deptData", params);
        data.isRadioDept = false;
        data.isMultipleDept = false;
        // 单选部门赋值
        var isEmpty = data.search[data.localId].some((item) => item.ID == params.ID);
        if (!isEmpty) {
            data.search[data.localId].push({
                ID: params.ID,
                Name: params.Name,
            });
        }
        formState[data.localId].Id = params.ID;
    };

    const cancelUserModal = (params) => {
        data.isRadioUser = params;
    };
    // 关闭用户多选弹窗
    const cancelMuUserModal = (params) => {
        data.isMultipleUser = params;
    };
    const handleUserParams = (params) => {
        console.log("userData", params);
        console.log("赋值字段", data.localId);
        data.isRadioUser = false;
        formState[data.localId].Id = params.id;
        var isEmpty = data.search[data.localId].some((item) => item.ID == params.id);
        if (!isEmpty) {
            data.search[data.localId].push({
                ID: params.id,
                Name: params.name,
            });
        }
    };
    // 多选用户
    const handleMuUserParams = (params) => { };
    // 查找类型打开弹窗
    const handleOpenLook = (attribute) => {
        let localId = attribute.localId;
        data.localId = localId;
        data.lookEntityApiName = attribute.referencedEntityName;
        data.recordObj = attribute;
        data.sObjectType = attribute.referencedEntityObjectTypeCode;
        data.isLookup = true;
    };
    // 选中的数据
    const handleSelectData = (e) => {
        data.isLookup = false;
        // console.log("选中的数据", e);
        // console.log("recordObj", data.recordObj, formState);
        let { localId } = data.recordObj;
        let isExist = data.search[localId].some(item => item.ID == e.LIST_RECORD_ID);
        if (!isExist) {
            data.search[localId].push({
                ID: e.LIST_RECORD_ID,
                Name: e.Name
            })
        }
        console.log("data.search", data.search);
        formState[localId].Id = e.LIST_RECORD_ID;
        formState[localId].value = e.LIST_RECORD_ID;
        formState[localId].Name = e.Name;
        formState[localId].displayValue = e.Name;
    };
    const handleSubmit = () => {
        formRef.value.validate().then(() => {
            let url = Interface.workflow.create;
            let d = {
                actions: [{
                    id: "2919;a",
                    descriptor: "",
                    callingDescriptor: "UNKNOWN",
                    params: {
                        // recordId: props.id,
                        recordInput: {
                            allowSaveOnDuplicate: false,
                            apiName: "WFProcess",
                            objTypeCode: 121,
                            fields: toRaw(formState)
                        }
                    }
                }]
            };
            let obj = {
                message: JSON.stringify(d)
            }
            proxy.$post(url, obj).then((res) => {
                Toast("保存成功！");
                emit("success", false);
            });
        })
            .catch((err) => {
                console.log("error", err);
            });
    };
    // 时间组合日期选择
    const changeGroupDate = (e, attribute) => {
        formState[attribute.localId] = e + ' ' + formState[attribute.localId + '_obj'].time;
    }
    const changeGroupTime = (e, attribute) => {
        formState[attribute.localId] = formState[attribute.localId + '_obj'].date + ' ' + e;
    }
</script>
<style lang="less">
    @import url("@/style/modal.less");
    @import url("@/style/commonFormModal.less");
</style>