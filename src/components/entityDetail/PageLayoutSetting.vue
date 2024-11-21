<template>
    <div class="pageLayoutSetting">
        <div class="title">{{record.Label}} {{record.Name}}</div>
        <div class="dTabs">
            <a-tabs v-model:activeKey="activeKey">
                <a-tab-pane key="1" tab="主表"></a-tab-pane>
                <a-tab-pane key="2" tab="相关列表"></a-tab-pane>
            </a-tabs>
        </div>
        <div class="tabContent" v-if="activeKey=='1'">
            <div class="panelBox" v-for="(item, index) in listData" :key="index">
                <div class="rowForm">
                    <div class="leftIcon">
                        <DownOutlined @click="handleCollapsed(item)" />
                    </div>
                    <div class="rightForm">
                        <a-form class="formWrap">
                            <a-form-item label="区块" :rules="[{ required: true, message: '请输入区块!' }]">
                                <a-input v-model:value="item.LabelKey"></a-input>
                            </a-form-item>
                            <a-form-item label="Name" :rules="[{ required: true, message: '请输入Name!' }]">
                                <a-input v-model:value="item.Name"></a-input>
                            </a-form-item>
                            <a-form-item label="序号">
                                <a-input v-model:value="item.Position"></a-input>
                            </a-form-item>
                            <a-form-item label="可折叠">
                                <a-checkbox v-model:checked="item.IsCollapsible"></a-checkbox>
                            </a-form-item>
                            <a-form-item label="折叠">
                                <a-checkbox v-model:checked="item.IsCollapsed"></a-checkbox>
                            </a-form-item>
                            <span class="delIcon">
                                <DeleteOutlined />
                            </span>
                        </a-form>
                    </div>
                </div>
                <div v-if="item.isShow">
                    <div class="panelBoxBd">
                        <div class="panelTable">
                            <a-table bordered :pagination="false" :data-source="item.Fields" :columns="columns">
                                <template #bodyCell="{ column, text, record }">
                                    <template v-if="column.dataIndex === 'Name'">
                                        <div class="editable-cell">
                                            <div class="editable-cell-input-wrapper">
                                                <a-select v-model:value="record.Name" style="width: 200px;">
                                                    <a-select-option v-for="(row, idx) in attributes" :key="idx" :value="row.attributeId">{{row.label}}</a-select-option>
                                                </a-select>
                                            </div>
                                        </div>
                                    </template>
                                    <template v-else-if="column.dataIndex === 'LabelKey'">
                                        <div class="editable-cell">
                                            <div class="editable-cell-input-wrapper">
                                                <a-input v-model:value="record.LabelKey"
                                                    @pressEnter="save(record.key)" />
                                            </div>
                                        </div>
                                    </template>
                                    <template v-else-if="column.dataIndex === 'Required'">
                                        <div class="editable-cell">
                                            <div class="editable-cell-input-wrapper">
                                                <a-checkbox v-model:checked="record.Required"></a-checkbox>
                                            </div>
                                        </div>
                                    </template>
                                    <template v-else-if="column.dataIndex === 'Readonly'">
                                        <div class="editable-cell">
                                            <div class="editable-cell-input-wrapper">
                                                <a-checkbox v-model:checked="record.Readonly"></a-checkbox>
                                            </div>
                                        </div>
                                    </template>
                                    <template v-else-if="column.dataIndex === 'RowNumber'">
                                        <div class="editable-cell">
                                            <div class="editable-cell-input-wrapper">
                                                <a-input v-model:value="record.RowNumber"></a-input>
                                            </div>
                                        </div>
                                    </template>
                                    <template v-else-if="column.dataIndex === 'ColumnNumber'">
                                        <div class="editable-cell">
                                            <div class="editable-cell-input-wrapper">
                                                <a-input v-model:value="record.ColumnNumber"></a-input>
                                            </div>
                                        </div>
                                    </template>
                                    <template v-else-if="column.dataIndex === 'operation'">
                                        <a-popconfirm title="Sure to delete?"
                                            @confirm="onDelete(record.key)">
                                            <span class="delIcon">
                                                <DeleteOutlined />
                                            </span>
                                        </a-popconfirm>
                                    </template>
                                </template>
                            </a-table>
                        </div>
                    </div>
                    <div class="rowAddBox">
                        <a-button type="link" @click="handleAddRow(item)">
                            <PlusOutlined />
                            添加行
                        </a-button>
                    </div>
                </div>
            </div>
            <div class="rowAddBox" @click="handleAddBox">
                <a-button type="link">
                    <PlusOutlined />
                    添加行
                </a-button>
            </div>
            <div class="footer1">
                <a-button @click="handleCancel">取消</a-button>
                <a-button type="primary" class="ml10" @click="handleSave">保存</a-button>
            </div>
        </div>
        <div class="tabContent" v-if="activeKey=='2'">
            <RelatedList />
        </div>
    </div>
