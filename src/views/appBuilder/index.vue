<template>
    <div class="appBuilder visualEditorBaseBuilder flexipageEditorBaseBuilder">
        <div class="flexipageEditorHeader">
            <div class="flex">
                <div class="left2">
                    <a href="javascript:;"
                        @click="handleBack"
                        class="backButton headerItem headerLink setupLink noDecoration slds-border_right">
                        <div class="forceIcon">
                            <svg focusable="false" aria-hidden="true" viewBox="0 0 520 520" part="icon"
                                lwc-u7pbmbk99i="" data-key="back" class="slds-icon slds-icon_xx-small">
                                <g lwc-u7pbmbk99i="">
                                    <path
                                        d="M486 230H154c-9 0-13-11-7-17l96-96c6-6 6-15 0-21l-22-22c-6-6-15-6-21 0L25 250c-6 6-6 15 0 21l175 175c6 6 15 6 21 0l21-21c6-6 6-15 0-21l-96-96c-6-7-2-18 7-18h332c8 0 15-6 15-14v-30c0-8-6-16-14-16z"
                                        lwc-u7pbmbk99i=""></path>
                                </g>
                            </svg>
                        </div>
                    </a>
                    <h1 class="headerItem headerLabel slds-border_right">
                        <div class="forceIcon">
                            <svg focusable="false" aria-hidden="true" viewBox="0 0 520 520" part="icon"
                                lwc-8nqg7uieif="" data-key="builder" class="slds-icon slds-icon_x-small">
                                <g lwc-8nqg7uieif="">
                                    <path
                                        d="M115 170H35c-8 0-15 7-15 15v255a40 40 0 0040 40h55c8 0 15-7 15-15V185c0-8-7-15-15-15zm370 0H185c-8 0-15 7-15 15v280c0 8 7 15 15 15h275a40 40 0 0040-40V185c0-8-7-15-15-15zM460 40H60a40 40 0 00-40 40v35c0 8 7 15 15 15h450c8 0 15-7 15-15V80a40 40 0 00-40-40z"
                                        lwc-8nqg7uieif=""></path>
                                </g>
                            </svg>
                        </div>
                        Lightning 应用程序生成器
                    </h1>
                    <a href="javascript:;" class="headerItem headerLink appSettingsLink noDecoration slds-border_right">
                        <div class="forceIcon">
                            <svg focusable="false" aria-hidden="true" viewBox="0 0 520 520" part="icon"
                                lwc-31cpu082oko="" data-key="settings" class="slds-icon slds-icon_xx-small">
                                <g lwc-31cpu082oko="">
                                    <path
                                        d="M261 191c-39 0-70 31-70 70s31 70 70 70 70-31 70-70-31-70-70-70zm210 133l-37-31a195 195 0 000-68l37-31c12-10 16-28 8-42l-16-28a34 34 0 00-40-14l-46 17a168 168 0 00-59-34l-8-47c-3-16-17-25-33-25h-32c-16 0-30 9-33 25l-8 46a180 180 0 00-60 34l-46-17-11-2c-12 0-23 6-29 16l-16 28c-8 14-5 32 8 42l37 31a195 195 0 000 68l-37 31a34 34 0 00-8 42l16 28a34 34 0 0040 14l46-17c18 16 38 27 59 34l8 48a33 33 0 0033 27h32c16 0 30-12 33-28l8-48a170 170 0 0062-37l43 17 12 2c12 0 23-6 29-16l15-26c9-11 5-29-7-39zm-210 47c-61 0-110-49-110-110s49-110 110-110 110 49 110 110-49 110-110 110z"
                                        lwc-31cpu082oko=""></path>
                                </g>
                            </svg>
                        </div>
                        应用程序设置
                    </a>
                    <a href="javascript:;"
                        class="headerItem headerLink pageSwitcherMenu noDecoration panelPosition slds-border_right flexipageEditorPageSwitcherMenu">
                        <div class="forceIcon">
                            <svg focusable="false" aria-hidden="true" viewBox="0 0 520 520" part="icon"
                                lwc-1ijmh068ea3="" data-key="page" class="slds-icon slds-icon_xx-small">
                                <g lwc-1ijmh068ea3="">
                                    <path
                                        d="M444 190H332c-26 0-42-16-42-42V36c0-9-7-16-16-16H108a49 49 0 00-48 48v384c0 26 22 48 48 48h304c26 0 48-22 48-48V206c0-9-7-16-16-16zm13-61L351 23c-2-2-6-3-9-3-6 0-12 5-12 11v85c0 18 16 34 34 34h85c6 0 11-6 11-12 0-3-1-7-3-9z"
                                        lwc-1ijmh068ea3=""></path>
                                </g>
                            </svg>
                        </div>
                        <span class="pageSwitcher uiOutputText">页面</span>
                        <div class="forceIcon">
                            <svg focusable="false" aria-hidden="true" viewBox="0 0 520 520" part="icon"
                                lwc-7nohpd9g9ec="" data-key="chevrondown" class="slds-icon slds-icon_xx-small">
                                <g lwc-7nohpd9g9ec="">
                                    <path
                                        d="M476 178L271 385c-6 6-16 6-22 0L44 178c-6-6-6-16 0-22l22-22c6-6 16-6 22 0l161 163c6 6 16 6 22 0l161-162c6-6 16-6 22 0l22 22c5 6 5 15 0 21z"
                                        lwc-7nohpd9g9ec=""></path>
                                </g>
                            </svg>
                        </div>
                    </a>
                </div>
                <div class="middle headerItem headerLabel">
                    {{formState.name}}
                </div>
                <div class="right2">
                    <div class="headerItem helpDropdown slds-border_left uiMenu flexipageEditorHelpDropdown">
                        <div class="uiPopupTrigger">
                            <a href="javascript:;" class="helpDropdownTrigger noDecoration">
                                <div class="forceIcon">
                                    <svg focusable="false" aria-hidden="true" viewBox="0 0 520 520" part="icon"
                                        lwc-574ci04mesc="" data-key="help" class="slds-icon slds-icon_xx-small">
                                        <g lwc-574ci04mesc="">
                                            <path
                                                d="M284 380h-50c-8 0-14-6-14-14v-15c0-42 27-80 67-94a80 80 0 00-24-155c-22-1-43 7-59 22a70.4 70.4 0 00-23 44c-1 6-7 11-15 11h-50c-9 0-16-7-15-16 4-38 21-72 48-99 32-30 73-46 117-45 83 3 151 71 154 154 3 70-40 133-105 157-9 4-15 11-15 20v15c0 9-8 15-16 15zm16 105c0 8-7 15-15 15h-50c-8 0-15-7-15-15v-50c0-8 7-15 15-15h50c8 0 15 7 15 15z"
                                                lwc-574ci04mesc=""></path>
                                        </g>
                                    </svg>
                                </div>
                                <span class="label">帮助</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="editor">
            <div class="main visualEditorStyle visualEditorBaseEditor flexipageEditorAppSettingsEditor">
                <div class="editorBody">
                    <section class="middlePanel column visualEditorBaseEditorPanel flexipageEditorAppSettings">
                        <div class="appSettings">
                            <div class="panelContainer verticalNav">
                                <nav class="slds-nav-vertical appSettingsNavigation lightningVerticalNavigation">
                                    <div class="slds-nav-vertical__section lightningVerticalNavigationSection">
                                        <h2 class="slds-nav-vertical__title">应用程序设置</h2>
                                        <div class="slds-nav-vertical__item" :class="{'slds-is-active':step==1}" @click="handleTab(1)">
                                            <a class="slds-nav-vertical__action"
                                                href="javascript:void(0);">应用程序详细信息和品牌化</a>
                                        </div>
                                        <div class="slds-nav-vertical__item" :class="{'slds-is-active':step==2}" @click="handleTab(2)">
                                            <a class="slds-nav-vertical__action" href="javascript:void(0);">应用程序选项</a>
                                        </div>
                                        <div class="slds-nav-vertical__item" :class="{'slds-is-active':step==3}" @click="handleTab(3)">
                                            <a class="slds-nav-vertical__action"
                                                href="javascript:void(0);">实用程序项目（仅限桌面）</a>
                                        </div>
                                        <div class="slds-nav-vertical__item" :class="{'slds-is-active':step==4}" @click="handleTab(4)">
                                            <a class="slds-nav-vertical__action" href="javascript:void(0);">导航项目</a>
                                        </div>
                                        <div class="slds-nav-vertical__item" :class="{'slds-is-active':step==5}" @click="handleTab(5)">
                                            <a class="slds-nav-vertical__action" href="javascript:void(0);">用户简档</a>
                                        </div>
                                    </div>
                                </nav>
                            </div>
                            <div class="panelContainer slds-grow">
                                <div class="flexipageEditorAppSettingsItem flexipageEditorAppSettingsDetailsContainer" :class="{'active':isChange}">
                                    <div class="content" v-if="step==1">
                                        <div class="slds-p-bottom_small">
                                            <h2 class="flexipageEditorAppSettingsHeader">应用程序详细信息和品牌化</h2>
                                            <div class="subTitle flexipageEditorAppSettingsHeader">为您的 Lightning
                                                应用程序命名并添加描述。上载图像，并为导航栏选择高亮显示的颜色。</div>
                                        </div>
                                        <a-form :model="formState" ref="formRef" :labelWrap="true">
                                            <div
                                                class="slds-grid milestoneCreateBoundingBox appSettingsDetailsAndBranding flexipageEditorAppSettingsDetails">
                                                <div
                                                    class="milestoneCreate_appDetails slds-col slds-col--padded-large slds-size--1-of-2">
                                                    <h3 class="slds-text-heading--small slds-p-bottom--large">应用程序详细信息
                                                    </h3>
                                                    <div class="slds-form-element slds-m-bottom--large">
                                                        <div
                                                            class="appSettingsName inputFields_appSettings slds-form-element">
                                                            <a-form-item name="name" label="应用程序名称"
                                                                :rules="[{ required: true, message: '请输入名称' }]">
                                                                <a-input v-model:value="formState.name"
                                                                    placeholder="命名您的应用程序..."></a-input>
                                                            </a-form-item>
                                                            <a-form-item name="developerName" label="开发人员名称"
                                                                :rules="[{ required: true, message: '请输入名称' }]">
                                                                <a-input v-model:value="formState.developerName"
                                                                    placeholder="输入开发人员名称..."></a-input>
                                                            </a-form-item>
                                                            <a-form-item name="startUrl" label="开始链接"
                                                                :rules="[{ required: true, message: '请输入开始链接' }]">
                                                                <a-input v-model:value="formState.startUrl"
                                                                    placeholder="开始链接..."></a-input>
                                                            </a-form-item>
                                                            <a-form-item name="logoUrl" label="应用图标"
                                                                :rules="[{ required: true, message: '请输入应用图标' }]">
                                                                <a-input v-model:value="formState.logoUrl"
                                                                    placeholder="应用图标..."></a-input>
                                                            </a-form-item>
                                                            <a-form-item name="description" label="描述">
                                                                <a-textarea v-model:value="formState.description"
                                                                    placeholder="输入描述..."
                                                                    :auto-size="{ minRows: 2, maxRows: 5 }" />
                                                            </a-form-item>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    class="milestoneCreate_branding slsd-col slds-col--padded-large slds-size--1-of-2">
                                                    <h3 class="slds-text-heading--small slds-p-bottom--large">应用程序品牌化
                                                    </h3>
                                                    <div class="slds-grid slds-m-bottom--large">
                                                        <a-form-item name="Name" label="图像">
                                                            <a-upload action="/upload.do" :show-upload-list="false"
                                                                list-type="picture-card">
                                                                <div>
                                                                    <PlusOutlined />
                                                                </div>
                                                            </a-upload>
                                                        </a-form-item>
                                                        <a-form-item name="color" label="主颜色十六进制数值">
                                                            <div class="colorFlex">
                                                                <el-color-picker v-model="formState.color"
                                                                    @change="changeColor" />
                                                                <a-input v-model:value="formState.color"
                                                                    style="width: 82px;margin-left: 4px;"></a-input>
                                                            </div>
                                                        </a-form-item>
                                                    </div>
                                                    <div class="milestoneCreate_orgTheming slds-m-bottom--large">
                                                        <h4 class="orgThemingLabel slds-form-element__label">组织主题选项</h4>
                                                        <a-form-item name="checkNick">
                                                            <a-checkbox>使用应用程序的图像和颜色，而不是组织的自定义主题</a-checkbox>
                                                        </a-form-item>
                                                        <div class="milestoneCreate__preview">
                                                            <h3 class="slds-text-heading--small slds-p-bottom--large">应用程序启动器预览</h3>
                                                            <div class="slds-box slds-theme_default  slds-size_medium setupnavAppLauncherPreview">
                                                                <div class="slds-grid">
                                                                    <div class="branding slds-p-around_medium">
                                                                        <div style="background:#0070D2;" class="colourBlock slds-align_absolute-center">
                                                                            <h3 class="abbreviation slds-text-heading_large slds-theme_inverse-text">{{formState.name.slice(0,2)}}</h3>
                                                                        </div>
                                                                    </div>
                                                                    <div class="appPreviewContent slds-size_3-of-4 slds-theme_shade slds-p-around_medium slds-grid slds-grid_vertical">
                                                                        <h3 class="appTitle slds-text-heading_small slds-truncate slds-m-bottom_xxx-small">{{formState.name}}</h3>
                                                                        <p class="appDescription"></p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </a-form>
                                    </div>
                                    <div class="content" v-else-if="step==2">
                                        <div class="slds-p-bottom_small">
                                            <h2 class="flexipageEditorAppSettingsHeader">应用程序选项</h2>
                                            <a-form :model="formState2" ref="formRef2">
                                                <div class="appnavigation-content flexipageEditorAppSettingsAppNavigation">
                                                    <div class="slds-grid">
                                                        <div class="appNavSectionPadding slds-col slds-col--padded-large slds-size--1-of-2">
                                                            <h3 class="app__navigation_left_subheader slds-text-heading--small slds-m-bottom--small">
                                                                导航和外形规格
                                                                <span class="slds-icon-utility-info slds-button__icon slds-icon_container forceIcon">
                                                                    <svg focusable="false" aria-hidden="true" viewBox="0 0 520 520" part="icon" lwc-gj6nt2jq8l="" data-key="info" class="slds-icon slds-icon_xx-small"><g lwc-gj6nt2jq8l=""><path d="M260 20a240 240 0 100 480 240 240 0 100-480zm0 121c17 0 30 13 30 30s-13 30-30 30-30-13-30-30 13-30 30-30zm50 210c0 5-4 9-10 9h-80c-5 0-10-3-10-9v-20c0-5 4-11 10-11 5 0 10-3 10-9v-40c0-5-4-11-10-11-5 0-10-3-10-9v-20c0-5 4-11 10-11h60c5 0 10 5 10 11v80c0 5 4 9 10 9 5 0 10 5 10 11z" lwc-gj6nt2jq8l=""></path></g></svg>
                                                                </span>
                                                            </h3>
                                                            <div class="slds-m-bottom--large">
                                                                <a-form-item name="navStyle" label="导航样式" :rules="[{ required: true, message: '请输入名称' }]">
                                                                    <a-radio-group v-model:value="formState2.navStyle">
                                                                        <a-radio :style="radioStyle" :value="1">标准导航</a-radio>
                                                                        <a-radio :style="radioStyle" :value="2">控制台导航</a-radio>
                                                                    </a-radio-group>
                                                                </a-form-item>
                                                            </div>
                                                            <div class="slds-m-bottom--large">
                                                                <a-form-item name="tableRadio" label="支持的表格因素" :rules="[{ required: true, message: '请输入名称' }]">
                                                                    <a-radio-group v-model:value="formState2.tableRadio">
                                                                        <a-radio :style="radioStyle" :value="1">台式机和手机</a-radio>
                                                                        <a-radio :style="radioStyle" :value="2">桌面</a-radio>
                                                                        <a-radio :style="radioStyle" :value="3">手机</a-radio>
                                                                    </a-radio-group>
                                                                </a-form-item>
                                                            </div>
                                                        </div>
                                                        <div class="appNavSectionPadding slsd-col slds-col--padded-large slds-size--1-of-2">
                                                            <h3 class="app__navigation_left_subheader slds-text-heading--small slds-m-bottom--small">
                                                                设置和个性化
                                                                <span class="slds-icon-utility-info slds-button__icon slds-icon_container forceIcon">
                                                                    <svg focusable="false" aria-hidden="true" viewBox="0 0 520 520" part="icon" lwc-gj6nt2jq8l="" data-key="info" class="slds-icon slds-icon_xx-small"><g lwc-gj6nt2jq8l=""><path d="M260 20a240 240 0 100 480 240 240 0 100-480zm0 121c17 0 30 13 30 30s-13 30-30 30-30-13-30-30 13-30 30-30zm50 210c0 5-4 9-10 9h-80c-5 0-10-3-10-9v-20c0-5 4-11 10-11 5 0 10-3 10-9v-40c0-5-4-11-10-11-5 0-10-3-10-9v-20c0-5 4-11 10-11h60c5 0 10 5 10 11v80c0 5 4 9 10 9 5 0 10 5 10 11z" lwc-gj6nt2jq8l=""></path></g></svg>
                                                                </span>
                                                            </h3>
                                                            <div class="slds-m-bottom--large">
                                                                <a-form-item name="tableRadio" label="应用程序个性化设置">
                                                                    <a-checkbox-group v-model:value="formState2.type">
                                                                        <a-checkbox value="1" name="type">在此应用程序中，禁用最终用户对导航项目进行个性化设置</a-checkbox>
                                                                        <a-checkbox value="2" name="type">为此应用程序外部的项目，禁用临时选项卡</a-checkbox>
                                                                        <a-checkbox value="3" name="type">使用全方位侧边栏</a-checkbox>
                                                                      </a-checkbox-group>
                                                                </a-form-item>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a-form>
                                        </div>
                                    </div>
                                    <div class="content" v-else-if="step==3"></div>
                                    <div class="content" v-else-if="step==4">
                                        <div class="slds-p-bottom_small">
                                            <h2 class="flexipageEditorAppSettingsHeader">导航项目</h2>
                                            <div class="subTitle flexipageEditorAppSettingsHeader">选择要包含在应用程序中的项目，并按照它们的显示顺序排列。用户可以个性化导航以添加或移动项目，但用户无法删除或重命名您添加的项目。一些导航项仅适用于手机或仅适用于桌面。在使用项目不支持的格式查看应用程序时，这些项目将从导航栏中删除。</div>
                                        </div>
                                        <div class="transferBox">
                                            <a-transfer
                                                :showSelectAll="false"
                                                v-model:target-keys="navTargetKeys"
                                                v-model:selected-keys="navSelecteds"
                                                show-search
                                                :locale="{itemUnit:'',itemsUnit:'',notFoundContent:'列表为空',searchPlaceholder: '请输入搜索内容'}"
                                                :list-style="{
                                                    height: '300px',
                                                }"
                                                :data-source="navItems"
                                                :titles="['可用项目', '所选项目']"
                                                @change="changeNavItems"
                                                @selectChange="handleSelectChange"

                                            >
                                                <template #render="item">
                                                    <div class="custom-item">
                                                        <div class="avatar">
                                                            <img :src="require('@/assets/img/change_48x48.png')" alt="">
                                                        </div>
                                                        <div class="itemTitle">
                                                            {{ item.label }}
                                                        </div>
                                                    </div>
                                                </template>
                                            </a-transfer>
                                            <div class="sortBox">
                                                <!-- <a-button size="small" @click="navSelecteds.length && handleMoveUp()" :type="navSelecteds.length > 0 ? 'primary' : 'default' "><UpOutlined /></a-button>
                                                <a-button size="small" @click="navSelecteds.length && handleMoveDown()" :type="navSelecteds.length > 0 ? 'primary' : 'default' "><DownOutlined /></a-button> -->
                                                <a-button class="ant-btn-icon" @click="navSelecteds.length && handleMoveUp()">
                                                    <svg focusable="false" aria-hidden="true" viewBox="0 0 520 520" part="icon" lwc-5oh90e94dsa="" data-key="up" class="slds-icon slds-icon_xx-small"><g lwc-5oh90e94dsa=""><path d="M437 380H83c-10 0-17-13-9-22l173-212c6-8 19-8 25 0l175 212c7 9 1 22-10 22z" lwc-5oh90e94dsa=""></path></g></svg>
                                                </a-button>
                                                <a-button class="ant-btn-icon" @click="navSelecteds.length && handleMoveDown()">
                                                    <svg focusable="false" aria-hidden="true" viewBox="0 0 520 520" part="icon" lwc-6qul4k2dv7m="" data-key="down" class="slds-icon slds-icon_xx-small"><g lwc-6qul4k2dv7m=""><path d="M83 140h354c10 0 17 13 9 22L273 374c-6 8-19 8-25 0L73 162c-7-9-1-22 10-22z" lwc-6qul4k2dv7m=""></path></g></svg>
                                                </a-button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="content" v-else-if="step==5">
                                        <div class="slds-p-bottom_small">
                                            <h2 class="flexipageEditorAppSettingsHeader">用户简档</h2>
                                            <div class="subTitle flexipageEditorAppSettingsHeader">选择可以访问此应用程序的用户简档。</div>
                                        </div>
                                        <div class="transferBox">
                                            <a-transfer
                                                :showSelectAll="false"
                                                v-model:target-keys="proTargetKeys"
                                                v-model:selected-keys="proSelecteds"
                                                show-search
                                                :locale="{itemUnit:'',itemsUnit:'',notFoundContent:'列表为空',searchPlaceholder: '请输入搜索内容'}"
                                                :list-style="{
                                                    height: '300px',
                                                }"
                                                :data-source="profileList"
                                                :titles="['可用简档', '所选简档']"
                                                :render="item => item.label"
                                                :disabled="disabled"
                                                @change="changeProfile"
                                                @selectChange="handleSelectChange"
                                                @scroll="handleScroll"
                                            />
                                        </div>
                                    </div>
                                    <div class="spacer"></div>
                                    <div class="footer" v-if="isChange">
                                        <div>
                                            <a-button @click="confirmClear(step)">取消</a-button>
                                            <a-button class="ml10" type="primary" @click="saveRow">保存</a-button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
        <LeaveModal v-if="isLeave" :isShow="isLeave" :step="recordStep" @cancel="isLeave=false" @ok="confirmClear" />
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
        defineProps,
        defineExpose,
        defineEmits,
        toRaw,
        inject,
        nextTick
    } from "vue";
    import {
        SearchOutlined,
        DownOutlined,
        UserOutlined,
        PlusOutlined,
        UpOutlined
    } from "@ant-design/icons-vue";
    import { message } from "ant-design-vue";
  import Toast from "@/utils/toast.js";
    import LeaveModal from "@/components/commonModal/LeaveModal.vue"
    import { useRouter, useRoute } from "vue-router";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    const router = useRouter();
    const route = useRoute();

    const formRef = ref();
    const formRef2 = ref();
    const data = reactive({
        step: 1,
        navTargetKeys: [],
        navSelecteds: [],
        navItems: [],
        profileList: [],
        profileSelecteds: [],
        proTargetKeys: [],
        proSelecteds: [],
        isLeave: false,
        isChange: false,
        recordStep: "",
        id: "",
        operations: ['']
    });

    const { step, navTargetKeys, navSelecteds, navItems, profileList, profileSelecteds,
        proTargetKeys, proSelecteds, isLeave, isChange, recordStep, id, operations
     } = toRefs(data);

     if(route.query.id){
        data.id = route.query.id;
     }

     const handleBack = () => {
        router.back();
     }
    const formState = reactive({
        name: "",
        developerName: "",
        description: "",
        color: "",
        startUrl: "",
        logoUrl: ""
    });
    const formState2 = reactive({
        navStyle: 1,
        tableRadio: 2,
        setTest: 1,
        appStyle: ''
    });
    const radioStyle = reactive({
        display: 'flex',
        height: '30px',
        lineHeight: '30px',
    });

    watch(()=>formState, (newVal,oldVal)=>{
        data.isChange = true;
    }, { deep: true });
    watch(()=>formState2, (newVal,oldVal)=>{
        data.isChange = true;
    }, { deep: true });

    const getDetail = () => {
        let obj = {
            actions:[{
                id: "4270;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    id: data.id,
                }
            }]
        };
        let d = {
            message: JSON.stringify(obj)
        }
        proxy.$post(Interface.application.appDetail,d).then(res=>{
            console.log("res", res);
            let { name, developerName, description, color, startUrl, logoUrl } = res.actions[0].returnValue;
            formState.name = name;
            formState.developerName = developerName;
            formState.description = description;
            formState.color = color;
            formState.startUrl = startUrl;
            formState.logoUrl = logoUrl;
            nextTick(()=>{
                data.isChange = false;
            })
        })
    }
    getDetail();
    const handleTab = (e) => {
        if(data.isChange){
            data.recordStep = e;
            data.isLeave = true;
        } else {
            data.step = e;
            if(e==1){
                getDetail();
            }
            if(e==4){
                getNavItems();
                getSelectedNavItem();
            } else if(e==5){
                getProfileList();
                getProfileListAll();
            }
        }
    };
    // 获取选项卡
    const getNavItems = () => {
        let obj = {
            actions: [{
                id: "138;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    id: data.id
                }
            }]
        };
        let d = {
            message: JSON.stringify(obj)
        }
        proxy.$post(Interface.application.navItems, d).then(res=>{
            let items = res.actions[0].returnValue.items;
            // data.listData = JSON.parse(JSON.stringify(items));
            data.navItems = items.map(item=>{
                item.key = item.id;
                return item;
            });
        })
    };

    const getSelectedNavItem = () => {
        let obj = {
            actions: [{
                id: "138;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    id: data.id
                }
            }]
        };
        let d = {
            message: JSON.stringify(obj)
        }
        proxy.$post(Interface.application.selectedNavItem, d).then(res=>{
            let items = res.actions[0].returnValue.items;
            data.navTargetKeys = items.map(item=>{
                return item.id;
            });
        })
    }

    
    const getProfileListAll = () => {
        let d = {
            filterId: "",
            entityName: "Profile",
            objectTypeCode: 20017
        }
        proxy.$post(Interface.list2, d).then(res=>{
            console.log("res", res);
            let profileList = res.nodes;
            data.profileList = profileList.map(item=>{
                item.key = item.id;
                item.label = item.Name.textValue;
                return item;    
            });
        })
    }
    const getProfileList = () => {
        let obj = {
            actions: [{
                id: "138;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    id: "00000000-0000-0000-0000-000000000022"
                }
            }]
        };
        let d = {
            message: JSON.stringify(obj)
        }
        proxy.$post(Interface.application.selectedProfiles, d).then(res=>{
            let profileSelecteds = res.actions[0].returnValue.selectedProfiles;
            data.profileSelecteds = profileSelecteds.map(item=>{
                item.key = item.id;
                return item;    
            });
            data.proTargetKeys = profileSelecteds.map(item=>{
                return item.id;
            })
        })
    };
    // 选项卡
    const changeNavItems = (e) => {
        data.isChange = true;
    };
    // 简档
    const changeProfile = (e) => {
        data.isChange = true;
    }
    // 保存选项卡
    const saveNavItems = () => {
        // console.log("data-", data.navItems, data.navTargetKeys);
        let list = data.navItems.filter(item=>{
            return data.navTargetKeys.find(row=>{
                return item.key == row;
            })
        });
        let selectedNavItems = [];
        list.forEach(item=>{
            selectedNavItems.push({
                label: item.label,
                color: "",
                id: item.id
            })
        })
        let obj = {
            actions: [{
                id: "138;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    id: "00000000-0000-0000-0000-000000000022",
                    isConsole: false,
                    isInstalled: false,
                    model: {
                        selectedNavItems: selectedNavItems
                    }
                }
            }]
        };
        let d = {
            message: JSON.stringify(obj)
        };
        proxy.$post(Interface.application.saveApplication, d).then(res=>{
            data.isChange = false;
            Toast("保存成功!");
        })
    }
    // 保存简档
    const saveProFile = () => {
        let list = data.profileList.filter(item=>{
            return data.proTargetKeys.find(row=>{
                return item.key == row;
            })
        });
        let selectedProfiles = [];
        list.forEach(item=>{
            selectedProfiles.push({
                label: item.label,
                color: item.color,
                id: item.id
            })
        })
        let obj = {
            actions: [{
                id: "138;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    id: "00000000-0000-0000-0000-000000000022",
                    isConsole: false,
                    isInstalled: false,
                    model: {
                        selectedProfiles: selectedProfiles
                    }
                }
            }]
        };
        let d = {
            message: JSON.stringify(obj)
        };
        proxy.$post(Interface.application.saveSelectedProfiles, d).then(res=>{
            data.isChange = false;
            Toast("保存成功!");
        })
    };
    const saveInfo = () => {
        formRef.value.validate().then(() =>{
            let obj = {
                actions:[{
                    id: "2919;a",
                    descriptor: "",
                    callingDescriptor: "UNKNOWN",
                    params: {
                        recordId: data.id,
                        recordInput:{
                            allowSaveOnDuplicate: false,
                            apiName: "SystemApplication",
                            objTypeCode: 3020,
                            fields: {
                                Name: formState.name,
                                DeveloperName: formState.developerName,
                                Description: formState.description,
                                Color: formState.color,
                                StartUrl: formState.startUrl,
                                LogoUrl: formState.LogoUrl,
                            }
                        }
                    }
                }]
            };
            let d = {
                message: JSON.stringify(obj)
            };
            proxy.$post(Interface.edit, d).then(res=>{
                Toast("保存成功！");
                data.isChange = false;
            })
        }).catch((err) => {
            console.log("error", err);
        });
    }
    const saveRow = () => {
        if(data.step == 1){
            saveInfo();
        }else if(data.step == 4){
            saveNavItems();
        } else if(data.step == 5){
            saveProFile();
        }
    };
    const handleSelectChange = () => {};
    // 确认清楚未保存的修改
    const confirmClear = (e) => {
        if(data.step==1){
            formRef.value.resetFields();
        } else if(data.step == 2){
            formRef2.value.resetFields();
        }
        data.isChange = false;
        data.isLeave = false;
        handleTab(e);
    };
    const handleMoveUp = () => {
        let firstSelectedIndex = data.navTargetKeys.findIndex(item=>item==data.navSelecteds[0]);
        if(firstSelectedIndex > 0){
            const itemsToMove = data.navSelecteds.slice();
            console.log("itemsToMove", itemsToMove)
            for(const item of itemsToMove){
                const currentIndex = data.navTargetKeys.indexOf(item);
                data.navTargetKeys.splice(currentIndex, 1);
                data.navTargetKeys.splice(currentIndex - 1, 0, item);
            }
        }
    }
    const handleMoveDown = () => {
        const lastSelectedIndex = data.navTargetKeys.indexOf(data.navSelecteds[data.navSelecteds.length - 1]);
          if (lastSelectedIndex < data.navTargetKeys.length - 1) {
            const itemsToMove = data.navSelecteds.slice().reverse();
            for (const item of itemsToMove) {
              const currentIndex = data.navTargetKeys.indexOf(item);
              data.navTargetKeys.splice(currentIndex, 1);
              data.navTargetKeys.splice(currentIndex + 1, 0, item);
            }
        }
    }
