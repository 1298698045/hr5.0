<template>
    <div class="bPageTitle">
        <div class="ptBody">
            <div class="content">
                <h1 class="noSecondHeader pageType">新建字段依赖性</h1>
                <div class="blank">&nbsp;</div>
            </div>
            <div class="links"><a
                    href="javascript:openPopupFocusEscapePounds(%27/HelpAndTrainingDoor?loc=help&amp;target=fields_defining_field_dependencies.htm&amp;section=Customizing%27, %27Help%27, 1024, 768, %27width=1024,height=768,resizable=yes,toolbar=yes,status=yes,scrollbars=yes,menubar=yes,directories=no,location=yes,dependant=no%27, false, false);"
                    title="此页面的帮助 （新窗口）"><span class="helpLink">此页面的帮助</span><img :src="require('@/assets/img/s.gif')"
                        alt="" class="helpIcon"></a></div>
        </div>
        <div class="ptBreadcrumb"></div>
    </div>
    <div class="bDescription">创建一个依赖关系，该关系将导致基于用户在另一个字段中选择的值对选项列表或多选选项列表中的值进行动态筛选。<br>
        &nbsp;•&nbsp;推动筛选的字段称为"控制字段"。具有至少一个值且小于 300 个值的标准和自定义复选框和选项列表可以是控制字段。<br>
        &nbsp;•&nbsp;其值被筛选的字段称为"依赖字段"。自定义选项列表和多选选项列表可以是依赖字段。<br>
        <br>
        <b>步骤 1：</b>选择一个控制字段和一个依赖字段。完成时单击"继续"。<br><br>
        <b>步骤 2：</b>在下面的页面上，编辑筛选规则，这些规则针对控制字段中每个值控制出现在依赖字段中的值。<br>
    </div>
    <div class="bPageBlock brandSecondaryBrd bEditBlock bLayoutBlock secondaryPalette" id="ep">
        <div class="pbHeader">
            <table border="0" cellpadding="0" cellspacing="0">
                <tbody>
                    <tr>
                        <td class="pbTitle"><img :src="require('@/assets/img/s.gif')" alt="" width="1" height="1"
                                class="minWidth" title="">
                            <h2 class="mainTitle"></h2>
                        </td>
                        <td class="pbButton" id="topButtonRow"><input value=" 继续 " class="inpBtn" name="save" title="继续"
                                type="submit" @click="handleSave"> <input value=" 取消 " class="inpBtn" name="cancel" title="取消"
                                type="submit" @click="handleCancel">
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="pbBody">
            <div class="pbError" id="errorDiv_ep" style="display: none">错误：无效数据。<br>请查看下列所有错误消息以纠正数据。</div>
            <div class="pbSubsection">
                <table class="detailList" border="0" cellpadding="0" cellspacing="0">
                    <tbody>
                        <tr>
                            <td class="labelCol requiredInput"><label for="controller"><span
                                        class="assistiveText">*</span>控制字段</label></td>
                            <td class="dataCol col02">
                                <div class="requiredInput">
                                    <div class="requiredBlock"></div>
                                    <select :class="{'error':rules.controller.isRequired}" id="controller" name="controller" v-model="formState.controller">
                                        <optgroup label="">
                                            <option value="">--无--</option>
                                        </optgroup>

                                        <!-- <optgroup label="标准字段">
                                            <option value="IsExcludedFromRealign">从区域分配规则中排除</option>
                                            <option value="Rating">分级</option>
                                            <option value="AccountSource">客户来源</option>
                                            <option value="Ownership">所有权</option>
                                            <option value="Type">类型</option>
                                            <option value="Industry">行业</option>
                                        </optgroup> -->

                                        <optgroup label="自定义字段">
                                            <option :value="item.id" v-for="(item, index) in fieldList" :key="index">{{item.label}}</option>
                                        </optgroup>
                                    </select>
                                    <div class="errorMsg" v-if="rules.controller.isRequired"><strong>错误:</strong> 必须输入一个值</div>
                                </div>
                            </td>
                            <td class="labelCol last empty">&nbsp;</td>
                            <td class="dataCol last empty">&nbsp;</td>
                        </tr>
                        <tr>
                            <td class="labelCol last requiredInput"><label for="dependent"><span
                                        class="assistiveText">*</span>依赖字段</label></td>
                            <td class="dataCol last col02">
                                <div class="requiredInput">
                                    <div class="requiredBlock"></div>
                                    <select :class="{'error':rules.dependent.isRequired}" id="dependent" name="dependent" v-model="formState.dependent">
                                        <option value="">--无--</option>
                                        <!-- <option value="00NGB00000Oqa1E">多项选择</option>
                                        <option value="00N9000000CFoZu">Active</option>
                                        <option value="00N9000000CFoZv">Customer Priority</option>
                                        <option value="00N9000000CFoZx">SLA</option>
                                        <option value="00N9000000CFoa0">Upsell Opportunity</option> -->
                                        <option :value="item.id" v-for="(item, index) in fieldList" :key="index">{{item.label}}</option>
                                    </select>
                                    <div class="errorMsg" v-if="rules.dependent.isRequired"><strong>错误:</strong> 必须输入一个值</div>
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
                        <td class="pbTitle"><img :src="require('@/assets/img/s.gif')" alt="" width="1" height="1"
                                class="minWidth" title="">&nbsp;</td>
                        <td class="pbButtonb" id="bottomButtonRow"><input value=" 继续 " class="inpBtn" name="save"
                                title="继续" type="submit" @click="handleSave"> <input value=" 取消 " class="inpBtn" name="cancel" title="取消"
                                type="submit" @click="handleCancel"></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="pbFooter secondaryPalette">
            <div class="bg"></div>
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
    import { useRoute } from "vue-router";
    const route = useRoute();
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    const emit = defineEmits(['cancel','continue']);
    const props = defineProps({
        detail: Object
    });

    const data = reactive({
        fieldList: [],
        id: route.query.id
    });
    const { fieldList, id } = toRefs(data);
    const formState = reactive({
        controller: "",
        dependent: ""
    });
    const rules = reactive({
        controller: {
            isRequired: false
        },
        dependent: {
            isRequired: false
        }
    })
    const handleCancel = () => {
        emit("cancel", false);
    }
    onMounted(() => {

    })
    const getFieldList = () => {
        proxy.$get(Interface.objeview.objectmanager, {
            entityId: data.id
        }).then(res=>{
            data.fieldList = res.rows.filter(item=>{
                return item.dataType == 'L' || item.dataType == 'DT';
            });
        })
    };
    getFieldList();
    const validateField = () => {
        let isValidate = true;
        let obj = toRaw(rules);
        console.log("rules", rules);
        for (let key in rules) {
            rules[key].isRequired = false;
            if (formState[key] == "" || formState[key] == undefined) {
                rules[key].isRequired = true;
                isValidate = false;
            }
        };
        return isValidate;
    }
    const handleSave = () => {
        if(validateField()){
            proxy.$post(Interface.objeview.field.DependencyCreate, {
                id: data.id,
                controller: formState.controller,
                dependent: formState.dependent
            }).then(res=>{
                console.log("继续", res);
                emit("continue", res);
            })
        }
    }
