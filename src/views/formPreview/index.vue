<template>
    <div class="wrap">
        <header class="de-header">
            <div class="de-header-leftside">
                <span style="padding: 0px 10px; font-weight: bold;">表单预览</span>
            </div>
            <div class="de-header-center">
                <div class="de-header-title" title="供应商卡片">供应商卡片</div>
            </div>
            <div class="de-header-rightside">
                <div class="ebcoms-avatar">
                    <div class="ebcoms-avatar-img">
                        <img src="@/assets/img/useravatar-default.png" alt="">
                    </div>
                    <div class="ebcoms-avatar-desc">
                        <span class="ebcoms-avatar-username" title="低代码体验">低代码体验</span>
                        <span title="低代码演示平台">低代码演示平台</span>
                    </div>
                </div>
            </div>
        </header>
        <div class="formTable">
            <table class="table">
                <!-- <tr v-for="(item, index) in rowCount">
                    <td v-for="(row, idx) in columnCount" :style="setStyle(index,idx)">
                        <span>
                            {{cellData[index] && cellData[index][idx]?.v}}
                        </span>
                    </td>
                </tr> -->
                <template v-for="(row, key) in cellData" :key="key">
                    <tr v-if="isRowShow(row,key)" :style="setRowStyle(key)">
                        <!-- <td v-for="(col, colKey, colIndex) in row" :key="colKey" :colspan="col.colspan || 1" v-if="shouldRenderCell(key, colIndex)" :style="setStyle(key,colIndex)">
                            <span>
                                {{col.v}}
                            </span>
                        </td> -->
                        <template v-for="(col, colKey, colIndex) in row">
                            <td :col="colKey" :rowspan="col.rowspan || 1" :colspan="col.colspan || 1" v-if="shouldRenderCell(key, colKey, col.rowspan) && col.field?.displayCategory!='RelatedList'" :style="setStyle(key,colKey)">
                                <template v-if="col.v ||  col.p">
                                    <span>
                                        {{col.v}}
                                    </span>
                                    <span v-if="col.p">
                                        {{col.p.body.dataStream}}
                                    </span>
                                </template>
                                <template v-else-if="col.field">
                                    <div>
                                        <!-- {{col.field.name}} = {{col.field.type}} -->
                                        <FieldType :type="col.field.type" :field="col.field" @openlook="handleOpenLook" />
                                    </div>
                                </template>
                            </td>
                            <td v-else-if="col.field && col.field.displayCategory=='RelatedList'" :colspan="col.colspan" :style="setStyle(key,colKey)" style="background: #fff;padding: 10px;">
                                <div class="childTableOption">
                                    <a-button class="ant-btn-icon" @click="handleAddSubTable(col)">
                                        <PlusOutlined />
                                    </a-button>
                                    <a-button :disabled="col.selectedList.length ? false : true" class="ant-btn-icon ml10" @click="handleDelSubTable(col)">
                                        <MinusOutlined />
                                    </a-button>
                                    <a-button :disabled="col.selectedList.length ? false : true" class="ant-btn-icon ml10" @click="handleCopySubTable(col)">
                                        <CopyOutlined />
                                    </a-button>
                                    <!-- <a-button @click="handleAddSubTable(col)">添加</a-button>
                                    <a-button class="ml10">批量添加</a-button> -->
                                </div>
                                <div class="excelTableView">
                                    <table>
                                        <thead>
                                            <tr>
                                                <td style="border: 1px solid #5d9cec;height: 30px;text-align: center;min-width: 40px;">操作</td>
                                                <!-- <td style="border: 1px solid #5d9cec;height: 30px;text-align: center;min-width: 30px;">序号</td> -->
                                                <td v-for="(child, childIdx) in col.field.checkedColumns" style="border: 1px solid #5d9cec;height: 30px;text-align: center;">
                                                    {{child.label}}
                                                </td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <a-checkbox-group v-model:value="col.selectedList" style="width: 100%;display: contents;">
                                                <tr v-for="(sub, subIdx) in col.subTableData" style="width: 100%;">
                                                    <td style="border: 1px solid #5d9cec;height: 24px;text-align: center;">
                                                        <a-checkbox :value="sub.id"></a-checkbox>
                                                    </td>
                                                    <!-- <td style="border: 1px solid #5d9cec;height: 24px;text-align: center;">{{subIdx+1}}</td> -->
                                                    <td v-for="(child, childIdx) in col.field.checkedColumns" style="border: 1px solid #5d9cec;height: 24px;">
                                                        <FieldType :type="child.type" :field="child" @openlook="handleOpenLook" />
                                                    </td>
                                                </tr>
                                            </a-checkbox-group>
                                        </tbody>
                                    </table>
                                </div>
                            </td>
                        </template>
                    </tr>
                </template>
            </table>
        </div>
        <radio-dept
            v-if="isRadioDept"
            :isShow="isRadioDept"
            @cancel="cancelDeptModal"
            @selectVal="handleDeptParams"
        />
          <radio-user
            v-if="isRadioUser"
            :isShow="isRadioUser"
            @cancel="cancelUserModal"
            @selectVal="handleUserParams"
            :localId="fieldData.name"
          ></radio-user>
        <Lookup-filter v-if="isLookup" :isShow="isLookup" :field="fieldData.name" :entityApiName="entityApiName" :lookEntityApiName="lookEntityApiName" :objectTypeCode="objectTypeCode" @cancel="isLookup=false" @select="handleSelectData"></Lookup-filter>
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
    import {
        PlusOutlined, MinusOutlined, CopyOutlined
    } from "@ant-design/icons-vue";
    import Interface from "@/utils/Interface.js";
    import FieldType from "@/components/formPreview/FieldType.vue";
    import RadioDept from "@/components/commonModal/RadioDept.vue";
    import RadioUser from "@/components/commonModal/RadioUser.vue";
    import LookupFilter from "@/components/commonModal/LookupFilter.vue";

    const { proxy } = getCurrentInstance();
    import { useRoute, useRouter } from "vue-router";
    const router = useRouter();
    const route = useRoute();

    const data = reactive({
        entityId: route.query.entityId,
        layoutData: {},
        rowCount: "",
        columnCount: "",
        cellData: {},
        mergeData: [],
        mergeRowKeyData: {},
        rows: [],
        mergeRowColData: {}, // startRow endRow 不同 处理合并行之后的单元格
        isRadioUser: false,
        isRadioDept: false,
        isLookup: false,
        fieldData: {},
        entityApiName: "",
        lookEntityApiName: "",
        objectTypeCode: "",
        list: {},
        select: {},
        search: {},
        columns: [],
        comps: []
    });
    const { entityId, layoutData, rowCount, columnCount, cellData, mergeData, rows, mergeRowColData, 
        isRadioUser, isRadioDept, isLookup, fieldData, entityApiName, lookEntityApiName, objectTypeCode, columns, comps
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
        proxy.$post(Interface.detail, d).then(res => {
            let { LayoutData } = res.actions[0].returnValue.fields;
            let univerLayoutData = JSON.parse(LayoutData.value);
            console.log("univerLayoutData:", univerLayoutData);
            data.layoutData = univerLayoutData;

            let { cells, columnCount, columns, rowCount, rows, mergeData }  = univerLayoutData.formLayout.pageLayouts[0].workbook;
            data.rowCount = rowCount;
            data.columnCount = columnCount;
            data.mergeData = mergeData;
            data.rows = rows;
            data.columns = columns;
            console.log("mergeData:", mergeData);
            if(mergeData.length){
                mergeData.forEach(item=>{
                    if(item.startRow!=item.endRow){
                        data.mergeRowColData[item.startRow] = item;
                    }
                    data.mergeRowKeyData[item.startRow] = item;
                })
            }
            let comps = univerLayoutData.formLayout.pageLayouts[0].comps;
            data.comps = comps;
            comps.forEach(item=>{
              if(item.displayCategory!="RelatedList"){
                  let { row, column } = item.layout;
                  let style = {};
                  if(data.cellData[row]){
                      data.cellData[row][column] = {
                          v: item.label
                      }
                  }else {
                      data.cellData[row] = {
                          [column]: {
                              v: item.label,
                          }
                      }
                  }
              }

            });
            // cells.forEach(cell=>{
            //     // let key = 
            //     // if(data.cellData[cell.row][cell.col]){
            //     //     data.cellData[cell.row][cell.col].style = cell.style;
            //     // }else {
            //         // data.cellData[cell.row] = {
            //         //     [cell.col]: {
            //         //         style: cell.style
            //         //     }
            //         // }
            //     // }
            //     if(data.cellData[cell.row] && data.cellData[cell.row][cell.col]){
            //         // console.log('cell', cell);
            //         if(cell.style){
            //             data.cellData[cell.row][cell.col].style = cell.style;
            //         }
            //     }else {
            //         if(data.cellData[cell.row] && data.cellData[cell.row][cell.col]){
            //             data.cellData[cell.row][cell.col].style = cell.style;
            //         }else {
            //             if(data.cellData[cell.row]){
            //                 if(data.cellData[cell.row][cell.col]){
            //                     data.cellData[cell.row][cell.col].style = cell.style;
            //                 }else {
            //                     data.cellData[cell.row][cell.col] = {
            //                         style: cell.style
            //                     };
            //                 }
            //             }else {
            //                 data.cellData[cell.row] = {
            //                     [cell.col]: {
            //                         style: cell.style
            //                     }
            //                 }
            //             }
            //         }

            //     }
            // })
            
            // console.log("cells",cells);

            // 去除空白单元格
            let del = [];
            cells.forEach((item, index)=>{
                let temp = [];
                for(let key in item){
                    temp.push(item[key]);
                }
                let isBook = temp.some(v=>v.v!='');
                if(!isBook){
                    if(del.indexOf(index)==-1){
                        del.push(index);
                        delete cells[index];
                    }
                }
            })
            console.log('del', del);
            console.log('cells', cells);
            data.cellData = cells;
            // data.cellData = cells.filter(item=>{
            //     let temp = [];
            //     for(let key in item){
            //         temp.push(item[key]);
            //     }
            //     console.log("temp", temp);
            //     return temp.find(item=>{
            //         return item.v != "" || item.p;
            //     })
            // });


            // 处理子表
            comps.forEach(item=>{
                let { row, column } = item.layout;
                let style = {};
                if(data.cellData[row][column]){
                    data.cellData[row][column].v = "";
                    data.cellData[row][column].field = item;
                    data.cellData[row][column].subTableData = [];
                    data.cellData[row][column].selectedList = [];
                    if(item.displayCategory=='RelatedList'){
                        console.log("data.cellData[row][column]", data.cellData[row][column]);
                        let rowField = {
                            id: 1
                        };
                        item.checkedColumns.forEach(item=>{
                            rowField[item.key] = "";
                        })
                        data.cellData[row][column].subTableData.push(rowField);

                        // ### start
                        // console.log('item:', item);
                        // let result = [];
                        // for(var i =0 ; i < item.selectableColumns.length;i+=2){
                        //     result.push(item.selectableColumns.slice(i,i+2)); 
                        // };
                        // result.forEach((v,idx)=>{
                        //     data.cellData[row+idx+1] = {
                        //         0: {},
                        //         1: {
                        //             style: data.cellData[row-1][column].style,
                        //             v: v[0].label
                        //         },
                        //         2: {
                        //             style: data.cellData[row-1][column].style,
                        //             field: v[0]
                        //         },
                        //         3: {
                        //             style: data.cellData[row-1][column].style,
                        //             v: v[1].label
                        //         },
                        //         4: {
                        //             style: data.cellData[row-1][column].style,
                        //             field: v[1]
                        //         },
                        //         5: {style: data.cellData[row-1][column].style,},
                        //         6: {style: data.cellData[row-1][column].style,},
                        //         7: {style: data.cellData[row-1][column].style,}
                        //     };
                            
                        //     // {8: {v:123,style:  data.cellData[row-1][column].style}};
                        // })
                        // // console.log("result", result);
                        // delete data.cellData[row];
                        // ### end
                    }
                }
            });
            // console.log('data.cellData', data.cellData);
            if(data.mergeData){
                data.mergeData.forEach(item=>{
                    if(data.cellData[item.startRow] && data.cellData[item.startRow][item.startColumn]){
                        data.cellData[item.startRow][item.startColumn].colspan = item.endColumn - item.startColumn + 1;
                        data.cellData[item.startRow][item.startColumn].rowspan = item.endRow - item.startRow + 1;
                    }
                });
            };
            console.log('data.cellData2', data.cellData);
            console.log('mergeRowKeyData', data.mergeRowKeyData);
        })
    }
    getDetail();

    const setRowStyle = (key) => {
        let style = {};
        if(data.rows[key] && data.rows[key].h){
            style.height = data.rows[key].h + "px"
        }
        return style;
    }

    const setStyle = (row, col) => {
        // console.log("style", data.cellData[row][col].style);
        let style = {};
        if(data.cellData[row][col].style){
            let styleData = data.cellData[row][col].style;
            for(let styleName in styleData){
                if(styleName=='fs'){
                    // style.fontSize = styleData[styleName] + "px";
                }
                if(styleName == 'bg'){
                    style.background = styleData[styleName].rgb;
                }
                if(styleName == 'cl'){
                    style.color = styleData[styleName]?.rgb;
                }
                if(styleName=='bd'){
                    style.border = "1px solid #000";
                    style.width = '90px';
                    let layout = data.comps[Number(row)].layout;
                    // style.width = data.columns[layout.column].defaultWidth + 'px';
                }
                if(styleName=='ht'){
                    style.textAlign = styleData[styleName] == 1 ? "left" : styleData[styleName] == 2 ? "center" : styleData[styleName] == 3 ? "right" : "";
                }
                if(styleName=='pd'){
                    let { b, l, r, t } = styleData[styleName];
                    style.paddingTop = t+'px';
                    style.paddingRight = r+'px';
                    style.paddingBottom = b+'px';
                    style.paddingLeft = l+'px';
                }
                if(styleName=='ff'){
                    style.fontFamily = styleData[styleName];
                }
                if(styleName=='tr'){
                    if(styleData[styleName].a == 0 && styleData[styleName].v == 1){
                        style.writingMode = "vertical-rl";
                    }
                }
            }
        }
        return style;
    }

    // 合并行和列
    let ranges = [];
    const shouldRenderCell = (rowKey, colKey, rowspan) => {
        let n = true;
        if(data.mergeRowKeyData[rowKey]){
            // console.log('mergeRowKeyData[rowKey]', data.mergeRowKeyData[rowKey]);
            n = isInRange(colKey, data.mergeRowKeyData[rowKey].startColumn, data.mergeRowKeyData[rowKey].endColumn+1);
            // console.log("data.mergeRowKeyData", data.mergeRowKeyData[rowKey], rowKey, colKey, n, data.mergeRowKeyData[rowKey].startColumn, data.mergeRowKeyData[rowKey].endColumn );
        } else {
            n = false;
        }
        if(data.mergeRowColData[rowKey]){
            // 处理合并行
            let startRow =  data.mergeRowColData[rowKey].startRow;
            let endRow =  data.mergeRowColData[rowKey].endRow;
            if(startRow != endRow){
                // console.log("startRow", startRow, endRow);
                let min = startRow+1;
                let max = endRow;
                for(let i = min; i <= endRow; i++){
                    if(ranges.indexOf(i)==-1){
                        ranges.push(i);
                    }
                }
            }
        }
        // console.log("ranges", ranges, rowKey, ranges.indexOf(rowKey));

        // 处理合并行 - 第二行的列
        if(ranges.indexOf(rowKey)!=-1){
            if(colKey==1){
                n = true;
            }
        }
        return !n;
    };

    const isInRange = (num, min, max) => {
        return num > min && num < max;
    }

    const handleOpenLook = (e) => {
        console.log('e', e);
        data.fieldData = e;
        let type = e.type;
        if (type == 'U') {
            data.isRadioUser = true;
        } else if (type == 'O') {
            data.isRadioDept = true;
        }else {
            // data.lookEntityApiName = attribute.attributes.referencedEntityName;
            // data.recordObj = attribute;
            // data.type = type;
            // data.isLookup = true;
        }
    };

    const cancelUserModal = () => {
        data.isRadioUser = false;
    };
    const handleUserParams = () => {

    };

    const cancelDeptModal = () => {
        data.isRadioDept = false;
    };
    const handleDeptParams = () => {

    };

    const handleSelect = () => {
        
    }

    const isRowShow = (row, key) => {
        let show = true;
        if(row==undefined){
            show = false;
        }
        return show;
    }

    // 添加子表行

    const handleAddSubTable = (col) => {
        console.log("handleAddSubTable", col);
        let row = {
            id: col.subTableData.length + 1
        };
        col.field.selectableColumns.forEach(item=>{
            row[item.key] = "";
        })
        col.subTableData.push(row);
    };

    const handleDelSubTable = (col) => {
        console.log('col.subTableData',col.subTableData, col.selectedList);
        for (let i = col.subTableData.length - 1; i >= 0; i--) {
            if (col.selectedList.indexOf(col.subTableData[i].id) !== -1) {
                col.subTableData.splice(i, 1);
            }
        }
    };

    const handleCopySubTable = (col) => {
        let list = col.subTableData.filter(item=>{
            return col.selectedList.find(row=>{
                return item.id == row;
            })
        })
        const copyData = JSON.parse(JSON.stringify(list));
        copyData.forEach(item=>{
            item.id = item.id+new Date().getTime();
            col.subTableData.push(item);
        })
    }

