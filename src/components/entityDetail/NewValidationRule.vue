<template>
    <div class="newObjWrap">
        <div class="newObjHead">
            <div class="subject">订单 验证规则</div>
            <div class="help">
                <a href="javascript:;">此页面的帮助</a>
            </div>
        </div>
        <div class="desc">
            通过指定错误条件和相应错误消息，定义验证规则。错误条件编写成布尔公式（expression），返回"真"或"假"。如果公式（expression）返回"真"，中止保存并显示错误消息。用户可以更正错误，然后重试。
            验证规则编辑
        </div>
        <div class="objPanelPage">
            <div class="objPanelHead">
                <div class="panelHeadTitle">
                    验证规则编辑
                </div>
                <div class="panelHeadButtons">
                    <!-- <a-button @click="handleSave">保存</a-button>
                    <a-button class="ml10" @click="handleSaveAndNew">保存并新建</a-button>
                    <a-button class="ml10" @click="handleCancel">取消</a-button> -->
                    <input class="inpBtn" type="button" value="保存" @click="handleSave">
                    <input class="inpBtn ml10" type="button" value="保存并新建" @click="handleSaveAndNew">
                    <input class="inpBtn ml10" type="button" value="取消" @click="handleCancel">

                </div>
            </div>
            <!-- <div class="objSubHead">
                <div class="label">自定义对象信息</div>
                <div class="requiredText">
                    <span class="require">* = </span>
                    必填信息
                </div>
            </div> -->
            <a-form :model="formState" :label-col="labelCol" ref="formRef">
                <div class="objSubsection">
                    <div class="detailList">
                        <div class="detailForm">
                            <!-- <div class="detailRow">单数和复数标签用于选项卡、页面布局和报表中。</div> -->
                            <a-form-item label="规则名" name="Name" :rules="[{ required: true, message: '请输入规则名!' }]">
                                <a-input class="fieldInp" v-model:value="formState.Name"></a-input>
                            </a-form-item>
                            <a-form-item label="启用" name="Active">
                                <a-checkbox v-model:checked="formState.Active"></a-checkbox>
                            </a-form-item>
                            <a-form-item label="描述" name="Description">
                                <a-textarea class="fieldText" :rows="4"
                                    v-model:value="formState.Description"></a-textarea>
                            </a-form-item>
                        </div>
                    </div>
                </div>
                <div class="objSubHead">
                    <div class="label">错误条件公式</div>
                </div>
                <div class="objSubsection">
                    <div class="detailRow">
                        <span class="exampleTitle">示例：</span>
                        <span class="example">Discount_Percent__c&gt;0.30</span>
                    </div>
                    <div class="detailRow">
                        如果“折扣”大于 30%，则显示错误
                    </div>
                    <div class="detailRow">如果公式结果为真，则显示"错误消息"区中定义的文本</div>
                    <div class="formulaBox">
                        <div class="leftFormula">
                            <div class="formulaHead">
                                <a-button>插入字段</a-button>
                                <a-dropdown class="ml10">
                                    <a class="ant-dropdown-link" @click.prevent>
                                        <a-button>插入运算符</a-button>
                                    </a>
                                    <template #overlay>
                                        <a-menu>
                                            <a-menu-item v-for="(item, index) in operatorList" :key="index"
                                                @click="handleMenuOpeator(item)">
                                                <a href="javascript:;">{{ item.name }}</a>
                                            </a-menu-item>
                                        </a-menu>
                                    </template>
                                </a-dropdown>
                            </div>
                            <div class="formula">
                                <a-form-item name="ValidationFormula" :rules="[{ required: true, message: '请输入运算符!' }]">
                                    <a-textarea v-model:value="formState.ValidationFormula" class="FormulaText"
                                        cols="80" id="ValidationFormula" maxlength="3900" name="ValidationFormula"
                                        onkeyup="saveSelection(this)" onmouseup="saveSelection(this)" rows="20"
                                        style="width: 500px; height: 140px;" tabindex="4" type="text"
                                        wrap="soft"></a-textarea>
                                </a-form-item>
                            </div>
                            <a-button>检查语法</a-button>
                        </div>
                        <div class="rightFun">
                            <div class="label">函数</div>
                            <a-select style="width: 100%;">
                                <a-select-option value="DateTime">日期和时间</a-select-option>
                                <a-select-option value="Logical">逻辑</a-select-option>
                                <a-select-option value="Math">数学</a-select-option>
                                <a-select-option value="Text">文本</a-select-option>
                                <a-select-option value="Advanced">高级</a-select-option>
                            </a-select>
                            <div class="funBox">
                                <div class="itemFun" :class="{'active':selectFun==item}" v-for="(item,index) in funList"
                                    :key="index" @click="handleSlectFun(item, index)">{{ item }}</div>
                            </div>
                            <a-button @click="handleInsertFun">插入所选函数</a-button>
                            <div>ADDMONTHS(date,num)
                                如果日期是当月最后一天或添加的 num 月天数较少，使用当月最后一个日期，将 num 月添加到日期。</div>
                            <a-button type="link">有关此函数的帮助</a-button>
                        </div>
                    </div>
                </div>
                <div class="objSubHead">
                    <div class="label">错误消息</div>
                </div>
                <div class="objSubsection">
                    <div class="detailRow">
                        <span class="exampleTitle">示例：</span>
                        <span class="example">折扣百分比不能超过 30%</span>
                    </div>
                    <div class="detailRow">
                        此消息将在"错误条件"公式为真时显示
                    </div>
                    <div class="detailList">
                        <div class="detailForm">
                            <a-form-item label="错误消息" name="ValidationMessage"
                                :rules="[{ required: true, message: '请输入错误消息!' }]">
                                <a-textarea class="fieldText" :rows="4"
                                    v-model:value="formState.ValidationMessage"></a-textarea>
                            </a-form-item>
                        </div>
                        <div class="detailRow">
                            该错误消息可出现在页首或页中某一特定字段的下面
                        </div>
                        <div class="detailForm">
                            <a-form-item label="错误位置" name="ErrorLocal" :rules="[{ required: true, message: '请选择错误位置!' }]">
                                <a-radio-group v-model:value="formState.ErrorLocal">
                                    <!-- 'TOP_OF_PAGE' -->
                                    <a-radio value="1">页首</a-radio>
                                    <a-radio value="2">字段</a-radio>
                                </a-radio-group>
                                <a-select style="width: 150px;" v-model:value="formState.ErrorLocation" v-if="formState.ErrorLocal==2">
                                    <a-select-option value="Opportunity" selected="selected">业务机会</a-select-option>
                                    <a-select-option value="Pricebook2">价格手册</a-select-option>
                                    <a-select-option value="CompanyAuthorizedBy">公司授权人</a-select-option>
                                    <a-select-option value="CompanyAuthorizedDate">公司授权日期</a-select-option>
                                    <a-select-option value="IsReductionOrder">减购订单</a-select-option>
                                    <a-select-option value="OriginalOrder">原始订单</a-select-option>
                                    <a-select-option value="ContractName">合同名</a-select-option>
                                    <a-select-option value="ContractEndDate">合同结束日期</a-select-option>
                                    <a-select-option value="Contract">合同编号</a-select-option>
                                    <a-select-option value="ActivatedBy">启用人</a-select-option>
                                    <a-select-option value="ActivatedDate">启用日期</a-select-option>
                                    <a-select-option value="Account">客户名</a-select-option>
                                    <a-select-option value="CustomerAuthorizedBy">客户授权人</a-select-option>
                                    <a-select-option value="CustomerAuthorizedDate">客户授权日期</a-select-option>
                                    <a-select-option value="AccountNumber">客户编号</a-select-option>
                                    <a-select-option value="BillingCountry">帐单国家/地区</a-select-option>
                                    <a-select-option value="BillingCity">帐单城市</a-select-option>
                                    <a-select-option value="BillingState">帐单州/省</a-select-option>
                                    <a-select-option value="BillingLatitude">帐单纬度</a-select-option>
                                    <a-select-option value="BillingLongitude">帐单经度</a-select-option>
                                    <a-select-option value="BillingStreet">帐单街道</a-select-option>
                                    <a-select-option value="BillingPostalCode">帐单邮政编码</a-select-option>
                                    <a-select-option value="BillToContact">开单对象联系人</a-select-option>
                                    <a-select-option value="Quote">报价</a-select-option>
                                    <a-select-option value="ShipToContact">收货方联系人</a-select-option>
                                    <a-select-option value="Status">状态</a-select-option>
                                    <a-select-option value="OrderReferenceNumber">订单参考编号</a-select-option>
                                    <a-select-option value="Name">订单名</a-select-option>
                                    <a-select-option value="EffectiveDate">订单开始日期</a-select-option>
                                    <a-select-option value="Owner">订单所有人</a-select-option>
                                    <a-select-option value="PoDate">订单日期</a-select-option>
                                    <a-select-option value="Type">订单类型</a-select-option>
                                    <a-select-option value="EndDate">订单结束日期</a-select-option>
                                    <a-select-option value="PoNumber">订单编号</a-select-option>
                                    <a-select-option value="TotalAmount">订单金额</a-select-option>
                                    <a-select-option value="Description">说明</a-select-option>
                                    <a-select-option value="ShippingCountry">邮寄国家/地区</a-select-option>
                                    <a-select-option value="ShippingCity">邮寄城市</a-select-option>
                                    <a-select-option value="ShippingState">邮寄州/省</a-select-option>
                                    <a-select-option value="ShippingLatitude">邮寄纬度</a-select-option>
                                    <a-select-option value="ShippingLongitude">邮寄经度</a-select-option>
                                    <a-select-option value="ShippingStreet">邮寄街道</a-select-option>
                                    <a-select-option value="ShippingPostalCode">邮寄邮政编码</a-select-option>
                                    <a-select-option value="BillingGeocodeAccuracy">Billing Geocode Accuracy</a-select-option>
                                    <a-select-option value="ShippingGeocodeAccuracy">Shipping Geocode Accuracy
                                    </a-select-option>
                                </a-select>
                            </a-form-item>
                        </div>
                    </div>
                </div>
            </a-form>
            <div class="objPanelBottom">
                <div class="panelHeadTitle">
                    &nbsp;
                </div>
                <div class="panelHeadButtons">
                    <input class="inpBtn" type="button" value="保存" @click="handleSave">
                    <input class="inpBtn ml10" type="button" value="保存并新建" @click="handleSaveAndNew">
                    <input class="inpBtn ml10" type="button" value="取消" @click="handleCancel">
                </div>
            </div>
        </div>
        <categoryModal v-if="isCategory" :isShow="isCategory" @cancel="isCategory=false" @selectVal="handleSelectVal" />
    </div>
