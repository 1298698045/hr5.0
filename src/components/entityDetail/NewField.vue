<template>
    <div class="newFieldWrap">
        <div class="bPageTitle">
            <div class="ptBody">
                <div class="content">
                    <!-- <img :src="require('@/assets/img/s.gif')" alt="" class="pageTitleIcon" title=""> -->
                    <h1 class="pageType">客户<span class="titleSeparatingColon">:</span></h1>
                    <h2 class="pageDescription"> 新建自定义字段</h2>
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
        <div class="NewField" v-show="stepCurrent==0">
            <div>
                <div class="panelStepBox">
                    <div class="panelStepTitle">
                        <span>
                            步骤 1
                        </span>
                        <span>
                            步骤 1. 选择字段类型
                        </span>
                    </div>
                    <div class="panelStepBoxBd">
                        <div class="panleStep">
                            <!-- <a-button @click="handleNext(1)">下一页</a-button> -->
                            <input class="inpBtn" type="button" value=" 下一页 " @click="handleNext(2)">
                            <input value=" 取消 " class="inpBtnCancel" name="cancel" title="取消" type="submit" @click="handleCancel">
                        </div>
                        <div class="panelDesc">
                            指定自定义字段将要包含的信息类型。
                        </div>
                        <a-radio-group v-model:value="type" style="width: 100%;" @change="changeType">
                            <div class="radioGroup">
                                <div class="radioRow">
                                    <a-radio :style="radioStyle" value="NoneSelected">未选取任何内容</a-radio>
                                    <div class="radioDesc">请选择以下数据类型之一。</div>
                                </div>
                            </div>
                            <div class="radioGroup">
                                <div class="radioRow">
                                    <a-radio :style="radioStyle" value="Z">公式</a-radio>
                                    <div class="radioDesc">根据您定义的公
                                        
                                        式表达式派生其值的只读字段。任何来源字段有所更改，该公式字段均将更新。</div>
                                </div>
                                <div class="radioRow">
                                    <a-radio :style="radioStyle" :value="1">累计汇总</a-radio>
                                    <div class="radioDesc">在相关列表中显示字段的汇总值、最小值或最大值的只读字段，或在相关列表中列出的所有记录的记录数。</div>
                                </div>
                                <div class="radioRow">
                                    <a-radio :style="radioStyle" value="V">自动编号</a-radio>
                                    <div class="radioDesc">系统使用您定义的显示格式生成的序列编号。该编号对于每条新记录会自动递增。</div>
                                </div>
                            </div>
                            <div class="radioGroup">
                                <div class="radioRow">
                                    <a-radio :style="radioStyle" value="Y">查找关系</a-radio>
                                    <div class="radioDesc">创建一个将此对象链接到另一对象的关系。关系字段允许用户单击查找图标，以从弹出列表中选择值。另一对象是列表中值的源。</div>
                                </div>
                                <div class="radioRow">
                                    <a-radio :style="radioStyle" value="x">外部查找关系</a-radio>
                                    <div class="radioDesc">创建一种关系，将此对象链接到在外部数据源中存储数据的外部对象。</div>
                                </div>
                                <div class="radioRow">
                                    <a-radio :style="radioStyle" value="Y_MD">主-详细信息关系</a-radio>
                                    <div class="radioDesc">
                                        创建一个此对象（子级或"详细信息"）与另一对象（父级或"主"）之间的特殊父子关系类型，其中：
                                        <p>所有详细信息记录的关系字段必填。<br/>
                                            详细信息记录的所有权和共享由主记录确定。<br/>
                                            当用户删除主记录时，将删除所有详细信息记录。<br/>
                                            您可以在主记录上创建累计汇总字段以汇总详细信息记录。</p>
                                        <p>关系字段允许用户单击查找图标，以从弹出列表中选择值。主对象是列表中值的源。</p>
                                    </div>
                                </div>
                            </div>
                            <div class="radioGroup">
                                <div class="radioRow">
                                    <a-radio :style="radioStyle" value="U">用户（查找关系）</a-radio>
                                    <div class="radioDesc">	创建用户字段。关系字段允许用户单击查找图标，以从弹出列表中选择用户。</div>
                                </div>
                                <div class="radioRow">
                                    <a-radio :style="radioStyle" value="M_U">用户多选</a-radio>
                                    <div class="radioDesc">创建多选用户字段。可以选择多个用户保存。</div>
                                </div>
                                <div class="radioRow">
                                    <a-radio :style="radioStyle" value="O">部门（查找关系）</a-radio>
                                    <div class="radioDesc">	创建部门字段。关系字段允许用户单击查找图标，以从弹出列表中选择部门。</div>
                                </div>
                                <div class="radioRow">
                                    <a-radio :style="radioStyle" value="M_O">部门（多选择）</a-radio>
                                    <div class="radioDesc">	可以选择多个部门的字段。</div>
                                </div>
                            </div>
                            <div class="radioGroup">
                                <div class="radioRow">
                                    <a-radio :style="radioStyle" value="S">文本</a-radio>
                                    <div class="radioDesc">	允许用户输入任何字母和数字组合。</div>
                                </div>
                                <div class="radioRow">
                                    <a-radio :style="radioStyle" value="X">文本区</a-radio>
                                    <div class="radioDesc">允许用户输入多行文本，最多可输入 255 个字符。</div>
                                </div>
                                <div class="radioRow">
                                    <a-radio :style="radioStyle" value="J">文本区（长）</a-radio>
                                    <div class="radioDesc">	允许用户输入多行文本，最多可输入 131,072 个字符。</div>
                                </div>
                                <div class="radioRow">
                                    <a-radio :style="radioStyle" value="D">日期</a-radio>
                                    <div class="radioDesc">	允许用户输入日期或从弹出式日历中选择日期。</div>
                                </div>
            
                                <div class="radioRow">
                                    <a-radio :style="radioStyle" value="F">日期/时间</a-radio>
                                    <div class="radioDesc">允许用户输入日期和时间，或从弹出式日历中选择日期。当用户单击弹出式日历中的某个日期后，该日期和当前时间将输入到"日期/时间"字段。</div>
                                </div>
                                <div class="radioRow">
                                    <a-radio :style="radioStyle" value="DT_M">日期/时间上下午选择</a-radio>
                                    <div class="radioDesc">	允许用户选择活输入日期和时间上下午选择。</div>
                                </div>
                                <div class="radioRow">
                                    <a-radio :style="radioStyle" value="TP">时间BETA</a-radio>
                                    <div class="radioDesc">允许用户输入时间，或从弹出时间选择器中选择时间。</div>
                                </div>
                                <div class="radioRow">
                                    <a-radio :style="radioStyle" value="Year">年份BETA</a-radio>
                                    <div class="radioDesc">	允许选择年份</div>
                                </div>
                                <div class="radioRow">
                                    <a-radio :style="radioStyle" value="Month">月份BETA</a-radio>
                                    <div class="radioDesc">	允许选择月份</div>
                                </div>
                                <div class="radioRow">
                                    <a-radio :style="radioStyle" value="Y_M">年-月BETA</a-radio>
                                    <div class="radioDesc">	允许用户选中 年-月，如2020-12</div>
                                </div>
            
            
                                <div class="radioRow">
                                    <a-radio :style="radioStyle" value="UC">意见</a-radio>
                                    <div class="radioDesc">	允许用户输入多行审批意见，最多可输入 255 个字符。</div>
                                </div>
                                <div class="radioRow">
                                    <a-radio :style="radioStyle" value="UCS">意见附签名</a-radio>
                                    <div class="radioDesc">	允许用户输入多行审批意见，最多可输入 255 个字符。并且自动附上签名。</div>
                                </div>
                                <div class="radioRow">
                                    <a-radio :style="radioStyle" value="UCP">意见选择</a-radio>
                                    <div class="radioDesc">	选择意见并且允许用户输入多行审批意见，最多可输入 255 个字符，保存结果不带签名、时间、部门、姓名。</div>
                                </div>
                                <div class="radioRow">
                                    <a-radio :style="radioStyle" value="US">签名</a-radio>
                                    <div class="radioDesc">	允许用户仅仅选择自己的签名。</div>
                                </div>
            
                                <div class="radioRow">
                                    <a-radio :style="radioStyle" value="CA">CA意见签名</a-radio>
                                    <div class="radioDesc">	集成CA意见签名</div>
                                </div>
                                <div class="radioRow">
                                    <a-radio :style="radioStyle" value="L">选项列表(存数值)</a-radio>
                                    <div class="radioDesc">	允许用户从定义的列表中选择值（下拉方式），如 0 代表女 ，存 0 。</div>
                                </div>
                                <div class="radioRow">
                                    <a-radio :style="radioStyle" value="DT">选项列表(存文字)</a-radio>
                                    <div class="radioDesc">	允许用户从定义的列表中选择值（下拉方式），如 0 代表女 ，存 女。</div>
                                </div>
                                <div class="radioRow">
                                    <a-radio :style="radioStyle" value="MC">选项列表（多项选择 - 勾选）</a-radio>
                                    <div class="radioDesc">	允许用户从定义的列表中勾选多个值。</div>
                                </div>
                                <div class="radioRow">
                                    <a-radio :style="radioStyle" value="RBL">单选按钮列表</a-radio>
                                    <div class="radioDesc">	允许用户从定义的单选按钮列表中，选择一个值（左右铺开方式）。</div>
                                </div>
            
            
                                <div class="radioRow">
                                    <a-radio :style="radioStyle" value="Q">选项列表（多项选择 左右选）</a-radio>
                                    <div class="radioDesc">	允许用户从定义的列表中选择多个值，选择方式是左右选择。</div>
                                </div>
                                <div class="radioRow">
                                    <a-radio :style="radioStyle" value="N">数字</a-radio>
                                    <div class="radioDesc">	允许用户输入任何数字。将删除前置零。</div>
                                </div>
                                <div class="radioRow">
                                    <a-radio :style="radioStyle" value="P">百分比</a-radio>
                                    <div class="radioDesc">	允许用户输入百分比数字（例如，"10"），并自动向数字添加百分号。</div>
                                </div>
            
            
                                <div class="radioRow">
                                    <a-radio :style="radioStyle" value="C">币种</a-radio>
                                    <div class="radioDesc">	允许用户输入美元或其他币种金额，并将字段自动转换为币种金额格式。此功能在将数据导出到 Excel 或其它电子表格时非常有用。</div>
                                </div>
                                <div class="radioRow">
                                    <a-radio :style="radioStyle" value="B">复选框</a-radio>
                                    <div class="radioDesc">	允许用户选择"真"（选取）或"假"（不选取）值。</div>
                                </div>
                                <div class="radioRow">
                                    <a-radio :style="radioStyle" value="g">地理定位</a-radio>
                                    <div class="radioDesc">	允许用户定义位置。包括精度和纬度组件，可用于计算距离。</div>
                                </div>
                                <div class="radioRow">
                                    <a-radio :style="radioStyle" value="I">图片上传与选择</a-radio>
                                    <div class="radioDesc">	允许用户上传图片并且选择系统图片。</div>
                                </div>
                                <div class="radioRow">
                                    <a-radio :style="radioStyle" value="ColorPicker">颜色选择器</a-radio>
                                    <div class="radioDesc">	颜色选择器。</div>
                                </div>
            
                                <div class="radioRow">
                                    <a-radio :style="radioStyle" value="H">电话</a-radio>
                                    <div class="radioDesc">	允许用户输入任何电话号码。自动将其转换为电话号码格式。</div>
                                </div>
                                <div class="radioRow">
                                    <a-radio :style="radioStyle" value="E">电子邮件</a-radio>
                                    <div class="radioDesc">	允许用户输入电子邮件地址，对其进行验证以确保格式正确。如果对于一个联系人和潜在客户指定了此字段，则用户单击“发送电子邮件”时可以选择地址。注意，自定义电子邮件地址无法用于批量电子邮件。</div>
                                </div>
                                <div class="radioRow">
                                    <a-radio :style="radioStyle" value="U">URL</a-radio>
                                    <div class="radioDesc">	允许用户输入任何有效的网址。当用户单击该字段时，该 URL 将在单独的浏览器窗口中打开。</div>
                                </div>
                                <div class="radioRow">
                                    <a-radio :style="radioStyle" value="z">文本区（RTF）</a-radio>
                                    <div class="radioDesc">	允许用户输入格式化文本、添加图片和链接。最多有 131,072 个字符在分开行上。</div>
                                </div>
                                <div class="radioRow">
                                    <a-radio :style="radioStyle" :value="6">加密文本</a-radio>
                                    <div class="radioDesc">	允许用户输入任何字母和数字组合，并将它们以加密格式存储。</div>
                                </div>
                                <div class="radioRow">
                                    <a-radio :style="radioStyle" value="Province">省/市/区县</a-radio>
                                    <div class="radioDesc">	选择省/市/区县。如北京 朝阳，广东省 深圳市 宝安区。</div>
                                </div>
                                <div class="radioRow">
                                    <a-radio :style="radioStyle" value="LT">代码树</a-radio>
                                    <div class="radioDesc">	允许用户从定义的代码树中选择值。</div>
                                </div>
                            </div>
                            <div class="panleStep">
                                <!-- <a-button @click="handleNext(1)">下一页</a-button> -->
                                <input class="inpBtn" type="submit" value=" 下一页 " @click="handleNext(2)">
                                <input value=" 取消 " class="inpBtnCancel" name="cancel" title="取消" type="submit" @click="handleCancel">
                            </div>
                        </a-radio-group>
                    </div>
                </div>
            </div>
        </div>
        <div v-show="stepCurrent==1">
            <NewFieldTwo :fieldDetail="fieldDetail" :type="type" @next="setCurrent" @prev="setCurrent" @cancel="handleCancel" />
        </div>
        <div v-show="stepCurrent==2 && type!='Z'">
            <NewFieldStep2 :fieldDetail="fieldDetail" ref="fieldStep2Ref" :type="type" @next="setCurrent" @prev="setCurrent" @cancel="handleCancel" />
        </div>
        <div v-show="stepCurrent==2 && type=='Z'">
            <ZNewFieldStep3 :fieldDetail="fieldDetail" @next="setCurrent" @prev="setCurrent" @cancel="handleCancel" />
        </div>

        <div v-show="stepCurrent==2.5 && type == 1">
            <LJHZNewFieldStep3 :fieldDetail="fieldDetail" :type="type" @next="setCurrent" @prev="setCurrent" @cancel="handleCancel" />
        </div>

        <div v-show="stepCurrent==3">
            <NewFieldStep3 :fieldDetail="fieldDetail" :type="type" :dataTypeName="dataTypeName" @next="setCurrent" @prev="setCurrent" @cancel="handleCancel" />
        </div>
        
        <div v-show="stepCurrent==4">
            <NewFieldStep4 :fieldDetail="fieldDetail" :type="type" :dataTypeName="dataTypeName" @next="setCurrent" @prev="setCurrent" @cancel="handleCancel" />
        </div>
        <div v-show="stepCurrent==5">
            <NewFieldStep5 :fieldDetail="fieldDetail" :type="type" :dataTypeName="dataTypeName" @next="setCurrent" @prev="setCurrent" @cancel="handleCancel" />
        </div>
    </div>
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
        computed,
        defineProps,
        provide
    } from "vue";
    import { message } from "ant-design-vue";
  import Toast from "@/utils/toast.js";

    import NewFieldTwo from "@/components/entityDetail/newField2/index.vue";

    import NewFieldStep2 from "@/components/entityDetail/NewFieldStep2.vue";
    import NewFieldStep3 from "@/components/entityDetail/NewFieldStep3.vue";
    // 累计汇总第三步
    import LJHZNewFieldStep3 from "@/components/entityDetail/LJHZNewFieldStep3.vue";

    import NewFieldStep4 from "@/components/entityDetail/NewFieldStep4.vue";
    import NewFieldStep5 from "@/components/entityDetail/NewFieldStep5.vue";
    // import Ztype from "@/components/entityDetail/newField2/Ztype.vue";
    // import Ytype from "@/components/entityDetail/newField2/Ytype.vue";
    import ZNewFieldStep3 from "@/components/entityDetail/ZNewFieldStep3.vue";

    import { ObjTypeDataDict } from "@/utils/objTypeDataDict.js";

    import Interface from "@/utils/Interface.js";
    import { useRouter, useRoute } from "vue-router";
    const route = useRoute();
    const { proxy } = getCurrentInstance();

    import { useStore } from "vuex";
    let store = useStore();
    const emit = defineEmits(['cancel']);
    const fieldStep2Ref = ref(null);
    const radioStyle = reactive({
        display: 'flex',
        height: '30px',
        lineHeight: '30px',
        width: '30%'
    });
    const props = defineProps({
        editFieldId: String
    });
    console.log("props", props.editFieldId);
    provide("editFieldId", props.editFieldId);


    const data = reactive({
        step: 5,
        stepCurrent: 0,
        type: "NoneSelected",
        fieldDetail: {}, // 编辑字段详情
    });
    const { step, stepCurrent, type, fieldDetail } = toRefs(data);

    const dataTypeName = computed(()=>{
        let name = ObjTypeDataDict[data.type] || '无';
        return name;
    })

    const getFieldDetail = () => {
        proxy.$get(Interface.objeview.field.detail, {
            attributeId: props.editFieldId
        }).then(res=>{
            data.fieldDetail = res.actions[0].returnValue;
            console.log("data.fieldDetail", data.fieldDetail);
            data.type = data.fieldDetail.dtype;
        })
    }

    if(props.editFieldId){
        getFieldDetail();
    }

    

    const handleNext = (current) => {
        if(data.type == 'Y' || data.type == 'x' || data.type == 'Z' || data.type == 'Y_MD'){
            data.stepCurrent = 1;
        }else {
            if(current==2 && fieldStep2Ref && fieldStep2Ref.value!=null){
                fieldStep2Ref.value.loadTypeFn();
            }
            if(data.type=='NoneSelected' || data.type == ''){
                Toast("错误: 必须选择一个数据类型");
            } else{
                data.stepCurrent = current;
            }
        }
    };
    const setCurrent = (current) => {
        if(current==2){
            if(current==2 && fieldStep2Ref && fieldStep2Ref.value!=null){
                fieldStep2Ref.value.loadTypeFn();
            }
        }
        data.stepCurrent = current;
    };
    const handlePrev = (current) => {
        data.stepCurrent = current;
    }
    const handleCancel = () => {
        store.commit("clearRecordForm", {});
        emit("cancel", false);
    }

    const changeType = () => {
        store.commit('setRecordFormField', {field: 'dtype',  value: data.type});
        console.log("store", store.state);
    }
