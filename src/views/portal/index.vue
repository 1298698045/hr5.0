<template>
    <div class="designWrap">
        <header class="de-header">
            <div class="de-header-leftside">
                <span style="padding: 0px 10px; font-weight: bold;">门户设计器</span>
            </div>
            <div class="de-header-center">
                <div class="de-header-title" title="供应商卡片">供应商卡片</div>
            </div>
            <div class="de-header-rightside">
                <div class="de-header-save-preview">
                    <!-- <a-button class="ui-btn" @click="handleSave">保存</a-button> -->
                    <a-button class="ui-btn" @click="handlePreview">预览</a-button>
                    <a-button class="ui-btn" @click="handleBack">返回主页</a-button>
                </div>
                <div class="ebcoms-avatar">
                    <div class="ebcoms-avatar-img">
                        <img src="@/assets/img/useravatar-default.png" alt="">
                    </div>
                    <div class="ebcoms-avatar-desc">
                        <span class="ebcoms-avatar-username" title="低代码体验">低代码体验</span>
                        <span title="低代码演示平台">低代码演示平台</span>
                    </div>
                </div>
            </div>
        </header>
        <main class="de-main">
            <LeftAside :layoutData="layoutData" />
            <main class="weapp-de-workspace" :class="{'active':isMasterAttr}" @click="handleMaster">
                <ProtalGridLayout />
            </main>
            <RightAside />
        </main>
        <LeaveModal v-if="isLeave" :isShow="isLeave" desc="有未保存的数据，是否要关闭？" @cancel="isLeave=false" @ok="confirmClear" />
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
        toRaw,
        nextTick,
        defineEmits,
        defineProps,
        defineExpose,
        inject,
    } from "vue";
    import ProtalGridLayout from "@/components/portal/PortalGridLayout.vue";
    import LeftAside from "@/components/portal/LeftAside.vue";
    import RightAside from "@/components/portal/RightAside.vue";
    import LeaveModal from "@/components/commonModal/LeaveModal.vue"
    import Interface from "@/utils/Interface.js";
    import { useRoute, useRouter } from "vue-router";
    const { proxy } = getCurrentInstance();
    import { useStore } from "@/store/portal.js";
    import { storeToRefs } from 'pinia';
    import { getCommonDetail } from "@/utils/commonApi.js";
    const store = useStore();
    store.initializeFromRoute();
    const { dashboardId, isMasterAttr, isConfigChange } = storeToRefs(store);
    const router = useRouter();

    const data = reactive({
        layoutData: [],
        isLeave: false
    });

    const { layoutData, isLeave } = toRefs(data);

    const getDetail = async () => {
        const res = await getCommonDetail(store.dashboardId, 'PageDashboard');
        let fields = res.fields;
        store.themeType = fields.Theme.value;
    };
    getDetail();

    const getQuery = () => {

        let obj = {
            actions: [
                {
                    id: "18;a",
                    descriptor: "",
                    callingDescriptor: "UNKNOWN",
                    params: {
                        dashboardId: store.dashboardId,
                        networkId: "000000000000000",
                        runningUser: "0059000000390WhAAI",
                        requestOrigin: ""
                    }
                }
            ]
        }
        let d = {
            message: JSON.stringify(obj)
        }
        proxy.$post(Interface.portal.layoutList, d).then(res=>{

        })
    };
    // getQuery();

    const handleSave = () => {
        
    };
    const handlePreview = () => {
        const url = router.resolve({
            name: "PortalPreview",
            query: {
                id: store.dashboardId
            }
        });
        window.open(url.href);
    };
    const handleMaster = () => {
        if(store.isConfigChange){
            data.isLeave = true;
            return false;
        }
        store.isMasterAttr = true;
    }

    const confirmClear = () => {
        data.isLeave = false;
        store.isConfigChange = false;
        store.isMasterAttr = true;
    }

    const handleBack = () => {
        router.push({
            path: "/lightning/o/PageDashboard"
        })
    }
</script>



<style lang="less" scoped>
    .designWrap {
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        background: #f7f7f7;
    }
    .de-header {
        width: 100%;
        height: 46px;
        background: #fff;
        border-bottom: 1px solid #e5e5e5;
        display: flex;
        align-items: center;
        /* position: fixed;
        z-index: 9999; */

        &>div {
            display: flex;
            align-items: center;
            height: 100%;
        }

        .de-header-center {
            position: absolute;
            left: 240px;
            right: 240px;

            .de-header-title {
                top: 0;
                line-height: 46px;
                display: inline-block;
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                user-select: none;
                max-width: 150px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                word-break: break-word;
                font-size: 12px;
            }
        }

        .de-header-rightside {
            position: absolute;
            right: 5px;

            &>div {
                display: flex;
            }

            .de-header-save-preview {
                .ui-btn {
                    margin: 0 6px;
                }
            }

            .ui-icon {
                display: inline-block;
                padding: 14px 9px;
                cursor: pointer;

                &:hover {
                    background: #f7f7f7;
                }

                .icon-help {
                    width: 16px;
                    height: 16px;
                    color: #666;
                }
            }

            .ebcoms-avatar {
                min-width: 50px;
                padding: 0 10px;
                cursor: default;
                height: 100%;
                align-items: center;
                font-size: 12px;

                .ebcoms-avatar-img {
                    width: 30px;
                    height: 30px;
                    cursor: pointer;

                    img {
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                    }
                }

                .ebcoms-avatar-desc {
                    margin-left: 8px;

                    span {
                        max-width: 100px;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                        display: block;
                    }

                    span:first-child {
                        line-height: 16px;

                        &:hover {
                            color: #5d9cec;
                            cursor: pointer;
                        }
                    }

                    span:last-child {
                        color: #aaa;
                    }
                }
            }
        }
    }
    .de-main {
        position: relative;
        display: flex;
        height: 100%;
        flex: 1 1;
        flex-direction: row;
        overflow: hidden;
        .weapp-de-workspace{
            flex: 1 1 auto;
            flex-basis: 0;
            overflow: auto;
            margin-left: 200px;
            background-color: #f0f1f4;
            transition: all .3s cubic-bezier(.645,.045,.355,1);
            border: 1px solid transparent;
            &.active{
                border: 1px solid #5d9cec;
            }
        }
    }
</style>