<template>
    <div class="de-ls">
        <div class="weapp-ebde-pp-search">
            <a-input placeholder="请输入页面名称">
                <template #suffix>
                    <SearchOutlined />
                </template>
            </a-input>
            <div class="weapp-ebde-page-switch-suffix">
                <div class="btnGroup">
                    <a-button class="ant-btn-icon" :type="currentType == 0 ? 'primary' : 'default'" title="显示卡片切换" @click="currentType=0">
                        <WindowsOutlined />
                    </a-button>
                    <a-button class="ant-btn-icon" :type="currentType == 1 ? 'primary' : 'default'" title="显示属性切换" @click="currentType=1">
                        <UnorderedListOutlined />
                    </a-button>
                </div>
            </div>
        </div>
        <div class="weapp-ebde-page-card-content" v-if="currentType == 0">
            <div>
                <div>
                    <span class="page-thumbnail selected">
                        <img src="@/assets/img/thumbnail.png" alt="" class="weapp-ebde-card-pc-thumb">
                    </span>
                    <span class="page-name">供应商门户</span>
                </div>
                <div>
                    <span class="page-thumbnail">
                        <img src="@/assets/img/thumbnail.png" alt="" class="weapp-ebde-card-pc-thumb">
                    </span>
                    <span class="page-name">供应商门户</span>
                </div>
            </div>
        </div>
        <div class="weapp-ebde-page-tree-content" v-else>
            <a-tree
                blockNode   
                :show-line="showLine"
                :show-icon="showIcon"
                :tree-data="treeData"
                @select="onSelect"
                >
                <template #icon>
                    <FileOutlined v-if="!dataRef.children || dataRef.children.length === 0" />
                    <FolderOpenOutlined v-else />
                </template>
                <template #title="{ dataRef }">
                    <template v-if="dataRef.key === '0-0-0-1'">
                    <div>multiple line title</div>
                    <div>multiple line title</div>
                    </template>
                    <template v-else>{{ dataRef.title }}</template>
                </template>
                <template #switcherIcon="{ dataRef }">
                    <FolderOpenOutlined  />
                </template>
            </a-tree>
        </div>
    </div>
</template>
<script setup>
    import { ref, reactive, toRefs, onMounted, getCurrentInstance, watch } from "vue";
    import { SearchOutlined, WindowsOutlined, UnorderedListOutlined, SmileTwoTone, FileOutlined, FolderOpenOutlined } from '@ant-design/icons-vue';
    const treeData = ref([
        {
            title: 'parent 1',
            key: '0-0',
            children: [
            {
                title: 'parent 1-0',
                key: '0-0-0',
                children: [
                {
                    title: 'leaf',
                    key: '0-0-0-0',
                },
                {
                    key: '0-0-0-1',
                },
                {
                    title: 'leaf',
                    key: '0-0-0-2',
                },
                ],
            },
            {
                title: 'parent 1-1',
                key: '0-0-1',
                children: [
                {
                    title: 'leaf',
                    key: '0-0-1-0',
                },
                ],
            },
            {
                title: 'parent 1-2',
                key: '0-0-2',
                children: [
                {
                    title: 'leaf 1',
                    key: '0-0-2-0',
                },
                {
                    title: 'leaf 2',
                    key: '0-0-2-1',
                },
                ],
            },
            ],
        },
        {
            title: 'parent 2',
            key: '0-1',
            children: [
            {
                title: 'parent 2-0',
                key: '0-1-0',
                children: [
                {
                    title: 'leaf',
                    key: '0-1-0-0',
                },
                {
                    title: 'leaf',
                    key: '0-1-0-1',
                },
                ],
            },
            ],
        },
    ]);
    const data = reactive({
        currentType: 0,
        showLine: true,
        showIcon: false
    });
    const { currentType, showLine, showIcon } = toRefs(data);

    const onSelect = (e) => {

    };

</script>
<style lang="less" scoped>
    .de-ls{
        position: absolute;
        width: 199px;
        min-width: 199px;
        height: 100%;
        border-right: 1px solid #e5e5e5;
        background-color: #fff;
        transition: all .3s linear;
        .weapp-ebde-pp-search{
            display: flex;
            align-items: center;
            justify-content: flex-end;
            padding: 10px 6px 10px 10px;
            .weapp-ebde-page-switch-suffix{
                display: flex;
                color: #666;
                cursor: pointer;
                padding-left: 5px;
            }
            .weapp-ebde-page-switch-suffix{
                white-space: nowrap;
            }
        }
        .weapp-ebde-page-card-content{
            height: calc(100% - 50px);
            padding: 0 10px;
            overflow-y: auto;
            text-transform: capitalize;
            &>div{
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
                &>div{
                    display: inline-flex;
                    flex-direction: column;
                    align-items: center;
                    width: 48%;
                    span.page-thumbnail:first-child{
                        display: flex;
                        align-items: center;
                        position: relative;
                        justify-content: center;
                        width: 100%;
                        height: 80px;
                        padding: 2px;
                        border-radius: 3px;
                        background: #f7f7f7;
                        cursor: pointer;
                        .weapp-ebde-card-pc-thumb{
                            width: 70px;
                            height: 50px;
                            background-color: #f9f9f9;
                            box-shadow: 0 0 10px 0 rgba(0, 0, 0, .04);
                            object-fit: cover;
                        }
                        &.selected{
                            border: 1px solid #5d9cec;
                        }
                        &:hover{
                            border: 1px solid #5d9cec;
                        }
                    }
                    span.page-name{
                        width: 100%;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        overflow: hidden;
                        &:last-child{
                            margin: 6px 0;
                            font-size: 12px;
                        }
                    }
                }
            }
        }
    }
</style>