<template>
    <div class="relatedWrap">
        <div class="panel">
            <div class="panel-head">
                <div class="panel-title">
                    流程规则
                </div>
                <div class="panel-btn">
                    <!-- <a-button type="primary">添加关联</a-button> -->
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
                                    <a-menu-item @click="handleSetCondition(record)">设置条件</a-menu-item>
                                </a-menu>
                            </template>
                        </a-dropdown>
                      <!-- <a-button type="text" size="small" @click="handleSetCondition(record)">设置条件</a-button> -->
                    </template>
                  </template>
                </a-table>
            </div>
        </div>
    </div>
    <SetCondition :isShow="isSetCondition" v-if="isSetCondition" :ruleId="ruleId" @cancel="isSetCondition=false" />
</template>
<script setup>
    import "@/style/common.less";
    import { ref, toRefs, reactive, toRaw, onMounted, watch, getCurrentInstance, defineProps } from "vue";
    import SetCondition from "@/components/workflow/seeting/SetCondition.vue";

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
            dataIndex: "ObjectName",
            width: 120,
        },
        {
            title: "名称",
            dataIndex: "UserName"
        },
        {
            title: "权限",
            dataIndex: "Right",
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
        isSetCondition: false,
        ruleId: ""
    })
    const { listData, isSetCondition, ruleId } = toRefs(data);
    const formState = reactive({
        name: "",
        status: "",
        depart: "",
    })
    const columnList = toRaw(columns);
    const loadList = () => {
        let d = {
            filterId: "",
            entityType: "WFRule",
            // objectTypeCode: "20591",
            filterQuery: "\nProcessId\teq\t" + props.id
        };
        proxy.$get(Interface.list2, d).then(res=>{
            data.listData = res.nodes.map(item=>{
                item.UserName = item.Name.textValue;
                return item;
            });
        })
    };
    loadList();

    const handleSetCondition = (row) => {
        data.ruleId = row.id;
        data.isSetCondition = true;
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