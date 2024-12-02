<template>
    <div class="detailWrap">
        <div class="detail-header">
            <div class="primaryFieldRow">
                <div class="fieldCol" style="flex: 1;">
                    <div class="profilePicWrapper">
                        <div class="forceEntityIcon avatar">
                            <img :src="require('@/assets/img/avatar.jpg')" alt="">
                            <div class="hoverAvator">
                                <img :src="require('@/assets/img/avatar.jpg')" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="media__body">
                        <h1>
                            <div class="entityNameTitle">人员</div>
                            <div class="pageHeadTitle">人员档案</div>
                        </h1>
                    </div>
                </div>
                <div class="fieldCol actionsContainer">
                    <div class="btnBox" v-for="(item, index) in actionList" :key="index">
                        <div class="fh-btn-group ml10" v-if="Array.isArray(item)">
                            <div class="fh-btn" v-for="(row, idx) in item" :key="idx">{{row.label}}</div>
                        </div>
                        <a-button class="ml10" @click="handleClickBtn(item.devNameOrId)" v-else>{{ item.label }}</a-button>
                    </div>
                </div>
            </div>
            <ul class="pageHeader-from" v-if="Object.keys(fields).length">
                <li class="listRecordItem" v-for="(item, index) in layoutItems" :key="index">
                    <div class="formLabel">{{item.label}}</div>
                    <div class="formVal">
                        <a href="javascript:;" class="textUnderline">{{fields[item.name].displayValue}}</a>
                    </div>
                </li>
            </ul>
        </div>
        <div class="detailBody">
            <div class="detail-main">
                <div class="uiTabBar">
                    <ul class="tabs_nav">
                        <li class="tabs_nav_item" :class="{'active':activeKey==index}" v-for="(item,index) in tabs"
                            :key="index" @click="changeTabs(index)">
                            <a href="javascript:;" class="tabItemHead">
                                {{item.label}}
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="record-container">
                    <div class="recordLayout" v-if="activeKey==0">
                        <detailInfo :id="id" :objectTypeCode="objectTypeCode" :entityApiName="entityApiName" />
                    </div>
                    <div class="recordLayout" v-if="activeKey==1" style="padding-top: 0;" :style="{height:relatedHeight+'px'}">
                        <RelatedList :id="id" :objectTypeCode="objectTypeCode" :entityApiName="entityApiName" :fullName="fields.FullName.displayValue" />
                    </div>
                </div>
            </div>
            <div class="rightFileBox">
                <!-- <Files /> -->
            </div>
        </div>
        <div class="detailHeadFixed" v-if="isFixedHead">
            <div class="detailHeadFixed_left">
                <div class="forceEntityIcon avatar">
                    <img :src="require('@/assets/img/avatar.jpg')" alt="">
                    <div class="hoverAvator">
                        <img :src="require('@/assets/img/avatar.jpg')" alt="">
                    </div>
                </div>
                <div class="media_body">
                    <p class="lineName">人员</p>
                    <h1>人员</h1>
                </div>
            </div>
            <div class="detailHeadFixed_right">
                <div class="btnBox" v-for="(item, index) in actionList" :key="index">
                    <div class="fh-btn-group ml10" v-if="Array.isArray(item)">
                        <div class="fh-btn" v-for="(row, idx) in item" :key="idx">{{row.label}}</div>
                    </div>
                    <a-button class="ml10" @click="handleClickBtn(item.devNameOrId)" v-else>{{ item.label }}</a-button>
                </div>
            </div>
        </div>
        <common-form-modal :isShow="isCommon" v-if="isCommon" @cancel="isCommon=false" title="编辑" @success="getDetail" :id="id" :objectTypeCode="objectTypeCode" :entityApiName="entityApiName"></common-form-modal>

    </div>
