<template>
    <div>
        <a-modal v-model:open="props.isShow" width="850px" :maskClosable="false" @cancel="handleCancel"
            @ok="handleSubmit">
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
                                    <a-form-item name="SystemUserID" label="选择用户" :rules="[{ required: false, message: '请选择用户' }]">
                                        <a-select allowClear v-model:value="formState.SystemUserID" 
                                            :default-active-first-option="false" :filter-option="true" showSearch>
                                            <template #suffixIcon></template>
                                            <a-select-option v-for="(option, optionIdx) in search.SystemUserID" :key="optionIdx" :value="option.ID" :label="option.Name">{{ option.Name }}</a-select-option>
                                        </a-select>
                                        <div class="selectIcon">
                                            <SearchOutlined class="ant-select-suffix" @click="handleOpenLook('8')" />
                                        </div>
                                    </a-form-item>
                                </div>
                            </div>
                            <div class="sectionRow">
                                <div class="sectionItem">
                                    <a-form-item name="SystemUserID" label="上传签名" :rules="[{ required: false, message: '请上传签名' }]">
                                        <a-upload
                                            v-model:file-list="fileList"
                                            name="file"
                                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                            :headers="headers"
                                            @change="handleChange"
                                        >
                                            <a-button>
                                                <upload-outlined></upload-outlined>
                                                上传文件
                                            </a-button>
                                        </a-upload>
                                    </a-form-item>
                                </div>
                            </div>
                        </div>
                    </a-form>
                    <radio-user
                        v-if="isRadioUser"
                        :isShow="isRadioUser"
                        @cancel="isRadioUser=false"
                        @selectVal="handleUserParams"
                        localId="SystemUserID"
                    ></radio-user>
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
        InboxOutlined,
        UploadOutlined
    } from "@ant-design/icons-vue";
    import { message } from "ant-design-vue";
    import Toast from "@/utils/toast.js";
    import RadioDept from "@/components/commonModal/RadioDept.vue";
    import Interface from "@/utils/Interface.js";
    import dayjs from 'dayjs';
    import RadioUser from "@/components/commonModal/RadioUser.vue";


    const { proxy } = getCurrentInstance();
    console.log(document.documentElement.clientHeight);
    const labelCol = ref({ style: { width: "100px" } });
    const props = defineProps({
        isShow: Boolean,
        id: [String, Number],
    });
    const formRef = ref();
    const emit = defineEmits(["cancel"]);
    const handleCancel = () => {
        emit("cancel", false);
    };
    const formState = reactive({
        SystemUserID: ""
    });
    const data = reactive({
        title: "新建签名",
        height: document.documentElement.clientHeight - 300,
        search: {
            SystemUserID: []
        },
        isRadioUser: false,
        fileList: [],
        headers:{}
    });
    const {
        title,
        height, 
        search,
        isRadioUser,
        fileList,
        headers
    } = toRefs(data);




    onMounted(() => {
        window.addEventListener("resize", (e) => {
            data.height = document.documentElement.clientHeight - 300;
        });
    });

    const getUserList = () => {
        let d = {
            filterId: "",
            entityName: "SystemUser",
            objectTypeCode: 8
        }
        proxy.$get(Interface.list2, d).then(res=>{
            console.log("res", res);
            let list = res.nodes.map(item=>{
                item.Name = item.FullName.value;
                item.ID = item.id;
                return item;
            })
            data.search.SystemUserID = list;
        })
    }
    getUserList();

    

    const getDetail = () => {
        let d = {
            actions:[{
                id: "4270;a",
                descriptor: "aura://RecordUiController/ACTION$getRecordWithFields",
                callingDescriptor: "UNKNOWN",
                params: {
                    recordId: props.id,
                    apiName: "WFUserSignature"
                }
            }]
        };
        let obj = {
            message: JSON.stringify(d)
        }
        proxy.$post(Interface.detail,obj).then(res=>{
            if(res&&res.actions&&res.actions[0]){
                let fields = res.actions[0].returnValue.fields;
                formState.SystemUserID = fields.SystemUserID.value;
            }
        })
    }
    if(props.id){
        getDetail();
    }

    const handleChange = () => {

    }

    const searchlookup = (saerchVal, targetApiName, field) => {
        let obj = {
            actions:[{
                id: "6129;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    objectApiName: "SystemUser",
                    fieldApiName: "Name",
                    pageParam: 1,
                    pageSize: 25,
                    q: "",
                    searchType: "Recent",
                    targetApiName: "SystemUser",
                    body: {
                        sourceRecord: {
                            apiName: "SystemUser",
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
    };


    

    const handleOpenLook = (objectTypeCode) => {
        if (objectTypeCode == 8) {
            data.isRadioUser = true;
        };
    };

    const handleUserParams = (e) => {
        formState.SystemUserID = e.id;
        let index = data.search.SystemUserID.findIndex(item=>item.ID==e.id);
        if(index==-1){
            data.search.SystemUserID.push({
                ID: e.id,
                Name: e.name
            });
        }
        data.isRadioUser = false;
    }

    const handleSubmit = () => {
        formRef.value.validate().then(() => {
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
                            apiName: 'WFUserSignature',
                            objTypeCode: 20040,
                            fields: {
                                SystemUserID: formState.SystemUserID
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
                Toast.success("保存成功！");
                emit("load", false);
                setTimeout(function(){
                    emit("cancel", false);
                },1000)
            });
        }).catch((err) => {
            console.log("error", err);
        });
    };
</script>
<style lang="less">
    @import url("@/style/modal.less");

    .ant-modal-content .modalContainer .modalCenter {
        /* height: 500px !important; */
    }

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