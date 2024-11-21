<template>
  <div class="formDesign" v-if="isLoad">
    <Header @save="handleSave" />
    <div class="de-main">
      <LeftAside :layoutData="layoutData" />
      <div class="de-workspace">
        <UniverSheet ref="univerRef" :layoutData="layoutData" :workSheetData="workSheetData" @open="openRelateds" :recordRelatedFields="recordRelatedFields" />
      </div>
      <RightAside />
    </div>
    <RelatedListField v-if="isRelatedField" :isShow="isRelatedField" :fields="relatedListFields" :selectedFields="relatedListSelectedFields" :relatedSort="relatedSort" :relatedSortField="relatedSortField" @cancel="isRelatedField=false" @save="handleSaveRelatedField" />
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
  import UniverSheet from "@/components/formDesign/UniverSheet.vue";
  import Header from "@/components/formDesign/Header.vue";
  import LeftAside from "@/components/formDesign/LeftAside.vue";
  import RightAside from "@/components/formDesign/RightAside.vue";
  import RelatedListField from "@/components/mobileDesign/SelectField.vue";
  import Toast from "@/utils/toast.js";
  import Interface from "@/utils/Interface.js";
  const { proxy } = getCurrentInstance();
  import { useRoute, useRouter } from "vue-router";
  const router = useRouter();
  const route = useRoute();

  const univerRef = ref(null);

  const data = reactive({
    isRightAside: true,
    isRelatedField: false,
    relatedListFields: [],
    relatedListSelectedFields: [],
    relatedSort: "",
    relatedSortField: "",
    currentKey: "", // 当前选中的明细表
    recordRelatedFields: {}, // 记录相关明细表的字段
    entityId: route.query.entityId,
    layoutData: {},
    workSheetData: {},
    isLoad: false
  });
  const { isRightAside, isRelatedField, relatedListFields, relatedListSelectedFields,
    relatedSort, relatedSortField, recordRelatedFields, entityId, layoutData, workSheetData, isLoad
   } = toRefs(data);

   const getDetail = () => {
    let obj = {
      actions: [{
        id: "4270;a",
        descriptor: "aura://RecordUiController/ACTION$getRecordWithFields",
        callingDescriptor: "UNKNOWN",
        params: {
            recordId: data.entityId,
            apiName: "EntityForm"
        }
      }]
    }
    let d = {
        message: JSON.stringify(obj)
    }
    proxy.$post(Interface.detail, d).then(res=>{
      console.log("res", res);
      if(res && res.actions.length){
        let { LayoutData, WorkSheetData } = res.actions[0].returnValue.fields;
        if(LayoutData.value){
          let univerLayoutData = JSON.parse(LayoutData.value);
          console.log("univerLayoutData:", univerLayoutData);
          data.layoutData = univerLayoutData;
          let { comps, workbook } = data.layoutData.formLayout.pageLayouts[0];
          comps.forEach(item=>{
            if(item.displayCategory=="RelatedList"){
              let { row, column } = item.layout;
              let key = row+"_"+column;
              data.recordRelatedFields[key] = {
                list: item.checkedColumns
              }
            }
          })
        }
        if(WorkSheetData.value){
          data.workSheetData = JSON.parse(WorkSheetData.value);
        }
      }
      data.isLoad = true;
    })
   }
   getDetail();

  const handleSave = () => {
    const d = univerRef.value.getData();
    console.log("d", d);
    let text = JSON.stringify(d);
    // console.log("text", text);
    // alert(text);

    let sheetName = d.sheetOrder[0];
    let sheet = d.sheets[sheetName];
    let mergeData = sheet.mergeData;
    let styles = d.styles;
    
    let univerData = univerRef.value.getUniverData();
    console.log("recordData", univerData.recordData);
    console.log("recordRelatedFields", data.recordRelatedFields);



    let comps = [];
    for(let key in univerData.recordData){
      console.log("univerData.recordData", key, univerData.recordData[key]);
      let row = Number(key.split('_')[0]);
      let col = Number(key.split('_')[1]);
      let { displayCategory, label, type, required, readonly, name, id, columnsLoaded, quickActions } = univerData.recordData[key]; 
      let colspan = 1;
      let rowspan = 1;
      let style = {};
      mergeData.forEach(v=>{
        let mergeKey = v.startRow + "_" + v.startColumn;
        if(key==mergeKey){
          colspan = v.endColumn - v.startColumn + 1;
          rowspan = v.endRow - v.startRow + 1;
        }
      })

      let styleName = sheet.cellData[row][col].s;
      if(styleName){
        style = styles[styleName];
      }

      let layout = {
        colspan: colspan,
        column: col,
        row: row,
        rowspan: rowspan,
        hidden: false,
        wrapped: false
      };
      let fieldItem = {};
      if(displayCategory != 'RelatedList'){
        fieldItem = {
          alwaysReadonly: true,
          alwaysDisplayed: false,
          alwaysRequired: false,
          alwaysNotReadonly: false,
          displayCategory: displayCategory,
          label,
          type,
          required,
          readonly,
          name,
          id,
          category: displayCategory,
          alwaysNotRequired: true,
          layout: layout,
          style: style
        }
      }else {
        fieldItem = {
          checkedColumns: univerData.recordData[key].checkedColumns,
          selectableColumns: univerData.recordData[key].selectableColumns,
          displayCategory,
          label,
          columnsLoaded,
          quickActions,
          isSortCustomizable: true,
          listCustomizable: true,
          listCustomizable: true,
          defaultColumns: [],
          nameColumn: id,
          customListButtons: [],
          id,
          category: "",
          layout: layout,
        }
      }
      comps.push(fieldItem);
    };

    console.log("comps", comps);

    let rows = [];
    let cells = [];
    let columns = [];

    for(let key in sheet.cellData){
      let h = sheet.defaultRowHeight;
      if(sheet.rowData[key]){
        h = sheet.rowData[key].h;
      }
      rows.push({
        size: 30,
        visible: true,
        h: h
      });
      cells[key] = {};

      // sheet.cellData[key].forEach(item=>{
        
      // })
      for(let i = 0; i < sheet.columnCount; i++){
        // console.log("sheet.cellData", sheet.cellData[key][i]);
        let cellStyle = {};
        if(sheet.cellData[key][i]){
          cellStyle = styles[sheet.cellData[key][i].s];
        }
        cells[key][i] = {
          style: cellStyle,
          v: sheet.cellData[key] && sheet.cellData[key][i]?.v ? sheet.cellData[key][i]?.v : ''
        }
        // 内容 p
        if(sheet.cellData[key] && sheet.cellData[key][i]?.p){
          cells[key][i].p = sheet.cellData[key][i].p;
        }
        // cells.push({
        //   row: Number(key),
        //   col: i,
        //   style: cellStyle
        // })
      }
    }

    for(let key in sheet.columnData){
      columns.push({
        type: "percent",
        size: 3,
        visible: true,
        defaultWidth: sheet.columnData[key].w
      })
    }




    let LayoutData = {
      form: {
        module: "ebuilder",
        id: d.id,
        name: sheetName,
        physicalTable: true,
        pageNo: 0,
        current: 0,
        pageSize: 0,
        tableName: ""
      },
      formLayout: {
        id: d.id,
        name: sheetName,
        describe: "",
        pageLayouts: [
          {
            layoutType: "EXCEL",
            comps: comps,
            workbook: {
              rows: rows,
              columns: columns,
              cells: cells,
              rowCount: sheet.rowCount,
              columnCount: sheet.columnCount,
              spans: [],
              mergeData: sheet.mergeData
            }
          }
        ],
        formStyle: {}
      }
    }
    console.log("LayoutData:", LayoutData);
    let obj = {
      actions:[{
          id: "2919;a",
          descriptor: "",
          callingDescriptor: "UNKNOWN",
          params: {
            recordId: data.entityId,
            recordInput:{
              allowSaveOnDuplicate: false,
              apiName: "EntityForm",
              objTypeCode: 20018,
              fields: {
                LayoutData: JSON.stringify(LayoutData),
                WorkSheetData: JSON.stringify(d)
                // Title: "",
                // FolderId: ""
              }
            }
          }
      }]
    };
    let message = {
      message: JSON.stringify(obj)
    }
    proxy.$post(Interface.edit, message).then(res=>{
      Toast("保存成功!");
    })
  };

  const changeRightAside = () => {
    data.isRightAside = !data.isRightAside;
  }
  
  const openRelateds = (e, key) => {
    console.log("openRelateds", e, key);
    data.currentKey = key;
    data.relatedListFields = e.map(item=>{
      item.key = item.filterColumn;
      return item;
    });
    console.log("recordRelatedFields", data.recordRelatedFields);
    if(data.recordRelatedFields[key] != undefined && data.recordRelatedFields[key].list){
      console.log("data.recordRelatedFields[key]", data.recordRelatedFields[key]);
      data.relatedListSelectedFields = data.recordRelatedFields[key].list;
      data.relatedSort = data.recordRelatedFields[key].sort;
      data.relatedSortField = data.recordRelatedFields[key].sortField;
    }else {
      data.relatedListSelectedFields = [];
      data.relatedSort = "";
      data.relatedSortField = "";
    }
    data.isRelatedField = true;
  }

  const handleSaveRelatedField = (params) => {
    console.log("params", params);
    console.log("data.currentKey", data.currentKey);
    data.recordRelatedFields[data.currentKey] = params;
    data.isRelatedField = false;
  }

</script>
<style lang="less" scoped>
  .formDesign{
    width: 100%;
    height: 100vh;
    .de-main{
      height: calc(100% - 46px);
      display: flex;
      position: relative;
      .de-workspace{
        height: 100%;
        flex: 1 1 auto;
        flex-basis: 0;
        overflow: auto;
        margin-left: 200px;
        background: #f0f1f4;
        transition: all .3s cubic-bezier(.645,.045,.355,1);
      }
    }
  }
</style>