</script>
<style lang="less" scoped>
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
                    font-size: 13px;
                    font-weight: bold;
                    color: #4a4a56;
                    padding-left: 2px;
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
    .newFieldWrap{
        height: 100%;
        overflow-y: auto;
        padding: 0 12px;
    }
    .NewField{
        .head{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            .title{
                font-size: 20px;
                font-weight: normal;
                padding: 15px 12px 0;
            }
            a{
                padding-right: 5px;
            }
            img{
                vertical-align: top;
            }
        }
        .panelStepBox{
            .panelStepTitle{
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
            .panelStepBoxBd{
                background: #f8f8f8 none;
                border: 1px solid #eaeaea;
                border-bottom-right-radius: 5px;
                border-bottom-left-radius: 5px;
                .panleStep{
                    display: flex;
                    justify-content: flex-end;
                    padding: 10px 10px;
                    border-bottom: 1px solid #dbdbdb;
                }
                .panelDesc{
                    padding: 10px;
                    border-top: 1px solid #fff;
                    border-bottom: 1px solid #dbdbdb;
                }
                .radioGroup{
                    border-bottom: 1px solid #dbdbdb;
                    padding: 10px 20px;
                    .radioRow{
                        display: flex;
                        align-items: self-start;
                        .radioDesc{
                            flex: 1;
                            line-height: 30px;
                            font-size: 14px;
                        }
                    }
                }
            }
        }
    }
</style>