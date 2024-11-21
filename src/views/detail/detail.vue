<template>
    <div class="detailWrap">
        <div class="detail-header">
            <div class="primaryFieldRow">
                <div class="fieldCol" style="flex: 1;">
                    <div class="profilePicWrapper">
                        <div style="background-color: #3BA755;" class="forceEntityIcon">
                            <img :src="require('@/assets/img/task_120.png')" alt="">
                        </div>
                    </div>
                    <div class="media__body">
                        <h1>
                            <div class="entityNameTitle">流程</div>
                            <div class="pageHeadTitle">02 差旅费报销流程 院领导 jackliu3 2023-09-22&nbsp;</div>
                        </h1>
                    </div>
                </div>
                <div class="fieldCol actionsContainer">
                    <a-button>正文</a-button>
                    <div class="fh-btn-group">
                        <div class="fh-btn">保存表单</div>
                        <div class="fh-btn" @click="handleRejection">审批拒绝</div>
                        <div class="fh-btn" @click="handleSubmitProcess">提交流程</div>
                        <a-dropdown :trigger="['click']">
                            <div class="fh-btn fh-btn-icon">
                                <svg focusable="false" aria-hidden="true" viewBox="0 0 520 520" part="icon" lwc-6qul4k2dv7m="" data-key="down" class="slds-icon slds-icon_x-small"><g lwc-6qul4k2dv7m=""><path d="M83 140h354c10 0 17 13 9 22L273 374c-6 8-19 8-25 0L73 162c-7-9-1-22 10-22z" lwc-6qul4k2dv7m=""></path></g></svg>
                            </div>
                            <template #overlay>
                                <a-menu :trigger="['click']" style="padding: 10px 0;border: 1px solid #333;border-radius: 4px;">
                                    <a-menu-item style="min-width: 98px;padding: 8px 12px; color:#0176d3;font-size: 12px;" key="1" @click="handleUrging">
                                        催办
                                    </a-menu-item>
                                    <a-menu-item style="min-width: 98px;padding: 8px 12px; color:#0176d3;font-size: 12px;" key="2" @click="handleCirculation">
                                        传阅他人
                                    </a-menu-item>
                                    <a-menu-item style="min-width: 98px;padding: 8px 12px; color:#0176d3;font-size: 12px;" key="3" @click="handleDelegate">
                                        委托
                                    </a-menu-item>
                                    <a-menu-item style="min-width: 98px;padding: 8px 12px; color:#0176d3;font-size: 12px;" key="4">
                                        打印审批单
                                    </a-menu-item>
                                    <a-menu-item style="min-width: 98px;padding: 8px 12px; color:#0176d3;font-size: 12px;" key="5">
                                        PDF
                                    </a-menu-item>
                                </a-menu>
                            </template>
                        </a-dropdown>
                    </div>
                </div>
            </div>
            <ul class="pageHeader-from">
                <li class="listRecordItem">
                    <div class="formLabel">名称</div>
                    <div class="formVal">
                        <a href="javascript:;" class="textUnderline">Bair Betty</a>
                    </div>
                </li>
            </ul>
        </div>
        <div class="detail-main">
            <div class="uiTabBar">
                <ul class="tabs_nav">
                    <li class="tabs_nav_item" :class="{'active':activeKey==index}"  v-for="(item,index) in tabs" :key="index"  @click="changeTabs(index)">
                        <a href="javscript:;" class="tabHeader">
                            {{item.label}}
                        </a>
                    </li>
                </ul>
            </div>
            <div class="record-container">
                <div class="recordLayout" v-if="activeKey==0">
                    <detailInfo />
                </div>
                <div class="recordLayout" v-if="activeKey==2">
                    <Related />
                </div>
                <div class="recordLayout" v-if="activeKey==3">
                    <Info />
                </div>
                <div class="recordLayout" v-if="activeKey==4">
                    <read-record />
                </div>
                <div class="recordLayout" v-if="activeKey==5">
                    <Comment />
                </div>
            </div>
        </div>
        
        <SubmitProcess ref="processRef" v-if="isProcess" :isShow="isProcess" @update-status="updateStatus" :paramsData="ProcessData" />
        <ApprovalRejection ref="rejectionRef" v-if="isRejection" :isShow="isRejection" @update-status="updateStatus" :paramsData="RejectionData"  />
        <circulation-modal ref="circulationRef" @update-status="updateStatus" v-if="isCirculation" :paramsData="CirculationData.params" :isShow="isCirculation"></circulation-modal>
        <Delegate ref="DelegateRef" @update-status="updateStatus" :paramsData="DelegateData.params" :isShow="isModal" v-if="isModal" />
        <Urging ref="UrgingRef" @update-status="updateStatus" v-if="isUrging" :paramsData="UrgingData.params" :isShow="isUrging" />
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
    import Related from "@/components/detail/Related.vue";
    import Info from "@/components/detail/Info.vue";
    import ReadRecord from "@/components/detail/ReadRecord.vue";
    import Comment from "@/components/detail/Comment.vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    import useWrokDetail from "@/utils/workDetail";
    const { relatedList, getRelatedWork } = useWrokDetail();
    import SubmitProcess from "@/components/workflow/SubmitProcess.vue";
    import ApprovalRejection from "@/components/workflow/ApprovalRejection.vue";
    import CirculationModal from "@/components/workflow/CirculationModal.vue";
    import Delegate from "@/components/workflow/Delegate.vue";
    import Urging from "@/components/workflow/Urging.vue";
    import detailInfo from  "@/components/detail/detailInfo.vue";
    import MoreBtn from "@/components/antDefault/MoreBtn.vue";
    const data = reactive({
        tabs: [
            {
                label: "表单信息"
            },
            {
                label: "流程图"
            },
            {
                label: "相关事务与附件信息"
            },
            {
                label: "流转信息"
            },
            {
                label: "阅读记录"
            },
            {
                label: "讨论留言"
            },
        ],
        activeKey: 0,
        isProcess: false,
        isRejection: false,
        ProcessData: {},
        RejectionData: {},
        isCirculation: false,
        isModal: false,
        isUrging: false
    })
    const { tabs, activeKey, isProcess,isRejection, ProcessData, RejectionData, isCirculation, isModal, isUrging } = toRefs(data);
    const changeTabs = (e) => {
        data.activeKey = e;
    }
    getRelatedWork();
    
    const handleSubmitProcess = () => {
        data.isProcess = true;
    }
    const handleRejection = () => {
        data.isRejection = true;
    }
    const updateStatus = () => {
        data.isProcess = false;
        data.isRejection = false;
        data.isCirculation = false;
        data.isModal = false;
        data.isUrging = false;
    }
    const CirculationData = reactive({
        params: {}
    })
    const DelegateData = reactive({
        params: {}
    })
    function CirculationFn(InstanceId,RuleLogId,InstanceIdName,ExecutorIdentityName){
        CirculationData.params = {
            InstanceId,RuleLogId,InstanceIdName,ExecutorIdentityName
        }
        data.isCirculation = true;
    }
    const handleCirculation = () => {
        data.isCirculation = true;
    }
    const handleDelegate = () => {
        data.isModal = true;
    }
    const UrgingData = reactive({
        params: {}
    })
    const handleUrging = () => {
        data.isUrging = true;
    }
</script>