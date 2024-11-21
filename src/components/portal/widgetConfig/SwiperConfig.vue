<template>
    <div class="formConfig">
        <a-form>
            <a-form-item label="标题" class="formItem">
                <a-input v-model:value="formState.name"></a-input>
            </a-form-item>
            <div class="collapse-panel">
                <div class="collapse-panel-title" @click="handleCollapse('isPhoto')">
                    <span class="icon-wrapper">
                        <CaretDownOutlined v-if="isPhoto" />
                        <CaretRightOutlined v-else />
                    </span>
                    图片设置
                </div>
                <div class="collapse-panel-body" v-if="isPhoto">
                    <div class="swiper-wrapper">
                        <draggable :list="listData" group="list" itemKey="list">
                            <template #item="{element:item, index}">
                                <div class="swiper-img-item">
                                    <div class="divider" v-if="index>0"></div>
                                    <div class="img-wrapper">
                                        <img :name="item.title" src="@/assets/img/portal_banner.png" alt="">
                                        <div class="img-item-footer">
                                            <a-tooltip placement="bottom">
                                                <template #title>
                                                  <span>更换图片</span>
                                                </template>
                                                <span class="opera-icon" @click="handleEditPhoto">
                                                    <EditOutlined />
                                                </span>
                                            </a-tooltip>
                                            <a-tooltip placement="bottom">
                                                <template #title>
                                                  <span>链接</span>
                                                </template>
                                                <span class="opera-icon" @click="handlePhotoLink(item)">
                                                    <LinkOutlined />
                                                </span>
                                            </a-tooltip>
                                            <a-tooltip placement="bottom">
                                                <template #title>
                                                  <span>标题</span>
                                                </template>
                                                <span class="opera-icon" @click="handleTitle(item)">
                                                    <LinkOutlined />
                                                </span>
                                            </a-tooltip>
                                            <a-tooltip placement="bottom">
                                                <template #title>
                                                  <span>描述</span>
                                                </template>
                                                <span class="opera-icon" @click="handleDesc(item)">
                                                    <MessageOutlined />
                                                </span>
                                            </a-tooltip>
                                            <a-tooltip placement="bottom">
                                                <template #title>
                                                  <span>删除</span>
                                                </template>
                                                <span class="opera-icon" @click="handleDelete(item, index)">
                                                    <DeleteOutlined />
                                                </span>
                                            </a-tooltip>
                                        </div>
                                    </div>
                                    <div class="img-item-content" v-if="item.isTitle">
                                        <a-input></a-input>
                                    </div>
                                    <div class="img-item-content" v-if="item.isDesc">
                                        <a-textarea></a-textarea>
                                    </div>
                                </div>
                            </template>
                        </draggable>
                        <a-button block @click="handleAddPhoto"><PlusOutlined />添加图片</a-button>
                    </div>
                </div>
            </div>
        </a-form>
        <a-button block @click="handleSave">保存</a-button>
        <PhotoSetting v-if="isPhotoSetting" :imgUrl="imgUrl" :isShow="isPhotoSetting" @cancel="isPhotoSetting=false"></PhotoSetting>
        <PhotoLink v-if="isPhotoLink" :isShow="isPhotoLink" @cancel="isPhotoLink=false"></PhotoLink>
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
        h,
        nextTick,
        defineProps,
        defineExpose,
        defineEmits,
    } from "vue";
    import draggable from 'vuedraggable';
    import "@/style/icon/iconfont.css";
    import { CaretDownOutlined, CaretRightOutlined, PlusOutlined, EditOutlined, LinkOutlined, MessageOutlined, DeleteOutlined } from "@ant-design/icons-vue";
    import PhotoSetting from "@/components/portal/PhotoSetting.vue";
    import PhotoLink from "@/components/portal/PhotoLink.vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();

    import { useRoute, useRouter } from "vue-router";
    const route = useRoute();
    import { useStore } from "@/store/portal";
    const store = useStore();
    const { name, properties } = store.currentData;

    const formState = reactive({
        name: name || ''
    })

    const data = reactive({
        isPhoto: true,
        listData: [
            {
                title: "1",
                isTitle: false,
                isDesc: false
            },
            {
                title: "2",
                isTitle: false,
                isDesc: false
            }
        ],
        isPhotoSetting: false,
        imgUrl: "",
        isPhotoLink: false,
        dashboardId: route.query.id
    });

    const { isPhoto, listData, isPhotoSetting, imgUrl, isPhotoLink, dashboardId } = toRefs(data);

    const handleCollapse = (field) => {
        data[field] = !data[field];
    }

    const handleTitle = (item) => {
        item.isTitle = !item.isTitle;
        if(item.isTitle){
            item.isDesc = false;
        }
    };

    const handleDesc = (item) => {
        item.isDesc = !item.isDesc;
        if(item.isDesc){
            item.isTitle = false;
        }
    };

    const handleAddPhoto = () => {
        data.isPhotoSetting = true;
    };

    const handleEditPhoto = () => {
        data.isPhotoSetting = true;
    };

    const handlePhotoLink = (item) => {
        data.isPhotoLink = true;
    };
    const handleDelete = (item, index) => {
        data.listData.splice(index, 1);
    };

    const handleSave = () => {
        let properties;
        let componentType = store.currentData.componentType;

        let obj = {
            componentType: store.currentData.componentType,
            chartTheme: null,
            componentData: 0,
            footer: null,
            header: formState.name,
            id: "",
            lastModifiedDate: "",
            properties: {
                moreUrl: null,
                detailUrl: null,
                maxRows: 10,
                visualizationType: "swiper"
            },
            type: componentType,
            layout: {
                x: store.currentData.x,
                y: store.currentData.y,
                w: store.currentData.w,
                h: store.currentData.h
            }
        }

        console.log("obj:", JSON.stringify(obj));

        let params = {
            actions: [{
                id: "26;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    dashboardId: data.dashboardId,
                    dashboardMetadata: JSON.stringify(obj),
                    isStickyFilterSave: false
                }
            }]
        };
        let d = {
            message: JSON.stringify(params)
        }
        proxy.$post(Interface.portal.saveComponent, d).then(res=>{

        })
    }

