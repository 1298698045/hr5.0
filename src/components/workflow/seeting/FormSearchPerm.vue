<template>
    <div class="relatedWrap">
        <div class="panel">
            <div class="panel-head">
                <div class="panel-title">
                    表单查询权限
                </div>
                <div class="panel-btn">
                    <a-button type="primary" @click="handleAddUser">添加用户</a-button>
                    <a-button type="primary" class="ml10" @click="handleAddFilter">添加筛选器</a-button>
                </div>
            </div>
            <div class="panel-bd">
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
                                    <a-menu-item @click="handleDelete(record)">删除</a-menu-item>
                                </a-menu>
                            </template>
                        </a-dropdown>
                      <!-- <a-button type="text" size="small" @click="handleDelete(record)">删除</a-button> -->
                    </template>
                  </template>
                </a-table>
            </div>
        </div>
    </div>
    <AddFlowUser v-if="isAddFlowUser" :isShow="isAddFlowUser" @cancel="isAddFlowUser=false" :id="id" :rowId="rowId" :apiName="apiName" :objTypeCode="objTypeCode" @load="loadList" />
    <AddFilter v-if="isAddFilter" :isShow="isAddFilter" @cancel="isAddFilter=false" :apiName="apiName" :objTypeCode="objTypeCode" @load="loadList" />
    <Delete :isShow="isDelete" v-if="isDelete" desc="是否确定要删除？" :recordId="id" :sObjectName="apiName" :objTypeCode="objTypeCode" @cancel="isDelete=false" @ok="loadList"  />
</template>
<script setup>
    import "@/style/common.less";
    import { ref, toRefs, reactive, toRaw, onMounted, watch, getCurrentInstance, defineProps } from "vue";
    import AddFlowUser from "@/components/workflow/seeting/AddFlowUser.vue";
    import AddFilter from "@/components/commonModal/AddFilter.vue";
    import Delete from "@/components/listView/Delete.vue";
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
            title: "类型",
            dataIndex: "ObjectTypeName",
            width: 120,
        },
        {
            title: "名称",
            dataIndex: "ObjectIdName"
        },
        {
            title: "操作",
            dataIndex: "Action",
            width: 80,
        }
    ]
    const data = reactive({
        listData: [],
        isAddFlowUser: false,
        isAddFilter: false,
        rowId: "",
        apiName: "WFProcessInstanceAccessControl",
        objTypeCode: 134,
        isDelete: false
    })
    const formState = reactive({
        name: "",
        status: "",
        depart: "",
        
    })
    const { listData, isAddFlowUser, isAddFilter, rowId, apiName, objTypeCode, isDelete } = toRefs(data);
    const columnList = toRaw(columns);

    const formCodeText = (code) => {
        code = Number(code);
        let obj = {
            8: '用户',
            9: '组',
            10: '部门',
            1036: '角色',
            1039: '筛选器'
        };
        return obj[code];
    };

    const loadList = () => {
        let d = {
            filterId: "",
            entityType: data.apiName,
            // objectTypeCode: 20593,
            filterQuery: "\nProcessId\teq\t" + props.id,
            displayColumns: "id,Name,ObjectTypeCode",
        };
        proxy.$post(Interface.list2, d).then(res=>{
            data.listData = res.nodes.map(item=>{
                item.ObjectTypeName = formCodeText(item.ObjectTypeCode.textValue);
                item.ObjectIdName = item.Name.textValue;
                return item;
            });
        })
    };
    loadList();
    const handleAddUser = () => {
        data.isAddFlowUser = true;
    }
    const handleAddFilter = () => {
        data.isAddFilter = true;
    };

    const handleDelete = (row) => {
        data.rowId = row.id;
        data.isDelete = true;
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