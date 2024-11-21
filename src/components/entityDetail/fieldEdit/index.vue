<template>
    <div class="fieldEdit">
        <div class="bPageTitle">
            <div class="ptBody">
                <div class="content">
                    <h1 class="pageType">
                        编辑 {{objDetail.Label}} 字段
                        <span class="titleSeparatingColon">:</span>
                    </h1>
                    <h2 class="pageDescription"> {{fieldData.name}}</h2>
                    <div class="blank">&nbsp;</div>
                </div>
                <div class="links">
                    <a href="javascript:void(0);" title="此页面的帮助 （新窗口）">
                        <span class="helpLink">此页面的帮助</span>
                        <img :src="require('@/assets/img/s.gif')" alt="" class="helpIcon">
                    </a>
                </div>
            </div>
            <div class="ptBreadcrumb">
                &nbsp;&nbsp;
                <a href="javascript:void(0);" @click="handleBack">返回到 {{objDetail.Label}} 字段</a>
            </div>
        </div>
        <template v-if="isShow">
            <!-- 文本 复选框 -->
            <!-- <SfieldEdit :detail="detail" v-if="dataType=='S'||dataType=='X'||dataType=='P'||dataType=='U'||dataType=='C'||dataType=='H'||dataType=='Y'||dataType=='U'||dataType=='O'||dataType=='M_U'||dataType=='M_O'||dataType=='Y_MD'" @back="handleBack" @cancel="handleCancel" @save="handleSubmit" /> -->

            <SfieldEdit :detail="detail" v-if="dataType=='S'||dataType=='X'" @back="handleBack" @cancel="handleCancel" @save="handleSubmit" />
            <!-- 数字 -->
            <NfieldEdit :detail="detail" v-else-if="dataType=='N'" @back="handleBack" @cancel="handleCancel" @save="handleSubmit" @fieldType="changeFieldType" />
            <!-- 日期 -->
            <DfieldEdit :detail="detail" v-else-if="dataType=='D' || dataType=='F' || dataType == 'f' || dataType=='DT_M' || dataType=='TP' || dataType=='Year' || dataType=='Month' || dataType=='Y_M'" @back="handleBack" @cancel="handleCancel" @save="handleSubmit" @fieldType="changeFieldType" />
            <!-- 选择列表 -->
            <LfieldEdit :detail="detail" v-else-if="dataType=='L'||dataType=='RBL'||dataType=='DT'" @back="handleBack" @cancel="handleCancel" @save="handleSubmit" @fieldType="changeFieldType" />
            <!-- 加密文本 -->
            <FieldEdit6 :detail="detail" v-else-if="dataType=='6'" @back="handleBack" @cancel="handleCancel" @save="handleSubmit" />
            <!-- 多项选择 MC   -->
            <MCfieldEdit :detail="detail" v-else-if="dataType=='MC'" @back="handleBack" @cancel="handleCancel" @save="handleSubmit" @fieldType="changeFieldType" />
            <!-- 自动编号 -->
            <VfieldEdit :detail="detail" v-else-if="dataType=='V'" @back="handleBack" @cancel="handleCancel" @save="handleSubmit" @fieldType="changeFieldType" />
            <!-- 地理定位 -->
            <GfieldEdit :detail="detail" v-else-if="dataType=='g'" @back="handleBack" @cancel="handleCancel" @save="handleSubmit" @fieldType="changeFieldType" />
            <!-- 电子邮件 E -->
            <EfieldEdit :detail="detail" v-else-if="dataType=='E'" @back="handleBack" @cancel="handleCancel" @save="handleSubmit" @fieldType="changeFieldType" />
            <!-- 百分比 -->
            <PfieldEdit :detail="detail" v-else-if="dataType=='P'" @back="handleBack" @cancel="handleCancel" @save="handleSubmit" @fieldType="changeFieldType" />
            <!-- RTF 文本 -->
            <RTFfieldEdit :detail="detail" v-else-if="dataType=='z'" @back="handleBack" @cancel="handleCancel" @save="handleSubmit" @fieldType="changeFieldType" />
            <!-- 公式 -->
            <ZfieldEdit :detail="detail" v-else-if="dataType=='Z'" @back="handleBack" @cancel="handleCancel" @save="handleSubmit" />
            <!-- 文本区 长 -->
            <JfieldEdit :detail="detail" v-else-if="dataType=='J'" @back="handleBack" @cancel="handleCancel" @save="handleSubmit" @fieldType="changeFieldType" />
            <!-- 复选框 -->
            <BfieldEdit :detail="detail" v-else-if="dataType=='B'" @back="handleBack" @cancel="handleCancel" @save="handleSubmit" @fieldType="changeFieldType" />
            <!-- 查找类型 -->
            <YfieldEdit :detail="detail" v-else-if="dataType=='Y'||dataType=='U'" @back="handleBack" @cancel="handleCancel" @save="handleSubmit" @fieldType="changeFieldType" />
            <!-- 主子表 -->
            <YMDfieldEdit :detail="detail" v-else-if="dataType=='Y_MD'" @back="handleBack" @cancel="handleCancel" @save="handleSubmit" @fieldType="changeFieldType" />
            <!-- 通用 -->
            <CommonFieldEdit :detail="detail" v-else @back="handleBack" @cancel="handleCancel" @save="handleSubmit" @fieldType="changeFieldType" />
        </template>
    </div>
