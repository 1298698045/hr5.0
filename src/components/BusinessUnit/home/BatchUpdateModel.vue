<template>
    <div>
        <a-modal v-model:open="props.isShow" width="800px" :style="setTop" :maskClosable="false" @cancel="handleCancel" @ok="handleSubmit">
            <template #title>
                <div>
                    批量编辑
                 </div>
            </template>
            <div class="modalContainer" ref="modelContentRef">
                <div class="modalCenter" style="height: auto;">
                    <ul class="filterSearch">
                        <li class="row" v-for="(item,index) in list" :key="index">
                            <div class="fieldCol">
                                <span class="required">*</span>
                                <span class="label">选择字段</span>
                                <a-select
                                    v-model:value="item.name"
                                    style="width: 300px;display: block;"
                                    @change="handleChange"
                                    placeholder="请选择"
                                    >
                                    <a-select-option :value="item.name" v-for="(item,index) in listData" :key="index">{{item.title}}</a-select-option>
                                </a-select>
                            </div>
                            <div class="fieldCol">
                                <span class="required">*</span>
                                <span class="label">填写值</span>
                                <a-input v-model:value="item.value" placeholder="请输入" style="width: 300px;display: block;"></a-input>
                            </div>
                            <div class="fieldCol">
                                <span class="iconDel" @click="handleDelteField(item,index)">
                                    <DeleteOutlined />
                                </span>
                            </div>
                        </li>
                        <a-button type="link" @click="handleAddRowField">添加行</a-button>
                    </ul>
                </div>
            </div>
            <template #footer>
                <div>
                    <a-button @click="handleCancel">取消</a-button>
                    <a-button type="primary" @click.prevent="handleSubmit">保存</a-button>
                </div>
            </template>
        </a-modal>
    </div>
</template>
<script setup>
    import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, defineProps,defineExpose,
        defineEmits, computed } from "vue";
    import { SearchOutlined, DeleteOutlined, UpOutlined, DownOutlined } from "@ant-design/icons-vue";
    import { message } from "ant-design-vue";
  import Toast from "@/utils/toast.js";
    import Interface from "@/utils/Interface.js";
    
    const { proxy } = getCurrentInstance();
    const labelCol = ref({ style: { width: '100px' } });
    const props = defineProps({
        isShow: Boolean,
        sObjectName:String,
        ids:String
    })
    const emit = defineEmits(['cancel','load']);
    const modelContentRef = ref(null);
    
    const handleCancel = ()=> {
        emit("cancel", false);
    }
    const handleSubmit = ()=> {
            let fields={IsTrackingHistory: 0};
            if(data.list&&data.list.length){}else{
                Toast("请至少添加一行数据");
                return false
            }
            data.list.map(item=>{
                if(item.name){
                    fields[item.name]=item.value;
                }
            });
            let ids=props.ids.split(',');
            setTimeout(function(){
                ids.map((item,index)=>{
                    if(index==ids.length-1){
                        saveid(item,fields,true);
                    }
                    else{
                        saveid(item,fields,false);
                    }
                });
            },200)
    }
    const saveid =(rid,fields,isend)=>{
            let url='Interface.create';
            let d = {
                actions:[{
                    id: "2919;a",
                    descriptor: "",
                    callingDescriptor: "UNKNOWN",
                    params: {
                        recordInput: {
                            allowSaveOnDuplicate: false,
                            apiName: props.sObjectName,
                            objTypeCode: '',
                            fields: fields
                        }              
                    }
                }]
            };
            if(rid){
                d.actions[0].params.recordInput.Id=rid;
                d.actions[0].params.recordId=rid;
                url='Interface.edit';
            }
            let obj = {
                message: JSON.stringify(d)
            }
            proxy.$post(url,obj).then(res=>{
                if(isend==true){
                    message.warning("保存成功！");
                    emit("load", false);
                    setTimeout(function(){
                        emit("cancel", false);
                    },1000)
                }
            });
    }
    const data = reactive({
        listData: [],
        list:[
            {
                label:'',
                name: "",
                value: ""
            }
        ],
        top: ""
    })
    const { listData, list, top } = toRefs(data);
    const formState = reactive({
        name: "",
        apiname: "",
        resource: "",
        role: []
    })
    const handleChange = (nextTargetKeys, direction, moveKeys) => {
        
    };

    const getQuery = ()=> {
        let d={
            entityApiName:props.sObjectName
        }
        proxy.$get(Interface.entityFilter,d).then(res=>{
            console.log('entityFilter',res);
            let attributes = res.attributes.map(item=>{
                item.title = item.label + item.name;
                item.key = item.name;
                return item;
            });
            data.listData = attributes;
        })
    }
    const handleAddRowField = () => {
        data.list.push(
            {
                label:'',
                name: "",
                value: ""
            }
        )
    }
    const handleDelteField = (item,index) => {
        data.list.splice(index,1);
    }
    getQuery();
    onMounted(()=>{
        let h = modelContentRef.value.clientHeight;
        data.top = (h + 126-186) / 2 + 'px';
    })
    const setTop = computed(() => ({
        top: data.top
    }));
</script>
<style lang="less">
    @import url('@/style/modal.less');
    :where(.css-dev-only-do-not-override-kqecok).ant-transfer{
        justify-content: center;
    }
    .filterSearch{
        padding-top: 1px;
        margin: 10px auto;
        .row{
            display: flex;
            margin-top: 10px;
            align-items: center;
            justify-content: center;
            .fieldCol{
                margin-left: 20px;
                .label{
                    padding: 0 10px 0 5px;
                }
                .iconDel{
                    font-size: 16px;
                    cursor: pointer;
                }
                .iconDel:hover{
                    color: var(--hoverColor);
                }
            }
            .fieldCol:first-child{
                margin-left: 0;
            }
        }
        .ant-btn{
            margin-top: 20px;
            margin-left: 60px;
        }
    }
    .selectBox{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .sortBox{
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        gap: 5px;
    }
    :where(.css-dev-only-do-not-override-kqecok).ant-btn.ant-btn-sm{
        font-size: 12px !important;
        padding: 0px 5px !important;
    }
    .modalCenter .filterSearch .row .fieldCol .iconDel{
        position: relative;
        top: 10px;
    }
    
</style>