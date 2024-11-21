<template>
    <div>
        <a-input type="Number" v-model:value="inpVal" @input="changeInp">
            <template #suffix>
                <a-dropdown :trigger="['click']">
                    <span style="z-index: 1;cursor: pointer;padding-right: 11px;">{{unit}}</span>
                    <template #overlay>
                        <a-menu @click="changeUnit">
                            <a-menu-item v-for="(item, index) in units" :key="item.value">{{item.name}}</a-menu-item>
                        </a-menu>
                    </template>
                </a-dropdown>
            </template>
        </a-input>
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
        toRaw,
        nextTick,
        defineEmits,
        defineProps,
        defineExpose,
        inject,
    } from "vue";

    const props = defineProps({
        value: [Number, String]
    })
    const emit = defineEmits(['change']);


    const data = reactive({
        unit: "px",
        units: [
            {
                name: "px",
                value: "px",
            },
            {
                name: "%",
                value: "%",
            },
            {
                name: "em",
                value: "em",
            },
            {
                name: "rem",
                value: "rem",
            },
            {
                name: "ch",
                value: "ch",
            },
            {
                name: "vw",
                value: "vw",
            },
            {
                name: "vh",
                value: "vh",
            },
        ],
        inpVal: 0
    });
    const { unit, units, inpVal } = toRefs(data);

    if(props.value){
        console.log("props.value", props.value);
        data.inpVal = props.value;
    }
    watch(()=>props.value, (newVal, oldVal)=>{
        // console.log("123123", newVal)
        data.inpVal = newVal;
    });

    const changeInp = (e) => {
        emit('change', data.inpVal);
    }

    const changeUnit = (e) => {
        data.unit = e.key;
    }

</script>
<style lang="less" scoped>

</style>