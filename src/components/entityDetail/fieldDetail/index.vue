<template>
    <div class="fieldDetail" ref="detailRef" v-if="!isNewRule">
        <div ref="contentRef">
            <div class="bPageTitle" v-if="dataType!='L' && dataType!='RBL' && dataType!='DT'">
                <div class="ptBody">
                    <div class="content">
                        <h1 class="pageType">
                            {{objDetail.Label}} 字段
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
            <!-- <div class="bPageBlock">
                <div class="pbHeader">
                    <table>
                        <tbody>
                            <tr>
                                <td class="pbTitle">
                                    <img :src="require('@/assets/img/s.gif')" alt="" width="1" height="1" class="minWidth" title="">
                                    <h2 class="mainTitle"></h2>
                                </td>
                                <td class="pbButton">
                                    <input type="button" class="inpBtn" value="编辑" @click="handleEditField">
                                    <input type="button" class="inpBtn ml5" value="设置字段集安全性">
                                    <input type="button" class="inpBtn ml5" value="查看字段可访问性">
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="pbBody">
                    <div class="brandTertiaryBrd first pbSubheader tertiaryPalette">
                        <h3>字段信息<span class="titleSeparatingColon">:</span></h3>
                    </div>
                    <div class="pbSubsection">
                        <table class="detailList">
                            <tbody>
                                <tr>
                                    <td class="labelCol">字段标签</td>
                                    <td class="dataCol col02">D-U-N-S 编号</td>
                                    <td class="last labelCol">字段名</td>
                                    <td class="last dataCol">DunsNumber</td>
                                </tr>
                                <tr><td class="labelCol">数据类型</td><td class="data2Col" colspan="3">文本(9) </td></tr>
                                <tr><td class="labelCol">帮助文本</td><td class="dataCol col02">&nbsp;</td><td class="labelCol last empty">&nbsp;</td><td class="dataCol last empty">&nbsp;</td></tr>
                                <tr><td class="labelCol">描述</td><td class="dataCol col02"></td><td class="labelCol last empty">&nbsp;</td><td class="dataCol last empty">&nbsp;</td></tr>
                                <tr><td class="labelCol">数据所有者</td><td class="dataCol col02"></td><td class="labelCol last empty">&nbsp;</td><td class="dataCol last empty">&nbsp;</td></tr>
                                <tr><td class="labelCol">字段使用情况</td><td class="dataCol col02"></td><td class="labelCol last empty">&nbsp;</td><td class="dataCol last empty">&nbsp;</td></tr>
                                <tr><td class="labelCol">数据灵敏性级别</td><td class="dataCol col02"></td><td class="labelCol last empty">&nbsp;</td><td class="dataCol last empty">&nbsp;</td></tr>
                                <tr><td class="last labelCol">合规性分类</td><td class="dataCol last col02"></td><td class="labelCol last empty">&nbsp;</td><td class="dataCol last empty">&nbsp;</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="bRelatedList">
                <div class="listRelatedObject setupBlock">
                    <div class="bPageBlock brandSecondaryBrd secondaryPalette">
                        <div class="pbHeader">
                            <table border="0" cellpadding="0" cellspacing="0">
                                <tbody>
                                    <tr>
                                        <td class="pbTitle">
                                            <img :src="require('@/assets/img/s.gif')" alt="" width="1" height="1" class="minWidth" title="">
                                            <img :src="require('@/assets/img/s.gif')" alt="" class="relatedListIcon" title="">
                                            <h3 id="ValidationFormulaList_title">验证规则</h3>
                                        </td>
                                        <td class="pbButton">
                                            <input value=" 新建 " class="inpBtn" name="new" title="新建 验证规则" type="button">
                                        </td>
                                        <td class="pbHelp">
                                            <span class="help" title="验证规则 帮助 （新窗口）">
                                                <a href="javascript:void(0);" class="linkCol">
                                                    <span class="linkSpan">验证规则帮助</span> 
                                                    <img :src="require('@/assets/img/s.gif')" alt="验证规则 帮助 （新窗口）" class="helpIcon" title="验证规则 帮助 （新窗口）">
                                                </a>
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="pbBody">
                            <table class="list" border="0" cellspacing="0" cellpadding="0"><tbody><tr class="headerRow"><th scope="col" class="noRowsHeader">没有定义验证规则。</th></tr>
                            </tbody></table>
                        </div>
                    </div>
                </div>
            </div> -->
            <template v-if="isShow">
                <!-- 文本 长文本 电话 URL 币种 -->
                <SfdieldView @newRule="handleNewRule" v-if="dataType=='S'||dataType=='X'||dataType=='J'||dataType=='P'||dataType=='U'||dataType=='C'||dataType=='H'||dataType=='UC'||dataType=='UCS'||dataType=='UCP'||dataType=='US'||dataType=='CA'" :detail="detail" @edit="handleEditField" @back="handleBack" @cancel="handleCancel" />
                <NfieldView @newRule="handleNewRule" v-if="dataType=='N'" :detail="detail"  @edit="handleEditField" @back="handleBack" @cancel="handleCancel" />
                <!-- 日期、日期/时间、时间 -->
                <DfieldView @newRule="handleNewRule" v-if="dataType=='D' || dataType=='F' || dataType == 'f' || dataType=='DT_M' || dataType=='TP' || dataType=='Year' || dataType=='Month' || dataType=='Y_M'" :detail="detail" @edit="handleEditField" @back="handleBack" @cancel="handleCancel" />
                <!-- 复选框 -->
                <BfieldView @newRule="handleNewRule" v-if="dataType=='B'" :detail="detail" @edit="handleEditField" @back="handleBack" @cancel="handleCancel" />
                <!-- 选项列表 -->
                <LfieldView @newRule="handleNewRule" @toTop="handleBackToTop" v-if="dataType=='L'||dataType=='RBL'||dataType=='DT'" :detail="detail" @edit="handleEditField" @back="handleBack" @cancel="handleCancel" />
                <!-- 查找 -->
                <YfieldView @newRule="handleNewRule" v-if="dataType=='Y'||dataType=='U'||dataType=='M_U'||dataType=='M_O'||dataType=='O'||dataType=='Y_MD'" :detail="detail" @edit="handleEditField" @back="handleBack" @cancel="handleCancel" />
                <!-- 加密文本 -->
                <fieldView6 @newRule="handleNewRule" v-if="dataType=='6'" :detail="detail" @edit="handleEditField" @back="handleBack" @cancel="handleCancel" />
                <!-- 多项选择 MC -->
                <MCfieldView @newRule="handleNewRule" v-if="dataType=='MC'" :detail="detail" @edit="handleEditField" @back="handleBack" @cancel="handleCancel" />
                <!-- 自动编号 V -->
                <VfieldView @newRule="handleNewRule" v-if="dataType=='V'" :detail="detail" @edit="handleEditField" @back="handleBack" @cancel="handleCancel" />
                <!-- 公式 Z -->
                <ZfieldView @newRule="handleNewRule" v-if="dataType=='Z'" :detail="detail" @edit="handleEditField" @back="handleBack" @cancel="handleCancel" />
                <!-- 地理定位 g -->
                <GfieldView @newRule="handleNewRule" v-if="dataType=='g'" :detail="detail" @edit="handleEditField" @back="handleBack" @cancel="handleCancel" />
                <!-- 电子邮件 E -->
                <EfieldView @newRule="handleNewRule" v-if="dataType=='E'" :detail="detail" @edit="handleEditField" @back="handleBack" @cancel="handleCancel" />
                <!-- 百分比 P -->
                <PfieldView @newRule="handleNewRule" v-if="dataType=='P'" :detail="detail" @edit="handleEditField" @back="handleBack" @cancel="handleCancel" />
                <!-- 文本区 RTF -->
                <RTFfieldView @newRule="handleNewRule" v-if="dataType=='z'" :detail="detail" @edit="handleEditField" @back="handleBack" @cancel="handleCancel" />
            </template>

            <div class="fewerMore" v-if="isToTop && dataType!='L'">
                <div class="backToTop">
                    <a href="javascript:void(0)" title="返回顶部" @click="handleBackToTop">
                        <img :src="require('@/assets/img/upToTop_caret.gif')" alt="返回顶部" width="8" height="8" title="返回顶部">
                        返回顶部
                    </a>
                </div>
                每一相关列表总是显示
                <a href="javascript:void(0)">
                    更少
                    <img :src="require('@/assets/img/s.gif')" alt="显示较少信息" class="fewerArrow" title="显示较少信息">
                </a>
                /  
                <a href="javascript:void(0)">
                    <img :src="require('@/assets/img/s.gif')" alt="显示更多信息" class="moreArrow" title="显示更多信息">
                    更多
                </a>
                项记录
            </div>
        </div>
    </div>
    <div style="height: 100%;" v-if="isNewRule">
        <NewValidationRule @cancel="isNewRule=false" />
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
        defineEmits,
        provide
    } from "vue";
    import SfdieldView from "./SfieldView.vue";
    import NfieldView from "./NfieldView.vue";
    import DfieldView from "./DfieldView.vue";
    import BfieldView from "./BfieldView.vue";
    import LfieldView from "./LfieldView.vue";
    import YfieldView from "./YfieldView.vue";
    import fieldView6 from "./6fieldView.vue";
    import MCfieldView from "./MCfieldView.vue";
    import VfieldView from "./VfieldView.vue";
    import ZfieldView from "./ZfieldView.vue";
    import GfieldView from "./GfieldView.vue";
    import EfieldView from "./EfieldView.vue";
    import PfieldView from "./PfieldView.vue";
    import RTFfieldView from "./RTFfieldView.vue";
    import NewValidationRule from "@/components/entityDetail/NewValidationRule2.vue";

    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    const emit = defineEmits(['cancel','edit','back']);
    const props = defineProps({
        fieldData: Object,
        dataType: String,
        isEdit: [Number, String],
        objDetail: String
    });
    console.log(typeof props.dataType);
    const detailRef = ref(null);
    const contentRef = ref(null);
    const data = reactive({
        isToTop: true,
        detail: {},
        isShow: false,
        isNewRule: false
    });
    const { isToTop, detail, isShow, isNewRule } = toRefs(data);

    provide("fieldData", props.fieldData);
    
    onMounted(()=>{
        // let h = detailRef.value.clientHeight;
        // let topH = contentRef.value.offsetHeight;
        // console.log("topH", h, topH);
        // if(topH > h){
        //     data.isToTop = true;
        // }
    })
    const handleBack = () => {
        emit("back", false);
    };
    const handleEditField = () => {
        emit("edit", false);
    };
    const handleCancel = () => {
        emit("cancel", false);
    };
    const handleBackToTop = () => {
        const upRoll = setInterval(()=>{
            const top = detailRef.value.scrollTop;
            const speed = Math.ceil(top / 10);
            if(detailRef.value.scrollTop > 0){
                detailRef.value.scrollTop -= speed;
            }else {
                clearInterval(upRoll);
            }
        }, 20)
    };
    
    const getDetail = () => {
        proxy.$get(Interface.objeview.field.detail, {
            attributeId: props.fieldData.id
        }).then(res=>{
            data.detail = res.actions[0].returnValue;
            data.isShow = true;
        })
    }
    getDetail();

    const handleNewRule = () => {
        console.log('123123')
        data.isNewRule = true;
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
    .fieldDetail{
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
    .fewerMore{
        padding: 3px;
        text-align: center;
        font-size: 12px;
        .backToTop{
            display: inline;
            float: left;
            margin-left: 4px;
        }
        a{
            color: #015ba7;
            text-decoration: none;
            &:hover{
                text-decoration: underline;
            }
        }
        .fewerArrow{
            background-image: url("~@/assets/img/fewer_more.png");
            background-position: left -11px;
            width: 14px;
            height: 11px;
            margin-right: 1px;
        }
        .moreArrow{
            background-image: url("~@/assets/img/fewer_more.png");
            background-position: 0 0;
            width: 14px;
            height: 11px;
            margin-right: 1px;
            vertical-align: -1px;
        }
    }
</style>