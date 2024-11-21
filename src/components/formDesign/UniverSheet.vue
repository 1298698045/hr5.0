<template>
  <div id="univer-container"></div>
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
  import "@univerjs/design/lib/index.css";
  import "@univerjs/ui/lib/index.css";
  import "@univerjs/docs-ui/lib/index.css";
  import "@univerjs/sheets-ui/lib/index.css";
  import "@univerjs/sheets-formula/lib/index.css";

  import { LocaleType, Tools, Univer, UniverInstanceType, Workbook, ICommandService, IPermissionService, SheetTypes, BooleanNumber } from "@univerjs/core";
  import { defaultTheme } from "@univerjs/design";

  import { UniverFormulaEnginePlugin } from "@univerjs/engine-formula";

  // DeviceInputEventType:单元格的数据会在失焦时同步到 snapshot 中，因此你应当在获取 snapshot 数据前先对单元格进行失焦操作。
  import { UniverRenderEnginePlugin, DeviceInputEventType } from "@univerjs/engine-render";

  import { UniverUIPlugin } from "@univerjs/ui";

  import { UniverDocsPlugin } from "@univerjs/docs";
  import { UniverDocsUIPlugin } from "@univerjs/docs-ui";

  import { UniverSheetsPlugin, WorkbookEditablePermission, WorksheetEditPermission, AddRangeProtectionMutation, AddWorksheetMergeCommand, SetBorderStyleCommand, RangeProtectionPermissionEditPoint } from "@univerjs/sheets";
  import { UniverSheetsFormulaPlugin } from "@univerjs/sheets-formula";
  import { UniverSheetsUIPlugin, SetRangeBoldCommand } from "@univerjs/sheets-ui";
  import { FUniver } from "@univerjs/facade";
 
  import DesignZhCN from '@univerjs/design/locale/zh-CN';
  import UIZhCN from '@univerjs/ui/locale/zh-CN';
  import DocsUIZhCN from '@univerjs/docs-ui/locale/zh-CN';
  import SheetsZhCN from '@univerjs/sheets/locale/zh-CN';
  import SheetsUIZhCN from '@univerjs/sheets-ui/locale/zh-CN';
  import SheetsFormulaZhCN from '@univerjs/sheets-formula/locale/zh-CN';

  import { DEFAULT_WORKBOOK_DATA } from "@/assets/default-workbook-data.js";
  import bus from '@/utils/eventBus.js';

  const props = defineProps({
    recordRelatedFields: Object,
    layoutData: Object,
    workSheetData: Object
  });

  

  const emit = defineEmits(['open']);

  const data = reactive({
    univerAPI: "",
    dragData: {}, // 拖拽的数据
    recordData: {}, // 记录存储的数据 key值row_col
    fieldInfo: {}, // 字段信息
    currentKey: "",
    univer: "",
    workBookData: {
      styles: {
        border: {
          bd: {
            b: {
              cl: {
                rgb: "#000000"
              }
            },
            l: {
              cl: {
                rgb: "#000000"
              }
            },
            r: {
              cl: {
                rgb: "#000000"
              }
            },
            t: {
              cl: {
                rgb: "#000000"
              }
            }
          }
        }
      },
    }
  })
  const { univerAPI, dragData, recordData, fieldInfo, currentKey, univer, workBookData } = ref(data);


  const loadUniverData = () => {
    let { form, formLayout } = props.layoutData;
    let { comps, workbook } = formLayout.pageLayouts[0];
    let cellData = {};
    let rowData = {};
    console.log("comps", comps);
    let recordRowColumnData = {};
    comps.forEach(item=>{
      if(item.displayCategory!="RelatedList"){
        let { row, column } = item.layout;
        // console.log('row', row, column);
        // recordRowColumnData[row] = {};
        
        if(recordRowColumnData[row]){
          recordRowColumnData[row][column] = {
            v: item.label
          }
        }else {
          recordRowColumnData[row] = {
            [column]: {
              v: item.label,
              // s: "hello"
            }
          }
        }
        let key = row+"_"+column;
        data.recordData[key] = item;
      }else {
        console.log("item", item);
        let { row, column } = item.layout;
        // console.log('row', row, column);
        // recordRowColumnData[row] = {};
        
        if(recordRowColumnData[row]){
          recordRowColumnData[row][column] = {
            v: item.label
          }
        }else {
          recordRowColumnData[row] = {
            [column]: {
              v: item.label,
              // s: "hello"
            }
          }
        }
        let key = row+"_"+column;
        data.recordData[key] = item;
      }
    });
    console.log('recordRowColumnData', recordRowColumnData);
    for(let i = 0;  i < workbook.rows.length; i++){
      // cellData[i] = {
      //   0: {
      //     v: 1
      //   }
      // }
      // cellData[i] = {};
      if(recordRowColumnData[i]){
        cellData[i] = recordRowColumnData[i]
      }
      
      // for(let j = 0; j < comps.length; j++){
      //   let item = comps[i];
      //   console.log('item', item);
      //   if(item){
      //     let { row, column } = item.layout;
      //     if(i == row){
      //       cellData[i] = {
      //         column: {
      //           v: item.label
      //         }
      //       }
      //     }
      //   }
      // }
    }
    console.log('cellData', cellData);
    let workBookData = {
      id: formLayout.id,
      locale: LocaleType.EN_US,
      name: formLayout.name,
      sheetOrder: [],
      appVersion: '3.0.0-alpha',
      styles: {
        border: {
          bd: {
            b: {
              cl: {
                rgb: "#000000"
              }
            },
            l: {
              cl: {
                rgb: "#000000"
              }
            },
            r: {
              cl: {
                rgb: "#000000"
              }
            },
            t: {
              cl: {
                rgb: "#000000"
              }
            }
          }
        }
      },
      // styles: formLayout.formStyle,
      sheets: {
        "sheet-01": {
          type: SheetTypes.GRID,
          id: 'sheet-01',
          cellData: cellData,
          rowData: rowData,
          name: 'sheet1',
          tabColor: 'red',
          hidden: BooleanNumber.FALSE,
          rowCount: workbook.rowCount,
          columnCount: workbook.columnCount,
          zoomRatio: 1,
          scrollTop: 200,
          scrollLeft: 100,
          defaultColumnWidth: 93,
          defaultRowHeight: 27,
          status: 1,
          showGridlines: 1,
          hideRow: [],
          hideColumn: [],
          rowHeader: {
              width: 46,
              hidden: BooleanNumber.FALSE,
          },
          columnHeader: {
              height: 20,
              hidden: BooleanNumber.FALSE,
          },
          selections: ['A2'],
          rightToLeft: BooleanNumber.FALSE,
          pluginMeta: {},
        }
      }
    }
    // data.workBookData = workBookData;
    data.workBookData = props.workSheetData;
    init();
  }
  // loadUniverData();
  watch(()=>props.recordRelatedFields, (newVal,oldVal)=>{
    // console.log(newVal, oldVal);
    // console.log("data", data.currentKey);
    let len = newVal[data.currentKey].list.length;
    let row = data.currentKey.split("_")[0];
    let col = data.currentKey.split("_")[1];
    const sheet = data.univerAPI.getActiveWorkbook().getActiveSheet();
    const range = sheet.getRange(Number(row), Number(col), 1, 1);
    // const cell = range.getCell(0, 0);
    // const unitId = cell.getUnitId();
    // const subUnitId = cell.getSubUnitId();
    // console.log("unitId", cell, unitId, subUnitId);
    setMergeCell(range, Number(row), Number(col), len);
    // console.log("data.recordData[data.currentKey]", data.recordData[data.currentKey].list);
    data.recordData[data.currentKey].checkedColumns = newVal[data.currentKey].list;
  }, {deep: true});

  const setMergeCell = (range, row, col, len) => {
    let unitId = range._worksheet.unitId;
    let subUnitId = range._worksheet._sheetId;
    console.log("unitId", unitId, subUnitId);
    data.univer.__getInjector().get(ICommandService).executeCommand(AddWorksheetMergeCommand.id, {
      unitId,
      subUnitId,
      selections: [
        {
          startColumn: col,
          startRow: row,
          endColumn: col + len-1,
          endRow: row,
        }
      ]
    })
  }

  const init = () => {
    const univer = new Univer({
      theme: defaultTheme,
      locale: LocaleType.ZH_CN,
      locales: {
        [LocaleType.ZH_CN]: Tools.deepMerge(
          SheetsZhCN,
          DocsUIZhCN,
          SheetsUIZhCN,
          SheetsFormulaZhCN,
          UIZhCN,
          DesignZhCN,
        ),
      },
    });
    univer.registerPlugin(UniverRenderEnginePlugin);
    univer.registerPlugin(UniverFormulaEnginePlugin);

    univer.registerPlugin(UniverUIPlugin, {
      container: 'univer-container',
    });

    univer.registerPlugin(UniverDocsPlugin);
    univer.registerPlugin(UniverDocsUIPlugin);

    univer.registerPlugin(UniverSheetsPlugin);
    univer.registerPlugin(UniverSheetsUIPlugin, {
      // 隐藏菜单项
      menu: {
        [SetRangeBoldCommand.id]: {
          hidden: false,
        }
      }
    });
    univer.registerPlugin(UniverSheetsFormulaPlugin);

    univer.createUnit(UniverInstanceType.UNIVER_SHEET, data.workBookData);

    const univerAPI = FUniver.newAPI(univer);
    data.univerAPI = univerAPI;
    data.univer = univer;
    const activeWorkbook = univerAPI.getActiveWorkbook();
    const sheet = univerAPI.getActiveWorkbook().getActiveSheet();
    // console.log("sheet", sheet);
    const columnCount = sheet._worksheet.getColumnCount(); // 获取总列数
    // console.log('列数:', columnCount);

    // 设置行数
    sheet._worksheet.setRowCount(46);
    // sheet._worksheet.setColumnCount(25);

    // 设置列宽 范围
    // sheet.setColumnWidths(0, columnCount, 180);
    sheet.setColumnWidths(0, 1, 66);
    sheet.setColumnWidths(columnCount-1, columnCount, 66);

    const totalRows = sheet._worksheet.getRowCount(); // 获取总行数
    console.log("totalRows", totalRows);
    // getRange 起始行 起始列 行数 列数
    const firstColumnRange = sheet.getRange(0, 0, totalRows, 1); // 第一列的范围
    firstColumnRange.setBackgroundColor('#E7ECF3');
    // firstColumnRange.setFontWeight('bold')
    // firstColumnRange.setFontLine('underline')
    // firstColumnRange.setFontFamily('Arial')
    // firstColumnRange.setFontSize(10)
    // firstColumnRange.setFontColor('red');
    const lastColumnRange = sheet.getRange(0, columnCount - 1, totalRows, 1); // 最后一列的范围
    lastColumnRange.setBackgroundColor('#E7ECF3');
    const firstRowRange = sheet.getRange(0, 0, 1, columnCount);
    firstRowRange.setBackgroundColor('#E7ECF3');


    for(let i = 0; i < totalRows; i++){
      
    }

    // // 定义样式
    // const style = {
    //   backgroundColor: '#FFFF00', // 背景颜色
    //   fontSize: 12, // 字体大小
    //   fontWeight: 'bold', // 字体加粗
    //   textAlign: 'left', // 水平对齐
    //   verticalAlign: 'middle' // 垂直居中
    // };

    // // 应用样式到第一列
    // firstColumnRange.setStyle(style);
    

    const saveData = activeWorkbook.save(); // 工作表数据
    // console.log("saveData:", saveData);

    univerAPI.getSheetHooks().onCellDragOver((cell) => {
      // 拿到当前鼠标指向的单元格
      // console.log('cell', cell);
    })

    univerAPI.onBeforeCommandExecute((command)=>{
      const { id, type, params } = command;
      if (command.id === 'sheet.operation.set-cell-edit-visible' && command.params.visible) {
        console.log("command", command);
        const activeSheet = univerAPI.getActiveWorkbook().getActiveSheet();
        const selection = activeSheet.getSelection();
        const range = selection.getActiveRange();
        const activeCell = range.getCell();
        const activeColumn = range.getColumn();
        const activeRow = range.getRow();
        console.log("range", range);
        console.log(range.getValue());
        console.log(getData());

        let cellValue = range.getValue();
        if(cellValue){
          // 处理禁用单元格不可编辑 取消聚焦事件
          // setTimeout(() => {
          //   univerAPI.executeCommand('sheet.operation.set-cell-edit-visible', {
          //     visible: false,
          //     _eventType: DeviceInputEventType.PointerUp,
          //   });
          // }, 100);
        }
      }else if(command.id == 'doc.operation.set-selections' && command.params.isEditing){
        console.log("单点击：", command);
        const activeSheet = univerAPI.getActiveWorkbook().getActiveSheet();
        const selection = activeSheet.getSelection();
        const range = selection.getActiveRange();
        const activeCell = range.getCell();
        const activeColumn = range.getColumn();
        const activeRow = range.getRow();
        let key = activeRow+'_'+activeColumn;
        console.log('key', key, range.getValue(), data.recordData[key]);

        // 删除当前单元格存储的数据
        let value = range.getValue();
        if(data.recordData[key] && (value == null || value=='')){
          delete data.recordData[key];
        }
        data.currentKey = key;
        // console.log("activeRowactiveRow", activeRow, activeColumn, data.recordData, data.recordData[key]);
        if(key in data.recordData){
          // console.log("key", key);
          data.fieldInfo = data.recordData[key];
          bus.emit('fieldInfo', data.fieldInfo);
          let displayCategory = data.recordData[key].displayCategory;
          if(displayCategory=='RelatedList'){
            // console.log("明细表123");
            let selectableColumns = data.recordData[key].selectableColumns;
            emit("open", selectableColumns, key);
          }
        }
        console.log('data.recordData', data.recordData);
      }
    })

    univerAPI.getSheetHooks().onCellDrop((cell) => {
      // 拿到当前鼠标指向的单元格
      console.log("onCellDrop", cell);
      const sheet = univerAPI.getActiveWorkbook().getActiveSheet();
      console.log("sheet", sheet);
      let { row, col } = cell.location;
      const range = sheet.getRange(row, col);
      // sheet.setColumnWidths(col, row, 180);

      // sheet._worksheet.getRange(row, col).setEditable(false);
      console.log("range", range);
      // range.setProtection(true);
      
      // 保护-禁止编辑
      // range.getActiveWorkbook().setEditable(false);

      console.log("data.dragData.name", data.dragData);

      data.recordData[row+'_'+col] = JSON.parse(JSON.stringify(data.dragData));
      let displayCategory = data.dragData.displayCategory;
      if(displayCategory=='RelatedList'){
        console.log("明细表", row, col, data.dragData);
        range.setBackgroundColor(`#EAA721`);
      }
      range.setValue({
        v: data.dragData.label,
        t: 1
      });
      
      insertCellImage(sheet,row, col);
      // 禁用单元格编辑
      // disableCellEdit(cell, sheet);
      
      let subUnitId = cell.location.subUnitId;
      let unitId = cell.location.unitId;

      // 创建保护范围
      const rangeObj = {
        startRow: row,
        startColumn: col,
        endRow: row, // 如果是单个单元格，结束行和开始行相同
        endColumn: col // 如果是单个单元格，结束列和开始列相同
      };
      // 创建保护规则
      const protectionRules = [{
        permissionId: "default_permission_id", // 确保这是不可编辑的权限 ID
        name: "sheet1",
        unitType: 3,
        unitId:  unitId,
        subUnitId:  subUnitId,
        ranges: [rangeObj], // 将范围添加到规则中
        id: 'rule1'
      }];
      // 获取命令服务
      const accessor = univer.__getInjector();
      const commandService = accessor.get(ICommandService);
      
      // console.log("protectionRules", protectionRules);
      // console.log("univerAPI.setPermission", univerAPI.setPermission);

      // 执行命令添加范围保护
      // commandService.executeCommand(AddRangeProtectionMutation.id, {
      //   unitId: unitId,
      //   subUnitId:  subUnitId,
      //   rules: protectionRules
      // });
      // const permissionService = accessor.get(IPermissionService);
      // permissionService.updatePermissionPoint(new WorksheetEditPermission(unitId, subUnitId).id, false);

      // 定义需要保护的单元格，比如第2行第3列
      const protectedCells = [{ row: row, col: col }]; // 自定义要保护的单元格
      
      // 监听单元格进入编辑状态的命令
      // univerAPI.onCommandExecuted((command) => {
      //   if (command.id === 'sheet.operation.set-cell-edit-visible' && command.params.visible) {
      //     const { row, col } = command.params.range.start;

      //     // 检查单元格是否在保护列表中
      //     const isProtected = protectedCells.some(cell => cell.row === row && cell.col === col);

      //     if (isProtected) {
      //       console.log(`Cell at (${row}, ${col}) is protected.`);
      //       // 阻止用户编辑，可以退出编辑模式
      //       univerAPI.getActiveWorkbook().getActiveSheet().exitEditMode();
      //     }
      //   }
      // });
      console.log("data.recordData", data.recordData);


    })
    createA4AreaWithBackground(sheet);
    addRangePerm(univerAPI);
  }
  
  // 添加权限保护区域

  const addRangePerm = async (univerAPI) => {
    const permission = univerAPI.getPermission();
    const sheet = univerAPI.getActiveWorkbook().getActiveSheet();
    const ranges = [];
    let unitId = sheet._worksheet.unitId;
    let subUnitId = sheet._worksheet._sheetId;
    for(let key in data.recordData){
      let row = Number(key.split("_")[0]);
      let col = Number(key.split("_")[1]);
      ranges.push(sheet.getRange(row, col, 1, 1).getRange());
    }
    console.log("unitId, subUnitId, ranges", unitId, subUnitId, ranges);
    const res = await permission.addRangeBaseProtection(unitId, subUnitId, ranges);
    const { permissionId, ruleId } = res;
    permission.setRangeProtectionPermissionPoint(unitId, subUnitId, permissionId, RangeProtectionPermissionEditPoint, false);
    permission.setPermissionDialogVisible(false);
  }
  


  const insertCellImage = (sheet, row, col) => {
    // const imageUrl = "https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png";
    const imageUrl = '@/assets/img/entity.png';
    console.log('sheet, row, col', sheet, row, col);
    const range = sheet.getRange(row, col, 1, 1);
    // range.setStyle({
    //   backgroundImage: `url(${imageUrl})`,
    //   backgroundSize: 'cover',  // 确保图片覆盖整个单元格
    //   backgroundRepeat: 'no-repeat',
    //   backgroundPosition: 'center'
    // });

    // range.setBackgroundColor(`#3399ff`);

    // const img = new Image();
    // img.src = imageUrl;

    // img.onload = function() {
    //     console.log(`图片已加载，将在单元格 (${row}, ${col}) 背景插入图片`);

    //     // 获取单元格的位置 - 你需要根据实际的表格布局调整
    //     const cellX = col * 100;  // 假设单元格宽度为100
    //     const cellY = row * 20;   // 假设单元格高度为20

    //     // 创建一个 div 作为背景图片的容器
    //     const container = document.createElement('div');
    //     container.style.position = 'absolute';
    //     container.style.left = `${cellX}px`;
    //     container.style.top = `${cellY}px`;
    //     container.style.width = '100px';   // 设置背景图片的宽度
    //     container.style.height = '20px';   // 设置背景图片的高度
    //     container.style.backgroundImage = `url(${imageUrl})`;
    //     container.style.backgroundSize = 'cover';

    //     // 将容器添加到表格的容器中
    //     const sheetContainer = document.querySelector('.univer-render-canvas');
    //     sheetContainer.appendChild(container);
    // };
  }

  // 绘制A4纸区域
  const createA4AreaWithBackground = (sheet) => {
    // 假设每个单元格宽度和高度分别为 10 (自定义，按需求调整)
    const cellWidth = 90;
    const cellHeight = 30;

    // A4 纸的像素大小可以根据分辨率和比例来估算
    const a4WidthInCells = Math.floor(210 * 3.78 / cellWidth); // A4纸宽度转换成单元格数
    const a4HeightInCells = Math.floor(297 * 3.78 / cellHeight); // A4纸高度转换成单元格数

    // 选定区域为从(0, 0)到A4大小范围
    const range = sheet.getRange(1, 1, a4HeightInCells, a4WidthInCells-1);
    range.setBackgroundColor('#ffffff');
    
    // 设置边框
    range.setValue({
      s: 'border'
    });
    // let unitId = range._worksheet.unitId;
    // let subUnitId = range._worksheet._sheetId;
    // console.log("unitId1231", unitId, subUnitId);
    // data.univer.__getInjector().get(ICommandService).executeCommand(SetBorderStyleCommand.id, {
    //   unitId,
    //   subUnitId,
    //   borderStyle: {
    //     top: { style: 'thin', color: '#000000' },    // 顶部边框红色
    //     bottom: { style: 'thin', color: '#000000' }, // 底部边框绿色
    //     left: { style: 'thin', color: '#000000' },   // 左边边框蓝色
    //     right: { style: 'thin', color: '#000000' }   // 右边边框黄色
    //   },
    //   rangeData: {
    //     startRow: 0,
    //     endRow: 1,         // 行的范围，从0行到1行 (A1:B2)
    //     startColumn: 0,
    //     endColumn: 1       // 列的范围，从0列到1列
    //   }
    // })
  };

  const disableCellEdit = async (cell, sheet) => {
    let subUnitId = cell.location.subUnitId;
    let unitId = cell.location.unitId;
    console.log("unitId, subUnitId", unitId, subUnitId);
    const permission = data.univerAPI.getPermission();
    const permissionId = await permission.addWorksheetBasePermission(unitId, subUnitId);
    permission.setWorksheetPermissionPoint(unitId, subUnitId, WorksheetEditPermission, false);
  }

  onMounted(() => {
    bus.on('dragData', (res) => {
      data.dragData = res;
    })
    // init();
    setTimeout(()=>{
      if(props.layoutData.formLayout){
        loadUniverData();
      }else {
        init();
      }
    },1000)
    bus.on("label", e=>{
      // console.log("e", e, data.currentKey);
      data.recordData[data.currentKey].label = e;
      let row = data.currentKey.split("_")[0];
      let col = data.currentKey.split("_")[1];
      const sheet = data.univerAPI.getActiveWorkbook().getActiveSheet();
      const range = sheet.getRange(Number(row), Number(col));
      range.setValue({
        v: e,
      });
    })
  })

  const getData = () => {
    const activeWorkbook = data.univerAPI.getActiveWorkbook()
    const saveData = activeWorkbook.save();
    return saveData;
  }

  const handleSaveRelatedField = (params) => {

  }

  const getUniverData = () => {
    return toRaw(data);
  }

  defineExpose({getData, getUniverData})

</script>
<style lang="less">
  #univer-container{
    width: 100%;
    height: 100%;
  }
</style>