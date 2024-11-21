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
                                <input type="button" class="inpBtn ml5" value="用于何处？">
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
                                <td class="labelCol">对象名</td>
                                <td class="dataCol"><a href="javascript:void(0);">{{detail.entityLabel}}</a></td>
                            </tr>
                            <tr>
                                <td class="labelCol"><label>字段名</label></td>
                                <td class="dataCol col02">{{detail.DeveloperName}}</td>
                                <td class="labelCol">数据类型</td>
                                <td class="dataCol">{{detail.dataTypeName}}</td>
                            </tr>
                            <tr>
                                <td class="labelCol">API 名称</td>
                                <td class="dataCol col02">{{detail.apiName}}</td>
                                <td class="labelCol">&nbsp;</td>
                                <td class="dataCol">&nbsp;</td>
                            </tr>
                            <tr>
                                <td class="labelCol"><label>描述</label></td>
                                <td class="data2Col" colspan="3">{{detail.Description}}</td>
                            </tr>
                            <tr>
                                <td class="labelCol"><label>帮助文本</label></td>
                                <td class="data2Col" colspan="3">{{detail.InlineHelpText}}</td>
                            </tr>
                            <tr><td class="labelCol">数据所有者</td><td class="dataCol col02"></td><td class="labelCol">&nbsp;</td><td class="dataCol">&nbsp;</td></tr>
                            <tr><td class="labelCol">字段使用情况</td><td class="dataCol col02"></td><td class="labelCol">&nbsp;</td><td class="dataCol">&nbsp;</td></tr>
                            <tr><td class="labelCol">数据灵敏性级别</td><td class="dataCol col02"></td><td class="labelCol">&nbsp;</td><td class="dataCol">&nbsp;</td></tr>
                            <tr><td class="labelCol">合规性分类</td><td class="dataCol col02"></td><td class="labelCol">&nbsp;</td><td class="dataCol">&nbsp;</td></tr>
                            <tr><td class="last labelCol">创建人</td><td class="dataCol last col02"><a href="javascript:srcUp(%27%2F0059000000390Wh%3Fisdtp%3Dp1%26isUserEntityOverride%3D1%26noredirect%3D1%27);">liu jack</a>, 2014-10-8 下午3:12</td><td class="last labelCol">修改人</td><td class="last dataCol"><a href="javascript:srcUp(%27%2F0059000000390Wh%3Fisdtp%3Dp1%26isUserEntityOverride%3D1%26noredirect%3D1%27);">liu jack</a>, 2014-10-8 下午3:12</td></tr>
                        </tbody>
                    </table>
                </div>
                <div class="brandTertiaryBrd pbSubheader tertiaryPalette">
                    <h3>一般选项<span class="titleSeparatingColon">:</span></h3>
                </div>
                <div class="pbSubsection">
                    <table class="detailList">
                        <tbody>
                            <tr>
                                <td class="labelCol">外部 ID</td>
                                <td class="data2Col" colspan="3">
                                    <img v-if="detail.IsExternalIdentifier==0||detail.IsExternalIdentifier==false" :src="require('@/assets/img/checkbox_unchecked.gif')" alt="未选取的" width="21" height="16" class="checkImg" title="未选取的">
                                    <img v-else :src="require('@/assets/img/checkbox_checked.gif')" alt="已选取的" width="21" height="16" class="checkImg" title="已选取的">
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="brandTertiaryBrd pbSubheader tertiaryPalette">
                    <h3>自动编号 选项<span class="titleSeparatingColon">:</span></h3>
                </div>
                <div class="pbSubsection">
                    <table class="detailList">
                        <tbody>
                            <tr>
                                <td class="last labelCol">显示格式</td>
                                <td class="dataCol last col02">{{detail.AutoNumberMask}}</td>
                                <td class="labelCol last empty">&nbsp;</td>
                                <td class="dataCol last empty">&nbsp;</td>
                            </tr>
                        </tbody>
                    </table>
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
    const emit = defineEmits(['edit','back']);
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
</script>
<style lang="less" scoped>
    @import url("@/style/fieldForm.less");
    @import url("@/style/fieldDetail/fieldDetail.less");
</style>