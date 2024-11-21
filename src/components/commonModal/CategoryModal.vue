<template>
    <div>
        <a-modal v-model:open="props.isShow" width="550px" :maskClosable="false" @cancel="handleCancel"
            @ok="handleSubmit">
            <template #title>
                <div style="text-align: center;">
                    选择分类
                </div>
            </template>
            <div class="modalContainer">
                <div class="search">
                    <a-input placeholder="请输入关键字搜索"></a-input>
                </div>
                <div class="modalCenter">
                    <div class="tabContainerTree">
                        <a-tree :tree-data="categoryList" block-node @select="handleSelectTree">
                            <template #title="{ text, key }">
                                <span v-if="key === '0-0-1-0'" style="color: #1890ff">{{ text }}</span>
                                <template v-else>{{ text }}</template>
                            </template>
                        </a-tree>
                    </div>
                </div>
            </div>
            <template #footer>
                <div>
                    <a-button type="primary" @click.prevent="handleSubmit">确定</a-button>
                    <a-button @click="clearData">清除</a-button>
                    <a-button @click="handleCancel">取消</a-button>
                </div>
            </template>
        </a-modal>
    </div>
</template>
<script setup>
    import {
        ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, defineProps, defineExpose,
        defineEmits
    } from "vue";
    import { message } from 'ant-design-vue';
    import { SearchOutlined, DownOutlined, UserOutlined } from "@ant-design/icons-vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    const labelCol = ref({ style: { width: '100px' } });
    const props = defineProps({
        isShow: Boolean
    })
    const emit = defineEmits(['cancel', 'select-val']);
    const handleCancel = () => {
        emit("cancel", false);
    }

    const data = reactive({
        currentTab: '1',
        categoryList: [],
        deptList: [],
        selectData: {}
    })
    const { currentTab, categoryList, deptList, selectData } = toRefs(data);
    const getTreeDept = () => {
        proxy.$get(Interface.categoryList, {
            entity: "entitycategory",
            search: ""
        }).then(res => {
            console.log("res", res);
            data.deptList = res.rows;
            let rows = res.rows;
            data.categoryList = formTreeData(rows);
            console.log("categoryList", data.categoryList)
        })
    }
    getTreeDept();

    const formTreeData = (list) => {
        var result = [];
        if (!Array.isArray(list)) {
            return result;
        }
        var map = {};
        list.forEach(function (item) {
            map[item.id] = item;
        });
        list.forEach(function (item) {
            var parent = map[item.pid];
            if (parent) {
                parent.children = parent.children || [];
                parent.children.push(item);
            } else {
                result.push(item);
            }
        });
        return result;
    }

    const handleSelectTree = (selectedKeys,selectedNodes) => {
        console.log("e",selectedKeys,selectedNodes);
        data.selectData = {
            ID: selectedNodes.node.id,
            Name: selectedNodes.node.text
        }
    }
    const clearData = () => {
        data.selectData = [];
    }
    const handleSubmit = () => {
        if(Object.keys(data.selectData).length){
            emit("select-val", data.selectData);
        }else {
            Toast('请选择部门!');
        }
    }
</script>
<style lang="less" scoped>
    @import url('@/style/modal.less');

    .headerTab {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #e2e3e5;
        padding: 0 10px;

        .search {
            width: 200px;
        }
    }

    :deep :where(.css-dev-only-do-not-override-kqecok).ant-tabs>.ant-tabs-nav,
    :where(.css-dev-only-do-not-override-kqecok).ant-tabs>div>.ant-tabs-nav {
        margin: 0 !important;
    }
</style>