</template>
<script setup>
    import "@/style/detail.less";
    import { ref, reactive, onMounted, toRefs, getCurrentInstance, defineEmits, toRaw } from "vue";
    import {
        UnorderedListOutlined,
        DownOutlined,
        CaretDownOutlined,
        DeleteFilled,
        DeleteOutlined
    } from "@ant-design/icons-vue";
    import detailInfo from "@/components/detail/detailInfo.vue";
    import RelatedList from "@/components/detail/RelatedList.vue";
    import Files from "@/components/detail/FilePanel.vue";
    import CommonFormModal from "@/components/listView/CommonFormModal.vue";

    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    import useWrokDetail from "@/utils/workDetail";
    const { relatedList, getRelatedWork } = useWrokDetail();
    import { useRouter, useRoute } from "vue-router";
    const router = useRouter();
    const route = useRoute();
    const data = reactive({
        tabs: [
            {
                label: "详细信息"
            },
            {
                label: "相关子集"
            },
            {
                label: "考勤"
            },
            {
                label: "工资"
            },
            {
                label: "证照"
            }
        ],
        activeKey: 0,
        id: route.query.id,
        entityApiName: route.query.sObjectName,
        objectTypeCode: route.query.objectTypeCode,
        fields: {},
        actions: [],
        actionList: [],
        isFixedHead: false,
        isCommon: false,
        relatedHeight: "",
        layoutItems: []
    })
    const { tabs, activeKey, fields, objectTypeCode, entityApiName, actions, id, actionList, isFixedHead, isCommon, relatedHeight, layoutItems } = toRefs(data);
    
    onMounted(()=>{
        window.addEventListener("scroll", (e)=>{
            let scrollTop = document.documentElement.scrollTop;
            // console.log("scrollTop:", scrollTop);
            if(scrollTop>=150){
                data.isFixedHead = true;
            }else {
                data.isFixedHead = false;
            }
        })
        window.addEventListener('resize',countHeight);
        setTimeout(function(){
            window.dispatchEvent(new Event('resize'))
        })
    })

    const countHeight = () => {
        let domHeight = document.documentElement.clientHeight;
        let relatedHeight = domHeight - 90 - 24 - 130 - 85;
        data.relatedHeight = relatedHeight;
    }

    const changeTabs = (e) => {
        data.activeKey = e;
    }

    const getCompact = () => {
        let obj = {
            actions:[{
                id: "3514;a",
                descriptor: "",
                callingDescriptor: "",
                params: {
                    recordId: data.id,
                    entityApiName:data.entityApiName
                }
            }]
        }
        let d = {
            message: JSON.stringify(obj)
        }
        proxy.$post(Interface.detailObj.compact, d).then(res=>{
            let { layoutItems } = res.actions[0].returnValue;
            data.layoutItems = layoutItems;
        })
    }
    getCompact();

    const getDetail = () => {
        let obj = {
            actions: [{
                id: "4270;a",
                descriptor: "aura://RecordUiController/ACTION$getRecordWithFields",
                callingDescriptor: "UNKNOWN",
                params: {
                    recordId: data.id,
                    apiName: data.entityApiName
                }
            }]
        };
        let d = {
            message: JSON.stringify(obj)
        }
        proxy.$post(Interface.detail, d).then(res => {
            let fields = res.actions[0].returnValue.fields;
            data.fields = fields;
        })
    };
    getDetail();

    const getActions = () => {
        let obj = {
            actions: [{
                id: "13285;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    recordId: data.id,
                    entityApiName: data.entityApiName,
                    sections: ["PAGE"]
                }
            }]
        }
        let d = {
            message: JSON.stringify(obj)
        }
        proxy.$post(Interface.detailObj.actions, d).then(res => {
            data.actions = res.actions[0].returnValue;
            let actionList = res.actions[0].returnValue;
            var temp = [];
            for (var i = 0; i < actionList.length; i++) {
                let item = actionList[i];
                if (item.isSeparator) {
                    temp.push([item]);
                } else {
                    if (Array.isArray(temp[temp.length - 1])) {
                        temp[temp.length - 1].push(item);
                    } else {
                        temp.push(item);
                    }
                }
            }
            data.actionList = temp;
        })
    }
    getActions();

    const handleClickBtn = (type) => {
        if(type=='Edit'){
            data.isCommon = true;
        }
    }
</script>
<style lang="less" scoped>
    .container{
        height: 100% !important;
    }
    .detailWrap{
        min-height: calc(100vh - 90px);
        height: 100% !important;
        overflow: unset !important;
    }
    .forceEntityIcon.avatar{
        width: 46px !important;
        height: 46px !important;
        border-radius: 50%;
        cursor: pointer;
        position: relative;
        img{
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
        &:hover{
            .hoverAvator{
                display: block;
            }
        }
        .hoverAvator{
            position: absolute;
            width: 210px;
            top: 1px;
            left: 100%;
            z-index: 9;
            padding: 10px;
            background: #fff;
            box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);
            border-radius: 4px;
            display: none;
            img{
                border-radius: 0;
            }
        }
    }
    .detailBody {
        display: flex;

        .detail-main {
            flex: 1;
        }

        .rightFileBox {
            min-width: 20%;
            max-width: 20%;
            margin-left: 20px;
            margin-top: 12px;
        }
    }
    .actionsContainer{
        display: flex;
    }
    .detailHeadFixed{
        width: 100%;
        position: fixed;
        left: 0;
        top: 90px;
        padding: 8px 28px;
        border-bottom: 1px solid #c9c9c9;
        background: #f3f3f3;
        background-clip: padding-box;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.10);
        border: 1px solid #c9c9c9;
        z-index: 98;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .detailHeadFixed_left{
            display: flex;
            .media_body{
                .lineName{
                    font-size: 13px;
                }
                h1{
                    font-size: 18px;
                }
            }
        }
        .detailHeadFixed_right{
            display: flex;
        }
    }
</style>