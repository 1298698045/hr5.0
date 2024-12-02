<template>
    <div>
        <a-modal v-model:open="props.isShow" width="1000px" :maskClosable="false" @cancel="handleCancel"
            @ok="handleSubmit">
            <template #title>
                <div>
                    {{ title }}
                </div>
            </template>
            <div class="modalContainer">
                <div class="modalCenter" :style="{ height: height + 'px!important' }">
                    <div class="contentFlex">
                        <div class="leftTabs">
                            <div class="leftHead" @click="handleAddTab">
                                添加tab页
                                <a-button class="btn" :icon="h(PlusOutlined)"></a-button>
                            </div>
                            <div class="leftMenuWrap">
                                <draggable :list="listData" group="people" itemKey="key">
                                    <template #item="{ element, index }">
                                        <div class="itemMenu" :class="{'active':currentTab==index}"
                                            @click="handleTab(element, index)">
                                            <svg focusable="false" data-key="drag_and_drop" aria-hidden="true"
                                                viewBox="0 0 52 52">
                                                <g>
                                                    <path
                                                        d="M20 4c2.2 0 4 1.8 4 4s-1.8 4-4 4-4-1.8-4-4 1.8-4 4-4zm12 0c2.2 0 4 1.8 4 4s-1.8 4-4 4-4-1.8-4-4 1.8-4 4-4zM20 16c2.2 0 4 1.8 4 4s-1.8 4-4 4-4-1.8-4-4 1.8-4 4-4zm12 0c2.2 0 4 1.8 4 4s-1.8 4-4 4-4-1.8-4-4 1.8-4 4-4zM20 28c2.2 0 4 1.8 4 4s-1.8 4-4 4-4-1.8-4-4 1.8-4 4-4zm12 0c2.2 0 4 1.8 4 4s-1.8 4-4 4-4-1.8-4-4 1.8-4 4-4zM20 40c2.2 0 4 1.8 4 4s-1.8 4-4 4-4-1.8-4-4 1.8-4 4-4zm12 0c2.2 0 4 1.8 4 4s-1.8 4-4 4-4-1.8-4-4 1.8-4 4-4z">
                                                    </path>
                                                </g>
                                            </svg>
                                            <span class="menuLabel">
                                                {{element.name}}
                                            </span>
                                        </div>
                                    </template>
                                </draggable>
                            </div>
                        </div>
                        <div class="rightTabContent">

                            <div class="section">
                                <a-form ref="formRef" :model="formState">
                                    <div class="sectionRow">
                                        <div class="sectionItem">
                                            <a-form-item name="Name" label="列表视图名称"
                                                :rules="[{ required: true, message: '请输入列表视图名称' }]">
                                                <a-input v-model:value="formState.Name"></a-input>
                                            </a-form-item>
                                        </div>
                                        <div class="sectionItem">
                                            <a-form-item name="DeveloperName" label="列表视图开发者名称"
                                                :rules="[{ required: true, message: '请输入列表视图开发者名称' }]">
                                                <a-input v-model:value="formState.DeveloperName"></a-input>
                                            </a-form-item>
                                        </div>
                                    </div>
                                </a-form>
                                <a-form ref="listTabRef" :model="item" v-for="(item, index) in listData" :key="index">
                                    <div v-if="currentTab==index">
                                        <div class="tabRow">
                                            <div class="tabTitle">tab详情信息</div>
                                            <a-button @click="handleDeleteTab(item, index)">删除tab页</a-button>
                                        </div>
                                        <div class="sectionLabel">基本信息</div>
                                        <div class="sectionRow">
                                            <div class="sectionItem">
                                                <a-form-item name="name" label="tab页名称"
                                                    :rules="[{ required: true, message: '请输入字段标签' }]">
                                                    <a-input v-model:value="item.name"></a-input>
                                                </a-form-item>
                                            </div>
                                            <div class="sectionItem">
                                                <a-form-item name="DeveloperName" label="tab页开发者名称"
                                                    :rules="[{ required: true, message: '请输入字段名称' }]">
                                                    <a-input v-model:value="item.DeveloperName"></a-input>
                                                </a-form-item>
                                            </div>
                                        </div>
                                        <div class="sectionLabel">搜索栏设置</div>
                                        <div class="sectionRow">
                                            <div class="sectionItem">
                                                <a-form-item name="searchField" label="搜索栏"
                                                    :rules="[{ required: true, message: '请选择搜索栏' }]">
                                                    <!-- <a-select v-model:value="item.searchField" mode="multiple"
                                                        :maxTagCount="6">
                                                        <a-select-option v-for="(row, idx) in attributes" :key="idx"
                                                            :value="row.name">{{ row.label }}</a-select-option>
                                                    </a-select> -->
                                                    <div class="transferBox">
                                                        <a-transfer
                                                            v-model:target-keys="item.searchField"
                                                            v-model:selected-keys="item.selectedKeys"
                                                            :data-source="attributes"
                                                            :titles="['Source', 'Target']"
                                                            :render="item => item.label"
                                                            show-search
                                                        />
                                                        <div class="sortBox">
                                                            <a-button class="ant-btn-icon" @click="item.selectedKeys.length && handleMoveUp(item)">
                                                                <svg focusable="false" aria-hidden="true" viewBox="0 0 520 520" part="icon" lwc-5oh90e94dsa="" data-key="up" class="slds-icon slds-icon_xx-small"><g lwc-5oh90e94dsa=""><path d="M437 380H83c-10 0-17-13-9-22l173-212c6-8 19-8 25 0l175 212c7 9 1 22-10 22z" lwc-5oh90e94dsa=""></path></g></svg>
                                                            </a-button>
                                                            <a-button class="ant-btn-icon" @click="item.selectedKeys.length && handleMoveDown(item)">
                                                                <svg focusable="false" aria-hidden="true" viewBox="0 0 520 520" part="icon" lwc-6qul4k2dv7m="" data-key="down" class="slds-icon slds-icon_xx-small"><g lwc-6qul4k2dv7m=""><path d="M83 140h354c10 0 17 13 9 22L273 374c-6 8-19 8-25 0L73 162c-7-9-1-22 10-22z" lwc-6qul4k2dv7m=""></path></g></svg>
                                                            </a-button>
                                                        </div>
                                                    </div>
                                                </a-form-item>
                                            </div>
                                        </div>
                                        <div class="sectionLabel">筛选器设置</div>
                                        <div class="sectionRow">
                                            <div class="sectionItem">
                                                <a-form-item name="filter" label="筛选器">
                                                    <a-select v-model:value="item.filter.filterId">
                                                        <a-select-option v-for="(row, idx) in filterList" :key="idx"
                                                            :value="row.id">{{ row.name }}</a-select-option>
                                                    </a-select>
                                                </a-form-item>
                                            </div>
                                        </div>
                                    </div>
                                </a-form>
                            </div>
                        </div>
                    </div>
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
        inject,
        h
    } from "vue";
    import {
        SearchOutlined,
        DownOutlined,
        UserOutlined,
        PlusOutlined
    } from "@ant-design/icons-vue";
    import { message } from "ant-design-vue";
  import Toast from "@/utils/toast.js";

    import draggable from "vuedraggable";

    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    const labelCol = ref({ style: { width: "100px" } });
    const props = defineProps({
        isShow: Boolean,
        id: String,
        EntityId: String,
        DeveloperName: String
    });
    console.log("DeveloperName", props.DeveloperName)
    const formRef = ref();
    const listTabRef = ref();
    const emit = defineEmits(["cancel", "callback"]);
    const handleCancel = () => {
        emit("cancel", false);
    };
    const data = reactive({
        title: "添加列表视图",
        height: document.documentElement.clientHeight - 300,
        listData: [
            {
                // Name: "",
                DeveloperName: "",
                name: "tab1",
                title: "",
                searchField: [],
                filter: {
                    filterId: ""
                },
                selectedKeys: []
            }
        ],
        currentTab: 0,
        attributes: [],
        filterList: [],
        entityName: "",
        objectTypeCode: "",
        attributes2: []
    });
    const {
        title,
        height, listData, currentTab, attributes, filterList, entityName,
        attributes2
    } = toRefs(data);
    const formState = reactive({
        Name: "",
        DeveloperName: ""
    });
    onMounted(() => {
        window.addEventListener("resize", (e) => {
            data.height = document.documentElement.clientHeight - 300;
        });
    });

    const getDetail = () => {
        let obj = {
            actions: [{
                id: "4270;a",
                descriptor: "aura://RecordUiController/ACTION$getRecordWithFields",
                callingDescriptor: "UNKNOWN",
                params: {
                    recordId: props.id,
                    apiName: props.DeveloperName
                }
            }]
        }
        let d = {
            message: JSON.stringify(obj)
        }
        proxy.$post(Interface.detail, d).then(res => {
            let { Name, DeveloperName, Layout} = res.actions[0].returnValue.fields;
            formState.Name = Name.value;
            formState.DeveloperName = DeveloperName.value;
            let list = JSON.parse(Layout.value);
            // console.log("list", list.tabs);
            data.listData = list;
        })
    }
    
    if (props.id) {
        getDetail();
    }
    const getEntityAttr = () => {
        proxy.$get(Interface.entityFilter, {
            entityApiName: props.DeveloperName
        }).then(res => {
            data.attributes = res.attributes.map(item=>{
                item.key = item.id;
                return item;
            });
            data.attributes2 = JSON.parse(JSON.stringify(res.attributes));
        })
    };
    getEntityAttr();
    const handleMoveUp = (partItem) => {
        let firstSelectedIndex = partItem.searchField.findIndex(item=>partItem.selectedKeys[0] == item);
        console.log("firstSelectedIndex",firstSelectedIndex);
        if(firstSelectedIndex > 0){
            const itemsToMove = partItem.selectedKeys.slice();
            console.log("itemsToMove", itemsToMove)
            for(const item of itemsToMove){
                const currentIndex = partItem.searchField.indexOf(item);
                partItem.searchField.splice(currentIndex, 1);
                partItem.searchField.splice(currentIndex - 1, 0, item);
            }
        }
    }
    const handleMoveDown = (partItem) => {
        const lastSelectedIndex = partItem.searchField.indexOf(item=>partItem.selectedKeys[partItem.selectedKeys.length - 1]==item);
          if (lastSelectedIndex < partItem.searchField.length - 1) {
            const itemsToMove = partItem.selectedKeys.slice().reverse();
            let top = itemsToMove.length * 40;
            for (const item of itemsToMove) {
                const currentIndex = partItem.searchField.indexOf(item);
                partItem.searchField.splice(currentIndex, 1);
                partItem.searchField.splice(currentIndex + 1, 0, item);
            }
        }
    }
    const getFilterList = () => {
        let d = {
            entityType: props.DeveloperName,
            // objectTypeCode: 39,
            // filterQuery: "\nEntityId\teq\t"+props.EntityId,
        }
        proxy.$get(Interface.listView.filterList, d).then(res => {
            data.filterList = res.actions[0].returnValue;
        });
    };
    getFilterList();
    const handleAddTab = () => {
        let obj = {
            name: "tab" + (data.listData.length + 1),
            title: "",
            searchField: [],
            filter: {
                filterId: ""
            },
            selectedKeys: []
        }
        data.listData.push(obj);
    };
    const handleTab = (item, index) => {
        data.currentTab = index;
    };
    const handleDeleteTab = (item, index) => {
        data.listData.splice(index, 1);
    };
    const handleSubmit = () => {
        formRef.value.validate().then(() => {
            var Layout = data.listData;
            let url = Interface.create;
            let obj = {
                actions: [{
                    id: "2919;a",
                    descriptor: "",
                    callingDescriptor: "UNKNOWN",
                    params: {
                        recordInput: {
                            allowSaveOnDuplicate: false,
                            apiName: "EntityListViewLayout",
                            objTypeCode: 100050,
                            fields: {
                                Name: formState.Name,
                                DeveloperName: formState.DeveloperName,
                                // EntityId: {
                                //     Id: props.EntityId
                                // },
                                EntityId: props.EntityId,
                                Layout: Layout
                            },

                        }
                    }
                }]
            };
            if (props.id) {
                obj.actions[0].params.recordId = props.id;
                url = Interface.edit;
            }
            let d = {
                message: JSON.stringify(obj)
            }
            proxy.$post(url, d).then(res => {
                formRef.value.resetFields();
                Toast("保存成功！");
                emit("callback", false);
            })
        })
    }
    const handleSubmit_old = () => {
        formRef.value
            .validate()
            .then(() => {
                console.log("values", formState, toRaw(formState));
                var Layout = data.listData;
                var obj = {
                    params: {
                        recordRep: {
                            objTypeCode: 100050,
                            fields: {
                                Name: formState.Name,
                                DeveloperName: formState.DeveloperName,
                                EntityId: {
                                    Id: "59c9b48d-5578-41f2-9ca2-689e1dac0905"
                                },
                                ObjectTypeCode: 4400,
                                Layout: Layout
                            }
                        }
                    }
                };
                var d = {
                    message: JSON.stringify(obj)
                }
                proxy.$get(Interface.save, d).then((res) => {
                    formRef.value.resetFields();
                    Toast("保存成功！");
                    emit("callback", false);
                });
            })
            .catch((err) => {
                console.log("error", err);
            });
    };
