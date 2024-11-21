<template>
    <div>
        <a-modal v-model:open="props.isShow" width="640px" :style="setTop" :maskClosable="false" @cancel="handleCancel"
            @ok="handleSubmit">
            <template #title>
                <div class="modal_title">
                    选择颜色
                </div>
            </template>
            <div class="modalContainer" ref="modelContentRef">
                <div class="modalCenter" style="padding: 10px !important;">
                    <table>
                        <tbody>
                            <tr>
                                <th style="white-space: nowrap; font-size: 11px;">基本</th>
                                <th style="white-space: nowrap; font-size: 11px;">图表</th>
                            </tr>
                            <tr>
                                <td>
                                    <table cellpadding="1" cellspacing="1">
                                        <tbody>
                                            <tr>
                                                <td bgcolor="#DDDDDD"><a href="javascript:void(0)"
                                                        @click="setcolor('DDDDDD');"><img alt=""
                                                            :src="require('@/assets/img/s.gif')"
                                                            border="0"></a></td>
                                                <td bgcolor="#FF6666"><a href="javascript:void(0)"
                                                        @click="setcolor('FF6666');"><img alt=""
                                                            :src="require('@/assets/img/s.gif')"
                                                            border="0"></a></td>
                                                <td bgcolor="#FF9966"><a href="javascript:void(0)"
                                                        @click="setcolor('FF9966');"><img alt=""
                                                            :src="require('@/assets/img/s.gif')"
                                                            border="0"></a></td>
                                                <td bgcolor="#FFFF66"><a href="javascript:void(0)"
                                                        @click="setcolor('FFFF66');"><img alt=""
                                                            :src="require('@/assets/img/s.gif')"
                                                            border="0"></a></td>
                                                <td bgcolor="#66FF99"><a href="javascript:void(0)"
                                                        @click="setcolor('66FF99');"><img alt=""
                                                            :src="require('@/assets/img/s.gif')"
                                                            border="0"></a></td>
                                                <td bgcolor="#33FFFF"><a href="javascript:void(0)"
                                                        @click="setcolor('33FFFF');"><img alt=""
                                                            :src="require('@/assets/img/s.gif')"
                                                            border="0"></a></td>
                                                <td bgcolor="#66FFFF"><a href="javascript:void(0)"
                                                        @click="setcolor('66FFFF');"><img alt=""
                                                            :src="require('@/assets/img/s.gif')"
                                                            border="0"></a></td>
                                                <td bgcolor="#9999FF"><a href="javascript:void(0)"
                                                        @click="setcolor('9999FF');"><img alt=""
                                                            :src="require('@/assets/img/s.gif')"
                                                            border="0"></a></td>
                                                <td bgcolor="#FF99FF"><a href="javascript:void(0)"
                                                        @click="setcolor('FF99FF');"><img alt=""
                                                            :src="require('@/assets/img/s.gif')"
                                                            border="0"></a></td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#BBBBBB"><a href="javascript:void(0)"
                                                        @click="setcolor('BBBBBB');"><img alt=""
                                                            :src="require('@/assets/img/s.gif')"
                                                            border="0"></a></td>
                                                <td bgcolor="#FF0000"><a href="javascript:void(0)"
                                                        @click="setcolor('FF0000');"><img alt=""
                                                            :src="require('@/assets/img/s.gif')"
                                                            border="0"></a></td>
                                                <td bgcolor="#FF9900"><a href="javascript:void(0)"
                                                        @click="setcolor('FF9900');"><img alt=""
                                                            :src="require('@/assets/img/s.gif')"
                                                            border="0"></a></td>
                                                <td bgcolor="#FFCC66"><a href="javascript:void(0)"
                                                        @click="setcolor('FFCC66');"><img alt=""
                                                            :src="require('@/assets/img/s.gif')"
                                                            border="0"></a></td>
                                                <td bgcolor="#33FF33"><a href="javascript:void(0)"
                                                        @click="setcolor('33FF33');"><img alt=""
                                                            :src="require('@/assets/img/s.gif')"
                                                            border="0"></a></td>
                                                <td bgcolor="#66CCCC"><a href="javascript:void(0)"
                                                        @click="setcolor('66CCCC');"><img alt=""
                                                            :src="require('@/assets/img/s.gif')"
                                                            border="0"></a></td>
                                                <td bgcolor="#33CCFF"><a href="javascript:void(0)"
                                                        @click="setcolor('33CCFF');"><img alt=""
                                                            :src="require('@/assets/img/s.gif')"
                                                            border="0"></a></td>
                                                <td bgcolor="#6666CC"><a href="javascript:void(0)"
                                                        @click="setcolor('6666CC');"><img alt=""
                                                            :src="require('@/assets/img/s.gif')"
                                                            border="0"></a></td>
                                                <td bgcolor="#CC66CC"><a href="javascript:void(0)"
                                                        @click="setcolor('CC66CC');"><img alt=""
                                                            :src="require('@/assets/img/s.gif')"
                                                            border="0"></a></td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#999999"><a href="javascript:void(0)"
                                                        @click="setcolor('999999');"><img alt=""
                                                            :src="require('@/assets/img/s.gif')"
                                                            border="0"></a></td>
                                                <td bgcolor="#CC0000"><a href="javascript:void(0)"
                                                        @click="setcolor('CC0000');"><img alt=""
                                                            :src="require('@/assets/img/s.gif')"
                                                            border="0"></a></td>
                                                <td bgcolor="#FF6600"><a href="javascript:void(0)"
                                                        @click="setcolor('FF6600');"><img alt=""
                                                            :src="require('@/assets/img/s.gif')"
                                                            border="0"></a></td>
                                                <td bgcolor="#FFCC33"><a href="javascript:void(0)"
                                                        @click="setcolor('FFCC33');"><img alt=""
                                                            :src="require('@/assets/img/s.gif')"
                                                            border="0"></a></td>
                                                <td bgcolor="#33CC00"><a href="javascript:void(0)"
                                                        @click="setcolor('33CC00');"><img alt=""
                                                            :src="require('@/assets/img/s.gif')"
                                                            border="0"></a></td>
                                                <td bgcolor="#00CCCC"><a href="javascript:void(0)"
                                                        @click="setcolor('00CCCC');"><img alt=""
                                                            :src="require('@/assets/img/s.gif')"
                                                            border="0"></a></td>
                                                <td bgcolor="#3366FF"><a href="javascript:void(0)"
                                                        @click="setcolor('3366FF');"><img alt=""
                                                            :src="require('@/assets/img/s.gif')"
                                                            border="0"></a></td>
                                                <td bgcolor="#6633FF"><a href="javascript:void(0)"
                                                        @click="setcolor('6633FF');"><img alt=""
                                                            :src="require('@/assets/img/s.gif')"
                                                            border="0"></a></td>
                                                <td bgcolor="#CC33CC"><a href="javascript:void(0)"
                                                        @click="setcolor('CC33CC');"><img alt=""
                                                            :src="require('@/assets/img/s.gif')"
                                                            border="0"></a></td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#666666"><a href="javascript:void(0)"
                                                        @click="setcolor('666666');"><img alt=""
                                                            :src="require('@/assets/img/s.gif')"
                                                            border="0"></a></td>
                                                <td bgcolor="#990000"><a href="javascript:void(0)"
                                                        @click="setcolor('990000');"><img alt=""
                                                            :src="require('@/assets/img/s.gif')"
                                                            border="0"></a></td>
                                                <td bgcolor="#CC6600"><a href="javascript:void(0)"
                                                        @click="setcolor('CC6600');"><img alt=""
                                                            :src="require('@/assets/img/s.gif')"
                                                            border="0"></a></td>
                                                <td bgcolor="#CC9933"><a href="javascript:void(0)"
                                                        @click="setcolor('CC9933');"><img alt=""
                                                            :src="require('@/assets/img/s.gif')"
                                                            border="0"></a></td>
                                                <td bgcolor="#009900"><a href="javascript:void(0)"
                                                        @click="setcolor('009900');"><img alt=""
                                                            :src="require('@/assets/img/s.gif')"
                                                            border="0"></a></td>
                                                <td bgcolor="#339999"><a href="javascript:void(0)"
                                                        @click="setcolor('339999');"><img alt=""
                                                            :src="require('@/assets/img/s.gif')"
                                                            border="0"></a></td>
                                                <td bgcolor="#3333FF"><a href="javascript:void(0)"
                                                        @click="setcolor('3333FF');"><img alt=""
                                                            :src="require('@/assets/img/s.gif')"
                                                            border="0"></a></td>
                                                <td bgcolor="#6600CC"><a href="javascript:void(0)"
                                                        @click="setcolor('6600CC');"><img alt=""
                                                            :src="require('@/assets/img/s.gif')"
                                                            border="0"></a></td>
                                                <td bgcolor="#993399"><a href="javascript:void(0)"
                                                        @click="setcolor('993399');"><img alt=""
                                                            :src="require('@/assets/img/s.gif')"
                                                            border="0"></a></td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#333333"><a href="javascript:void(0)"
                                                        @click="setcolor('333333');"><img alt=""
                                                            :src="require('@/assets/img/s.gif')"
                                                            border="0"></a></td>
                                                <td bgcolor="#660000"><a href="javascript:void(0)"
                                                        @click="setcolor('660000');"><img alt=""
                                                            :src="require('@/assets/img/s.gif')"
                                                            border="0"></a></td>
                                                <td bgcolor="#993300"><a href="javascript:void(0)"
                                                        @click="setcolor('993300');"><img alt=""
                                                            :src="require('@/assets/img/s.gif')"
                                                            border="0"></a></td>
                                                <td bgcolor="#996633"><a href="javascript:void(0)"
                                                        @click="setcolor('996633');"><img alt=""
                                                            :src="require('@/assets/img/s.gif')"
                                                            border="0"></a></td>
                                                <td bgcolor="#006600"><a href="javascript:void(0)"
                                                        @click="setcolor('006600');"><img alt=""
                                                            :src="require('@/assets/img/s.gif')"
                                                            border="0"></a></td>
                                                <td bgcolor="#336666"><a href="javascript:void(0)"
                                                        @click="setcolor('336666');"><img alt=""
                                                            :src="require('@/assets/img/s.gif')"
                                                            border="0"></a></td>
                                                <td bgcolor="#000099"><a href="javascript:void(0)"
                                                        @click="setcolor('000099');"><img alt=""
                                                            :src="require('@/assets/img/s.gif')"
                                                            border="0"></a></td>
                                                <td bgcolor="#333399"><a href="javascript:void(0)"
                                                        @click="setcolor('333399');"><img alt=""
                                                            :src="require('@/assets/img/s.gif')"
                                                            border="0"></a></td>
                                                <td bgcolor="#663366"><a href="javascript:void(0)"
                                                        @click="setcolor('663366');"><img alt=""
                                                            :src="require('@/assets/img/s.gif')"
                                                            border="0"></a></td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#000000"><a href="javascript:void(0)"
                                                        @click="setcolor('000000');"><img alt=""
                                                            :src="require('@/assets/img/s.gif')"
                                                            border="0"></a></td>
                                                <td bgcolor="#330000"><a href="javascript:void(0)"
                                                        @click="setcolor('330000');"><img alt=""
                                                            :src="require('@/assets/img/s.gif')"
                                                            border="0"></a></td>
                                                <td bgcolor="#663300"><a href="javascript:void(0)"
                                                        @click="setcolor('663300');"><img alt=""
                                                            :src="require('@/assets/img/s.gif')"
                                                            border="0"></a></td>
                                                <td bgcolor="#663333"><a href="javascript:void(0)"
                                                        @click="setcolor('663333');"><img alt=""
                                                            :src="require('@/assets/img/s.gif')"
                                                            border="0"></a></td>
                                                <td bgcolor="#003300"><a href="javascript:void(0)"
                                                        @click="setcolor('003300');"><img alt=""
                                                            :src="require('@/assets/img/s.gif')"
                                                            border="0"></a></td>
                                                <td bgcolor="#003333"><a href="javascript:void(0)"
                                                        @click="setcolor('003333');"><img alt=""
                                                            :src="require('@/assets/img/s.gif')"
                                                            border="0"></a></td>
                                                <td bgcolor="#000066"><a href="javascript:void(0)"
                                                        @click="setcolor('000066');"><img alt=""
                                                            :src="require('@/assets/img/s.gif')"
                                                            border="0"></a></td>
                                                <td bgcolor="#330099"><a href="javascript:void(0)"
                                                        @click="setcolor('330099');"><img alt=""
                                                            :src="require('@/assets/img/s.gif')"
                                                            border="0"></a></td>
                                                <td bgcolor="#330033"><a href="javascript:void(0)"
                                                        @click="setcolor('330033');"><img alt=""
                                                            :src="require('@/assets/img/s.gif')"
                                                            border="0"></a></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                                <td>
                                    <table cellpadding="1" cellspacing="1">
                                        <tbody>
                                            <tr>
                                                <td bgcolor="#0B6FCE"><a href="javascript:void(0)"
                                                        @click="setcolor('0B6FCE');"><img alt=""
                                                            :src="require('@/assets/img/s.gif')"
                                                            border="0"></a></td>
                                                <td bgcolor="#78C953"><a href="javascript:void(0)"
                                                        @click="setcolor('78C953');"><img alt=""
                                                            :src="require('@/assets/img/s.gif')"
                                                            border="0"></a></td>
                                                <td bgcolor="#E27001"><a href="javascript:void(0)"
                                                        @click="setcolor('E27001');"><img alt=""
                                                            :src="require('@/assets/img/s.gif')"
                                                            border="0"></a></td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#A845DC"><a href="javascript:void(0)"
                                                        @click="setcolor('A845DC');"><img alt=""
                                                            :src="require('@/assets/img/s.gif')"
                                                            border="0"></a></td>
                                                <td bgcolor="#F3D904"><a href="javascript:void(0)"
                                                        @click="setcolor('F3D904');"><img alt=""
                                                            :src="require('@/assets/img/s.gif')"
                                                            border="0"></a></td>
                                                <td bgcolor="#A53711"><a href="javascript:void(0)"
                                                        @click="setcolor('A53711');"><img alt=""
                                                            :src="require('@/assets/img/s.gif')"
                                                            border="0"></a></td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#66E9BD"><a href="javascript:void(0)"
                                                        @click="setcolor('66E9BD');"><img alt=""
                                                            :src="require('@/assets/img/s.gif')"
                                                            border="0"></a></td>
                                                <td bgcolor="#0B24BE"><a href="javascript:void(0)"
                                                        @click="setcolor('0B24BE');"><img alt=""
                                                            :src="require('@/assets/img/s.gif')"
                                                            border="0"></a></td>
                                                <td bgcolor="#419249"><a href="javascript:void(0)"
                                                        @click="setcolor('419249');"><img alt=""
                                                            :src="require('@/assets/img/s.gif')"
                                                            border="0"></a></td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#B6E32E"><a href="javascript:void(0)"
                                                        @click="setcolor('B6E32E');"><img alt=""
                                                            :src="require('@/assets/img/s.gif')"
                                                            border="0"></a></td>
                                                <td bgcolor="#641CCF"><a href="javascript:void(0)"
                                                        @click="setcolor('641CCF');"><img alt=""
                                                            :src="require('@/assets/img/s.gif')"
                                                            border="0"></a></td>
                                                <td bgcolor="#F96FB7"><a href="javascript:void(0)"
                                                        @click="setcolor('F96FB7');"><img alt=""
                                                            :src="require('@/assets/img/s.gif')"
                                                            border="0"></a></td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#2F5D85"><a href="javascript:void(0)"
                                                        @click="setcolor('2F5D85');"><img alt=""
                                                            :src="require('@/assets/img/s.gif')"
                                                            border="0"></a></td>
                                                <td bgcolor="#AFCADF"><a href="javascript:void(0)"
                                                        @click="setcolor('AFCADF');"><img alt=""
                                                            :src="require('@/assets/img/s.gif')"
                                                            border="0"></a></td>
                                                <td bgcolor="#8F6429"><a href="javascript:void(0)"
                                                        @click="setcolor('8F6429');"><img alt=""
                                                            :src="require('@/assets/img/s.gif')"
                                                            border="0"></a></td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#EFAE73"><a href="javascript:void(0)"
                                                        @click="setcolor('EFAE73');"><img alt=""
                                                            :src="require('@/assets/img/s.gif')"
                                                            border="0"></a></td>
                                                <td bgcolor="#57F17C"><a href="javascript:void(0)"
                                                        @click="setcolor('57F17C');"><img alt=""
                                                            :src="require('@/assets/img/s.gif')"
                                                            border="0"></a></td>
                                                <td bgcolor="#FFFFFF"><a href="javascript:void(0)"
                                                        @click="setcolor('FFFFFF');"><img alt=""
                                                            :src="require('@/assets/img/s.gif')"
                                                            border="0"></a></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <template #footer>
                <div>
                    <a-button @click="handleCancel">取消</a-button>
                    <!-- <a-button type="primary" @click.prevent="handleSubmit">保存</a-button> -->
                </div>
            </template>
        </a-modal>
    </div>
