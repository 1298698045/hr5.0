<template>
    <div>
        <div class="bPageTitle">
            <div class="ptBody">
                <div class="content">
                    <img :src="require('@/assets/img/s.gif')" alt="" class="pageTitleIcon" title="">
                    <h1 class="pageType">选项列表编辑<span class="titleSeparatingColon">:</span></h1>
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
        <div class="bDescription">在下边输入选项列表值的名称。 选中此复选框，以使用此值作为默认值。</div>
        <div class="bPageBlock brandSecondaryBrd bEditBlock bLayoutBlock secondaryPalette bEditBlock">
            <div class="pbHeader">
                <table border="0" cellpadding="0" cellspacing="0">
                    <tbody>
                        <tr>
                            <td class="pbTitle"><img src="@/assets/img/s.gif" alt="" width="1" height="1" class="minWidth"
                                    title="">
                                <h2 class="mainTitle">替换</h2>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="pbBody">
                <div class="pbSubsection">
                    <table class="detailList" border="0" cellpadding="0" cellspacing="0">
                        <tbody>
                            <tr class="detailRow">
                                <td colspan="4">&nbsp;</td>
                            </tr>
                            <tr>
                                <td class="labelCol requiredInput">
                                    <label for="p1"><span class="assistiveText">*</span>标签</label>
                                </td>
                                <td class="data2Col" colspan="3">
                                    <div class="requiredInput">
                                        <div class="requiredBlock"></div>
                                        <input id="p1" maxlength="255" name="p1" size="20" type="text" v-model="formState.label">
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td class="labelCol requiredInput">API 名称</td>
                                <td class="data2Col" colspan="3">
                                    <div class="requiredInput">
                                        <div class="requiredBlock"></div>
                                        <input id="p3" maxlength="255" name="p3" size="20" type="text" v-model="formState.AttributeName">
                                        <div class="mouseOverInfoOuter">
                                            <img src="@/assets/img/s.gif" alt="" class="infoIcon" title="">
                                            <div class="mouseOverInfo">更改 API 名称会在“选项列表设置”页面上启用。</div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td class="labelCol">
                                    <label for="p2">默认</label>
                                </td>
                                <td class="data2Col" colspan="3">
                                    <input id="p2" name="p2" type="checkbox" v-model="formState.isDefault">将此值作为主选项列表的默认值
                                </td>
                            </tr>
                            <tr>
                                <td class="labelCol"><label for="colorVal">图表颜色</label></td>
                                <td class="dataCol col02">
                                    <input type="hidden" id="colorVal" name="colorVal" value="">
                                    <table class="colorInputElement">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div class="sample" id="colorOuterDiv" style="cursor: pointer; border: 1px solid #a5acb2;" @click="handleOpenColor" v-if="formState.color!=''">
                                                        <div style="width: 75px;" :style="{background:'#'+formState.color}" id="colorValcell">&nbsp;</div>
                                                    </div>
                                                    <div class="sample" id="colorOuterDiv" style="cursor: pointer; border-style: none;" v-else>
                                                        <div style="background-color: transparent; width: 125px;" id="colorValcell">已动态分配</div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <a href="javascript:;" title="选择颜色（新窗口）" @click="handleOpenColor">
                                                        <img :src="require('@/assets/img/s.gif')" alt="选择颜色（新窗口）" class="colorPickerIcon"
                                                            title="选择颜色（新窗口）">
                                                    </a>
                                                </td>
                                                <td>
                                                    <a href="#" id="clearColor" style="white-space: nowrap; margin-left: 10px;" v-if="formState.color!=''">动态分配颜色</a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                                <td class="labelCol last empty">&nbsp;</td>
                                <td class="dataCol last empty">&nbsp;</td>
                            </tr>
                            <tr class="last detailRow">
                                <td colspan="4">&nbsp;</td>
                            </tr>
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
                                <input value=" 替换 " class="inpBtn" name="save" title="替换" type="submit" @click="handleReplace">
                                <input value=" 取消 " class="inpBtn" name="cancel" title="取消" type="button"
                                    @click="handleCancel">
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <ColorModal :isShow="isColor" v-if="isColor" @cancel="isColor=false" @color="setColor" />
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
        toRef,
        onMounted,
        getCurrentInstance,
        onUpdated,
        nextTick,
        defineProps,
        defineEmits
    } from "vue";
    import { message } from "ant-design-vue";
  import Toast from "@/utils/toast.js";

    import ColorModal from "@/components/ColorModal.vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    const props = defineProps({
        valRow: Object
    });
    const formState = reactive({
        label: "",
        value: "",
        isDefault: false,
        color: ""
    });
    const isColor = toRef(false);
    onMounted(()=>{
        formState.label = props.valRow.Value;
        formState.AttributeName = props.valRow.AttributeName;
    })
    const emit = defineEmits(['cancel']);

    const handleCancel = () => {
        emit('cancel', false);
    }
    const handleReplace = () => {
        proxy.$get(Interface.objeview.field.editPick, {
            label: formState.label,
            value: props.valRow.AttributeValue,
            id: props.valRow.Id,
            isDefault: formState.isDefault ? 1 : 0,
            color: formState.color,
            displayOrder: props.valRow.DisplayOrder
        }).then(res=>{

        })
    };
    const handleOpenColor = () => {
        isColor.value = true;
    };
    const setColor = (color) => {
        formState.color = color;
        isColor.value = false;
    };
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

    .picklistArrowLeft,
    .picklistArrowRight,
    .rightArrowIcon,
    .leftArrowIcon,
    .doubleArrowUp,
    .upArrowIcon,
    .downArrowIcon,
    .doubleArrowDwn {
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

    .doubleArrowDwn {
        background-position: left -300px;
    }

    table.layout {
        width: auto;

        td {
            vertical-align: middle;
            text-align: center;
        }

        td.buttonCell {
            vertical-align: middle !important;
        }
    }

    .duelingListBox .text {
        padding: 2px 0 2px 0;

        a:hover {
            .doubleArrowUp {
                background-position: left -260px;
            }

            .upArrowIcon {
                background-position: left -140px;
            }

            .downArrowIcon {
                background-position: left -200px;
            }

            .doubleArrowDwn {
                background-position: left -320px;
            }
        }
    }
    .colorPickerIcon{
        width: 16px;
        height: 16px;
        background-image: url("~@/assets/img/colorPicker16.gif");
        background-position: 0 0;
    }
    .colorInputElement{
        width: auto !important;
    }
</style>