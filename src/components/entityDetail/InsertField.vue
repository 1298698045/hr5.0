<template>
    <div>
        <a-modal v-model:open="props.isShow" width="640px" :style="setTop" :maskClosable="false" @cancel="handleCancel" @ok="handleSubmit">
            <template #title>
                <div class="modal_title">
                    插入字段
                 </div>
            </template>
            <div class="modalContainer" ref="modelContentRef">
                <div class="modalCenter">
                    <div class="innerContent">
                        <p id="FieldTreeDialogIdInfo">请选择一个字段，然后单击"插入"。后跟"&gt;"的标签表示还有更多可用字段。</p>
                        <div class="fieldSelectorScrollableArea">
                            <div class="newFieldSelector">
                                <table class="selectWrapper">
                                    <tbody>
                                        <tr class="selectTableRow">
                                            <td>
                                                <select name="FieldTreeSelect0" id="FieldTreeSelect0" size="9" title="插入字段" style="display: inline;" v-model="fieldVal">
                                                    <option :value="item.developerName" v-for="(item, index) in fieldList" :key="index">{{item.label}}</option>
                                                </select>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
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
    import { SearchOutlined, DownOutlined, UserOutlined } from "@ant-design/icons-vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    import { useRouter, useRoute } from "vue-router";
    const route = useRoute();
    const props = defineProps({
        isShow: Boolean
    })
    const emit = defineEmits(['cancel','params']);

    const modelContentRef = ref(null);

    const handleCancel = ()=> {
        emit("cancel", false);
    }
    
    const data = reactive({
        fieldList: [],
        fieldVal: "",
        entityId: route.query.id
    });
    const { fieldList, fieldVal, entityId } = toRefs(data);
    
    
    onMounted(()=>{
        let h = modelContentRef.value.clientHeight;
        data.top = (h + 126) / 2 + 'px';
    })

    const setTop = computed(() => ({
        top: data.top
    }));

    const getFieldList = () => {
        proxy.$get(Interface.objeview.objectmanager, {
            entityId: data.entityId
        }).then(res=>{
            data.fieldList = res.rows;
        })
    };
    getFieldList();

    const handleSubmit = ()=> {
        // console.log("data.fieldVal", data.fieldVal);
        let row = data.fieldList.find(item=>item.developerName==data.fieldVal);
        emit("params", row);
    }
</script>
<style lang="less" scoped>
    @import url('@/style/modal.less');
    .innerContent{
        color: #3c3d3e;
        padding: 12px 16px;
        #FieldTreeDialogIdInfo{
            margin: 8px 0;
        }
        .fieldSelectorScrollableArea{
            border: 1px solid #919191;
            background-color: #fff;
            overflow-x: auto;
            padding: 10px;
            .newFieldSelector{
                white-space: nowrap;
                overflow-x: auto;
                height: 100%;
                td{
                    font-family: Arial, Helvetica, sans-serif;
                    color: #222;
                    select{
                        font-family: 'Arial', 'Helvetica', sans-serif;
                        color: #000;
                    }
                }
            }
        }
    }
</style>