</template>
<script setup>
    import {
        ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, defineProps, defineExpose,
        defineEmits, computed
    } from "vue";
    import { SearchOutlined } from "@ant-design/icons-vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();

    const labelCol = ref({ style: { width: '100px' } });
    const props = defineProps({
        isShow: Boolean
    })
    const emit = defineEmits(['cancel','color']);
    const modelContentRef = ref(null);

    const handleCancel = () => {
        emit("cancel", false);
    }
    const handleSubmit = () => {

    }
    const data = reactive({
        listData: [],
        top: ""
    })
    const { listData, top } = toRefs(data);

    const handleSearch = (val) => {
        console.log('val', val);
        getPeople(val)
    }
    const handleChange = (e) => {

    }
    onMounted(() => {
        let h = modelContentRef.value.clientHeight;
        data.top = (h + 126) / 2 + 'px';
    })
    const setTop = computed(() => ({
        top: data.top
    }));

    const setcolor = (color) => {
        console.log("color", color);
        emit("color", color);
    }
</script>
<style lang="less" scoped>
    @import url('@/style/modal.less');

    th {
        text-align: left;
    }
    table[cellpadding="1"]{
        td{
            width: 22px;
            height: 22px;
            cursor: pointer;
            a{
                display: inline-block;
                width: 100%;
                height: 100%;
                img{
                    width: 100%;
                    height: 100%;
                    display: none;
                }
            }
        }
    }
</style>