</template>
<script setup>
    import {
        UnorderedListOutlined,
        DownOutlined,
        CaretDownOutlined,
        UserOutlined,
        SearchOutlined
    } from "@ant-design/icons-vue";
    import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, defineEmits, defineProps } from "vue";
    import Interface from "@/utils/Interface.js";
    import Dtable from "@/components/Dtable.vue";
    import ListFormSearch from "@/components/ListFormSearch.vue";
    const { proxy } = getCurrentInstance();
    import { message } from "ant-design-vue";
  import Toast from "@/utils/toast.js";
    import { useRouter, useRoute } from "vue-router";
    const router = useRouter();
    const labelCol = ref({ style: { width: 'auto' } });
    const props = defineProps({
       id: String 
    });
    const radioStyle = reactive({
        display: 'flex',
        height: '30px',
        lineHeight: '30px',
    });
    import categoryModal from "@/components/commonModal/CategoryModal.vue";
    const formRef = ref(null);
    const emit = defineEmits(['cancel']);
    let data = reactive({
        funList: [
            'ABS', 'ACOS', 'ADDMONTHS', 'AND', 'ASCII', 'ASIN', 'ATAN',
            'ATAN2', 'BEGINS', 'BLANKVALUE', 'BR', 'CASE', 'CASESAFEID', 'CEILING',
            'CHR', 'CONTAINS', 'COS', 'CURRENCYRATE', 'DATE', 'DATETIMEVALUE', 'DATEVALUE',
            'DAY', 'DAYOFYEAR', 'DISTANCE', 'EXP', 'FIND', 'FLOOR', 'FORMATDURATION',
            'FROMUNIXTIME', 'GEOLOCATION', 'GETSESSIONID', 'HOUR', 'IF', 'INCLUDES', 'INITCAP',
            'ISBLANK', 'ISCHANGED', 'ISCLONE', 'ISNEW', 'ISNULL', 'ISNUMBER', 'ISOWEEK', 'ISOYEAR',
            'ISPICKVAL', 'LEFT', 'LEN', 'LN', 'LOG', 'LOWER', 'LPAD', 'MAX', 'MCEILING', 'MFLOOR',
            'MID', 'MILLISECOND', 'MIN', 'MINUTE', 'MOD', 'MONTH', 'NOT', 'NOW', 'NULLVALUE',
            'OR', 'PI', 'PICKLISTCOUNT', 'PRIORVALUE', 'REGEX', 'REVERSE', 'RIGHT', 'ROUND', 'RPAD',
            'SECOND', 'SIN', 'SQRT', 'SUBSTITUTE', 'TAN', 'TEXT', 'TIMENOW', 'TIMEVALUE', 'TODAY',
            'TRIM', 'TRUNC', 'UNIXTIMESTAMP', 'UPPER', 'VALUE', 'VLOOKUP', 'WEEKDAY', 'YEAR'
        ],
        selectFun: '',
        operatorList: [
            {
                value: "+",
                name: "加"
            },
            {
                value: "-",
                name: "减"
            },
            {
                value: "*",
                name: "乘"
            },
            {
                value: "/",
                name: "除"
            },
            {
                value: "^",
                name: "乘方"
            },
            {
                value: "(",
                name: "左括号"
            },
            {
                value: ")",
                name: "右括号"
            },
            {
                value: "&amp;",
                name: "串联"
            },
            {
                value: "=",
                name: "等于"
            },
            {
                value: "&lt;&gt;",
                name: "不等于"
            },
            {
                value: "&lt;",
                name: "小于"
            },
            {
                value: "&gt;",
                name: "大于"
            },
            {
                value: "&lt;=",
                name: "小于或等于"
            },
            {
                value: "&gt;=",
                name: "大于或等于"
            },
            {
                value: "&amp;&amp;",
                name: "与"
            },
            {
                value: "||",
                name: "或"
            }
        ]
    });
    const { funList, selectFun, operatorList } = toRefs(data);
    const formState = reactive({
        Name: "",
        Description: "",
        Active: false,
        ValidationFormula: "",
        ValidationMessage: "",
        ErrorLocal: "",
        ErrorLocation: ""
    });
    const getDetail = () => {
        proxy.$get(Interface.objeview.validationRules.detail, {
            objtypecode: 100006,
            id: props.id
        }).then(res=>{
            console.log("res", res);
            let { Name, Active, Description, ValidationFormula, ValidationMessage, ErrorLocation } = res.record;
            formState.Name = Name;
            formState.Description = Description;
            formState.ValidationFormula = ValidationFormula;
            formState.ValidationMessage = ValidationMessage;
            formState.ErrorLocation = ErrorLocation;
        })
    };
    if(props.id){
        getDetail();
    }
    // 保存
    const handleSave = () => {
        formRef.value.validate().then(() => {
            let obj = {
                params: {
                    recordRep: {
                        objTypeCode: 100006,
                        id: props.id || '',
                        fields: {
                            Name: formState.Name,
                            Description: formState.Description,
                            Active: formState.Active,
                            ValidationFormula: formState.ValidationFormula,
                            ValidationMessage: formState.ValidationMessage,
                            ErrorLocation: formState.ErrorLocal == 1 ||  formState.ErrorLocation == '' ? 'TOP_OF_PAGE' : formState.ErrorLocation,
                            EntityId: {
                                Id: "c821cd41-f315-43d1-8fa6-82787b6f06e7"
                            }
                        }
                    }
                }
            }
            let d = {
                message: JSON.stringify(obj)
            }
            proxy.$get(Interface.save, d).then(res=>{
                Toast("保存成功！");
                formRef.value.resetFields();
                emit("cancel", false);
            })
        }).catch((err) => {
            console.log("error", err);
        });
    };
    // 保存并新建
    const handleSaveAndNew = () => {
        formRef.value.validate().then(() => {
            
        }).catch((err) => {
            console.log("error", err);
        });
    };
    // 取消
    const handleCancel = () => {
        emit("cancel", false);
    };
    const handleSelectVal = (e) => {
        console.log("e", e);
        formState.FolderName = e.Name;
        formState.FolderId = e.ID;
        data.isCategory = false;
    };

    const handleOpenCategory = () => {
        data.isCategory = true;
    };
    const handleSlectFun = (item, index) => {
        data.selectFun = item;
    };
    const handleInsertFun = () => {
        formState.ValidationFormula += data.selectFun + ' ';
    };
    const handleMenuOpeator = (item) => {
        formState.ValidationFormula += item.value + ' ';
    };
