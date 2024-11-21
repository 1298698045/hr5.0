<template>
    <aside class="de-ls">
        <div class="de-ls-menu">
            <div class="ui-menu-list">
                <div class="ui-menu-list-item active">
                    <span class="ui-menu-list-item-lefticon">

                    </span>
                </div>
                <div class="ui-menu-list-item">
                    <span class="ui-menu-list-item-lefticon">

                    </span>
                </div>
            </div>
        </div>
        <div>
            <div class="de-ls-content">
                <header>
                    <div class="ui-menu-tab">
                        <div class="ui-menu-list">
                            <div class="ui-menu-list-item" :class="{'acitve':current==0}" @click="handleTab(0)">
                                <span class="ui-menu-list-item-content ">模板</span>
                            </div>
                            <div class="ui-menu-list-item" :class="{'acitve':current==1}" @click="handleTab(1)">
                                <span class="ui-menu-list-item-content">组件</span>
                            </div>
                            <div class="ui-menu-list-item" :class="{'acitve':current==2}" @click="handleTab(3)">
                                <span class="ui-menu-list-item-content">母版</span>
                            </div>
                        </div>
                        <div class="ui-menu-extra">
                            <a-tooltip placement="bottom">
                                <template #title>组件管理</template>
                                <span>
                                    <SettingOutlined />
                                </span>
                            </a-tooltip>
                            <a-tooltip placement="bottom">
                                <template #title>固定在左侧</template>
                                <span>
                                    <PushpinOutlined />
                                </span>
                            </a-tooltip>
                        </div>
                    </div>
                </header>
                <main>
                    <div class="panel-show" v-if="current==0">
                        <div class="de-component-panel">
                            <div class="de-component-panel-search">

                            </div>
                            <div class="de-component-list">
                                <div class="collapse-panel">
                                    <div class="collapse-panel-title">
                                        <span class="icon">
                                            <CaretDownOutlined size="10" />
                                        </span>
                                        <span title="表单组件 / 布局组件">自定义 / 门户元素模板</span>
                                    </div>
                                    <draggable class="collapse-panel-content" :sort="false" :list="templateList" itemKey="key" @start="changeStartDrag">
                                        <template #item="{ element, index }">
                                            <div class="collapse-panel-content-item" :key="element.key" @dblclick="handleAddLayout(element, index)">
                                                <div class="de-component-img">
                                                    <img src="@/assets/img/list.png" alt="">
                                                </div>
                                                <div class="de-component-name" title="明细表">{{element.displayName}}</div>
                                            </div>
                                        </template>
                                    </draggable>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="panel-show" v-if="current==1">

                    </div>
                </main>
            </div>
        </div>
    </aside>
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
        toRaw,
        nextTick,
        defineEmits,
        defineProps,
        defineExpose,
        inject,
    } from "vue";
    import draggable from "vuedraggable";
    import Interface from "@/utils/Interface.js";
    import { ObjTypeDataDict }  from "@/utils/objTypeDataDict.js";
    const { proxy } = getCurrentInstance();
    import { useRouter, useRoute } from "vue-router";
    const router = useRouter();
    const route = useRoute();
    import { useStore } from "@/store/portal.js";
    import { storeToRefs } from 'pinia';
    const store = useStore();
    const { dashboardId } = storeToRefs(store);

    import { SettingOutlined, PushpinOutlined, CaretDownOutlined } from '@ant-design/icons-vue';
    import bus from '@/utils/eventBus.js';

    const props = defineProps({
        layoutData: Object
    })

    const data = reactive({
        current: 0,
        dragData: {},
        templateList: [
            // {
            //     id: 1,
            //     key: 1,
            //     displayName: "统计",
            //     label: "统计",
            //     componentType: "statcard",
            //     w: 3,
            //     h: 3
            // },
            // {
            //     id: 1,
            //     key: 1,
            //     displayName: "统计图表",
            //     label: "统计图表",
            //     componentType: "statchart",
            //     w: 3,
            //     h: 3
            // },
            // {
            //     id: 2,
            //     key: 2,
            //     displayName: "列表",
            //     label: "列表",
            //     componentType: "list",
            //     w: 4,
            //     h: 6
            // },
            // {
            //     id: 3,
            //     key: 3,
            //     displayName: "tablist列表",
            //     label: "tablist列表",
            //     componentType: "tablist",
            //     w: 4,
            //     h: 6
            // },
            // {
            //     id: 4,
            //     key: 4,
            //     displayName: "待办事务",
            //     label: "待办事务",
            //     componentType: "processtasklist",
            //     w: 4,
            //     h: 6
            // },
            // {
            //     id: 5,
            //     key: 5,
            //     displayName: "图表",
            //     label: "图表",
            //     componentType: "chart",
            //     w: 4,
            //     h: 7
            // },
            // {
            //     id: 6,
            //     key: 6,
            //     displayName: "轮播图",
            //     label: "轮播图",
            //     componentType: "swiper",
            //     w: 4,
            //     h: 6
            // },
            // {
            //     id: 7,
            //     key: 7,
            //     displayName: "日历",
            //     label: "日历",
            //     componentType: "calendar",
            //     w: 4,
            //     h: 15
            // },
            // {
            //     id: 8,
            //     key: 8,
            //     displayName: "常用应用",
            //     label: "常用应用",
            //     componentType: "applaunch",
            //     w: 4,
            //     h: 6
            // }
        ]
    });
    const { current, dragData, templateList } = toRefs(data);

    const getTemplate = () => {
        let obj = {
            actions:[{
                id: "18;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    dashboardId: store.dashboardId
                }
            }]
        };
        let d = {
            message: JSON.stringify(obj)
        }
        proxy.$post(Interface.portal.templateList, d).then((res) => {
            let returnValue = res.actions[0].returnValue;
            // data.templateList.forEach((item) => {
            //     item.id = item.Id;
            //     item.label = item.displayName;
            //     item.componentType = item.name;
            //     item.isNewAdd = true;
            // });
            data.templateList = returnValue.map((item,index)=>{
                item.key = index;
                item.displayName = item.header;
                item.label = item.header;
                item.componentType = item.type;
                return item;
            })
        });
    };
    getTemplate();


    const handleTab = (index) => {
        data.current = index;
    }

    const changeStartDrag = (e) => {
        // console.log("e", e.item._underlying_vm_);
        data.dragData = e.item._underlying_vm_;
        bus.emit('dragData', data.dragData);
        let id = e.item._underlying_vm_.id;
    }

    const handleAddLayout = (item, index) => {
        console.log(item, index);
        bus.emit('addLayoutData', item);
    };