</script>
<style lang="less" scoped>
    .wrap{
        /* display: flex;
        justify-content: center;
        padding: 20px 0; */
        width: 100%;
        height: 100vh;
        overflow: auto;
        background: #f7f7f7;
        .de-header{
            width: 100%;
            height: 46px;
            background: #fff;
            border-bottom: 1px solid #e5e5e5;
            display: flex;
            align-items: center;
            position: fixed;
            z-index: 9999;
            &>div{
                display: flex;
                align-items: center;
                height: 100%;
            }
            .de-header-center{
                position: absolute;
                left: 240px;
                right: 240px;
                .de-header-title{
                    top: 0;
                    line-height: 46px;
                    display: inline-block;
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    user-select: none;
                    max-width: 150px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    word-break: break-word;
                    font-size: 12px;
                }
            }
            .de-header-rightside{
                position: absolute;
                right: 5px;
                &>div{
                    display: flex;
                }
                .de-header-save-preview{
                    .ui-btn{
                        margin: 0 6px;
                    }
                }
                .ui-icon{
                    display: inline-block;
                    padding: 14px 9px;
                    cursor: pointer;
                    &:hover{
                        background: #f7f7f7;
                    }
                    .icon-help{
                        width: 16px;
                        height: 16px;
                        color: #666;
                    }
                }
                .ebcoms-avatar{
                    min-width: 50px;
                    padding: 0 10px;
                    cursor: default;
                    height: 100%;
                    align-items: center;
                    font-size: 12px;
                    .ebcoms-avatar-img{
                        width: 30px;
                        height: 30px;
                        cursor: pointer;
                        img{
                            width: 100%;
                            height: 100%;
                            border-radius: 50%;
                        }
                    }
                    .ebcoms-avatar-desc{
                        margin-left: 8px;
                        span{
                            max-width: 100px;
                            text-overflow: ellipsis;
                            overflow: hidden;
                            white-space: nowrap;
                            display: block;
                        }
                        span:first-child{
                            line-height: 16px;
                            &:hover{
                                color: #5d9cec;
                                cursor: pointer;
                            }
                        }
                        span:last-child{
                            color: #aaa;
                        }
                    }
                }
            }
        }
        .formTable{
            width: 95%;
            min-height: calc(100vh - 130px);
            margin: 65px auto;
            display: flex;
            justify-content: center;
            padding: 30px 50px;
            background: #e7ecf3;
            box-shadow: 0 0 14px 0 hsla(0, 0%, 83.9%, .5);
        }
        table{
            border-collapse: collapse;
            tr{
                td{
                    /* width: 90px;
                    height: 30px; */
                    /* border: 1px solid #dedede; */
                }
            }
        }
        .childTableOption{
            display: flex;
            justify-content: flex-end;
            align-items: center;
            margin-bottom: 10px;
        }
        .table{
            width: 794px;
            table-layout: fixed;
            td{
                overflow: auto;
            }
        }
        .excelTableView{
            width: 100%;
            overflow: auto;
            table{
                td{
                    overflow: hidden;
                }
            }
        }
    }
</style>