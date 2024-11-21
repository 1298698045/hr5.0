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
                                <span class="ui-menu-list-item-content ">组件</span>
                            </div>
                            <div class="ui-menu-list-item" :class="{'acitve':current==1}" @click="handleTab(1)">
                                <span class="ui-menu-list-item-content">已有字段</span>
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
                                        <span title="表单组件 / 布局组件">表单组件 / 布局组件</span>
                                    </div>
                                    <draggable class="collapse-panel-content" :sort="false" :list="listData" itemKey="key" @start="changeStartDrag">
                                        <template #item="{ element, index }">
                                            <div class="collapse-panel-content-item" :key="element.key">
                                                <div class="de-component-img">
    
                                                </div>
                                                <div class="de-component-name" title="明细表">{{element.name}}</div>
                                            </div>
                                        </template>
                                    </draggable>
                                    <!-- <div class="collapse-panel-content">
                                    </div> -->
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="panel-show" v-if="current==1">
                        <div class="de-component-panel">
                            <div class="de-component-panel-search">
                                <a-input v-model:value="searchVal" placeholder="请输入组件名称" @change="saerchFiled"></a-input>
                            </div>
                            <div class="de-component-menu-list">
                                <div class="ui-menu-tab">
                                    <div class="ui-menu-list">
                                        <div class="ui-menu-list-item" :class="{'acitve':tableCurrent==0}" @click="handleTabTable(0)">
                                            <span class="ui-menu-list-item-content ">主表</span>
                                        </div>
                                        <div class="ui-menu-list-item" :class="{'acitve':tableCurrent==1}" @click="handleTabTable(1)">
                                            <span class="ui-menu-list-item-content">明细表</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="de-component-menu-list-content" v-if="tableCurrent==0">
                                    <span>标题</span>
                                    <span>类型</span>
                                    <draggable :sort="false" :list="fields" filter=".disabled" itemKey="key" @start="changeStartDrag">
                                        <template #item="{ element, index }">
                                            <div class="de-component-menu-list-content-associate" :class="{'disabled':!element.isDrag}">
                                                <span><span class="weapp-de-component-name" :title="element.label">{{element.label}}</span></span>
                                                <span><span class="weapp-de-component-name" :title="element.type">{{ObjTypeDataDict[element.type]}}</span></span>
                                            </div>
                                        </template>
                                    </draggable>
                                </div>
                                <div v-if="tableCurrent==1">
                                    <draggable class="de-component-menu-list-content"  filter=".disabled" :sort="false" :list="relatedList" itemKey="key" @start="changeStartDrag">
                                        <template #item="{ element, index }">
                                            <span class="de-component-normal" :class="{'disabled':!element.isDrag}">
                                                <span class="weapp-de-component-name" :title="element.label">{{element.label}}</span>
                                            </span>
                                        </template>
                                    </draggable>
                                </div>
                            </div>
                        </div>
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

    import { SettingOutlined, PushpinOutlined, CaretDownOutlined } from '@ant-design/icons-vue';
    import bus from '@/utils/eventBus.js';

    const props = defineProps({
        layoutData: Object
    })

    const data = reactive({
        current: 1,
        tableCurrent: 0,
        listData: [
            {
                key: 1,
                name: 'name1'
            },
            {
                key: 2,
                name: 'name2'
            },
            {
                key: 3,
                name: 'name3'
            }
        ],
        dragData: {},
        entityId: route.query.entityId,
        fields: [],
        troughdata: [],
        relatedList: [],
        troughdataFixed: [],
        relatedListFixed: [],
        searchVal: ""
    });
    const { current, tableCurrent, listData, dragData, entityId, fields, troughdata, relatedList,
        troughdataFixed, relatedListFixed, searchVal
     } = toRefs(data);

    const getQuery = () => {
        proxy.$get(Interface.formbuilder.troughData, {
            type: data.entityId
        }).then(res=>{
            // var result = [];
            // for(var i =0 ; i < res.length;i+=2){ 
            //     result.push(res.slice(i,i+2)); 
            // }
            // data.fields = result;
            // console.log("result", result);

            console.log("props.layoutData", props.layoutData);

            let troughdata = res.filter(item=>item.displayCategory!='RelatedList').map(item=>{
                // item.typeImg = getTypeImg(item.type);
                item.isDrag = true;
                return item;
            });
            data.troughdataFixed = JSON.parse(JSON.stringify(troughdata));
            let relatedList = res.filter(item=>item.displayCategory=='RelatedList').map(item=>{
                // item.isCollapsed = true;
                // item.fields = [];
                item.isDrag = true;
                return item;
            });
            // let result = [];
            // for(var i =0 ; i < troughdata.length;i+=2){ 
            //     result.push(troughdata.slice(i,i+2)); 
            // }
            data.fields = troughdata;
            // let result2 = [];
            // for(var i =0 ; i < relatedList.length;i+=2){ 
            //     result2.push(relatedList.slice(i,i+2)); 
            // }
            data.relatedListFixed = JSON.parse(JSON.stringify(relatedList));
            data.relatedList = relatedList;
            if(props.layoutData.formLayout){
                let comps = props.layoutData.formLayout.pageLayouts[0].comps;
                console.log("comps", comps);
                data.fields.forEach(item=>{
                    comps.forEach(v=>{
                        if(item.id==v.id){
                            item.isDrag = false;
                        }
                    })
                })
                data.relatedList.forEach(item=>{
                    comps.forEach(v=>{
                        if(item.id==v.id){
                            item.isDrag = false;
                        }
                    })
                })
            }
            
        })
    };

    getQuery();

    const saerchFiled = () => {
        console.log("searchField", data.searchVal);
        if(data.tableCurrent==0){
            data.fields = data.troughdataFixed.filter(item=>{
                return item.label.indexOf(data.searchVal) != -1;
            });
        }else {
            data.relatedList = data.relatedListFixed.filter(item=>{
                return item.label.indexOf(data.searchVal) != -1;
            });
        }
    }

    const handleTab = (index) => {
        data.current = index;
    }
    const handleTabTable = (index) => {
        data.tableCurrent = index;
    }
    const changeStartDrag = (e) => {
        // console.log("e", e.item._underlying_vm_);
        data.dragData = e.item._underlying_vm_;
        bus.emit('dragData', data.dragData);
        let id = e.item._underlying_vm_.id;
        data.fields.forEach(item=>{
            if(id==item.id){
                item.isDrag = false;
            }
        });
        data.relatedList.forEach(item=>{
            if(id==item.id){
                item.isDrag = false;
            }
        })
        // if(Object.keys(data.dragData).length==0){
        // }
    }
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
                    .de-component-menu-list{
                        height: calc(100% - 52px);
                        .de-component-menu-list-content{
                            height: calc(100% - 32px);
                            overflow: auto;
                            font-size: 12px;
                            &>span{
                                width: 50%;
                                display: inline-flex;
                                flex-direction: column;
                                align-items: center;
                                padding: 7px 0;
                                line-height: 18px;
                                border-top: 1px solid #f1f1f1;
                            }
                            &>span:nth-child(-n+2){
                                background-color: #fbfbfb;
                            }
                            .de-component-menu-list-content-associate{
                                cursor: move;
                                color: #666;
                                border-top: 1px solid #f1f1f1;
                                &:hover{
                                    background-color: #f1f1f1;
                                }
                                &.disabled{
                                    cursor: auto;
                                    color: #bbb;
                                }
                                span{
                                    width: 50%;
                                    display: inline-flex;
                                    flex-direction: column;
                                    align-items: center;
                                    padding: 7px 0;
                                    line-height: 18px;
                                    &:hover{
                                        color: #5d9cec;
                                    }
                                }
                                .weapp-de-component-name{
                                    display: -webkit-box;
                                    -webkit-box-orient: vertical;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    -webkit-line-clamp: 2;
                                    text-align: center;
                                    white-space: pre-wrap;
                                    word-break: break-word;
                                    pointer-events: none;
                                    padding: 0 5px;
                                    width: 100%;
                                }
                            }
                            .de-component-normal{
                                width: 100%;
                                cursor: move;
                                color: #666;
                                &:hover{
                                    background-color: #f1f1f1;
                                }
                                &>span:nth-child(-n+2){
                                    /* background-color: #fbfbfb; */
                                }
                                &.disabled{
                                    cursor: auto;
                                    color: #bbb;
                                }
                                .weapp-de-component-name {
                                    display: -webkit-box;
                                    -webkit-box-orient: vertical;
                                    -webkit-line-clamp: 2;
                                    overflow: hidden;
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