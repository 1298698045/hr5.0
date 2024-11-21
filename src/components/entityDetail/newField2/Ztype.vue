<template>
    <keep-alive>
        <div class="NewField">
            <!-- <div class="head">
                <h1 class="title">外出学术活动审批表：新建自定义字段 公式</h1>
                <div>
                    <a href="javascript:;">此页面的帮助</a>
                    <img :src="require('@/assets/img/help_orange.png')" alt="">
                </div>
            </div> -->
            <div class="panelStepBox">
                <div class="panelStepTitle">
                    <span>
                        步骤 2. 选择输出类型
                    </span>
                    <span>
                        第 2 步，共 5 步
                    </span>
                </div>
                <div class="panelStepBoxBd">
                    <div class="panleStep">
                        <input class="inpBtn" type="button" value=" 上一页 " @click="handlePrev(0)">
                        <input class="inpBtn ml10" type="button" value=" 下一页 " @click="handleNext(2)">
                        <input value=" 取消 " class="inpBtnCancel" name="cancel" title="取消" type="submit" @click="handleCancel">
                    </div>
                    <div class="panelContent">
                        <table class="detailList">
                            <tbody>
                                <tr>
                                    <td class="labelCol requiredInput">
                                        <label for="MasterLabel">
                                            <span class="assistiveText">*</span>
                                            字段标签
                                        </label>
                                    </td>
                                    <td class="dataCol col02" colspan="3">
                                        <div class="requiredInput">
                                            <div class="requiredBlock"></div>
                                            <input v-model="formState.MasterLabel" maxlength="40" size="20"
                                                name="MasterLabel" type="text">
                                            <template v-if="rules.MasterLabel.isRequired">
                                                <div class="errorMsg">
                                                    <strong>错误:</strong>
                                                    必须输入一个值
                                                </div>
                                                &nbsp;
                                            </template>
                                            <div class="mouseOverInfoOuter">
                                                <img :src="require('@/assets/img/s.gif')" alt="" class="infoIcon"
                                                    title="">
                                                <div class="mouseOverInfo">输入要在显示视图、页面布局视图、报表视图和列表视图上使用的标签。</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="labelCol last requiredInput">
                                        <label for="MasterLabel">
                                            <span class="assistiveText">*</span>
                                            字段名
                                        </label>
                                    </td>
                                    <td class="last dataCol" colspan="3">
                                        <div class="requiredInput">
                                            <div class="requiredBlock"></div>
                                            <input v-model="formState.DeveloperName" maxlength="40" size="20"
                                                name="DeveloperName" type="text">
                                            <template v-if="rules.DeveloperName.isRequired">
                                                <div class="errorMsg">
                                                    <strong>错误:</strong>
                                                    必须输入一个值
                                                </div>
                                                &nbsp;
                                            </template>
                                            <div class="mouseOverInfoOuter">
                                                <img :src="require('@/assets/img/s.gif')" alt="" class="infoIcon"
                                                    title="">
                                                <div class="mouseOverInfo">"字段名"供内部参考，用于集成目的（如自定义链接、Custom S-control 和
                                                    API）。在更改"字段名"时要小心，因为可能会影响现有集成。</div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr class="detailRow">
                                    <td colspan="4">
                                        &nbsp;
                                    </td>
                                </tr>
                                <tr>
                                    <td class="last labelCol">自动添加到自定义报表类型</td>
                                    <td class="last data2Col" colspan="3">
                                        <input v-model="formState.autoAddFieldToCrt" id="autoAddFieldToCrt"
                                            name="autoAddFieldToCrt" type="checkbox">
                                        将此字段添加到包含此实体的现有自定义报表类型&nbsp;
                                        <div class="mouseOverInfoOuter">
                                            <img :src="require('@/assets/img/s.gif')" alt="" class="infoIcon" title="">
                                            <div class="mouseOverInfo">如果出现错误，您仍可以使用该字段，条件是您手动将字段添加到自定义报表类型。</div>
                                        </div>
                                    </td>
                                </tr>
                                <tr class="detailRow">
                                    <td colspan="4">
                                        &nbsp;
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="bPageBlock">
                            <div class="pbSubheader">
                                <h3>公式返回类型</h3>
                            </div>
                            <div class="pbSubBody">
                                <a-radio-group v-model:value="formState.fdtype" style="width: 100%;">
                                    <div class="radioGroup">
                                        <div class="radioRow">
                                            <a-radio :style="radioStyle" value="NoneSelected">未选取任何内容</a-radio>
                                            <div class="radioDesc">请选择以下数据类型之一。</div>
                                        </div>
                                    </div>
                                    <div class="radioGroup">
                                        <div class="radioRow">
                                            <a-radio :style="radioStyle" value="B">复选框</a-radio>
                                            <div class="radioDesc">计算布尔值<br>示例:<span class="exampleBox">TODAY() &gt; CloseDate</span></div>
                                        </div>
                                        <div class="radioRow">
                                            <a-radio :style="radioStyle" value="C">币种</a-radio>
                                            <div class="radioDesc">计算美元或其他币种金额，并将字段自动转换为币种金额格式。<br>示例:<span class="exampleBox">Gross Margin（毛利）= Amount - Cost__c</span></div>
                                        </div>
                                        <div class="radioRow">
                                            <a-radio :style="radioStyle" value="D">日期</a-radio>
                                            <div class="radioDesc">计算日期，例如，通过在其他日期上加上或减去一定的天数。
                                                <br>
                                                示例:
                                                <span class="exampleBox">Reminder Date（提醒日期）= CloseDate - 7</span>
                                            </div>
                                        </div>
                                        <div class="radioRow">
                                            <a-radio :style="radioStyle" value="F">日期/时间</a-radio>
                                            <div class="radioDesc">计算日期/时间，例如，通过在其他日期/时间上加上一定的小时或天数。
                                                <br>
                                                示例:
                                                <span class="exampleBox">Next（下一值）= NOW() + 1</span>
                                            </div>
                                        </div>
                                        <div class="radioRow">
                                            <a-radio :style="radioStyle" value="N">数字</a-radio>
                                            <div class="radioDesc">
                                                计算数字值。
                                                <br>
                                                示例:
                                                <span class="exampleBox">Fahrenheit（华氏度）= 1.8 * Celsius__c + 32</span>
                                            </div>
                                        </div>
                                        <div class="radioRow">
                                            <a-radio :style="radioStyle" value="P">百分比</a-radio>
                                            <div class="radioDesc">
                                                计算百分比，并自动向数字添加百分号。
                                                <br>
                                                示例:
                                                <span class="exampleBox">Discount（折扣）= (Amount - Discounted_Amount__c) / Amount</span>
                                            </div>
                                        </div>
                                        <div class="radioRow">
                                            <a-radio :style="radioStyle" value="S">文本</a-radio>
                                            <div class="radioDesc">
                                                创建文本字符串，例如，通过串联其他几个文本字段。
                                                <br>
                                                示例:
                                                <span class="exampleBox">Full Name（全名）= LastName & ", " & FirstName</span>
                                            </div>
                                        </div>
                                        <div class="radioRow">
                                            <a-radio :style="radioStyle" value="f">时间</a-radio>
                                            <div class="radioDesc">
                                                计算时间，例如，通过在其他时间上加上一定的小时数。
                                                <br>
                                                示例:
                                                <span class="exampleBox">Next = TIMEVALUE(NOW()) + 1</span>
                                            </div>
                                        </div>
                                    </div>
                                </a-radio-group>
                                <div class="scaleRow" v-if="formState.fdtype=='N'">
                                    <span class="label">选项</span>
                                    <div class="requiredInput">
                                        <div class="requiredBlock"></div>
                                        <strong><label for="Scale"><span class="assistiveText">*</span>小数位数</label></strong>
                                        &nbsp;
                                        <select id="Scale" name="Scale">
                                            <option value="0" selected="selected">0</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                            <option value="11">11</option>
                                            <option value="12">12</option>
                                            <option value="13">13</option>
                                            <option value="14">14</option>
                                            <option value="15">15</option>
                                            <option value="16">16</option>
                                            <option value="17">17</option>
                                            <option value="18">18</option>
                                        </select>
                                        <strong>示例： </strong>
                                        <span id="p38">999</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="panleStep">
                        <input class="inpBtn" type="button" value=" 上一页 " @click="handlePrev(0)">
                        <input class="inpBtn ml10" type="button" value=" 下一页 " @click="handleNext(2)">
                        <input value=" 取消 " class="inpBtnCancel" name="cancel" title="取消" type="submit" @click="handleCancel">
                    </div>
                </div>
            </div>
        </div>
    </keep-alive>
