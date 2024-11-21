<template>
    <div class="custom-calendar">
        <div class="calendar-head">
          <span v-for="(day, index) in weekDays" :key="index">{{ day }}</span>
        </div>
        <div class="calendar-body">
          <div
            v-for="(date, index) in visibleDates" 
            :key="index"
            class="custom-calendar-cell"
          >
            <span class="calendar-date-value" :class="{'highlight': date.isSame(dayjs(), 'day')}">
                {{ date.date() }}
            </span>
          </div>
        </div>
      </div>
</template>
<script setup>
    import { ref, reactive, toRefs, defineProps, getCurrentInstance, watch, h, computed } from "vue";
    const props = defineProps({
        type: {
            type: String,
            default: "week", // 默认显示周视图
        },
    })
    import dayjs from "dayjs";
    import "dayjs/locale/zh-cn";
    import weekday from "dayjs/plugin/weekday";

    dayjs.locale("zh-cn"); // 设置为中文
    dayjs.extend(weekday); // 支持设置周起点

    const weekDays = ['日','一','二','三','四','五','六'];
    const calendarDate = ref(dayjs());
    const visibleDates = computed(()=>{
        const startOfWeek = calendarDate.value.subtract(calendarDate.value.day(), "day");
        if (props.type === "week") {
            return Array.from({ length: 7 }, (_, i) => startOfWeek.clone().add(i, "day"));
        } else if (props.type === "twoWeeks") {
            return Array.from({ length: 14 }, (_, i) => startOfWeek.clone().add(i, "day"));
        }else {
            return [];
        }
    })
</script>

<style lang="less" scoped>
    .custom-calendar {
        display: flex;
        flex-direction: column;
        width: 100%;
        border-top: 1px solid #ddd;
    }

    .calendar-head {
        display: grid;
        grid-template-columns: repeat(7, 1fr); /* 一行七天 */
        /* background-color: #f5f5f5; */
        /* padding: 8px 0; */
        text-align: center;
        /* font-weight: bold; */
        line-height: 18px;
        padding-top: 8px;
    }

    .calendar-body {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 1px;
    }

    .custom-calendar-cell {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 60px;
        background-color: #fff;
        /* border: 1px solid #ddd; */
    }
    .calendar-date-value{
        display: inline-block;
        width: 24px;
        height: 24px;
        line-height: 24px;
        border-radius: 2px;
        cursor: pointer;
        text-align: center;
        &:hover{
            background: #f4f4f4;
        }
        &.highlight{
            background: #3399ff;
            color: #fff;
        }
    }
</style>