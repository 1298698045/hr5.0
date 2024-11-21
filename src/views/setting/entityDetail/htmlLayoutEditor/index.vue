<template>
    <div class="wrap">
        <div class="header">
            编辑表单 - 123
        </div>
        <div class="center">
            <div class="operation">
                <a-button>预览表单</a-button>
                <span class="label ml10">插入字段</span>
                <a-select class="ml10" v-model:value="field" style="width: 100px;">
                    <a-select-option value="f:5bd69410-898f-4fe1-a820-9c55c35069b3">主题</a-select-option>
                    <a-select-option value="f:9699cd63-2e2b-4a36-9fbf-95b56b30ffe0">事务Id</a-select-option>
                    <a-select-option value="f:0fa1fe60-3ff0-4695-9e2a-0917550fa030">事务类型</a-select-option>
                    <a-select-option value="f:08f76ef3-5670-4d83-90a9-3c9037790bdc">IssueKey</a-select-option>
                    <a-select-option value="f:664b4df7-ac86-4437-9151-4adac342ec1e">紧急程度</a-select-option>
                    <a-select-option value="f:8f097d4c-fca2-4787-8df4-297cb116497c">事务状态</a-select-option>
                    <a-select-option value="f:78e6a5c4-4051-4467-9771-e96a14445c28">显示顺序</a-select-option>
                    <a-select-option value="f:b04ceb02-80f4-4127-8b18-33c836b7cfe8">开始时间</a-select-option>
                    <a-select-option value="f:11327820-7be8-4b4c-92df-69754a809def">到期日期</a-select-option>
                    <a-select-option value="f:89940355-41e8-4ea1-a704-f048f5da9abb">相关类型</a-select-option>
                    <a-select-option value="f:1b3fd51d-6046-40d2-88f5-7b3ed29f8564">相关项</a-select-option>
                    <a-select-option value="f:2c7915db-aef2-40af-baa5-955543e3eeb0">相关项</a-select-option>
                    <a-select-option value="f:6fdca543-cf2d-4216-b5ff-1afaba458892">被分配部门</a-select-option>
                    <a-select-option value="f:289b53a6-4569-49a3-8c93-2d254c189707">留言</a-select-option>
                    <a-select-option value="f:b4c87384-6d95-451d-bcd9-b58a4c9d8a8f">活动类型</a-select-option>
                    <a-select-option value="f:848fc878-edb8-48b4-a640-9a3ec08fd6e9">外出</a-select-option>
                    <a-select-option value="f:7afbe348-4372-4478-a652-a5e9471a519c">父事务</a-select-option>
                    <a-select-option value="f:28a635f5-cb85-4563-bf5a-e7db4fa36902">状态</a-select-option>
                    <a-select-option value="f:6ebf38a7-5480-48e9-83c0-7b3059bd96bf">提醒日期</a-select-option>
                    <a-select-option value="f:43e56c12-a620-4032-8da6-5e66b0406d24">提醒时间</a-select-option>
                    <a-select-option value="f:fef012c1-75f9-43c3-9538-a3da71eb92de">经办人</a-select-option>
                    <a-select-option value="f:c821cd41-f315-43d1-8fa6-82787b6f06e7">位置</a-select-option>
                    <a-select-option value="f:0547416c-5acc-42ff-aa0e-ae103db1d60c">私有</a-select-option>
                    <a-select-option value="f:9856c1a2-269b-4fb6-acc4-97c7a96a58c7">全天事件</a-select-option>
                    <a-select-option value="f:a63740e2-19b2-49be-81de-5570fa6a9958">背景颜色</a-select-option>
                    <a-select-option value="f:649f1932-6ee9-41ac-8c39-34f5c564dab9">组活动</a-select-option>
                    <a-select-option value="f:93068767-dc40-404a-9fc3-3ec61a0a8a44">接受状态</a-select-option>
                    <a-select-option value="f:4640f17e-4b8d-47fa-a436-0790ee24cd1a">日程类型</a-select-option>
                    <a-select-option value="f:6b588f23-b775-433e-934a-7a3b8dae779c">显示状态</a-select-option>
                    <a-select-option value="f:b95b63c8-50ff-4978-bf94-6b850cd23657">周期设置</a-select-option>
                    <a-select-option value="f:52d4a885-5e56-4680-97df-75be4fbefde7">是否周期</a-select-option>
                    <a-select-option value="f:02cf7501-cb1e-4fbc-a281-90d0441be746">定期开始</a-select-option>
                    <a-select-option value="f:ce86a054-6d8c-4049-8636-7f3f514768d9">定期结束</a-select-option>
                    <a-select-option value="f:e9f47198-277f-46ac-bcab-22c43d2a1483">循环系列Id</a-select-option>
                    <a-select-option value="f:ad917a3e-bd26-43aa-9471-cec9ed9fa120">组织</a-select-option>
                    <a-select-option value="f:4ee7e070-eb77-47a0-8eac-c68092d742ce">时间跟踪</a-select-option>
                    <a-select-option value="f:b7ef1031-bc9d-4e7a-aecf-c84bb6789f04">标签</a-select-option>
                    <a-select-option value="f:a693a3c1-e77f-4f02-abd8-88bfe33a5c3e">预估时间</a-select-option>
                    <a-select-option value="f:d9960251-c330-4e6e-b468-0f25dd786e8a">提醒设置</a-select-option>
                    <a-select-option value="f:9814e5a1-62cc-4821-ba57-52126a8fd392">电话</a-select-option>
                    <a-select-option value="t:e8c7c012-4a23-466a-b1a1-914e6452c70a">评论</a-select-option>
                </a-select>
                <a-button class="ml10" @click="handleInsertField">插入</a-button>
                <a-button class="ml10">保存</a-button>
                <a-button class="ml10">取消</a-button>
            </div>
            <div class="editBody" ref="editbdRef">
                <TEditor v-if="isEditor" placeholder="请输入内容" :height="height" ref="editorRef" />
            </div>
        </div>
    </div>
