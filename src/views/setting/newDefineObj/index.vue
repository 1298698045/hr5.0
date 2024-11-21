<template>
    <div class="wrapper">
        <!-- <div class="todo-head">
            <div class="todo-head-left">
                <div class="icon-circle-base"></div>
                <span class="wea-new-top-title-breadcrumb">新建自定义对象</span>
            </div>
            <div class="todo-head-right">
            </div>
        </div> -->
        <HeadCommon name="新建自定义对象"></HeadCommon>
        <div class="todo-content">
            <!-- <div class="newObjWrap">
                <div class="newObjHead">
                    <div class="subject">新建自定义对象</div>
                    <div class="help">
                        <a href="javascript:;">此页面的帮助</a>
                    </div>
                </div>
                <div class="objPanelPage">
                    <div class="objPanelHead">
                        <div class="panelHeadTitle">
                            自定义对象定义编辑
                        </div>
                        <div class="panelHeadButtons">
                            <a-button @click="handleSave">保存</a-button>
                            <a-button class="ml10" @click="handleSaveAndNew">保存并新建</a-button>
                            <a-button class="ml10" @click="handleCancel">取消</a-button>
                        </div>
                    </div>
                    <div class="objSubHead">
                        <div class="label">自定义对象信息</div>
                        <div class="requiredText">
                            <span class="require">* = </span>
                            必填信息
                        </div>
                    </div>
                    <a-form :model="formState" :label-col="labelCol" ref="formRef">
                        <div class="objSubsection">
                            <div class="detailList">
                                <div class="detailForm">
                                    <div class="detailRow">单数和复数标签用于选项卡、页面布局和报表中。</div>
                                    <a-form-item label="标签" name="MasterLabel" :rules="[{ required: true, message: '请输入标签!' }]">
                                        <a-input class="fieldInp" v-model:value="formState.MasterLabel"></a-input>
                                    </a-form-item>
                                    <div class="detailRow">通过 API 引用对象时，将使用对象名。</div>
                                    <a-form-item label="对象名" name="DeveloperName" :rules="[{ required: true, message: '请输入对象名!' }]">
                                        <a-input class="fieldInp" v-model:value="formState.DeveloperName"></a-input>
                                        <span class="formDesc">示例：  帐户</span>
                                    </a-form-item>
                                    <a-form-item label="对象代码" name="ObjectTypeCode" :rules="[{ required: true, message: '请输入对象代码!' }]">
                                        <a-input class="fieldInp" v-model:value="formState.ObjectTypeCode"></a-input>
                                        <span class="formDesc">示例：  1</span>
                                    </a-form-item>
                                    <a-form-item label="前缀" name="EntityCode">
                                        <a-input class="fieldInp" v-model:value="formState.EntityCode"></a-input>
                                        <span class="formDesc">示例：  人员档案:A0V,合同：800</span>
                                    </a-form-item>
                                    <a-form-item label="数据库表名" name="TableName">
                                        <a-input class="fieldInp" v-model:value="formState.TableName"></a-input>
                                        <span class="formDesc"> 示例：  人员档案:HREmployeeBase</span>
                                    </a-form-item>
                                    <a-form-item label="分类" name="FolderName" :rules="[{ required: true, message: '请输入分类!' }]">
                                        <a-input class="fieldInp" v-model:value="formState.FolderName">
                                            <template #addonAfter>
                                                <SearchOutlined @click="handleOpenCategory" />
                                            </template>
                                        </a-input>
                                        <span class="formDesc">示例：  申请类</span>
                                    </a-form-item>
                                    <a-form-item label="描述" name="Description">
                                        <a-textarea class="fieldText" :rows="4" v-model:value="formState.Description"></a-textarea>
                                    </a-form-item>
                                    <a-form-item label="上下文相关帮助设置" name="CustomHelpType">
                                        <a-radio-group v-model:value="formState.CustomHelpType">
                                            <a-radio :style="radioStyle" :value="1">打开标准 Salesforce.com“帮助和培训”窗口</a-radio>
                                            <a-radio :style="radioStyle" :value="2">使用 Visualforce 页面打开一个窗口</a-radio>
                                        </a-radio-group>
                                    </a-form-item>
                                    <a-form-item label="内容名称" name="Help_CUSTOM_HELP_VISUALFORCE">
                                        <a-select class="fieldInp" v-model:value="formState.Help_CUSTOM_HELP_VISUALFORCE" disabled>
                                            <a-select-option value="1">--无--</a-select-option>
                                        </a-select>
                                    </a-form-item>
                                </div>
                            </div>
                        </div>
                        <div class="objSubHead">
                            <div class="label">输入记录名称标签和格式</div>
                        </div>
                        <div class="objSubsection">
                            <div class="detailList">
                                <div class="detailForm">
                                    <div class="detailRow">记录名称出现在页面布局、关键词列表、相关列表、查找和搜索结果中。例如，客户的记录名称是"客户名称"，对于个案，记录名称是"个案编号"。请注意：当通过 API 引用时，记录名称字段总是被称为“名称”。</div>
                                    <a-form-item label="记录名" name="NameFieldLabel" :rules="[{ required: true, message: '请输入记录名!' }]">
                                        <a-input class="fieldInp" v-model:value="formState.NameFieldLabel"></a-input>
                                        <span class="formDesc">示例：  帐户名</span>
                                    </a-form-item>
                                    <a-form-item label="数据类型" name="AutoNo" :rules="[{ required: true, message: '请选择数据类型!' }]">
                                        <a-select class="fieldInp" v-model:value="formState.AutoNo">
                                            <a-select-option value="1">文本</a-select-option>
                                            <a-select-option value="2">自动编号</a-select-option>
                                        </a-select>
                                    </a-form-item>
                                    <div v-if="formState.AutoNo==2">
                                        <a-form-item label="显示格式" name="NameAutoNumberMask" :rules="[{ required: true, message: '请输入显示格式!' }]">
                                            <a-input class="fieldInp" v-model:value="formState.NameAutoNumberMask"></a-input>
                                            <span class="formDesc">示例：  A-{0000}  这是什么？</span>
                                        </a-form-item>
                                        <a-form-item label="开始编号" name="StartingNo" :rules="[{ required: true, message: '请输入开始编号!' }]">
                                            <a-input class="fieldInp" v-model:value="formState.StartingNo"></a-input>
                                        </a-form-item>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a-form>
                    <div class="objPanelBottom">
                        <div class="panelHeadTitle">
                            &nbsp;
                        </div>
                        <div class="panelHeadButtons">
                            <a-button @click="handleSave">保存</a-button>
                            <a-button class="ml10" @click="handleSaveAndNew">保存并新建</a-button>
                            <a-button class="ml10" @click="handleCancel">取消</a-button>
                        </div>
                    </div>
                </div>
            </div> -->
            <!-- <NewDefineObj :detail="formState" @cancel="handleBack" /> -->
            <NewDefineObj :detail="{}" @cancel="handleBack" />
        </div>
        <!-- <categoryModal v-if="isCategory" :isShow="isCategory" @cancel="isCategory=false" @selectVal="handleSelectVal" /> -->
    </div>