</script>
<style lang="less" scoped>
    .de-ls {
        height: 100%;
        min-width: 40px;
        display: flex;
        flex-direction: row;

        .de-ls-menu {
            position: relative;
            width: 40px;
            z-index: 103;
            background: #fff;
            border-right: 1px solid #e5e5e5;

            .ui-menu-list {
                .ui-menu-list-item {
                    width: 100%;
                    height: 40px;
                    border: none;

                    &.active {
                        background: #f7f7f7;
                    }
                }
            }
        }

        .de-ls-content {
            position: absolute;
            display: flex;
            flex-direction: column;
            top: 0;
            bottom: 0;
            left: 40px;
            width: 200px;
            z-index: 101;
            border-right: 1px solid #e5e5e5;
            background-color: #fff;
            transition: all .3s cubic-bezier(.645, .045, .355, 1);

            header {
                height: 35px;

                .ui-menu-tab {
                    position: relative;
                    display: flex;
                    align-items: flex-end;
                    width: 100%;
                    padding: 0 10px;
                    height: 32px;
                    border-bottom: 1px solid #e5e5e5;
                    font-size: 12px;
                    color: #666;

                    .ui-menu-list {
                        height: 100%;
                        display: flex;
                        flex: 1;

                        .ui-menu-list-item {
                            display: flex;
                            align-items: center;
                            text-align: center;
                            margin-right: 20px;
                            height: 100%;
                            cursor: pointer;

                            &:hover {
                                color: #5d9cec;
                            }

                            &.acitve {
                                color: #5d9cec;
                                border-bottom: 2px solid #5d9cec;
                            }
                        }
                    }

                    .ui-menu-extra {
                        margin-right: 0;
                        margin-left: 0;
                        display: flex;
                        height: 100%;
                        align-items: center;

                        span {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            cursor: pointer;
                            width: 20px;
                            cursor: pointer;
                        }

                        span:first-child {
                            margin-right: 7px;
                        }
                    }
                }
            }
            main{
                height: 100%;
                overflow: hidden;
            }
            .panel-show {
                height: 100%;
                .de-component-panel {
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    .de-component-panel-search {
                        display: flex;
                        padding: 10px;
                    }

                    .de-component-list {
                        padding: 0 10px;
                        .collapse-panel {
                            .collapse-panel-title {
                                border: none;
                                padding: 5px 0;
                                overflow: hidden;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                                text-transform: capitalize;
                                display: block;
                                width: 100%;
                                font-size: 12px;
                                font-weight: bold;
                                background-color: inherit;
                                transition: opacity .225s ease-in-out;
                                color: #323233;
                                cursor: pointer;
                            }

                            .collapse-panel-content {
                                display: flex;
                                flex-wrap: wrap;
                                .collapse-panel-content-item {
                                    display: inline-flex;
                                    flex-direction: column;
                                    align-items: center;
                                    cursor: move;
                                    user-select: none;
                                    width: 32%;
                                    word-wrap: break-word;
                                    vertical-align: top;
                                    .de-component-img {
                                        display: flex;
                                        align-items: center;
                                        justify-content: center;
                                        width: 100%;
                                        height: 55px;
                                        padding: 2px;
                                        border-radius: 3px;
                                        background-color: #fff;
                                        border: 1px solid #e5e5e5;
                                        transition: box-shadow .225s ease-in-out;
                                        &:hover{
                                            box-shadow: 0 0 5px rgba(0, 0, 0, .15);
                                            border: 1px solid #5d9cec;
                                        }
                                        img{
                                            width: 100%;
                                        }
                                    }

                                    .de-component-name {
                                        font-size: 12px;
                                        opacity: .8;
                                        line-height: 15px;
                                        margin: 5px 0 6px;
                                        width: 100%;
                                        text-align: center;
                                    }
                                }

                                .collapse-panel-content-item:nth-child(3n+2) {
                                    margin-right: 2%;
                                    margin-left: 2%;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    .ui-menu-tab {
        position: relative;
        display: flex;
        align-items: flex-end;
        width: 100%;
        padding: 0 10px;
        height: 32px;
        border-bottom: 1px solid #e5e5e5;
        font-size: 12px;
        color: #666;
        .ui-menu-list {
            height: 100%;
            display: flex;
            flex: 1;
            .ui-menu-list-item {
                display: flex;
                align-items: center;
                text-align: center;
                margin-right: 24px;
                height: 100%;
                cursor: pointer;

                &:hover {
                    color: #5d9cec;
                }
                &.acitve {
                    color: #5d9cec;
                    border-bottom: 2px solid #5d9cec;
                }
            }
        }
    }
</style>