</template>
<script setup>
    import {
        UnorderedListOutlined,
        DownOutlined,
        CaretDownOutlined,
        UserOutlined, UpOutlined
    } from "@ant-design/icons-vue";
    import {
        ref,
        watch,
        reactive,
        toRefs,
        onMounted,
        getCurrentInstance,
        onUpdated,
        toRaw,
        nextTick,
        defineEmits,
        defineProps,
        defineExpose
    } from "vue";
    import { message } from "ant-design-vue";
  import Toast from "@/utils/toast.js";
    import { useStore } from "vuex";
    let store = useStore();
    import bus from '@/utils/eventBus.js';
    const props = defineProps({
        type: [String, Number]
    });
    const labelCol = ref({ style: { width: '230px' } });
    const emit = defineEmits(['prev', 'next', 'cancel']);
    const radioStyle = reactive({
        display: 'flex',
        height: '30px',
        lineHeight: '30px',
        width: '30%'
    });
    const data = reactive({
        isFormulaShow: false,
        isOperator: false,
        fdtype: ""
    });
    const { isFormulaShow, isOperator, fdtype } = toRefs(data);
    const handleOpreator = () => {
        data.isOperator = !data.isOperator;
    }

    onMounted(()=>{
        window.addEventListener('click',()=>{
            data.isOperator = false;
        })
    });

    const  FormulaEditor = {};
    const formState = reactive({
        MasterLabel: "", // 字段标签
        DeveloperName: "", // 字段名
        autoAddFieldToCrt: true, // 自动添加到自定义报表类型
        fdtype: "",
        dtype: props.type
    });
    const handleisShowFormula = () => {
        data.isFormulaShow = !data.isFormulaShow;
    }
    // 必填数据
    const rules = reactive({
        MasterLabel: {
            isRequired: false
        },
        DeveloperName: {
            isRequired: false
        }
    });
    
    const handleNext = () => {
        console.log("rules", rules);
        if(formState.fdtype=='NoneSelected' || formState.fdtype == ''){
            Toast("错误: 必须选择一个数据类型");
        }else {
            if (validateField()) {
                store.commit('setRecordForm', toRaw(formState));
                bus.emit("fdtype", formState.fdtype);
                emit("next", 2);
            }
        }
    };
    const validateField = () => {
        let isValidate = true;
        let obj = toRaw(rules);
        console.log("rules", rules);
        for (let key in rules) {
            rules[key].isRequired = false;
            if (formState[key] == "") {
                rules[key].isRequired = true;
                isValidate = false;
            }
        };
        return isValidate;
    }
    const handlePrev = () => {
        emit("next", 0);
    };
    const handleCancel = () => {
        emit("cancel", false);
    };
