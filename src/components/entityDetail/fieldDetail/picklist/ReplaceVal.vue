<template>
    <div>
        <div class="bPageTitle">
            <div class="ptBody">
                <div class="content">
                    <img :src="require('@/assets/img/s.gif')" alt="" class="pageTitleIcon" title="">
                    <h1 class="pageType">查找并替换选项列表<span class="titleSeparatingColon">:</span></h1>
                    <h2 class="pageDescription"> Active</h2>
                    <div class="blank">&nbsp;</div>
                </div>
                <div class="links">
                    <a href="javascript:void(0)" title="此页面的帮助 （新窗口）">
                        <span class="helpLink">此页面的帮助</span>
                        <img :src="require('@/assets/img/s.gif')" alt="" class="helpIcon">
                    </a>
                </div>
            </div>
            <div class="ptBreadcrumb"></div>
        </div>
        <div class="bDescription">用新值全局替换选项列表中的现有值。请确保，您已先在选项列表字段上创建新值。请注意，替换现有选项列表值将更新记录的上次修改人日期和时间。</div>
        <div class="bPageBlock brandSecondaryBrd bEditBlock bLayoutBlock secondaryPalette bEditBlock">
            <div class="pbHeader">
                <table border="0" cellpadding="0" cellspacing="0"><tbody><tr><td class="pbTitle"><img src="@/assets/img/s.gif" alt="" width="1" height="1" class="minWidth" title=""><h2 class="mainTitle">替换</h2></td></tr>
                </tbody></table>
            </div>
            <div class="pbBody">
                <div class="pbSubsection">
                    <table class="detailList" border="0" cellpadding="0" cellspacing="0">
                        <tbody>
                            <tr class="detailRow"><td colspan="4"><img src="@/assets/img/s.gif" alt="" width="1" height="5" title=""></td></tr><tr><td class="labelCol requiredInput"><label for="nf"><span class="assistiveText">*</span>要更改的确切值</label></td><td class="dataCol col02"><div class="requiredInput"><div class="requiredBlock"></div><input id="nf" maxlength="255" name="nf" size="20" type="text"></div></td><td class="last labelCol"><label for="fnv">替换所有空值</label></td><td class="last dataCol"><input id="fnv" name="fnv" onclick="updateNameFields();" type="checkbox" value="1"></td></tr>
                            <tr><td class="last labelCol"><label for="nv">选择要更改至的目标值</label></td><td class="dataCol last col02"><select id="nv" name="nv"><option value="">--无--</option><option value="1">No</option>
                            <option value="2">Yes</option>
                            </select></td><td class="labelCol last empty">&nbsp;</td><td class="dataCol last empty">&nbsp;</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="pbBottomButtons">
                <table border="0" cellpadding="0" cellspacing="0">
                    <tbody>
                        <tr>
                            <td class="pbTitle"><img src="@/assets/img/s.gif" alt="" width="1" height="1" class="minWidth"
                                    title="">&nbsp;</td>
                            <td class="pbButtonb" id="bottomButtonRow">
                                <input value=" 替换 " class="inpBtn" name="save" title="替换" type="submit">
                                <input value=" 取消 " class="inpBtn" name="cancel" title="取消" type="button"
                                    @click="handleCancel">
                            </td>
                        </tr>
                    </tbody>
                </table>
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
    const emit = defineEmits(['cancel']);

    const handleCancel = () => {
        emit('cancel', false);
    }

</script>
<style lang="less" scoped>
    @import url("@/style/fieldForm.less");
    @import url("@/style/fieldDetail/fieldEdit.less");

    .bPageTitle {
        padding: 15px 0 0;
        margin-bottom: 15px;

        .ptBody {
            width: 100%;
            overflow: hidden;
            background-color: transparent;
            color: #000;
            padding: 0;

            .content {
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

                .pageDescription {
                    font-size: 22px;
                    font-weight: normal;
                    line-height: 22px;
                }

                .blank {
                    font-size: 0;
                    clear: both;
                }
            }

            .links {
                padding-right: 5px;
                padding-bottom: 0;
                padding-left: 0;
                float: right;
                text-align: right;
                vertical-align: middle;
                font-size: 13px;
                white-space: nowrap;

                a {
                    color: #015ba7;
                    text-decoration: none;

                    span:hover {
                        text-decoration: underline;
                    }

                    .helpIcon {
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

            a {
                color: #015ba7;
                text-decoration: none;
            }
        }
    }

    .bDescription {
        padding: 0;
        margin: 16px 0;
        font-size: 12px;
        color: #3c3d3e;
    }

    .pbSubsection {
        margin-top: 7px;
        padding: 0 12px;
    }
    .picklistArrowLeft, .picklistArrowRight, .rightArrowIcon, .leftArrowIcon, .doubleArrowUp, .upArrowIcon, .downArrowIcon, .doubleArrowDwn{
        width: 24px;
        height: 20px;
        margin: 0 2px;
        background: transparent url("~@/assets/img/combobox_arrows_sprite.gif") no-repeat;
        vertical-align: middle;
    }
    .doubleArrowUp {
        background-position: left -240px;
    }
    .upArrowIcon {
        background-position: left -120px;
    }
    .downArrowIcon {
        background-position: left -180px;
    }
    .doubleArrowDwn{
        background-position: left -300px;
    }
    table.layout{
        width: auto;
        td{
            vertical-align: middle;
            text-align: center;
        }
        td.buttonCell{
            vertical-align: middle !important;
        }
    }
    .duelingListBox .text{
        padding: 2px 0 2px 0;
        a:hover{
            .doubleArrowUp {
                background-position: left -260px;
            }
            .upArrowIcon {
                background-position: left -140px;
            }
            .downArrowIcon{
                background-position: left -200px;
            }
            .doubleArrowDwn{
                background-position: left -320px;
            }
        }
    }
</style>