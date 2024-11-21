<template>
    <header class="de-header">
        <div class="de-header-leftside">
            <span style="padding: 0px 10px; font-weight: bold;">表单设计器</span>
        </div>
        <div class="de-header-center">
            <div class="de-header-title" title="供应商卡片">供应商卡片</div>
        </div>
        <div class="de-header-rightside">
            <div class="de-header-save-preview">
                <a-button class="ui-btn" @click="handleSave">保存</a-button>
                <a-button class="ui-btn" @click="handlePreview">预览</a-button>
                <a-button type="link" @click="handleMobileDesign">移动端表单设计</a-button>
            </div>
            <a-tooltip>
                <template #title>点击查看帮助</template>
                <div class="ui-help">
                    <span>
                        <span class="ui-icon">
                            <QuestionCircleOutlined />
                        </span>
                    </span>
                </div>
            </a-tooltip>
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
    import { QuestionCircleOutlined } from '@ant-design/icons-vue';
    import { useRoute, useRouter } from "vue-router";
    const router = useRouter();
    const route = useRoute();

    const emit = defineEmits(['save']);
    const data = reactive({
    })
    const { } = ref(data);

    const handleSave = () => {
        emit("save", true);
    };

    const handleMobileDesign = () => {
        router.push({
            name: "MobileDesign",
            query: {
                entityId: route.query.entityId,
                id: route.query.id
            }
        })
    }

    const handlePreview = () => {
        const url = router.resolve({
            name: "FormPreview",
            query: {
                entityId: route.query.entityId,
                id: route.query.id
            }
        });
        window.open(url.href);
    }

</script>
<style lang="less" scoped>
    .de-header{
        width: 100%;
        height: 46px;
        background: #fff;
        border-bottom: 1px solid #e5e5e5;
        display: flex;
        align-items: center;
        position: relative;
        &>div{
            display: flex;
            align-items: center;
            height: 100%;
        }
        .de-header-center{
            position: absolute;
            left: 240px;
            right: 240px;
            .de-header-title{
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
        .de-header-rightside{
            position: absolute;
            right: 5px;
            &>div{
                display: flex;
            }
            .de-header-save-preview{
                .ui-btn{
                    margin: 0 6px;
                }
            }
            .ui-icon{
                display: inline-block;
                padding: 14px 9px;
                cursor: pointer;
                &:hover{
                    background: #f7f7f7;
                }
                .icon-help{
                    width: 16px;
                    height: 16px;
                    color: #666;
                }
            }
            .ebcoms-avatar{
                min-width: 50px;
                padding: 0 10px;
                cursor: default;
                height: 100%;
                align-items: center;
                font-size: 12px;
                .ebcoms-avatar-img{
                    width: 30px;
                    height: 30px;
                    cursor: pointer;
                    img{
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                    }
                }
                .ebcoms-avatar-desc{
                    margin-left: 8px;
                    span{
                        max-width: 100px;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                        display: block;
                    }
                    span:first-child{
                        line-height: 16px;
                        &:hover{
                            color: #5d9cec;
                            cursor: pointer;
                        }
                    }
                    span:last-child{
                        color: #aaa;
                    }
                }
            }
        }
    }
</style>