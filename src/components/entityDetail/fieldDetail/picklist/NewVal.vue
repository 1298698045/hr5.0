<template>
    <div>
        <div class="bPageTitle">
            <div class="ptBody">
                <div class="content">
                    <img :src="require('@/assets/img/s.gif')" alt="" class="pageTitleIcon" title="">
                    <h1 class="noSecondHeader pageType">添加选项列表值：Active</h1>
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
        <div class="bDescription">
            在下边添加一个或多个选项列表值。每个值应单独占用一行，并用于值的标签和 API 名称。
            <br>
            <br>
            如果值匹配禁用值的 API 名称，该值会使用此前的标签重新启用。
            <br>
            <br>
            如果值匹配禁用值的标签，而不是 API 名称，则会创建新值。
        </div>
        <div class="bPageBlock brandSecondaryBrd bEditBlock bLayoutBlock secondaryPalette bEditBlock">
            <div class="pbBody">
                <div class="pbSubsection">
                    <table class="detailList" border="0" cellpadding="0" cellspacing="0">
                        <tbody>
                            <tr class="detailRow">
                                <td colspan="4">&nbsp;</td>
                            </tr>
                            <tr class="detailRow">
                                <td colspan="4">
                                    <textarea cols="80" id="p1" maxlength="15000" name="p1" rows="15"
                                        title="Active" type="text" wrap="soft" v-model="formState.titles">
                                    </textarea>
                                </td>
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
                            <td class="pbTitle"><img src="@/assets/img/s.gif" alt="" width="1" height="1" class="minWidth" title="">&nbsp;</td>
                            <td class="pbButtonb" id="bottomButtonRow">
                                <input value=" 保存 " class="inpBtn" name="save" title="保存" type="submit" @click="handleSave"> 
                                <input value=" 取消 " class="inpBtn" name="cancel" title="取消" type="button" @click="handleCancel">
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
    import { message } from "ant-design-vue";
  import Toast from "@/utils/toast.js";
    import Interface from "@/utils/Interface.js";
    import { useRouter, useRoute } from "vue-router";
    const route = useRoute();
    const { proxy } = getCurrentInstance();

    const props = defineProps({
        detail: Object
    })
    const emit = defineEmits(['cancel']);

    const formState = reactive({
        titles: ""
    });
    const hasDuplicates = (array) => {
        return array.some((item, index) => array.indexOf(item) !== index);
    }
    const handleSave = () => {
        // console.log(formState.titles, formState.titles.split(/[(\r\n)\r\n]+/));
        let arr = formState.titles.split(/[(\r\n)\r\n]+/);
        console.log("hasDuplicates", hasDuplicates(arr));
        if(!hasDuplicates(arr)){
            proxy.$post(Interface.objeview.field.batchAdd, {
                ObjectTypeCode: route.query.objectTypeCode,
                Name: props.detail.developerName,
                Values: arr.join(',')
            }).then(res=>{

            })
        }else {
            Toast("不能有重复值！");
        }
    };

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
                    margin-bottom: 0;
                    color: #000;
                    font-size: 24px;
                    font-weight: normal;
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
    .bDescription{
        padding: 0;
        margin: 16px 0;
        font-size: 12px;
        color: #3c3d3e;
    }
    .pbSubsection{
        margin-top: 7px;
        padding: 0 12px;
    }
</style>