</template>
<script setup>
    import {
        UnorderedListOutlined,
        DownOutlined,
        CaretDownOutlined,
        UserOutlined,
        DeleteOutlined,
        EditOutlined,
        CheckOutlined,
        PlusOutlined
    } from "@ant-design/icons-vue";
    import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, nextTick, computed, defineEmits } from "vue";
    import Interface from "@/utils/Interface.js";
    import { useRouter, useRoute } from "vue-router";
    import { message } from "ant-design-vue";
  import Toast from "@/utils/toast.js";
    import RelatedList from "@/components/entityDetail/RelatedList.vue";
    const router = useRouter();
    import moment from "moment";
    const { proxy } = getCurrentInstance();

    const emit = defineEmits(['cancel']);
    let data = reactive({
        activeKey: '1',
        listData: [{
            isShow: true,
            LabelKey: "",
            Name: "",
            Position: 1,
            IsCollapsible: false,
            IsCollapsed: false,
            formState: {

            },
            Fields: [
                {
                    Name: '',
                    LabelKey: '',
                    Required: false,
                    Readonly: false,
                    RowNumber: 1,
                    ColumnNumber: 1
                }
            ]
        }],
        attributes: [],
        record: {}
    });
    const { activeKey, listData, attributes, record } = toRefs(data);
    import { cloneDeep } from 'lodash-es';
    const columns = [
        {
            title: '字段',
            dataIndex: 'Name',
            // width: '30%',
            width: 300,
        },
        {
            title: '显示名称',
            dataIndex: 'LabelKey',
            width: 300,
        },
        {
            title: '必填',
            dataIndex: 'Required',
        },
        {
            title: '只读',
            dataIndex: 'Readonly',
        },
        {
            title: '行号',
            dataIndex: 'RowNumber',
            width: 150,
        },
        {
            title: '列号',
            dataIndex: 'ColumnNumber',
            width: 150,
        },
        {
            title: '操作',
            dataIndex: 'operation',
            width: 100
        },
    ];
    // const dataSource = ref([
    //     {
    //         Name: '',
    //         LabelKey: '',
    //         Required: true,
    //         Readonly: false,
    //         RowNumber: 1,
    //         ColumnNumber: 1
    //     }
    // ]);
    // const count = computed(() => dataSource.value.length + 1);
    // const editableData = reactive({});
    // const edit = key => {
    //     editableData[key] = cloneDeep(dataSource.value.filter(item => key === item.key)[0]);
    // };
    const save = key => {
        Object.assign(dataSource.value.filter(item => key === item.key)[0], editableData[key]);
        delete editableData[key];
    };
    const onDelete = key => {
        dataSource.value = dataSource.value.filter(item => item.key !== key);
    };
    const handleAddRow = (item) => {
        console.log("item", item);
        const newData = {
            Name: '',
            LabelKey: '',
            Required: false,
            Readonly: false,
            RowNumber: 1,
            ColumnNumber: 1
        };
        item.Fields.push(newData);
    };
    const handleAddBox = () => {
        var obj = {
            isShow: true,
            LabelKey: "",
            Name: "",
            Position: data.listData.length + 1,
            IsCollapsible: false,
            IsCollapsed: false,
            formState: {

            },
            Fields: []
        }
        data.listData.push(obj);
    };
    const handleCollapsed = (item) => {
        item.isShow = !item.isShow;
    };

    const getAttrs = () => {
        // entityAttr
        proxy.$get(Interface.entityAttr, {
            EntityId: "",
            all: 1
        }).then(res=>{
            data.attributes = res.attributes;
        })
    };
    const getPageLayout = () => {
        // const newData = {
        //     Name: '',
        //     LabelKey: '',
        //     Required: false,
        //     Readonly: false,
        //     RowNumber: 1,
        //     ColumnNumber: 1
        // };
        proxy.$get(Interface.objeview.pagelayout, {
            id: ""
        }).then(res=>{
            data.record = res;
            data.listData = res.Sections.map(item=>{
                item.isShow = true;
                // if(item.Fields.length==0){
                //     item.Fields.push(newData);
                // }
                return item;
            });
        })
    };
    getAttrs();
    getPageLayout();
    const handleCancel = () => {
        emit("cancel", false);
    };
    const handleSave = () => {
        let obj = {
            LayoutId: "",
            Name: data.record.Name,
            Label: data.record.Label,
            Sections: []
        };
        let Sections = [];
        data.listData.forEach(item=>{
            Sections.push({
                SectionId: item.SectionId,
                Name: item.Name,
                LabelKey: item.LabelKey,
                CanChangeColumns: item.CanChangeColumns || '',
                CanDeleteSection: item.CanDeleteSection || '',
                ShowEditHeader: item.ShowEditHeader || '',
                ShowDetailHeader: item.ShowDetailHeader || '',
                NameReadonly: item.NameReadonly || '',
                IsCollapsible: item.IsCollapsible,
                IsCollapsed: item.IsCollapsed,
                Position: item.Position,
                SortOrder: "h",
                ClassName: "",
                Fields: item.Fields,
                visible: item.visible || ''
            })
        });
        console.log("Sections",Sections);
        obj.Sections = Sections;
        var d = {
            message: JSON.stringify(obj)
        }
        proxy.$get(Interface.objeview.troughSave, d).then(res=>{
            Toast('保存成功！');
        });
    };