</template>
<script setup>
    import {
        UnorderedListOutlined,
        DownOutlined,
        CaretDownOutlined,
        UserOutlined,
        SearchOutlined
    } from "@ant-design/icons-vue";
    import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated } from "vue";
    import Interface from "@/utils/Interface.js";
    import Dtable from "@/components/Dtable.vue";
    import ListFormSearch from "@/components/ListFormSearch.vue";
    import { useRouter, useRoute } from "vue-router";
    const router = useRouter();
    const labelCol = ref({ style: { width: '20%' } });
    const radioStyle = reactive({
        display: 'flex',
        height: '30px',
        lineHeight: '30px',
    });
    import NewDefineObj from "@/components/obj/NewDefineObj.vue";
    import categoryModal from "@/components/commonModal/CategoryModal.vue";
    import HeadCommon from "@/components/HeadCommon.vue";
    const formRef = ref(null);

    let data = reactive({
        isCategory: false
    });
    const { isCategory } = toRefs(data);
    const formState = reactive({
        MasterLabel: "",
        DeveloperName: "",
        ObjectTypeCode: "",
        EntityCode: "",
        TableName: "",
        FolderName: "",
        FolderId: "",
        Description: "",
        CustomHelpType: "",
        Help_CUSTOM_HELP_VISUALFORCE: "1",
        AutoNo: "",
        NameFieldLabel: "",
        StartingNo: "",
        NameAutoNumberMask: "",
    });

    const handleBack = () => {
        router.back();
    }
    // 保存
    const handleSave = () => {
        formRef.value.validate().then(() => {

        }).catch((err) => {
            console.log("error", err);
        });
    };
    // 保存并新建
    const handleSaveAndNew = () => {
        formRef.value.validate().then(() => {

        }).catch((err) => {
            console.log("error", err);
        });
    };
    // 取消
    const handleCancel = () => {
        router.back(-1);
    };
    const handleSelectVal = (e) => {
        console.log("e", e);
        formState.FolderName = e.Name;
        formState.FolderId = e.ID;
        data.isCategory = false;
    };

    const handleOpenCategory =  () => {
        data.isCategory = true;
    };
