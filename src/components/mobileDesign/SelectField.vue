<template>
    <div>
        <a-modal v-model:open="props.isShow" width="800px" :style="setTop" :maskClosable="false" @cancel="handleCancel" @ok="handleSubmit">
            <template #title>
                <div>
                    相关列表属性
                 </div>
            </template>
            <div class="modalContainer" ref="modelContentRef">
                <div class="modalCenter" style="height: auto;">
                    <div class="selectBox">
                        <a-transfer
                            v-model:target-keys="targetKeys"
                            v-model:selected-keys="selectedKeys"
                            :data-source="listData"
                            :list-style="{
                                width: '260px',
                                height: '280px',
                            }"
                            :locale="{itemUnit:'',itemsUnit:'',notFoundContent:'列表为空',searchPlaceholder: '请输入搜索内容'}"
                            show-search
                            :titles="['可用字段', '选取的字段']"
                            :render="item => item.label"
                        />
                        <div class="sortBox">
                            <a-button size="small" @click="selectedKeys.length && handleMoveUp()" :type="selectedKeys.length > 0 ? 'primary' : 'default' "><UpOutlined /></a-button>
                            <a-button size="small" @click="selectedKeys.length && handleMoveDown()" :type="selectedKeys.length > 0 ? 'primary' : 'default' "><DownOutlined /></a-button>
                        </div>
                    </div>
                    <ul class="filterSearch">
                        <li class="row">
                            <div class="fieldCol">
                                <!-- <span class="required">*</span> -->
                                <span class="label">排序字段</span>
                                <a-select
                                    v-model:value="sortField"
                                    style="width: 200px"
                                    >
                                    <a-select-option :value="item.key" v-for="(item,index) in selectedFields" :key="index">{{item.label}}</a-select-option>
                                </a-select>
                            </div>
                            <div class="fieldCol">
                                <!-- <span class="required">*</span> -->
                                <span class="label">排序方式</span>
                                <a-radio-group v-model:value="sort">
                                    <a-radio value="ASC">升序</a-radio>
                                    <a-radio value="DESC">降序</a-radio>
                                </a-radio-group>
                            </div>
                        </li>
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
        recordId:String,
        fields: Array,
        selectedFields: Array,
        relatedSort: String,
        relatedSortField: String
    })
    const emit = defineEmits(['cancel','save']);
    const modelContentRef = ref(null);
    
    const data = reactive({
        listData: [],
        targetKeys: [],
        selectedKeys: [],
        list:[
            {
                label:'',
                name: "",
                sort: ""
            }
        ],
        top: "",
        sort: "",
        sortField: ""
    })
    const { listData, targetKeys, selectedKeys, list, top, sort, sortField } = toRefs(data);
    const formState = reactive({
        name: "",
        apiname: "",
        resource: "",
        role: []
    })
    if(props.fields){
        data.listData = props.fields;
    }
    if(props.selectedFields){
        data.targetKeys = props.selectedFields.map(item=>item.filterColumn);
    }
    if(props.relatedSort){
        data.sort = props.relatedSort;
        data.sortField = props.relatedSortField;
    }

    const handleMoveUp = () => {
        let firstSelectedIndex = data.targetKeys.findIndex(item=>item==data.selectedKeys[0]);
        if(firstSelectedIndex > 0){
            const itemsToMove = data.selectedKeys.slice();
            console.log("itemsToMove", itemsToMove)
            for(const item of itemsToMove){
                const currentIndex = data.targetKeys.indexOf(item);
                data.targetKeys.splice(currentIndex, 1);
                data.targetKeys.splice(currentIndex - 1, 0, item);
            }
        }
    }
    const handleMoveDown = () => {
        const lastSelectedIndex = data.targetKeys.indexOf(data.selectedKeys[data.selectedKeys.length - 1]);
          if (lastSelectedIndex < data.targetKeys.length - 1) {
            const itemsToMove = data.selectedKeys.slice().reverse();
            for (const item of itemsToMove) {
              const currentIndex = data.targetKeys.indexOf(item);
              data.targetKeys.splice(currentIndex, 1);
              data.targetKeys.splice(currentIndex + 1, 0, item);
            }
        }
    }

    const handleAddRowField = () => {
        data.list.push(
            {
                label:'',
                name: "",
                sort: ""
            }
        )
    }
    const handleDelteField = (item,index) => {
        data.list.splice(index,1);
    }
    onMounted(()=>{
        console.log("ininin")
        let h = modelContentRef.value.clientHeight;
        data.top = (h + 126-186) / 2 + 'px';
    })
    const setTop = computed(() => ({
        top: data.top
    }));

    const selectedFields = computed(()=>{
        let list = props.fields.filter(item=>{
            return data.targetKeys.find(row=>{
                return item.key == row;
            })
        });
        return list;
    });

    const handleCancel = ()=> {
        emit("cancel", false);
    }
    const handleSubmit = ()=> {
        console.log("targetKeys", data.targetKeys);
        let list = props.fields.filter(item=>{
            return data.targetKeys.find(row=>{
                return item.filterColumn == row;
            })
        });
        // console.log("list", list);
        list.forEach(item=>{
            delete item.key;
        })
        let params = {
            list: list,
            sortField: data.sortField,
            sort: data.sort
        }
        emit('save', params);
    }
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
</style>