</script>
<style lang="less">
    @import url("@/style/modal.less");

    .ant-modal-content .modalContainer .modalCenter {
        /* height: 500px !important; */
    }

    .ant-modal-header {
        margin-bottom: 0 !important;
    }

    .ant-modal-footer {
        margin-top: 0 !important;
    }

    .modalCenter {
        padding: 0 !important;
    }

    .contentFlex {
        height: 100%;
        display: flex;
        justify-content: space-between;

        .leftTabs {
            width: 20%;
            height: 100%;
            border-right: 2px solid #e5e6eb;
            background: #f2f2f2;

            .leftHead {
                height: 40px;
                line-height: 40px;
                padding: 0 15px;
                border-bottom: 1px solid #e5e5e5;

                .btn {
                    margin-left: 5px;
                    width: 32px !important;
                    height: 32px !important;
                }
            }

            .leftMenuWrap {
                .itemMenu {
                    display: flex;
                    align-items: center;
                    padding: 12px;
                    border-bottom: 1px solid #e5e5e5;

                    &:hover {
                        background: #c9c9c9;
                        cursor: pointer;
                    }

                    &.active {
                        background: #fff;
                    }

                    svg {
                        cursor: move;
                        color: #747474;
                        width: 16px;
                        height: 16px;
                        fill: #747474;
                        margin-right: 10px;
                    }

                    .menuLabel {
                        font-size: 12px;
                        color: #181818;
                    }
                }
            }
        }

        .rightTabContent {
            flex: 1;
            height: 100%;
            overflow-y: auto;
        }
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

    .tabRow {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;

        .tabTitle {
            font-weight: bold;
            color: #666;
        }
    }

    .sectionLabel {
        padding: 0 10px;
        font-weight: bold;
        font-size: 12px;
        color: #666;
    }
    .ant-btn-icon:hover{
        svg{
            fill: #014486;
        }
    }
    .ant-btn-icon svg{
        width: 14px;
        height: 14px;
        fill: #747474;
    }
    .transferBox{
        display: flex;
        align-items: center;
    }
    .sortBox{
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        gap: 5px;
    }
</style>