</script>
<style lang="less" scoped>
    .editable-cell {
        position: relative;
        .editable-cell-input-wrapper,
        .editable-cell-text-wrapper {
            padding-right: 24px;
        }

        .editable-cell-text-wrapper {
            padding: 5px 24px 5px 5px;
        }

        .editable-cell-icon,
        .editable-cell-icon-check {
            position: absolute;
            right: 0;
            width: 20px;
            cursor: pointer;
        }

        .editable-cell-icon {
            margin-top: 4px;
            display: none;
        }

        .editable-cell-icon-check {
            line-height: 28px;
        }

        .editable-cell-icon:hover,
        .editable-cell-icon-check:hover {
            color: #108ee9;
        }

        .editable-add-btn {
            margin-bottom: 8px;
        }
    }

    .editable-cell:hover .editable-cell-icon {
        display: inline-block;
    }

    .pageLayoutSetting {
        padding-top: 20px;
        height: calc(~"100% - 64px");
        overflow-y: auto;
        margin: 0 auto;
        margin-bottom: 64px;
        width: 80%;
        .title {
            text-align: center;
        }

        .panelBox {
            padding: 20px 50px;
            margin: 20px;
            border: 1px solid #dedede;

            .rowForm {
                display: flex;
                align-items: center;

                .leftIcon {
                    margin-right: 10px;
                    cursor: pointer;
                }

                .rightForm {
                    flex: 1;
                    .formWrap {
                        display: flex;
                        align-items: center;

                        .ant-form-item {
                            margin-bottom: 0;
                            margin-right: 10px;
                            min-width: 100px;
                        }

                        .delIcon {
                            vertical-align: top;
                            font-size: 18px;
                            cursor: pointer;
                        }
                    }
                }
            }

            .panelBoxBd {
                padding-left: 22px;

                .panelTable {
                    margin-top: 16px;
                }
            }
        }
    }
    .delIcon {
        vertical-align: top;
        font-size: 18px;
        cursor: pointer;
    }
    .footer1{
        width: 100%;
        position: fixed;
        padding: 16px 0;
        bottom: 0;
        left: 0;
        text-align: center;
        background: #fff;
    }
</style>