</script>
<style lang="less" scoped>
    @import url("@/style/fieldForm.less");
    .NewField {
        .head {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;

            .title {
                font-size: 20px;
                font-weight: normal;
                padding: 15px 12px 0;
            }

            a {
                padding-right: 5px;
            }

            img {
                vertical-align: top;
            }
        }

        .panelStepBox {
            .panelStepTitle {
                background-color: #8e9dbe;
                border-color: #8e9dbe;
                padding: 8px 12px;
                border-top-right-radius: 5px;
                border-top-left-radius: 5px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                color: #fff;
                font-weight: bold;
            }

            .panelStepBoxBd {
                background: #f8f8f8 none;
                border: 1px solid #eaeaea;
                border-bottom-right-radius: 5px;
                border-bottom-left-radius: 5px;

                .panleStep {
                    display: flex;
                    justify-content: flex-end;
                    padding: 10px 10px;
                    border-bottom: 1px solid #dbdbdb;
                }

                .panelDesc {
                    padding: 10px;
                    border-top: 1px solid #fff;
                    border-bottom: 1px solid #dbdbdb;
                }

                .radioGroup {
                    /* border-bottom: 1px solid #dbdbdb; */
                    /* padding: 10px 20px; */

                    .radioRow {
                        display: flex;
                        align-items: self-start;

                        .radioDesc {
                            flex: 1;
                            line-height: 30px;
                        }
                    }
                }

                .panelContent {
                    padding-top: 20px;
                    /* padding-right: 100px; */
                    border-bottom: 1px solid #dbdbdb;
                    padding-bottom: 16px;

                    .fieldInp {
                        width: 200px !important;
                    }

                    .fieldText {
                        width: 50% !important;
                    }
                }
            }
        }
    }

    .strong {
        color: blue;
    }
</style>