</script>
<style lang="less">
    @import url("~@/style/common.less");
    .ant-form-item {
        .ant-row {
            display: block
        }
    }
    .ant-checkbox-wrapper{
        color: #444444;
    }
    .ant-transfer-list{
        width: 432px !important;
        height: 100% !important;
    }
    :where(.css-dev-only-do-not-override-kqecok).ant-transfer{
        height: 100% !important;
    }
    .ant-transfer-operation .ant-btn{
        /* font-size: 14px;
        width: 32px !important;
        height: 32px;
        color: #747474;
        padding: 0 8px;
        background: #fff; */
    }
</style>
<style lang="less" scoped>
    @import url("~@/style/app.css");
    .appBuilder {
        width: 100%;
        height: 100vh;
        overflow: hidden;
    }

    .flexipageEditorHeader {
        height: 50px;
        line-height: 50px;
        background: #032d60;
        color: #fff;
        font-size: 14px;
        font-weight: 400;

        .left2 {
            display: flex;
        }

        .headerItem {
            padding: 0 16px;
            color: #fff;
        }

        a.headerItem:hover {
            color: #9FAAB5;
            text-decoration: none;
        }

        .forceIcon {
            display: inline-block;
            padding-right: 8px;
            fill: currentColor;
            &:hover {
                text-decoration: none;
            }
        }

        .backButton {
            .forceIcon {
                padding-right: 0;
            }
        }

        .pageSwitcher {
            padding-right: 4px;
        }

        .middle {
            flex: 1;
        }

        .right2 {
            display: flex;
            justify-content: flex-end;
        }

        a.helpDropdownTrigger {
            color: #fff;

            &:hover {
                text-decoration: none;
                color: #9FAAB5;
            }
        }
    }

    .flex {
        display: flex;
    }

    .editor {
        height: calc(~"100vh - 50px");
    }

    .editorBody {
        flex: 1;
        height: 100%;
        display: flex;
        flex-direction: row;
    }

    .visualEditorBaseEditorPanel {
        display: flex;
    }

    .middlePanel {
        flex: 1;
        flex-direction: column;
        height: 100%;
    }

    .appSettings {
        width: 100%;
        line-height: 1.5;
        flex: 1;
        display: flex;
        height: 100%;
        background: #fff;
        .verticalNav {
            width: 270px;
            display: flex;

            .appSettingsNavigation {
                width: 300px;
                border-right: 1px solid #c9c9c9;
                flex: 1;
                background: #fff;
                position: relative;
            }
        }
    }

    .visualEditorBaseEditor {
        color: #032d60;
        height: 100%;
    }
    .milestoneCreate__preview{
        h3{
            color: #032d60;
        }
    }
    .flexipageEditorAppSettingsItem {
        display: flex;
        background: #fff;
        flex-direction: column;
        flex: 1;
        height: 100%;

        .content {
            padding: 16px;
            flex: 1;
            overflow: auto;
            display: flex;
            flex-direction: column;
            .transferBox{
                height: calc(~"100% - 100px");
                display: flex;
                align-items: center;
            }
        }
    }

    .flexipageEditorAppSettingsHeader {
        border-bottom: 2px solid rgba(0, 0, 0, 0);
        font-size: 20px;
        font-weight: 300;
        padding-bottom: 8px;

        &.subTitle {
            font-size: 14px;
            color: #032d60;
            font-weight: 400;
            padding-bottom: 8px;
        }
    }

    .milestoneCreate_appDetails {
        padding-left: 0;
        width: 350px;
    }

    .inputFields_appSettings {
        max-width: 300px;
        display: block;
    }

    .masterBox {
        width: 320px;
        height: 80px;
        display: flex;
        /* border: 1px solid #dddbda; */
        border-radius: 4px;
        background: url("~@/assets/img/appPlaceholder.svg") no-repeat;

        .leftImg {
            width: 80px;
            height: 80px;
        }

        .rightMaster {
            flex: 1;
            background: #f3f2f2;
            padding: 10px;
            color: #3399ff;
        }
    }
    .flexipageEditorAppSettingsAppNavigation{
        max-width: 750px;
    }
    .appNavSectionPadding{
        padding: 0;
        margin-right: 20px;
    }
    .custom-item{
        display: flex;
        align-items: center;
        .avatar{
            width: 24px;
            height: 24px;
            margin-right: 8px;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
    .sortBox{
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        gap: 5px;
    }
    .flexipageEditorAppSettingsItem.active{
        height: calc(~"100% - 60px");
    }
    .flexipageEditorAppSettingsItem .footer{
        border: 2px solid rgba(0, 0, 0, 0);
        background: #f3f3f3;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: bottom 0.25s ease-in-out;
        height: 60px;
        position: fixed;
        left: 300px;
        right: 0;
        bottom: 0;
    }
    .setupnavAppLauncherPreview{
        padding: 0;
        height: 96px;
        overflow: hidden;
    }
    .setupnavAppLauncherPreview .branding{
        width: 96px;
        height: 96px;
        min-width: 96px;
        border-radius: 4px;
    }
    .setupnavAppLauncherPreview .colourBlock{
        width: 100%;
        height: 100%;
        overflow: hidden;
        border-radius: 4px;
    }
    .setupnavAppLauncherPreview .colourBlock .abbreviation{
        color: #fff;
        line-height: 1.25;
        font-size: 28px;
    }
    .setupnavAppLauncherPreview .appPreviewContent{
        height: 96px;
        justify-content: center;
    }
    .ant-btn-icon:hover{
        svg{
            fill: #014486;
        }
    }
    .ant-btn-icon svg{
        fill: #747474;
    }
</style>