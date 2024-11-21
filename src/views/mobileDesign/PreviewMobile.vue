<template>
    <div class="mobileDesign">
        <div class="mobileHeader">
            <div class="title">OA后台管理系统</div>
        </div>
        <div class="mobileDesignBd">
            <div class="mobileContainer">
                <div class="mobileRight">
                    <div class="mobileBox">
                        <div class="formWrap">
                            <transition name="fade" mode="out-in">
                                <div class="list-group">
                                    <div v-for="(item, index) in layoutList" :key="index">
                                        <div class="sections-group" v-if="item.displayCategory=='group'">
                                            <div class="sections-head" @click="item.isShow=!item.isShow">
                                                <span style="color: red;">{{item.label}}</span>
                                                <span>
                                                    <UpOutlined v-if="item.isShow" />
                                                    <DownOutlined v-else />
                                                </span>
                                            </div>
                                            <div class="sections-bd" v-if="item.isShow">
                                                <div class="formItem" v-for="(row, idx) in item.fields" @click="handleSelect(item, index)">
                                                    <div class="listLine">
                                                        <div class="listContent">
                                                            <span class="label"><span class="required"> {{ row.required ? '*' : ''}}</span> {{ row.label }}</span>
                                                            <div class="list-brief" v-if="row.type=='S'">
                                                                <a-input required="row.required" :placeholder="'请输入' + row.label" v-model:value="list[row.id]"></a-input>
                                                            </div>
                                                            <div class="list-brief" v-if="row.type=='N'">
                                                                <a-input type="number" :placeholder="'请输入' + row.label" v-model:value="list[row.id]"></a-input>
                                                            </div>
                                                            <div class="list-brief" v-else-if="row.type=='D'">
                                                                <a-date-picker :placeholder="'请选择' + row.label" v-model:value="list[row.id]" />
                                                            </div>
                                                            <div class="list-brief" v-else-if="row.type=='F'">
                                                                <a-date-picker show-time :placeholder="'请选择' + row.label" v-model:value="list[row.id]" />
                                                            </div>
                                                            <div class="list-brief" v-else-if="row.type=='X'||row.type=='UCS'||row.type=='UC'">
                                                                <a-textarea v-model:value="list[row.id].comments" :placeholder="'请输入' + row.label" :rows="4" />
                                                            </div>
                                                            <div class="list-brief" v-else-if="row.type=='L'||row.type=='LT'||row.type=='DT'">
                                                                <a-select :placeholder="'请选择' + row.label" v-model:value="list[row.id]">
                                                                    <!-- <a-select-option :value="item.value" v-for="(item,index) in select[row.entityApiName].picklistFieldValues[row.id].values" :key="index">{{item.label}}</a-select-option> -->
                                                                </a-select>
                                                            </div>
                                                            <div class="list-brief" v-else-if="row.type=='U'||row.type=='O'">
                                                                <!-- <a-input :placeholder="'请输入' + row.label" readonly v-model:value="list[row.id].Name">
                                                                    <template #suffix>
                                                                        <SearchOutlined @click.stop="handleOpenLook(row, index)" />
                                                                    </template>
                                                                </a-input> -->
                                                                <!-- <div class="inputSearch">
                                                                </div> -->
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="cover" v-if="item.readonly"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-else-if="item.displayCategory=='RelatedList'">
                                            <div class="groupName" v-if="item.relatedList.length==0">
                                                {{item.label}}
                                            </div>
                                            <div class="groupWrap" v-for="(parentItem, parentIdx) in item.relatedList">
                                                <div class="groupName">
                                                    {{item.label}}({{parentIdx+1}})
                                                    <span class="iconDel" @click="handleDeleteChild(item, idx)">
                                                        <DeleteOutlined />
                                                    </span>
                                                </div>
                                                <div class="formItemGroup formItem" :key="parentIdx" :class="{ active: current === index }" @click="handleSelect(item, index)">
                                                    <div class="listLine" v-for="(row, idx) in parentItem.fields" :key="idx">
                                                        <div class="listContent">
                                                            <span class="label"><span class="required"> {{ row.required ? '*' : ''}}</span>{{ row.label }}</span>
                                                            <div class="list-brief" v-if="row.type=='S'">
                                                                <a-input :placeholder="'请输入' + row.label" v-model:value="row.value"></a-input>
                                                            </div>
                                                            <div class="list-brief" v-if="row.type=='N'">
                                                                <a-input type="number" :placeholder="'请输入' + row.label" v-model:value="row.value"></a-input>
                                                            </div>
                                                            <div class="list-brief" v-else-if="row.type=='D'">
                                                                <a-date-picker :placeholder="'请选择' + row.label" v-model:value="row.value" />
                                                            </div>
                                                            <div class="list-brief" v-else-if="row.type=='F'">
                                                                <a-date-picker show-time :placeholder="'请选择' + row.label" v-model:value="row.value" />
                                                            </div>
                                                            <div class="list-brief" v-else-if="row.type=='X'||row.type=='UCS'||row.type=='UC'">
                                                                <a-textarea :placeholder="'请输入' + row.label" :rows="4" v-model:value="row.value" />
                                                            </div>
                                                            <div class="list-brief" v-else-if="row.type=='L'||row.type=='LT'||row.type=='DT'">
                                                                <a-select :placeholder="'请选择' + row.label" v-model:value="row.value">
                                                                    <a-select-option :value="item.value" v-for="(item,index) in select[row.entityApiName].picklistFieldValues[row.id].values" :key="index">{{item.label}}</a-select-option>
                                                                </a-select>
                                                            </div>
                                                            <div class="list-brief" v-else-if="row.type=='U'||row.type=='O'">
                                                                <!-- <a-input :placeholder="'请输入' + row.label" readonly v-model:value="row.value.Name">
                                                                    <template #suffix>
                                                                        <SearchOutlined @click.stop="handleOpenLook(item, index, parentIdx, idx, row)" />
                                                                    </template>
                                                                </a-input> -->
                                                                <a-input></a-input>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="groupAddItem" @click.stop="handleAddChild(item)">
                                                <PlusOutlined /> 增加{{item.label}}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </transition>
                        </div>
                        <div class="overlay" v-if="isDeptModal" @click="handleCloseDeptModal">
                            <div class="modal deptModal" @click.stop>
                                <div class="modalSearch">
                                    <a-input-search v-model:value="value" placeholder="搜索"
                                        @search="onSearch"/>
                                </div>
                                <div class="modalCenter">
                                    <a-tree :tree-data="deptTreeData" :fieldNames="fieldNames" blockNode @select="handleSelectDept">
                                        <template #title="{ text, key }">
                                            <span>{{ text }}</span>
                                        </template>
                                    </a-tree>
                                </div>
                            </div>
                        </div>
                        <div class="overlay" v-if="isLookModal" @click="handleCloseModal">
                            <div class="modal deptModal" @click.stop>
                                <div class="modalSearch">
                                    <a-input-search v-model:value="value" placeholder="搜索"
                                        @search="onSearch"/>
                                </div>
                                <div class="modalCenter">
                                    <!-- <ul class="uls">
                                        <li class="liItem" v-for="(item, index) in lookupList" :key="index" @click="handleSelectLook(item)">
                                            {{ item.Name }}
                                        </li>
                                    </ul> -->
                                    <!-- <table class="tableMobile">
                                        <thead>
                                            <tr>
                                                <th v-for="(item,index) in gridColumns" :key="index">{{ item.Title }}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td v-for="(item,index) in lookupList" :key="index">{{ item.Name }}</td>
                                            </tr>
                                        </tbody>
                                    </table> -->
                                    <a-table :columns="gridColumns" :data-source="lookupList">
                                        <template #headerCell="{ column }">
                                            <span>{{ column.Title }}</span>
                                        </template>
                                        <template #bodyCell="{ column, record, index }">
                                            <template v-if="column.Name === 'IsPinned'">

                                            </template>
                                            <template v-else-if="column.Name === 'Name'">
                                                <a @click="handleSelectLook(record)">{{ record[column.Name] }}</a>
                                            </template>
                                            <template v-else>
                                                {{ record[column.Name] }}
                                            </template>
                                        </template>
                                    </a-table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import {
        UnorderedListOutlined,
        DownOutlined,
        CaretDownOutlined,
        UserOutlined,
        ReadOutlined,
        TabletOutlined,
        UpOutlined,
        PrinterOutlined,
        DesktopOutlined,
        CheckOutlined,
        CopyOutlined,
        DeleteOutlined,
        PlusOutlined,
        SearchOutlined,
    } from "@ant-design/icons-vue";
    import {
        ref,
        watch,
        reactive,
        toRefs,
        onMounted,
        getCurrentInstance,
        onUpdated,
        defineProps,
        nextTick
    } from "vue";
    import { message } from 'ant-design-vue';
    import draggable from "vuedraggable";
    import { useRoute, useRouter } from "vue-router";
    const router = useRouter();
    const route = useRoute();

    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    const props = defineProps({
        formId: String,
    });
    const data = reactive({
        troughdata: [],
        leftCurrent: 0,
        layoutList: [],
        current: "",
        checked: false,
        activeKey: "1",
        languages: [
            {
                id: 1,
                name: "简体中文",
            },
            {
                id: 2,
                name: "English",
            },
            {
                id: 3,
                name: "繁體中文（台灣）",
            },
            {
                id: 4,
                name: "繁體中文（香港）",
            },
        ],
        languageId: 1,
        relatedList: [], // 主子表
        relatedList2: [],
        fieldInfo: {},
        list: {},
        select: {},
        search: {},
        relatedListRecords: [],
        lookupList: [],
        isLookModal: false,
        params: {
            name: "",
            displayCategory: "",
            entityApiName: "",
            index: "",
            childIdx: "",
            idx: "",
            sObjectType: ""
        },
        isDeptModal: false,
        deptTreeData: [],
        fieldNames: {
            children: "children",
            title: "text",
            key: "id"
        },
        gridColumns: [],
        entityId: route.query.entityId
    });
    const {
        troughdata,
        leftCurrent,
        layoutList,
        current,
        checked,
        activeKey,
        languages,
        languageId,
        relatedList,
        relatedList2,
        fieldInfo,
        list,
        select,
        search,
        pickLists,
        relatedListRecords,
        lookupList,
        isLookModal,
        params,
        isDeptModal,
        deptTreeData,
        gridColumns
    } = toRefs(data);
    watch(()=>data.layoutList, (newVal, oldVal)=> {
        console.log(newVal, oldVal);
    }, {deep: true});

    const getTypeImg = (type) => {
        let imgUrl = '';
        if (type == 'S') {
            imgUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAAG1BMVEVHcEwZHiYZHiUaHyMdKCgZHiYaISQYHiQZHiYtE7tIAAAACXRSTlMAZVUSCTQmQxxVUCeiAAAA7ElEQVQoz9WSTW7CQAxGTQIlSz6XDFumvUBSUYklpTkAkXqAgkTXmS5YE1Gp167HM8micwK+ReK8/DzbCtG9Z4oyhTMghRnwmcDeoEugW7jH1NP10bS97SJ8wDVjvdsCfI0eFr+vXyAxAdYl5Wqy5SZ3HD1isUuiAgeiOcJXsSZqSz9DFQ/eI52/8ThIFU6bptmrid7PNsAaGjHl375Q2AYoJoeny2uAMF8SZ8TxPIiKsIyeaQIa4HzQVfVqvIzNzNBpdVTYhgXlWGT4mP5Ce/MD+lhT6D7Ao0feYDoBq53lf+ve3uSpn7v5C/8Auc4hwIODgzAAAAAASUVORK5CYII='
        } else if (type == 'O') {
            imgUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAAFVBMVEUZHiZHcEwXHiYaICYZHSMeHiAdHiYZxZwKAAAAB3RSTlNmAENWMxAi9bjpHAAAAMFJREFUKM/NkkEOgjAQRceWuLYorMGFa4iJa1APAMYegIi9/xH805EElCALTfyL/uQtms6bkhkJTcH2jJRDuCGOGsLQQ/0CdXf8EcRAJz3j8VHGcPlmKclH1M2A4dYnU9K1hysa5An1vpcOBr31xF+BtlIWc1oEdaV7bSiUoQuuNBItVMnCvZCFrL+hKnDuBnhwLgF0rmUIX2vA1JgCENf+CsJRBsgFyJ4a8jYDk3DlsRilmG2X5iLSjzh303/+M3wAUMtDWkvgsyEAAAAASUVORK5CYII='
        } else if (type == 'L' || type == 'DT' || type == 'Y') {
            imgUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAeUExURaamqEdwTKenqaenqaamqaenrKqqqqenqqqqqqenqZuv1oYAAAAKdFJOU/8AlIfiMQZFDL35Dhp+AAAAlElEQVQoz2MQxAIYaCGY7MCABljMGAwYMAAzg0MhumZxFgYshjJQLKiKLhYEcoEaqlgSUKhVgTNRUBDqWmZBQbEJTBEMguIOimBjwEBQUIilEOT3AlZklQHs4AARYkI2UkERLCjKgizoEAgWlEBxKkMjbkGs2rFahM1J2ByP1ZtYAwR70NEgjrAmBqzJBmsCo1fyBgB5lTcf0sPU6QAAAABJRU5ErkJggg=='
        } else if (type == 'D') {
            imgUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAAG1BMVEUZHiVHcEwYHCNISEgZHyYYHycUHCwaJSUZICVNlGYDAAAACXRSTlNlAFEDVjYcC0MdqMEEAAAAy0lEQVQoz73TOw+CMBDA8VPEdrTUxypN3CVgXDU+4oivXRPjXDZGBhO/tkcLpiUqi/rf+C3XNgewF8F7vGz1V29tYOZoHNMnhkFGeIgFkvJQ4eAGjYzEgLmSdmCTIEZgIywQYxB+5uwENpLUE+AizggOInqQxEGyhQg+43E53WXMA40sPWvs3w00+z9Or0WJgerm6vZ1ODkW7b94zrDIxFM5vV1zJJ6KopePzH/5nnMbuzkOiY2yqXZpaaV2KYJK+dbxg22r4NOPUOkBusBGIdKfBoUAAAAASUVORK5CYII='
        } else {
            imgUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAAG1BMVEVHcEwZHiYZHiUaHyMdKCgZHiYaISQYHiQZHiYtE7tIAAAACXRSTlMAZVUSCTQmQxxVUCeiAAAA7ElEQVQoz9WSTW7CQAxGTQIlSz6XDFumvUBSUYklpTkAkXqAgkTXmS5YE1Gp167HM8micwK+ReK8/DzbCtG9Z4oyhTMghRnwmcDeoEugW7jH1NP10bS97SJ8wDVjvdsCfI0eFr+vXyAxAdYl5Wqy5SZ3HD1isUuiAgeiOcJXsSZqSz9DFQ/eI52/8ThIFU6bptmrid7PNsAaGjHl375Q2AYoJoeny2uAMF8SZ8TxPIiKsIyeaQIa4HzQVfVqvIzNzNBpdVTYhgXlWGT4mP5Ce/MD+lhT6D7Ao0feYDoBq53lf+ve3uSpn7v5C/8Auc4hwIODgzAAAAAASUVORK5CYII='
        }
        return imgUrl;
    }
    // 获取布局
    // const getLayoutData = () => {
    //     proxy
    //         .$get(Interface.mobileDesign.renderLayout, {
    //             formId: "",
    //         })
    //         .then((res) => {
    //             let { layoutItems, layoutPicklists, masterRecord } = res.actions[0].returnValue
    //             data.layoutList = layoutItems;
    //             data.select = layoutPicklists;
    //             data.list = masterRecord.record;
    //             data.layoutList.forEach(item=>{
    //                 if(item.displayCategory=='RelatedList'){
    //                     item['is'+item.entityApiName] = false;
    //                     var relatedList = [];
    //                     if(Object.keys(data.relatedListRecords).length){
    //                         data.relatedListRecords[item.entityApiName].entities.forEach(l=>{
    //                             relatedList.push(l.fields)
    //                         });
    //                     }
    //                     item.relatedList = relatedList;
    //                     item.fields.forEach(v=>{
    //                         v.value = '';
    //                         v.index = '';
    //                         if(v.type=='L'||v.type=='DT'||v.type=='LT'){
    //                             var picklistFieldValues = [];
    //                             picklistFieldValues = data.select[item.entityApiName].picklistFieldValues[v.id].values;
    //                             v.picklistFieldValues = picklistFieldValues;
    //                         }
    //                     })
    //                 }
    //             })
    //         });
    // };
    const getTroughdata = () => {
        proxy.$get(Interface.formbuilder.troughData, {
            type: data.entityId,
        }).then((res) => {
            data.troughdata = res.filter(item=>item.displayCategory!='RelatedList').map(item=>{
                item.typeImg = getTypeImg(item.type);
                return item;
            });
            data.relatedList = res.filter(item=>item.displayCategory=='RelatedList').map(item=>{
                item.isCollapsed = true;
                item.fields = [];
                return item;
            });
            getLayoutData();
            // console.log("relatedList:", data.relatedList);
            // data.relatedList2 = JSON.parse(JSON.stringify(data.relatedList));
        });
    };
    const getLayoutData = () => {
        // proxy.$get(Interface.mobileDesign.layout, {
        //         formId: "",
        //     })
        //     .then((res) => {
        //         data.layoutList = res;
        //         data.fieldInfo = res[0];
        //     });
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
            let { WapLayoutFields } = res.actions[0].returnValue.fields;
            let layoutData = JSON.parse(WapLayoutFields.value);
            console.log("layoutData", layoutData);
            let { relatedLists, sections } = layoutData;

            if(relatedLists && relatedLists.length){
                let relatedArr = data.relatedList.filter((item, index)=>{
                    return relatedLists.find(row=>{
                        if(row.id==item.id){
                            item.fields = row.selectableColumns;
                            return row;
                        }
                    })
                });
                for(let i = 0; i < relatedLists.length; i++){
                    let index = data.relatedList.findIndex(item=>item.id==relatedLists[i].id);
                    if(index!=-1){
                        data.relatedList.splice(index, 1);
                        i--;
                    }
                }
                relatedArr.forEach(item=>{
                    data.layoutList.push({
                        id: item.id,
                        label: item.label,
                        displayCategory: item.displayCategory,
                        fields: item.fields,
                        relatedList: relatedArr
                    });
                });
            }

            if(sections && sections.length){
                let sectionsList = [];
                sections.forEach(item=>{
                    let fields = [];
                    for(let i = 0; i < item.columns.length; i++){
                        const column = item.columns[i];
                        const index = data.troughdata.findIndex(trough => trough.id === column.id);
                        if (index !== -1) {
                            data.troughdata[index].label = column.label;
                            data.troughdata[index].required = column.required;
                            data.troughdata[index].readonly = column.readonly;
                            fields.push(data.troughdata[index]);
                            data.troughdata.splice(index, 1);
                        }
                    }
                    // console.log("fields", fields);
                    sectionsList.push({
                        label: item.sectionName,
                        id: item.sectionId,
                        displayCategory: "group",
                        isEdit: false,
                        fields: fields,
                        isShow: true
                    })
                })
                sectionsList.forEach(item=>{
                    data.layoutList.push(item);
                })
            }
            console.log("layoutList:", data.layoutList);
        })  
    };
    // getLayoutData();
    getTroughdata();

    const handleSelect = (item, index) => {
        console.log("item", item);
        data.current = index;
        data.fieldInfo = item;
    };
    const handleLeftTab = (index) => {
        data.leftCurrent = index;
    };
    // 选择语言
    const handleMenuLanguage = (e) => {
        data.languageId = e.key;
    };
    // 复制
    const handleCopy = (item, index) => {
        const copyData = JSON.parse(JSON.stringify(item));
        data.layoutList.splice(index + 1, 0, copyData);
    };
    // 删除字段
    const handleDeleteFieldItem = (item, index) => {
        data.layoutList.splice(index, 1);
    };
    const handleCollapsed = (item) => {
        item.isCollapsed = !item.isCollapsed;
    }
    const cloneElement = (item) => {
        return item.cloneNode(true);
    }
    // 删除子表字段
    const handleDeleteFieldChildItem = (item, index) => {
        // console.log("item", item, index);
        // let entityApiName = item.entityApiName;
        // let idx = data.layoutList.findIndex(row=>row.entityApiName == entityApiName);
        // data.layoutList[idx].fields.splice(index, 1);
    };
    // 保存/发布
    const handleSave = () => {
        let arr = JSON.parse(JSON.stringify(data.layoutList));
        let formData = JSON.stringify(arr);
        proxy.$get(Interface.mobileDesign.save,{
            formId: "",
            formData: formData
        }).then(res=>{
            Toast("发布成功！");
        })
    };
    // 增加子表
    const handleAddChild = (item) => {
        console.log("item", item);
        var fields = JSON.parse(JSON.stringify(item.fields));
        fields.forEach(row=>{
            row.value = '';
        })
        item.relatedList.push({
            fields: fields
        })
    };

    // 主表
    const handleOpenLook = (item, index, childIdx, idx, row) => {
        console.log('row',row);
        data.params.name = item.id;
        data.params.displayCategory = item.displayCategory;
        data.params.entityApiName = item.entityApiName;
        data.params.index = index;
        data.params.sObjectType = item.sObjectType;
        data.params.childIdx = childIdx;
        data.params.idx = idx;
        // getLookup(item.sObjectType);
        getLookupFilter(item.sObjectType);
        if(item.displayCategory!='RelatedList'){
            if(item.sObjectType==10 ){
                data.isDeptModal = true;
            }else if(item.sObjectType==8 || item.sObjectType==10020){
                data.isLookModal = true;
            }else {
                data.isLookModal = true;
            }
        }else {
            if(row.sObjectType==10){
                data.isDeptModal = true;
            }else if(row.sObjectType==8 || row.sObjectType==10020){
                data.isLookModal = true;
            }else {
                data.isLookModal = true;
            }
        }
    };

    const getLookup = (lktp) => {
        proxy.$get(Interface.mobileDesign.lookup,{
            lktp: lktp,
            lksrch: ""
        }).then(res=>{
            data.lookupList = res.listData;
        })
    };
    const getLookupFilter = (lktp) => {
        proxy.$get(Interface.mobileDesign.lookupFilter,{
            objecttypecode: lktp,
        }).then(res=>{
            data.gridColumns = res.returnValue.GridColumns;
            getLookupSearch();
        })
    };

    const getLookupSearch = (lktp) => {
        proxy.$get(Interface.mobileDesign.lookupSearch,{
            objecttypecode: lktp,
            page: 1,
            rows: 10,
            search: ""
        }).then(res=>{
            data.lookupList = res.rows;
        })
    };
    getLookupFilter();
    const handleCloseModal = () => {
        data.isLookModal = false;
    };

    // 查找条件-选择
    const handleSelectLook = (item) => {
        console.log("item", item);
        console.log("data.params", data.params);
        let { name, displayCategory, index, childIdx, idx } = data.params;
        if(displayCategory!='RelatedList'){
            data.list[name] = {
                Id: item.LIST_RECORD_ID,
                Name: item.Name
            };
        }else {
            data.layoutList[index].relatedList[childIdx].fields[idx].value = {
                Id: item.LIST_RECORD_ID,
                Name: item.Name
            };
            // console.log("data.layoutList[index].relatedList.fields[childIdx][idx][name]", data.layoutList[index].relatedList[childIdx].fields[idx].value);
        };
        data.isLookModal = false;
    };
    const formTreeData = (list) => {
        var result = [];
        if (!Array.isArray(list)) {
            return result;
        }
        var map = {};
        list.forEach(function (item) {
            map[item.id] = item;
        });
        list.forEach(function (item) {
            var parent = map[item.pid];
            if (parent) {
                parent.children = parent.children || [];
                parent.children.push(item);
            } else {
                result.push(item);
            }
        });
        return result;
    };
    const getTreeData = () => {
        proxy.$get(Interface.mobileDesign.tree,{
            entity: "organizationtree",
            search: ""
        }).then(res=>{
            data.deptTreeData = formTreeData(res.rows);
            console.log('data.deptTreeData',data.deptTreeData);
        })
    };
    getTreeData();
    
    // 选择部门
    const handleSelectDept = (e, node) => {
        // console.log("e",e, node);
        // let id = node.node.id;
        // let name = node.node.text;
        let { name, displayCategory, index, childIdx, idx } = data.params;
        if(displayCategory!='RelatedList'){
            data.list[name] = {
                Id: node.node.id,
                Name: node.node.text
            };
        }else {
            // data.layoutList[index].relatedList.fields[childIdx][name] = {
            //     Id: node.node.id,
            //     Name: node.node.text
            // };
            data.layoutList[index].relatedList[childIdx].fields[idx].value = {
                Id: node.node.id,
                Name: node.node.text
            };
        };
        data.isDeptModal = false;
    };
    const handleCloseDeptModal = () => {
        data.isDeptModal = false;
    };
    // 删除子表
    const handleDeleteChild = (item, idx) => {
        console.log(item);
        item.relatedList.splice(idx, 1);
    };
