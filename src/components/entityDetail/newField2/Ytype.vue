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
                        步骤 2. 选择相关对象
                    </span>
                    <span>
                        步骤 2
                    </span>
                </div>
                <div class="panelStepBoxBd">
                    <div class="panleStep">
                        <input class="inpBtn" type="button" value=" 上一页 " @click="handlePrev(0)">
                        <input class="inpBtn ml10" type="button" value=" 下一页 " @click="handleNext(2)">
                        <a-button type="link" @click="handleCancel">取消</a-button>
                    </div>
                    <div class="panelContent">
                        <div class="pbDescription ">
                            选择此对象相关的另一个对象。
                        </div>
                        <div class="pbWizardBody">
                            <table class="detailList">
                                <tbody>
                                    <tr>
                                        <td class="labelCol requiredInput">
                                            <label for="MasterLabel">
                                                <span class="assistiveText">*</span>
                                                相关项
                                            </label>
                                        </td>
                                        <td class="dataCol col02" colspan="3">
                                            <div class="requiredInput">
                                                <div class="requiredBlock"></div>
                                                <input :class="{'error':rules.DomainEnumOrId.isRequired}" v-model="formState.DomainEnumOrId.Name" name="DomainEnumOrId" type="text">
                                                <!-- <select :class="{'error':rules.DomainEnumOrId.isRequired}" v-model="formState.DomainEnumOrId" id="DomainEnumOrId" name="DomainEnumOrId">
                                                    <option value="">--无--</option>
                                                    <option value="BusinessBrand">业务品牌</option>
                                                    <option value="Opportunity">业务机会</option>
                                                    <option value="OpportunityLineItem">业务机会产品</option>
                                                    <option value="FlowOrchestrationWorkItem">业务流程工作项目</option>
                                                    <option value="FlowOrchestrationStepInstance">业务流程步骤运行</option>
                                                    <option value="FlowOrchestrationInstance">业务流程运行</option>
                                                    <option value="FlowOrchestrationStageInstance">业务流程阶段运行</option>
                                                    <option value="Individual">个人</option>
                                                    <option value="Case">个案</option>
                                                    <option value="Product2">产品</option>
                                                    <option value="ProductConsumptionSchedule">产品消耗计划</option>
                                                    <option value="AgentWork">代理的工作</option>
                                                    <option value="Pricebook2">价格手册</option>
                                                    <option value="SessionHijackingEventStore">会话劫持事件存储</option>
                                                    <option value="ContentFolder">内容文件夹</option>
                                                    <option value="CredentialStuffingEventStore">凭据填充事件存储</option>
                                                    <option value="Community">区域</option>
                                                    <option value="Seller">卖方</option>
                                                    <option value="ConsumptionSchedule">占用计划</option>
                                                    <option value="EngagementChannelType">参与渠道类型</option>
                                                    <option value="Contract">合同</option>
                                                    <option value="BackgroundOperation">后台操作</option>
                                                    <option value="01I900000022AJe">员工档案</option>
                                                    <option value="01I900000022BTI">培训经历</option>
                                                    <option value="FileBasedDataImport">基于文件的数据导入</option>
                                                    <option value="ThreatDetectionFeedback">威胁检测反馈</option>
                                                    <option value="Macro">宏</option>
                                                    <option value="Account">客户</option>
                                                    <option value="Customer">客户</option>
                                                    <option value="BusinessHours">工作时间</option>
                                                    <option value="01I0o00000296u6">工作经历</option>
                                                    <option value="01I900000022BTS">工作经历</option>
                                                    <option value="Campaign">市场活动</option>
                                                    <option value="PartyConsent">当事人同意</option>
                                                    <option value="QuickText">快速文本</option>
                                                    <option value="Idea">意见</option>
                                                    <option value="Quote">报价</option>
                                                    <option value="QuoteLineItem">报价行项目</option>
                                                    <option value="ReportAnomalyEventStore">报告异常事件存储</option>
                                                    <option value="01I90000001SlVR">报销单</option>
                                                    <option value="01I90000001TpT3">报销详细</option>
                                                    <option value="AuthorizationForm">授权书</option>
                                                    <option value="AuthorizationFormConsent">授权书同意</option>
                                                    <option value="AuthorizationFormDataUse">授权书数据使用</option>
                                                    <option value="AuthorizationFormText">授权书文本</option>
                                                    <option value="Recommendation">推荐</option>
                                                    <option value="01I900000022BTD">教育经历</option>
                                                    <option value="DataUseLegalBasis">数据使用法律依据</option>
                                                    <option value="DataUsePurpose">数据使用目的</option>
                                                    <option value="CalendarModel">日历模型</option>
                                                    <option value="ServiceResource">服务资源</option>
                                                    <option value="GuestUserAnomalyEventStore">来宾用户异常事件存储</option>
                                                    <option value="ConsumptionRate">消耗率</option>
                                                    <option value="Lead">潜在客户</option>
                                                    <option value="01I90000001U0RK">物品领用</option>
                                                    <option value="User">用户</option>
                                                    <option value="UserServicePresence">用户提供内容</option>
                                                    <option value="UserProvAccount">用户配置客户</option>
                                                    <option value="UserProvisioningLog">用户配置情况日志</option>
                                                    <option value="UserProvisioningRequest">用户配置请求</option>
                                                    <option value="01I90000001pFjU">用款申请单</option>
                                                    <option value="01I90000001eWDn">用款项目</option>
                                                    <option value="01I90000001pFjK">申购单</option>
                                                    <option value="01I900000021z4c">短信营销</option>
                                                    <option value="SocialPersona">社交简档</option>
                                                    <option value="OrgMetric">组织度量</option>
                                                    <option value="OrgMetricScanSummary">组织度量扫描摘要</option>
                                                    <option value="01I900000021zoz">考勤记录</option>
                                                    <option value="LiveAgentSession">聊天会话</option>
                                                    <option value="LiveChatTranscript">聊天脚本</option>
                                                    <option value="LiveChatVisitor">聊天访客</option>
                                                    <option value="01I900000022BTX">职员调动</option>
                                                    <option value="Contact">联系人</option>
                                                    <option value="ContactPointTypeConsent">联系点类型同意</option>
                                                    <option value="Solution">解决方案</option>
                                                    <option value="Order">订单</option>
                                                    <option value="OrderItem">订单产品</option>
                                                    <option value="01I900000022BTN">论文与著作</option>
                                                    <option value="01I900000021zp4">请假</option>
                                                    <option value="Asset">资产</option>
                                                    <option value="CommSubscription">通信订阅</option>
                                                    <option value="CommSubscriptionChannelType">通信订阅渠道类型</option>
                                                    <option value="ApiAnomalyEventStore">API 异常事件存储</option>
                                                    <option value="DandBCompany">D&amp;B 公司</option>
                                                    <option value="01I90000001TSNa">Expense</option>
                                                    <option value="01I900000026RAm">Integration</option>
                                                    <option value="01I900000026RAl">Integration Log</option>
                                                    <option value="01I900000026RAn">Issue</option>
                                                    <option value="01I90000001TSNb">Log</option>
                                                    <option value="01I0o0000029SiI">Message Destination</option>
                                                    <option value="01I90000001TSNc">Milestone</option>
                                                    <option value="01I900000026RAo">Object Creation Request</option>
                                                    <option value="01I900000026RAq">Object Trigger</option>
                                                    <option value="01I900000026RAp">Object Trigger Rule</option>
                                                    <option value="01I900000026RAr">Pending Synchronization</option>
                                                    <option value="01I900000026RAs">Project</option>
                                                    <option value="01I90000001TSNd">Project</option>
                                                    <option value="01I90000001TSNh">Project Snapshot</option>
                                                    <option value="01I0o0000029SiJ">Recent Channel</option>
                                                    <option value="01I0o0000029SiL">Setup Data</option>
                                                    <option value="01I0o0000029SiN">Slack Auth</option>
                                                    <option value="01I0o0000029SiO">Slack Message</option>
                                                    <option value="01I0o0000029SiV">Subscription</option>
                                                    <option value="01I0o0000029SiQ">Subscription Condition</option>
                                                    <option value="01I0o0000029SiT">Subscription Object</option>
                                                    <option value="01I0o0000029SiU">Subscription Type</option>
                                                    <option value="01I90000001TSNf">Task</option>
                                                    <option value="01I900000026RAt">Task</option>
                                                    <option value="01I90000001TSNg">Time</option>
                                                    <option value="01I90000001U3BJ">User Inbox</option>
                                                    <option value="01I90000001U3BL">VCS_MailBox_Config</option>
                                                    <option value="01I90000001U3BK">VCSEmail</option>
                                                    <option value="WebCartDocument">Web Cart Documents</option>
                                                </select> -->
                                                <a href="javascript:;" @click="handleOpenLookup" id="critfld1_fs" title="查找（新窗口）">
                                                    <img :src="require('@/assets/img/s.gif')" alt="查找（新窗口）" class="lookupIcon" title="查找（新窗口）">
                                                </a>
                                                <template v-if="rules.DomainEnumOrId.isRequired">
                                                    <div class="errorMsg">
                                                        <strong>错误:</strong>
                                                        请指定此关系的另一个对象
                                                    </div>
                                                    &nbsp;
                                                </template>
                                            </div>
                                        </td>
                                        <td class="labelCol last empty">&nbsp;</td>
                                        <td class="labelCol last empty">&nbsp;</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="panleStep">
                        <input class="inpBtn" type="button" value=" 上一页 " @click="handlePrev(0)">
                        <input class="inpBtn ml10" type="button" value=" 下一页 " @click="handleNext(2)">
                        <a-button type="link" @click="handleCancel">取消</a-button>
                    </div>
                </div>
            </div>
            <Lookup-filter v-if="isLookupFilter" :isShow="isLookupFilter" field="MasterEntityId" :entityApiName="entityApiName" lookEntityApiName="entity" :objectTypeCode="100000" @cancel="isLookupFilter=false" @select="handleSelectLook"></Lookup-filter>
            <!-- <LookupFilter v-if="isLookupFilter" entityApiName="entity" entityType="01I" objectTypeCode="100000" :isShow="isLookupFilter" @select="handleSelectLook" @cancel="isLookupFilter=false" /> -->
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
    import LookupFilter from "@/components/commonModal/LookupFilter.vue";
    import { useRouter, useRoute } from "vue-router";
    const route = useRoute();
    const props = defineProps({
        type: [String, Number]
    });
    import { useStore } from "vuex";
    let store = useStore();
    const labelCol = ref({ style: { width: '230px' } });
    const emit = defineEmits(['prev', 'next', 'cancel']);
    const radioStyle = reactive({
        display: 'flex',
        height: '30px',
        lineHeight: '30px',
        width: '30%'
    });
    const FormulaEditor = {};
    const formState = reactive({
        DomainEnumOrId: {
            Name: "",
            Id: ""
        } // 字段标签
    });
    const data = reactive({
        isFormulaShow: false,
        isOperator: false,
        childType: "",
        isLookupFilter: false,
        entityApiName: route.query.sObjectName
    });
    const { isFormulaShow, isOperator, childType, isLookupFilter, entityApiName } = toRefs(data);
    const handleOpreator = () => {
        data.isOperator = !data.isOperator;
    }
    const handleOpenLookup = () => {
        data.isLookupFilter = true;
    };
    const handleSelectLook = (e,name) => {
        formState.DomainEnumOrId = {
            Name: e[name],
            Id: e.id
        };
        rules.DomainEnumOrId.isRequired = false;
        data.isLookupFilter = false;
    }
    onMounted(() => {
        window.addEventListener('click', () => {
            data.isOperator = false;
        })
    });

    
    const handleisShowFormula = () => {
        data.isFormulaShow = !data.isFormulaShow;
    }
    // 必填数据
    const rules = reactive({
        DomainEnumOrId: {
            isRequired: false
        }
    });

    const handleNext = () => {
        console.log("rules", rules);
        if (formState.DomainEnumOrId.Id!='') {
            store.commit('setRecordFormField', {field:'DomainEnumOrId', value: formState.DomainEnumOrId.Id});
            emit("next", 2);
        }else {
            rules.DomainEnumOrId.isRequired = true;
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
                    padding-top: 0;
                    /* padding-right: 100px; */
                    border-bottom: 1px solid #dbdbdb;
                    padding-bottom: 16px;

                    .fieldInp {
                        width: 200px !important;
                    }

                    .fieldText {
                        width: 50% !important;
                    }
                    .pbDescription{
                        border-top: 1px solid #fff;
                        border-bottom: 1px solid #dbdbdb;
                        padding: 10px;
                        color: #333;
                        font-size: 109%;
                        clear: right;
                        font-family: 'Helvetica';
                    }
                    .pbWizardBody{
                        padding: 8px 12px;
                    }
                }
            }
        }
    }

    .strong {
        color: blue;
    }
</style>