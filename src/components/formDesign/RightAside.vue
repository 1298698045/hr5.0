<template>
    <div class="de-rs" :class="{'hidden':!isRightAside}">
        <div class="menu-tab">
            <div class="menu-list">
                <div class="menu-list-item" :class="{'acitve':current==0}" @click="handleTab(0)">
                    <span class="menu-list-item-content ">组件设置</span>
                </div>
                <div class="menu-list-item" :class="{'acitve':current==1}" @click="handleTab(1)">
                    <span class="menu-list-item-content">组件样式</span>
                </div>
            </div>
        </div>
        <div class="de-rs-content" :class="{'noPadding':current==1}">
            <div class="de-attr-panel-container" v-if="current==0">
                <div class="spin-container">
                    <a-form :labelWrap="true">
                        <div class="collapse">
                            <div class="collapse_title" @click="isFieldAttr=!isFieldAttr">
                                <span class="collspase_icon">
                                    <CaretDownOutlined v-if="isFieldAttr" />
                                    <CaretRightOutlined v-else />
                                </span>
                                字段属性
                            </div>
                            <div class="collapse_content" v-if="isFieldAttr">
                                <a-form-item label="字段名称" :labelCol="{span: 24}">
                                    <a-input v-model:value="formState.label" @input="changeName">
                                        <template #suffix>
                                            <GlobalOutlined style="color: #999;" />
                                        </template>
                                    </a-input>
                                </a-form-item>
                                <a-form-item label="数据key" :labelCol="{span: 24}">
                                    <a-input disabled v-model:value="formState.name"></a-input>
                                </a-form-item>
                                <a-form-item label="数据库字段名称" :labelCol="{span: 24}">
                                    <a-input disabled v-model:value="formState.name"></a-input>
                                </a-form-item>
                                <a-form-item label="描述" :labelCol="{span: 24}">
                                    <a-input v-model:value="formState.helpText">
                                        <template #suffix>
                                            <GlobalOutlined style="color: #999;" />
                                        </template>
                                    </a-input>
                                </a-form-item>
                                <a-form-item label="描述显示" :labelCol="{span: 24}">
                                    <a-radio-group v-model:value="formState.descShow">
                                        <a-radio value="1">平铺显示</a-radio>
                                        <a-radio value="2">问号提示</a-radio>
                                    </a-radio-group>
                                </a-form-item>
                                <a-form-item label="编号选项" :labelCol="{span: 24}">
                                    <a-radio-group v-model:value="formState.codeNumber">
                                        <a-radio :style="radioStyle" value="1">统一编号</a-radio>
                                        <a-radio :style="radioStyle" value="2">根据选项控件</a-radio>
                                    </a-radio-group>
                                </a-form-item>
                                <a-form-item label="日期选项" :labelCol="{span: 24}">
                                    <a-radio-group v-model:value="formState.dateOption">
                                        <a-radio :style="radioStyle" value="1">系统日期</a-radio>
                                        <a-radio :style="radioStyle" value="2">日期控件</a-radio>
                                    </a-radio-group>
                                </a-form-item>
                                <a-form-item label="日期规则" label-width="100">
                                    <div class="formContent">
                                        <a-select style="width: 100px;" v-model:value="formState.dateRule">
                                            <a-select-option value="year">年</a-select-option>
                                            <a-select-option value="ym">年月</a-select-option>
                                            <a-select-option value="ymd">年月日</a-select-option>
                                        </a-select>
                                    </div>
                                </a-form-item>
                                <a-form-item label="重复周期">
                                    <div class="formContent">
                                        <a-select style="width: 100px;" v-model:value="formState.repeatPeriod">
                                            <a-select-option value="year">年</a-select-option>
                                            <a-select-option value="ym">月</a-select-option>
                                            <a-select-option value="ymd">日</a-select-option>
                                        </a-select>
                                    </div>
                                </a-form-item>
                                <a-form-item label="日期规则">
                                    <div class="formContent">
                                        <a-select style="width: 100px;">
                                            <a-select-option v-for="item in 10" :value="item">{{item}}</a-select-option>
                                        </a-select>
                                    </div>
                                </a-form-item>
                                <a-form-item label="编号位数">
                                    <div class="formContent">
                                        <a-select style="width: 100px;">
                                            <a-select-option v-for="item in 10" :value="item">{{item}}</a-select-option>
                                        </a-select>
                                    </div>
                                </a-form-item>
                                <a-form-item label="前缀" :labelCol="{span: 24}">
                                    <a-select style="width: 100px;">
                                        <a-select-option v-for="item in 10" :value="item">{{item}}</a-select-option>
                                    </a-select>
                                    <span class="icon">
                                        <PlusCircleOutlined v-if="!isPrev" @click="isPrev=true" />
                                        <MinusCircleOutlined v-else @click="isPrev=false" />
                                    </span>
                                    <div v-if="isPrev" style="margin-top: 5px;">
                                        <a-select style="width: 100px;">
                                            <a-select-option v-for="item in 10" :value="item">{{item}}</a-select-option>
                                        </a-select>
                                        <span class="icon">
                                            <MinusCircleOutlined @click="isPrev=false" />
                                        </span>
                                    </div>
                                </a-form-item>
                                <a-form-item label="后缀" :labelCol="{span: 24}">
                                    <a-select style="width: 100px;">
                                        <a-select-option v-for="item in 10" :value="item">{{item}}</a-select-option>
                                    </a-select>
                                    <span class="icon">
                                        <PlusCircleOutlined v-if="!isAfter" @click="isAfter=true" />
                                        <MinusCircleOutlined v-else @click="isAfter=false" />
                                    </span>
                                    <div v-if="isAfter" style="margin-top: 5px;">
                                        <a-select style="width: 100px;">
                                            <a-select-option v-for="item in 10" :value="item">{{item}}</a-select-option>
                                        </a-select>
                                        <span class="icon">
                                            <MinusCircleOutlined @click="isAfter=false" />
                                        </span>
                                    </div>
                                </a-form-item>
                                <a-form-item label="起始编号">
                                    <div class="formContent">
                                        <a-input style="width: 100px;"></a-input>
                                    </div>
                                </a-form-item>
                                <a-form-item label="连接符">
                                    <div class="formContent">
                                        <a-input style="width: 100px;"></a-input>
                                    </div>
                                </a-form-item>
                            </div>
                        </div>
                        <div class="collapse">
                            <div class="collapse_title" @click="isLayoutAttr=!isLayoutAttr">
                                <span class="collspase_icon">
                                    <CaretDownOutlined v-if="isLayoutAttr" />
                                    <CaretRightOutlined v-else />
                                </span>
                                布局属性
                            </div>
                            <div class="collapse_content" v-if="isLayoutAttr">
                                <a-form-item label="读写属性" :labelCol="{span: 24}">
                                    <a-checkbox v-model:checked="formState.readWrite">显示</a-checkbox>
                                </a-form-item>
                                <a-form-item label="自定义标题">
                                    <div style="width: 100%;text-align: right;">
                                        <a-switch size="small" v-model:checked="formState.defaultTitle"></a-switch>
                                    </div>
                                </a-form-item>
                            </div>
                        </div>
                    </a-form>
                </div>
            </div>
            <div class="de-attr-panel-container" v-if="current==1">
                <div class="spin-container">
                    <div class="ebde-config-panel-style">
                        <div class="ebde-config-panel-style-group">
                            <div>
                                <span class="active">组件</span>
                            </div>
                        </div>
                        <div class="ebde-config-panel-style-content">
                            <div class="ebde-style-custom">
                                <div class="ebde-style-custom-title">
                                    <div><span>自定义样式</span></div>
                                    <a-switch size="small" v-model:checked="isDefaultStyle"></a-switch>
                                </div>
                                <div v-if="isDefaultStyle">
                                    <div class="ebde-style-config-custom">
                                        <div class="ebde-style-config-custom">
                                            <div class="ebde-stylib-config-custom">
                                                <a-form :label-col="labelCol">
                                                    <div class="collapse">
                                                        <div class="collapse_title" @click="isDescStyle=!isDescStyle">
                                                            <span class="collspase_icon">
                                                                <CaretDownOutlined v-if="isDescStyle" />
                                                                <CaretRightOutlined v-else />
                                                            </span>
                                                            描述
                                                        </div>
                                                        <div class="collapse_content" v-show="isDescStyle">
                                                            <a-form-item label="字体">
                                                                <a-select v-model:value="componentStyle.desc.ff">
                                                                    <a-select-option value="year">默认</a-select-option>
                                                                    <a-select-option value="ym">宋体</a-select-option>
                                                                    <a-select-option value="ymd">微软雅黑</a-select-option>
                                                                </a-select>
                                                            </a-form-item>
                                                            <a-form-item label="字号">
                                                                <a-select v-model:value="componentStyle.desc.fs">
                                                                    <a-select-option value="year">12px</a-select-option>
                                                                    <a-select-option value="ym">14px</a-select-option>
                                                                    <a-select-option value="ymd">16px</a-select-option>
                                                                </a-select>
                                                            </a-form-item>
                                                            <a-form-item label="字重">
                                                                <a-select v-model:value="componentStyle.desc.fw">
                                                                    <a-select-option value="year">100 - Thin</a-select-option>
                                                                    <a-select-option value="ym">200 - Extra Light</a-select-option>
                                                                    <a-select-option value="ymd">200 - Extra Light</a-select-option>
                                                                </a-select>
                                                            </a-form-item>
                                                            <a-form-item label="颜色">
                                                                <InputColor :color="componentStyle.desc.color"/>
                                                            </a-form-item>
                                                            <a-form-item label="倾斜">
                                                                <div class="formSwitch">
                                                                    <div class="ebcoms-font-style">
                                                                        <div class="ebcoms-style-button-group">
                                                                            <span></span>
                                                                            <span></span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </a-form-item>
                                                            <a-form-item label="对齐方式">
                                                                <div class="formSwitch">
                                                                    <div class="ebcoms-font-style">
                                                                        <div class="ebcoms-style-button-group">
                                                                            <span></span>
                                                                            <span></span>
                                                                            <span></span>
                                                                            <span></span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </a-form-item>
                                                            <a-form-item label="背景颜色">
                                                                <InputColor />
                                                            </a-form-item>
                                                            <a-form-item label="透明度">
                                                                <div class="flex">
                                                                    <div style="flex: 1;">
                                                                        <a-slider id="test" v-model:value="componentStyle.desc.opacity" />
                                                                    </div>
                                                                    <div>
                                                                        <a-input style="width: 80px;" v-model:value="componentStyle.desc.opacity" >
                                                                            <template #suffix>
                                                                                <span style="padding-right: 11px;">
                                                                                    %
                                                                                </span>
                                                                            </template>
                                                                        </a-input>
                                                                    </div>
                                                                </div>
                                                            </a-form-item>
                                                            <a-form-item label="边框" :labelCol="{span: 24}">
                                                                <div class="ebcoms-borders">
                                                                    <div class="ebcoms-borders-position">
                                                                        <div class="ebcoms-position-wrap">
                                                                            <div class="ebcoms-border-icon ebcoms-border-top active">
                                                                                <div class="ui-icon-wrapper"></div>
                                                                            </div>
                                                                            <div class="ebcoms-border-icon ebcoms-border-left"></div>
                                                                            <div class="ebcoms-border-icon ebcoms-border-all"></div>
                                                                            <div class="ebcoms-border-icon ebcoms-border-right acitve"></div>
                                                                            <div class="ebcoms-border-icon ebcoms-border-bottom"></div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="ebcoms-borders-config">
                                                                        <div class="ebcoms-config-wrap">
                                                                            <a-form-item label="样式">
                                                                                <div class="formSwitch">
                                                                                    <div class="ebcoms-font-style">
                                                                                        <div class="ebcoms-style-button-group">
                                                                                            <span></span>
                                                                                            <span></span>
                                                                                            <span></span>
                                                                                            <span></span>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </a-form-item>
                                                                            <a-form-item label="线宽">
                                                                                <InputPicker></InputPicker>
                                                                            </a-form-item>
                                                                            <a-form-item label="颜色">
                                                                                <InputColor />
                                                                            </a-form-item>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </a-form-item>
                                                            <a-form-item label="圆角">
                                                                <div class="flex">
                                                                    <div style="flex: 1;">
                                                                        <a-slider id="test" v-model:value="componentStyle.desc.radius" />
                                                                    </div>
                                                                    <div style="width: 80px;">
                                                                        <InputPicker :value="componentStyle.desc.radius" @change="(e)=>changeComponentStyleVal(e, 'desc', 'radius')"></InputPicker>
                                                                    </div>
                                                                </div>
                                                            </a-form-item>
                                                        </div>
                                                    </div>
                                                    <div class="collapse">
                                                        <div class="collapse_title" @click="isContentStyle=!isContentStyle">
                                                            <span class="collspase_icon">
                                                                <CaretDownOutlined v-if="isContentStyle" />
                                                                <CaretRightOutlined v-else />
                                                            </span>
                                                            内容
                                                        </div>
                                                        <div class="collapse_content" v-show="isContentStyle">
                                                            <a-form-item label="字体">
                                                                <a-select v-model:value="componentStyle.content.ff">
                                                                    <a-select-option value="year">默认</a-select-option>
                                                                    <a-select-option value="ym">宋体</a-select-option>
                                                                    <a-select-option value="ymd">微软雅黑</a-select-option>
                                                                </a-select>
                                                            </a-form-item>
                                                            <a-form-item label="字号">
                                                                <a-select v-model:value="componentStyle.content.fs">
                                                                    <a-select-option value="year">12px</a-select-option>
                                                                    <a-select-option value="ym">14px</a-select-option>
                                                                    <a-select-option value="ymd">16px</a-select-option>
                                                                </a-select>
                                                            </a-form-item>
                                                            <a-form-item label="字重">
                                                                <a-select v-model:value="componentStyle.content.fw">
                                                                    <a-select-option value="year">100 - Thin</a-select-option>
                                                                    <a-select-option value="ym">200 - Extra Light</a-select-option>
                                                                    <a-select-option value="ymd">200 - Extra Light</a-select-option>
                                                                </a-select>
                                                            </a-form-item>
                                                            <a-form-item label="颜色">
                                                                <InputColor />
                                                            </a-form-item>
                                                            <a-form-item label="倾斜">
                                                                <div class="formSwitch">
                                                                    <div class="ebcoms-font-style">
                                                                        <div class="ebcoms-style-button-group">
                                                                            <span></span>
                                                                            <span></span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </a-form-item>
                                                            <a-form-item label="对齐方式">
                                                                <div class="formSwitch">
                                                                    <div class="ebcoms-font-style">
                                                                        <div class="ebcoms-style-button-group">
                                                                            <span></span>
                                                                            <span></span>
                                                                            <span></span>
                                                                            <span></span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </a-form-item>
                                                            <a-form-item label="背景颜色">
                                                                <InputColor />
                                                            </a-form-item>
                                                            <a-form-item label="透明度">
                                                                <div class="flex">
                                                                    <div style="flex: 1;">
                                                                        <a-slider id="test" v-model:value="componentStyle.content.opacity" />
                                                                    </div>
                                                                    <div>
                                                                        <a-input style="width: 80px;" v-model:value="componentStyle.content.opacity">
                                                                            <template #suffix>
                                                                                <span style="padding-right: 11px;">%</span>
                                                                            </template>
                                                                        </a-input>
                                                                    </div>
                                                                </div>
                                                            </a-form-item>
                                                            <a-form-item label="边框" :labelCol="{span: 24}">
                                                                <div class="ebcoms-borders">
                                                                    <div class="ebcoms-borders-position">
                                                                        <div class="ebcoms-position-wrap">
                                                                            <div class="ebcoms-border-icon ebcoms-border-top active">
                                                                                <div class="ui-icon-wrapper"></div>
                                                                            </div>
                                                                            <div class="ebcoms-border-icon ebcoms-border-left"></div>
                                                                            <div class="ebcoms-border-icon ebcoms-border-all"></div>
                                                                            <div class="ebcoms-border-icon ebcoms-border-right acitve"></div>
                                                                            <div class="ebcoms-border-icon ebcoms-border-bottom"></div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="ebcoms-borders-config">
                                                                        <div class="ebcoms-config-wrap">
                                                                            <a-form-item label="样式">
                                                                                <div class="formSwitch">
                                                                                    <div class="ebcoms-font-style">
                                                                                        <div class="ebcoms-style-button-group">
                                                                                            <span></span>
                                                                                            <span></span>
                                                                                            <span></span>
                                                                                            <span></span>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </a-form-item>
                                                                            <a-form-item label="线宽">
                                                                                <InputPicker></InputPicker>
                                                                            </a-form-item>
                                                                            <a-form-item label="颜色">
                                                                                <InputColor />
                                                                            </a-form-item>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </a-form-item>
                                                            <a-form-item label="圆角">
                                                                <div class="flex">
                                                                    <div style="flex: 1;">
                                                                        <a-slider id="test" v-model:value="formState.borderObj.radiusVal" />
                                                                    </div>
                                                                    <div style="width: 80px;">
                                                                        <InputPicker :value="formState.borderObj.radiusVal" @change="(e)=>changeVal(e, 'borderObj', 'radiusVal')"></InputPicker>
                                                                    </div>
                                                                </div>
                                                            </a-form-item>
                                                        </div>
                                                    </div>
                                                    <div class="collapse">
                                                        <div class="collapse_title" @click="isBackStyle=!isBackStyle">
                                                            <span class="collspase_icon">
                                                                <CaretDownOutlined v-if="isBackStyle" />
                                                                <CaretRightOutlined v-else />
                                                            </span>
                                                            背景
                                                        </div>
                                                        <div class="collapse_content" v-show="isBackStyle">
                                                            <a-form-item label="背景颜色">
                                                                <InputColor />
                                                            </a-form-item>
                                                            <a-form-item label="透明度">
                                                                <div class="flex">
                                                                    <div style="flex: 1;">
                                                                        <a-slider id="test" v-model:value="componentStyle.back.opacity" />
                                                                    </div>
                                                                    <div>
                                                                        <a-input style="width: 80px;" v-model:value="componentStyle.back.opacity">
                                                                            <template #suffix>
                                                                                <span style="padding-right: 11px;">%</span>
                                                                            </template>
                                                                        </a-input>
                                                                    </div>
                                                                </div>
                                                            </a-form-item>
                                                            <a-form-item label="边框" :labelCol="{span: 24}">
                                                                <div class="ebcoms-borders">
                                                                    <div class="ebcoms-borders-position">
                                                                        <div class="ebcoms-position-wrap">
                                                                            <div class="ebcoms-border-icon ebcoms-border-top active">
                                                                                <div class="ui-icon-wrapper"></div>
                                                                            </div>
                                                                            <div class="ebcoms-border-icon ebcoms-border-left"></div>
                                                                            <div class="ebcoms-border-icon ebcoms-border-all"></div>
                                                                            <div class="ebcoms-border-icon ebcoms-border-right acitve"></div>
                                                                            <div class="ebcoms-border-icon ebcoms-border-bottom"></div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="ebcoms-borders-config">
                                                                        <div class="ebcoms-config-wrap">
                                                                            <a-form-item label="样式">
                                                                                <div class="formSwitch">
                                                                                    <div class="ebcoms-font-style">
                                                                                        <div class="ebcoms-style-button-group">
                                                                                            <span></span>
                                                                                            <span></span>
                                                                                            <span></span>
                                                                                            <span></span>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </a-form-item>
                                                                            <a-form-item label="线宽">
                                                                                <InputPicker></InputPicker>
                                                                            </a-form-item>
                                                                            <a-form-item label="颜色">
                                                                                <InputColor />
                                                                            </a-form-item>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </a-form-item>
                                                            <a-form-item label="圆角">
                                                                <div class="flex">
                                                                    <div style="flex: 1;">
                                                                        <a-slider id="test" v-model:value="componentStyle.back.radius" />
                                                                    </div>
                                                                    <div style="width: 80px;">
                                                                        <InputPicker :value="componentStyle.back.radius"  @change="(e)=>changeComponentStyleVal(e, 'back', 'radius')"></InputPicker>
                                                                    </div>
                                                                </div>
                                                            </a-form-item>
                                                        </div>
                                                    </div>
                                                    <div class="collapse">
                                                        <div class="collapse_title" @click="isSpacStyle=!isSpacStyle">
                                                            <span class="collspase_icon">
                                                                <CaretDownOutlined v-if="isSpacStyle" />
                                                                <CaretRightOutlined v-else />
                                                            </span>
                                                            间距
                                                        </div>
                                                        <div class="collapse_content" v-show="isSpacStyle">
                                                            <a-form-item label="间距" :labelCol="{span: 24}">
                                                                <div class="ebcoms-spacing">
                                                                    <div class="ebcoms-spacing-margin">
                                                                        <div class="ebcoms-spacing-item">
                                                                            <div class="ebcoms-spacing-top"></div>
                                                                            <div class="ebcoms-spacing-top-text ebcoms-spacing-text">
                                                                                <span class="ebcoms-spacing-text-inherit">0</span>
                                                                            </div>
                                                                        </div>
                                                                        <div class="ebcoms-spacing-item">
                                                                            <div class="ebcoms-spacing-right"></div>
                                                                            <div class="ebcoms-spacing-right-text ebcoms-spacing-text">
                                                                                <span class="ebcoms-spacing-text-inherit">0</span>
                                                                            </div>
                                                                        </div>
                                                                        <div class="ebcoms-spacing-item">
                                                                            <div class="ebcoms-spacing-bottom"></div>
                                                                            <div class="ebcoms-spacing-bottom-text ebcoms-spacing-text">
                                                                                <span class="ebcoms-spacing-text-inherit">0</span>
                                                                            </div>
                                                                        </div>
                                                                        <div class="ebcoms-spacing-item">
                                                                            <div class="ebcoms-spacing-left"></div>
                                                                            <div class="ebcoms-spacing-left-text ebcoms-spacing-text">
                                                                                <span class="ebcoms-spacing-text-inherit">0</span>
                                                                            </div>
                                                                        </div>
                                                                        <span class="ebcoms-spacing-tip">margin</span>
                                                                    </div>
                                                                    <div class="ebcoms-spacing-padding">
                                                                        <div class="ebcoms-spacing-item">
                                                                            <div class="ebcoms-spacing-top"></div>
                                                                            <div class="ebcoms-spacing-top-text ebcoms-spacing-text"><span class="ebcoms-spacing-text-inherit">0</span>
                                                                            </div>
                                                                        </div>
                                                                        <div class="ebcoms-spacing-item">
                                                                            <div class="ebcoms-spacing-right"></div>
                                                                            <div class="ebcoms-spacing-right-text ebcoms-spacing-text"><span class="ebcoms-spacing-text-inherit">0</span>
                                                                            </div>
                                                                        </div>
                                                                        <div class="ebcoms-spacing-item">
                                                                            <div class="ebcoms-spacing-bottom"></div>
                                                                            <div class="ebcoms-spacing-bottom-text ebcoms-spacing-text"><span class="ebcoms-spacing-text-inherit">0</span>
                                                                            </div>
                                                                        </div>
                                                                        <div class="ebcoms-spacing-item">
                                                                            <div class="ebcoms-spacing-left"></div>
                                                                            <div class="ebcoms-spacing-left-text ebcoms-spacing-text"><span class="ebcoms-spacing-text-inherit">0</span>
                                                                            </div>
                                                                        </div><span class="ebcoms-spacing-tip">padding</span>
                                                                    </div>
                                                                    <div class="ebcoms-spacing-content"></div>
                                                                </div>
                                                            </a-form-item>
                                                        </div>
                                                    </div>
                                                </a-form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        <div class="layout-box-show-btn show-btn-right" @click="handleShowAside">
            <RightOutlined style="font-size: 10px;" v-if="isRightAside" />
            <LeftOutlined style="font-size: 10px;" v-else />
        </div>
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
    import draggable from "vuedraggable";
    import InputColor from "@/components/formDesign/InputColor.vue";
    import InputPicker from "@/components/formDesign/InputPicker.vue";
    import { SettingOutlined, PushpinOutlined, CaretDownOutlined, CaretRightOutlined,
         GlobalOutlined, RightOutlined, LeftOutlined, PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons-vue';
    import bus from '@/utils/eventBus.js';
    const emit = defineEmits(['change']);
    
    const formState = reactive({
        descObj: {
            color: "#3399ff",
            opacity: 1,
            radiusVal: 1,
        },
        borderObj: {
            radiusVal: 20,
        },
        label: "",
        name: "",
        helpText: "",
        descShow: "1",
        codeNumber: "1",
        dateOption: "1",
        dateRule: "year",
        repeatPeriod: "year",
        readWrite: false,
        defaultTitle: false
    });

    const componentStyle = reactive({
        desc: { // 描述
            ff: "", // 字体
            fs: "", // 字号
            fw: "", // 字重
            color: "", // 颜色
            skew: "", // 倾斜
            align: "", // 对齐方式
            bgColor: "", // 背景颜色
            opacity: "", // 透明度
            borderObj: { // 边框
                style: "", // 样式
                width: "", // 线宽
                color: "" // 颜色
            },
            radius: "", // 圆角
        },
        content: { // 内容
            ff: "", // 字体
            fs: "", // 字号
            fw: "", // 字重
            color: "", // 颜色
            skew: "", // 倾斜
            align: "", // 对齐方式
            bgColor: "", // 背景颜色
            opacity: "", // 透明度
            borderObj: { // 边框
                style: "", // 样式
                width: "", // 线宽
                color: "" // 颜色
            },
            radius: "", // 圆角
        },
        back: { // 背景
            bgColor: "",
            opacity: "",
            borderObj: {
                style: "", // 样式
                width: "", // 线宽
                color: "" // 颜色
            },
            radius: "", // 圆角
        },
        margin: "", // 间距
    })

    const data = reactive({
        current: 0,
        isFieldAttr: true,
        isLayoutAttr: true,
        isDescStyle: true,
        isBackStyle: true,
        isContentStyle: true,
        isSpacStyle: true,
        isDefaultStyle: true,
        isRightAside: true,
        color: "#3399ff",
        isPrev: false,
        isAfter: false
    });
    const { current, isFieldAttr, isLayoutAttr, isDescStyle, isBackStyle,
         isContentStyle, isSpacStyle, isDefaultStyle, isRightAside, color, isPrev, isAfter } = toRefs(data);
    const radioStyle = reactive({
        display: 'flex',
        height: '30px',
        lineHeight: '30px',
    });
    const labelCol = {
        style: {
            width: '60px',
            textAlign: 'left'
        },
    };
    const handleTab = (index) => {
        data.current = index;
    }
    const handleShowAside = () => {
        data.isRightAside = !data.isRightAside;
        // emit('change', true);
    }

    const changeColor = (colorVal, obj, field) => {
        formState[obj][field] = colorVal.hex;
        console.log("formState[obj][field]", formState[obj][field].hex);
    }
    const changeVal = (val, obj, field) => {
        formState[obj][field] = val;
    };
    const changeComponentStyleVal = (val, obj, field) => {
        componentStyle[obj][field] = val;
    }
    onMounted(()=>{
        bus.on('fieldInfo', (params) => {
            console.log("params", params);
            formState.label = params.label;
            formState.name = params.name;
            formState.helpText = params.helpText;
        })
    });

    const changeName = (e) => {
        bus.emit("label", formState.label);
    }
</script>
<style lang="less" scoped>
    .menu-tab {
        position: relative;
        display: flex;
        align-items: flex-end;
        width: 100%;
        padding: 0 10px;
        min-height: 32px;
        height: 32px;
        border-bottom: 1px solid #e5e5e5;
        font-size: 12px;
        color: #666;
        .menu-list {
            height: 100%;
            display: flex;
            flex: 1;
            .menu-list-item {
                display: flex;
                align-items: center;
                text-align: center;
                margin-right: 24px;
                height: 100%;
                cursor: pointer;

                &:hover {
                    color: #5d9cec;
                }
                &.acitve {
                    color: #5d9cec;
                    border-bottom: 2px solid #5d9cec;
                }
            }
        }
    }
    .ebcoms-spacing-top{
        position: absolute;
        display: block;
        height: 0;
        left: 1px;
        right: 1px;
        cursor: n-resize;
        top: 0;
        border-color: #ececec transparent transparent;
        border-style: solid;
        border-width: 20px 37px 0;
        &:hover{
            border-color: #dfdfdf transparent transparent;
        }
    }
    .ebcoms-spacing-top-text{
        position: absolute;
        left: 50%;
        top: 0;
        transform: translate(-50%);
        font-size: 10px;
        cursor: pointer;
    }
    .ebcoms-spacing-text{
        background-color: transparent;
        line-height: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        &>div{
            span{
                padding: 0 4px;
                border-radius: 2px;
                height: 16px;
                line-height: 17px;
            }
        }
    }
    .ebcoms-spacing-right{
        position: absolute;
        display: block;
        width: 0;
        bottom: 1px;
        top: 1px;
        cursor: e-resize;
        right: 0;
        border-color: transparent #ececec transparent transparent;
        border-style: solid;
        border-width: 20px 37px 20px 0;
        &:hover{
            border-color: #dfdfdf transparent transparent;
        }
    }
    .ebcoms-spacing-right-text {
        position: absolute;
        top: 50%;
        right: 0;
        width: 37px;
        text-align: center;
        transform: translateY(-50%);
        font-size: 10px;
        cursor: pointer;
    }
    .ebcoms-spacing-text {
        background-color: transparent;
        line-height: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .ebcoms-spacing-bottom {
        position: absolute;
        display: block;
        height: 0;
        left: 1px;
        right: 1px;
        cursor: s-resize;
        bottom: 0;
        border-color: transparent transparent #ececec;
        border-style: solid;
        border-width: 0 37px 20px;
        &:hover{
            border-color: #dfdfdf transparent transparent;
        }
    }
    .ebcoms-spacing-bottom-text {
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translate(-50%);
        font-size: 10px;
        cursor: pointer;
    }
    .ebcoms-spacing-text {
        background-color: transparent;
        line-height: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .ebcoms-spacing-left {
        position: absolute;
        display: block;
        width: 0;
        bottom: 1px;
        top: 1px;
        cursor: w-resize;
        left: 0;
        border-color: transparent transparent transparent #ececec;
        border-style: solid;
        border-width: 20px 0 20px 37px;
        &:hover{
            border-color: #dfdfdf transparent transparent;
        }
    }
    .ebcoms-spacing-left-text {
        position: absolute;
        top: 50%;
        width: 37px;
        text-align: center;
        transform: translateY(-50%);
        font-size: 10px;
        cursor: pointer;
    }
    .ebcoms-spacing-text {
        background-color: transparent;
        line-height: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .ebcoms-spacing-tip {
        position: absolute;
        top: -2px;
        left: 3px;
        font-size: 10px;
        color: #999;
    }
    .de-rs{
        width: 250px;
        min-width: 250px;
        height: 100%;
        border-left: 1px solid #e5e5e5;
        background: #fff;
        display: flex;
        flex-direction: column;
        transition: all .3s cubic-bezier(.645,.045,.355,1);
        position: relative;
        &.hidden{
            width: 0 !important;
            min-width: 0 !important;
            overflow: inherit;
        }
        .de-rs-content{
            flex: 1 1 auto;
            padding: 5px 15px 0;
            overflow-y: auto;
            &.noPadding{
                padding: 0;
            }
            .de-attr-panel-container{
                .collapse{
                    .collapse_title{
                        font-weight: 700;
                        font-size: 12px;
                        height: 36px;
                        padding: 18px 0;
                        border: none;
                        display: flex;
                        align-items: center;
                        transition: opacity .225s ease-in-out;
                        cursor: pointer;
                        line-height: 20px;
                        cursor: pointer;
                    }
                    .collapse_content{
                        .formItem{
                            :deep .ant-row.ant-form-row{
                                color: red;
                                :deep .ant-form-item-label{
                                    padding-bottom: 0 !important;
                                }
                            }
                        }
                        .icon{
                            display: inline-block;
                            padding-left: 10px;
                            cursor: pointer;
                            font-size: 18px;
                            color: #e5e5e5;
                        }
                    }
                }
            }
            .ebde-config-panel-style{
                display: flex;
                flex-direction: column;
                height: 100%;
                overflow-y: hidden;
                position: relative;
                .ebde-config-panel-style-group{
                    width: 100%;
                    height: auto;
                    background-color: #f2f2f2;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-right: 19px;
                    &>div:first-child{
                        height: 100%;
                        display: flex;
                        flex-direction: row;
                        align-items: flex-end;
                        padding-top: 7px;
                        span{
                            font-size: 12px;
                            color: #666;
                            line-height: 12px;
                            display: inline-block;
                            padding: 8px 20px;
                            cursor: pointer;
                            &.active{
                                background-color: rgb(255, 255, 255);
                                color: #5d9cec;
                                font-weight: 700;
                            }
                        }
                    }
                }
                .ebde-config-panel-style-content{
                    width: 100%;
                    overflow-y: overlay;
                    .ebde-style-custom{
                        margin-top: 15px;
                        .ebde-style-custom-title{
                            width: 100%;
                            height: 35px;
                            background-color: rgb(242, 242, 242);
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            padding: 6px 8px;
                            &>div:first-child{
                                span{
                                    font-size: 12px;
                                    color: #666;
                                    line-height: 12px;
                                    padding-top: 1px;
                                    margin-right: 5px;
                                }
                            }
                        }
                        &>div:nth-child(2){
                            padding: 3px 8px;
                        }
                        .ebde-style-config-custom{
                            position: relative;
                            padding-bottom: 8px;
                        }
                        .ebde-stylib-config-custom{
                            height: calc(100% - 32px);
                        }
                    }
                }
                .ebcoms-borders{
                    align-items: center;
                    display: grid;
                    gap: 8px 14px;
                    grid-template-columns: auto auto;
                    .ebcoms-borders-position{
                        grid-column: 1 / 2;
                        .ebcoms-position-wrap {
                            width: 80px;
                            height: 92px;
                            display: grid;
                            align-items: center;
                            gap: 2px;
                            .ebcoms-border-icon{
                                width: 24px;
                                height: 24px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                box-sizing: content-box;
                                cursor: pointer;
                                background: #3399ff;
                                
                                &.ebcoms-border-top{
                                    grid-column-start: 2;
                                    grid-row-start: 1;
                                }
                                &.ebcoms-border-left{
                                    grid-column-start: 1;
                                    grid-row-start: 2;
                                }
                                &.ebcoms-border-all{
                                    grid-column-start: 2;
                                    grid-row-start: 2;
                                }
                                &.ebcoms-border-right{
                                    grid-column-start: 3;
                                    grid-row-start: 2;
                                }
                                &.ebcoms-border-bottom{
                                    grid-column-start: 2;
                                    grid-row-start: 3;
                                }
                                &.active{
                                    background: #e5e5e5;
                                    box-shadow: #e5e5e5 0 0 0 2px;
                                    border-radius: 2px;
                                }
                            }
                        }
                    }
                    .ebcoms-borders-config{
                        align-items: center;
                        display: grid;
                        grid-template-columns: auto 1fr;
                    }
                }

                /* 间距 */
                .ebcoms-spacing{
                    .ebcoms-spacing-margin{
                        height: 120px;
                        position: relative;
                        background-color: #ddd;
                        border: 1px solid #ddd;
                        .ebcoms-spacing-margin{
                            position: absolute;
                            top: 0;
                            bottom: 0;
                            left: 0;
                            right: 0;
                            .ebcoms-spacing-item{
                                &>div>span{
                                    position: absolute;
                                    font-size: 10px;
                                    font-family: "Arial Normal", "Arial", sans-serif;
                                    font-weight: 400;
                                    font-style: normal;
                                    color: #999;
                                }
                                
                            }
                            
                        }
                    }
                    .ebcoms-spacing-padding{
                        position: absolute;
                        top: 22px;
                        bottom: 22px;
                        left: 39px;
                        right: 39px;
                    }
                }
            }
        }
        .layout-box-show-btn{
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            color: #999;
            cursor: pointer;
            background: #fff;
            z-index: 100;
            border: 1px solid #e5e5e5;
            &:hover{
                background: #f0f1f4;
            }
            &.show-btn-right{
                top: 50%;
                transform: translateY(-50%);
                width: 14px;
                height: 36px;
                border-radius: 6px;
                left: -14px;
                border-right: none;
                border-top-right-radius: 0;
                border-bottom-right-radius: 0;
            }
        }
    }
    .formContent{
        text-align: right;
        .ant-input{
            border: 1px solid #e5e5e5;
        }
    }
    .formSwitch{
        width: 100%;
        display: inline-block;
        max-width: 100%;
        .ebcoms-font-style{
            width: 100%;
            text-align: center;
            .ebcoms-style-button-group{
                width: 100%;
                height: 24px;
                display: flex;
                align-items: center;
                &>span{
                    display: flex;
                    flex: 1 1;
                    height: 100%;
                    border: 1px solid #e5e5e5;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    border-right: 0;
                    background-color: #fff;
                    &:hover{
                        background: #ececec;
                    }
                }
                &>span:last-of-type{
                    border-right: 1px solid #e5e5e5;
                }
            }
            
        }
    }
</style>
<style lang="less">
    .ant-form-item{
        margin-bottom: 8px;
        font-size: 12px;
        .ant-row{
            .ant-form-item-label{
                padding-bottom: 0 !important;
                label{
                    color: #666;
                    font-size: 12px;
                }
            }
            .ant-radio-wrapper{
                font-size: 12px;
            }
            .ant-form-item-control{
                font-size: 12px;
            }
            label{
                font-size: 12px;
            }
        }
    }
    .spin-container{
        .ant-input-affix-wrapper{
            border-radius: 3px !important;
            border: 1px solid #e5e5e5;
        }
        .ant-select-selector{
            border: 1px solid #e5e5e5 !important;
            border-radius: 3px !important;
        }
        .ant-input{
            border-radius: 3px !important;
        }
    }
    .ebde-style-config-custom{
        .ant-input-affix-wrapper{
            height: 26px;
            padding-right: 1px;
            border-radius: 2px;
            border: 1px solid #e5e5e5;
        }
        .ant-select-selector{
            border: 1px solid #e5e5e5 !important;
        }
        .ant-select,.ant-select-selector{
            height: 26px !important;
            line-height: 26px;
            border-radius: 2px !important;
        }
        .ant-select-selection-search-input,.ant-select-selection-item{
            height: 26px !important;
            line-height: 26px !important;
        }
    }
</style>