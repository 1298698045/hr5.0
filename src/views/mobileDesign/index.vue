<template>
    <div class="mobileDesign">
        <!-- <div class="mobileHeader">
            <div class="title">OA后台管理系统</div>
        </div> -->
        <header class="de-header">
            <div class="de-header-leftside">
                <span style="padding: 0px 10px; font-weight: bold;">表单设计器</span>
            </div>
            <div class="de-header-center">
                <div class="de-header-title" title="供应商卡片">供应商卡片</div>
            </div>
            <div class="de-header-rightside">
                <div class="de-header-save-preview">
                    <a-button class="ui-btn" @click="handleSave">保存</a-button>
                    <a-button class="ui-btn">预览</a-button>
                    <a-button type="link" @click="handlePCDesign">PC端表单设计</a-button>
                </div>
                <a-tooltip>
                    <template #title>点击查看帮助</template>
                    <div class="ui-help">
                        <span>
                            <span class="ui-icon">
                                <QuestionCircleOutlined />
                            </span>
                        </span>
                    </div>
                </a-tooltip>
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
        <div class="mobileDesignBd">
            <div class="bdHeader">
                <div class="leftIcon"></div>
                <div class="stepTabs">
                    <div class="setpTab">
                        <span class="roundNum">2</span>
                        表单设计
                    </div>
                </div>
                <div class="rightOptions">
                    <a-button type="link" style="color: #333">
                        <ReadOutlined />帮助
                    </a-button>
                    <a-divider type="vertical" />
                    <a-button type="link" style="color: #333" @click="handlePreviewMobile">
                        <TabletOutlined />预览
                    </a-button>
                    <a-divider type="vertical" />
                    <a-button type="primary" @click="handleSave">发布</a-button>
                </div>
            </div>
            <div class="mobileContainer">
                <div class="mobileLeft">
                    <div class="editorMenuTab">
                        <div class="editorMenuTabItem" :class="{ active: leftCurrent === 0 }" @click="handleLeftTab(0)">
                            <svg class="sw__icon" viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor"
                                aria-hidden="true">
                                <path
                                    d="M362.667 554.667c70.592 0 128 57.408 128 128V832c0 70.592-57.408 128-128 128H213.333c-70.592 0-128-57.408-128-128V682.667c0-70.592 57.408-128 128-128zm469.333 0c70.592 0 128 57.408 128 128V832c0 70.592-57.408 128-128 128H682.667c-70.592 0-128-57.408-128-128V682.667c0-70.592 57.408-128 128-128zM362.667 640H213.333c-23.53 0-42.666 19.136-42.666 42.667V832c0 23.53 19.136 42.667 42.666 42.667h149.334c23.53 0 42.666-19.136 42.666-42.667V682.667c0-23.531-19.136-42.667-42.666-42.667zM832 640H682.667C659.136 640 640 659.136 640 682.667V832c0 23.53 19.136 42.667 42.667 42.667H832c23.53 0 42.667-19.136 42.667-42.667V682.667C874.667 659.136 855.53 640 832 640zM362.667 85.333c70.592 0 128 57.408 128 128v149.334c0 70.592-57.408 128-128 128H213.333c-70.592 0-128-57.408-128-128V213.333c0-70.592 57.408-128 128-128zm469.333 0c70.592 0 128 57.408 128 128v149.334c0 70.592-57.408 128-128 128H682.667c-70.592 0-128-57.408-128-128V213.333c0-70.592 57.408-128 128-128zm-469.333 85.334H213.333c-23.53 0-42.666 19.136-42.666 42.666v149.334c0 23.53 19.136 42.666 42.666 42.666h149.334c23.53 0 42.666-19.136 42.666-42.666V213.333c0-23.53-19.136-42.666-42.666-42.666zm469.333 0H682.667c-23.531 0-42.667 19.136-42.667 42.666v149.334c0 23.53 19.136 42.666 42.667 42.666H832c23.53 0 42.667-19.136 42.667-42.666V213.333c0-23.53-19.136-42.666-42.667-42.666z">
                                </path>
                            </svg>
                            <span>字段</span>
                        </div>
                        <div class="editorMenuTabItem" :class="{ active: leftCurrent === 1 }" @click="handleLeftTab(1)">
                            <svg width="1em" height="1em" viewBox="0 0 16 15" fill="currentColor" aria-hidden="true">
                                <path
                                    d="M7.73.08l-7 4.5a.5.5 0 000 .84l7 4.5a.5.5 0 00.54 0l7-4.5a.5.5 0 000-.84l-7-4.5a.5.5 0 00-.54 0zm7 8.5l.54.84L8 14.095.73 9.421l.54-.842L8 12.905l6.73-4.326zM8 1.093l6.075 3.905L8 8.905 1.924 4.999 8 1.094z"
                                    fill-rule="nonzero"></path>
                            </svg>
                            <span>控件组</span>
                        </div>
                        <!-- <div class="editorMenuTabItem" :class="{ active: leftCurrent === 2 }" @click="handleLeftTab(2)">
                            <svg width="1em" height="1em" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
                                <path
                                    d="M2 14a2 2 0 01-2-2V2a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H2zm0-1h10a1 1 0 00.993-.883L13 12V2a1 1 0 00-.883-.993L12 1H2a1 1 0 00-.993.883L1 2v10a1 1 0 00.883.993L2 13zm3.988-4.812c-.815-.814-.832-2.125-.03-2.927l.022-.018.014-.015 1.794-1.471c.729-.729 2.143-.755 2.927.03.812.811.805 2.206-.006 3.017l-.481.468c-.064.062-.119.116-.165.163a.5.5 0 11-.707-.707l.652-.637c.416-.416.42-1.178 0-1.597-.358-.359-1.051-.374-1.454-.078l-.095.08-1.801 1.481-.074.082c-.323.412-.287 1.025.11 1.422a.5.5 0 11-.706.707zm-2.67 2.996c-.774-.774-.828-1.995-.153-2.794l.113-.123.796-.843a.5.5 0 01.783.616l-.056.07-.806.854c-.407.407-.398 1.085.03 1.513.397.397 1.01.433 1.436.097l.094-.084 1.952-1.773.035-.044c.211-.211.316-.501.296-.802a1.11 1.11 0 00-.326-.71.5.5 0 01.707-.708c.367.367.583.847.617 1.35.034.505-.116 1-.427 1.396a.57.57 0 01-.053.086l-.061.066-2.05 1.862c-.802.803-2.113.785-2.927-.029z"
                                    fill-rule="evenodd"></path>
                            </svg>
                            <span>关联</span>
                        </div> -->
                    </div>
                    <div class="controlWrap">
                        <div class="mobileTabs">
                            <!-- <a-tabs v-model:activeKey="activeKey">
                                <a-tab-pane key="1" tab="字段集"></a-tab-pane>
                                <a-tab-pane key="2" tab="相关列表"></a-tab-pane>
                                <a-tab-pane key="3" tab="人事套件"></a-tab-pane>
                            </a-tabs> -->
                            <span class="label" :class="{'active':fieldCurrent==0}" @click="fieldCurrent=0">主表字段</span>
                            <span class="label" :class="{'active':fieldCurrent==1}" @click="fieldCurrent=1">相关列表</span>
                        </div>
                        <div class="mobileLeftCont" v-if="leftCurrent==0">
                            <!-- <div class="search">
                                <a-input-search></a-input-search>
                            </div> -->
                            <div class="fieldList" v-if="fieldCurrent==0">
                                <transition name="fade" mode="out-in">
                                    <draggable class="fieldList" :list="troughdata" :group="{name:'field', put: false}" itemKey="id">
                                        <template #item="{ element, index }">
                                            <div class="fieldItem" :key="index">
                                                <span class="label">{{ element.label }}</span>
                                                <span class="icon">
                                                    <img :src="element.typeImg"
                                                        data-spm-anchor-id="0.0.0.i8.2eb74490psBgMe" class="typeimg" />
                                                </span>
                                            </div>
                                        </template>
                                    </draggable>
                                </transition>
                                <!-- <div class="fieldItem" v-for="(item,index) in troughdata" :key="index">
                                    <span class="label">{{item.label}}</span>
                                    <span class="icon">
                                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAAG1BMVEVHcEwZHiYZHiUaHyMdKCgZHiYaISQYHiQZHiYtE7tIAAAACXRSTlMAZVUSCTQmQxxVUCeiAAAA7ElEQVQoz9WSTW7CQAxGTQIlSz6XDFumvUBSUYklpTkAkXqAgkTXmS5YE1Gp167HM8micwK+ReK8/DzbCtG9Z4oyhTMghRnwmcDeoEugW7jH1NP10bS97SJ8wDVjvdsCfI0eFr+vXyAxAdYl5Wqy5SZ3HD1isUuiAgeiOcJXsSZqSz9DFQ/eI52/8ThIFU6bptmrid7PNsAaGjHl375Q2AYoJoeny2uAMF8SZ8TxPIiKsIyeaQIa4HzQVfVqvIzNzNBpdVTYhgXlWGT4mP5Ce/MD+lhT6D7Ao0feYDoBq53lf+ve3uSpn7v5C/8Auc4hwIODgzAAAAAASUVORK5CYII=" data-spm-anchor-id="0.0.0.i8.2eb74490psBgMe" class="typeimg">
                                    </span>
                                </div> -->
                            </div>
                            <div class="fieldList" v-if="fieldCurrent==1">
                                <transition name="fade" mode="out-in">
                                    <draggable class="fieldList" :list="relatedList" :group="{name:'fields', put: false}" itemKey="id">
                                        <template #item="{ element, index }">
                                            <div class="fieldItem" :key="index">
                                                <span class="label">{{ element.label }}</span>
                                                <span class="icon">
                                                </span>
                                            </div>
                                        </template>
                                    </draggable>
                                </transition>
                            </div>
                        </div>
                        <div class="mobileLeftCont mobileLeftContGroup" v-else-if="leftCurrent==1">
                            <transition name="fade" mode="out-in">
                                <draggable class="fieldList" :sort="false" :list="sessions" :group="{name:'fields', pull: 'clone', put: false, clone: true}" itemKey="id" :clone="handleClone" @change="onDragChange">
                                    <template #item="{ element, index }">
                                        <div class="fieldItem" :key="index">
                                            <span class="label">{{ element.label }}</span>
                                            <span class="icon">
                                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAAG1BMVEVHcEwZHiYZHiUaHyMdKCgZHiYaISQYHiQZHiYtE7tIAAAACXRSTlMAZVUSCTQmQxxVUCeiAAAA7ElEQVQoz9WSTW7CQAxGTQIlSz6XDFumvUBSUYklpTkAkXqAgkTXmS5YE1Gp167HM8micwK+ReK8/DzbCtG9Z4oyhTMghRnwmcDeoEugW7jH1NP10bS97SJ8wDVjvdsCfI0eFr+vXyAxAdYl5Wqy5SZ3HD1isUuiAgeiOcJXsSZqSz9DFQ/eI52/8ThIFU6bptmrid7PNsAaGjHl375Q2AYoJoeny2uAMF8SZ8TxPIiKsIyeaQIa4HzQVfVqvIzNzNBpdVTYhgXlWGT4mP5Ce/MD+lhT6D7Ao0feYDoBq53lf+ve3uSpn7v5C/8Auc4hwIODgzAAAAAASUVORK5CYII="
                                                    data-spm-anchor-id="0.0.0.i8.2eb74490psBgMe" class="typeimg" />
                                            </span>
                                        </div>
                                    </template>
                                </draggable>
                            </transition>
                            <div class="groupWrap">
                                <div class="groupItem" v-for="(item,index) in relatedList2" :key="index">
                                    <div class="groupItemHead" :class="{'active':!item.isCollapsed}">
                                        <span class="label">
                                            {{item.label}}
                                        </span>
                                        <span class="iconArrow" :class="{'active':!item.isCollapsed}" @click="handleCollapsed(item)">
                                            <UpOutlined />
                                        </span>
                                    </div>
                                    <transition name="fade" mode="out-in"  v-show="item.isCollapsed">
                                        <draggable class="fieldList" :list="item.selectableColumns" :group="{name:'fieldChild', put: false}" itemKey="id">
                                            <template #item="{ element, index }">
                                                <div class="fieldItem" :key="index">
                                                    <span class="label">{{ element.label }}</span>
                                                    <span class="icon">
                                                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAAG1BMVEVHcEwZHiYZHiUaHyMdKCgZHiYaISQYHiQZHiYtE7tIAAAACXRSTlMAZVUSCTQmQxxVUCeiAAAA7ElEQVQoz9WSTW7CQAxGTQIlSz6XDFumvUBSUYklpTkAkXqAgkTXmS5YE1Gp167HM8micwK+ReK8/DzbCtG9Z4oyhTMghRnwmcDeoEugW7jH1NP10bS97SJ8wDVjvdsCfI0eFr+vXyAxAdYl5Wqy5SZ3HD1isUuiAgeiOcJXsSZqSz9DFQ/eI52/8ThIFU6bptmrid7PNsAaGjHl375Q2AYoJoeny2uAMF8SZ8TxPIiKsIyeaQIa4HzQVfVqvIzNzNBpdVTYhgXlWGT4mP5Ce/MD+lhT6D7Ao0feYDoBq53lf+ve3uSpn7v5C/8Auc4hwIODgzAAAAAASUVORK5CYII="
                                                            data-spm-anchor-id="0.0.0.i8.2eb74490psBgMe" class="typeimg" />
                                                    </span>
                                                </div>
                                            </template>
                                        </draggable>
                                    </transition>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mobileRight">
                    <div class="centerHead">
                        <div class="backIcons"></div>
                        <div class="backOptions">
                            <a-button type="link" class="btnLink" style="color: #333">
                                <PrinterOutlined style="color: #0091ff" />编辑打印模板
                            </a-button>
                            <a-divider type="vertical" />
                            <a-dropdown>
                                <a-button class="btnLink" type="link" style="color: #333">{{ languages[languageId -
                                    1].name }}
                                    <DownOutlined />
                                </a-button>
                                <template #overlay>
                                    <a-menu @click="handleMenuLanguage">
                                        <a-menu-item v-for="(item, index) in languages" :key="item.id">
                                            <span style="display: inline-block; width: 20px">
                                                <CheckOutlined style="color: #0091ff" v-if="item.id == languageId" />
                                            </span>
                                            <a href="javascript:;">{{ item.name }}</a>
                                        </a-menu-item>
                                    </a-menu>
                                </template>
                            </a-dropdown>
                            <a-divider type="vertical" />
                            <a-tooltip>
                                <template #title>PC视图</template>
                                <a-button type="link" style="color: #333">
                                    <DesktopOutlined />
                                </a-button>
                            </a-tooltip>
                            <a-divider type="vertical" />
                            <a-tooltip>
                                <template #title>手机视图</template>
                                <a-button type="link" style="color: #333">
                                    <TabletOutlined />
                                </a-button>
                            </a-tooltip>
                        </div>
                    </div>
                    <div class="mobileBox">
                        <div class="formWrap">
                            <transition name="fade" mode="out-in">
                                <draggable class="list-group" ghost-class="ghost" :list="layoutList" :group="{ name: 'fields'}" itemKey="id">
                                    <template #item="{ element, index }">
                                        <div class="formItemGroup" :class="{ active: current === index }" v-if="element.displayCategory=='RelatedList'" @click="handleSelect(element, index)" @dblclick="handleAddRelatedField(element, index)">
                                            <div class="groupItem">
                                                {{element.label}}
                                                <div class="operateBox" style="visibility: visible;" v-if="current === index">
                                                    <a-tooltip>
                                                        <template #title>删除</template>
                                                        <span class="iconAction"
                                                            @click="handleDeleteFieldItem(element, index)">
                                                            <DeleteOutlined />
                                                        </span>
                                                    </a-tooltip>
                                                </div>
                                            </div>
                                            <draggable :list="element.fields" ghost-class="ghost" group="fieldChild" itemKey="id">
                                                <template #item="{ element:item, index:idx }">
                                                    <div class="formItem" @click.stop="handleSelectField(element,index,item,idx)">
                                                        <div class="listLine">
                                                            <div class="listContent">
                                                                <label>{{ item.label }}</label>
                                                                <div class="list-brief">
                                                                    <input type="text" :placeholder="'请输入' + item.label" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="cover"></div>
                                                        <div class="operateBox">
                                                            <a-tooltip>
                                                                <template #title>删除</template>
                                                                <span class="iconAction"
                                                                @click.stop="handleDeleteFieldChildItem(element, index, item, idx)">
                                                                    <DeleteOutlined />
                                                                </span>
                                                            </a-tooltip>
                                                        </div>
                                                    </div>
                                                </template>
                                            </draggable>
                                            <div class="emptyRelated" v-if="element.fields.length==0">
                                                <span class="emptytip">可拖入多个组件（不包含明细组件）</span>
                                            </div>
                                        </div>
                                        <div class="sessionGroup"  :class="{ active: current === index }" v-else-if="element.displayCategory == 'group'" @click="handleSelect(element, index)">
                                            <div class="sessionGroup-head">
                                                <div>
                                                    <span class="tag"></span>
                                                    <span class="label" @dblclick.stop="handleRename(element, index)">
                                                        <span v-if="!element.isEdit">{{element.label}}</span>
                                                        <a-input v-else v-model:value="element.label" @change="changeEnterName(element, index)"></a-input>
                                                        <!-- <input type="text" v-else v-model="element.label" @change="changeEnterName(element, index)"> -->
                                                    </span>
                                                </div>
                                                <div class="operateBox" v-if="current == index">
                                                    <a-tooltip>
                                                        <template #title>删除</template>
                                                        <span class="iconAction"
                                                            @click="handleDeleteFieldItem(element, index)">
                                                            <DeleteOutlined />
                                                        </span>
                                                    </a-tooltip>
                                                </div>
                                            </div>
                                            <div class="sessionGroup-bd">
                                                <draggable class="sessionGroup-field" ghost-class="ghost" :list="element.fields" group="field" itemKey="id">
                                                    <template #item="{element:item, index:idx}">
                                                        <div class="formItem" :class="{'active':element.current==idx}" @click.stop="handleSelectField(element,index,item,idx)">
                                                            <div class="listLine">
                                                                <div class="listContent">
                                                                    <label>{{ item.label }}</label>
                                                                    <div class="list-brief">
                                                                        <input type="text" :placeholder="'请输入' + item.label" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="cover"></div>
                                                            <div class="operateBox">
                                                                <a-tooltip>
                                                                    <template #title>删除</template>
                                                                    <span class="iconAction"
                                                                    @click.stop="handleDeleteSectionField(element, index, item, idx)">
                                                                        <DeleteOutlined />
                                                                    </span>
                                                                </a-tooltip>
                                                            </div>
                                                        </div>
                                                    </template>
                                                </draggable>
                                            </div>
                                        </div>
                                        <div class="formItem" v-else :class="{ active: current === index }"
                                            @click="handleSelect(element, index)">
                                            <div class="listLine">
                                                <div class="listContent">
                                                    <label>{{ element.label }}</label>
                                                    <div class="list-brief">
                                                        <input type="text" :placeholder="'请输入' + element.label" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="cover"></div>
                                            <div class="operateBox" v-if="current === index">
                                                <a-tooltip>
                                                    <template #title>复制</template>
                                                    <span class="iconAction" @click="handleCopy(element, index)">
                                                        <CopyOutlined />
                                                    </span>
                                                </a-tooltip>
                                                <a-divider type="vertical" />
                                                <a-tooltip>
                                                    <template #title>删除</template>
                                                    <span class="iconAction"
                                                        @click="handleDeleteFieldItem(element, index)">
                                                        <DeleteOutlined />
                                                    </span>
                                                </a-tooltip>
                                            </div>
                                        </div>
                                    </template>
                                </draggable>
                            </transition>
                            <!-- <div class="formItem" :class="{'active':current===index}" v-for="(item,index) in layoutList" :key="index" @click="handleSelect(item, index)">
                                <div class="listLine">
                                    <div class="listContent">
                                        <label>{{ item.label }}</label>
                                        <div class="list-brief">
                                            <input type="text" :placeholder="'请输入'+item.label">
                                        </div>
                                    </div>
                                </div>
                                <div class="cover"></div>
                            </div> -->
                        </div>
                    </div>
                </div>
                <div class="cardInfoWrap">
                    <div class="cardHead">
                        <span class="icon">
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAAG1BMVEVHcEwZHiYZHiUaHyMdKCgZHiYaISQYHiQZHiYtE7tIAAAACXRSTlMAZVUSCTQmQxxVUCeiAAAA7ElEQVQoz9WSTW7CQAxGTQIlSz6XDFumvUBSUYklpTkAkXqAgkTXmS5YE1Gp167HM8micwK+ReK8/DzbCtG9Z4oyhTMghRnwmcDeoEugW7jH1NP10bS97SJ8wDVjvdsCfI0eFr+vXyAxAdYl5Wqy5SZ3HD1isUuiAgeiOcJXsSZqSz9DFQ/eI52/8ThIFU6bptmrid7PNsAaGjHl375Q2AYoJoeny2uAMF8SZ8TxPIiKsIyeaQIa4HzQVfVqvIzNzNBpdVTYhgXlWGT4mP5Ce/MD+lhT6D7Ao0feYDoBq53lf+ve3uSpn7v5C/8Auc4hwIODgzAAAAAASUVORK5CYII="
                                data-spm-anchor-id="0.0.0.i8.2eb74490psBgMe" class="typeimg" />
                        </span>
                        <span class="title">{{ fieldInfo.label }}</span>
                    </div>
                    <div class="cardBody">
                        <div class="rowForm">
                            <div class="label">标题</div>
                            <div class="val">
                                <a-input :placeholder="fieldInfo.label" show-count :maxlength="20" v-model:value="fieldInfo.label"></a-input>
                            </div>
                        </div>
                        <div class="rowForm">
                            <div class="label">提示文字</div>
                            <div class="val">
                                <a-input :placeholder="'请输入'+ fieldInfo ? fieldInfo.label : ''" show-count :maxlength="50"></a-input>
                            </div>
                        </div>
                        <div class="rowForm">
                            <div class="label">必填</div>
                            <div class="val">
                                <a-switch v-model:checked="fieldInfo.required" />
                            </div>
                        </div>
                        <div class="rowForm">
                            <div class="label">只读</div>
                            <div class="val">
                                <a-switch v-model:checked="fieldInfo.readonly" />
                            </div>
                        </div>
                        <!-- <div class="rowForm">
                            <div class="label">扫码</div>
                            <div class="val">
                                <a-switch v-model:checked="checked" />
                            </div>
                        </div>
                        <div class="rowForm">
                            <div class="label">
                                参与打印 <span class="tips">如不勾选，打印时不显示该项</span>
                            </div>
                            <div class="val">
                                <a-switch v-model:checked="checked" />
                            </div>
                        </div> -->
                    </div>
                </div>
            </div>
        </div>
        <RelatedListField v-if="isRelatedField" :isShow="isRelatedField" :fields="relatedListFields" :selectedFields="relatedListSelectedFields" :relatedSort="relatedSort" :relatedSortField="relatedSortField" @cancel="isRelatedField=false" @save="handleSaveRelatedField" />
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
        QuestionCircleOutlined
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
    import Toast from "@/utils/toast.js";
    import draggable from "vuedraggable";
    import { useRoute, useRouter } from "vue-router";
    import { cloneDeep } from 'lodash';
    import RelatedListField from "@/components/mobileDesign/SelectField.vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();

    const router = useRouter();
    const route = useRoute();

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
        entityId: route.query.entityId,
        sessions: [
            {
                label: "部分",
                displayCategory: "group",
                fields: [],
                isEdit: false
            }
        ],
        fieldCurrent: 0,
        relatedListFields: [],
        relatedListSelectedFields: [],
        isRelatedField: false,
        relatedRecodIndex: 0,
        relatedSort: "",
        relatedSortField: "",
        entityLabel: route.query.entityLabel,
        layoutName: route.query.layoutName
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
        entityId,
        sessions,
        fieldCurrent,
        relatedListFields,
        relatedListSelectedFields,
        isRelatedField,
        relatedRecodIndex,
        relatedSort,
        relatedSortField,
        entityLabel,
        layoutName
    } = toRefs(data);

    watch(()=>data.layoutList, (newVal, oldVal)=> {
        console.log(newVal, oldVal);
    }, {deep: true});

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
                    data.layoutList.push(item);
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
                        fields: fields
                    })
                })
                sectionsList.forEach(item=>{
                    data.layoutList.push(item);
                })
            }
        })  
    };
    getTroughdata();
    // getLayoutData();

    const handleSelect = (item, index) => {
        console.log("item", item);
        data.current = index;
        // data.fieldInfo = item;
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
    const handleDeleteFieldChildItem = (element, index, item, idx) => {
        console.log("item", element, index, item, idx);
        // let entityApiName = item.entityApiName;
        // let idx = data.layoutList.findIndex(row=>row.entityApiName == entityApiName);
        // data.layoutList[idx].fields.splice(index, 1);
        data.layoutList[index].fields.splice(idx, 1);
    };

    // 保存/发布
    const handleSave = () => {
        // let arr = JSON.parse(JSON.stringify(data.layoutList));
        // let formData = JSON.stringify(arr);
        // proxy.$get(Interface.mobileDesign.save,{
        //     formId: "",
        //     formData: formData
        // }).then(res=>{
        //     Toast("发布成功！");
        // })
        console.log("data.layoutList", data.layoutList);
        let sections = [];
        let relatedLists = [];
        data.layoutList.forEach(item=>{
            let columns = [];
            item.fields.forEach(v=>{
                columns.push({
                    label: v.label,
                    readonly: v.readonly,
                    className: "fieldDrop",
                    id: v.id,
                    required: v.required
                })
            })
            if(item.displayCategory=='group'){
                sections.push({
                    sectionId: item.id,
                    sectionName: item.label,
                    labelKey: item.id,
                    categoriesAllowed: {
                        Control: true,
                        CustomSControl: true,
                        Canvas: true,
                        CustomField: true,
                        StandardField: true,
                        Page: true,
                        AnalyticsCloud: true,
                        EmptySpace: true,
                        Analytics: true,
                    },
                    nameReadonly: true,
                    canChangeColumns: true,
                    canDeleteSection: true,
                    showEditHeader: true,
                    showDetailHeader: false,
                    sortOrder: "v",
                    columns: columns,
                    className: "fieldDrop"
                    
                });
            }
            if(item.displayCategory=='RelatedList'){
                relatedLists.push({
                    selectableColumns: item.fields,
                    sortColumn: item.sortField,
                    customizedColumns: item.fields.map(v=>v.filterColumn),
                    sortDesc: item.sort == 'DESC' ? true : false,
                    className: "rlDrop",
                    id: item.id,
                    columnsLoaded: false
                });
            }
        });

        console.log("sections", sections);
        console.log("relatedLists", relatedLists);
        

        let WapLayoutFields = {
            layoutTitle: data.layoutName,
            title: data.entityLabel,
            layoutName: data.layoutName,
            sections: sections,
            relatedLists: relatedLists
        };

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
                            WapLayoutFields: WapLayoutFields
                        }
                    }
                }
            }]
        };

        let d = {
            message: JSON.stringify(obj)
        }
        console.log('obj', obj);

        proxy.$post(Interface.edit, d).then(res=>{
            Toast("保存成功！");
        })
    };
    // 预览
    const handlePreviewMobile = () => {
        const url = router.resolve({
            name: "PreviewMobile",
            query: {
                entityId: data.entityId
            }
        });
        window.open(url.href);
    };
    const handleClone = (original) => {
        const cloned = JSON.parse(JSON.stringify(original));
        cloned.id = Date.now() + Math.random();
        return cloned;
    }
    const onDragChange = (evt)=> {
        // console.log("Drag event:", evt);
    }

    const handleRename = (item, index) => {
        // console.log("item", item, index);
        item.isEdit = true;
    }
    const changeEnterName = (item, index) => {
        // console.log("item", item, index);
        item.isEdit = false;
    }
    // 相关列表添加字段
    const handleAddRelatedField = (item, index) => {
        console.log("相关列表添加字段：", item, index);
        data.relatedListFields = item.selectableColumns.map(row=>{
            row.key = row.filterColumn;
            return row;
        });
        data.relatedRecodIndex = index;
        data.relatedListSelectedFields = item.fields;
        if(item.sort){
            data.relatedSort = item.sort;
            data.relatedSortField = item.sortField;
        }
        data.isRelatedField = true;
    };
    const handleSaveRelatedField = (params) => {
        // console.log("list", list);
        // data.layoutList[data.relatedRecodIndex].fields = data.layoutList[data.relatedRecodIndex].fields.concat(list);
        console.log("params", params);
        let list = params.list;
        for(let i = 0; i < list.length; i++){
            let item = list[i];
            let index = data.layoutList[data.relatedRecodIndex].fields.findIndex(row=>row.label==item.label);
            console.log("index", index);
            if(index==-1){
                data.layoutList[data.relatedRecodIndex].fields.push(item);
            }
        }
        data.layoutList[data.relatedRecodIndex].sort = params.sort;
        data.layoutList[data.relatedRecodIndex].sortField = params.sortField;
        console.log("data.layoutList[data.relatedRecodIndex]", data.layoutList[data.relatedRecodIndex]);
        data.isRelatedField = false;
    }

    // 点击选择字段
    const handleSelectField = (element,index,item,idx) => {
        console.log("item",item);
        data.fieldInfo = item;
        element.current = idx;
        data.current = index;
    }
    // 删除部分下字段
    const handleDeleteSectionField = (element, index, item, idx) => {
        data.layoutList[index].fields.splice(idx, 1);
    }
    const handlePCDesign = () => {
        router.push({
            name: "FormDesign",
            query: {
                entityId: data.entityId,
                id: route.query.id
            }
        })
    }