</script>
<style lang="less" scoped>
    @import url("@/style/fieldForm.less");
    @import url("@/style/fieldDetail/fieldEdit.less");

    .bPageTitle {
        padding: 15px 0 0;
        margin-bottom: 15px;

        .ptBody {
            color: #000;
            padding: 0;
            overflow: hidden;

            .content {
                float: left;
                width: 70%;
                vertical-align: middle;
                .blank{
                    font-size: 0;
                    clear: both;
                }
                .pageType {
                    color: #000;
                    font-weight: normal;
                    font-size: 20px;
                    white-space: nowrap;
                    padding-left: 1px;
                    font-family: Arial, Helvetica, sans-serif;
                }
            }

            .links {
                padding-right: 5px;
                padding-bottom: 0;
                padding-left: 0;
                float: right;
                text-align: right;
                vertical-align: middle;
                white-space: nowrap;

                a {
                    color: #015ba7;
                    text-decoration: none;
                    &:hover{
                        text-decoration: underline;
                    }
                    .helpIcon {
                        background: transparent url("~@/assets/img/help_orange.png") no-repeat;
                        vertical-align: bottom;
                    }
                }
            }
        }
    }
    .bDescription{
        padding: 0;
        margin: 0 0 16px 0;
        font-size: 12px;
        font-family: 'Helvetica';
        color: #3c3d3e;
    }
</style>