</script>
<style lang="less" scoped>
    .formItem {
        margin-bottom: 10px;

        :deep .ant-row {
            display: block !important;
        }
    }
    .collapse-panel{
        .collapse-panel-title{
            height: 100%;
            padding: 18px 0;
            border: none;
            display: flex;
            align-items: center;
            cursor: pointer;
            font-weight: 700;
            font-size: 12px;
            .icon-wrapper{
                display: inline-block;
                padding-right: 3px;
                font-size: 12px;
            }
        }
        .collapse-panel-body{
            padding-bottom: 20px;
            .charts-wrapper{
                .charts-config-type{
                    width: 34px;
                    height: 34px;
                    margin: 2px 0px;
                    border: 1px solid transparent;
                    cursor: pointer;
                    text-align: center;
                    display: inline-block;
                    margin-right: 5px;
                    &.selected{
                        /* border-color: #5d9cec; */
                        .boxIcon{
                            background-position: 0 67%;
                        }
                    }
                    .boxIcon{
                        width: 100%;
                        height: 100%;
                        display: inline-block;
                        background-repeat: no-repeat;
                        background-size: cover;
                    }
                }
            }
        }
    }
    .swiper-wrapper{
        .swiper-img-item{
            position: relative;
            display: flex;
            flex-direction: column;
            width: 100%;
            cursor: move;
            user-select: none;
            margin-bottom: 10px;
            .divider{
                color: rgba(0, 0, 0, .85);
                font-size: 12px;
                font-variant: tabular-nums;
                line-height: 1.5715;
                list-style: none;
                margin: 14px 0;
                border-top: 1px solid rgba(0, 0, 0, .08);
            }
        }
        .img-wrapper{
            height: 120px;
            position: relative;
            img{
                width: 100%;
                height: 100%;
                pointer-events: none;
            }
            .img-item-footer{
                position: absolute;
                display: flex;
                align-items: center;
                justify-content: space-around;
                bottom: 0;
                left: 0;
                right: 0;
                height: 25px;
                color: #fff;
                background-color: rgba(5, 5, 7, .3);
                .opera-icon{
                    cursor: pointer;
                    &:hover{
                        color: #3d7dd1;
                    }
                }
            }
        }
        .img-item-content{
            display: flex;
            margin-top: 14px;
        }

    }
</style>