</script>
<style lang="less" scoped>
    .de-header{
        width: 100%;
        height: 46px;
        background: #fff;
        border-bottom: 1px solid #e5e5e5;
        display: flex;
        align-items: center;
        position: relative;
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
            height: calc(~"100vh - 45px");
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
                height: calc(~"100% - 85px");

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
                        border-bottom: 1px solid rgba(126, 134, 142, 0.16);
                        .label {
                            /* width: 100%; */
                            display: inline-block;
                            z-index: 99;
                            padding: 0 12px;
                            font-weight: 600;
                            font-size: 14px;
                            color: #171a1d;
                            text-align: left;
                            line-height: 45px;
                            /* border-bottom: 1px solid rgba(126, 134, 142, 0.16); */
                            cursor: pointer;
                            &.active{
                                color: #0176d3;
                            }
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
                        margin: 20px auto;

                        .formWrap {
                            width: 100%;
                            height: calc(~"100% - 20px");
                            /* padding: 12px 1px 100px; */
                            padding: 12px 1px 0px;
                            background: #f2f4f5;
                            border-radius: 14px;
                            overflow-y: auto;
                            .list-group{
                                min-height: 100%;
                            }
                            .formItem {
                                padding-left: 16px;
                                min-height: 56px;
                                margin-bottom: 16px;
                                border-left: 3px solid #fff;
                                transition: 0.3s all ease;
                                background: #fff;
                                position: relative;
                                border-left: 3px solid transparent;

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

                                &:hover {
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
                                }

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

                                        input {
                                            font-size: 17px;
                                            line-height: 24px;
                                            padding-left: 0;
                                            padding-right: 0;
                                            display: block;
                                            border: none;
                                            width: 100%;
                                            outline: 0;
                                        }
                                    }
                                }
                            }
                            .formItemGroup{
                                border-left: 3px solid #fff;
                                box-shadow: 0 1px 10px 0 rgba(226, 226, 226, 0.5);
                                border-radius: 0;
                                min-height: 38px;
                                margin-bottom: 16px;
                                cursor: grab;
                                border: 1px dashed transparent;
                                background: #fff;
                                &:hover {
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
                                    border: 1px dashed #ccc;
                                }
                                .groupItem{
                                    width: 100%;
                                    height: 44px;
                                    /* left: 44px; */
                                    /* padding: 0 16px; */
                                    /* border-bottom: 1px solid rgba(25, 31, 37, 0.08); */
                                    padding: 14px 10px;
                                    color: rgba(25, 31, 37, 0.56);
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
                                .formItem{
                                    .operateBox{
                                        display: none;
                                    }
                                    &:hover{
                                        .operateBox{
                                            display: block;
                                        }
                                    }
                                }
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
    .ghost .fieldItem{
        display: none !important;
    }


    .sessionGroup{
        /* padding: 18px; */
        background: #fff;
        margin-bottom: 18px;
        border-left: 3px solid transparent;
        box-shadow: 0 1px 10px 0 rgba(226, 226, 226, 0.5);
        border-radius: 0;
        cursor: grab;
        border: 1px solid transparent;
        &:hover{
            border-left: 3px solid #bfc1c2;
            box-shadow: 0 1px 10px 0 rgba(226, 226, 226, 0.5);
        }
        &.active{
            border-left: 3px solid #0089ff !important;
            box-shadow: 0 1px 10px 0 rgba(226, 226, 226, 0.5);
            border-radius: 0;
            border: 1px dashed #ccc;
        }
        .sessionGroup-head{
            /* font-weight: bold; */
            padding-bottom: 8px;
            cursor: move;
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: relative;
            padding: 14px 10px;
            color: rgba(25, 31, 37, 0.56);
            .tag{
                width: 3px;
                height: 15px;
                border-radius: 5px;
                background: #0176d3;
                display: inline-block;
            }
            .label{
                display: inline-block;
                margin-left: 10px;
                line-height: 15px;
                vertical-align: top;
            }
        }
        .sessionGroup-bd{
            min-height: 50px;
            .sessionGroup-field{
                .fieldItem{
                    .fieldItemRow{
                        padding: 8px 0;
                        border-bottom: 1px solid rgba(25, 31, 37, 0.08);
                        cursor: pointer;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        .operateBox{
                            display: none;
                        }
                    }
                    &:hover{
                        .operateBox{
                            display: block;
                        }
                    }
                }
            }
            .sessionGroup-field{
                .formItem{
                    .operateBox{
                        display: none !important;
                    }
                    &:hover{
                        .operateBox{
                            display: block !important;
                        }
                    }
                }
            }
        }
    }
    .operateBox {
        z-index: 100;
        /* display: flex; */
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
            color: #333;
            &:hover {
                color: #0091ff;
            }
        }
    }
</style>