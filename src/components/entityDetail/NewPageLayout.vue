<template>
    <div class="editPage" style="height: 100%; padding: 0 12px; overflow-y: auto;">
        <div class="bPageTitle">
            <div class="ptBody">
                <div class="content">
                    <img :src="require('@/assets/img/s.gif')" alt="" class="pageTitleIcon" title="">
                    <h1 class="noSecondHeader pageType">创建新页面布局</h1>
                    <div class="blank">&nbsp;</div>
                </div>
                <div class="links">
                    <a href="javascript:void(0);" title="此页面的帮助 （新窗口）">
                        <span class="helpLink">此页面的帮助</span>
                        <img :src="require('@/assets/img/s.gif')" alt="" class="helpIcon">
                    </a>
                </div>
            </div>
            <div class="ptBreadcrumb"></div>
        </div>
        <div class="bPageBlock brandSecondaryBrd bEditBlock secondaryPalette">
            <div class="pbBody">
                <div class="pbSubsection">
                    <table class="detailList">
                        <tbody>
                            <tr class="detailRow">
                                <td colspan="4">
                                    <div class="message infoM4" id="pleCloneIntroInfo">
                                        <table class="messageTable" border="0" cellpadding="0" cellspacing="0">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <img :src="require('@/assets/img/s.gif')" alt="信息" class="msgIcon" title="信息">
                                                    </td>
                                                    <td class="messageCell">
                                                        <div class="messageText">
                                                            作为一种选择，可选择一个现有布局进行复制。如果不通过复制而创建页面布局，则您的页面布局将不包括已针对国际用户将其名称进行翻译的标准部分。
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td class="labelCol"><label for="p2">现有页面布局</label></td>
                                <td class="dataCol col02">
                                    <select id="p2" name="p2" v-model="formState.p2">
                                        <option value="">--无--</option>
                                        <option :value="item.id" v-for="(item, index) in listData" :key="index">{{item.label}} 布局</option>
                                    </select></td>
                                <td class="labelCol last empty">&nbsp;</td>
                                <td class="dataCol last empty">&nbsp;</td>
                            </tr>
                            <tr>
                                <td class="labelCol last requiredInput"><label for="p1"><span
                                            class="assistiveText">*</span>页面布局名</label></td>
                                <td class="dataCol last col02">
                                    <div class="requiredInput">
                                        <div class="requiredBlock"></div>
                                        <input id="p1" maxlength="80" name="p1"
                                            size="20" type="text" v-model="formState.p1">
                                        <div class="errorMsg" v-if="rules.p1.isRequired"><strong>错误:</strong> 必须输入一个值</div>
                                    </div>
                                </td>
                                <td class="labelCol last empty">&nbsp;</td>
                                <td class="dataCol last empty">&nbsp;</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="pbBottomButtons">
                <table border="0" cellpadding="0" cellspacing="0">
                    <tbody>
                        <tr>
                            <td class="pbTitle">
                                <img :src="require('@/assets/img/s.gif')" alt="" width="1" height="1" class="minWidth"
                                    title="">&nbsp;
                            </td>
                            <td class="pbButtonb" id="bottomButtonRow">
                                <input value=" 保存 " class="inpBtn" name="save" title="保存" type="submit"
                                    @click="handleSave">
                                <input value=" 取消 " class="inpBtn" name="cancel" title="取消" type="submit"
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
        defineEmits,
        toRaw
    } from "vue";
    import { message } from "ant-design-vue";
    import Toast from '@/utils/toast.js';
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    const emit = defineEmits(['cancel','load']);
    const props = defineProps({
        id: String,
        detail: Object,
        entityId: String
    });

    const rules = reactive({
        p1: {
            isRequired: false
        }
    })

    const formState = reactive({
        p1: "",
        p2: ""
    })
    const data = reactive({
        listData: []
    });
    const { listData } = toRefs(data);

    onMounted(() => {

    })

    const getLayoutQuery = () => {
        proxy.$get(Interface.objeview.pageLayout.list, {
            entityId: props.entityId
        }).then(res=>{
            data.listData = res.rows;
        })
    }
    getLayoutQuery();
    const handleCancel = () => {
        emit("cancel", false);
    };
    const validateField = () => {
        let isValidate = true;
        let obj = toRaw(rules);
        for (let key in rules) {
            rules[key].isRequired = false;
            if (formState[key] == "" || formState[key] == undefined) {
                rules[key].isRequired = true;
                isValidate = false;
            }
        };
        return isValidate;
    };

    const handleSave = () => {
        if (validateField()) {
            let d = {
                actions: [
                    {
                        id: "",
                        descriptor: "",
                        callingDescriptor: "UNKNOWN",
                        params: {
                            recordInput: {
                                allowSaveOnDuplicate: false,
                                apiName: "Layout",
                                fields: {
                                    Name: formState.p1,
                                    TemplateId: props.entityId,
                                    // Description: formState.p1
                                }
                            }
                        }

                    }
                ]
            }
            let obj = {
                message: JSON.stringify(d)
            }
            proxy.$post(Interface.objeview.pageLayout.create, obj).then(res => {
                // Toast("保存成功！");
                Toast("保存成功！");
                emit("load", false);
            })
        }
    }

</script>
<style lang="less" scoped>
    @import url("@/style/fieldForm.less");
    @import url("@/style/fieldDetail/fieldEdit.less");
    #pleCloneIntroInfo{
        margin: 10px auto 15px;
    }
    .message{
        background-color: #ffc;
        border-style: solid;
        border-width: 1px;
        color: #000;
        padding: 6px 8px 6px 6px;
        border-radius: 4px;
        margin: 4px 20px;
    }
    .infoM4{
        border-color: #39f;
        td{
            margin: 0 !important;
            padding: 0 !important;
        }
        .msgIcon{
            width: 16px;
            height: 16px;
            display: inline-block;
            background-image: url('~@/assets/img/master.png');
            background-position: 0 -222px;
        }
    }
</style>