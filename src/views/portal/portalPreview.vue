<template>
    <div class="designWrap">
        <header class="de-header" v-show="!isFullScreen">
            <div class="de-header-leftside">
                <span style="padding: 0px 10px; font-weight: bold;">页面预览 | 供应商门户</span>
            </div>
            <div class="de-header-center">
                <div class="de-header-title" title="供应商卡片">供应商卡片</div>
            </div>
            <div class="de-header-rightside">
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
            <LeftAside v-show="!isFullScreen" />
            <main class="weapp-de-workspace" :class="{'active':!isFullScreen}">
                <ProtalGridLayout />
            </main>
        </main>
        <div class="weapp-ebde-panel-board-wraper">
            <div class="weapp-ebde-button-group-wrap">
                <a-tooltip placement="left">
                    <template #title>
                        <span>全屏</span>
                    </template>
                    <div class="weapp-ebde-button-group-item" @click="handleFullScreen">
                        <button class="ui-btn">
                            <FullscreenOutlined />
                        </button>
                    </div>
                </a-tooltip>
            </div>
            <div class="weapp-ebde-button-group-wrap">
                <a-tooltip placement="left">
                    <template #title>
                        <span>页面地址</span>
                    </template>
                    <div class="weapp-ebde-button-group-item">
                        <button class="ui-btn">
                            <LinkOutlined />
                        </button>
                    </div>
                </a-tooltip>
            </div>
        </div>
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
    import { FullscreenOutlined, LinkOutlined } from '@ant-design/icons-vue';
    import ProtalGridLayout from "@/components/portalPreview/PortalGridLayout.vue";
    import LeftAside from "@/components/portalPreview/LeftAside.vue";
    import Interface from "@/utils/Interface.js";
    import { useRoute, useRouter } from "vue-router";
    const { proxy } = getCurrentInstance();
    import { useStore } from "@/store/portal.js";
    import { storeToRefs } from 'pinia';
    import { getCommonDetail } from "@/utils/commonApi.js";
    const store = useStore();
    store.initializeFromRoute();
    const { dashboardId, isMasterAttr } = storeToRefs(store);
    const router = useRouter();

    const data = reactive({
        layoutData: [],
        isFullScreen: false
    });

    const { layoutData, isFullScreen } = toRefs(data);

    const getDetail = async () => {
        const res = await getCommonDetail(store.dashboardId, 'PageDashboard');
        let fields = res.fields;
        store.themeType = fields.Theme.value;
    };
    getDetail();

    const handleSave = () => {

    };
    const handlePreview = () => {

    };

    const handleFullScreen = () => {
        data.isFullScreen = !data.isFullScreen;
    };

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
            background-color: #f0f1f4;
            transition: all .3s cubic-bezier(.645,.045,.355,1);
            &.active{
                margin-left: 200px;
            }
        }
    }
    .weapp-ebde-panel-board-wraper{
        position: fixed;
        right: 40px;
        top: 100px;
        z-index: 200;
        .weapp-ebde-button-group-wrap{
            margin-top: 10px;
            display: flex;
            
            color: #666;
            cursor: pointer;
            box-shadow: 0 0 10px 0 rgba(24, 16, 16, .1);
            .weapp-ebde-button-group-item{
                display: flex;
                flex-direction: column;
                overflow: hidden;
                border: 1px solid #e5e5e5;
            }
        }
    }
    .ui-btn{
        outline: none;
        position: relative;
        text-align: center;
        line-height: 16px;
        font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 32px;
        width: 34px;
        color: #666;
        border: 0;
        border-radius: 0;
        background: #fff;
        cursor: pointer;
        &::before{
            content: "";
            transition: all .3s cubic-bezier(.645,.045,.355,1);
            opacity: .2;
            background-color: transparent;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
        }
        &:hover{
            color: #666;
            &::before{
                height: 32px;
                background: #5d9cec;
            }
        }
    }
</style>