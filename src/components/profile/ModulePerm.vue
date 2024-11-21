<template>
    <div class="ModuleWrap">
        <div class="breadcrumb">
            <a-breadcrumb>
                <a-breadcrumb-item><a href="javascript:;" @click="handleBack">简档概览</a></a-breadcrumb-item>
                <a-breadcrumb-item>模块权限设置</a-breadcrumb-item>
            </a-breadcrumb>
        </div>
        <div class="moduleCenter">
            <div class="moduleLeft">
                <div class="moduleItem" v-for="(item, index) in listData" :key="index">
                    <a :href="'#'+item.AppId" @click="(e)=>{scrollToAnchor(e,item)}">{{ item.label }}</a>
                </div>
            </div>
            <div class="moduleRight">
                <div class="collapse">
                    <div class="collapseItem" :id="item.AppId" v-for="(item, index) in listData" :key="index">
                        <div class="collapseHead">
                            <DownOutlined />
                            <!-- <RightOutlined /> -->
                            <span class="moduleName">{{ item.label }}</span>
                        </div>
                        <div class="collapseBd">
                            <div class="fileds">
                                <div class="filedItem" v-for="(row, idx) in item.tabs" :key="idx">
                                    <span class="fieldLabel">{{row.label}}</span>
                                    <div class="fieldVal">
                                        <a-select style="width: 150px;" v-model:value="row.depth"
                                            @change="(e)=>{changeDepth(e, item, row)}">
                                            <a-select-option :value="2">默认关闭</a-select-option>
                                            <a-select-option :value="4">默认打开</a-select-option>
                                        </a-select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import {
        UnorderedListOutlined,
        DownOutlined,
        CaretDownOutlined,
        UserOutlined
    } from "@ant-design/icons-vue";
    import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, nextTick, inject, defineEmits } from "vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    import { message } from "ant-design-vue";
  import Toast from "@/utils/toast.js";
    const emit = defineEmits(['back']);
    const props = defineProps({
        ProfileId: String
    })
    const data = reactive({
        menus: [],
        listData: []
    });
    const { menus, listData } = toRefs(data);

    const getModuleList = () => {
        let obj = {
            actions: [{
                id: "4105;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    profileId: props.ProfileId,
                    systemCode: "HR"
                }
            }]
        }
        let d = {
            message: JSON.stringify(obj)
        }
        proxy.$post(Interface.profile.modulePermList, d).then(res => {
            data.listData = res.actions[0].returnValue;
        })
    };
    getModuleList();
    const handleBack = () => {
        emit('back', '');
    };
    const scrollToAnchor = (event, item) => {
        event.preventDefault();
        const anchorElement = document.getElementById(item.AppId);
        if (anchorElement) {
            anchorElement.scrollIntoView({ behavior: 'smooth' });
        }
    };
    const changeDepth = (e, item, row) => {
        // console.log("e", e, item, row);
        // let obj = {
        //     message: {
        //         actions: [
        //             {
        //                 id: "483;a",
        //                 params: {
        //                     ProfileId: data.ProfileId,
        //                     TabId: row.TabId,
        //                     Depth: e
        //                 },
        //                 storable: true
        //             }
        //         ]
        //     }
        // };
        // var d = {
        //     Message: JSON.stringify(obj)
        // }
        // proxy.$get(Interface.profile.saveModule, d).then(res => {
        //     Toast("保存成功!");
        //     getModuleList();
        // });
        let obj = {
            actions: [{
                id: "2919;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    recordInput: {
                        allowSaveOnDuplicate: false,
                        apiName: "ProfileApplication",
                        objTypeCode: 91,
                        ProfileId: data.ProfileId,
                        TabId: row.tabId,
                        Depth: e,
                        Name: row.name
                    }
                }
            }]
        }
        let d = {
            message: JSON.stringify(obj)
        }
        proxy.$post(Interface.create, d).then(res=>{
            Toast("保存成功!");
            getModuleList();
        });

    };
</script>
<style lang="less" scoped>
    .ModuleWrap {
        width: 100%;
        height: 100%;
    }

    .breadcrumb {
        padding-bottom: 20px;
    }

    .moduleCenter {
        display: flex;
        height: calc(~"100% - 42px");
        overflow: hidden;

        .moduleLeft {
            width: 200px;
            border: 1px solid #dedede;
            margin-right: 10px;
            height: 100%;
            overflow-y: auto;

            .moduleItem {

                height: 32px;
                line-height: 32px;
                margin-left: 0;
                padding: 0 10px;

                a {
                    color: #333435;
                    font-size: 12px;
                    text-decoration: underline;
                }
            }
        }

        .moduleRight {
            flex: 1;
            height: 100%;
            overflow-y: auto;

            .collapseItem {
                font-size: 12px;

                .collapseHead {
                    height: 28px;
                    line-height: 28px;
                    padding: 0 10px;
                    border-radius: 10px;
                    background: #f2f2f2;
                    display: flex;
                    align-items: center;
                    cursor: pointer;

                    .moduleName {
                        padding-left: 20px;
                        font-weight: 700;
                    }
                }

                .collapseBd {
                    .fileds {
                        display: flex;
                        flex-wrap: wrap;

                        .filedItem {
                            width: 30%;
                            padding: 10px 40px;
                            display: flex;
                            align-items: center;

                            .fieldLabel {
                                display: inline-block;
                                width: 100px;
                                white-space: nowrap;
                            }
                        }
                    }
                }
            }
        }
    }
</style>