</template>
<script setup>
    import {
        UnorderedListOutlined,
        DownOutlined,
        CaretDownOutlined,
        UserOutlined,
    } from "@ant-design/icons-vue";
    import {
        ref,
        watch,
        reactive,
        toRefs,
        onMounted,
        getCurrentInstance,
        onUpdated,
        nextTick,
        defineProps,
        defineEmits
    } from "vue";
    import SfieldEdit from "./SfieldEdit.vue";
    import NfieldEdit from "./NfieldEdit.vue";
    import DfieldEdit from "./DfieldEdit.vue";
    import LfieldEdit from "./LfieldEdit.vue";
    import FieldEdit6 from "./FieldEdit6.vue";
    import MCfieldEdit from "./MCfieldEdit.vue";
    import VfieldEdit from "./VfieldEdit.vue";
    import GfieldEdit from "./GfieldEdit.vue";
    import EfieldEdit from "./EfieldEdit.vue";
    import PfieldEdit from "./PfieldEdit.vue";
    import RTFfieldEdit from "./RTFfieldEdit.vue";
    import ZfieldEdit from "./ZfieldEdit.vue";
    import JfieldEdit from "./JfieldEdit.vue";
    import BfieldEdit from "./BfieldEdit.vue";
    import YfieldEdit from "./YfieldEdit.vue";
    import YMDfieldEdit from "./Y_MDfieldEdit.vue";

    import CommonFieldEdit from "./CommonFieldEdit.vue";

    import Interface from "@/utils/Interface.js";
    import { useRouter, useRoute } from "vue-router";
    const route = useRoute();
    const { proxy } = getCurrentInstance();
    const emit = defineEmits(['cancel','fieldType']);
    const props = defineProps({
        fieldData: Object,
        dataType: String,
        objDetail: Object
    });

    const data = reactive({
        detail: {},
        isShow: false
    });
    const { detail, isShow } = toRefs(data);
    const handleBack = () => {
        emit("back", false);
    };

    const handleCancel = () => {
        emit("cancel", false);
    };

    const getDetail = () => {
        proxy.$get(Interface.objeview.field.detail, {
            attributeId: props.fieldData.id
        }).then(res=>{
            data.detail = res.actions[0].returnValue;
            console.log("data.detail", data.detail);
            data.isShow = true;
        })
    }
    getDetail();
    const handleSubmit = (form) => {
        console.log("form", form);
        let obj = {
            actions: [{
                id: "2919;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    recordInput: {
                        allowSaveOnDuplicate: false,
                        apiName: route.query.sObjectName,
                        objTypeCode: route.query.objectTypeCode,
                        field: {
                            EntityId: route.query.id,
                        }
                    },
                    recordId: props.fieldData.id
                }
            }]
        };
        for(let key in form){
            if(typeof form[key] == 'boolean'){
                obj.actions[0].params.recordInput.field[key] = form[key] ? 1 : 0;
            }else {
                obj.actions[0].params.recordInput.field[key] = form[key];
            }
        }
        let d = {
            message: JSON.stringify(obj)
        }
        proxy.$post(Interface.objeview.field.edit, d).then(res=>{

        })
    };
    // 更改字段类型
    const changeFieldType = () => {
        console.log("更改字段类型", props.fieldData);
        emit("fieldType", props.fieldData.id);
    }
</script>

<style lang="less" scoped>
    @import url("@/style/fieldForm.less");
    .pbSubheader {
        background-color: #222;
        font-weight: bold;
        font-size: 13px;
        padding: 2px 2px 2px 5px;
        margin-top: 15px;
        overflow: hidden;
        margin-bottom: 2px;
    }
    .pbSubheader.first {
        margin-top: 0;
    }
    .fieldEdit{
        padding: 0 12px;
        height: 100%;
        overflow: auto;
        .bPageTitle {
            padding: 15px 0 0;
            margin-bottom: 15px;
            .ptBody{
                width: 100%;
                overflow: hidden;
                background-color: transparent;
                color: #000;
                padding: 0;
                .content{
                    float: left;
                    vertical-align: middle;
                    padding-left: 5px;
                    width: 70%;
                    .pageType {
                        font-size: 13px;
                        font-weight: bold;
                        color: #4a4a56;
                        padding-left: 2px;
                    }
                    .pageDescription{
                        font-size: 22px;
                        font-weight: normal;
                        line-height: 22px;
                    }
                    .blank {
                        font-size: 0;
                        clear: both;
                    }
                }
                .links{
                    padding-right: 5px;
                    padding-bottom: 0;
                    padding-left: 0;
                    float: right;
                    text-align: right;
                    vertical-align: middle;
                    font-size: 13px;
                    white-space: nowrap;
                    a{
                        color: #015ba7;
                        text-decoration: none;
                        span:hover{
                            text-decoration: underline;
                        }
                        .helpIcon{
                            vertical-align: bottom;
                        }
                    }
                }
            }
            .ptBreadcrumb {
                font-family: 'Verdana', 'Geneva', sans-serif;
                font-size: 13px;
                margin-bottom: -15px;
                height: 15px;
                vertical-align: middle;
                height: auto;
                margin-top: 3px;
                margin-bottom: 0;
                a{
                    color: #015ba7;
                    text-decoration: none;
                }
            }
        }
    }
</style>