</script>
<style lang="less" scoped>
    .wrapper{
      height: 100%;
      padding: 12px;
      background: rgba(176, 196, 223, 1.0);
      position: relative;
      z-index: 1;
      &::before{
          position: fixed;
          top: 5.625rem;
          height: 12.5rem;
          content: '';
          display: block;
          right: 0;
          bottom: 0;
          left: 0;
          background-image: url("~@/assets/img/lightning_blue_background.png");
          background-position: top left;
          background-repeat: no-repeat;
          background-size: cover;
      }
    }
    .wrapper {
        /* .todo-head {
            width: 100%;
            height: 52px;
            line-height: 52px;
            background: #f9f9f9;
            border-bottom: 1px solid #eaeaea;
            display: flex;
            align-items: center;

            .todo-head-left {
                padding-left: 20px;
                display: flex;
                align-items: center;
                flex: 1;

                .icon-circle-base {
                    width: 35px;
                    height: 35px;
                    background: rgb(0, 121, 222);
                    background: url(../../../../src/assets/entity.png);
                    background-position-x: -5px;
                    background-position-y: -5px;
                    border-radius: 0%;
                    margin-right: 10px;
                    color: #fff;
                }

                .wea-new-top-title-breadcrumb {
                    color: #484a4d;
                    margin-left: 3px;
                    font-size: 14px;
                    font-weight: 500;
                }
            }

            .todo-head-right {
                padding-right: 14px;
                display: flex;
                align-items: center;

                .btn-drop {
                    display: inline-block;
                    padding-left: 20px;
                    line-height: 40px;
                    vertical-align: middle;
                    cursor: pointer;
                }

                .ant-btn-group {
                    margin-left: 10px;
                }
            }
        } */

        .todo-content {
            width: 100%;
            height: calc(~"100% - 80px");
            position: relative;
            z-index: 999;
            background: #fff;
            border-radius: 4px;
            overflow: hidden;
            padding: 0 12px;
            /* .newObjWrap{
                width: 100%;
                height: 100%;
                overflow-y: auto;
                padding: 16px;
                .newObjHead{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 15px;
                    .subject{
                        font-size: 24px;
                    }
                    .help{
                        a{
                            text-decoration: none;
                            font-size: 12px;
                            color: #015ba7;
                        }
                    }
                }
                .objPanelPage{
                    background-color: #f8f8f8;
                    border-bottom: 1px solid #eaeaea;
                    border-left: 1px solid #eaeaea;
                    border-right: 1px solid #eaeaea;
                    border-radius: 4px;
                    border-top: 3px solid #747e96;
                    margin-bottom: 10px;
                    font-size: 14px;
                    .objPanelHead{
                        border-bottom: 1px solid #fff;
                        display: flex;
                        align-items: center;
                        padding: 5px 0;
                    }
                    .panelHeadTitle{
                        width: 30%;
                        padding: 5px 12px;
                        font-weight: bold;
                        font-size: 14px;
                    }
                    .panelHeadButtons{
                        padding: 5px 12px;
                        .ant-btn{
                            height: 26px;
                            font-size: 12px;
                            color: #333;
                            font-weight: bold;
                        }
                    }
                    .objSubHead{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        background: url("~@/assets/img/opacity75.png");
                        padding: 4px 16px;
                        background-color: #8e9dbe;
                        .label{
                            font-weight: bold;
                        }
                    }
                    .objPanelBottom{
                        border-top: 1px solid #dbdbdb;
                        margin-top: 20px;
                        background-color: transparent;
                        display: flex;
                    }
                    .objSubsection{
                        margin-top: 7px;
                        padding: 0 12px;
                        .detailList{
                            font-size: 12px;
                            .detailForm{
                                .ant-form-item{
                                    .ant-form-item-label{
                                        width: 18%;
                                        display: inline-block;
                                    }
                                    .fieldInp{
                                        width: 200px;
                                    }
                                    .fieldText{
                                        width: 600px;
                                    }
                                    .formDesc{
                                        padding-left: 16px;
                                        font-size: 12px;
                                        font-weight: bold;
                                    }
                                }
                            }
                        }
                    }
                }

            } */
        }
    }
    .require{
        color: red;
    }
</style>