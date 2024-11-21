<template>
  <div class="home">
      <div class="todo-head">
          <div class="todo-head-left">
              <div class="icon-circle-base"></div>
              <span class="wea-new-top-title-breadcrumb">计划任务
                  （设置）</span>
          </div>
          <div class="todo-head-right">
              <a-input-search class="todo-head-right-search" v-model:value="value" placeholder="快速查找"
                  @search="onSearch" />
              <a-button type="primary" @click="handleNew">新建</a-button>
          </div>
      </div>
      <div class="todo-content">
          <a-row>
              <a-col span="24" class="wea-left-right-layout-right">
                  <div style="height: 100%" ref="contentRef">
                      <div class="wea-tabContent" :style="{height:(tableHeight)+'px'}" ref="tabContent">
                          <!-- <Dtable ref="gridRef" :columns="columns" :gridUrl="gridUrl" :tableHeight="(tableHeight-45)" :isCollapsed="isCollapsed"></Dtable> -->
                          <ListGridConfig :gridUrl="gridUrl" :configUrl="configUrl" />
                      </div>
                  </div>
              </a-col>
          </a-row>
      </div>
  </div>
</template>
<script setup>
  import {
      UnorderedListOutlined,
      DownOutlined,
      CaretDownOutlined,
      UserOutlined
  } from "@ant-design/icons-vue";
  import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, nextTick, provide } from "vue";
  import Interface from "@/utils/Interface.js";
  import Dtable from "@/components/Dtable.vue";
  import ListGridConfig from "@/components/ListGridConfig.vue";
  import ListFormSearch from "@/components/ListFormSearch.vue";
  import { useRouter, useRoute } from "vue-router";
  const router = useRouter();
  import moment from "moment";
  const { proxy } = getCurrentInstance();

  let data = reactive({
      tableHeight: '',
      queryParams: {},
      isNew: false
  });
  const { tableHeight, queryParams, isNew } = toRefs(data);
  const profileId = reactive({
      id: ""
  });
  const contentRef = ref(null);
  let formSearchHeight = ref(null);
  const gridRef = ref(null);
  onMounted(() => {
      window.addEventListener('resize', changeHeight);
      setTimeout(function () {
          window.dispatchEvent(new Event('resize'))
      })

  })
  function changeHeight(h) {
      if (typeof h == 'number') {
          formSearchHeight.value = h;
      }
      if (contentRef.value) {
          let contentHeight = contentRef.value.clientHeight;
          let tabsHeight = 46;
          let height = contentHeight - tabsHeight - formSearchHeight.value;
          data.tableHeight = contentHeight;
          console.log('data', data.tableHeight);
          console.log("gridRef", gridRef.value.loadGrid())
      }
  }
  const gridUrl = ref(Interface.plannedHomework);
  const configUrl = ref(Interface.plannedHomeworkConfig);
  const handleNew = () => {

  };
</script>
<style lang="less" scoped>
    .home{
        .todo-content{
            height: calc(~"100% - 52px") !important;
        }
    }
</style>