</script>
<style lang="less" scoped>
    .newObjWrap {
        width: 100%;
        height: 100%;
        overflow-y: auto;
        padding: 16px;

        .newObjHead {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;

            .subject {
                font-size: 24px;
            }

            .help {
                a {
                    text-decoration: none;
                    font-size: 12px;
                    color: #015ba7;
                }
            }
        }

        .desc {
            margin-bottom: 10px;
        }

        .objPanelPage {
            background-color: #f8f8f8;
            border-bottom: 1px solid #eaeaea;
            border-left: 1px solid #eaeaea;
            border-right: 1px solid #eaeaea;
            border-radius: 4px;
            border-top: 3px solid #747e96;
            margin-bottom: 10px;
            font-size: 14px;

            .objPanelHead {
                border-bottom: 1px solid #fff;
                display: flex;
                align-items: center;
                padding: 5px 0;
            }

            .panelHeadTitle {
                width: 30%;
                padding: 5px 12px;
                font-weight: bold;
                font-size: 14px;
            }

            .panelHeadButtons {
                padding: 5px 12px;

                .ant-btn {
                    height: 26px;
                    font-size: 12px;
                    color: #333;
                    font-weight: bold;
                }
            }

            .objSubHead {
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: url("~@/assets/img/opacity75.png");
                padding: 4px 16px;
                background-color: #8e9dbe;

                .label {
                    font-weight: bold;
                }
            }

            .objPanelBottom {
                border-top: 1px solid #dbdbdb;
                margin-top: 20px;
                background-color: transparent;
                display: flex;
            }

            .objSubsection {
                margin-top: 7px;
                padding: 0 12px;

                .detailList {
                    font-size: 12px;

                    .detailForm {
                        .ant-form-item {
                            .ant-form-item-label {
                                width: 18%;
                                display: inline-block;
                            }

                            .fieldInp {
                                width: 200px;
                            }

                            .fieldText {
                                width: 600px;
                            }

                            .formDesc {
                                padding-left: 16px;
                                font-size: 12px;
                                font-weight: bold;
                            }
                        }
                    }
                }
            }
        }

    }

    .require {
        color: red;
    }

    .exampleTitle {
        font-weight: bold;
    }

    .example {
        background-color: rgb(254, 255, 237);
        margin: 8px;
        padding: 2px;
        border: solid 1px;
        line-height: 32px;
        font-size: 12px;
    }

    .formulaBox {
        display: flex;

        .leftFormula {
            width: 35%;
            padding: 16px;

            .formula {
                margin-top: 16px;
            }
        }

        .rightFun {
            width: 200px;
            margin-left: 10px;

            .funBox {
                margin: 10px 0;
                height: 100px;
                border: 1px solid #333;
                border-radius: 4px;
                overflow-y: auto;

                .itemFun {
                    cursor: pointer;

                    &.active {
                        background: #015ba7;
                        color: #fff;
                    }
                }
            }
        }
    }
</style>