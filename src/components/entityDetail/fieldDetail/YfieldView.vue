<template>
    <div>
        <div class="bPageBlock">
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
                                <td class="dataCol col02">{{detail.MasterLabel}}</td>
                                <td class="labelCol">字段名</td>
                                <td class="dataCol">{{detail.DeveloperName}}</td>
                            </tr>
                            <tr>
                                <td class="labelCol">数据类型</td>
                                <td class="dataCol col02">{{detail.dataTypeName}}</td>
                                <td class="last labelCol"><span class="helpButton" id="childRelationship-_help">子级关系名称<img src="@/assets/img/s.gif" alt="" class="helpOrb" title=""></span></td>
                                <td class="last dataCol">Accounts</td>
                            </tr>
                            <tr>
                                <td class="labelCol">帮助文本</td>
                                <td class="dataCol col02">{{detail.InlineHelpText}}</td>
                                <td class="labelCol last empty">&nbsp;</td>
                                <td class="dataCol last empty">&nbsp;</td>
                            </tr>
                            <tr>
                                <td class="labelCol">描述</td>
                                <td class="dataCol col02">{{detail.Description}}</td>
                                <td class="labelCol last empty">&nbsp;</td>
                                <td class="dataCol last empty">&nbsp;</td>
                            </tr>
                            <tr><td class="labelCol">数据所有者</td><td class="dataCol col02"></td><td class="labelCol last empty">&nbsp;</td><td class="dataCol last empty">&nbsp;</td></tr>
                            <tr><td class="labelCol">字段使用情况</td><td class="dataCol col02"></td><td class="labelCol last empty">&nbsp;</td><td class="dataCol last empty">&nbsp;</td></tr>
                            <tr><td class="labelCol">数据灵敏性级别</td><td class="dataCol col02"></td><td class="labelCol last empty">&nbsp;</td><td class="dataCol last empty">&nbsp;</td></tr>
                            <tr><td class="last labelCol">合规性分类</td><td class="dataCol last col02"></td><td class="labelCol last empty">&nbsp;</td><td class="dataCol last empty">&nbsp;</td></tr>
                        </tbody>
                    </table>
                </div>
                <div class="brandTertiaryBrd pbSubheader tertiaryPalette">
                    <h3>查找 选项<span class="titleSeparatingColon">:</span></h3>
                </div>
                <div class="pbSubsection">
                    <table class="detailList">
                        <tbody>
                            <tr><td class="labelCol">相关项</td><td class="dataCol col02"><a href="javascript:srcUp(%27%2Fp%2Fsetup%2Flayout%2FLayoutFieldList%3Ftype%3DBusinessBrand%26isdtp%3Dp1%27);">业务品牌</a></td><td class="last labelCol"><label>子级关系名称</label></td><td class="last dataCol">yewublY7</td></tr>
                            <tr><td class="labelCol">相关列表标签</td><td class="data2Col" colspan="3">员工档案</td></tr>
                            <tr><td class="labelCol">必需</td><td class="data2Col" colspan="3"><img :src="require('@/assets/img/checkbox_unchecked.gif')" alt="未选取的" width="21" height="16" class="checkImg" title="未选取的"></td></tr>
                            <tr><td class="last labelCol">如果查找记录被删除怎么办？</td><td class="last data2Col" colspan="3">清除此字段的值。</td></tr>
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
                                        <input value=" 新建 " class="inpBtn" name="new" title="新建 验证规则" type="button" @click="handleNewRule">
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
        </div>
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
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    const emit = defineEmits(['edit','back','newRule']);
    const props = defineProps({
        detail: Object
    });

    const data = reactive({

    });

    const handleBack = () => {
        emit("back", false);
    };
    const handleEditField = () => {
        emit("edit", false);
    };
    // 新建验证规则
    const handleNewRule = () => {
        emit("newRule", true);
    };
</script>
<style lang="less" scoped>
    @import url("@/style/fieldForm.less");
    @import url("@/style/fieldDetail/fieldDetail.less");
</style>