import request from "@/utils/request.js";
import Interface from "@/utils/Interface";

/**  
 * 获取对象字段下拉选项数据  
 * @param {string} objectApiName - 当前对象名称  
 * @returns {Promise<any>} returnValue - 返回下拉选项数据  
 */  
export const getPickerList = async (objectApiName) => {
    let obj = {
        actions: [{
            id: "2320;a",
            descriptor: "",
            callingDescriptor: "UNKNOWN",
            params: {
                objectApiName: objectApiName,
                recordTypeId: ""
            }
        }]
    }
    let d = {
        message: JSON.stringify(obj)
    }
    try {
        const res = await request.$post(Interface.pickListValues, d);
        let returnValue = res.actions[0].returnValue;
        return returnValue;
    } catch (error) {
        // 捕获并处理错误
        console.error('获取 picker 列表失败:', error);
        throw error;
    }
}
/**
 * 获取通用列表数据  
 * @param { string } entityName - 当前对象名称
 * @param { string } objectTypeCode - 当前对象代码
 * @returns {Promise<any>} nodes - 返回列表数据 
 */
 
export const getCommonNodesQuery = async (entityName, objectTypeCode, params) => {
    let d = {
        filterId: "",
        entityName: entityName,
        objectTypeCode: objectTypeCode,
        rows: 1000,
        page: 1
    }
    d = Object.assign(d, params);
    try {
        const res = await request.$post(Interface.list2, d);
        let nodes = res.nodes;
        return res;
    } catch (error) {
        // 捕获并处理错误
        throw error;
    }
}

/**
 * @param { string } id - 当前id
 * @param { string } apiName - 当前对象名称
 */

export const getCommonDetail = async (id, apiName) => {
    let obj = {
        actions:[{
            id: "4270;a",
            descriptor: "aura://RecordUiController/ACTION$getRecordWithFields",
            callingDescriptor: "UNKNOWN",
            params: {
                recordId: id,
                apiName: apiName
            }
        }]
    }
    let d = {
        message: JSON.stringify(obj)
    }
    try {
        const res = await request.$post(Interface.detail, d);
        let returnValue;
        if(res && res.actions.length && res.actions[0].returnValue){
            returnValue = res.actions[0].returnValue;
        }
        return returnValue;
    } catch (error) {
        // 捕获并处理错误
        throw error;
    }
}

/**
 * 查找字段 - 获取目标对象映射字段值
 * @param { string } objectApiName - 当前对象名称
 * @param { string } objectFieldName - 当前查找字段名称
 * @param { string } objectFieldValue - 当前查找字段value值
 * @param { string } targetApiName - 当前字段目标对象名
 * @param { string } targetObjectTypeCode - 当前字段目标对象code
 */

export const getMapFieldValues = async (objectApiName, objectFieldName, objectFieldValue, targetApiName, targetObjectTypeCode) => {
    try{
        let obj = {
            actions:[{
                id: "2919;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    objectApiName: objectApiName,
                    objectFieldName: objectFieldName,
                    objectFieldValue: objectFieldValue,
                    targetApiName: targetApiName,
                    targetObjectTypeCode: targetObjectTypeCode,
                }
            }]
        }
        let d = {
            message: JSON.stringify(obj)
        }
        let result;
        const res = await request.$post(Interface.getMapFieldValues, d);
        if(res &&  res.actions && res.actions[0]?.returnValue){
            result = res.actions[0].returnValue;
        }
        return result;
    }catch (error) {
        throw error;
    }
}