</script>
<style lang="less" scoped>
    .icon {
        display: inline-block;
        width: 20px;
        height: 20px;
        img {
            width: 100%;
            height: 100%;
        }
    }

    .mobileDesign {
        background: #f5f5f7;

        .mobileHeader {
            height: 60px;
            background: var(--backColor);
            text-align: right;
            line-height: 60px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .title {
                padding-left: 20px;
                color: #fff;
                cursor: pointer;
            }
        }

        .mobileDesignBd {
            height: calc(~"100vh - 60px");
            overflow: auto;
            padding: 0 15px;

            .bdHeader {
                z-index: 101;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: space-between;
                height: 54px;
                padding: 0 20px 0 20px;
                background: #fff;
                box-shadow: 0 1px 4px 0 rgba(17, 31, 44, 0.04);
                margin: 15px 0 0 0;

                .stepTabs {
                    .setpTab {
                        color: #0091ff;
                        font-size: 14px;
                        cursor: pointer;

                        .roundNum {
                            display: inline-block;
                            background: #0091ff;
                            border: 1px solid #0091ff;
                            font-weight: normal;
                            width: 16px;
                            height: 16px;
                            line-height: 14px;
                            font-size: 12px;
                            margin-right: 6px;
                            border-radius: 50%;
                            color: #fff;
                            text-align: center;
                        }
                    }
                }
            }

            .mobileContainer {
                display: flex;
                height: 100%;

                .mobileLeft {
                    display: flex;

                    .editorMenuTab {
                        width: 44px;
                        z-index: 999;
                        box-shadow: 1px 0 0 0 rgba(126, 134, 142, 0.16);
                        background: #fff;
                        padding-top: 20px;

                        .editorMenuTabItem {
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            margin-bottom: 20px;
                            cursor: pointer;
                            font-size: 12px;
                            color: #111f2c;
                            line-height: 18px;

                            svg {
                                position: relative;
                                right: 0.5px;
                                margin-bottom: 2px;
                                font-size: 15px;
                            }

                            &.active {
                                color: #007fff;
                                font-weight: 500;
                            }
                        }
                    }
                }

                .controlWrap {
                    width: 300px;
                    height: 100%;
                    border-right: 1px solid #e2e3e5;
                    background: #fff;

                    .mobileTabs {
                        width: 100%;
                        height: 45px;
                        position: relative;
                        z-index: 99;

                        /* border-bottom: 1px solid rgba(126, 134, 142, 0.16); */
                        .label {
                            width: 100%;
                            display: inline-block;
                            z-index: 99;
                            padding: 0 12px;
                            font-weight: 600;
                            font-size: 14px;
                            color: #171a1d;
                            text-align: left;
                            line-height: 45px;
                            border-bottom: 1px solid rgba(126, 134, 142, 0.16);
                        }
                    }

                    .mobileLeftCont {
                        height: calc(~"100% - 40px");
                        overflow-y: auto;
                        padding: 0 10px;
                        .fieldList {
                            width: 100%;
                            padding: 10px 0;
                            display: flex;
                            flex-wrap: wrap;
                            justify-content: space-between;

                            .fieldItem {
                                width: calc(~"50% - 4px");
                                height: 40px;
                                margin-bottom: 8px;
                                border: 1px solid rgba(17, 31, 44, 0.08);
                                border-radius: 8px;
                                display: flex;
                                align-items: center;
                                justify-content: space-between;
                                cursor: grab;
                                padding: 0 10px;

                                &:hover {
                                    border-color: #0089ff;
                                    box-shadow: 0 4px 8px 0 rgba(17, 31, 44, 0.08);
                                }

                                .label {
                                    font-size: 12px;
                                    color: rgba(17, 31, 44, 0.85);
                                }

                                .icon {
                                    display: inline-block;
                                    width: 20px;
                                    height: 20px;

                                    img {
                                        width: 100%;
                                        height: 100%;
                                    }
                                }
                            }
                        }
                        .groupItemHead{
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            font-size: 12px;
                            padding-bottom: 8px;
                            margin-top: 20px;
                            &.active{
                                box-shadow: 0 1px 0 0 rgba(126, 134, 142, 0.16);
                            }
                            .iconArrow{
                                color: rgba(23, 26, 29, 0.6);
                                cursor: pointer;
                                &.active{
                                    transform: rotate(180deg);
                                }
                            }
                        }
                        .groupItem:first-child .groupItemHead{
                            margin-top: 0;
                        }
                    }
                }

                .mobileRight {
                    flex: 1;

                    /* position: relative;
                    display: flex;
                    justify-content: center;
                    align-items: center; */
                    position: relative;
                    .centerHead {
                        background-color: #fff;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        width: 100%;
                        height: 45px;
                        flex: none;
                        padding: 0 20px;
                        background: #fafafb;
                        border-bottom: 1px solid #ebecee;

                        .backOptions .ant-btn.btnLink:hover {
                            color: #0091ff !important;
                        }
                    }

                    .mobileBox {
                        width: 360px;
                        height: 100%;
                        max-height: 640px;
                        border: 1px solid rgba(17, 31, 44, 0.08);
                        box-shadow: 0 8px 40px 0 rgba(17, 31, 44, 0.12);
                        border-radius: 24px;
                        padding: 0 10px;
                        background: #fff;
                        box-sizing: border-box;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        /* margin: 20px auto; */
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);

                        .formWrap {
                            width: 100%;
                            height: calc(~"100% - 20px");
                            /* padding: 12px 1px 100px; */
                            /* padding: 12px 1px 0px; */
                            background: #f2f4f5;
                            border-radius: 14px;
                            overflow-y: auto;
                            position: relative;
                            .formItem {
                                /* padding-left: 16px; */
                                min-height: 56px;
                                margin-bottom: 16px;
                                /* border-left: 3px solid #fff; */
                                transition: 0.3s all ease;
                                background: #fff;
                                position: relative;

                                .cover {
                                    position: absolute;
                                    z-index: 99;
                                    left: 0;
                                    top: 0;
                                    width: 100%;
                                    height: 100%;
                                    background: transparent;
                                }

                                .operateBox {
                                    z-index: 100;
                                    position: absolute;
                                    top: 8px;
                                    right: 16px;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    padding: 4px 8px;
                                    border-radius: 16px;
                                    background: rgba(17, 31, 44, 0.04);

                                    .iconAction {
                                        display: flex;
                                        align-items: center;
                                        justify-content: center;
                                        cursor: pointer;
                                        font-size: 12px;

                                        &:hover {
                                            color: #0091ff;
                                        }
                                    }
                                }

                                /* &:hover {
                                    z-index: 99;
                                    border-left: 3px solid #bfc1c2;
                                    box-shadow: 0 1px 10px 0 rgba(226, 226, 226, 0.5);
                                    cursor: grab;
                                }

                                &.active {
                                    z-index: 999;
                                    border-left: 3px solid #0089ff !important;
                                    box-shadow: 0 1px 10px 0 rgba(226, 226, 226, 0.5);
                                    border-radius: 0;
                                } */

                                .listLine {
                                    position: relative;
                                    padding: 10px 16px 10px 0;

                                    label {
                                        font-size: 17px;
                                        color: #171a1d;
                                        line-height: 24px;
                                    }

                                    .list-brief {
                                        margin-top: 4px;
                                        padding-left: 20px;
                                        input, .ant-input, .ant-select {
                                            /* font-size: 17px; */
                                            line-height: 24px;
                                            padding-left: 0;
                                            padding-right: 0;
                                            display: block;
                                            border: none;
                                            width: 100%;
                                            outline: 0;
                                        }
                                        .ant-input:focus{
                                            box-shadow: none !important;
                                        }
                                        .ant-picker{
                                            width: 100% !important;
                                            border:none !important; 
                                        }
                                        :where(.css-dev-only-do-not-override-kqecok).ant-picker-focused{
                                            box-shadow: none !important;
                                        }
                                        :where(.css-dev-only-do-not-override-kqecok).ant-picker{
                                            padding: 0 !important;
                                        }
                                        :deep :where(.css-dev-only-do-not-override-kqecok).ant-picker .ant-picker-input >input{
                                            /* font-size: 17px !important; */
                                        }
                                        :deep :where(.css-dev-only-do-not-override-kqecok).ant-select:not(.ant-select-customize-input) .ant-select-selector{
                                            border: none !important;
                                            box-shadow: none !important;
                                            padding: 0 !important;
                                            /* font-size: 17px !important; */
                                        }
                                        :where(.css-dev-only-do-not-override-kqecok).ant-input-affix-wrapper{
                                            border: none;
                                            padding: 4px 0!important;
                                        }
                                        :where(.css-dev-only-do-not-override-kqecok).ant-input-affix-wrapper:focus{
                                            box-shadow: none !important;
                                        }
                                    }
                                }
                            }
                            .groupName{
                                color: #ccc;
                                padding: 15px 15px 15px 15px;
                                font-size: 14px;
                                display: flex;
                                align-items: center;
                                justify-content: space-between;
                                cursor: pointer;
                                color: #333;
                            }
                            .formItemGroup{
                                /* border-left: 3px solid #fff;
                                box-shadow: 0 1px 10px 0 rgba(226, 226, 226, 0.5); */
                                border-radius: 0;
                                min-height: 38px;
                                /* margin-bottom: 16px; */
                                margin-bottom: 0 !important;
                                cursor: grab;
                                /* &:hover {
                                    z-index: 99;
                                    border-left: 3px solid #bfc1c2;
                                    box-shadow: 0 1px 10px 0 rgba(226, 226, 226, 0.5);
                                    cursor: grab;
                                }

                                &.active {
                                    z-index: 999;
                                    border-left: 3px solid #0089ff !important;
                                    box-shadow: 0 1px 10px 0 rgba(226, 226, 226, 0.5);
                                    border-radius: 0;
                                } */
                                
                                .groupItem{
                                    width: 100%;
                                    height: 44px;
                                    /* left: 44px; */
                                    padding: 0 16px;
                                    border-bottom: 1px solid rgba(25, 31, 37, 0.08);
                                    display: flex;
                                    justify-content: space-between;
                                    align-items: center;
                                    background: #fff;
                                    position: relative;
                                    &:hover .operateBox{
                                        visibility: visible;
                                    }
                                    .operateBox {
                                        z-index: 100;
                                        position: absolute;
                                        top: 8px;
                                        right: 16px;
                                        display: flex;
                                        align-items: center;
                                        justify-content: center;
                                        padding: 4px 8px;
                                        border-radius: 16px;
                                        background: rgba(17, 31, 44, 0.04);
                                        visibility: hidden;
                                        .iconAction {
                                            display: flex;
                                            align-items: center;
                                            justify-content: center;
                                            cursor: pointer;
                                            font-size: 12px;
                                            &:hover {
                                                color: #0091ff;
                                            }
                                        }
                                    }
                                }
                                .listLine{
                                    border-bottom: 1px solid #e2e3e5;
                                    .listContent{
                                        .list-brief{
                                            padding-left: 16px;
                                        }
                                    }
                                }
                            }
                            .groupWrap:last-child{
                                margin-bottom: 16px;
                            }
                            .groupAddItem{
                                line-height: 40px;
                                text-align: center;
                                cursor: pointer;
                                color: #007fff;
                                background: #fff;
                            }
                            .groupAddItem:last-child{
                                margin-bottom: 16px !important;
                            }
                            .emptyRelated{
                                line-height: 56px;
                                height: 56px;
                                background-color: #ddeff3;
                                text-align: center;
                                color: #999;
                                font-size: 12px;
                            }
                        }

                        .formWrap::-webkit-scrollbar {
                            width: 4px;
                            height: 4px;
                            background-color: #f8f8f8;
                        }

                        .formWrap::-webkit-scrollbar-thumb {
                            border-radius: 16px;
                            background-color: #e8e8e8;
                        }
                    }
                }

                .cardInfoWrap {
                    width: 300px;
                    height: 100%;
                    background: #fff;
                    border-left: 1px solid #ecedef;
                    /* position: absolute; */
                    right: 0;
                    overflow: auto;

                    .cardHead {
                        height: 45px;
                        padding: 0 12px;
                        font-size: 14px;
                        color: rgba(0, 0, 0, 0.85);
                        font-weight: 500;
                        border-bottom: 1px solid #f0f0f0;
                        border-radius: 2px 2px 0 0;
                        display: flex;
                        align-items: center;

                        .title {
                            padding-left: 10px;
                        }
                    }

                    .cardBody {
                        padding: 12px;

                        .rowForm {
                            margin-bottom: 24px;

                            .label {
                                display: flex;
                                align-items: center;
                                flex-wrap: wrap;
                                margin-bottom: 6px;
                                font-size: 14px;

                                .tips {
                                    font-size: 12px;
                                    color: rgba(25, 31, 37, 0.4);
                                    line-height: 18px;
                                    padding-left: 8px;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    .ghost {
        height: 3px !important;
        width: 100% !important;
        background-color: #007fff;
        overflow: hidden;
        margin: 10px 0;
        padding: 0;
        box-sizing: border-box;
        min-height: 0 !important;
        border: 0 !important;
    }
    .ghost .formItem{
        display: none !important;
    }
    .ghost .groupItem{
        display: none !important;
    }
    .required{
        color: red;
        font-size: 14px;
        display: inline-block;
        width: 15px;
        text-align: center;
    }
    .overlay{
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10000;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.7);
    }
    .modal{
        position: absolute;
        bottom: 0;
        width: 100%;
        min-height: 580px;
        max-height: 580px;
        background: #fff;
        border-radius: 4px 4px 0 0;
        z-index: 99999;
        overflow-y: auto;
        .modalSearch{
            padding: 10px;
        }
        .modalCenter{
            .uls{
                list-style: none;
                .liItem{
                    padding: 16.5px;
                    color: #333333;
                    font-size: 14px;
                    display: flex;
                    justify-content: space-between;
                    cursor: pointer;
                }
            }   
        }
    }
    .tableMobile{
        padding: 0 10px;
        thead{
            
        }
    }
    .sections-group{
        .sections-head{
            padding: 12px 8px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: pointer;
        }
    }
</style>