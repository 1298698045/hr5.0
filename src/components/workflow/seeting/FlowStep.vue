<template>
    <div class="relatedWrap">
        <div class="panel">
            <div class="panel-head">
                <div class="panel-title">
                    流程步骤
                </div>
                <div class="panel-btn">
                    <!-- <a-button type="primary">添加关联</a-button> -->
                </div>
            </div>
            <div class="panel-bd">
                <div class="formWrap">
                    <div class="col">
                        <a-form ref="formRef" :model="formState">
                            <a-form-item name="name">
                                <a-input v-model:value="formState.name" placeholder="请输入姓名" />
                            </a-form-item>
                        </a-form>
                    </div>
                    <div class="col">
                        <a-button class="ml10" type="primary">查询</a-button>
                    </div>
                </div>
                <a-table :columns="columns" :data-source="listData">
                 <template #bodyCell="{ column, record, index }">
                    <template v-if="column.dataIndex === 'number'">
                        {{index+1}}
                    </template>
                    <template v-if="column.dataIndex === 'Action'">
                        <a-dropdown :trigger="['click','hover']">
                            <a href="javascript:;" class="btnMenu small">
                                <svg focusable="false" aria-hidden="true" viewBox="0 0 520 520" part="icon" lwc-6qul4k2dv7m="" data-key="down" class="fh-icon fh-icon_xx-small"><g lwc-6qul4k2dv7m=""><path d="M83 140h354c10 0 17 13 9 22L273 374c-6 8-19 8-25 0L73 162c-7-9-1-22 10-22z" lwc-6qul4k2dv7m=""></path></g></svg>
                            </a>
                            <template #overlay>
                                <a-menu style="padding: 10px 0;border: 1px solid #333;border-radius: 4px;">
                                    <a-menu-item @click="handlePerm(record)">权限</a-menu-item>
                                    <a-menu-item @click="handlePeopleOpen(record)">办理人员</a-menu-item>
                                    <a-menu-item @click="handlePeopleOpen(record)">预览人员</a-menu-item>
                                </a-menu>
                            </template>
                        </a-dropdown>
                      <!-- <a-button type="text" size="small" @click="handlePerm(record)">权限</a-button>
                      <a-button type="text" size="small" @click="handlePeopleOpen(record)">办理人员</a-button>
                      <a-button type="text" size="small" @click="handlePreview(record)">预览人员</a-button> -->
                    </template>
                  </template>
                </a-table>
            </div>
        </div>
        <PermSeeting v-if="isPerm" :isShow="isPerm" :id="id" :stepId="stepId" @cancel="cancelPerm" @load="loadList"></PermSeeting>
        <HandlePeople v-if="isHandlePeople" :isShow="isHandlePeople" :id="id" @cancel="cancelPeople" :stepId="stepId" :stepCode="stepCode" @load="loadList" />
        <PreviewPeople v-if="isPreview" :isShow="isPreview" @cancel="isPreview=false" :id="id" :stepId="stepId" />
    </div>
</template>
<script setup>
    import "@/style/common.less";
    import { ref, toRefs, reactive, toRaw, onMounted, watch, getCurrentInstance, defineProps } from "vue";
    import PermSeeting from "@/components/workflow/seeting/PermSeeting.vue";
    import HandlePeople from "@/components/workflow/seeting/HandlePeople.vue";
    import PreviewPeople from "@/components/workflow/seeting/PreviewPeople.vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();

    const props = defineProps({
        id: String,
        entityApiName: String,
        objectTypeCode: [Number, String]
    })
    var columns = [
        {
            title: "序号",
            dataIndex: "number",
            width: 80,
        },
        {
            title: "步骤名称",
            dataIndex: "name"
        },
        {
            title: "步骤代码",
            dataIndex: "stepCode",
            width: 120,
        },
        {
            title: "办理时限",
            dataIndex: "names",
            width: 120,
        },
        {
            title: "办理人员",
            dataIndex: "participators",
            width: 120,
        },
        {
            title: "权限",
            dataIndex: "stepSights",
            width: 120,
        },
        {
            title: "操作",
            dataIndex: "Action",
            width: 80,
        }
    ]
    const data = reactive({
        listData: [],
        isPerm: false,
        stepId: "",
        isHandlePeople: false,
        stepCode: "",
        isPreview: false
    })
    const formState = reactive({
        name: "",
        status: "",
        depart: "",
        
    })
    const { listData, isPerm, stepId, isHandlePeople, stepCode, isPreview } = toRefs(data);
    const columnList = toRaw(columns);
    const loadList = () => {
    let d = {
        filterId: "",
        entityType: "WFStep",
        // entityName: "WFStep",
        // objectTypeCode: 20592,
        filterQuery: "\nProcessId\teq\t" + props.id
    }
      proxy.$post(Interface.list2, d).then(res=>{
        data.listData = res.nodes.map(item=>{
            item.name = item.Name.textValue;
            return item;
        });
      })
    };
    loadList();
    // 权限
    const handlePerm = (item) => {
        // console.log("item",item);
        data.stepId = item.id;
        data.isPerm = true;
    }
    // 办理人员
    const handlePeopleOpen = (item) => {
        data.stepId = item.id;
        data.stepCode = item.stepCode;
        data.isHandlePeople = true;
    }
    const cancelPerm = (e) => {
        data.isPerm = e;
    }
    const cancelPeople = (e) => {
        data.isHandlePeople = e;
    }
    const handlePreview = (item) => {
        data.stepId = item.id;
        data.isPreview = true;
    }
</script>
<style lang="less">
    .relatedWrap{
        width: 100%;
    }
    .ant-btn.ant-btn-text,.ant-btn.ant-btn-text:hover{
        color: var(--textColor);
    }
    .formWrap{
        display: flex;
        justify-content: space-between;
        .ant-form{
            display: flex;
            .ant-form-item{
                width: 150px;
                margin-right: 10px;
            }
        }
    }
</style>