</template>
<script setup>
    import {
        ref,
        watch,
        reactive,
        toRefs,
        onMounted,
        getCurrentInstance,
        onUpdated,
        defineProps,
        defineExpose,
        defineEmits,
        toRaw,
        nextTick
    } from "vue";
    import {
        SearchOutlined,
        DownOutlined,
        UserOutlined,
    } from "@ant-design/icons-vue";
    import { message } from "ant-design-vue";
  import Toast from "@/utils/toast.js";

    import TEditor from "@/components/TEditor.vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    const editbdRef = ref(null);
    const editorRef = ref(null);
    const props = defineProps({
        id: String
    })
    const data = reactive({
        height: '',
        isEditor: false,
        field: ""
    });
    const { height, isEditor, field } = toRefs(data);
    onMounted(()=>{
        window.addEventListener("resize", changeHeight);
        setTimeout(function () {
            window.dispatchEvent(new Event('resize'));
        })
    });
    
    const changeHeight = () => {
        nextTick(()=>{
            data.height = Number(editbdRef.value.clientHeight);
            data.isEditor = true;
        })
    }
    changeHeight();

    const handleInsertField = () => {
        nextTick(()=>{
            editorRef.value.insertContent(`<a class="fieldword">${data.field}</a>&nbsp;`);
        })
    };
</script>
<style lang="less" scoped>
    .wrap {
        .header {
            padding: 8px 16px;
            font-size: 18px;
            font-weight: bold;
            border-bottom: 1px solid #e2e3e5;
        }

        .center {
            padding: 8px 12px;
            height: calc(~"100vh - 41px");
            background: #f8f8f8;
            .operation {
                margin-bottom: 8px;
                background: #ececec;
                padding: 5px 5px 5px 0;
                font-size: 14px;
                display: flex;
                justify-content: flex-end;
                align-items: center;
            }
            .editBody{
                height: calc(~"100% - 58px");
            }
        }
    }
</style>